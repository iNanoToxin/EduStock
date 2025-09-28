"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TimePeriodSelectorProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

export function TimePeriodSelector({ selectedDate, onDateChange }: TimePeriodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const presetDates = [
    { label: "Today", date: new Date(), color: "bg-blue-500/20 text-blue-400" },
    {
      label: "1 Week Ago",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      color: "bg-green-500/20 text-green-400",
    },
    {
      label: "1 Month Ago",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      color: "bg-yellow-500/20 text-yellow-400",
    },
    {
      label: "3 Months Ago",
      date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      color: "bg-orange-500/20 text-orange-400",
    },
    {
      label: "6 Months Ago",
      date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      color: "bg-red-500/20 text-red-400",
    },
    {
      label: "1 Year Ago",
      date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      color: "bg-purple-500/20 text-purple-400",
    },
  ]

  const isToday = selectedDate.toDateString() === new Date().toDateString()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    if (!isNaN(newDate.getTime())) {
      onDateChange(newDate)
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent border-border/50 hover:bg-accent/50 h-8 px-3"
      >
        <Clock className="h-3 w-3 mr-1" />
        <span className="text-xs">{isToday ? "Live" : formatDate(selectedDate)}</span>
        {!isToday && (
          <Badge variant="secondary" className="ml-1 bg-amber-500/20 text-amber-400 text-xs px-1 py-0">
            Test
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-2 right-0 w-64 z-50 border border-border/50 bg-card/95 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium text-foreground">Time Period</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onDateChange(new Date())
                    setIsOpen(false)
                  }}
                  className="h-5 px-2 text-xs"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Quick Presets</label>
                <div className="grid grid-cols-2 gap-1">
                  {presetDates.map((preset) => (
                    <Button
                      key={preset.label}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onDateChange(preset.date)
                        setIsOpen(false)
                      }}
                      className={`justify-start text-xs h-7 ${
                        selectedDate.toDateString() === preset.date.toDateString() ? preset.color : "hover:bg-accent/50"
                      }`}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Custom Date</label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={handleDateInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-2 py-1 text-xs bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>

              <div className="pt-1 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  {isToday
                    ? "Live data"
                    : `Simulating as of ${formatDate(selectedDate)}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
