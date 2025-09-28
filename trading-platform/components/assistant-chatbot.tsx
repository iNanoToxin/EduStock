"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Bot, User, Loader2, Minimize2, Maximize2, Trash2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface PortfolioData {
  totalValue: number
  dayChange: number
  dayChangePercent: number
  totalReturn: number
  totalReturnPercent: number
  holdings: number
}

interface AssistantChatbotProps {
  onClose: () => void
  portfolioData?: PortfolioData
}

export function AssistantChatbot({ onClose, portfolioData }: AssistantChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Load conversation history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbot-messages')
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(parsedMessages)
      } catch (error) {
        console.error('Error loading conversation history:', error)
        // Fallback to default message
        setMessages([{
          id: "1",
          type: "assistant",
          content: "Hi! I'm your AI investment assistant powered by Gemini 2.5 Flash. I can help you analyze stocks, explain market trends, or answer questions about your portfolio. What would you like to know?",
          timestamp: new Date(),
        }])
      }
    } else {
      // First time user
      setMessages([{
        id: "1",
        type: "assistant",
        content: "Hi! I'm your AI investment assistant powered by Gemini 2.5 Flash. I can help you analyze stocks, explain market trends, or answer questions about your portfolio. What would you like to know?",
        timestamp: new Date(),
      }])
    }
  }, [])

  // Save conversation history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when component mounts
  useEffect(() => {
    const inputElement = document.querySelector('input[placeholder*="Ask about stocks"]') as HTMLInputElement
    if (inputElement) {
      inputElement.focus()
    }
  }, [])

  const clearConversation = () => {
    setMessages([{
      id: "1",
      type: "assistant",
      content: "Hi! I'm your AI investment assistant powered by Gemini 2.5 Flash. I can help you analyze stocks, explain market trends, or answer questions about your portfolio. What would you like to know?",
      timestamp: new Date(),
    }])
    localStorage.removeItem('chatbot-messages')
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          portfolioData: portfolioData
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full flex flex-col shadow-2xl border-0 bg-background">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Bot className="w-5 h-5 mr-2 text-primary" />
          AI Financial Assistant
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={clearConversation}
            className="h-8 w-8"
            title="Clear conversation"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="h-8 w-8"
            title={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8" title="Close chat">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6 py-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      message.type === "user" 
                        ? "bg-primary text-primary-foreground ml-auto" 
                        : "bg-muted/50 text-foreground border"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {message.type === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted/50 text-foreground border p-4 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about stocks, market trends, or your portfolio..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 text-sm h-12"
                disabled={isLoading}
              />
              <Button 
                size="lg" 
                onClick={handleSend} 
                className="h-12 px-6"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      )}

      {isMinimized && (
        <CardContent className="p-4">
          <div className="text-center text-muted-foreground">
            <Bot className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-sm">Chat minimized. Click to expand.</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
