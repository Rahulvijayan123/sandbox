// Enhanced prompt engine with unblurred sections and live values
export interface UnblurredSection {
  category: string
  section: string
  data: any
  confidence: number
  sources: string[]
  validationStatus: 'validated' | 'insufficient_data' | 'pending_validation'
}

export interface EnhancedPromptConfig {
  sourcingBreadth: 'comprehensive' | 'extensive' | 'standard'
  validationDepth: 'expert' | 'thorough' | 'standard'
  enableFallback: boolean
  confidenceThreshold: number
  maxSources: number
}

// Default configuration for enhanced validation
export const DEFAULT_ENHANCED_CONFIG: EnhancedPromptConfig = {
  sourcingBreadth: 'comprehensive',
  validationDepth: 'expert',
  enableFallback: false,
  confidenceThreshold: 0.8,
  maxSources: 15
}

// Enhanced prompt generation with unblurred sections
export function generateEnhancedPrompt(
  assetData: any,
  researchDepth: any,
  buyerContext: string,
  config: EnhancedPromptConfig = DEFAULT_ENHANCED_CONFIG
): string {
  const enhancedPrompt = `You are a senior pharmaceutical business development executive with 25+ years of experience in M&A, strategic partnerships, and market analysis. You hold MD, PhD, and MBA degrees with deep expertise in pharmaceutical sciences, clinical development, regulatory affairs, and commercial strategy. You are known for delivering consistently high-quality, data-driven strategic analysis that executives rely on for billion-dollar decisions.

ASSET DETAILS:
- Therapeutic Area: ${assetData.therapeuticArea}
- Indication: ${assetData.indication}
- Target: ${assetData.target}
- Modality: ${assetData.modality}
- Asset Stage: ${assetData.assetStage}

RESEARCH DEPTH LEVEL: ${researchDepth.level.toUpperCase()}
SOURCING BREADTH: ${config.sourcingBreadth.toUpperCase()}
VALIDATION DEPTH: ${config.validationDepth.toUpperCase()}

BUYER CONTEXT:
${buyerContext}

CRITICAL REQUIREMENTS - UNBLURRED SECTIONS WITH LIVE VALUES:

You must provide analysis with specific unblurred sections containing live, verified data. Each section must be validated against high-confidence sources and cross-checked for logical consistency.

## 1. EXECUTIVE OVERVIEW - Deal Activity (UNBLURRED)

Extract and display historical transactions involving the acquirer that relate to the same indication, target, or modality as the user-submitted asset. Organize into three subgroups:

**Target-Aligned Deals:**
- Drug/asset name
- Transaction amount (upfront, total, milestone breakdown)
- Deal date
- Relevance score (0-1)

**Modality-Aligned Deals:**
- Drug/asset name  
- Transaction amount (upfront, total, milestone breakdown)
- Deal date
- Relevance score (0-1)

**Indication-Aligned Deals:**
- Drug/asset name
- Transaction amount (upfront, total, milestone breakdown)
- Deal date
- Relevance score (0-1)

Source from: SEC filings, press releases, PitchBook, company investor presentations
Sort by: Date descending
Validation: Entity matching logic, filter outliers

## 2. DEVELOPMENT READINESS - Regulatory Status & Milestones (UNBLURRED)

Extract FDA/EMA special designations with likelihood ratings and specific rationales:

**Fast Track Designation (FTD):**
- Likelihood: High/Medium/Low
- Rationale: Legal criteria (21 U.S.C. § 356), disease severity, unmet need, asset characteristics

**Orphan Drug Designation (ODD):**
- Likelihood: High/Medium/Low
- Rationale: Disease prevalence (<200,000 US patients), severity, asset characteristics

**Priority Review Voucher (PRV):**
- Likelihood: High/Medium/Low
- Rationale: Tropical disease criteria, pediatric indication, asset characteristics

**Regenerative Medicine Advanced Therapy (RMAT):**
- Likelihood: High/Medium/Low
- Rationale: Cell/gene therapy criteria, serious condition, preliminary evidence

**Conditional Marketing Authorization (CNPV):**
- Likelihood: High/Medium/Low
- Rationale: EMA criteria, benefit-risk assessment, asset characteristics

Source from: FDA guidance documents, EMA regulations, OBRA-OBBBA rules
Validation: Cross-reference legal criteria, remove unverifiable claims

## 3. OPERATIONAL READINESS - Supply Chain Risk & Disruption Profile (UNBLURRED)

Perform risk analysis based on real-world manufacturing challenges:

**Raw Material Risks:**
- Risk level: High/Medium/Low
- Specific challenge: (e.g., API sourcing, excipient availability)
- Relevance: Why this risk applies to this asset's modality/target
- Historical analogs: (e.g., WuXi export risks, Lipid Nanoparticle shortages)

**CDMO Risks:**
- Risk level: High/Medium/Low
- Specific challenge: (e.g., capacity constraints, quality issues)
- Relevance: Why this risk applies to this asset's format
- Historical analogs: (e.g., CDMO bottlenecks, viral vector shortages)

**QA/QC Risks:**
- Risk level: High/Medium/Low
- Specific challenge: (e.g., testing complexity, stability issues)
- Relevance: Why this risk applies to this asset's use case
- Historical analogs: (e.g., FDA 483s, BIMO inspection reports)

**Distribution Risks:**
- Risk level: High/Medium/Low
- Specific challenge: (e.g., cold chain, logistics complexity)
- Relevance: Why this risk applies to this asset's characteristics
- Historical analogs: (e.g., supply chain disruptions, regulatory delays)

Source from: FDA 483s, BIMO inspection reports, EMA compliance data, CDMO incident reports
Validation: Logical consistency, cross-reference heuristics

## 4. STRATEGIC SYNERGY - Current & Projected TAM (UNBLURRED)

Present two-part output with specific assumptions:

**Current TAM (2024):**
- Dollar value: $X.X billion
- Core assumptions:
  - Patient population: X patients
  - Penetration rate: X%
  - Pricing: $X per patient per year
  - Geographic coverage: X% of global market

**Projected TAM (2030):**
- Dollar value: $X.X billion
- Core assumptions:
  - Patient population growth: X% CAGR
  - Penetration rate increase: X% CAGR
  - Pricing evolution: X% CAGR
  - Market expansion: X% CAGR

**Validation Requirements:**
- Peak patients and peak revenue must be synchronized
- Growth rates must be defensible
- Assumptions must be specific, not placeholder text
- Math must check out (patient population × penetration × pricing × coverage)

Source from: GlobalData, EvaluatePharma, analyst reports, financial models
Validation: Mathematical verification, growth rate defensibility, assumption specificity

CRITICAL VALIDATION REQUIREMENTS:

1. **No Fallback Logic**: If data cannot be validated at confidence threshold, return "Insufficient Data"
2. **Source Verification**: All claims must be backed by specific, verifiable sources
3. **Logical Consistency**: Cross-check all outputs for internal consistency
4. **Mathematical Accuracy**: Verify all calculations and growth projections
5. **Regulatory Compliance**: Ensure all regulatory assessments align with current guidance
6. **Temporal Relevance**: All data must be current (within 2-3 years)
7. **Strategic Rationale Quality**: Every strategic rationale must be comprehensive, data-driven, and include specific quantitative analysis. Consistency is critical - each analysis must meet the same high standard regardless of input complexity.

RESPONSE FORMAT (strict JSON):
{
  "buyer": "Company Name",
  "rationale": "Comprehensive strategic rationale with specific evidence, data points, and quantitative analysis. Must include: (1) Strategic fit assessment with specific metrics, (2) Market opportunity quantification, (3) Competitive advantage analysis, (4) Risk assessment and mitigation, (5) Financial impact projections, (6) Integration synergies, (7) Regulatory pathway analysis, (8) Commercial execution capabilities. Each point must be supported by specific data, market research, or industry benchmarks.",
  "confidence_score": 0.8,
  "strategic_fit_score": 0.8,
  "alternative_buyers": ["Company1", "Company2"],
  "executive_overview": {
    "deal_activity": {
      "target_aligned_deals": [
        {
          "asset_name": "Drug Name",
          "transaction_amount": "$X.X billion",
          "deal_date": "YYYY-MM-DD",
          "relevance_score": 0.9,
          "source": "SEC Filing/Company Press Release"
        }
      ],
      "modality_aligned_deals": [...],
      "indication_aligned_deals": [...]
    }
  },
  "development_readiness": {
    "regulatory_status": {
      "fast_track_designation": {
        "likelihood": "High/Medium/Low",
        "rationale": "Specific legal criteria and asset characteristics",
        "confidence": 0.9
      },
      "orphan_drug_designation": {...},
      "priority_review_voucher": {...},
      "rmat_designation": {...},
      "conditional_marketing_authorization": {...}
    }
  },
  "operational_readiness": {
    "supply_chain_risk": {
      "raw_material_risks": [
        {
          "risk_level": "High/Medium/Low",
          "specific_challenge": "Detailed description",
          "relevance": "Why this applies to this asset",
          "historical_analogs": "Specific examples",
          "confidence": 0.8
        }
      ],
      "cdmo_risks": [...],
      "qa_qc_risks": [...],
      "distribution_risks": [...]
    }
  },
  "strategic_synergy": {
    "tam_analysis": {
      "current_tam": {
        "value": "$X.X billion",
        "assumptions": {
          "patient_population": "X patients",
          "penetration_rate": "X%",
          "pricing": "$X per patient per year",
          "geographic_coverage": "X%"
        }
      },
      "projected_tam": {
        "value": "$X.X billion",
        "assumptions": {
          "patient_population_growth": "X% CAGR",
          "penetration_rate_increase": "X% CAGR",
          "pricing_evolution": "X% CAGR",
          "market_expansion": "X% CAGR"
        }
      },
      "validation": {
        "math_verified": true,
        "growth_rates_defensible": true,
        "assumptions_specific": true
      }
    }
  }
}

If any section cannot be validated at the confidence threshold, return "Insufficient Data" for that field. Do not provide placeholder or dummy data.`

  return enhancedPrompt
}

