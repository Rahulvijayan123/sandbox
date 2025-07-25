"use client"

import { X, Building2, Users, Zap, Target, TrendingUp, Shield, Handshake } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScientificAlignmentChart } from "./scientific-alignment-chart"
import { OperationalReadinessChart } from "./operational-readiness-chart"

interface CompanyDetailsProps {
  company: any
  onClose: () => void
}

export function CompanyDetails({ company, onClose }: CompanyDetailsProps) {
  const detailedMetrics = {
    scientificAlignment: 92,
    developmentReadiness: 88,
    operationalReadiness: 94,
    strategicSynergy: 89,
    commercialSynergy: 91,
    integrationReadiness: 87,
    dealExecutionReadiness: 93,
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{company.name} - Detailed Report</h2>
            <p className="text-slate-600">Comprehensive acquisition analysis and readiness assessment</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="scientific">Scientific & Alignment</TabsTrigger>
              <TabsTrigger value="operational">Development & Operations</TabsTrigger>
              <TabsTrigger value="strategic">Strategic & Commercial</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Building2 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{detailedMetrics.scientificAlignment}</p>
                    <p className="text-sm text-slate-600">Scientific Alignment</p>
                    <Progress value={detailedMetrics.scientificAlignment} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{detailedMetrics.developmentReadiness}</p>
                    <p className="text-sm text-slate-600">Development Readiness</p>
                    <Progress value={detailedMetrics.developmentReadiness} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{detailedMetrics.operationalReadiness}</p>
                    <p className="text-sm text-slate-600">Operational Readiness</p>
                    <Progress value={detailedMetrics.operationalReadiness} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{detailedMetrics.strategicSynergy}</p>
                    <p className="text-sm text-slate-600">Strategic Synergy</p>
                    <Progress value={detailedMetrics.strategicSynergy} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Performance Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Commercial Synergy</span>
                      <div className="flex items-center gap-2">
                        <Progress value={detailedMetrics.commercialSynergy} className="w-24" />
                        <span className="font-semibold">{detailedMetrics.commercialSynergy}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Integration Readiness</span>
                      <div className="flex items-center gap-2">
                        <Progress value={detailedMetrics.integrationReadiness} className="w-24" />
                        <span className="font-semibold">{detailedMetrics.integrationReadiness}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Deal Execution Readiness</span>
                      <div className="flex items-center gap-2">
                        <Progress value={detailedMetrics.dealExecutionReadiness} className="w-24" />
                        <span className="font-semibold">{detailedMetrics.dealExecutionReadiness}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Regulatory Risk</span>
                        <Badge variant="secondary">Low</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Financial Risk</span>
                        <Badge variant="secondary">Low</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Integration Risk</span>
                        <Badge variant="outline">Medium</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Market Risk</span>
                        <Badge variant="secondary">Low</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scientific" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScientificAlignmentChart />

                <Card>
                  <CardHeader>
                    <CardTitle>Research Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>R&D Investment</span>
                        <span className="font-semibold">$12.8B</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Patent Portfolio</span>
                        <span className="font-semibold">2,847 patents</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Clinical Trials</span>
                        <span className="font-semibold">156 active</span>
                      </div>
                      <Progress value={78} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Therapeutic Area Alignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">95%</p>
                      <p className="text-sm">Oncology</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">88%</p>
                      <p className="text-sm">Immunology</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">82%</p>
                      <p className="text-sm">Neuroscience</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">76%</p>
                      <p className="text-sm">Rare Diseases</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operational" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OperationalReadinessChart />

                <Card>
                  <CardHeader>
                    <CardTitle>Manufacturing Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Global Manufacturing Sites</span>
                      <span className="font-semibold">47 sites</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Production Capacity</span>
                      <span className="font-semibold">High</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Quality Compliance</span>
                      <Badge>FDA Approved</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Supply Chain Resilience</span>
                      <Badge variant="secondary">Excellent</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Development Timeline Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Phase I to Phase II</span>
                        <span className="text-sm text-slate-600">18 months avg</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Phase II to Phase III</span>
                        <span className="text-sm text-slate-600">24 months avg</span>
                      </div>
                      <Progress value={78} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Regulatory Approval</span>
                        <span className="text-sm text-slate-600">12 months avg</span>
                      </div>
                      <Progress value={92} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Position</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Global Market Share</span>
                      <span className="font-semibold">8.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Revenue Growth (YoY)</span>
                      <span className="font-semibold text-green-600">+12.4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Market Presence</span>
                      <span className="font-semibold">100+ countries</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Brand Recognition</span>
                      <Badge>Premium</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Strength</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Credit Rating</span>
                      <Badge>AAA</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cash Position</span>
                      <span className="font-semibold">$29.8B</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Debt-to-Equity</span>
                      <span className="font-semibold">0.42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ROI on Acquisitions</span>
                      <span className="font-semibold text-green-600">18.7%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Strategic Synergies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <Handshake className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <p className="font-semibold">Distribution Network</p>
                      <p className="text-sm text-slate-600">Global reach with established channels</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="font-semibold">Sales Force</p>
                      <p className="text-sm text-slate-600">12,000+ specialized representatives</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <p className="font-semibold">Market Access</p>
                      <p className="text-sm text-slate-600">Strong payer relationships</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
