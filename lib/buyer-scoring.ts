// Fine-grained buyer scoring system
export interface BuyerScore {
  name: string
  totalScore: number
  breakdown: {
    therapeuticAlignment: number
    pipelineGap: number
    cashPosition: number
    dealSizeTolerance: number
    geographicReach: number
    recentDealActivity: number
    regulatoryExpertise: number
    commercialInfrastructure: number
  }
}

export interface ScoringWeights {
  therapeuticAlignment: number
  pipelineGap: number
  cashPosition: number
  dealSizeTolerance: number
  geographicReach: number
  recentDealActivity: number
  regulatoryExpertise: number
  commercialInfrastructure: number
}

// Default weights (can be tuned based on back-testing results)
export const DEFAULT_WEIGHTS: ScoringWeights = {
  therapeuticAlignment: 0.25,
  pipelineGap: 0.20,
  cashPosition: 0.15,
  dealSizeTolerance: 0.10,
  geographicReach: 0.10,
  recentDealActivity: 0.08,
  regulatoryExpertise: 0.06,
  commercialInfrastructure: 0.06
}

// Enhanced pharma database with detailed scoring factors
export const ENHANCED_PHARMA_DATABASE = [
  {
    name: 'AstraZeneca',
    therapeutic_focus: ['oncology', 'respiratory', 'cardiovascular', 'metabolic', 'immunology'],
    pipeline_gaps: ['rare diseases', 'neurology', 'infectious diseases'],
    recent_deals: ['antibody-drug conjugates', 'small molecules', 'cell therapy'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    vector_features: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Roche',
    therapeutic_focus: ['oncology', 'immunology', 'neurology', 'ophthalmology'],
    pipeline_gaps: ['cardiovascular', 'respiratory', 'metabolic'],
    recent_deals: ['biologics', 'small molecules', 'diagnostics'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    vector_features: [0.8, 0.9, 0.6, 0.7, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Pfizer',
    therapeutic_focus: ['oncology', 'immunology', 'rare diseases', 'vaccines'],
    pipeline_gaps: ['neurology', 'cardiovascular'],
    recent_deals: ['small molecules', 'biologics', 'gene therapy'],
    cash_position: 'very_strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'very_high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    vector_features: [0.7, 0.8, 0.9, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Novartis',
    therapeutic_focus: ['oncology', 'immunology', 'ophthalmology', 'neuroscience'],
    pipeline_gaps: ['cardiovascular', 'respiratory'],
    recent_deals: ['cell therapy', 'gene therapy', 'small molecules'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    vector_features: [0.8, 0.7, 0.6, 0.9, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Johnson & Johnson',
    therapeutic_focus: ['oncology', 'immunology', 'infectious diseases', 'neuroscience'],
    pipeline_gaps: ['respiratory', 'metabolic'],
    recent_deals: ['biologics', 'cell therapy', 'small molecules'],
    cash_position: 'very_strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'very_high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    vector_features: [0.9, 0.8, 0.7, 0.6, 0.9, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Merck',
    therapeutic_focus: ['oncology', 'vaccines', 'infectious diseases', 'cardiovascular'],
    pipeline_gaps: ['neurology', 'ophthalmology'],
    recent_deals: ['small molecules', 'biologics', 'vaccines'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    vector_features: [0.8, 0.7, 0.6, 0.5, 0.4, 0.9, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Bristol-Myers Squibb',
    therapeutic_focus: ['oncology', 'immunology', 'cardiovascular'],
    pipeline_gaps: ['neurology', 'respiratory'],
    recent_deals: ['small molecules', 'biologics', 'cell therapy'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    vector_features: [0.7, 0.8, 0.6, 0.5, 0.4, 0.3, 0.9, 0.2, 0.1, 0.0]
  },
  {
    name: 'Amgen',
    therapeutic_focus: ['oncology', 'cardiovascular', 'neuroscience', 'inflammation'],
    pipeline_gaps: ['respiratory', 'metabolic'],
    recent_deals: ['biologics', 'small molecules', 'bispecifics'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'medium',
    regulatory_expertise: 'good',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    vector_features: [0.6, 0.7, 0.8, 0.5, 0.4, 0.3, 0.2, 0.9, 0.1, 0.0]
  },
  {
    name: 'Gilead Sciences',
    therapeutic_focus: ['oncology', 'infectious diseases', 'inflammation'],
    pipeline_gaps: ['neurology', 'cardiovascular'],
    recent_deals: ['cell therapy', 'small molecules', 'biologics'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    vector_features: [0.7, 0.6, 0.5, 0.8, 0.4, 0.3, 0.2, 0.1, 0.9, 0.0]
  },
  {
    name: 'Regeneron',
    therapeutic_focus: ['oncology', 'ophthalmology', 'inflammation', 'rare diseases'],
    pipeline_gaps: ['neurology', 'cardiovascular'],
    recent_deals: ['biologics', 'gene therapy', 'small molecules'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'medium',
    regulatory_expertise: 'good',
    commercial_infrastructure: 'good',
    recent_deal_activity: 'medium',
    vector_features: [0.6, 0.5, 0.7, 0.4, 0.3, 0.2, 0.1, 0.0, 0.8, 0.9]
  }
]

// Scoring functions
function scoreTherapeuticAlignment(company: any, therapeuticArea: string): number {
  const normalizedArea = therapeuticArea.toLowerCase()
  if (company.therapeutic_focus.includes(normalizedArea)) {
    return 1.0
  }
  // Partial matches
  if (normalizedArea.includes('oncology') && company.therapeutic_focus.includes('oncology')) {
    return 0.8
  }
  if (normalizedArea.includes('immunology') && company.therapeutic_focus.includes('immunology')) {
    return 0.8
  }
  return 0.0
}

function scorePipelineGap(company: any, indication: string): number {
  const normalizedIndication = indication.toLowerCase()
  if (company.pipeline_gaps.some((gap: string) => 
    normalizedIndication.includes(gap) || gap.includes(normalizedIndication)
  )) {
    return 1.0
  }
  // Partial matches
  if (normalizedIndication.includes('cancer') && company.pipeline_gaps.includes('oncology')) {
    return 0.6
  }
  return 0.0
}

function scoreCashPosition(company: any): number {
  switch (company.cash_position) {
    case 'very_strong': return 1.0
    case 'strong': return 0.8
    case 'moderate': return 0.5
    case 'weak': return 0.2
    default: return 0.5
  }
}

function scoreDealSizeTolerance(company: any, assetStage: string): number {
  const normalizedStage = assetStage.toLowerCase()
  
  if (normalizedStage.includes('preclinical') || normalizedStage.includes('ind-ready')) {
    switch (company.deal_size_tolerance) {
      case 'very_high': return 1.0
      case 'high': return 0.8
      case 'medium': return 0.5
      case 'low': return 0.2
      default: return 0.5
    }
  } else if (normalizedStage.includes('phase 1') || normalizedStage.includes('phase 2')) {
    switch (company.deal_size_tolerance) {
      case 'very_high': return 0.9
      case 'high': return 1.0
      case 'medium': return 0.7
      case 'low': return 0.4
      default: return 0.7
    }
  } else {
    // Phase 3 or later
    switch (company.deal_size_tolerance) {
      case 'very_high': return 0.8
      case 'high': return 0.9
      case 'medium': return 1.0
      case 'low': return 0.6
      default: return 0.8
    }
  }
}

function scoreGeographicReach(company: any): number {
  switch (company.geographic_reach) {
    case 'global': return 1.0
    case 'regional': return 0.6
    case 'local': return 0.3
    default: return 0.5
  }
}

function scoreRecentDealActivity(company: any): number {
  switch (company.recent_deal_activity) {
    case 'high': return 1.0
    case 'medium': return 0.7
    case 'low': return 0.4
    default: return 0.5
  }
}

function scoreRegulatoryExpertise(company: any): number {
  switch (company.regulatory_expertise) {
    case 'excellent': return 1.0
    case 'good': return 0.8
    case 'moderate': return 0.5
    case 'poor': return 0.2
    default: return 0.5
  }
}

function scoreCommercialInfrastructure(company: any): number {
  switch (company.commercial_infrastructure) {
    case 'excellent': return 1.0
    case 'good': return 0.8
    case 'moderate': return 0.5
    case 'poor': return 0.2
    default: return 0.5
  }
}

// Main scoring function
export function calculateBuyerScores(
  assetData: {
    therapeuticArea: string
    indication: string
    target: string
    modality: string
    assetStage: string
  },
  weights: ScoringWeights = DEFAULT_WEIGHTS
): BuyerScore[] {
  const scores: BuyerScore[] = []

  for (const company of ENHANCED_PHARMA_DATABASE) {
    const therapeuticAlignment = scoreTherapeuticAlignment(company, assetData.therapeuticArea)
    const pipelineGap = scorePipelineGap(company, assetData.indication)
    const cashPosition = scoreCashPosition(company)
    const dealSizeTolerance = scoreDealSizeTolerance(company, assetData.assetStage)
    const geographicReach = scoreGeographicReach(company)
    const recentDealActivity = scoreRecentDealActivity(company)
    const regulatoryExpertise = scoreRegulatoryExpertise(company)
    const commercialInfrastructure = scoreCommercialInfrastructure(company)

    const totalScore = 
      therapeuticAlignment * weights.therapeuticAlignment +
      pipelineGap * weights.pipelineGap +
      cashPosition * weights.cashPosition +
      dealSizeTolerance * weights.dealSizeTolerance +
      geographicReach * weights.geographicReach +
      recentDealActivity * weights.recentDealActivity +
      regulatoryExpertise * weights.regulatoryExpertise +
      commercialInfrastructure * weights.commercialInfrastructure

    scores.push({
      name: company.name,
      totalScore,
      breakdown: {
        therapeuticAlignment,
        pipelineGap,
        cashPosition,
        dealSizeTolerance,
        geographicReach,
        recentDealActivity,
        regulatoryExpertise,
        commercialInfrastructure
      }
    })
  }

  // Sort by total score (descending)
  return scores.sort((a, b) => b.totalScore - a.totalScore)
}

// Get the top buyer deterministically
export function getTopBuyer(assetData: any): string {
  const scores = calculateBuyerScores(assetData)
  return scores[0]?.name || 'Unknown'
}

// Get top N buyers with scores
export function getTopBuyers(assetData: any, count: number = 5): BuyerScore[] {
  const scores = calculateBuyerScores(assetData)
  return scores.slice(0, count)
} 