"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, AlertCircle, Target, Shield } from "lucide-react"

interface Order {
  id: string
  symbol: string
  side: "BUY" | "SELL"
  type: "MARKET" | "LIMIT" | "STOP" | "STOP_LIMIT" | "TRAILING_STOP" | "OCO"
  quantity: number
  price?: number
  stopPrice?: number
  trailingAmount?: number
  status: "PENDING" | "FILLED" | "PARTIALLY_FILLED" | "CANCELLED" | "REJECTED"
  filledQuantity: number
  avgFillPrice?: number
  timestamp: Date
  timeInForce: "GTC" | "IOC" | "FOK" | "DAY"
  reduceOnly?: boolean
}

interface Position {
  symbol: string
  side: "LONG" | "SHORT"
  size: number
  entryPrice: number
  markPrice: number
  pnl: number
  pnlPercent: number
  margin: number
  liquidationPrice: number
}

const mockOrders: Order[] = [
  {
    id: "1",
    symbol: "BTC-USD",
    side: "BUY",
    type: "LIMIT",
    quantity: 0.5,
    price: 42000,
    status: "PENDING",
    filledQuantity: 0,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    timeInForce: "GTC",
  },
  {
    id: "2",
    symbol: "ETH-USD",
    side: "SELL",
    type: "STOP_LIMIT",
    quantity: 2,
    price: 2450,
    stopPrice: 2500,
    status: "FILLED",
    filledQuantity: 2,
    avgFillPrice: 2455,
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    timeInForce: "GTC",
  },
  {
    id: "3",
    symbol: "SOL-USD",
    side: "BUY",
    type: "MARKET",
    quantity: 10,
    status: "FILLED",
    filledQuantity: 10,
    avgFillPrice: 253.14,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    timeInForce: "IOC",
  },
]

const mockPositions: Position[] = [
  {
    symbol: "BTC-USD",
    side: "LONG",
    size: 1.5,
    entryPrice: 41500,
    markPrice: 42350,
    pnl: 1275,
    pnlPercent: 2.05,
    margin: 8300,
    liquidationPrice: 35200,
  },
  {
    symbol: "ETH-USD",
    side: "SHORT",
    size: 5,
    entryPrice: 2520,
    markPrice: 2485,
    pnl: 175,
    pnlPercent: 1.39,
    margin: 2520,
    liquidationPrice: 2890,
  },
]

