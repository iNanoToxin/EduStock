import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Gemini 2.5 Flash
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message, portfolioData } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Get the Gemini 2.5 Flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    // Create portfolio context for the AI
    const portfolioContext = portfolioData ? `
Portfolio Information:
- Total Value: $${portfolioData.totalValue?.toLocaleString() || 'N/A'}
- Day Change: $${portfolioData.dayChange?.toLocaleString() || 'N/A'} (${portfolioData.dayChangePercent?.toFixed(2) || 'N/A'}%)
- Total Return: $${portfolioData.totalReturn?.toLocaleString() || 'N/A'} (${portfolioData.totalReturnPercent?.toFixed(1) || 'N/A'}%)
- Number of Holdings: ${portfolioData.holdings || 'N/A'}
- Current Date: ${new Date().toLocaleDateString()}
` : ''

    // Create the system prompt with portfolio context
    const systemPrompt = `You are an AI financial advisor and investment assistant. You have access to the user's portfolio data and can provide personalized financial advice, market analysis, and investment recommendations.

${portfolioContext}

Guidelines:
- Provide accurate, helpful financial advice based on the portfolio data provided
- Be conversational and friendly while maintaining professionalism
- Focus on educational content and explain financial concepts clearly
- Suggest specific actions when appropriate (but always remind users to do their own research)
- If portfolio data is available, reference it in your responses
- Keep responses concise but informative
- Always remind users that this is educational advice and not professional financial advice

User's question: ${message}`

    // Generate response using Gemini 2.5 Flash
    const result = await model.generateContent(systemPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ 
      message: text,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error generating AI response:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' }, 
      { status: 500 }
    )
  }
}
