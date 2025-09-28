"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, TrendingUp, TrendingDown, DollarSign, BarChart3, MessageCircle } from "lucide-react"
import { PortfolioChart } from "./portfolio-chart"
import { TDACrisisChart } from "./tda-crisis-chart"
import { StockRecommendations } from "./stock-recommendations"
import { AssistantChatbot } from "./assistant-chatbot"
import { TimePeriodSelector } from "./time-period-selector"
import Link from "next/link"

export function PortfolioDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Ensure light mode on component mount
  React.useEffect(() => {
    document.documentElement.classList.remove("dark")
  }, [])

  const getPortfolioStats = (date: Date) => {
    const daysDiff = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    const baseValue = 125847.32
    const simulatedValue = baseValue - daysDiff * 150 + Math.sin(daysDiff / 10) * 5000
    const dayChange = Math.sin(daysDiff / 5) * 2000 + Math.random() * 1000 - 500

    return {
      totalValue: Math.max(simulatedValue, 50000),
      dayChange: dayChange,
      dayChangePercent: (dayChange / simulatedValue) * 100,
      totalReturn: simulatedValue - 107612.76,
      totalReturnPercent: ((simulatedValue - 107612.76) / 107612.76) * 100,
    }
  }

  const portfolioStats = getPortfolioStats(selectedDate)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">EduStock</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/simulator">
              <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <BarChart3 className="h-4 w-4 mr-2" />
                Simulator
              </Button>
            </Link>

            <Button variant="default" size="sm" onClick={() => setShowChat(!showChat)} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Financial Assistant
            </Button>

            <Button variant="outline" size="icon" onClick={toggleTheme} className="bg-transparent">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
          {/* Portfolio Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioStats.totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Portfolio balance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
                {portfolioStats.dayChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${portfolioStats.dayChange >= 0 ? "text-success" : "text-destructive"}`}
                >
                  {portfolioStats.dayChange >= 0 ? "+" : ""}${portfolioStats.dayChange.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {portfolioStats.dayChangePercent >= 0 ? "+" : ""}
                  {portfolioStats.dayChangePercent.toFixed(2)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                {portfolioStats.totalReturn >= 0 ? (
                  <BarChart3 className="h-4 w-4 text-success" />
                ) : (
                  <BarChart3 className="h-4 w-4 text-destructive" />
                )}
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${portfolioStats.totalReturn >= 0 ? "text-success" : "text-destructive"}`}
                >
                  {portfolioStats.totalReturn >= 0 ? "+" : ""}${portfolioStats.totalReturn.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {portfolioStats.totalReturnPercent >= 0 ? "+" : ""}
                  {portfolioStats.totalReturnPercent.toFixed(1)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Holdings</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Active positions</p>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Chart */}
          <Card>
            <CardHeader className="">
              <CardTitle className="text-lg sm:text-xl">Portfolio Performance</CardTitle>
              <CardDescription>Your investment portfolio tracking</CardDescription>
            </CardHeader>
            <CardContent className="sm:p-6">
              <PortfolioChart />
            </CardContent>
          </Card>

          {/* TDA Crisis Chart */}
          <Card>
            <CardHeader className="">
              <CardTitle className="text-lg sm:text-xl">Crisis Prediction</CardTitle>
              <CardDescription>Using Topological Data Analysis to Predict Crashes</CardDescription>
            </CardHeader>
            <CardContent className="sm:p-6">
            <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px]">
              <img
                src="tda-crisis-illustration.png"
                alt="TDA Crisis Prediction Illustratio Examples"
                className="w-full h-full object-contain"
                style={{ minHeight: 200, minWidth: 200, maxHeight: "100%", maxWidth: "100%" }}
              />
              <img
                src="tda-crisis-illustration2.png"
                alt="TDA Crisis Prediction Illustratio Examples"
                className="w-full h-full object-contain"
                style={{ minHeight: 200, minWidth: 200, maxHeight: "100%", maxWidth: "100%" }}
              />
              <p>
                Images show rise in wasserstein distances before financial crashes, showing that crisis' can be predicted beforehand
              </p>
            </div>
            </CardContent>
          </Card>


        </div>

        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border bg-card/50 flex flex-col max-h-[50vh] lg:max-h-none">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">AI Stock Recommendations</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            <StockRecommendations />
          </div>
        </div>
      </div>

      {showChat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-2xl h-[90vh] sm:h-[80vh] max-h-[700px] min-h-[400px] sm:min-h-[500px]">
            <AssistantChatbot 
              onClose={() => setShowChat(false)} 
              portfolioData={{
                totalValue: portfolioStats.totalValue,
                dayChange: portfolioStats.dayChange,
                dayChangePercent: portfolioStats.dayChangePercent,
                totalReturn: portfolioStats.totalReturn,
                totalReturnPercent: portfolioStats.totalReturnPercent,
                holdings: 12
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
