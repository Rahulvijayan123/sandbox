// Advanced ensemble model system for improved accuracy and reliability
export interface ModelResponse {
  model: string
  response: any
  confidence: number
  reasoning: string
  metadata: {
    responseTime: number
    tokenCount: number
    searchQueries: number
    sources: string[]
  }
}

export interface EnsembleResult {
  finalResponse: any
  confidence: number
  agreement: number
  modelResponses: ModelResponse[]
  consensus: {
    buyer: string
    confidence: number
    disagreement: string[]
  }
  qualityMetrics: {
    consistency: number
    completeness: number
    specificity: number
  }
}

// Model configuration for ensemble
const MODEL_CONFIGS = {
  'perplexity-sonar-pro': {
    weight: 0.4,
    maxTokens: 6000,
    temperature: 0.05,
    reasoningEffort: 'high',
    searchContextSize: 'medium'
  },
  'perplexity-sonar-deep-research': {
    weight: 0.35,
    maxTokens: 8000,
    temperature: 0.05,
    reasoningEffort: 'high',
    searchContextSize: 'high'
  },
  'gpt-4o': {
    weight: 0.25,
    maxTokens: 4000,
    temperature: 0.1,
    reasoningEffort: 'high',
    searchContextSize: 'medium'
  }
}

// Consensus detection and resolution
function detectConsensus(responses: ModelResponse[]): {
  buyer: string
  confidence: number
  disagreement: string[]
} {
  const buyerVotes: Record<string, number> = {}
  const buyerConfidences: Record<string, number[]> = {}
  
  // Count votes and collect confidences
  responses.forEach(response => {
    const buyer = response.response.buyer
    if (buyer && buyer !== 'null' && buyer !== 'Unknown') {
      buyerVotes[buyer] = (buyerVotes[buyer] || 0) + 1
      if (!buyerConfidences[buyer]) {
        buyerConfidences[buyer] = []
      }
      buyerConfidences[buyer].push(response.confidence)
    }
  })
  
  // Find most voted buyer
  const sortedBuyers = Object.entries(buyerVotes)
    .sort(([,a], [,b]) => b - a)
  
  if (sortedBuyers.length === 0) {
    return {
      buyer: 'Unknown',
      confidence: 0.0,
      disagreement: ['No consensus on buyer selection']
    }
  }
  
  const [topBuyer, votes] = sortedBuyers[0]
  const totalVotes = responses.length
  const agreement = votes / totalVotes
  
  // Calculate weighted confidence
  const confidences = buyerConfidences[topBuyer] || []
  const avgConfidence = confidences.length > 0 
    ? confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length 
    : 0.5
  
  // Detect disagreements
  const disagreement: string[] = []
  if (agreement < 0.67) {
    disagreement.push(`Low agreement: ${(agreement * 100).toFixed(1)}% consensus`)
  }
  
  const otherBuyers = sortedBuyers.slice(1).map(([buyer, vote]) => `${buyer} (${vote} votes)`)
  if (otherBuyers.length > 0) {
    disagreement.push(`Alternative buyers: ${otherBuyers.join(', ')}`)
  }
  
  return {
    buyer: topBuyer,
    confidence: avgConfidence * agreement,
    disagreement
  }
}

// Quality metrics calculation
function calculateQualityMetrics(responses: ModelResponse[]): {
  consistency: number
  completeness: number
  specificity: number
} {
  if (responses.length === 0) {
    return { consistency: 0, completeness: 0, specificity: 0 }
  }
  
  // Consistency: How similar are the responses
  const buyerAgreement = detectConsensus(responses).confidence
  const rationaleSimilarity = calculateRationaleSimilarity(responses)
  const consistency = (buyerAgreement + rationaleSimilarity) / 2
  
  // Completeness: How many fields are filled
  const requiredFields = ['buyer', 'rationale', 'confidence_score', 'strategic_fit_score']
  const completenessScores = responses.map(response => {
    const filledFields = requiredFields.filter(field => 
      response.response[field] && 
      response.response[field] !== 'null' && 
      response.response[field] !== ''
    ).length
    return filledFields / requiredFields.length
  })
  const completeness = completenessScores.reduce((sum, score) => sum + score, 0) / completenessScores.length
  
  // Specificity: How specific are the responses
  const specificityScores = responses.map(response => {
    const rationale = response.response.rationale || ''
    const hasSpecificData = /(\d+\.?\d*%?|\$\d+|\d{4}|\d{1,2}\/\d{1,2})/.test(rationale)
    const hasCompanyNames = /(AstraZeneca|Roche|Pfizer|Novartis|Johnson & Johnson|Merck|Bristol-Myers Squibb|Amgen|Gilead|Regeneron)/i.test(rationale)
    const hasTechnicalTerms = /(HER2|EGFR|VEGF|PD-1|CTLA-4|ADC|CAR-T|Phase \d|FDA|EMA)/i.test(rationale)
    
    return (hasSpecificData ? 0.4 : 0) + (hasCompanyNames ? 0.3 : 0) + (hasTechnicalTerms ? 0.3 : 0)
  })
  const specificity = specificityScores.reduce((sum, score) => sum + score, 0) / specificityScores.length
  
  return { consistency, completeness, specificity }
}

