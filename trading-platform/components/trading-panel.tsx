"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, TrendingDown, Calculator, Zap } from "lucide-react"

interface TradingPanelProps {
  symbol: string
}

export function TradingPanel({ symbol }: TradingPanelProps) {
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("market")
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [leverage, setLeverage] = useState([1])

  const currentPrice = symbol === "BTC-USD" ? 67234.5 : symbol === "ETH-USD" ? 3456.78 : 253.14
  const availableBalance = 89234.18

  const calculateTotal = () => {
    const qty = Number.parseFloat(amount) || 0
    const orderPrice = orderType === "market" ? currentPrice : Number.parseFloat(price) || currentPrice
    return qty * orderPrice
  }

  const calculateMaxAmount = () => {
    const orderPrice = orderType === "market" ? currentPrice : Number.parseFloat(price) || currentPrice
    return (availableBalance / orderPrice).toFixed(6)
  }

  return (
    <Card className="h-full">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">Trade {symbol}</h3>

        {/* Buy/Sell Toggle */}
        <div className="flex space-x-1 mb-4">
          <Button
            variant={side === "buy" ? "default" : "outline"}
            onClick={() => setSide("buy")}
            className={`flex-1 ${side === "buy" ? "bg-success hover:bg-success/90 text-success-foreground" : ""}`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Buy
          </Button>
          <Button
            variant={side === "sell" ? "default" : "outline"}
            onClick={() => setSide("sell")}
            className={`flex-1 ${side === "sell" ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : ""}`}
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            Sell
          </Button>
        </div>

        {/* Order Type Tabs */}
        <Tabs value={orderType} onValueChange={(value) => setOrderType(value as any)} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
            <TabsTrigger value="stop">Stop</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Price */}
        <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
          <span className="text-sm text-muted-foreground">Current Price</span>
          <span className="font-medium text-foreground">${currentPrice.toLocaleString()}</span>
        </div>

        {/* Price Input (for limit/stop orders) */}
        {orderType !== "market" && (
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              {orderType === "limit" ? "Limit Price" : "Stop Price"}
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-input"
            />
          </div>
        )}

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="amount" className="text-sm font-medium">
              Amount
            </Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAmount(calculateMaxAmount())}
              className="text-xs text-primary hover:text-primary/80"
            >
              Max: {calculateMaxAmount()}
            </Button>
          </div>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-input"
          />
        </div>

        {/* Leverage Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Leverage</Label>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {leverage[0]}x
            </Badge>
          </div>
          <Slider value={leverage} onValueChange={setLeverage} max={100} min={1} step={1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1x</span>
            <span>25x</span>
            <span>50x</span>
            <span>100x</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-2 p-3 bg-muted/50 rounded">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium">${calculateTotal().toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Available</span>
            <span className="font-medium">${availableBalance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee (0.1%)</span>
            <span className="font-medium">${(calculateTotal() * 0.001).toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            className={`w-full ${
              side === "buy"
                ? "bg-success hover:bg-success/90 text-success-foreground"
                : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            }`}
            disabled={!amount || (orderType !== "market" && !price)}
          >
            {side === "buy" ? "Buy" : "Sell"} {symbol.split("-")[0]}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Calculator className="w-4 h-4 mr-2" />
              Calculator
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Zap className="w-4 h-4 mr-2" />
              Quick Trade
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
