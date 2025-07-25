"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const marketData = [
  { year: "2019", marketShare: 11.8, revenue: 82.1 },
  { year: "2020", marketShare: 12.1, revenue: 82.6 },
  { year: "2021", marketShare: 12.9, revenue: 93.8 },
  { year: "2022", marketShare: 12.7, revenue: 94.9 },
  { year: "2023", marketShare: 11.9, revenue: 85.2 },
  { year: "2024", marketShare: 12.3, revenue: 89.7 },
]

export function MarketPositionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Position</CardTitle>
        <CardDescription>Global pharmaceutical market share evolution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            marketShare: {
              label: "Market Share %",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="marketShare"
                stroke="var(--color-marketShare)"
                fill="var(--color-marketShare)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
