"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, TrendingDown, TrendingUp, Zap, Shield, X, Bell, Volume2, VolumeX } from "lucide-react"

interface CrisisAlert {
  id: string
  type: "MARKET_CRASH" | "VOLATILITY_SPIKE" | "LIQUIDATION_RISK" | "NEWS_IMPACT" | "TECHNICAL_BREAKDOWN"
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  title: string
  message: string
  symbol?: string
  timestamp: Date
  action?: string
  dismissed?: boolean
}

const mockAlerts: CrisisAlert[] = [
  {
    id: "1",
    type: "MARKET_CRASH",
    severity: "CRITICAL",
    title: "Major Market Selloff Detected",
    message: "S&P 500 down 4.2% in 30 minutes. Consider reducing leverage and implementing stop losses.",
    symbol: "SPY",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    action: "Review positions immediately",
  },
  {
    id: "2",
    type: "VOLATILITY_SPIKE",
    severity: "HIGH",
    title: "Extreme Volatility Alert",
    message: "VIX spiked to 35.2 (+45% in 1 hour). Market uncertainty at elevated levels.",
    symbol: "VIX",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    action: "Consider hedging strategies",
  },
  {
    id: "3",
    type: "LIQUIDATION_RISK",
    severity: "HIGH",
    title: "Margin Call Warning",
    message: "Your BTC position is approaching liquidation threshold. Current margin ratio: 85%",
    symbol: "BTC-USD",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    action: "Add margin or reduce position",
  },
  {
    id: "4",
    type: "NEWS_IMPACT",
    severity: "MEDIUM",
    title: "Fed Rate Decision Impact",
    message: "FOMC meeting results causing sector rotation. Tech stocks under pressure.",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    action: "Monitor tech positions",
  },
]

export function CrisisAlerts() {
  const [alerts, setAlerts] = useState<CrisisAlert[]>(mockAlerts)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new alerts (10% chance every 30 seconds)
      if (Math.random() < 0.1) {
        const newAlert: CrisisAlert = {
          id: Date.now().toString(),
          type: "VOLATILITY_SPIKE",
          severity: "MEDIUM",
          title: "Price Movement Alert",
          message: `${["AAPL", "GOOGL", "MSFT", "TSLA"][Math.floor(Math.random() * 4)]} moved ${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 5 + 1).toFixed(1)}% in 5 minutes`,
          timestamp: new Date(),
          action: "Monitor closely",
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]) // Keep only 10 most recent

        // Play sound notification
        if (soundEnabled) {
          // In a real app, you'd play an actual sound file
          console.log("[v0] Crisis alert sound notification")
        }
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [soundEnabled])

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "HIGH":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "LOW":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "MARKET_CRASH":
        return <TrendingDown className="h-4 w-4" />
      case "VOLATILITY_SPIKE":
        return <Zap className="h-4 w-4" />
      case "LIQUIDATION_RISK":
        return <AlertTriangle className="h-4 w-4" />
      case "NEWS_IMPACT":
        return <Bell className="h-4 w-4" />
      case "TECHNICAL_BREAKDOWN":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  const activeAlerts = alerts.filter((alert) => !alert.dismissed)
  const criticalAlerts = activeAlerts.filter((alert) => alert.severity === "CRITICAL")

  if (activeAlerts.length === 0) return null

  return (
    <div className="border-b border-border bg-card">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-foreground">Crisis Monitoring</span>
              {criticalAlerts.length > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {criticalAlerts.length} Critical
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)} className="h-6 w-6 p-0">
                {soundEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-6 w-6 p-0">
                {isMinimized ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {activeAlerts.length} active alert{activeAlerts.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {!isMinimized && (
          <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
            {activeAlerts.slice(0, 3).map((alert) => (
              <Alert key={alert.id} className={`${getSeverityColor(alert.severity)} relative pr-8`}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getTypeIcon(alert.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                      {alert.symbol && (
                        <Badge variant="outline" className="text-xs font-mono">
                          {alert.symbol}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago
                      </span>
                    </div>

                    <AlertDescription className="text-xs">{alert.message}</AlertDescription>

                    {alert.action && (
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs bg-background/50 hover:bg-background/80"
                        >
                          {alert.action}
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="absolute top-2 right-2 h-4 w-4 p-0 hover:bg-background/50"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </Alert>
            ))}

            {activeAlerts.length > 3 && (
              <div className="text-center">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  View {activeAlerts.length - 3} more alerts
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
