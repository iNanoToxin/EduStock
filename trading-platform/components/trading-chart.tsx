"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, TrendingDown, Volume2, BarChart3, Activity, Maximize2 } from "lucide-react"

// Mock candlestick data
const generateCandlestickData = (symbol: string) => {
  const basePrice = symbol === "BTC-USD" ? 67000 : symbol === "ETH-USD" ? 3400 : 250
  const data = []
  let currentPrice = basePrice

  for (let i = 0; i < 100; i++) {
    const change = (Math.random() - 0.5) * (basePrice * 0.02)
    const open = currentPrice
    const close = currentPrice + change
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.01)
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.01)
    const volume = Math.random() * 1000000

    data.push({
      time: new Date(Date.now() - (100 - i) * 60000).toISOString(),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Number(volume.toFixed(0)),
    })

    currentPrice = close
  }

  return data
}

interface TradingChartProps {
  symbol: string
}

export function TradingChart({ symbol }: TradingChartProps) {
  const [chartData, setChartData] = useState(generateCandlestickData(symbol))
  const [timeframe, setTimeframe] = useState("1H")
  const [chartType, setChartType] = useState("candlestick")
  const [indicators, setIndicators] = useState<string[]>(["volume"])

  useEffect(() => {
    setChartData(generateCandlestickData(symbol))
  }, [symbol])

  const currentPrice = chartData[chartData.length - 1]?.close || 0
  const previousPrice = chartData[chartData.length - 2]?.close || 0
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2)

  const timeframes = ["1M", "5M", "15M", "1H", "4H", "1D", "1W"]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">{new Date(label).toLocaleString()}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-muted-foreground">Open:</span>{" "}
              <span className="font-medium">${data.open?.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">High:</span>{" "}
              <span className="font-medium text-success">${data.high?.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Low:</span>{" "}
              <span className="font-medium text-destructive">${data.low?.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Close:</span>{" "}
              <span className="font-medium">${data.close?.toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Volume:</span>{" "}
              <span className="font-medium">{data.volume?.toLocaleString()}</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="h-full flex flex-col">
      {/* Chart Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-foreground">{symbol}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-foreground">${currentPrice.toLocaleString()}</span>
              <Badge
                variant="secondary"
                className={`${priceChange >= 0 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}
              >
                {priceChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {priceChange >= 0 ? "+" : ""}${priceChange.toFixed(2)} ({priceChangePercent}%)
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Timeframe Selector */}
            <div className="flex items-center space-x-1">
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                  className="h-8 px-3"
                >
                  {tf}
                </Button>
              ))}
            </div>

            {/* Chart Type Selector */}
            <div className="flex items-center space-x-1">
              <Button
                variant={chartType === "candlestick" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("candlestick")}
                className="h-8 px-3"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Candles
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="h-8 px-3"
              >
                <Activity className="w-4 h-4 mr-1" />
                Line
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("area")}
                className="h-8 px-3"
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Area
              </Button>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex items-center space-x-2">
            <Button
              variant={indicators.includes("volume") ? "default" : "ghost"}
              size="sm"
              onClick={() =>
                setIndicators((prev) =>
                  prev.includes("volume") ? prev.filter((i) => i !== "volume") : [...prev, "volume"],
                )
              }
              className="h-8 px-3"
            >
              <Volume2 className="w-4 h-4 mr-1" />
              Volume
            </Button>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="flex-1 p-4">
        <Tabs value={chartType} className="h-full">
          <TabsContent value="candlestick" className="h-full mt-0">
            <div className="h-full">
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                  <XAxis
                    dataKey="time"
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    stroke="oklch(0.65 0.01 240)"
                    fontSize={12}
                  />
                  <YAxis
                    domain={["dataMin - 100", "dataMax + 100"]}
                    stroke="oklch(0.65 0.01 240)"
                    fontSize={12}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="high"
                    stroke="oklch(0.65 0.2 140)"
                    strokeWidth={1}
                    dot={false}
                    name="High"
                  />
                  <Line
                    type="monotone"
                    dataKey="low"
                    stroke="oklch(0.62 0.25 15)"
                    strokeWidth={1}
                    dot={false}
                    name="Low"
                  />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke="oklch(0.65 0.25 260)"
                    strokeWidth={2}
                    dot={false}
                    name="Close"
                  />
                </LineChart>
              </ResponsiveContainer>

              {indicators.includes("volume") && (
                <ResponsiveContainer width="100%" height="20%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                    <XAxis
                      dataKey="time"
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                      stroke="oklch(0.65 0.01 240)"
                      fontSize={12}
                    />
                    <YAxis stroke="oklch(0.65 0.01 240)" fontSize={12} />
                    <Tooltip
                      formatter={(value: any) => [value.toLocaleString(), "Volume"]}
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                    />
                    <Bar dataKey="volume" fill="oklch(0.65 0.25 260 / 0.6)" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>

          <TabsContent value="line" className="h-full mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                <XAxis
                  dataKey="time"
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  stroke="oklch(0.65 0.01 240)"
                  fontSize={12}
                />
                <YAxis
                  domain={["dataMin - 100", "dataMax + 100"]}
                  stroke="oklch(0.65 0.01 240)"
                  fontSize={12}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="close" stroke="oklch(0.65 0.25 260)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="area" className="h-full mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                <XAxis
                  dataKey="time"
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  stroke="oklch(0.65 0.01 240)"
                  fontSize={12}
                />
                <YAxis
                  domain={["dataMin - 100", "dataMax + 100"]}
                  stroke="oklch(0.65 0.01 240)"
                  fontSize={12}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="close"
                  stroke="oklch(0.65 0.25 260)"
                  fill="oklch(0.65 0.25 260 / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
