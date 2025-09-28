"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TradingHeader } from "./trading-header"
import { MarketOverview } from "./market-overview"
import { TradingChart } from "./trading-chart"
import { OrderBook } from "./order-book"
import { Portfolio } from "./portfolio"
import { AITradingAssistant } from "./ai-trading-assistant"
import { CrisisAlerts } from "./crisis-alerts"
import { OrderManagement } from "./order-management"
import { Bot, BarChart3, Wallet, Settings } from "lucide-react"

export function TradingDashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTC-USD")
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <TradingHeader />

      {/* Crisis Alerts */}
      <CrisisAlerts />

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Market Overview</h2>
            <MarketOverview onSymbolSelect={setSelectedSymbol} />
          </div>

          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
              >
                <Bot className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Wallet className="w-4 h-4 mr-2" />
                Portfolio
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <div className="flex-1 p-4">
            <Portfolio />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Chart Section */}
          <div className="flex-1 p-4">
            <TradingChart symbol={selectedSymbol} />
          </div>

          {/* Bottom Panel - Enhanced with Tabs */}
          <div className="h-80 border-t border-border bg-card p-4">
            <Tabs defaultValue="positions" className="h-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="positions">Positions</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="positions" className="mt-4">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <Card className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Open Positions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <div>
                          <span className="font-medium">BTC-USD</span>
                          <Badge variant="secondary" className="ml-2 bg-success/20 text-success">
                            Long
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-success">+$1,247.50</div>
                          <div className="text-xs text-muted-foreground">+2.34%</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                        <div>
                          <span className="font-medium">ETH-USD</span>
                          <Badge variant="secondary" className="ml-2 bg-destructive/20 text-destructive">
                            Short
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-destructive">-$432.10</div>
                          <div className="text-xs text-muted-foreground">-1.12%</div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Position Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total P&L</span>
                        <span className="font-medium text-success">+$815.40</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Unrealized P&L</span>
                        <span className="font-medium text-success">+$1,247.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Realized P&L</span>
                        <span className="font-medium text-destructive">-$432.10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Margin Used</span>
                        <span className="font-medium">$36,613.14</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="mt-4">
                <Card className="p-4 h-full">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Orders</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <div>
                        <span className="font-medium">SOL-USD</span>
                        <span className="text-xs text-muted-foreground ml-2">Market Buy</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">$253.14</div>
                        <div className="text-xs text-success">Filled</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <div>
                        <span className="font-medium">AVAX-USD</span>
                        <span className="text-xs text-muted-foreground ml-2">Limit Sell</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">$45.20</div>
                        <div className="text-xs text-warning">Pending</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <div>
                        <span className="font-medium">DOT-USD</span>
                        <span className="text-xs text-muted-foreground ml-2">Stop Loss</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">$8.95</div>
                        <div className="text-xs text-muted-foreground">Triggered</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card className="p-4 h-full">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Trade History</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <div>
                        <span className="font-medium">BTC-USD</span>
                        <span className="text-xs text-muted-foreground ml-2">Buy • 2h ago</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">0.5 @ $41,500</div>
                        <div className="text-xs text-success">+$1,275</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <div>
                        <span className="font-medium">ETH-USD</span>
                        <span className="text-xs text-muted-foreground ml-2">Sell • 4h ago</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">2.0 @ $2,520</div>
                        <div className="text-xs text-destructive">-$180</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="mt-4">
                <Card className="p-4 h-full">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Account Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Balance</span>
                      <span className="font-medium">$125,847.32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Available</span>
                      <span className="font-medium">$89,234.18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">P&L Today</span>
                      <span className="font-medium text-success">+$2,847.32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Margin Used</span>
                      <span className="font-medium">$36,613.14</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Free Margin</span>
                      <span className="font-medium">$52,621.04</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Margin Ratio</span>
                      <span className="font-medium">29.1%</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Sidebar - Enhanced with Order Management */}
        <div className="w-96 border-l border-border bg-card flex flex-col">
          <div className="flex-1 p-4">
            <OrderManagement symbol={selectedSymbol} />
          </div>

          <div className="h-64 p-4 border-t border-border">
            <OrderBook symbol={selectedSymbol} />
          </div>

          {showAIAssistant && (
            <div className="h-80 border-t border-border">
              <AITradingAssistant />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