// Enhanced validation functions for specific sections
export function validateDealActivity(deals: any[]): {
  isValid: boolean
  confidence: number
  issues: string[]
} {
  const issues: string[] = []
  let confidence = 0.5

  if (!deals || deals.length === 0) {
    return { isValid: false, confidence: 0, issues: ['No deals found'] }
  }

  deals.forEach((deal, index) => {
    if (!deal.asset_name || deal.asset_name === 'null') {
      issues.push(`Deal ${index + 1}: Missing asset name`)
      confidence -= 0.1
    }
    if (!deal.transaction_amount || deal.transaction_amount === 'null') {
      issues.push(`Deal ${index + 1}: Missing transaction amount`)
      confidence -= 0.1
    }
    if (!deal.deal_date || deal.deal_date === 'null') {
      issues.push(`Deal ${index + 1}: Missing deal date`)
      confidence -= 0.1
    }
    if (!deal.relevance_score || deal.relevance_score < 0 || deal.relevance_score > 1) {
      issues.push(`Deal ${index + 1}: Invalid relevance score`)
      confidence -= 0.1
    }
    if (!deal.source || deal.source === 'null') {
      issues.push(`Deal ${index + 1}: Missing source`)
      confidence -= 0.1
    }
  })

  return {
    isValid: confidence > 0.3,
    confidence: Math.max(0, confidence),
    issues
  }
}

