"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DealEntry {
  asset_name: string
  transaction_amount: string
  deal_date: string
  relevance_score: number
  source: string
}

interface DealActivity {
  target_aligned_deals: DealEntry[]
  modality_aligned_deals: DealEntry[]
  indication_aligned_deals: DealEntry[]
}

interface UnblurredDealActivityProps {
  dealActivity: DealActivity | null
}

export function UnblurredDealActivity({ dealActivity }: UnblurredDealActivityProps) {
  if (!dealActivity) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Deal Activity - Insufficient Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 italic">
            Historical deal data could not be validated at the required confidence threshold. 
            This may be due to limited publicly available information or insufficient source verification.
          </p>
        </CardContent>
      </Card>
    )
  }

  const renderDealSection = (deals: DealEntry[], title: string, color: string) => {
    if (!deals || deals.length === 0) {
      return (
        <div className="mb-6">
          <h4 className={`font-semibold text-lg mb-3 text-${color}-700`}>{title}</h4>
          <p className="text-slate-500 italic">No relevant deals found in this category.</p>
        </div>
      )
    }

    return (
      <div className="mb-6">
        <h4 className={`font-semibold text-lg mb-3 text-${color}-700`}>{title}</h4>
        <div className="space-y-3">
          {deals.map((deal, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-slate-800">{deal.asset_name}</h5>
                <Badge variant="outline" className={`text-${color}-600 border-${color}-300`}>
                  {(deal.relevance_score * 100).toFixed(0)}% Match
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Transaction Amount:</span>
                  <span className="ml-2 text-slate-800 font-semibold">{deal.transaction_amount}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Deal Date:</span>
                  <span className="ml-2 text-slate-800">{new Date(deal.deal_date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                <span className="font-medium">Source:</span> {deal.source}
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
          <span>Deal Activity - Live Data</span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Unblurred
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 mb-4">
          Historical transactions involving the acquirer that relate to the same indication, target, or modality as the submitted asset.
          All data has been verified against high-confidence sources including SEC filings, press releases, and company investor presentations.
        </p>
        
        {renderDealSection(dealActivity.target_aligned_deals, "Target-Aligned Deals", "blue")}
        {renderDealSection(dealActivity.modality_aligned_deals, "Modality-Aligned Deals", "purple")}
        {renderDealSection(dealActivity.indication_aligned_deals, "Indication-Aligned Deals", "green")}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Data Quality:</strong> All deal information has been cross-verified with multiple sources 
            and filtered for relevance using entity matching logic. Deals are sorted by date (most recent first) 
            and include relevance scores based on strategic alignment.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 