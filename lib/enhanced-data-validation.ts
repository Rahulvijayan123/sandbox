// Enhanced data validation and enrichment system
export interface ValidationResult {
  isValid: boolean
  normalized: string
  confidence: number
  suggestions: string[]
  warnings: string[]
}

export interface EnrichmentData {
  therapeuticArea: ValidationResult
  indication: ValidationResult
  target: ValidationResult
  modality: ValidationResult
  assetStage: ValidationResult
  overallConfidence: number
}

// Comprehensive pharmaceutical terminology database
const PHARMA_TERMS = {
  therapeuticAreas: {
    'oncology': ['cancer', 'tumor', 'malignancy', 'neoplasm'],
    'immunology': ['immune', 'inflammatory', 'autoimmune', 'immunotherapy'],
    'neurology': ['brain', 'nervous', 'cognitive', 'alzheimer', 'parkinson', 'dementia'],
    'cardiovascular': ['heart', 'vascular', 'cardiac', 'hypertension', 'atherosclerosis'],
    'respiratory': ['lung', 'pulmonary', 'asthma', 'copd', 'bronchitis'],
    'metabolic': ['diabetes', 'obesity', 'metabolic syndrome', 'lipid'],
    'infectious diseases': ['infection', 'viral', 'bacterial', 'fungal', 'parasitic'],
    'rare diseases': ['orphan', 'rare', 'genetic', 'inherited'],
    'ophthalmology': ['eye', 'retinal', 'ocular', 'vision', 'blindness'],
    'dermatology': ['skin', 'dermatological', 'psoriasis', 'eczema']
  },
  
  indications: {
    'breast cancer': ['breast', 'mammary', 'her2', 'triple negative', 'hormone receptor'],
    'lung cancer': ['lung', 'pulmonary', 'nsclc', 'sclc', 'non-small cell', 'small cell'],
    'multiple myeloma': ['myeloma', 'plasma cell', 'b-cell', 'monoclonal gammopathy'],
    'alzheimer disease': ['alzheimer', 'dementia', 'cognitive', 'amyloid', 'tau'],
    'parkinson disease': ['parkinson', 'dopamine', 'tremor', 'levodopa'],
    'rheumatoid arthritis': ['rheumatoid', 'arthritis', 'inflammatory', 'joint', 'autoimmune'],
    'diabetes': ['diabetes', 'diabetic', 'insulin', 'glucose', 'metabolic'],
    'asthma': ['asthma', 'bronchial', 'respiratory', 'airway'],
    'psoriasis': ['psoriasis', 'psoriatic', 'skin', 'inflammatory'],
    'multiple sclerosis': ['multiple sclerosis', 'ms', 'demyelinating', 'autoimmune']
  },
  
  targets: {
    'HER2': ['ERBB2', 'her2', 'human epidermal growth factor receptor 2'],
    'EGFR': ['ERBB1', 'egfr', 'epidermal growth factor receptor'],
    'VEGF': ['VEGFA', 'vegf', 'vascular endothelial growth factor'],
    'PD-1': ['PDCD1', 'pd1', 'programmed cell death protein 1'],
    'CTLA-4': ['CTLA4', 'ctla4', 'cytotoxic t-lymphocyte antigen 4'],
    'CD20': ['MS4A1', 'cd20', 'b-lymphocyte antigen cd20'],
    'CD19': ['cd19', 'b-lymphocyte antigen cd19'],
    'BCMA': ['TNFRSF17', 'bcma', 'b-cell maturation antigen'],
    'PSMA': ['FOLH1', 'psma', 'prostate-specific membrane antigen'],
    'TROP2': ['TACSTD2', 'trop2', 'trophoblast cell surface antigen 2']
  },
  
  modalities: {
    'antibody-drug conjugate': ['adc', 'antibody drug conjugate', 'antibody-drug conjugate'],
    'monoclonal antibody': ['mab', 'monoclonal antibody', 'antibody'],
    'small molecule': ['small molecule', 'small molecules', 'oral', 'tablet'],
    'cell therapy': ['car-t', 'cart', 'cell therapy', 'cellular therapy'],
    'gene therapy': ['gene therapy', 'viral vector', 'adeno-associated virus', 'aav'],
    'vaccine': ['vaccine', 'vaccination', 'immunization'],
    'peptide': ['peptide', 'peptides', 'protein'],
    'rna therapy': ['rna', 'mrna', 'sirna', 'antisense'],
    'bispecific antibody': ['bispecific', 'bispecific antibody', 'dual-targeting'],
    'fusion protein': ['fusion protein', 'recombinant protein', 'protein fusion']
  },
  
  assetStages: {
    'preclinical': ['preclinical', 'pre-clinical', 'animal', 'in vivo', 'in vitro'],
    'phase 1': ['phase 1', 'phase i', 'phase one', 'safety'],
    'phase 2': ['phase 2', 'phase ii', 'phase two', 'efficacy'],
    'phase 3': ['phase 3', 'phase iii', 'phase three', 'pivotal'],
    'phase 4': ['phase 4', 'phase iv', 'phase four', 'post-marketing'],
    'filed': ['filed', 'submitted', 'nda', 'bla', 'maa'],
    'approved': ['approved', 'marketed', 'commercial', 'launched']
  }
}

