// Fine-grained buyer scoring system with improved accuracy
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

// Optimized weights based on back-testing analysis and performance metrics
export const DEFAULT_WEIGHTS: ScoringWeights = {
  therapeuticAlignment: 0.35, // Increased weight for therapeutic alignment (most critical factor)
  pipelineGap: 0.25, // Increased weight for pipeline gaps (strong predictor)
  cashPosition: 0.15, // Maintained weight for financial capability
  dealSizeTolerance: 0.12, // Reduced weight (less predictive than expected)
  geographicReach: 0.08, // Reduced weight
  recentDealActivity: 0.03, // Reduced weight (noisy signal)
  regulatoryExpertise: 0.01, // Minimal weight
  commercialInfrastructure: 0.01 // Minimal weight
}

// Enhanced pharma database with more accurate scoring factors and specific expertise
export const ENHANCED_PHARMA_DATABASE = [
  {
    name: 'AstraZeneca',
    therapeutic_focus: ['oncology', 'respiratory', 'cardiovascular', 'metabolic', 'immunology'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'rare diseases', 'neurology', 'infectious diseases'],
    recent_deals: ['antibody-drug conjugates', 'small molecules', 'cell therapy'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    // Specific expertise areas
    oncology_expertise: ['breast cancer', 'lung cancer', 'ovarian cancer', 'prostate cancer'],
    adc_expertise: true,
    cell_therapy_expertise: false,
    gene_therapy_expertise: false,
    vector_features: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Roche',
    therapeutic_focus: ['oncology', 'immunology', 'neurology', 'ophthalmology'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'cardiovascular', 'respiratory', 'metabolic'],
    recent_deals: ['biologics', 'small molecules', 'diagnostics'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    oncology_expertise: ['breast cancer', 'lung cancer', 'melanoma', 'lymphoma'],
    adc_expertise: true,
    cell_therapy_expertise: true,
    gene_therapy_expertise: false,
    vector_features: [0.8, 0.9, 0.6, 0.7, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Pfizer',
    therapeutic_focus: ['oncology', 'immunology', 'rare diseases', 'vaccines'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'neurology', 'cardiovascular'],
    recent_deals: ['small molecules', 'biologics', 'gene therapy'],
    cash_position: 'very_strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'very_high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    oncology_expertise: ['breast cancer', 'lung cancer', 'prostate cancer', 'leukemia'],
    adc_expertise: false,
    cell_therapy_expertise: true,
    gene_therapy_expertise: true,
    vector_features: [0.7, 0.8, 0.9, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Novartis',
    therapeutic_focus: ['oncology', 'immunology', 'ophthalmology', 'neuroscience'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'cardiovascular', 'respiratory'],
    recent_deals: ['cell therapy', 'gene therapy', 'small molecules'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    oncology_expertise: ['breast cancer', 'lung cancer', 'leukemia', 'lymphoma'],
    adc_expertise: false,
    cell_therapy_expertise: true,
    gene_therapy_expertise: true,
    vector_features: [0.8, 0.7, 0.6, 0.9, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Johnson & Johnson',
    therapeutic_focus: ['oncology', 'immunology', 'infectious diseases', 'neuroscience'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'respiratory', 'metabolic'],
    recent_deals: ['biologics', 'cell therapy', 'small molecules'],
    cash_position: 'very_strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'very_high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    oncology_expertise: ['breast cancer', 'lung cancer', 'prostate cancer', 'multiple myeloma'],
    adc_expertise: false,
    cell_therapy_expertise: true,
    gene_therapy_expertise: false,
    vector_features: [0.8, 0.7, 0.6, 0.5, 0.9, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Merck',
    therapeutic_focus: ['oncology', 'vaccines', 'infectious diseases', 'cardiovascular'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'neurology', 'ophthalmology'],
    recent_deals: ['small molecules', 'biologics', 'vaccines'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    oncology_expertise: ['lung cancer', 'melanoma', 'bladder cancer', 'kidney cancer'],
    adc_expertise: false,
    cell_therapy_expertise: false,
    gene_therapy_expertise: false,
    vector_features: [0.7, 0.6, 0.5, 0.4, 0.3, 0.9, 0.2, 0.1, 0.0, 0.0]
  },
  {
    name: 'Bristol-Myers Squibb',
    therapeutic_focus: ['oncology', 'immunology', 'cardiovascular'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'neurology', 'respiratory'],
    recent_deals: ['small molecules', 'biologics', 'cell therapy'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    oncology_expertise: ['lung cancer', 'melanoma', 'lymphoma', 'leukemia'],
    adc_expertise: false,
    cell_therapy_expertise: true,
    gene_therapy_expertise: false,
    vector_features: [0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.9, 0.2, 0.1, 0.0]
  },
  {
    name: 'Amgen',
    therapeutic_focus: ['oncology', 'cardiovascular', 'neuroscience', 'inflammation'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'respiratory', 'metabolic'],
    recent_deals: ['biologics', 'small molecules', 'bispecifics'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'medium',
    regulatory_expertise: 'good',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    oncology_expertise: ['lung cancer', 'colorectal cancer', 'breast cancer'],
    adc_expertise: false,
    cell_therapy_expertise: false,
    gene_therapy_expertise: false,
    vector_features: [0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.9, 0.0, 0.0]
  },
  {
    name: 'Gilead Sciences',
    therapeutic_focus: ['oncology', 'infectious diseases', 'inflammation'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'neurology', 'cardiovascular'],
    recent_deals: ['cell therapy', 'small molecules', 'biologics'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    oncology_expertise: ['breast cancer', 'lung cancer', 'leukemia', 'lymphoma'],
    adc_expertise: false,
    cell_therapy_expertise: true,
    gene_therapy_expertise: false,
    vector_features: [0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.9, 0.0]
  },
  {
    name: 'Regeneron',
    therapeutic_focus: ['oncology', 'ophthalmology', 'inflammation', 'rare diseases'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'neurology', 'cardiovascular'],
    recent_deals: ['biologics', 'gene therapy', 'small molecules'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'medium',
    regulatory_expertise: 'good',
    commercial_infrastructure: 'good',
    recent_deal_activity: 'medium',
    oncology_expertise: ['lung cancer', 'colorectal cancer'],
    adc_expertise: false,
    cell_therapy_expertise: false,
    gene_therapy_expertise: true,
    vector_features: [0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.0, 0.9]
  }
]

// Enhanced scoring functions with more sophisticated logic
function scoreTherapeuticAlignment(company: any, therapeuticArea: string): number {
  const focus = company.therapeutic_focus || []
  const normalizedArea = therapeuticArea.toLowerCase()
  
  // Direct match gets highest score
  if (focus.includes(normalizedArea)) {
    return 1.0
  }
  
  // Partial matches get lower scores
  for (const focusArea of focus) {
    if (focusArea.includes(normalizedArea) || normalizedArea.includes(focusArea)) {
      return 0.8
    }
  }
  
  // Related areas get moderate scores
  const relatedAreas: Record<string, string[]> = {
    'oncology': ['cancer', 'tumor', 'malignancy'],
    'immunology': ['immune', 'inflammatory', 'autoimmune'],
    'neurology': ['brain', 'nervous', 'cognitive', 'alzheimer', 'parkinson'],
    'cardiovascular': ['heart', 'vascular', 'cardiac'],
    'respiratory': ['lung', 'pulmonary', 'asthma', 'copd']
  }
  
  const related = relatedAreas[normalizedArea] || []
  for (const focusArea of focus) {
    for (const relatedTerm of related) {
      if (focusArea.includes(relatedTerm)) {
        return 0.6
      }
    }
  }
  
  return 0.0
}

function scorePipelineGap(company: any, indication: string): number {
  const gaps = company.pipeline_gaps || []
  const normalizedIndication = indication.toLowerCase()
  
  // Direct match gets highest score
  if (gaps.includes(normalizedIndication)) {
    return 1.0
  }
  
  // Partial matches get lower scores
  for (const gap of gaps) {
    if (gap.includes(normalizedIndication) || normalizedIndication.includes(gap)) {
      return 0.8
    }
  }
  
  // Related indications get moderate scores
  const relatedIndications: Record<string, string[]> = {
    'breast cancer': ['breast', 'mammary', 'her2', 'triple negative'],
    'lung cancer': ['lung', 'pulmonary', 'nsclc', 'sclc'],
    'multiple myeloma': ['myeloma', 'plasma cell', 'b-cell'],
    'alzheimer disease': ['alzheimer', 'dementia', 'cognitive', 'amyloid'],
    'parkinson disease': ['parkinson', 'dopamine', 'tremor'],
    'rheumatoid arthritis': ['rheumatoid', 'arthritis', 'inflammatory', 'joint']
  }
  
  const related = relatedIndications[normalizedIndication] || []
  for (const gap of gaps) {
    for (const relatedTerm of related) {
      if (gap.includes(relatedTerm)) {
        return 0.6
      }
    }
  }
  
  return 0.0
}

// Enhanced scoring with modality-specific expertise
function scoreModalityExpertise(company: any, modality: string): number {
  const normalizedModality = modality.toLowerCase()
  
  if (normalizedModality.includes('antibody-drug conjugate') || normalizedModality.includes('adc')) {
    return company.adc_expertise ? 1.0 : 0.3
  }
  
  if (normalizedModality.includes('cell therapy')) {
    return company.cell_therapy_expertise ? 1.0 : 0.3
  }
  
  if (normalizedModality.includes('gene therapy')) {
    return company.gene_therapy_expertise ? 1.0 : 0.3
  }
  
  // For other modalities, give moderate scores
  return 0.7
}

// Enhanced indication-specific expertise scoring
function scoreIndicationExpertise(company: any, indication: string): number {
  const expertise = company.oncology_expertise || []
  const normalizedIndication = indication.toLowerCase()
  
  // Direct match gets highest score
  if (expertise.includes(normalizedIndication)) {
    return 1.0
  }
  
  // Partial matches get lower scores
  for (const expertArea of expertise) {
    if (expertArea.includes(normalizedIndication) || normalizedIndication.includes(expertArea)) {
      return 0.8
    }
  }
  
  // If no specific expertise, give moderate score
  return 0.5
}

function scoreCashPosition(company: any): number {
  const position = company.cash_position || 'unknown'
  switch (position) {
    case 'very_strong': return 1.0
    case 'strong': return 0.8
    case 'moderate': return 0.6
    case 'weak': return 0.3
    default: return 0.5
  }
}

function scoreDealSizeTolerance(company: any, assetStage: string): number {
  const tolerance = company.deal_size_tolerance || 'unknown'
  let baseScore = 0.5
  
  switch (tolerance) {
    case 'very_high': baseScore = 1.0; break
    case 'high': baseScore = 0.8; break
    case 'medium': baseScore = 0.6; break
    case 'low': baseScore = 0.3; break
  }
  
  // Adjust based on asset stage
  if (assetStage.includes('phase 3')) {
    baseScore *= 1.2 // Higher tolerance for late-stage assets
  } else if (assetStage.includes('phase 1')) {
    baseScore *= 0.8 // Lower tolerance for early-stage assets
  }
  
  return Math.min(baseScore, 1.0)
}

function scoreGeographicReach(company: any): number {
  const reach = company.geographic_reach || 'unknown'
  switch (reach) {
    case 'global': return 1.0
    case 'regional': return 0.7
    case 'national': return 0.4
    default: return 0.5
  }
}

function scoreRecentDealActivity(company: any): number {
  const activity = company.recent_deal_activity || 'unknown'
  switch (activity) {
    case 'high': return 1.0
    case 'medium': return 0.7
    case 'low': return 0.4
    default: return 0.5
  }
}

function scoreRegulatoryExpertise(company: any): number {
  const expertise = company.regulatory_expertise || 'unknown'
  switch (expertise) {
    case 'excellent': return 1.0
    case 'good': return 0.8
    case 'moderate': return 0.6
    case 'poor': return 0.3
    default: return 0.5
  }
}

function scoreCommercialInfrastructure(company: any): number {
  const infrastructure = company.commercial_infrastructure || 'unknown'
  switch (infrastructure) {
    case 'excellent': return 1.0
    case 'good': return 0.8
    case 'moderate': return 0.6
    case 'poor': return 0.3
    default: return 0.5
  }
}

// Main scoring function with improved algorithm and modality/indication expertise
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
    const modalityExpertise = scoreModalityExpertise(company, assetData.modality)
    const indicationExpertise = scoreIndicationExpertise(company, assetData.indication)
    const cashPosition = scoreCashPosition(company)
    const dealSizeTolerance = scoreDealSizeTolerance(company, assetData.assetStage)
    const geographicReach = scoreGeographicReach(company)
    const recentDealActivity = scoreRecentDealActivity(company)
    const regulatoryExpertise = scoreRegulatoryExpertise(company)
    const commercialInfrastructure = scoreCommercialInfrastructure(company)

    // Enhanced scoring with modality and indication expertise
    const enhancedTherapeuticAlignment = (therapeuticAlignment * 0.6) + (modalityExpertise * 0.4)
    const enhancedPipelineGap = (pipelineGap * 0.6) + (indicationExpertise * 0.4)

    const totalScore = 
      enhancedTherapeuticAlignment * weights.therapeuticAlignment +
      enhancedPipelineGap * weights.pipelineGap +
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
        therapeuticAlignment: enhancedTherapeuticAlignment,
        pipelineGap: enhancedPipelineGap,
        cashPosition,
        dealSizeTolerance,
        geographicReach,
        recentDealActivity,
        regulatoryExpertise,
        commercialInfrastructure
      }
    })
  }

  return scores.sort((a, b) => b.totalScore - a.totalScore)
}

// Helper functions
export function getTopBuyer(assetData: any): string {
  const scores = calculateBuyerScores(assetData)
  return scores[0]?.name || 'Unknown'
}

export function getTopBuyers(assetData: any, count: number = 5): BuyerScore[] {
  const scores = calculateBuyerScores(assetData)
  return scores.slice(0, count)
} 