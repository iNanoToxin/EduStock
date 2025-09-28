"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, Target, AlertTriangle, Zap, BarChart3 } from "lucide-react"

// Mock performance data
const performanceData = [
  { date: "2024-01-01", value: 100000, benchmark: 100000 },
  { date: "2024-01-15", value: 102500, benchmark: 101200 },
  { date: "2024-02-01", value: 98750, benchmark: 99800 },
  { date: "2024-02-15", value: 105600, benchmark: 102400 },
  { date: "2024-03-01", value: 112300, benchmark: 104800 },
  { date: "2024-03-15", value: 118900, benchmark: 107200 },
  { date: "2024-04-01", value: 125847, benchmark: 109600 },
]

const allocationData = [
  { name: "Bitcoin", value: 45.2, color: "oklch(0.75 0.2 60)" },
  { name: "Ethereum", value: 23.7, color: "oklch(0.65 0.25 260)" },
  { name: "Solana", value: 12.3, color: "oklch(0.65 0.2 140)" },
  { name: "Avalanche", value: 5.8, color: "oklch(0.62 0.25 15)" },
  { name: "Chainlink", value: 5.9, color: "oklch(0.7 0.15 300)" },
  { name: "Cash", value: 7.1, color: "oklch(0.65 0.01 240)" },
]

const riskMetrics = [
  { metric: "Sharpe Ratio", value: "1.85", benchmark: "1.42", better: true },
  { metric: "Max Drawdown", value: "-12.4%", benchmark: "-15.8%", better: true },
  { metric: "Volatility", value: "18.2%", benchmark: "22.1%", better: true },
  { metric: "Beta", value: "0.87", benchmark: "1.00", better: true },
  { metric: "Alpha", value: "4.2%", benchmark: "0.0%", better: true },
]

const rebalanceRecommendations = [
  {
    asset: "Bitcoin",
    current: 45.2,
    target: 40.0,
    action: "Sell",
    amount: "$6,542.36",
    reason: "Overweight due to price appreciation",
  },
  {
    asset: "Ethereum",
    current: 23.7,
    target: 25.0,
    action: "Buy",
    amount: "$1,634.12",
    reason: "Underweight, good entry opportunity",
  },
  {
    asset: "Solana",
    current: 12.3,
    target: 15.0,
    action: "Buy",
    amount: "$3,397.87",
    reason: "Strong fundamentals, increase allocation",
  },
]

export function PortfolioAnalytics() {
  const [activeTab, setActiveTab] = useState("overview")

  const totalReturn = ((125847 - 100000) / 100000) * 100
  const benchmarkReturn = ((109600 - 100000) / 100000) * 100
  const outperformance = totalReturn - benchmarkReturn

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Portfolio Analytics</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Rebalance
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-foreground">$125,847</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-success/20 text-success">
                  +{totalReturn.toFixed(2)}%
                </Badge>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">24h Change</p>
                  <p className="text-2xl font-bold text-success">+$2,847</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-success/20 text-success">
                  +2.31%
                </Badge>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outperformance</p>
                  <p className="text-2xl font-bold text-success">+{outperformance.toFixed(2)}%</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  vs Benchmark
                </Badge>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Risk Score</p>
                  <p className="text-2xl font-bold text-warning">7.2</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-warning/20 text-warning">
                  Moderate
                </Badge>
              </div>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Portfolio Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  stroke="oklch(0.65 0.01 240)"
                  fontSize={12}
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  stroke="oklch(0.65 0.01 240)"
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    `$${value.toLocaleString()}`,
                    name === "value" ? "Portfolio" : "Benchmark",
                  ]}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.65 0.25 260)"
                  strokeWidth={3}
                  dot={false}
                  name="Portfolio"
                />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  stroke="oklch(0.65 0.01 240)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Benchmark"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Rebalancing Recommendations */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Rebalancing Recommendations</h3>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Zap className="w-4 h-4 mr-2" />
                Auto-Rebalance
              </Button>
            </div>
            <div className="space-y-3">
              {rebalanceRecommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-foreground">{rec.asset}</span>
                      <Badge
                        variant="secondary"
                        className={`${
                          rec.action === "Buy" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {rec.action} {rec.amount}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {rec.current}% → {rec.target}%
                    </div>
                    <Progress value={(rec.current / rec.target) * 100} className="w-20 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium text-foreground">{metric.metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">vs {metric.benchmark}</span>
                      <Badge
                        variant="secondary"
                        className={`${
                          metric.better ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                        }`}
                      >
                        {metric.value}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={riskMetrics.slice(0, 3)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 240)" />
                    <XAxis dataKey="metric" stroke="oklch(0.65 0.01 240)" fontSize={12} />
                    <YAxis stroke="oklch(0.65 0.01 240)" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="value" fill="oklch(0.65 0.25 260)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Current Allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value}%`, "Allocation"]} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Allocation Details</h3>
              <div className="space-y-3">
                {allocationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-foreground">{item.value}%</span>
                      <Progress value={item.value} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Risk Assessment</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall Risk Score</span>
                  <Badge variant="secondary" className="bg-warning/20 text-warning">
                    7.2 / 10
                  </Badge>
                </div>
                <Progress value={72} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Your portfolio has moderate risk with good diversification across crypto assets.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Risk Factors</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm text-foreground">Concentration Risk</span>
                  <Badge variant="secondary" className="bg-warning/20 text-warning">
                    Medium
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm text-foreground">Market Risk</span>
                  <Badge variant="secondary" className="bg-destructive/20 text-destructive">
                    High
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm text-foreground">Liquidity Risk</span>
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    Low
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
