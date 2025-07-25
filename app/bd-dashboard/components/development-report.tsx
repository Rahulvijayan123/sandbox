"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function DevelopmentReport() {
  return (
    <div className="space-y-8">
      {/* Minimal Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Development Timeline Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Preclinical to Phase I</span>
                <span className="text-sm text-slate-600">14 months avg (Industry: 18)</span>
              </div>
              <Progress value={92} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Phase I to Phase II</span>
                <span className="text-sm text-slate-600">16 months avg (Industry: 20)</span>
              </div>
              <Progress value={88} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Phase II to Phase III</span>
                <span className="text-sm text-slate-600">22 months avg (Industry: 28)</span>
              </div>
              <Progress value={85} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Regulatory Approval</span>
                <span className="text-sm text-slate-600">10 months avg (Industry: 14)</span>
              </div>
              <Progress value={95} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Text Report */}
      <div className="prose max-w-none space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Public Sentiment Summary</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Industry perception of J&J's development capabilities remains exceptionally positive, with consistent
            recognition for operational excellence and timeline performance. Recent analyst reports and industry surveys
            consistently rank J&J among the top 3 pharmaceutical companies for development execution.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Analyst Coverage:</strong> 89% of sell-side analysts rate J&J's development capabilities as
              "Best-in-Class" or "Above Average"
            </li>
            <li>
              <strong>Industry Awards:</strong> Recipient of "Clinical Operations Excellence Award" for three
              consecutive years (2022-2024)
            </li>
            <li>
              <strong>Regulatory Feedback:</strong> FDA has publicly commended J&J's submission quality and regulatory
              strategy in multiple therapeutic areas
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Pipeline Composition and Breadth</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            J&J's development pipeline demonstrates exceptional breadth and strategic focus, with 180+ active clinical
            programs optimally distributed across development phases. The portfolio balance ensures consistent near-term
            and long-term value creation opportunities.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Development Portfolio Metrics:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Total Active Programs: 180 (vs. industry avg: 45)</li>
              <li>• Phase III Success Rate: 89% (vs. industry avg: 65%)</li>
              <li>• Average Development Time: 6.2 years (vs. industry avg: 8.1 years)</li>
              <li>• Breakthrough Designations: 23 active (industry leading)</li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Phase Distribution Strategy:</strong> Optimal 37%/43%/20% distribution across Phase I/II/III
              ensures balanced risk and near-term value realization
            </li>
            <li>
              <strong>Therapeutic Focus:</strong> 67% of pipeline concentrated in high-value areas (oncology,
              immunology, neuroscience) with established commercial infrastructure
            </li>
            <li>
              <strong>Innovation Profile:</strong> 78% of programs represent first-in-class or best-in-class
              opportunities with significant differentiation potential
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">SEC Filings Summary and Red Flags</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            SEC filings reveal consistent investment in development capabilities and transparent reporting of clinical
            progress. Development-related disclosures demonstrate strong governance and risk management practices.
          </p>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <h4 className="font-semibold text-green-800 mb-2">Development Investment Highlights:</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• Clinical development spend: $8.2B annually (54% of total R&D)</li>
              <li>• Digital transformation investment: $450M over 3 years</li>
              <li>• Clinical site expansion: 200+ new sites added in 2024</li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Risk Disclosures:</strong> Comprehensive disclosure of development risks with detailed mitigation
              strategies for each therapeutic area
            </li>
            <li>
              <strong>Milestone Tracking:</strong> Quarterly updates on key development milestones with 94% accuracy in
              timeline predictions
            </li>
            <li>
              <strong>Investment Allocation:</strong> Clear rationale for development investments with ROI projections
              for major programs
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Press Releases and Product Launches</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            J&J's development-related communications demonstrate consistent execution and transparent progress
            reporting. Recent press releases highlight accelerated timelines and successful regulatory interactions.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">2024 Development Milestones:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Q4:</strong> Initiated 12 new Phase III studies, including 3 breakthrough therapy programs
              </li>
              <li>
                <strong>Q3:</strong> Achieved primary endpoints in 8 of 9 Phase III readouts
              </li>
              <li>
                <strong>Q2:</strong> Received 5 FDA breakthrough therapy designations
              </li>
              <li>
                <strong>Q1:</strong> Completed enrollment in 15 pivotal studies, 18% ahead of schedule
              </li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Regulatory Interactions:</strong> 47 successful FDA meetings in 2024, with 89% resulting in
              aligned development strategies
            </li>
            <li>
              <strong>Global Approvals:</strong> Secured approvals in 23 countries for 8 new indications, demonstrating
              global regulatory expertise
            </li>
            <li>
              <strong>Development Partnerships:</strong> Established 12 new clinical collaborations with leading
              academic centers and biotech companies
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">CMC Status and Manufacturing Readiness</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            J&J's Chemistry, Manufacturing, and Controls (CMC) capabilities represent industry-leading standards with
            exceptional regulatory compliance and manufacturing readiness. Their integrated approach ensures seamless
            transition from development to commercial manufacturing.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>CMC Excellence:</strong> 98% of IND submissions approved without CMC-related clinical holds,
              demonstrating superior manufacturing development
            </li>
            <li>
              <strong>Scale-Up Capabilities:</strong> Proven track record of successful scale-up for 45+ products over
              past 5 years with zero manufacturing-related delays
            </li>
            <li>
              <strong>Quality Systems:</strong> Integrated quality-by-design approach implemented across all development
              programs, reducing post-approval CMC changes by 67%
            </li>
            <li>
              <strong>Supply Chain Integration:</strong> Early supplier engagement and risk assessment protocols ensure
              material availability throughout development lifecycle
            </li>
            <li>
              <strong>Regulatory Readiness:</strong> Pre-approval inspection success rate of 100% over past 3 years,
              with average inspection duration 40% shorter than industry average
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Quarterly Earnings Report Summary</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Recent earnings calls consistently highlight development progress as a key value driver, with management
            providing detailed updates on pipeline advancement and development investments. Development metrics are
            closely tracked and transparently reported.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Q3 2024 Development Highlights (Earnings Call):</h4>
            <blockquote className="text-sm italic border-l-2 border-slate-300 pl-4">
              "Our development organization delivered exceptional results this quarter, with 8 of 9 Phase III studies
              meeting primary endpoints. We continue to see the benefits of our digital transformation investments, with
              enrollment rates 23% faster than historical averages." - Chief Medical Officer
            </blockquote>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Investment Commitment:</strong> Announced $1.2B increase in development spending for 2025, focused
              on late-stage programs and digital capabilities
            </li>
            <li>
              <strong>Timeline Guidance:</strong> Provided updated timelines for 23 key programs, with 89% maintaining
              or accelerating previous guidance
            </li>
            <li>
              <strong>Success Metrics:</strong> Reported Phase III success rate of 89% vs. 65% industry average,
              demonstrating superior program selection and execution
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Competitive Landscape Mapping</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            J&J's development capabilities consistently outperform major pharmaceutical competitors across key metrics
            including timeline performance, regulatory success rates, and clinical execution quality.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Development Performance vs. Big Pharma:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Timeline Performance: #1 (22% faster than average)</li>
              <li>• Phase III Success Rate: #2 (89% vs. 65% average)</li>
              <li>• Regulatory Approval Rate: #1 (95% first-cycle success)</li>
              <li>• Clinical Operations Quality: #2 (0.8% query rate)</li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Operational Advantages:</strong> Superior patient recruitment capabilities and site management
              result in 23% faster enrollment compared to industry peers
            </li>
            <li>
              <strong>Technology Leadership:</strong> Advanced clinical trial technologies and data analytics provide
              competitive advantages in study design and execution
            </li>
            <li>
              <strong>Regulatory Relationships:</strong> Established relationships with global regulatory agencies
              enable more efficient approval processes and strategic guidance
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
