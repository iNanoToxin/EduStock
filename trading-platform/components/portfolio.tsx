"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Wallet, BarChart3, Target, Settings } from "lucide-react"
import { PortfolioAnalytics } from "./portfolio-analytics"

const portfolioData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    amount: 1.2345,
    value: 83000.45,
    change: 2.34,
    allocation: 45.2,
    avgCost: 65000,
    unrealizedPnL: 2847.32,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    amount: 12.567,
    value: 43456.78,
    change: 1.89,
    allocation: 23.7,
    avgCost: 3200,
    unrealizedPnL: 3234.56,
  },
  {
    symbol: "SOL",
    name: "Solana",
    amount: 89.123,
    value: 22564.32,
    change: -0.76,
    allocation: 12.3,
    avgCost: 280,
    unrealizedPnL: -2456.78,
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    amount: 234.56,
    value: 10607.23,
    change: 3.21,
    allocation: 5.8,
    avgCost: 42,
    unrealizedPnL: 756.89,
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    amount: 567.89,
    value: 10756.45,
    change: -1.23,
    allocation: 5.9,
    avgCost: 20,
    unrealizedPnL: -1234.56,
  },
  {
    symbol: "USD",
    name: "Cash",
    amount: 13462.19,
    value: 13462.19,
    change: 0,
    allocation: 7.1,
    avgCost: 1,
    unrealizedPnL: 0,
  },
]

export function Portfolio() {
  const [activeTab, setActiveTab] = useState("holdings")

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalPnL = portfolioData.reduce((sum, item) => sum + (item.value * item.change) / 100, 0)
  const totalPnLPercent = (totalPnL / totalValue) * 100
  const totalUnrealizedPnL = portfolioData.reduce((sum, item) => sum + item.unrealizedPnL, 0)

  if (activeTab === "analytics") {
    return <PortfolioAnalytics />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wallet className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Portfolio</h3>
        </div>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="space-y-4">
          {/* Portfolio Summary */}
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Value</span>
                <span className="text-lg font-bold text-foreground">${totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">24h P&L</span>
                <div className="flex items-center space-x-1">
                  {totalPnL >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <span className={`font-medium ${totalPnL >= 0 ? "text-success" : "text-destructive"}`}>
                    ${Math.abs(totalPnL).toLocaleString()} ({totalPnLPercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Unrealized P&L</span>
                <span className={`font-medium ${totalUnrealizedPnL >= 0 ? "text-success" : "text-destructive"}`}>
                  {totalUnrealizedPnL >= 0 ? "+" : ""}${totalUnrealizedPnL.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Holdings */}
          <div className="space-y-2 custom-scrollbar max-h-96 overflow-y-auto">
            {portfolioData.map((holding) => (
              <Card key={holding.symbol} className="p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{holding.symbol}</span>
                    <span className="text-xs text-muted-foreground">{holding.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        holding.change >= 0 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {holding.change >= 0 ? "+" : ""}
                      {holding.change.toFixed(2)}%
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        holding.unrealizedPnL >= 0 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {holding.unrealizedPnL >= 0 ? "+" : ""}${holding.unrealizedPnL.toFixed(2)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-medium text-foreground">
                        {holding.symbol === "USD" ? "$" : ""}
                        {holding.amount.toLocaleString()}
                        {holding.symbol !== "USD" ? ` ${holding.symbol}` : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Value</span>
                      <span className="font-medium text-foreground">${holding.value.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Cost</span>
                      <span className="font-medium text-foreground">${holding.avgCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allocation</span>
                      <span className="font-medium text-foreground">{holding.allocation}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <Progress value={holding.allocation} className="h-1" />
                </div>
              </Card>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              <Target className="w-4 h-4 mr-2" />
              Rebalance
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Performance Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Return</span>
                  <span className="text-sm font-medium text-success">+25.85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Annualized</span>
                  <span className="text-sm font-medium text-success">+31.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Max Drawdown</span>
                  <span className="text-sm font-medium text-destructive">-12.4%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                  <span className="text-sm font-medium text-foreground">1.85</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volatility</span>
                  <span className="text-sm font-medium text-foreground">18.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Best Month</span>
                  <span className="text-sm font-medium text-success">+18.7%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Top Performers</h4>
            <div className="space-y-2">
              {portfolioData
                .filter((item) => item.symbol !== "USD")
                .sort((a, b) => b.unrealizedPnL - a.unrealizedPnL)
                .slice(0, 3)
                .map((item) => (
                  <div key={item.symbol} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{item.symbol}</span>
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${
                        item.unrealizedPnL >= 0 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {item.unrealizedPnL >= 0 ? "+" : ""}${item.unrealizedPnL.toFixed(2)}
                    </Badge>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
