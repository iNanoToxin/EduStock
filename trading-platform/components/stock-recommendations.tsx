"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Target, Zap, RefreshCw } from "lucide-react"
import { useState } from "react"

const recommendations = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    currentPrice: 189.25,
    targetPrice: 210.0,
    recommendation: "BUY",
    confidence: 85,
    reason: "Strong iPhone 15 sales and services growth driving revenue",
    analyst: "AI Analysis",
    change: 2.3,
    upside: 10.9,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    currentPrice: 378.85,
    targetPrice: 420.0,
    recommendation: "BUY",
    confidence: 92,
    reason: "AI integration driving cloud revenue and productivity gains",
    analyst: "AI Analysis",
    change: 1.8,
    upside: 10.8,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    currentPrice: 138.45,
    targetPrice: 160.0,
    recommendation: "BUY",
    confidence: 78,
    reason: "Search dominance and AI advancements in core products",
    analyst: "AI Analysis",
    change: -0.5,
    upside: 15.5,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    currentPrice: 875.3,
    targetPrice: 950.0,
    recommendation: "BUY",
    confidence: 88,
    reason: "AI chip demand continues to surge across industries",
    analyst: "AI Analysis",
    change: 3.1,
    upside: 8.5,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    currentPrice: 248.5,
    targetPrice: 200.0,
    recommendation: "HOLD",
    confidence: 65,
    reason: "Valuation concerns despite growth potential in EVs",
    analyst: "AI Analysis",
    change: -1.2,
    upside: -19.5,
  },
]

export function StockRecommendations() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "BUY":
        return "bg-success/20 text-success border-success/30"
      case "SELL":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "HOLD":
        return "bg-warning/20 text-warning border-warning/30"
      default:
        return "bg-muted text-muted-foreground border-muted"
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const getButtonStyle = (recommendation: string) => {
    switch (recommendation) {
      case "BUY":
        return "bg-green-500/10 hover:bg-green-500/20 text-green-600 border-green-500/20 hover:border-green-500/30"
      case "SELL":
        return "bg-red-500/10 hover:bg-red-500/20 text-red-600 border-red-500/20 hover:border-red-500/30"
      default:
        return "bg-muted hover:bg-muted/80 text-muted-foreground"
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Live Analysis</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="h-6 w-6 p-0">
          <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="space-y-3">
        {recommendations.map((stock, index) => (
          <div
            key={stock.symbol}
            className="border border-border rounded-lg p-3 space-y-3 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className="font-semibold text-foreground">{stock.symbol}</div>
                  {index < 3 && <Zap className="w-3 h-3 text-primary" />}
                </div>
                <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
              </div>
              <Badge className={`${getRecommendationColor(stock.recommendation)} text-xs`}>
                {stock.recommendation}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current</span>
                <div className="flex items-center">
                  <span className="font-medium">${stock.currentPrice}</span>
                  <span
                    className={`ml-2 flex items-center text-xs ${stock.change >= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Target</span>
                <div className="flex items-center">
                  <Target className="w-3 h-3 mr-1 text-muted-foreground" />
                  <span className="font-medium">${stock.targetPrice}</span>
                  <span className={`ml-2 text-xs ${stock.upside >= 0 ? "text-success" : "text-destructive"}`}>
                    {stock.upside >= 0 ? "+" : ""}
                    {stock.upside.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Confidence</span>
                <span className="text-xs font-medium">{stock.confidence}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    stock.confidence >= 80 ? "bg-success" : stock.confidence >= 60 ? "bg-warning" : "bg-destructive"
                  }`}
                  style={{ width: `${stock.confidence}%` }}
                />
              </div>
            </div>

            <Button
              size="sm"
              className={`w-full h-7 text-xs border ${getButtonStyle(stock.recommendation)}`}
              variant="outline"
            >
              {stock.recommendation === "HOLD" ? "Hold" : stock.recommendation}
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">Updated 2 minutes ago</p>
      </div>
    </div>
  )
}