// Calculate similarity between rationales
function calculateRationaleSimilarity(responses: ModelResponse[]): number {
  if (responses.length < 2) return 1.0
  
  const rationales = responses
    .map(r => r.response.rationale || '')
    .filter(r => r.length > 0)
  
  if (rationales.length < 2) return 1.0
  
  // Simple keyword overlap similarity
  const keywordSets = rationales.map(rationale => {
    const words = rationale.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((word: string) => word.length > 3)
    return new Set(words)
  })
  
  let totalSimilarity = 0
  let comparisons = 0
  
  for (let i = 0; i < keywordSets.length; i++) {
    for (let j = i + 1; j < keywordSets.length; j++) {
      const intersection = new Set([...keywordSets[i]].filter(x => keywordSets[j].has(x)))
      const union = new Set([...keywordSets[i], ...keywordSets[j]])
      const similarity = intersection.size / union.size
      totalSimilarity += similarity
      comparisons++
    }
  }
  
  return comparisons > 0 ? totalSimilarity / comparisons : 1.0
}

// Weighted ensemble response generation
function generateEnsembleResponse(responses: ModelResponse[]): any {
  if (responses.length === 0) {
    return { error: 'No model responses available' }
  }
  
  // Weighted average for numerical fields
  const weightedFields: Record<string, number> = {}
  const textFields: Record<string, string[]> = {}
  
  responses.forEach(response => {
    const weight = MODEL_CONFIGS[response.model as keyof typeof MODEL_CONFIGS]?.weight || 0.1
    
    // Handle numerical fields
    if (response.response.confidence_score) {
      weightedFields.confidence_score = (weightedFields.confidence_score || 0) + 
        (response.response.confidence_score * weight)
    }
    if (response.response.strategic_fit_score) {
      weightedFields.strategic_fit_score = (weightedFields.strategic_fit_score || 0) + 
        (response.response.strategic_fit_score * weight)
    }
    
    // Collect text fields for voting
    if (response.response.buyer) {
      if (!textFields.buyer) textFields.buyer = []
      textFields.buyer.push(response.response.buyer)
    }
    if (response.response.rationale) {
      if (!textFields.rationale) textFields.rationale = []
      textFields.rationale.push(response.response.rationale)
    }
  })
  
  // Select best text responses
  const consensus = detectConsensus(responses)
  const bestRationale = selectBestRationale(responses)
  
  return {
    buyer: consensus.buyer,
    rationale: bestRationale,
    confidence_score: weightedFields.confidence_score || 0.8,
    strategic_fit_score: weightedFields.strategic_fit_score || 0.8,
    alternative_buyers: extractAlternativeBuyers(responses),
    // Include other fields from the highest confidence response
    ...responses.reduce((best, current) => 
      current.confidence > best.confidence ? current.response : best.response
    , { confidence: 0, response: {} })
  }
}

