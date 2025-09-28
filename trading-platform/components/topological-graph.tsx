"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Target, Zap, TrendingUp } from "lucide-react"

export function TopologicalGraph() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">AI Investment Network</h3>
          <p className="text-sm text-muted-foreground">Demo portfolio topology</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">
            <Activity className="w-3 h-3 mr-1" />
            8 Nodes
          </Badge>
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="w-3 h-3 mr-1" />
            9 Connections
          </Badge>
        </div>
      </div>

      <div className="relative">
        {/* Demo Graph */}
        <div className="w-full h-80 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
            {/* Demo Edges */}
            <line x1="50" y1="20" x2="20" y2="50" stroke="#8b5cf6" strokeWidth="2" opacity="0.6" />
            <line x1="50" y1="20" x2="80" y2="50" stroke="#8b5cf6" strokeWidth="2" opacity="0.6" />
            <line x1="50" y1="20" x2="50" y2="80" stroke="#8b5cf6" strokeWidth="2" opacity="0.6" />
            <line x1="20" y1="50" x2="10" y2="30" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
            <line x1="20" y1="50" x2="30" y2="30" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
            <line x1="80" y1="50" x2="70" y2="30" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
            <line x1="50" y1="80" x2="20" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
            <line x1="50" y1="80" x2="80" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
            <line x1="50" y1="60" x2="50" y2="20" stroke="#f59e0b" strokeWidth="1" opacity="0.6" strokeDasharray="2,2" />

            {/* Demo Nodes */}
            <circle cx="50" cy="20" r="4" fill="#8b5cf6" stroke="white" strokeWidth="1" />
            <text x="50" y="16" textAnchor="middle" fontSize="2" fill="currentColor">AI Model</text>
            
            <circle cx="20" cy="50" r="4" fill="#3b82f6" stroke="white" strokeWidth="1" />
            <text x="20" y="46" textAnchor="middle" fontSize="2" fill="currentColor">Tech</text>
            
            <circle cx="80" cy="50" r="4" fill="#3b82f6" stroke="white" strokeWidth="1" />
            <text x="80" y="46" textAnchor="middle" fontSize="2" fill="currentColor">Finance</text>
            
            <circle cx="50" cy="80" r="4" fill="#3b82f6" stroke="white" strokeWidth="1" />
            <text x="50" y="76" textAnchor="middle" fontSize="2" fill="currentColor">Healthcare</text>
            
            <circle cx="10" cy="30" r="3" fill="#10b981" stroke="white" strokeWidth="1" />
            <text x="10" y="27" textAnchor="middle" fontSize="1.5" fill="currentColor">AAPL</text>
            
            <circle cx="30" cy="30" r="3" fill="#10b981" stroke="white" strokeWidth="1" />
            <text x="30" y="27" textAnchor="middle" fontSize="1.5" fill="currentColor">MSFT</text>
            
            <circle cx="70" cy="30" r="3" fill="#10b981" stroke="white" strokeWidth="1" />
            <text x="70" y="27" textAnchor="middle" fontSize="1.5" fill="currentColor">JPM</text>
            
            <circle cx="50" cy="60" r="4" fill="#f59e0b" stroke="white" strokeWidth="1" />
            <text x="50" y="56" textAnchor="middle" fontSize="2" fill="currentColor">S&P 500</text>
          </svg>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>AI Model</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Sectors</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Stocks</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span>Market</span>
            </div>
          </div>
        </div>

        {/* Demo Info Card */}
        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="w-4 h-4" />
              Demo Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Network Type</p>
                <p className="text-lg font-semibold">AI Investment</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold text-blue-600">Demo Mode</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This is a demonstration of the AI investment network topology. 
              In the full version, nodes would be interactive and show real-time data.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