export function OrderManagement({ symbol }: { symbol: string }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [positions] = useState<Position[]>(mockPositions)
  const [orderType, setOrderType] = useState("LIMIT")
  const [side, setSide] = useState<"BUY" | "SELL">("BUY")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [stopPrice, setStopPrice] = useState("")
  const [leverage, setLeverage] = useState([10])
  const [reduceOnly, setReduceOnly] = useState(false)
  const [postOnly, setPostOnly] = useState(false)

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "CANCELLED" as const } : order)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "FILLED":
        return "text-green-500"
      case "PENDING":
        return "text-yellow-500"
      case "CANCELLED":
        return "text-gray-500"
      case "REJECTED":
        return "text-red-500"
      case "PARTIALLY_FILLED":
        return "text-blue-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "FILLED":
        return <CheckCircle className="h-3 w-3" />
      case "PENDING":
        return <Clock className="h-3 w-3" />
      case "CANCELLED":
        return <XCircle className="h-3 w-3" />
      case "REJECTED":
        return <XCircle className="h-3 w-3" />
      case "PARTIALLY_FILLED":
        return <AlertCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const submitOrder = () => {
    const newOrder: Order = {
      id: Date.now().toString(),
      symbol,
      side,
      type: orderType as any,
      quantity: Number.parseFloat(quantity),
      price: price ? Number.parseFloat(price) : undefined,
      stopPrice: stopPrice ? Number.parseFloat(stopPrice) : undefined,
      status: "PENDING",
      filledQuantity: 0,
      timestamp: new Date(),
      timeInForce: "GTC",
      reduceOnly,
    }

    setOrders((prev) => [newOrder, ...prev])

    // Reset form
    setQuantity("")
    setPrice("")
    setStopPrice("")
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="place-order" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="place-order">Place Order</TabsTrigger>
          <TabsTrigger value="open-orders">Open Orders</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
        </TabsList>

        <TabsContent value="place-order" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                Place Order - {symbol}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Side */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={side === "BUY" ? "default" : "outline"}
                  onClick={() => setSide("BUY")}
                  className={side === "BUY" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Buy
                </Button>
                <Button
                  variant={side === "SELL" ? "default" : "outline"}
                  onClick={() => setSide("SELL")}
                  className={side === "SELL" ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  <TrendingDown className="h-4 w-4 mr-1" />
                  Sell
                </Button>
              </div>

              {/* Order Type */}
              <div className="space-y-2">
                <Label className="text-xs">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MARKET">Market</SelectItem>
                    <SelectItem value="LIMIT">Limit</SelectItem>
                    <SelectItem value="STOP">Stop Market</SelectItem>
                    <SelectItem value="STOP_LIMIT">Stop Limit</SelectItem>
                    <SelectItem value="TRAILING_STOP">Trailing Stop</SelectItem>
                    <SelectItem value="OCO">OCO (One-Cancels-Other)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label className="text-xs">Quantity</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Price (for limit orders) */}
              {(orderType === "LIMIT" || orderType === "STOP_LIMIT") && (
                <div className="space-y-2">
                  <Label className="text-xs">Price</Label>
                  <Input type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              )}

              {/* Stop Price */}
              {(orderType === "STOP" || orderType === "STOP_LIMIT" || orderType === "TRAILING_STOP") && (
                <div className="space-y-2">
                  <Label className="text-xs">Stop Price</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stopPrice}
                    onChange={(e) => setStopPrice(e.target.value)}
                  />
                </div>
              )}

              {/* Leverage */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs">Leverage</Label>
                  <span className="text-xs text-muted-foreground">{leverage[0]}x</span>
                </div>
                <Slider value={leverage} onValueChange={setLeverage} max={100} min={1} step={1} className="w-full" />
              </div>

              {/* Advanced Options */}
              <div className="space-y-3 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Reduce Only</Label>
                  <Switch checked={reduceOnly} onCheckedChange={setReduceOnly} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Post Only</Label>
                  <Switch checked={postOnly} onCheckedChange={setPostOnly} />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={submitOrder}
                className={`w-full ${side === "BUY" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                disabled={!quantity}
              >
                {side === "BUY" ? "Place Buy Order" : "Place Sell Order"}
              </Button>

              {/* Order Summary */}
              {quantity && (
                <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/50 rounded">
                  <div className="flex justify-between">
                    <span>Est. Total:</span>
                    <span>
                      ${((Number.parseFloat(quantity) || 0) * (Number.parseFloat(price) || 42350)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Margin Required:</span>
                    <span>
                      $
                      {(
                        ((Number.parseFloat(quantity) || 0) * (Number.parseFloat(price) || 42350)) /
                        leverage[0]
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="open-orders">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Open Orders ({orders.filter((o) => o.status === "PENDING").length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {orders
                    .filter((order) => order.status === "PENDING")
                    .map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                        <div className="flex items-center gap-3">
                          <div className={getStatusColor(order.status)}>{getStatusIcon(order.status)}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{order.symbol}</span>
                              <Badge variant={order.side === "BUY" ? "default" : "destructive"} className="text-xs">
                                {order.side}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {order.type}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {order.quantity} @ {order.price ? `$${order.price}` : "Market"}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => cancelOrder(order.id)} className="text-xs">
                          Cancel
                        </Button>
                      </div>
                    ))}
                  {orders.filter((o) => o.status === "PENDING").length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8">No open orders</div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="positions">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Open Positions ({positions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {positions.map((position, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{position.symbol}</span>
                        <Badge variant={position.side === "LONG" ? "default" : "destructive"} className="text-xs">
                          {position.side}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${position.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {position.pnl >= 0 ? "+" : ""}${position.pnl.toFixed(2)}
                        </div>
                        <div className={`text-xs ${position.pnlPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {position.pnlPercent >= 0 ? "+" : ""}
                          {position.pnlPercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Size:</span>
                        <span className="ml-1">{position.size}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Entry:</span>
                        <span className="ml-1">${position.entryPrice}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mark:</span>
                        <span className="ml-1">${position.markPrice}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Liq:</span>
                        <span className="ml-1">${position.liquidationPrice}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                        Close Position
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                        Add Margin
                      </Button>
                    </div>
                  </div>
                ))}
                {positions.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8">No open positions</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
