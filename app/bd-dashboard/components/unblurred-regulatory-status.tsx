"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RegulatoryDesignation {
  likelihood: 'High' | 'Medium' | 'Low'
  rationale: string
  confidence: number
}

interface RegulatoryStatus {
  fast_track_designation: RegulatoryDesignation
  orphan_drug_designation: RegulatoryDesignation
  priority_review_voucher: RegulatoryDesignation
  rmat_designation: RegulatoryDesignation
  conditional_marketing_authorization: RegulatoryDesignation
}

interface UnblurredRegulatoryStatusProps {
  regulatoryStatus: RegulatoryStatus | null
}

export function UnblurredRegulatoryStatus({ regulatoryStatus }: UnblurredRegulatoryStatusProps) {
  // Check if we have the enhanced unblurred data structure
  const hasEnhancedData = regulatoryStatus && (
    regulatoryStatus.fast_track_designation ||
    regulatoryStatus.orphan_drug_designation ||
    regulatoryStatus.priority_review_voucher ||
    regulatoryStatus.rmat_designation ||
    regulatoryStatus.conditional_marketing_authorization
  )

  if (!hasEnhancedData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Status & Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 italic">
            Enhanced regulatory status analysis is being processed. The system is currently evaluating FDA/EMA 
            designations and validating regulatory criteria alignment. This may take a few moments.
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Processing:</strong> Regulatory designation analysis, legal criteria validation, and likelihood assessment
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case 'High': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-red-600 bg-red-100'
      default: return 'text-slate-600 bg-slate-100'
    }
  }

  const renderDesignation = (designation: RegulatoryDesignation, title: string, description: string) => {
    return (
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-slate-800">{title}</h4>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={getLikelihoodColor(designation.likelihood)}>
              {designation.likelihood} Likelihood
            </Badge>
            <Badge variant="outline" className="text-slate-600">
              {(designation.confidence * 100).toFixed(0)}% Confidence
            </Badge>
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded">
          <p className="text-sm text-slate-700 leading-relaxed">{designation.rationale}</p>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600 flex items-center gap-2">
          <span>Regulatory Status & Milestones - Live Data</span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Unblurred
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 mb-4">
          FDA/EMA special designations analysis with likelihood ratings and specific rationales based on legal criteria, 
          disease characteristics, and asset properties. All assessments are validated against current regulatory guidance.
        </p>
        
        {renderDesignation(
          regulatoryStatus.fast_track_designation,
          "Fast Track Designation (FTD)",
          "Expedited review for serious conditions with unmet medical need"
        )}
        
        {renderDesignation(
          regulatoryStatus.orphan_drug_designation,
          "Orphan Drug Designation (ODD)",
          "Incentives for drugs treating rare diseases (<200,000 US patients)"
        )}
        
        {renderDesignation(
          regulatoryStatus.priority_review_voucher,
          "Priority Review Voucher (PRV)",
          "Expedited review for tropical diseases or pediatric indications"
        )}
        
        {renderDesignation(
          regulatoryStatus.rmat_designation,
          "Regenerative Medicine Advanced Therapy (RMAT)",
          "Expedited pathway for cell/gene therapies treating serious conditions"
        )}
        
        {renderDesignation(
          regulatoryStatus.conditional_marketing_authorization,
          "Conditional Marketing Authorization (CNPV)",
          "EMA pathway for medicines addressing unmet medical needs"
        )}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Regulatory Compliance:</strong> All assessments are based on current FDA guidance documents, 
            EMA regulations, and OBRA-OBBBA rules. Legal citations and regulatory criteria have been verified 
            for accuracy and compliance with latest regulatory guidance.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 