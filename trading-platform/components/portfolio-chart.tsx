"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

// Mock portfolio data
const generatePortfolioData = (days: number) => {
  const data = []
  let baseValue = 125000
  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Simulate realistic portfolio movement
    const change = (Math.random() - 0.5) * 2000
    baseValue += change
    baseValue = Math.max(100000, Math.min(200000, baseValue)) // Keep within realistic range

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(baseValue),
      return: Math.round((baseValue - 125000) * 100) / 100,
    })
  }

  return data
}

export function PortfolioChart() {
  const [timeframe, setTimeframe] = useState("1M")

  const timeframes = {
    "1W": 7,
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
  }

  const data = generatePortfolioData(timeframes[timeframe as keyof typeof timeframes])
  const currentValue = data[data.length - 1]?.value || 125000
  const previousValue = data[data.length - 2]?.value || 125000
  const change = currentValue - previousValue
  const changePercent = (change / previousValue) * 100

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xl sm:text-2xl font-bold">${currentValue.toLocaleString()}</div>
          <div className={`text-sm flex items-center ${change >= 0 ? "text-success" : "text-destructive"}`}>
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {Object.keys(timeframes).map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf)}
              className="text-xs min-w-[40px]"
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      <ChartContainer
        config={{
          value: {
            label: "Portfolio Value",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value)
                return window.innerWidth < 640
                  ? date.toLocaleDateString("en-US", { month: "numeric", day: "numeric" })
                  : date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={["dataMin - 2000", "dataMax + 2000"]}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              tick={{ fontSize: 12 }}
              width={80}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={2}
          dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
