"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Settings, User, Search, TrendingUp, TrendingDown, Activity } from "lucide-react"

const marketData = [
  { symbol: "BTC", price: "$67,234.50", change: "+2.34%", positive: true },
  { symbol: "ETH", price: "$3,456.78", change: "+1.89%", positive: true },
  { symbol: "SOL", price: "$253.14", change: "-0.76%", positive: false },
  { symbol: "AVAX", price: "$45.20", change: "+3.21%", positive: true },
  { symbol: "LINK", price: "$18.94", change: "-1.23%", positive: false },
  { symbol: "DOT", price: "$8.76", change: "+0.98%", positive: true },
]

export function TradingHeader() {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">TradePro</span>
        </div>

        <div className="flex items-center space-x-4">
          {marketData.map((item) => (
            <div key={item.symbol} className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{item.symbol}</span>
              <span className="text-sm text-muted-foreground">{item.price}</span>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  item.positive ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                }`}
              >
                {item.positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {item.change}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <Search className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Bell className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
