"use client"

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const marketShareData = [
  { name: "Johnson & Johnson", value: 12.8, color: "#3b82f6" },
  { name: "Pfizer", value: 10.2, color: "#10b981" },
  { name: "Roche", value: 8.9, color: "#8b5cf6" },
  { name: "Novartis", value: 7.4, color: "#f59e0b" },
  { name: "Merck & Co", value: 6.8, color: "#ef4444" },
  { name: "Others", value: 53.9, color: "#6b7280" },
]

export function MarketShareChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Pharmaceutical Market Share</CardTitle>
        <CardDescription>Top players by revenue share (2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Market Share %",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={marketShareData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {marketShareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
