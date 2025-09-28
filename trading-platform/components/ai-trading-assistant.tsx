"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: TradingSuggestion[]
  alerts?: MarketAlert[]
}

interface TradingSuggestion {
  symbol: string
  action: "BUY" | "SELL" | "HOLD"
  confidence: number
  reasoning: string
  targetPrice?: number
  stopLoss?: number
}

interface MarketAlert {
  type: "OPPORTUNITY" | "RISK" | "NEWS"
  symbol: string
  message: string
  severity: "LOW" | "MEDIUM" | "HIGH"
}

const mockTradingSuggestions: TradingSuggestion[] = [
  {
    symbol: "AAPL",
    action: "BUY",
    confidence: 85,
    reasoning: "Strong earnings momentum and technical breakout above resistance",
    targetPrice: 195,
    stopLoss: 175,
  },
  {
    symbol: "TSLA",
    action: "HOLD",
    confidence: 70,
    reasoning: "Mixed signals - strong fundamentals but overbought technically",
    targetPrice: 280,
    stopLoss: 220,
  },
  {
    symbol: "NVDA",
    action: "BUY",
    confidence: 92,
    reasoning: "AI sector leadership and strong institutional buying",
    targetPrice: 520,
    stopLoss: 450,
  },
]

const mockMarketAlerts: MarketAlert[] = [
  {
    type: "OPPORTUNITY",
    symbol: "SPY",
    message: "Market showing oversold conditions - potential bounce incoming",
    severity: "MEDIUM",
  },
  {
    type: "RISK",
    symbol: "BTC",
    message: "High volatility detected - consider reducing position size",
    severity: "HIGH",
  },
  {
    type: "NEWS",
    symbol: "MSFT",
    message: "Earnings announcement in 2 days - expect increased volatility",
    severity: "LOW",
  },
]

export function AITradingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI Trading Assistant. I can help you with market analysis, trading suggestions, and portfolio optimization. What would you like to know?",
      timestamp: new Date(),
      suggestions: mockTradingSuggestions.slice(0, 2),
      alerts: mockMarketAlerts.slice(0, 1),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("portfolio") || lowerMessage.includes("holdings")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Based on your current portfolio, I notice you're heavily weighted in tech stocks. Here are my recommendations for better diversification and risk management:",
        timestamp: new Date(),
        suggestions: [
          {
            symbol: "VTI",
            action: "BUY",
            confidence: 88,
            reasoning: "Add broad market exposure to reduce concentration risk",
            targetPrice: 245,
            stopLoss: 220,
          },
          {
            symbol: "GOOGL",
            action: "SELL",
            confidence: 75,
            reasoning: "Take profits after 40% gain, rebalance allocation",
            targetPrice: 140,
            stopLoss: 130,
          },
        ],
      }
    }

    if (lowerMessage.includes("market") || lowerMessage.includes("analysis")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Current market analysis shows mixed signals. The S&P 500 is testing key resistance levels while volatility remains elevated. Here's what I'm watching:",
        timestamp: new Date(),
        alerts: [
          {
            type: "OPPORTUNITY",
            symbol: "QQQ",
            message: "Tech sector showing relative strength - potential breakout",
            severity: "MEDIUM",
          },
          {
            type: "RISK",
            symbol: "SPY",
            message: "Watch for break below 420 support level",
            severity: "HIGH",
          },
        ],
      }
    }

    if (lowerMessage.includes("buy") || lowerMessage.includes("sell") || lowerMessage.includes("trade")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "I've analyzed current market conditions and your risk profile. Here are my top trading recommendations with detailed reasoning:",
        timestamp: new Date(),
        suggestions: mockTradingSuggestions,
      }
    }

    if (lowerMessage.includes("risk") || lowerMessage.includes("volatility")) {
      return {
        id: Date.now().toString(),
        type: "assistant",
        content:
          "Risk assessment shows elevated market volatility. I recommend reducing position sizes and implementing tighter stop losses. Current VIX levels suggest caution.",
        timestamp: new Date(),
        alerts: mockMarketAlerts,
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "assistant",
      content:
        "I can help you with market analysis, trading suggestions, portfolio optimization, and risk management. Try asking me about your portfolio, market conditions, or specific trading opportunities.",
      timestamp: new Date(),
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-full flex flex-col bg-background/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bot className="h-5 w-5 text-primary" />
          AI Trading Assistant
          <Badge variant="secondary" className="ml-auto">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 p-4">
        <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>

                {/* Trading Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="ml-10 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Target className="h-4 w-4" />
                      Trading Suggestions
                    </div>
                    {message.suggestions.map((suggestion, index) => (
                      <Card key={index} className="bg-card/50 border-border/50">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono">
                                {suggestion.symbol}
                              </Badge>
                              <Badge
                                variant={
                                  suggestion.action === "BUY"
                                    ? "default"
                                    : suggestion.action === "SELL"
                                      ? "destructive"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {suggestion.action}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3 text-green-500" />
                              <span className="text-xs font-medium">{suggestion.confidence}%</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{suggestion.reasoning}</p>
                          {suggestion.targetPrice && (
                            <div className="flex gap-4 text-xs">
                              <span>
                                Target: <span className="text-green-500">${suggestion.targetPrice}</span>
                              </span>
                              {suggestion.stopLoss && (
                                <span>
                                  Stop: <span className="text-red-500">${suggestion.stopLoss}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Market Alerts */}
                {message.alerts && message.alerts.length > 0 && (
                  <div className="ml-10 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <AlertTriangle className="h-4 w-4" />
                      Market Alerts
                    </div>
                    {message.alerts.map((alert, index) => (
                      <Card key={index} className="bg-card/50 border-border/50">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono text-xs">
                                {alert.symbol}
                              </Badge>
                              <Badge
                                variant={
                                  alert.type === "OPPORTUNITY"
                                    ? "default"
                                    : alert.type === "RISK"
                                      ? "destructive"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {alert.type}
                              </Badge>
                            </div>
                            <Badge
                              variant={
                                alert.severity === "HIGH"
                                  ? "destructive"
                                  : alert.severity === "MEDIUM"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{alert.message}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about market analysis, trading suggestions, or portfolio optimization..."
            className="flex-1 bg-background/50 border-border/50"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("Analyze my portfolio")}
            className="text-xs bg-background/50 border-border/50 hover:bg-muted/50"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            Portfolio Analysis
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("What are the market conditions?")}
            className="text-xs bg-background/50 border-border/50 hover:bg-muted/50"
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            Market Analysis
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("Show me trading opportunities")}
            className="text-xs bg-background/50 border-border/50 hover:bg-muted/50"
          >
            <Target className="h-3 w-3 mr-1" />
            Trading Ideas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
