"use client"

import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const costData = [
  { name: "R&D", value: 35, color: "#3b82f6" },
  { name: "Manufacturing", value: 25, color: "#10b981" },
  { name: "Sales & Marketing", value: 20, color: "#8b5cf6" },
  { name: "Regulatory", value: 8, color: "#f59e0b" },
  { name: "Integration", value: 7, color: "#ef4444" },
  { name: "Other", value: 5, color: "#6b7280" },
]

export function CostBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Structure Analysis</CardTitle>
        <CardDescription>Typical acquisition cost allocation</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Cost %",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={costData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {costData.map((entry, index) => (
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
