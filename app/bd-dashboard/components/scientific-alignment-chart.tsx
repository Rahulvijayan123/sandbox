"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const scientificData = [
  { subject: "Research Excellence", score: 94 },
  { subject: "Patent Portfolio", score: 91 },
  { subject: "Clinical Success", score: 89 },
  { subject: "Regulatory Expertise", score: 96 },
  { subject: "Technology Platform", score: 87 },
  { subject: "Innovation Pipeline", score: 92 },
]

export function ScientificAlignmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scientific Capabilities</CardTitle>
        <CardDescription>Multi-dimensional research assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            score: {
              label: "Capability Score",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={scientificData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="var(--color-score)"
                fill="var(--color-score)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
