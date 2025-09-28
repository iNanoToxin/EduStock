"use client"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react"

const holdings = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 50,
    avgCost: 175.3,
    currentPrice: 189.25,
    marketValue: 9462.5,
    dayChange: 2.3,
    totalReturn: 13.95,
    totalReturnPercent: 7.96,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    shares: 25,
    avgCost: 350.0,
    currentPrice: 378.85,
    marketValue: 9471.25,
    dayChange: 1.8,
    totalReturn: 28.85,
    totalReturnPercent: 8.24,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 75,
    avgCost: 142.0,
    currentPrice: 138.45,
    marketValue: 10383.75,
    dayChange: -0.5,
    totalReturn: -3.55,
    totalReturnPercent: -2.5,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    shares: 40,
    avgCost: 220.0,
    currentPrice: 248.5,
    marketValue: 9940.0,
    dayChange: -1.2,
    totalReturn: 28.5,
    totalReturnPercent: 12.95,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    shares: 15,
    avgCost: 680.0,
    currentPrice: 875.3,
    marketValue: 13129.5,
    dayChange: 3.1,
    totalReturn: 195.3,
    totalReturnPercent: 28.72,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    shares: 60,
    avgCost: 145.0,
    currentPrice: 152.75,
    marketValue: 9165.0,
    dayChange: 0.8,
    totalReturn: 7.75,
    totalReturnPercent: 5.34,
  },
]

export function PortfolioHoldings() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-4 text-sm font-medium text-muted-foreground border-b border-border pb-2">
        <div>Symbol</div>
        <div>Shares</div>
        <div>Avg Cost</div>
        <div>Current Price</div>
        <div>Market Value</div>
        <div>Day Change</div>
        <div>Total Return</div>
      </div>

      {holdings.map((holding) => (
        <div
          key={holding.symbol}
          className="grid grid-cols-7 gap-4 items-center py-3 border-b border-border/50 hover:bg-muted/50 rounded-lg px-2 transition-colors"
        >
          <div>
            <div className="font-semibold text-foreground">{holding.symbol}</div>
            <div className="text-xs text-muted-foreground">{holding.name}</div>
          </div>

          <div className="font-medium">{holding.shares}</div>

          <div className="font-medium">${holding.avgCost.toFixed(2)}</div>

          <div className="font-medium">${holding.currentPrice.toFixed(2)}</div>

          <div className="font-semibold">${holding.marketValue.toLocaleString()}</div>

          <div
            className={`flex items-center font-medium ${holding.dayChange >= 0 ? "text-success" : "text-destructive"}`}
          >
            {holding.dayChange >= 0 ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {holding.dayChange >= 0 ? "+" : ""}
            {holding.dayChange}%
          </div>

          <div className="flex items-center justify-between">
            <div className={`font-medium ${holding.totalReturnPercent >= 0 ? "text-success" : "text-destructive"}`}>
              <div>
                {holding.totalReturnPercent >= 0 ? "+" : ""}${holding.totalReturn.toFixed(2)}
              </div>
              <div className="text-xs">
                ({holding.totalReturnPercent >= 0 ? "+" : ""}
                {holding.totalReturnPercent.toFixed(2)}%)
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-7 gap-4 font-semibold text-foreground">
          <div>Total Portfolio</div>
          <div>-</div>
          <div>-</div>
          <div>-</div>
          <div>${holdings.reduce((sum, h) => sum + h.marketValue, 0).toLocaleString()}</div>
          <div className="text-success">+1.8%</div>
          <div className="text-success">+$18,234.56</div>
        </div>
      </div>
    </div>
  )
}