// Enhanced validation functions
export function validateTherapeuticArea(input: string): ValidationResult {
  const normalized = input.toLowerCase().trim()
  const suggestions: string[] = []
  const warnings: string[] = []
  
  // Direct match
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.therapeuticAreas)) {
    if (standard === normalized || variants.includes(normalized)) {
      return {
        isValid: true,
        normalized: standard,
        confidence: 1.0,
        suggestions: [],
        warnings: []
      }
    }
  }
  
  // Fuzzy matching
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.therapeuticAreas)) {
    for (const variant of variants) {
      if (normalized.includes(variant) || variant.includes(normalized)) {
        suggestions.push(standard)
        break
      }
    }
  }
  
  // Check for common typos
  const commonTypos: Record<string, string> = {
    'oncolgy': 'oncology',
    'immunolgy': 'immunology',
    'neurolgy': 'neurology',
    'cardivascular': 'cardiovascular',
    'respirtory': 'respiratory',
    'metabolc': 'metabolic',
    'infectous': 'infectious',
    'opthalmology': 'ophthalmology',
    'dermatolgy': 'dermatology'
  }
  
  if (commonTypos[normalized]) {
    return {
      isValid: true,
      normalized: commonTypos[normalized],
      confidence: 0.9,
      suggestions: [],
      warnings: ['Corrected common typo']
    }
  }
  
  return {
    isValid: false,
    normalized: input,
    confidence: 0.0,
    suggestions: suggestions.slice(0, 3),
    warnings: ['Unknown therapeutic area']
  }
}

export function validateIndication(input: string): ValidationResult {
  const normalized = input.toLowerCase().trim()
  const suggestions: string[] = []
  const warnings: string[] = []
  
  // Direct match
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.indications)) {
    if (standard === normalized || variants.includes(normalized)) {
      return {
        isValid: true,
        normalized: standard,
        confidence: 1.0,
        suggestions: [],
        warnings: []
      }
    }
  }
  
  // Fuzzy matching
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.indications)) {
    for (const variant of variants) {
      if (normalized.includes(variant) || variant.includes(normalized)) {
        suggestions.push(standard)
        break
      }
    }
  }
  
  // Check for common typos
  const commonTypos: Record<string, string> = {
    'breast caner': 'breast cancer',
    'lung caner': 'lung cancer',
    'alzheimers': 'alzheimer disease',
    'parkinsons': 'parkinson disease',
    'rheumatiod': 'rheumatoid arthritis',
    'diabetis': 'diabetes',
    'asthma': 'asthma',
    'psorasis': 'psoriasis',
    'multiple sclorosis': 'multiple sclerosis'
  }
  
  if (commonTypos[normalized]) {
    return {
      isValid: true,
      normalized: commonTypos[normalized],
      confidence: 0.9,
      suggestions: [],
      warnings: ['Corrected common typo']
    }
  }
  
  return {
    isValid: false,
    normalized: input,
    confidence: 0.0,
    suggestions: suggestions.slice(0, 3),
    warnings: ['Unknown indication']
  }
}

