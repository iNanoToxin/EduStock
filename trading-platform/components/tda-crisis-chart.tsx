"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, Activity } from "lucide-react"

interface TDAFeature {
  date: string
  wasserstein_distance: number
  beta0: number
  beta1: number
  beta2: number
  lp2_distance: number
}

export function TDACrisisChart() {
  const [data, setData] = useState<TDAFeature[]>([])
  const [timeframe, setTimeframe] = useState("1Y")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading TDA features data
    const loadTDAFeatures = async () => {
      setLoading(true)
      
      // Generate mock TDA features data based on the CSV structure
      const mockData: TDAFeature[] = []
      const startDate = new Date('2018-02-28')
      const endDate = new Date()
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        // Skip weekends
        if (d.getDay() === 0 || d.getDay() === 6) continue
        
        const daysDiff = Math.floor((d.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        
        // Simulate TDA features with some realistic patterns
        const wasserstein_distance = 0.5 + Math.sin(daysDiff / 30) * 0.8 + Math.random() * 0.3
        const beta0 = Math.floor(Math.random() * 5) + 1
        const beta1 = Math.floor(Math.random() * 3)
        const beta2 = Math.floor(Math.random() * 2)
        const lp2_distance = Math.random() * 5
        
        mockData.push({
          date: d.toISOString().split('T')[0],
          wasserstein_distance,
          beta0,
          beta1,
          beta2,
          lp2_distance
        })
      }
      
      setData(mockData)
      setLoading(false)
    }
    
    loadTDAFeatures()
  }, [])

  const timeframes = {
    "3M": 90,
    "6M": 180,
    "1Y": 365,
    "2Y": 730,
    "5Y": 1825,
  }

  const filteredData = data.slice(-timeframes[timeframe as keyof typeof timeframes])

  const getCrisisLevel = (wasserstein: number, beta0: number) => {
    if (wasserstein > 1.5 && beta0 >= 4) return { level: "High", color: "#ef4444" }
    if (wasserstein > 1.0 && beta0 >= 3) return { level: "Medium", color: "#f59e0b" }
    if (wasserstein > 0.5 && beta0 >= 2) return { level: "Low", color: "#10b981" }
    return { level: "Stable", color: "#3b82f6" }
  }

  const currentCrisis = filteredData.length > 0 ? 
    getCrisisLevel(
      filteredData[filteredData.length - 1].wasserstein_distance,
      filteredData[filteredData.length - 1].beta0
    ) : { level: "Stable", color: "#3b82f6" }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading TDA features...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: currentCrisis.color }}
            />
            <span className="text-sm font-medium">Crisis Level: {currentCrisis.level}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Based on Wasserstein Distance & Betti Numbers
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
          wasserstein_distance: {
            label: "Wasserstein Distance",
            color: "#3b82f6",
          },
          beta0: {
            label: "Beta 0 (Connected Components)",
            color: "#ef4444",
          },
          lp2_distance: {
            label: "L2 Distance",
            color: "#10b981",
          },
        }}
        className="h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
              domain={[0, "dataMax + 0.5"]}
              tick={{ fontSize: 12 }}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
              formatter={(value: any, name: string) => [
                typeof value === 'number' ? value.toFixed(3) : value,
                name === "wasserstein_distance" ? "Wasserstein Distance" : 
                name === "beta0" ? "Beta 0" : "L2 Distance"
              ]}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="wasserstein_distance"
              stroke="var(--color-wasserstein_distance)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="beta0"
              stroke="var(--color-beta0)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="lp2_distance"
              stroke="var(--color-lp2_distance)"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <div className="text-lg font-semibold text-blue-600">
            {filteredData.length > 0 ? filteredData[filteredData.length - 1].wasserstein_distance.toFixed(3) : "0.000"}
          </div>
          <p className="text-xs text-muted-foreground">Wasserstein Distance</p>
        </div>
        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
          <div className="text-lg font-semibold text-red-600">
            {filteredData.length > 0 ? filteredData[filteredData.length - 1].beta0 : "0"}
          </div>
          <p className="text-xs text-muted-foreground">Beta 0</p>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
          <div className="text-lg font-semibold text-green-600">
            {filteredData.length > 0 ? filteredData[filteredData.length - 1].beta1 : "0"}
          </div>
          <p className="text-xs text-muted-foreground">Beta 1</p>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
          <div className="text-lg font-semibold text-orange-600">
            {filteredData.length > 0 ? filteredData[filteredData.length - 1].lp2_distance.toFixed(2) : "0.00"}
          </div>
          <p className="text-xs text-muted-foreground">L2 Distance</p>
        </div>
      </div>
    </div>
  )
}