// Select the best rationale from all responses
function selectBestRationale(responses: ModelResponse[]): string {
  if (responses.length === 0) return ''
  
  // Score each rationale
  const scoredRationales = responses.map(response => {
    const rationale = response.response.rationale || ''
    let score = response.confidence * (MODEL_CONFIGS[response.model as keyof typeof MODEL_CONFIGS]?.weight || 0.1)
    
    // Bonus for specific data
    if (/(\d+\.?\d*%?|\$\d+|\d{4})/.test(rationale)) score += 0.2
    if (/(AstraZeneca|Roche|Pfizer|Novartis|Johnson & Johnson|Merck|Bristol-Myers Squibb|Amgen|Gilead|Regeneron)/i.test(rationale)) score += 0.2
    if (/(HER2|EGFR|VEGF|PD-1|CTLA-4|ADC|CAR-T|Phase \d|FDA|EMA)/i.test(rationale)) score += 0.2
    if (rationale.length > 200) score += 0.1
    
    return { rationale, score }
  })
  
  // Return the highest scoring rationale
  const best = scoredRationales.reduce((best, current) => 
    current.score > best.score ? current : best
  )
  
  return best.rationale
}

// Extract alternative buyers from all responses
function extractAlternativeBuyers(responses: ModelResponse[]): string[] {
  const buyerCounts: Record<string, number> = {}
  
  responses.forEach(response => {
    const buyer = response.response.buyer
    if (buyer && buyer !== 'null' && buyer !== 'Unknown') {
      buyerCounts[buyer] = (buyerCounts[buyer] || 0) + 1
    }
    
    // Also check alternative_buyers field
    const alternatives = response.response.alternative_buyers || []
    alternatives.forEach((alt: string) => {
      if (alt && alt !== 'null' && alt !== 'Unknown') {
        buyerCounts[alt] = (buyerCounts[alt] || 0) + 0.5 // Lower weight for alternatives
      }
    })
  })
  
  // Return top 3 alternative buyers
  return Object.entries(buyerCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([buyer]) => buyer)
}

// Main ensemble function
export async function runEnsembleAnalysis(
  assetData: any,
  modelResponses: ModelResponse[]
): Promise<EnsembleResult> {
  if (modelResponses.length === 0) {
    throw new Error('No model responses provided for ensemble analysis')
  }
  
  // Generate consensus and final response
  const consensus = detectConsensus(modelResponses)
  const finalResponse = generateEnsembleResponse(modelResponses)
  const qualityMetrics = calculateQualityMetrics(modelResponses)
  
  // Calculate overall confidence
  const avgConfidence = modelResponses.reduce((sum, r) => sum + r.confidence, 0) / modelResponses.length
  const overallConfidence = (consensus.confidence + avgConfidence + qualityMetrics.consistency) / 3
  
  return {
    finalResponse,
    confidence: overallConfidence,
    agreement: consensus.confidence,
    modelResponses,
    consensus,
    qualityMetrics
  }
}

// Model response validation
export function validateModelResponse(response: any, model: string): {
  isValid: boolean
  confidence: number
  issues: string[]
} {
  const issues: string[] = []
  let confidence = 0.5
  
  // Check required fields
  if (!response.buyer || response.buyer === 'null' || response.buyer === 'Unknown') {
    issues.push('Missing or invalid buyer')
    confidence -= 0.3
  } else {
    confidence += 0.2
  }
  
  if (!response.rationale || response.rationale === 'null' || response.rationale.length < 50) {
    issues.push('Missing or insufficient rationale')
    confidence -= 0.2
  } else {
    confidence += 0.2
  }
  
  // Check for specific data
  const rationale = response.rationale || ''
  if (/(\d+\.?\d*%?|\$\d+|\d{4})/.test(rationale)) {
    confidence += 0.1
  } else {
    issues.push('Lacks specific data points')
  }
  
  if (/(AstraZeneca|Roche|Pfizer|Novartis|Johnson & Johnson|Merck|Bristol-Myers Squibb|Amgen|Gilead|Regeneron)/i.test(rationale)) {
    confidence += 0.1
  } else {
    issues.push('Lacks specific company mentions')
  }
  
  if (/(HER2|EGFR|VEGF|PD-1|CTLA-4|ADC|CAR-T|Phase \d|FDA|EMA)/i.test(rationale)) {
    confidence += 0.1
  } else {
    issues.push('Lacks technical terminology')
  }
  
  // Check confidence scores
  if (response.confidence_score && response.confidence_score > 0.7) {
    confidence += 0.1
  }
  
  if (response.strategic_fit_score && response.strategic_fit_score > 0.7) {
    confidence += 0.1
  }
  
  return {
    isValid: confidence > 0.3,
    confidence: Math.max(0, Math.min(1, confidence)),
    issues
  }
} 