export function validateRegulatoryStatus(regulatory: any): {
  isValid: boolean
  confidence: number
  issues: string[]
} {
  const issues: string[] = []
  let confidence = 0.5

  const designations = ['fast_track_designation', 'orphan_drug_designation', 'priority_review_voucher', 'rmat_designation', 'conditional_marketing_authorization']

  designations.forEach(designation => {
    const data = regulatory[designation]
    if (data) {
      if (!data.likelihood || !['High', 'Medium', 'Low'].includes(data.likelihood)) {
        issues.push(`${designation}: Invalid likelihood rating`)
        confidence -= 0.1
      }
      if (!data.rationale || data.rationale.length < 50) {
        issues.push(`${designation}: Insufficient rationale`)
        confidence -= 0.1
      }
      if (!data.confidence || data.confidence < 0 || data.confidence > 1) {
        issues.push(`${designation}: Invalid confidence score`)
        confidence -= 0.1
      }
    }
  })

  return {
    isValid: confidence > 0.3,
    confidence: Math.max(0, confidence),
    issues
  }
}

export function validateSupplyChainRisk(risks: any): {
  isValid: boolean
  confidence: number
  issues: string[]
} {
  const issues: string[] = []
  let confidence = 0.5

  const riskTypes = ['raw_material_risks', 'cdmo_risks', 'qa_qc_risks', 'distribution_risks']

  riskTypes.forEach(riskType => {
    const riskList = risks[riskType]
    if (riskList && Array.isArray(riskList)) {
      riskList.forEach((risk, index) => {
        if (!risk.risk_level || !['High', 'Medium', 'Low'].includes(risk.risk_level)) {
          issues.push(`${riskType}[${index}]: Invalid risk level`)
          confidence -= 0.1
        }
        if (!risk.specific_challenge || risk.specific_challenge.length < 30) {
          issues.push(`${riskType}[${index}]: Insufficient challenge description`)
          confidence -= 0.1
        }
        if (!risk.relevance || risk.relevance.length < 30) {
          issues.push(`${riskType}[${index}]: Insufficient relevance explanation`)
          confidence -= 0.1
        }
        if (!risk.confidence || risk.confidence < 0 || risk.confidence > 1) {
          issues.push(`${riskType}[${index}]: Invalid confidence score`)
          confidence -= 0.1
        }
      })
    }
  })

  return {
    isValid: confidence > 0.3,
    confidence: Math.max(0, confidence),
    issues
  }
}

