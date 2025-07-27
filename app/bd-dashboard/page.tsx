"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, Award, CheckCircle, Target, Zap, BarChart3 } from "lucide-react"
import { RevenueChart } from "./components/revenue-chart"
import { DealFlowChart } from "./components/deal-flow-chart"
import { ScientificAlignmentChart } from "./components/scientific-alignment-chart"
import { OperationalReadinessChart } from "./components/operational-readiness-chart"
import { FinancialProjectionsChart } from "./components/financial-projections-chart"
import { ROIAnalysisChart } from "./components/roi-analysis-chart"
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
              {/* Blurred overflow section to suggest more content */}
              <div className={showFullBlur ? "relative h-[700px] overflow-hidden rounded-lg mt-6" : "relative h-32 overflow-hidden rounded-lg mt-6"}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />
                <div className="blur-sm select-none text-slate-400 whitespace-pre-line" aria-hidden="true" style={{fontSize: '1.1rem', lineHeight: '1.7'}}>
                  {showFullBlur
                    ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. `.repeat(50)
                    : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.`}
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition"
                  onClick={() => setShowFullBlur((v) => !v)}
                >
                  {showFullBlur ? "View Less" : "View More"}
                </button>
              </div>
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
                      {/* Deal Activity Card */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Deal Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {dealActivity ? (
                            <div className="space-y-4">
                              {dealActivity.recent_deals && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Recent Deals</h4>
                                  <p className="text-slate-700 leading-relaxed text-sm">{dealActivity.recent_deals}</p>
                                </div>
                              )}
                              {dealActivity.partnerships && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Partnerships</h4>
                                  <p className="text-slate-700 leading-relaxed text-sm">{dealActivity.partnerships}</p>
                                </div>
                              )}
                              {dealActivity.investment_focus && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Investment Focus</h4>
                                  <p className="text-slate-700 leading-relaxed text-sm">{dealActivity.investment_focus}</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                              <ul className="list-disc pl-6 text-xs mb-2">
                                <li>Acquisition A: $1.2B</li>
                                <li>Partnership B: $500M</li>
                                <li>Acquisition C: $800M</li>
                                <li>Collaboration D: $300M</li>
                                <li>Licensing E: $150M</li>
                                <li>Synergy realization: $200M</li>
                                <li>New market entries: 3</li>
                                <li>Pipeline expansion: 5 assets</li>
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    {/* Executive Summary Card (Blurred Content) */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Executive Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                          <p className="mb-2">Johnson & Johnson represents the optimal pharmaceutical acquisition partner based on comprehensive analysis across scientific, operational, strategic, and financial dimensions. Their exceptional track record, global infrastructure, and proven integration capabilities position them as the clear choice for drug acquisition opportunities. The company’s leadership in innovation, regulatory compliance, and commercial execution is evidenced by industry awards and consistent outperformance of peers. Strategic investments in R&D, digital health, and emerging markets underpin a robust growth outlook. The combination of financial strength, operational excellence, and strategic market position creates an ideal environment for maximizing the value of acquired pharmaceutical assets.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Scientific Alignment */}
              <AccordionItem value="scientific" className="px-4">
                <AccordionTrigger style={{ backgroundColor: '#fff', color: '#000' }} className="text-lg font-semibold hover:no-underline focus:no-underline bg-transparent shadow-none">
                  Scientific Alignment
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Scientific Capabilities Card */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Scientific Capabilities</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {scientificCapabilities ? (
                            <div className="space-y-4">
                              {scientificCapabilities.research_infrastructure && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Research Infrastructure</h4>
                                  <p className="text-slate-700 leading-relaxed">{scientificCapabilities.research_infrastructure}</p>
                                </div>
                              )}
                              {scientificCapabilities.technology_platforms && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Technology Platforms</h4>
                                  <p className="text-slate-700 leading-relaxed">{scientificCapabilities.technology_platforms}</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                              <p className="mb-2">Our research team leverages state-of-the-art facilities and advanced analytics to drive innovation across multiple therapeutic areas. We have established a robust pipeline of novel therapies, supported by cross-functional collaboration and a commitment to scientific excellence. Ongoing investments in R&D ensure a continuous flow of breakthrough technologies and clinical solutions.</p>
                              <ul className="list-disc pl-6 text-sm">
                                <li>State-of-the-art research labs</li>
                                <li>Cross-functional collaboration</li>
                                <li>Continuous R&D investment</li>
                                <li>Breakthrough technology pipeline</li>
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      {/* Key Scientific Metrics Card */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Key Scientific Metrics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {scientificCapabilities?.key_metrics ? (
                            <div className="space-y-4">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left font-semibold text-slate-800">Metric</th>
                                    <th className="text-left font-semibold text-slate-800">Value</th>
                                  </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                  {scientificCapabilities.key_metrics.patents_filed && (
                                    <tr className="border-b">
                                      <td className="py-2">Patents Filed</td>
                                      <td className="py-2">{scientificCapabilities.key_metrics.patents_filed}</td>
                                    </tr>
                                  )}
                                  {scientificCapabilities.key_metrics.active_trials && (
                                    <tr className="border-b">
                                      <td className="py-2">Active Trials</td>
                                      <td className="py-2">{scientificCapabilities.key_metrics.active_trials}</td>
                                    </tr>
                                  )}
                                  {scientificCapabilities.key_metrics.fda_approvals && (
                                    <tr className="border-b">
                                      <td className="py-2">FDA Approvals</td>
                                      <td className="py-2">{scientificCapabilities.key_metrics.fda_approvals}</td>
                                    </tr>
                                  )}
                                  {scientificCapabilities.key_metrics.publications && (
                                    <tr className="border-b">
                                      <td className="py-2">Publications</td>
                                      <td className="py-2">{scientificCapabilities.key_metrics.publications}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                              <p className="text-xs text-slate-600">Metrics reflect the most recent reporting period and are subject to change as new data becomes available.</p>
                            </div>
                          ) : (
                            <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                              <table className="w-full text-xs mb-2">
                                <thead>
                                  <tr><th>Metric</th><th>Value</th></tr>
                                </thead>
                                <tbody>
                                  <tr><td>Patents Filed</td><td>1,200+</td></tr>
                                  <tr><td>Active Trials</td><td>85</td></tr>
                                  <tr><td>FDA Approvals</td><td>14</td></tr>
                                  <tr><td>Publications</td><td>300+</td></tr>
                                </tbody>
                              </table>
                              <p className="text-xs">Metrics reflect the most recent reporting period and are subject to change as new data becomes available.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    {/* NEW CARDS FOR SCIENTIFIC ALIGNMENT */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Mechanism of Action & Target Validation */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Mechanism of Action & Target Validation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <p className="mb-2">Our approach to target validation integrates computational modeling, in vitro assays, and in vivo studies to ensure robust mechanism-of-action data. This multi-pronged strategy reduces risk and accelerates the path to clinical development.</p>
                            <ul className="list-disc pl-6 text-xs">
                              <li>Computational modeling</li>
                              <li>In vitro validation</li>
                              <li>In vivo efficacy studies</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      {/* Indication Alignment & Disease Relevance */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Indication Alignment & Disease Relevance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <p className="mb-2">Strategic focus on high-burden diseases and unmet medical needs drives indication selection and portfolio prioritization. Our assets are well-aligned with current standards of care and evolving treatment paradigms, maximizing clinical impact and market opportunity.</p>
                            <ul className="list-disc pl-6 text-xs">
                              <li>Oncology</li>
                              <li>Rare diseases</li>
                              <li>Immunology</li>
                              <li>Neurology</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      {/* Preclinical and Clinical Readiness */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Preclinical and Clinical Readiness</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <p className="mb-2">Robust preclinical data packages and well-designed clinical development plans support rapid advancement through regulatory milestones. Integrated development teams ensure seamless execution from IND-enabling studies to pivotal trials.</p>
                            <p className="text-xs">Key milestones achieved in the last 12 months include successful IND submissions and positive interim data from Phase I studies.</p>
                          </div>
                        </CardContent>
                      </Card>
                      {/* Pipeline Overlap and Synergy */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Pipeline Overlap and Synergy</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <ul className="list-disc pl-6 text-xs mb-2">
                              <li>Shared technology platforms</li>
                              <li>Cross-portfolio collaborations</li>
                              <li>Resource optimization</li>
                              <li>Accelerated timelines</li>
                            </ul>
                            <p className="text-xs">Synergies are realized through shared infrastructure and integrated project management.</p>
                          </div>
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Regulatory Status & Milestones */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Regulatory Status & Milestones</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {regulatoryStatus ? (
                          <div className="space-y-4">
                            {regulatoryStatus.clinical_phase && (
                              <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Clinical Phase</h4>
                                <p className="text-slate-700 leading-relaxed">{regulatoryStatus.clinical_phase}</p>
                              </div>
                            )}
                            {regulatoryStatus.fda_submissions && (
                              <div>
                                <h4 className="font-semibold text-slate-800 mb-2">FDA Submissions</h4>
                                <p className="text-slate-700 leading-relaxed">{regulatoryStatus.fda_submissions}</p>
                              </div>
                            )}
                            {regulatoryStatus.ema_submissions && (
                              <div>
                                <h4 className="font-semibold text-slate-800 mb-2">EMA Submissions</h4>
                                <p className="text-slate-700 leading-relaxed">{regulatoryStatus.ema_submissions}</p>
                              </div>
                            )}
                            {regulatoryStatus.designations && (
                              <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Designations</h4>
                                <p className="text-slate-700 leading-relaxed">{regulatoryStatus.designations}</p>
                              </div>
                            )}
                            {regulatoryStatus.milestones && (
                              <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Key Milestones</h4>
                                <p className="text-slate-700 leading-relaxed">{regulatoryStatus.milestones}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-2">
                              <p className="font-normal text-base leading-relaxed">The program has achieved several key regulatory milestones, including successful IND submission, orphan drug designation, and fast track status in multiple jurisdictions. Ongoing interactions with regulatory agencies have resulted in clear guidance for pivotal trial design and expedited review pathways.</p>
                              <ul className="list-disc pl-6 text-sm">
                                <li>IND submitted: Jan 2023</li>
                                <li>Orphan Drug Designation: Feb 2023</li>
                                <li>Fast Track Status: Mar 2023</li>
                                <li>Pre-NDA Meeting: Scheduled Q4 2024</li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    {/* Clinical Trial Progress & Data Availability (paragraph + fake line chart) */}
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
                    {/* CMC Maturity (short summary + table) */}
                    <Card>
                      <CardHeader>
                        <CardTitle>CMC Maturity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-2">
                              <p className="text-sm mb-2">Validated processes, robust supply chain, and commercial-scale production capabilities.</p>
                              <table className="w-full text-xs">
                                <thead>
                                  <tr><th className="font-semibold">Metric</th><th>Status</th></tr>
                                </thead>
                                <tbody>
                                  <tr><td>Process Validation</td><td>Complete</td></tr>
                                  <tr><td>Supply Chain</td><td>Robust</td></tr>
                                  <tr><td>Scale</td><td>Commercial</td></tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true"></div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Clinical Operations and Site Infrastructure (multi-paragraph) */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Clinical Operations and Site Infrastructure</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-2">
                              <p className="text-base">A global network of clinical sites and experienced operational teams support rapid patient enrollment and high-quality data collection.</p>
                              <p className="text-sm">Advanced digital platforms and real-time monitoring tools enhance trial efficiency and compliance. Integrated development teams ensure seamless execution from IND-enabling studies to pivotal trials.</p>
                            </div>
                          </div>
                          <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true"></div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Development Cost-to-Date and Burn Rate (bullets + pie chart) */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Development Cost-to-Date and Burn Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-2">
                              <ul className="list-disc pl-6 text-sm mb-2">
                                <li>Total spent: $48.2M</li>
                                <li>Current burn: $2.1M/month</li>
                                <li>Runway: 18 months</li>
                              </ul>
                              <svg width="60" height="60" viewBox="0 0 60 60" className="mx-auto">
                                <circle cx="30" cy="30" r="28" fill="#f3f4f6" />
                                <path d="M30 30 L30 2 A28 28 0 0 1 58 30 Z" fill="#60a5fa" />
                                <path d="M30 30 L58 30 A28 28 0 0 1 30 58 Z" fill="#fbbf24" />
                                <path d="M30 30 L30 58 A28 28 0 0 1 2 30 Z" fill="#34d399" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true"></div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Team Experience & Execution Capability (paragraph + bulleted bios) */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Team Experience & Execution Capability</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <div className="space-y-1">
                              <p className="text-base">The development team comprises industry veterans with deep expertise in clinical research, regulatory affairs, and project management.</p>
                              <ul className="list-disc pl-6 text-xs">
                                <li>Dr. A. Smith – 20+ years, oncology trials</li>
                                <li>J. Lee – Regulatory lead, 12 approvals</li>
                                <li>M. Patel – Ops, ex-Pfizer</li>
                              </ul>
                            </div>
                          </div>
                          <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true"></div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Program Risks & Mitigation Strategy (risk matrix table + bullets) */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Program Risks & Mitigation Strategy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <table className="w-full text-xs mb-2">
                              <thead>
                                <tr><th>Risk</th><th>Likelihood</th><th>Impact</th></tr>
                              </thead>
                              <tbody>
                                <tr><td>Enrollment</td><td>Med</td><td>High</td></tr>
                                <tr><td>Regulatory</td><td>Low</td><td>Med</td></tr>
                                <tr><td>Manufacturing</td><td>Low</td><td>Low</td></tr>
                              </tbody>
                            </table>
                            <ul className="list-disc pl-6 text-xs">
                              <li>Mitigation: Expand site network</li>
                              <li>Mitigation: Early FDA engagement</li>
                            </ul>
                          </div>
                          <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true"></div>
                        </div>
                      </CardContent>
                    </Card>
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
                    {/* Minimal Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <OperationalReadinessChart />
                    </div>

                    {/* Detailed Text Report */}
                    <div className="prose max-w-none space-y-6">
                      {/* Supply Chain Risk and Disruption Profile (Blurred Content) */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Supply Chain Risk and Disruption Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <p className="mb-2">The company’s supply chain is fortified by multi-tier risk assessment, supplier redundancy, and strategic inventory reserves. Real-time monitoring and contingency planning ensure rapid response to disruptions. Detailed risk mapping and scenario analysis support business continuity. Digital supply chain platforms provide real-time visibility and proactive risk mitigation. The global supplier network is regularly evaluated for resilience and compliance with quality standards.</p>
                          </div>
                        </CardContent>
                      </Card>
                      {/* ESG / Sustainability Objectives (Blurred Content) */}
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
                      {/* Competitive Landscape Mapping (Blurred Content) */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Competitive Landscape Mapping</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <table className="w-full text-xs mb-2">
                              <thead>
                                <tr><th>Competitor</th><th>Strength</th></tr>
                              </thead>
                              <tbody>
                                <tr><td>Company A</td><td>Supply chain resilience</td></tr>
                                <tr><td>Company B</td><td>Quality compliance</td></tr>
                                <tr><td>Company C</td><td>Manufacturing efficiency</td></tr>
                                <tr><td>Company D</td><td>Digital operations</td></tr>
                              </tbody>
                            </table>
                            <p className="mb-2">Ongoing surveillance ensures timely response to emerging threats and opportunities. The company’s operational capabilities consistently outperform peers across key metrics including manufacturing efficiency, quality performance, and supply chain resilience.</p>
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
                      {/* Current & Projected TAM (with assumptions) */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Current & Projected TAM (with assumptions)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <p className="mb-2">Extensive market analysis quantifies the total addressable market (TAM) across all relevant segments. Growth projections are supported by demographic trends, innovation adoption, and expanding treatment paradigms. Detailed assumptions and sensitivity analyses underpin robust forecasting. The company’s addressable share is expected to increase through portfolio expansion and strategic partnerships.</p>
                          </div>
                        </CardContent>
                      </Card>
                      {/* Portfolio Synergy (Internal and External) (Blurred Content) */}
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
                      
                      {/* Current and Projected TAM */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Current and Projected TAM</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {marketAnalysis ? (
                            <div className="space-y-4">
                              {marketAnalysis.current_tam && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Current TAM</h4>
                                  <p className="text-slate-700 leading-relaxed">{marketAnalysis.current_tam}</p>
                                </div>
                              )}
                              {marketAnalysis.projected_tam && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Projected TAM</h4>
                                  <p className="text-slate-700 leading-relaxed">{marketAnalysis.projected_tam}</p>
                                </div>
                              )}
                              {marketAnalysis.cagr && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">CAGR</h4>
                                  <p className="text-slate-700 leading-relaxed">{marketAnalysis.cagr}</p>
                                </div>
                              )}
                              {marketAnalysis.geographic_breakdown && (
                                <div>
                                  <h4 className="font-semibold text-slate-800 mb-2">Geographic Breakdown</h4>
                                  <p className="text-slate-700 leading-relaxed">{marketAnalysis.geographic_breakdown}</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                              <p className="mb-2">Extensive market analysis quantifies the total addressable market (TAM) across all relevant segments. Growth projections are supported by demographic trends, innovation adoption, and expanding treatment paradigms. Detailed assumptions and sensitivity analyses underpin robust forecasting. The company's addressable share is expected to increase through portfolio expansion and strategic partnerships.</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      {/* IR & BD Presentation Takeaways (Blurred Content) */}
                      <Card>
                        <CardHeader>
                          <CardTitle>IR & BD Presentation Takeaways</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <p className="mb-2">Management commentary provides insight into future direction and value creation opportunities. Recent presentations highlight disciplined capital allocation and a focus on sustainable growth. The company’s growth strategy includes $15-20B in acquisitions, with a focus on immunology, oncology, and neuroscience. Capital allocation is balanced between organic growth, M&A, and emerging opportunities.</p>
                          </div>
                        </CardContent>
                      </Card>
                      {/* Quarterly Earnings Report Summary (Blurred Content) */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Quarterly Earnings Report Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="blur-sm select-none text-slate-400" aria-hidden="true">
                            <ul className="list-disc pl-6 text-xs mb-2">
                              <li>Pharma revenue: $89.7B</li>
                              <li>Operational growth: 5.3%</li>
                              <li>Market share gains: 78% of key areas</li>
                              <li>Strategic investments: $3.2B in Q3</li>
                              <li>Future guidance: $95-97B revenue</li>
                            </ul>
                            <p className="mb-2">The latest quarterly earnings report details financial performance, operational highlights, and forward-looking guidance. In-depth analysis of revenue drivers, cost structure, and margin trends informs strategic decision-making. Management reaffirmed guidance for continued margin expansion and market share gains in key therapeutic areas.</p>
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
