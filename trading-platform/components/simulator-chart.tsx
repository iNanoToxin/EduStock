"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface SimulatorChartProps {
  startDate: Date
  endDate: Date
  modelReturn: number
  marketReturn: number
}

export function SimulatorChart({ startDate, endDate, modelReturn, marketReturn }: SimulatorChartProps) {
  // Generate daily performance data
  const generatePerformanceData = () => {
    const data = []
    const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const dailyModelReturn = modelReturn / daysDiff / 100
    const dailyMarketReturn = marketReturn / daysDiff / 100

    let cumulativeModel = 0
    let cumulativeMarket = 0

    for (let i = 0; i <= daysDiff; i++) {
      const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)

      // Add some realistic volatility
      const modelDaily = dailyModelReturn + (Math.random() - 0.5) * 0.02
      const marketDaily = dailyMarketReturn + (Math.random() - 0.5) * 0.015

      cumulativeModel += modelDaily
      cumulativeMarket += marketDaily

      data.push({
        date: currentDate.toLocaleDateString(),
        model: (cumulativeModel * 100).toFixed(2),
        market: (cumulativeMarket * 100).toFixed(2),
      })
    }

    return data
  }

  const data = generatePerformanceData()

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs fill-muted-foreground"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            className="text-xs fill-muted-foreground"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
            formatter={(value: any, name: string) => [
              `${value}%`,
              name === "model" ? "AI Model" : "S&P 500",
            ]}
          />
          <Legend 
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="model"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="AI Model"
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="market"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="S&P 500"
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