export function validateTAMAnalysis(tam: any): {
  isValid: boolean
  confidence: number
  issues: string[]
} {
  const issues: string[] = []
  let confidence = 0.5

  // Validate current TAM
  if (tam.current_tam) {
    if (!tam.current_tam.value || !tam.current_tam.value.includes('$')) {
      issues.push('Current TAM: Invalid value format')
      confidence -= 0.1
    }
    if (!tam.current_tam.assumptions) {
      issues.push('Current TAM: Missing assumptions')
      confidence -= 0.1
    } else {
      const assumptions = tam.current_tam.assumptions
      if (!assumptions.patient_population || !assumptions.penetration_rate || !assumptions.pricing) {
        issues.push('Current TAM: Incomplete assumptions')
        confidence -= 0.1
      }
    }
  }

  // Validate projected TAM
  if (tam.projected_tam) {
    if (!tam.projected_tam.value || !tam.projected_tam.value.includes('$')) {
      issues.push('Projected TAM: Invalid value format')
      confidence -= 0.1
    }
    if (!tam.projected_tam.assumptions) {
      issues.push('Projected TAM: Missing assumptions')
      confidence -= 0.1
    } else {
      const assumptions = tam.projected_tam.assumptions
      if (!assumptions.patient_population_growth || !assumptions.penetration_rate_increase) {
        issues.push('Projected TAM: Incomplete assumptions')
        confidence -= 0.1
      }
    }
  }

  // Validate mathematical consistency
  if (tam.validation) {
    if (!tam.validation.math_verified || !tam.validation.growth_rates_defensible || !tam.validation.assumptions_specific) {
      issues.push('TAM: Validation checks failed')
      confidence -= 0.2
    }
  }

  return {
    isValid: confidence > 0.3,
    confidence: Math.max(0, confidence),
    issues
  }
}

