"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Star } from "lucide-react"

const marketData = [
  {
    symbol: "BTC-USD",
    name: "Bitcoin",
    price: 67234.5,
    change: 2.34,
    volume: "2.4B",
    marketCap: "1.3T",
    favorite: true,
  },
  {
    symbol: "ETH-USD",
    name: "Ethereum",
    price: 3456.78,
    change: 1.89,
    volume: "1.8B",
    marketCap: "415B",
    favorite: true,
  },
  {
    symbol: "SOL-USD",
    name: "Solana",
    price: 253.14,
    change: -0.76,
    volume: "890M",
    marketCap: "120B",
    favorite: false,
  },
  {
    symbol: "AVAX-USD",
    name: "Avalanche",
    price: 45.2,
    change: 3.21,
    volume: "234M",
    marketCap: "18B",
    favorite: false,
  },
  {
    symbol: "LINK-USD",
    name: "Chainlink",
    price: 18.94,
    change: -1.23,
    volume: "456M",
    marketCap: "11B",
    favorite: true,
  },
]

interface MarketOverviewProps {
  onSymbolSelect: (symbol: string) => void
}

export function MarketOverview({ onSymbolSelect }: MarketOverviewProps) {
  const [selectedSymbol, setSelectedSymbol] = useState("BTC-USD")

  const handleSymbolClick = (symbol: string) => {
    setSelectedSymbol(symbol)
    onSymbolSelect(symbol)
  }

  return (
    <div className="space-y-2 custom-scrollbar max-h-96 overflow-y-auto">
      {marketData.map((item) => (
        <Card
          key={item.symbol}
          className={`p-3 cursor-pointer transition-colors hover:bg-accent/50 ${
            selectedSymbol === item.symbol ? "bg-accent border-primary" : ""
          }`}
          onClick={() => handleSymbolClick(item.symbol)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-foreground">{item.symbol.split("-")[0]}</span>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Star className={`w-3 h-3 ${item.favorite ? "fill-warning text-warning" : "text-muted-foreground"}`} />
              </Button>
            </div>
            <Badge
              variant="secondary"
              className={`text-xs ${
                item.change >= 0 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
              }`}
            >
              {item.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)}%
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium text-foreground">${item.price.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{item.name}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Vol: {item.volume}</div>
              <div className="text-xs text-muted-foreground">Cap: {item.marketCap}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
