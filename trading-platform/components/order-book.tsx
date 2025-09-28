"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

// Mock order book data generator
const generateOrderBookData = (symbol: string) => {
  const basePrice = symbol === "BTC-USD" ? 67000 : symbol === "ETH-USD" ? 3400 : 250
  const spread = basePrice * 0.001 // 0.1% spread

  const bids = []
  const asks = []

  // Generate bids (buy orders) - below current price
  for (let i = 0; i < 15; i++) {
    const price = basePrice - spread / 2 - i * (basePrice * 0.0001)
    const size = Math.random() * 10 + 0.1
    const total = price * size
    bids.push({
      price: Number(price.toFixed(2)),
      size: Number(size.toFixed(4)),
      total: Number(total.toFixed(2)),
    })
  }

  // Generate asks (sell orders) - above current price
  for (let i = 0; i < 15; i++) {
    const price = basePrice + spread / 2 + i * (basePrice * 0.0001)
    const size = Math.random() * 10 + 0.1
    const total = price * size
    asks.push({
      price: Number(price.toFixed(2)),
      size: Number(size.toFixed(4)),
      total: Number(total.toFixed(2)),
    })
  }

  return { bids, asks, spread: Number(spread.toFixed(2)) }
}

interface OrderBookProps {
  symbol: string
}

export function OrderBook({ symbol }: OrderBookProps) {
  const [orderBook, setOrderBook] = useState(generateOrderBookData(symbol))
  const [view, setView] = useState<"both" | "bids" | "asks">("both")

  useEffect(() => {
    setOrderBook(generateOrderBookData(symbol))

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOrderBook(generateOrderBookData(symbol))
    }, 2000)

    return () => clearInterval(interval)
  }, [symbol])

  const maxBidTotal = Math.max(...orderBook.bids.map((bid) => bid.total))
  const maxAskTotal = Math.max(...orderBook.asks.map((ask) => ask.total))
  const maxTotal = Math.max(maxBidTotal, maxAskTotal)

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Order Book</h3>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            Spread: ${orderBook.spread}
          </Badge>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setView("both")}
            className={`px-3 py-1 text-xs rounded ${
              view === "both" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Both
          </button>
          <button
            onClick={() => setView("bids")}
            className={`px-3 py-1 text-xs rounded ${
              view === "bids" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Bids
          </button>
          <button
            onClick={() => setView("asks")}
            className={`px-3 py-1 text-xs rounded ${
              view === "asks" ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Asks
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full custom-scrollbar overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-2">
            <div className="grid grid-cols-3 gap-2 text-xs font-medium text-muted-foreground">
              <div className="text-right">Price</div>
              <div className="text-right">Size</div>
              <div className="text-right">Total</div>
            </div>
          </div>

          {/* Asks (Sell Orders) */}
          {(view === "both" || view === "asks") && (
            <div className="space-y-px">
              {orderBook.asks
                .slice()
                .reverse()
                .map((ask, index) => (
                  <div
                    key={`ask-${index}`}
                    className="relative grid grid-cols-3 gap-2 p-2 text-xs hover:bg-destructive/10 transition-colors"
                  >
                    <div
                      className="absolute inset-0 bg-destructive/10"
                      style={{
                        width: `${(ask.total / maxTotal) * 100}%`,
                        right: 0,
                      }}
                    />
                    <div className="relative text-right text-destructive font-medium">
                      ${ask.price.toLocaleString()}
                    </div>
                    <div className="relative text-right text-foreground">{ask.size}</div>
                    <div className="relative text-right text-muted-foreground">${ask.total.toLocaleString()}</div>
                  </div>
                ))}
            </div>
          )}

          {/* Spread Indicator */}
          {view === "both" && (
            <div className="flex items-center justify-center py-3 border-y border-border bg-muted/20">
              <div className="flex items-center space-x-2 text-sm">
                <TrendingDown className="w-4 h-4 text-destructive" />
                <span className="text-muted-foreground">Spread: ${orderBook.spread}</span>
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
            </div>
          )}

          {/* Bids (Buy Orders) */}
          {(view === "both" || view === "bids") && (
            <div className="space-y-px">
              {orderBook.bids.map((bid, index) => (
                <div
                  key={`bid-${index}`}
                  className="relative grid grid-cols-3 gap-2 p-2 text-xs hover:bg-success/10 transition-colors"
                >
                  <div
                    className="absolute inset-0 bg-success/10"
                    style={{
                      width: `${(bid.total / maxTotal) * 100}%`,
                      right: 0,
                    }}
                  />
                  <div className="relative text-right text-success font-medium">${bid.price.toLocaleString()}</div>
                  <div className="relative text-right text-foreground">{bid.size}</div>
                  <div className="relative text-right text-muted-foreground">${bid.total.toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