// Main validation function for enhanced response
export function validateEnhancedResponse(response: any, config: EnhancedPromptConfig): {
  isValid: boolean
  confidence: number
  issues: string[]
  unblurredSections: UnblurredSection[]
} {
  const issues: string[] = []
  const unblurredSections: UnblurredSection[] = []
  let totalConfidence = 0
  let sectionCount = 0

  // Validate Executive Overview - Deal Activity
  if (response.executive_overview?.deal_activity) {
    const dealValidation = validateDealActivity([
      ...(response.executive_overview.deal_activity.target_aligned_deals || []),
      ...(response.executive_overview.deal_activity.modality_aligned_deals || []),
      ...(response.executive_overview.deal_activity.indication_aligned_deals || [])
    ])

    unblurredSections.push({
      category: 'Executive Overview',
      section: 'Deal Activity',
      data: response.executive_overview.deal_activity,
      confidence: dealValidation.confidence,
      sources: ['SEC filings', 'press releases', 'PitchBook', 'investor presentations'],
      validationStatus: dealValidation.confidence >= config.confidenceThreshold ? 'validated' : 'insufficient_data'
    })

    totalConfidence += dealValidation.confidence
    sectionCount++
    issues.push(...dealValidation.issues)
  }

  // Validate Development Readiness - Regulatory Status
  if (response.development_readiness?.regulatory_status) {
    const regulatoryValidation = validateRegulatoryStatus(response.development_readiness.regulatory_status)

    unblurredSections.push({
      category: 'Development Readiness',
      section: 'Regulatory Status & Milestones',
      data: response.development_readiness.regulatory_status,
      confidence: regulatoryValidation.confidence,
      sources: ['FDA guidance', 'EMA regulations', 'OBRA-OBBBA rules'],
      validationStatus: regulatoryValidation.confidence >= config.confidenceThreshold ? 'validated' : 'insufficient_data'
    })

    totalConfidence += regulatoryValidation.confidence
    sectionCount++
    issues.push(...regulatoryValidation.issues)
  }

  // Validate Operational Readiness - Supply Chain Risk
  if (response.operational_readiness?.supply_chain_risk) {
    const riskValidation = validateSupplyChainRisk(response.operational_readiness.supply_chain_risk)

    unblurredSections.push({
      category: 'Operational Readiness',
      section: 'Supply Chain Risk & Disruption Profile',
      data: response.operational_readiness.supply_chain_risk,
      confidence: riskValidation.confidence,
      sources: ['FDA 483s', 'BIMO reports', 'EMA compliance', 'CDMO reports'],
      validationStatus: riskValidation.confidence >= config.confidenceThreshold ? 'validated' : 'insufficient_data'
    })

    totalConfidence += riskValidation.confidence
    sectionCount++
    issues.push(...riskValidation.issues)
  }

  // Validate Strategic Synergy - TAM Analysis
  if (response.strategic_synergy?.tam_analysis) {
    const tamValidation = validateTAMAnalysis(response.strategic_synergy.tam_analysis)

    unblurredSections.push({
      category: 'Strategic Synergy',
      section: 'Current & Projected TAM',
      data: response.strategic_synergy.tam_analysis,
      confidence: tamValidation.confidence,
      sources: ['GlobalData', 'EvaluatePharma', 'analyst reports', 'financial models'],
      validationStatus: tamValidation.confidence >= config.confidenceThreshold ? 'validated' : 'insufficient_data'
    })

    totalConfidence += tamValidation.confidence
    sectionCount++
    issues.push(...tamValidation.issues)
  }

  const averageConfidence = sectionCount > 0 ? totalConfidence / sectionCount : 0
  const isValid = averageConfidence >= config.confidenceThreshold && issues.length < 5

  return {
    isValid,
    confidence: averageConfidence,
    issues,
    unblurredSections
  }
} 