export function validateTarget(input: string): ValidationResult {
  const normalized = input.toUpperCase().trim()
  const suggestions: string[] = []
  const warnings: string[] = []
  
  // Direct match
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.targets)) {
    if (standard === normalized || variants.includes(normalized)) {
      return {
        isValid: true,
        normalized: standard,
        confidence: 1.0,
        suggestions: [],
        warnings: []
      }
    }
  }
  
  // Fuzzy matching
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.targets)) {
    for (const variant of variants) {
      if (normalized.includes(variant) || variant.includes(normalized)) {
        suggestions.push(standard)
        break
      }
    }
  }
  
  return {
    isValid: suggestions.length > 0,
    normalized: suggestions.length > 0 ? suggestions[0] : input,
    confidence: suggestions.length > 0 ? 0.8 : 0.0,
    suggestions: suggestions.slice(0, 3),
    warnings: suggestions.length === 0 ? ['Unknown target'] : []
  }
}

export function validateModality(input: string): ValidationResult {
  const normalized = input.toLowerCase().trim()
  const suggestions: string[] = []
  const warnings: string[] = []
  
  // Direct match
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.modalities)) {
    if (standard === normalized || variants.includes(normalized)) {
      return {
        isValid: true,
        normalized: standard,
        confidence: 1.0,
        suggestions: [],
        warnings: []
      }
    }
  }
  
  // Fuzzy matching
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.modalities)) {
    for (const variant of variants) {
      if (normalized.includes(variant) || variant.includes(normalized)) {
        suggestions.push(standard)
        break
      }
    }
  }
  
  return {
    isValid: suggestions.length > 0,
    normalized: suggestions.length > 0 ? suggestions[0] : input,
    confidence: suggestions.length > 0 ? 0.8 : 0.0,
    suggestions: suggestions.slice(0, 3),
    warnings: suggestions.length === 0 ? ['Unknown modality'] : []
  }
}

export function validateAssetStage(input: string): ValidationResult {
  const normalized = input.toLowerCase().trim()
  const suggestions: string[] = []
  const warnings: string[] = []
  
  // Direct match
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.assetStages)) {
    if (standard === normalized || variants.includes(normalized)) {
      return {
        isValid: true,
        normalized: standard,
        confidence: 1.0,
        suggestions: [],
        warnings: []
      }
    }
  }
  
  // Fuzzy matching
  for (const [standard, variants] of Object.entries(PHARMA_TERMS.assetStages)) {
    for (const variant of variants) {
      if (normalized.includes(variant) || variant.includes(normalized)) {
        suggestions.push(standard)
        break
      }
    }
  }
  
  return {
    isValid: suggestions.length > 0,
    normalized: suggestions.length > 0 ? suggestions[0] : input,
    confidence: suggestions.length > 0 ? 0.8 : 0.0,
    suggestions: suggestions.slice(0, 3),
    warnings: suggestions.length === 0 ? ['Unknown asset stage'] : []
  }
}

// Main enrichment function
export function enrichAssetData(input: {
  therapeuticArea: string
  indication: string
  target: string
  modality: string
  assetStage: string
}): EnrichmentData {
  const therapeuticArea = validateTherapeuticArea(input.therapeuticArea)
  const indication = validateIndication(input.indication)
  const target = validateTarget(input.target)
  const modality = validateModality(input.modality)
  const assetStage = validateAssetStage(input.assetStage)
  
  // Calculate overall confidence
  const confidences = [
    therapeuticArea.confidence,
    indication.confidence,
    target.confidence,
    modality.confidence,
    assetStage.confidence
  ]
  
  const overallConfidence = confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length
  
  return {
    therapeuticArea,
    indication,
    target,
    modality,
    assetStage,
    overallConfidence
  }
}

// Quality scoring function
export function calculateDataQualityScore(enrichment: EnrichmentData): number {
  const weights = {
    therapeuticArea: 0.25,
    indication: 0.25,
    target: 0.2,
    modality: 0.15,
    assetStage: 0.15
  }
  
  return (
    enrichment.therapeuticArea.confidence * weights.therapeuticArea +
    enrichment.indication.confidence * weights.indication +
    enrichment.target.confidence * weights.target +
    enrichment.modality.confidence * weights.modality +
    enrichment.assetStage.confidence * weights.assetStage
  )
} 