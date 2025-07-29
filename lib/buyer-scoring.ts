// Fine-grained buyer scoring system with improved accuracy and quality filters
export interface BuyerScore {
  name: string
  totalScore: number
  qualityScore: number // New quality score to filter out poor matches
  confidenceLevel: 'high' | 'medium' | 'low' // Confidence in the match
  breakdown: {
    therapeuticAlignment: number
    pipelineGap: number
    cashPosition: number
    dealSizeTolerance: number
    geographicReach: number
    recentDealActivity: number
    regulatoryExpertise: number
    commercialInfrastructure: number
    modalityExpertise: number // New field
    indicationExpertise: number // New field
    assetComplexity: number // New field for asset-specific scoring
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
  modalityExpertise: number
  indicationExpertise: number
  assetComplexity: number
}

// Optimized weights with quality focus
export const DEFAULT_WEIGHTS: ScoringWeights = {
  therapeuticAlignment: 0.25, // Reduced weight
  pipelineGap: 0.20, // Reduced weight
  cashPosition: 0.10, // Reduced weight
  dealSizeTolerance: 0.08, // Reduced weight
  geographicReach: 0.05, // Reduced weight
  recentDealActivity: 0.02, // Minimal weight
  regulatoryExpertise: 0.05, // Increased weight
  commercialInfrastructure: 0.05, // Increased weight
  modalityExpertise: 0.15, // New high weight for modality expertise
  indicationExpertise: 0.10, // New weight for indication expertise
  assetComplexity: 0.05 // New weight for asset complexity
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
    rna_expertise: false,
    rare_disease_expertise: true,
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
    rna_expertise: false,
    rare_disease_expertise: true,
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
    rna_expertise: true,
    rare_disease_expertise: true,
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
    rna_expertise: false,
    rare_disease_expertise: true,
    vector_features: [0.8, 0.7, 0.9, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Johnson & Johnson',
    therapeutic_focus: ['oncology', 'immunology', 'neurology', 'infectious diseases'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'cardiovascular', 'respiratory'],
    recent_deals: ['biologics', 'small molecules', 'cell therapy'],
    cash_position: 'very_strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'very_high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    oncology_expertise: ['breast cancer', 'lung cancer', 'prostate cancer', 'multiple myeloma'],
    adc_expertise: true,
    cell_therapy_expertise: true,
    gene_therapy_expertise: false,
    rna_expertise: false,
    rare_disease_expertise: true,
    vector_features: [0.8, 0.7, 0.6, 0.9, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0]
  },
  {
    name: 'Merck',
    therapeutic_focus: ['oncology', 'infectious diseases', 'vaccines', 'cardiovascular'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'neurology', 'immunology'],
    recent_deals: ['small molecules', 'biologics', 'vaccines'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    oncology_expertise: ['lung cancer', 'melanoma', 'head and neck cancer'],
    adc_expertise: false,
    cell_therapy_expertise: false,
    gene_therapy_expertise: false,
    rna_expertise: false,
    rare_disease_expertise: false,
    vector_features: [0.6, 0.7, 0.5, 0.4, 0.9, 0.3, 0.2, 0.1, 0.0, 0.0]
  },
  {
    name: 'Gilead Sciences',
    therapeutic_focus: ['infectious diseases', 'oncology', 'immunology'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'cardiovascular', 'neurology'],
    recent_deals: ['cell therapy', 'small molecules', 'biologics'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    oncology_expertise: ['hematologic malignancies', 'solid tumors'],
    adc_expertise: false,
    cell_therapy_expertise: true,
    gene_therapy_expertise: false,
    rna_expertise: false,
    rare_disease_expertise: true,
    vector_features: [0.5, 0.6, 0.7, 0.4, 0.3, 0.9, 0.2, 0.1, 0.0, 0.0]
  },
  {
    name: 'Bristol-Myers Squibb',
    therapeutic_focus: ['oncology', 'immunology', 'cardiovascular'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'neurology', 'respiratory'],
    recent_deals: ['cell therapy', 'small molecules', 'biologics'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'high',
    oncology_expertise: ['hematologic malignancies', 'solid tumors', 'immuno-oncology'],
    adc_expertise: false,
    cell_therapy_expertise: true,
    gene_therapy_expertise: false,
    rna_expertise: false,
    rare_disease_expertise: true,
    vector_features: [0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.9, 0.1, 0.0, 0.0]
  },
  {
    name: 'Sanofi',
    therapeutic_focus: ['immunology', 'oncology', 'rare diseases', 'vaccines'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'neurology', 'cardiovascular'],
    recent_deals: ['biologics', 'small molecules', 'cell therapy'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'high',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    oncology_expertise: ['hematologic malignancies', 'solid tumors'],
    adc_expertise: true,
    cell_therapy_expertise: true,
    gene_therapy_expertise: false,
    rna_expertise: false,
    rare_disease_expertise: true,
    vector_features: [0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.9, 0.0, 0.0]
  },
  {
    name: 'Amgen',
    therapeutic_focus: ['oncology', 'immunology', 'cardiovascular', 'bone health'],
    pipeline_gaps: ['breast cancer', 'lung cancer', 'neurology', 'respiratory'],
    recent_deals: ['biologics', 'small molecules'],
    cash_position: 'strong',
    geographic_reach: 'global',
    deal_size_tolerance: 'medium',
    regulatory_expertise: 'excellent',
    commercial_infrastructure: 'excellent',
    recent_deal_activity: 'medium',
    oncology_expertise: ['hematologic malignancies', 'solid tumors'],
    adc_expertise: false,
    cell_therapy_expertise: false,
    gene_therapy_expertise: false,
    rna_expertise: false,
    rare_disease_expertise: true,
    vector_features: [0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.0, 0.0, 0.9, 0.0]
  }
]

// Enhanced scoring with quality filters and better differentiation
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
    'immunology': ['immune', 'inflammatory', 'autoimmune', 'rheumatology'],
    'neurology': ['brain', 'nervous', 'cognitive', 'alzheimer', 'parkinson', 'neuromuscular'],
    'cardiovascular': ['heart', 'vascular', 'cardiac', 'cardiology'],
    'respiratory': ['lung', 'pulmonary', 'asthma', 'copd'],
    'infectious disease': ['infectious', 'bacterial', 'viral', 'fungal'],
    'gastroenterology': ['gastro', 'intestinal', 'digestive'],
    'dermatology': ['skin', 'dermatological', 'cutaneous'],
    'ophthalmology': ['eye', 'retinal', 'ocular'],
    'endocrinology': ['endocrine', 'metabolic', 'hormone'],
    'rheumatology': ['rheumatoid', 'arthritis', 'inflammatory']
  }
  
  const related = relatedAreas[normalizedArea] || []
  for (const focusArea of focus) {
    for (const relatedTerm of related) {
      if (focusArea.includes(relatedTerm)) {
        return 0.6
      }
    }
  }
  
  // No match - return low score
  return 0.2
}

// Enhanced pipeline gap scoring with better indication matching
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
  
  // Enhanced related indications mapping
  const relatedIndications: Record<string, string[]> = {
    'breast cancer': ['breast', 'mammary', 'her2', 'triple negative'],
    'lung cancer': ['lung', 'pulmonary', 'nsclc', 'sclc'],
    'multiple myeloma': ['myeloma', 'plasma cell', 'b-cell'],
    'alzheimer disease': ['alzheimer', 'dementia', 'cognitive', 'amyloid'],
    'parkinson disease': ['parkinson', 'dopamine', 'tremor'],
    'rheumatoid arthritis': ['rheumatoid', 'arthritis', 'inflammatory', 'joint'],
    'rare diseases': ['rare', 'orphan', 'ultra-rare', 'genetic'],
    'neurology': ['neurological', 'brain', 'nervous system'],
    'cardiovascular': ['cardiac', 'heart', 'vascular'],
    'infectious diseases': ['infectious', 'bacterial', 'viral']
  }
  
  const related = relatedIndications[normalizedIndication] || []
  for (const gap of gaps) {
    for (const relatedTerm of related) {
      if (gap.includes(relatedTerm)) {
        return 0.6
      }
    }
  }
  
  // No specific gap - return moderate score for general rare disease expertise
  if (gaps.includes('rare diseases')) {
    return 0.4
  }
  
  return 0.2
}

// Enhanced modality expertise scoring with more granular assessment
function scoreModalityExpertise(company: any, modality: string): number {
  const normalizedModality = modality.toLowerCase()
  
  // Gene therapy expertise
  if (normalizedModality.includes('gene therapy') || normalizedModality.includes('gene replacement') || 
      normalizedModality.includes('crispr') || normalizedModality.includes('base editing') ||
      normalizedModality.includes('gene-edited')) {
    return company.gene_therapy_expertise ? 1.0 : 0.2
  }
  
  // Cell therapy expertise
  if (normalizedModality.includes('cell therapy') || normalizedModality.includes('car-t') ||
      normalizedModality.includes('ipsc') || normalizedModality.includes('stem cell') ||
      normalizedModality.includes('keratinocyte')) {
    return company.cell_therapy_expertise ? 1.0 : 0.2
  }
  
  // Antibody-drug conjugate expertise
  if (normalizedModality.includes('antibody-drug conjugate') || normalizedModality.includes('adc') ||
      normalizedModality.includes('monoclonal antibody')) {
    return company.adc_expertise ? 1.0 : 0.3
  }
  
  // RNA therapy expertise
  if (normalizedModality.includes('mrna') || normalizedModality.includes('rna') ||
      normalizedModality.includes('lipid nanoparticle')) {
    return company.rna_expertise ? 1.0 : 0.3
  }
  
  // Small molecule expertise (default for most companies)
  if (normalizedModality.includes('small molecule') || normalizedModality.includes('oral') ||
      normalizedModality.includes('inhibitor') || normalizedModality.includes('agonist') ||
      normalizedModality.includes('antagonist')) {
    return 0.8 // Most companies have small molecule expertise
  }
  
  // Unknown modality - return moderate score
  return 0.5
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
  
  // Check for rare disease expertise
  if (normalizedIndication.includes('rare') || normalizedIndication.includes('orphan') ||
      normalizedIndication.includes('ultra-rare') || normalizedIndication.includes('genetic')) {
    return company.rare_disease_expertise ? 0.7 : 0.4
  }
  
  // If no specific expertise, give lower score
  return 0.3
}

// New function to score asset complexity and adjust scores accordingly
function scoreAssetComplexity(assetData: any): number {
  const { therapeuticArea, indication, modality, assetStage } = assetData
  let complexity = 0.5 // Base complexity
  
  // Increase complexity for rare/ultra-rare diseases
  if (indication.toLowerCase().includes('rare') || indication.toLowerCase().includes('orphan') ||
      indication.toLowerCase().includes('ultra-rare') || indication.toLowerCase().includes('genetic')) {
    complexity += 0.2
  }
  
  // Increase complexity for novel modalities
  if (modality.toLowerCase().includes('gene therapy') || modality.toLowerCase().includes('crispr') ||
      modality.toLowerCase().includes('ipsc') || modality.toLowerCase().includes('cell therapy')) {
    complexity += 0.3
  }
  
  // Decrease complexity for early stage (higher risk)
  if (assetStage.toLowerCase().includes('discovery') || assetStage.toLowerCase().includes('preclinical')) {
    complexity -= 0.1
  }
  
  // Increase complexity for novel targets
  if (indication.toLowerCase().includes('novel') || indication.toLowerCase().includes('first-in-class')) {
    complexity += 0.2
  }
  
  return Math.max(0.1, Math.min(1.0, complexity))
}

// New function to calculate quality score
function calculateQualityScore(company: any, assetData: any, scores: any): number {
  const { therapeuticAlignment, pipelineGap, modalityExpertise, indicationExpertise } = scores
  
  // Quality is based on how well the company matches the specific asset
  let quality = 0
  
  // High quality if company has strong alignment in key areas
  if (therapeuticAlignment >= 0.8 && modalityExpertise >= 0.8) {
    quality += 0.4
  } else if (therapeuticAlignment >= 0.6 && modalityExpertise >= 0.6) {
    quality += 0.3
  } else {
    quality += 0.1
  }
  
  // Bonus for specific indication expertise
  if (indicationExpertise >= 0.8) {
    quality += 0.3
  } else if (indicationExpertise >= 0.6) {
    quality += 0.2
  }
  
  // Bonus for pipeline gap alignment
  if (pipelineGap >= 0.8) {
    quality += 0.3
  } else if (pipelineGap >= 0.6) {
    quality += 0.2
  }
  
  return Math.min(1.0, quality)
}

// New function to determine confidence level
function determineConfidenceLevel(qualityScore: number, totalScore: number): 'high' | 'medium' | 'low' {
  if (qualityScore >= 0.8 && totalScore >= 0.7) {
    return 'high'
  } else if (qualityScore >= 0.6 && totalScore >= 0.5) {
    return 'medium'
  } else {
    return 'low'
  }
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

// Main scoring function with improved algorithm, quality filters, and better differentiation
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
    const assetComplexity = scoreAssetComplexity(assetData)

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
      commercialInfrastructure * weights.commercialInfrastructure +
      modalityExpertise * weights.modalityExpertise +
      indicationExpertise * weights.indicationExpertise +
      assetComplexity * weights.assetComplexity

    const qualityScore = calculateQualityScore(company, assetData, {
      therapeuticAlignment: enhancedTherapeuticAlignment,
      pipelineGap: enhancedPipelineGap,
      modalityExpertise,
      indicationExpertise
    })

    const confidenceLevel = determineConfidenceLevel(qualityScore, totalScore)

    // Only include companies with reasonable quality scores
    if (qualityScore >= 0.3) {
      scores.push({
        name: company.name,
        totalScore,
        qualityScore,
        confidenceLevel,
        breakdown: {
          therapeuticAlignment: enhancedTherapeuticAlignment,
          pipelineGap: enhancedPipelineGap,
          cashPosition,
          dealSizeTolerance,
          geographicReach,
          recentDealActivity,
          regulatoryExpertise,
          commercialInfrastructure,
          modalityExpertise,
          indicationExpertise,
          assetComplexity
        }
      })
    }
  }

  // Sort by quality score first, then by total score
  return scores.sort((a, b) => {
    if (Math.abs(a.qualityScore - b.qualityScore) > 0.1) {
      return b.qualityScore - a.qualityScore
    }
    return b.totalScore - a.totalScore
  })
}

// Enhanced helper functions with quality filtering
export function getTopBuyer(assetData: any): string {
  const scores = calculateBuyerScores(assetData)
  const topScore = scores[0]
  
  // Only return a buyer if quality is acceptable
  if (topScore && topScore.qualityScore >= 0.4) {
    return topScore.name
  }
  
  return 'No suitable buyer found'
}

export function getTopBuyers(assetData: any, count: number = 5): BuyerScore[] {
  const scores = calculateBuyerScores(assetData)
  
  // Filter to only high-quality matches
  const highQualityScores = scores.filter(score => score.qualityScore >= 0.4)
  
  return highQualityScores.slice(0, count)
} 