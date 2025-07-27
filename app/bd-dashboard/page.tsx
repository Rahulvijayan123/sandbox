"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, Award, CheckCircle, Target, Zap, BarChart3, FlaskConical, Microscope, TestTube } from "lucide-react"
import { RevenueChart } from "./components/revenue-chart"
import { DealFlowChart } from "./components/deal-flow-chart"
import { ScientificAlignmentChart } from "./components/scientific-alignment-chart"
import { OperationalReadinessChart } from "./components/operational-readiness-chart"
import { FinancialProjectionsChart } from "./components/financial-projections-chart"
import { ROIAnalysisChart } from "./components/roi-analysis-chart"
import { UnblurredDealActivity } from "./components/unblurred-deal-activity"
import { UnblurredRegulatoryStatus } from "./components/unblurred-regulatory-status"
import { UnblurredSupplyChainRisk } from "./components/unblurred-supply-chain-risk"
import { UnblurredTAMAnalysis } from "./components/unblurred-tam-analysis"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Dashboard() {
  const [company, setCompany] = useState<string>("")
  const [rationale, setRationale] = useState<string>("")
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null)
  const [strategicFitScore, setStrategicFitScore] = useState<number | null>(null)
  const [alternativeBuyers, setAlternativeBuyers] = useState<string[]>([])
  const [revenuePerformance, setRevenuePerformance] = useState<any>(null)
  const [scientificCapabilities, setScientificCapabilities] = useState<any>(null)
  const [dealActivity, setDealActivity] = useState<any>(null)
  const [regulatoryStatus, setRegulatoryStatus] = useState<any>(null)
  const [supplyChainRisk, setSupplyChainRisk] = useState<any>(null)
  const [marketAnalysis, setMarketAnalysis] = useState<any>(null)
  // Enhanced unblurred sections state
  const [executiveOverview, setExecutiveOverview] = useState<any>(null)
  const [developmentReadiness, setDevelopmentReadiness] = useState<any>(null)
  const [operationalReadiness, setOperationalReadiness] = useState<any>(null)
  const [strategicSynergy, setStrategicSynergy] = useState<any>(null)
  const [showFullBlur, setShowFullBlur] = useState(false)

  useEffect(() => {
    // Try to get the Perplexity output from localStorage (set by BD Agent form)
    const perplexityResult = localStorage.getItem("perplexityResult")
    if (perplexityResult) {
      try {
        const parsed = JSON.parse(perplexityResult)
        setCompany(parsed.buyer || "")
        setRationale(parsed.rationale || "")
        setConfidenceScore(parsed.confidence_score)
        setStrategicFitScore(parsed.strategic_fit_score)
        setAlternativeBuyers(parsed.alternative_buyers || [])
        setRevenuePerformance(parsed.revenue_performance)
        setScientificCapabilities(parsed.scientific_capabilities)
        setDealActivity(parsed.deal_activity)
        setRegulatoryStatus(parsed.regulatory_status)
        setSupplyChainRisk(parsed.supply_chain_risk)
        setMarketAnalysis(parsed.market_analysis)
        // Enhanced unblurred sections
        setExecutiveOverview(parsed.executive_overview)
        setDevelopmentReadiness(parsed.development_readiness)
        setOperationalReadiness(parsed.operational_readiness)
        setStrategicSynergy(parsed.strategic_synergy)
      } catch {}
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-800">BD Agent Analysis</h1>
              <p className="text-slate-600 text-lg">Pharmaceutical Acquisition Recommendation</p>
            </div>
          </div>
        </div>

        {/* Recommendation Result */}
        <Card className="mb-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <CardTitle className="text-3xl text-slate-800">{company || "Company Name"}</CardTitle>
                  <CardDescription className="text-lg">
                    Recommended Pharmaceutical Partner
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* Enhanced Metrics Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {confidenceScore !== null && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{Math.round(confidenceScore * 100)}%</div>
                    <div className="text-sm text-blue-700">Confidence Score</div>
                  </div>
                )}
                {strategicFitScore !== null && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{Math.round(strategicFitScore * 100)}%</div>
                    <div className="text-sm text-green-700">Strategic Fit</div>
                  </div>
                )}
                {alternativeBuyers.length > 0 && (
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{alternativeBuyers.length}</div>
                    <div className="text-sm text-purple-700">Alternative Buyers</div>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Strategic Rationale</h3>
              <p className="text-slate-700 leading-relaxed text-lg mb-4">{rationale || "Rationale will appear here."}</p>
              
              {/* Alternative Buyers Display */}
              {alternativeBuyers.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-slate-800">Alternative Buyers</h4>
                  <div className="flex flex-wrap gap-2">
                    {alternativeBuyers.map((buyer, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {buyer}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Strategic Fit Assessment Accordion */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Strategic Fit Assessment</CardTitle>
            <CardDescription>Comprehensive analysis across all critical dimensions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full space-y-2">
              {/* Executive Overview */}
              <AccordionItem value="overview" className="px-4">
                <AccordionTrigger style={{ backgroundColor: '#fff', color: '#000' }} className="text-lg font-semibold hover:no-underline focus:no-underline bg-transparent shadow-none">
                  Executive Overview
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Revenue Performance Card */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Revenue Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {revenuePerformance ? (
                            <div className="space-y-4">
                              {revenuePerformance.recent_revenue && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Recent Revenue</h4>
                                  <p className="text-slate-700 leading-relaxed">{revenuePerformance.recent_revenue}</p>
                                </div>
                              )}
                              {revenuePerformance.growth_trends && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Growth Trends</h4>
                                  <p className="text-slate-700 leading-relaxed">{revenuePerformance.growth_trends}</p>
                                </div>
                              )}
                              {revenuePerformance.market_position && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Market Position</h4>
                                  <p className="text-slate-700 leading-relaxed">{revenuePerformance.market_position}</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                              <p className="mb-2">Revenue for the period reached a record high, driven by strong sales across all business units. Growth was particularly notable in emerging markets, with double-digit increases in several key regions. The company continues to outperform industry benchmarks, maintaining a robust pipeline and expanding its market share. Strategic pricing initiatives and product launches contributed to sustained top-line growth, while operational efficiencies improved margins. Ongoing investments in digital transformation and supply chain optimization further enhanced financial performance.</p>
                              <p className="mb-2">In addition, the company benefited from favorable currency exchange rates and a successful cost containment program. These factors, combined with a disciplined approach to capital allocation, have positioned the organization for continued growth in the coming quarters.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      {/* Unblurred Deal Activity */}
                      <UnblurredDealActivity dealActivity={executiveOverview?.deal_activity} />
                    </div>

                    {/* New Blurred Sections for Executive Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Therapeutic Area Investment Trends */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Therapeutic Area Investment Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-3">
                              <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="mt-4 h-20 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Indication-Specific Competitive Positioning */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Indication-Specific Competitive Positioning</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-2">
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="mt-3 h-16 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Historical M&A Benchmarking for Similar Assets */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Historical M&A Benchmarking for Similar Assets</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-3">
                              <div className="h-4 bg-slate-300 rounded w-2/3"></div>
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="mt-4 h-24 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Scientific Capabilities - Standalone Section */}
              <AccordionItem value="scientific" className="px-4">
                <AccordionTrigger style={{ backgroundColor: '#fff', color: '#000' }} className="text-lg font-semibold hover:no-underline focus:no-underline bg-transparent shadow-none">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5" />
                    Scientific Capabilities
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Scientific Alignment Chart */}
                      <ScientificAlignmentChart />
                      
                      {/* Scientific Capabilities Details */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Research & Development Excellence</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {scientificCapabilities ? (
                            <div className="space-y-4">
                              {scientificCapabilities.research_expertise && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Research Expertise</h4>
                                  <p className="text-slate-700 leading-relaxed">{scientificCapabilities.research_expertise}</p>
                                </div>
                              )}
                              {scientificCapabilities.technology_platforms && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Technology Platforms</h4>
                                  <p className="text-slate-700 leading-relaxed">{scientificCapabilities.technology_platforms}</p>
                                </div>
                              )}
                              {scientificCapabilities.innovation_pipeline && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Innovation Pipeline</h4>
                                  <p className="text-slate-700 leading-relaxed">{scientificCapabilities.innovation_pipeline}</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                              <p className="mb-2">The company demonstrates exceptional research capabilities across multiple therapeutic areas, with a proven track record of breakthrough discoveries and innovative drug development. Their scientific expertise spans from target identification through clinical development, with particular strength in precision medicine and novel therapeutic modalities.</p>
                              <p className="mb-2">Advanced technology platforms enable rapid drug discovery and optimization, while a robust innovation pipeline ensures sustained scientific leadership. The organization's commitment to cutting-edge research is evidenced by numerous peer-reviewed publications, patents, and successful drug approvals.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Development Readiness */}
              <AccordionItem value="development" className="px-4">
                <AccordionTrigger style={{ backgroundColor: '#fff', color: '#000' }} className="text-lg font-semibold hover:no-underline focus:no-underline bg-transparent shadow-none">
                  Development Readiness
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Unblurred Regulatory Status */}
                      <UnblurredRegulatoryStatus regulatoryStatus={developmentReadiness?.regulatory_status} />
                      
                      {/* Clinical Trial Progress & Data Availability */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Clinical Trial Progress & Data Availability</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="relative">
                            <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                              <div className="space-y-2">
                                <p className="text-base leading-relaxed">Multiple trials are ongoing across Phases I-III. Interim data readouts have demonstrated strong efficacy signals and a favorable safety profile. Data packages are available for regulatory review.</p>
                                <svg width="100%" height="60" viewBox="0 0 200 60" className="mt-2">
                                  <polyline points="0,50 20,40 40,30 60,20 80,25 100,15 120,10 140,20 160,30 180,25 200,15" fill="none" stroke="#888" strokeWidth="2" />
                                  <rect x="0" y="50" width="200" height="10" fill="#f3f4f6" />
                                </svg>
                              </div>
                            </div>
                            <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true"></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* New Blurred Sections for Development Readiness */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* CMC Maturity and Process Scalability */}
                      <Card>
                        <CardHeader>
                          <CardTitle>CMC Maturity and Process Scalability</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-2">
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="mt-3 h-20 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Nonclinical and Toxicology Summary */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Nonclinical and Toxicology Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-3">
                              <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="mt-4 h-16 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Clinical Protocol Risk Assessment */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Clinical Protocol Risk Assessment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-2">
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="mt-3 h-24 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Operational Readiness */}
              <AccordionItem value="operational" className="px-4">
                <AccordionTrigger style={{ backgroundColor: '#fff', color: '#000' }} className="text-lg font-semibold hover:no-underline focus:no-underline bg-transparent shadow-none">
                  Operational Readiness
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-8">
                    {/* Financial Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <OperationalReadinessChart />
                    </div>

                    {/* Detailed Text Report */}
                    <div className="prose max-w-none space-y-6">
                      {/* Unblurred Supply Chain Risk */}
                      <UnblurredSupplyChainRisk supplyChainRisk={operationalReadiness?.supply_chain_risk} />
                      
                      {/* ESG / Sustainability Objectives */}
                      <Card>
                        <CardHeader>
                          <CardTitle>ESG / Sustainability Objectives</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <ul className="list-disc pl-6 text-xs mb-2">
                              <li>Carbon neutrality achieved</li>
                              <li>89% waste reduction</li>
                              <li>78% recyclable packaging</li>
                              <li>34% reduction in water usage</li>
                              <li>$450M invested in local communities</li>
                              <li>Zero waste to landfill at 45 facilities</li>
                            </ul>
                            <p className="mb-2">Ongoing programs drive continuous improvement and stakeholder engagement. Water stewardship and community investment are key priorities for the next phase of sustainability initiatives.</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* New Blurred Sections for Operational Readiness */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Third-Party Dependency Risk Map */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Third-Party Dependency Risk Map</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-3">
                              <div className="h-4 bg-slate-300 rounded w-2/3"></div>
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="mt-4 h-20 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Manufacturing Geography and Political Exposure */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Manufacturing Geography and Political Exposure</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-2">
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="mt-3 h-16 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* CDMO Partner Fit Scorecard */}
                      <Card>
                        <CardHeader>
                          <CardTitle>CDMO Partner Fit Scorecard</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-3">
                              <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="mt-4 h-24 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Strategic Synergy */}
              <AccordionItem value="strategic" className="px-4">
                <AccordionTrigger style={{ backgroundColor: '#fff', color: '#000' }} className="text-lg font-semibold hover:no-underline focus:no-underline bg-transparent shadow-none">
                  Strategic Synergy
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-8">
                    {/* Financial Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <FinancialProjectionsChart />
                      <ROIAnalysisChart />
                    </div>

                    {/* Detailed Text Report */}
                    <div className="prose max-w-none space-y-6">
                      {/* Unblurred TAM Analysis */}
                      <UnblurredTAMAnalysis tamAnalysis={strategicSynergy?.tam_analysis} />
                      
                      {/* Portfolio Synergy */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Portfolio Synergy (Internal and External)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <ul className="list-disc pl-6 text-xs mb-2">
                              <li>Cross-portfolio revenue: $2.8B</li>
                              <li>Shared R&D savings: $1.2B</li>
                              <li>Commercial leverage: $890M</li>
                              <li>Platform technology savings: $500M</li>
                              <li>47 active strategic partnerships</li>
                              <li>23 breakthrough designations</li>
                              <li>Integrated sales force</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* New Blurred Sections for Strategic Synergy */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Pipeline Overlap and Redundancy Check */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Pipeline Overlap and Redundancy Check</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-2">
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="mt-3 h-20 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Portfolio Fit Heatmap */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Portfolio Fit Heatmap</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-3">
                              <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="mt-4 h-16 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Synergy-Adjusted IRR Simulation */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Synergy-Adjusted IRR Simulation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-3">
                              <div className="h-4 bg-slate-300 rounded w-2/3"></div>
                              <div className="h-3 bg-slate-300 rounded w-full"></div>
                              <div className="h-3 bg-slate-300 rounded w-5/6"></div>
                              <div className="mt-4 h-24 bg-slate-200 rounded"></div>
                              <div className="h-3 bg-slate-300 rounded w-4/5"></div>
                              <div className="h-3 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-300 rounded w-2/3"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 