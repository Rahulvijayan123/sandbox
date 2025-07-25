"use client"
import { FinancialProjectionsChart } from "./financial-projections-chart"
import { ROIAnalysisChart } from "./roi-analysis-chart"

export function StrategicReport() {
  return (
    <div className="space-y-8">
      {/* Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialProjectionsChart />
        <ROIAnalysisChart />
      </div>

      {/* Detailed Text Report */}
      <div className="prose max-w-none space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Public Sentiment Summary</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            J&J maintains exceptional public and investor sentiment regarding their strategic positioning and commercial
            capabilities. Recent analyst coverage and investor communications consistently highlight J&J's strategic
            advantages and market leadership position.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Analyst Consensus:</strong> 94% of covering analysts rate J&J as "Buy" or "Strong Buy" with
              average price target 18% above current levels
            </li>
            <li>
              <strong>Investor Confidence:</strong> Institutional ownership at 89%, with Berkshire Hathaway and Vanguard
              among top holders
            </li>
            <li>
              <strong>ESG Leadership:</strong> Ranked #2 in pharmaceutical industry ESG scores by MSCI, attracting
              sustainable investment flows
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">ESG / Sustainability Objectives</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            J&J's comprehensive ESG strategy is fully integrated into their strategic planning and commercial
            operations, creating sustainable competitive advantages while addressing stakeholder expectations.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Health Equity Commitment:</strong> $2.3B committed to global health initiatives through 2030,
              expanding access to essential medicines in 60+ developing countries
            </li>
            <li>
              <strong>Environmental Leadership:</strong> Carbon neutral operations achieved by 2023, with net-zero
              emissions target by 2030 across entire value chain
            </li>
            <li>
              <strong>Governance Excellence:</strong> Board diversity at 67% (gender and ethnic), with independent
              directors comprising 89% of board composition
            </li>
            <li>
              <strong>Social Impact:</strong> $890M invested annually in community health programs, education
              initiatives, and healthcare infrastructure development
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Portfolio Synergy (Internal and External)</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            J&J's diversified portfolio creates significant internal synergies while providing multiple opportunities
            for external partnerships and acquisitions. Their integrated approach maximizes value creation across
            therapeutic areas.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Internal Synergy Quantification:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Cross-portfolio revenue synergies: $2.8B annually</li>
              <li>• Shared R&D cost savings: $1.2B annually</li>
              <li>• Commercial infrastructure leverage: $890M value creation</li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Therapeutic Area Integration:</strong> Immunology expertise leveraged across oncology,
              dermatology, and gastroenterology, creating $2.1B in cross-indication opportunities
            </li>
            <li>
              <strong>Platform Technologies:</strong> Shared technology platforms (biologics, cell therapy, digital
              health) reduce development costs by 23% across portfolio
            </li>
            <li>
              <strong>Commercial Synergies:</strong> Integrated sales force covers multiple therapeutic areas,
              increasing sales productivity by 34% compared to specialized approaches
            </li>
            <li>
              <strong>External Partnerships:</strong> 47 active strategic partnerships leveraging complementary
              capabilities and shared risk
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Current & Projected TAM (with assumptions)</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            J&J operates in attractive markets with significant growth potential, supported by demographic trends, unmet
            medical needs, and expanding treatment paradigms. Their TAM analysis demonstrates substantial opportunity
            for continued growth.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Total Addressable Market Analysis:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Current TAM (2024):</strong> $847B across all therapeutic areas
              </li>
              <li>
                <strong>Projected TAM (2030):</strong> $1.2T (7.2% CAGR)
              </li>
              <li>
                <strong>J&J Addressable Share:</strong> $234B (28% of total TAM)
              </li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Immunology TAM:</strong> $156B current, $245B projected (2030) driven by expanding indications and
              biosimilar competition creating new opportunities
            </li>
            <li>
              <strong>Oncology TAM:</strong> $189B current, $298B projected (2030) supported by precision medicine
              adoption and combination therapy approaches
            </li>
            <li>
              <strong>Neuroscience TAM:</strong> $78B current, $134B projected (2030) driven by aging demographics and
              breakthrough treatment modalities
            </li>
            <li>
              <strong>Key Assumptions:</strong> 6-8% annual healthcare spending growth, continued innovation adoption,
              expanding global access to advanced therapies
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">SEC Filings Summary and Red Flags</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            SEC filings demonstrate strong strategic execution and transparent financial reporting. Strategic
            investments and acquisitions are well-documented with clear rationale and expected returns.
          </p>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <h4 className="font-semibold text-green-800 mb-2">Strategic Investment Highlights:</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• M&A investment: $47B over past 5 years with 22.4% average ROI</li>
              <li>• Strategic partnerships: $8.9B committed to external collaborations</li>
              <li>• Digital transformation: $2.1B investment in commercial capabilities</li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Strategic Rationale:</strong> Clear documentation of strategic rationale for major investments
              with detailed ROI projections and risk assessments
            </li>
            <li>
              <strong>Performance Tracking:</strong> Quarterly updates on strategic initiative progress with transparent
              reporting of successes and challenges
            </li>
            <li>
              <strong>Risk Management:</strong> Comprehensive disclosure of strategic risks with detailed mitigation
              strategies and contingency planning
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Press Releases and Product Launches</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Recent strategic communications demonstrate consistent execution on commercial objectives and successful
            market expansion initiatives. J&J's launch excellence and market access capabilities are consistently
            highlighted.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">2024 Strategic Milestones:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Q4:</strong> Completed $6.8B acquisition of Shockwave Medical, expanding cardiovascular
                portfolio
              </li>
              <li>
                <strong>Q3:</strong> Launched Rybrevant in 15 new markets, achieving $890M quarterly revenue
              </li>
              <li>
                <strong>Q2:</strong> Established strategic partnership with Genmab for next-generation cancer therapies
              </li>
              <li>
                <strong>Q1:</strong> Expanded Stelara indication to pediatric Crohn's disease, adding $400M annual
                revenue potential
              </li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Launch Performance:</strong> 12 successful product launches in 2024, with 89% achieving or
              exceeding first-year revenue projections
            </li>
            <li>
              <strong>Market Expansion:</strong> Entered 23 new geographic markets, adding $1.2B to addressable market
              opportunity
            </li>
            <li>
              <strong>Strategic Partnerships:</strong> Formed 8 new strategic alliances in 2024, leveraging external
              innovation and expanding therapeutic reach
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">IR & BD Presentation Takeaways</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Recent investor relations and business development presentations highlight J&J's strategic priorities,
            capital allocation framework, and growth initiatives. Management consistently emphasizes their disciplined
            approach to value creation and strategic investments.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Key IR Presentation Themes (2024):</h4>
            <blockquote className="text-sm italic border-l-2 border-slate-300 pl-4">
              "Our strategic focus remains on high-growth, high-margin therapeutic areas where we can leverage our
              unique capabilities and achieve sustainable competitive advantages. We expect to deploy $15-20B in
              strategic acquisitions over the next 3 years." - Chief Financial Officer
            </blockquote>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Capital Allocation:</strong> 60% of available capital allocated to organic growth, 30% to
              strategic acquisitions, 10% to emerging opportunities
            </li>
            <li>
              <strong>Growth Strategy:</strong> Focus on therapeutic areas with &gt;$50B TAM and sustainable competitive
              moats
            </li>
            <li>
              <strong>BD Priorities:</strong> Target acquisitions in immunology, oncology, and neuroscience with
              $500M-$10B deal size range
            </li>
            <li>
              <strong>Value Creation:</strong> Commitment to &gt;15% IRR on all strategic investments with 3-5 year
              payback periods
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Competitive Landscape Mapping</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            J&J's strategic position demonstrates clear competitive advantages across multiple dimensions, with superior
            market access, commercial execution, and financial resources compared to pharmaceutical peers.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Strategic Positioning vs. Big Pharma:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Market Access Capabilities: #1 (91% formulary access rate)</li>
              <li>• Commercial Execution: #2 (18 months avg time to peak sales)</li>
              <li>• Financial Resources: #1 ($47B available for acquisitions)</li>
              <li>• Portfolio Diversification: #1 (lowest concentration risk)</li>
            </ul>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>vs. Pfizer:</strong> Superior therapeutic area diversification and lower patent cliff exposure,
              with stronger emerging market presence
            </li>
            <li>
              <strong>vs. Roche:</strong> Broader commercial infrastructure and better payer relationships, enabling
              faster market access for new products
            </li>
            <li>
              <strong>vs. Novartis:</strong> Stronger financial position and acquisition capacity, with better
              integration track record
            </li>
            <li>
              <strong>Unique Advantages:</strong> Only pharmaceutical company with #1 or #2 market position across
              immunology, oncology, and consumer health simultaneously
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Quarterly Earnings Report Summary</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Recent earnings calls consistently emphasize strategic execution and commercial performance as key value
            drivers. Management provides detailed updates on strategic initiatives, market performance, and capital
            allocation decisions.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Q3 2024 Strategic Highlights (Earnings Call):</h4>
            <blockquote className="text-sm italic border-l-2 border-slate-300 pl-4">
              "Our strategic portfolio continues to deliver exceptional results, with pharmaceutical sales growing 5.3%
              operationally. We remain confident in our ability to achieve our long-term growth targets of 5-7% annually
              through our balanced approach of organic growth and strategic acquisitions." - Chief Executive Officer
            </blockquote>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>
              <strong>Revenue Performance:</strong> Pharmaceutical revenue of $89.7B with 5.3% operational growth,
              driven by key growth drivers including Stelara, Darzalex, and Tremfya
            </li>
            <li>
              <strong>Strategic Investments:</strong> $3.2B deployed in strategic acquisitions and partnerships during
              the quarter, focused on high-growth therapeutic areas
            </li>
            <li>
              <strong>Market Share Gains:</strong> Gained market share in 78% of key therapeutic areas, demonstrating
              commercial execution excellence
            </li>
            <li>
              <strong>Future Guidance:</strong> Reaffirmed 2025 guidance of $95-97B pharmaceutical revenue with
              continued margin expansion
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
