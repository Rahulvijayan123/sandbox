"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const dealFlowData = [
  { quarter: "Q1 2023", deals: 2, value: 3.2 },
  { quarter: "Q2 2023", deals: 1, value: 6.8 },
  { quarter: "Q3 2023", deals: 3, value: 2.1 },
  { quarter: "Q4 2023", deals: 2, value: 4.5 },
  { quarter: "Q1 2024", deals: 1, value: 8.9 },
  { quarter: "Q2 2024", deals: 2, value: 3.7 },
]

export function DealFlowChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deal Activity</CardTitle>
        <CardDescription>Quarterly Acquisition Volume</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            deals: {
              label: "Number of Deals",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dealFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="deals" fill="var(--color-deals)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
