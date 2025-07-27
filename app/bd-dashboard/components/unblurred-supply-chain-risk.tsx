"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RiskEntry {
  risk_level: 'High' | 'Medium' | 'Low'
  specific_challenge: string
  relevance: string
  historical_analogs: string
  confidence: number
}

interface SupplyChainRisk {
  raw_material_risks: RiskEntry[]
  cdmo_risks: RiskEntry[]
  qa_qc_risks: RiskEntry[]
  distribution_risks: RiskEntry[]
}

interface UnblurredSupplyChainRiskProps {
  supplyChainRisk: SupplyChainRisk | null
}

export function UnblurredSupplyChainRisk({ supplyChainRisk }: UnblurredSupplyChainRiskProps) {
  if (!supplyChainRisk) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Supply Chain Risk & Disruption Profile - Insufficient Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 italic">
            Supply chain risk analysis could not be validated at the required confidence threshold. 
            This may be due to insufficient manufacturing data or limited historical disruption information.
          </p>
        </CardContent>
      </Card>
    )
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-slate-600 bg-slate-100'
    }
  }

  const renderRiskSection = (risks: RiskEntry[], title: string, description: string) => {
    if (!risks || risks.length === 0) {
      return (
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2 text-slate-800">{title}</h4>
          <p className="text-slate-600 mb-3">{description}</p>
          <p className="text-slate-500 italic">No specific risks identified in this category.</p>
        </div>
      )
    }

    return (
      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-2 text-slate-800">{title}</h4>
        <p className="text-slate-600 mb-3">{description}</p>
        <div className="space-y-3">
          {risks.map((risk, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2">
                  <Badge className={getRiskLevelColor(risk.risk_level)}>
                    {risk.risk_level} Risk
                  </Badge>
                  <Badge variant="outline" className="text-slate-600">
                    {(risk.confidence * 100).toFixed(0)}% Confidence
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Specific Challenge:</span>
                  <p className="text-slate-800 mt-1">{risk.specific_challenge}</p>
                </div>
                
                <div>
                  <span className="font-medium text-slate-600">Relevance to Asset:</span>
                  <p className="text-slate-800 mt-1">{risk.relevance}</p>
                </div>
                
                <div>
                  <span className="font-medium text-slate-600">Historical Analogs:</span>
                  <p className="text-slate-800 mt-1">{risk.historical_analogs}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600 flex items-center gap-2">
          <span>Supply Chain Risk & Disruption Profile - Live Data</span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Unblurred
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 mb-4">
          Comprehensive risk analysis based on real-world manufacturing challenges tied to the asset's modality and target. 
          All assessments include specific challenges, relevance to the asset, and historical analogs from industry disruptions.
        </p>
        
        {renderRiskSection(
          supplyChainRisk.raw_material_risks,
          "Raw Material Risks",
          "API sourcing, excipient availability, and supply chain dependencies"
        )}
        
        {renderRiskSection(
          supplyChainRisk.cdmo_risks,
          "CDMO Risks",
          "Contract manufacturing capacity, quality issues, and production bottlenecks"
        )}
        
        {renderRiskSection(
          supplyChainRisk.qa_qc_risks,
          "QA/QC Risks",
          "Testing complexity, stability issues, and quality control challenges"
        )}
        
        {renderRiskSection(
          supplyChainRisk.distribution_risks,
          "Distribution Risks",
          "Cold chain requirements, logistics complexity, and regulatory compliance"
        )}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Risk Assessment Methodology:</strong> All risks are assessed based on FDA 483 observations, 
            BIMO inspection reports, EMA compliance data, and CDMO incident reports. Risk levels are assigned 
            based on historical analogs and relevance to the specific asset's characteristics and manufacturing requirements.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 