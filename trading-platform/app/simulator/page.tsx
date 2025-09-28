"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Play } from "lucide-react"
import Link from "next/link"
import { SimulatorChart } from "@/components/simulator-chart"

export default function SimulatorPage() {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // 30 days ago
  const [endDate, setEndDate] = useState(new Date())
  const [isRunning, setIsRunning] = useState(false)
  const [hasSimulated, setHasSimulated] = useState(false)

  const getModelPerformance = (startDate: Date, endDate: Date) => {
    const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const baseReturn = 0.12 // 12% annual return
    const dailyReturn = baseReturn / 365
    const totalReturn = dailyReturn * daysDiff

    // Simulate model vs market performance
    const modelReturn = totalReturn + Math.sin(daysDiff / 10) * 0.05
    const marketReturn = totalReturn * 0.8 // Model outperforms market

    return {
      totalReturn: modelReturn * 100,
      marketReturn: marketReturn * 100,
      daysDiff,
    }
  }

  const performance = getModelPerformance(selectedDate, endDate)

  const handleRunSimulation = () => {
    setIsRunning(true)
    // Simulate a brief loading state
    setTimeout(() => {
      setIsRunning(false)
      setHasSimulated(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Model Performance Simulator</h1>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Simulation Time Period
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="text-xs font-medium mb-1 block text-muted-foreground">Start Date</label>
                  <input
                    type="date"
                    value={selectedDate.toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium mb-1 block text-muted-foreground">End Date</label>
                  <input
                    type="date"
                    value={endDate.toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleRunSimulation}
                    disabled={isRunning}
                    className="h-8 px-4 text-sm"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    {isRunning ? "Running..." : "Run Simulation"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Model Returns</CardTitle>
            </CardHeader>
            <CardContent>
              {hasSimulated ? (
                <>
                  <div className="text-2xl font-bold text-blue-600">
                    {performance.totalReturn.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI Model Performance
                  </p>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No time period simulated yet
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Market Returns</CardTitle>
            </CardHeader>
            <CardContent>
              {hasSimulated ? (
                <>
                  <div className="text-2xl font-bold text-red-600">
                    {performance.marketReturn.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    S&P 500 Performance
                  </p>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No time period simulated yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Model vs Market Returns {"(over "+ performance.daysDiff + " Days)"}</CardTitle>
          </CardHeader>
          <CardContent>
            <SimulatorChart
              startDate={selectedDate}
              endDate={endDate}
              modelReturn={performance.totalReturn}
              marketReturn={performance.marketReturn}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
