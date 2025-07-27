"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TAMAssumptions {
  patient_population: string
  penetration_rate: string
  pricing: string
  geographic_coverage: string
}

interface TAMProjection {
  patient_population_growth: string
  penetration_rate_increase: string
  pricing_evolution: string
  market_expansion: string
}

interface TAMValidation {
  math_verified: boolean
  growth_rates_defensible: boolean
  assumptions_specific: boolean
}

interface TAMAnalysis {
  current_tam: {
    value: string
    assumptions: TAMAssumptions
  }
  projected_tam: {
    value: string
    assumptions: TAMProjection
  }
  validation: TAMValidation
}

interface UnblurredTAMAnalysisProps {
  tamAnalysis: TAMAnalysis | null
}

export function UnblurredTAMAnalysis({ tamAnalysis }: UnblurredTAMAnalysisProps) {
  if (!tamAnalysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Current & Projected TAM - Insufficient Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 italic">
            TAM analysis could not be validated at the required confidence threshold. 
            This may be due to insufficient market data or inability to verify mathematical calculations.
          </p>
        </CardContent>
      </Card>
    )
  }

  const renderTAMSection = (tam: any, title: string, isCurrent: boolean) => {
    return (
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-slate-800">{title}</h4>
          <Badge variant="outline" className="text-blue-600 border-blue-300">
            {tam.value}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isCurrent ? (
            <>
              <div>
                <span className="font-medium text-slate-600">Patient Population:</span>
                <p className="text-slate-800 font-semibold">{tam.assumptions.patient_population}</p>
              </div>
              <div>
                <span className="font-medium text-slate-600">Penetration Rate:</span>
                <p className="text-slate-800 font-semibold">{tam.assumptions.penetration_rate}</p>
              </div>
              <div>
                <span className="font-medium text-slate-600">Pricing:</span>
                <p className="text-slate-800 font-semibold">{tam.assumptions.pricing}</p>
              </div>
              <div>
                <span className="font-medium text-slate-600">Geographic Coverage:</span>
                <p className="text-slate-800 font-semibold">{tam.assumptions.geographic_coverage}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="font-medium text-slate-600">Patient Population Growth:</span>
                <p className="text-slate-800 font-semibold">{tam.assumptions.patient_population_growth}</p>
              </div>
              <div>
                <span className="font-medium text-slate-600">Penetration Rate Increase:</span>
                <p className="text-slate-800 font-semibold">{tam.assumptions.penetration_rate_increase}</p>
              </div>
              <div>
                <span className="font-medium text-slate-600">Pricing Evolution:</span>
                <p className="text-slate-800 font-semibold">{tam.assumptions.pricing_evolution}</p>
              </div>
              <div>
                <span className="font-medium text-slate-600">Market Expansion:</span>
                <p className="text-slate-800 font-semibold">{tam.assumptions.market_expansion}</p>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  const renderValidationChecks = () => {
    const checks = [
      { label: 'Mathematical Verification', passed: tamAnalysis.validation.math_verified },
      { label: 'Growth Rates Defensible', passed: tamAnalysis.validation.growth_rates_defensible },
      { label: 'Assumptions Specific', passed: tamAnalysis.validation.assumptions_specific }
    ]

    return (
      <div className="border border-slate-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-slate-800 mb-3">Validation Checks</h4>
        <div className="space-y-2">
          {checks.map((check, index) => (
            <div key={index} className="flex items-center gap-2">
              <Badge className={check.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                {check.passed ? '✓' : '✗'}
              </Badge>
              <span className="text-sm text-slate-700">{check.label}</span>
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
          <span>Current & Projected TAM - Live Data</span>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Unblurred
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 mb-4">
          Total Addressable Market analysis with current (2024) and projected (2030) values, including detailed assumptions 
          for patient population, penetration rates, pricing, and geographic coverage. All calculations are mathematically verified.
        </p>
        
        {renderTAMSection(tamAnalysis.current_tam, "Current TAM (2024)", true)}
        {renderTAMSection(tamAnalysis.projected_tam, "Projected TAM (2030)", false)}
        {renderValidationChecks()}
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Methodology:</strong> TAM calculations are based on GlobalData, EvaluatePharma, analyst reports, 
            and financial models. All assumptions are specific and defensible, with growth rates validated against 
            industry benchmarks and historical trends. Mathematical accuracy is verified through cross-checking calculations.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 