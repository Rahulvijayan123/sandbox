// Enhanced OpenAI validator acting as domain expert
import { validateEnhancedResponse, UnblurredSection } from './enhanced-prompt-engine'

export interface DomainExpertValidation {
  isValid: boolean
  confidence: number
  issues: string[]
  recommendations: string[]
  expertType: 'regulatory_affairs' | 'biotech_strategy' | 'financial_analyst' | 'manufacturing_expert'
}

export interface ValidationContext {
  assetData: any
  response: any
  unblurredSections: any[]
  validationConfig: any
}

// Domain expert validation prompts
const DOMAIN_EXPERT_PROMPTS = {
  regulatory_affairs: `You are a senior regulatory affairs analyst with 20+ years of experience in FDA and EMA submissions. You have deep expertise in regulatory designations, approval pathways, and compliance requirements.

VALIDATION TASK:
Review the regulatory status and milestones section for accuracy, completeness, and compliance with current regulatory guidance.

VALIDATION CRITERIA:
1. **Legal Accuracy**: Verify all legal citations and regulatory criteria
2. **Designation Eligibility**: Check if likelihood ratings align with actual criteria
3. **Current Guidance**: Ensure alignment with latest FDA/EMA guidance
4. **Completeness**: Verify all required designations are addressed
5. **Rationale Quality**: Assess if rationales are specific and evidence-based

REQUIRED OUTPUT:
{
  "isValid": true/false,
  "confidence": 0.0-1.0,
  "issues": ["Specific issue 1", "Specific issue 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "expertType": "regulatory_affairs"
}`,

  biotech_strategy: `You are a PhD-level biotech strategist with 25+ years of experience in pharmaceutical business development, M&A, and strategic partnerships. You have deep expertise in deal structures, market analysis, and strategic fit assessment.

VALIDATION TASK:
Review the deal activity and strategic synergy sections for strategic logic, market analysis accuracy, and deal relevance.

VALIDATION CRITERIA:
1. **Deal Relevance**: Verify deal alignment with asset characteristics
2. **Strategic Logic**: Check if strategic rationale is sound
3. **Market Analysis**: Validate TAM calculations and assumptions
4. **Deal Structure**: Assess if deal structures are realistic
5. **Source Quality**: Verify source credibility and recency

REQUIRED OUTPUT:
{
  "isValid": true/false,
  "confidence": 0.0-1.0,
  "issues": ["Specific issue 1", "Specific issue 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "expertType": "biotech_strategy"
}`,

  financial_analyst: `You are a senior financial analyst specializing in pharmaceutical valuations with 15+ years of experience in biotech M&A, financial modeling, and market analysis. You have deep expertise in TAM analysis, deal valuations, and financial projections.

VALIDATION TASK:
Review the TAM analysis and financial projections for mathematical accuracy, defensible assumptions, and realistic projections.

VALIDATION CRITERIA:
1. **Mathematical Accuracy**: Verify all calculations are correct
2. **Assumption Defensibility**: Check if growth rates and assumptions are realistic
3. **Market Synchronization**: Ensure peak patients and revenue are aligned
4. **Source Verification**: Validate data sources and methodology
5. **Projection Realism**: Assess if projections are achievable

REQUIRED OUTPUT:
{
  "isValid": true/false,
  "confidence": 0.0-1.0,
  "issues": ["Specific issue 1", "Specific issue 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "expertType": "financial_analyst"
}`,

  manufacturing_expert: `You are a manufacturing and supply chain expert with 20+ years of experience in pharmaceutical manufacturing, CDMO operations, and supply chain risk management. You have deep expertise in biologics, cell therapy, and complex manufacturing processes.

VALIDATION TASK:
Review the supply chain risk analysis for accuracy, completeness, and relevance to the specific asset modality and characteristics.

VALIDATION CRITERIA:
1. **Risk Relevance**: Verify risks are specific to asset modality
2. **Historical Accuracy**: Check if historical analogs are accurate
3. **Risk Assessment**: Validate risk level assignments
4. **Completeness**: Ensure all relevant risk categories are covered
5. **Mitigation Strategies**: Assess if risk mitigation is addressed

REQUIRED OUTPUT:
{
  "isValid": true/false,
  "confidence": 0.0-1.0,
  "issues": ["Specific issue 1", "Specific issue 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "expertType": "manufacturing_expert"
}`
}

// Enhanced OpenAI validator with domain expert validation
export async function validateWithDomainExpert(
  context: ValidationContext,
  expertType: 'regulatory_affairs' | 'biotech_strategy' | 'financial_analyst' | 'manufacturing_expert'
): Promise<DomainExpertValidation> {
  const openaiApiKey = process.env.OPENAI_API_KEY
  if (!openaiApiKey) {
    return {
      isValid: false,
      confidence: 0.0,
      issues: ['Missing OpenAI API key'],
      recommendations: ['Configure OpenAI API key'],
      expertType
    }
  }

  try {
    const prompt = DOMAIN_EXPERT_PROMPTS[expertType]
    
    // Prepare validation data
    const validationData = {
      assetData: context.assetData,
      response: context.response,
      unblurredSections: context.unblurredSections,
      validationConfig: context.validationConfig
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a domain expert validator. Be extremely strict and only validate analyses that meet expert-level standards. Return responses in strict JSON format.'
          },
          {
            role: 'user',
            content: `${prompt}\n\nVALIDATION DATA:\n${JSON.stringify(validationData, null, 2)}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.1, // Very low temperature for consistency
        top_p: 0.9
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Domain Expert] OpenAI API error:', errorText)
      return {
        isValid: false,
        confidence: 0.0,
        issues: ['OpenAI API error during validation'],
        recommendations: ['Check API configuration'],
        expertType
      }
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return {
        isValid: false,
        confidence: 0.0,
        issues: ['No response from domain expert'],
        recommendations: ['Retry validation'],
        expertType
      }
    }

    // Parse the JSON response
    try {
      const match = content.match(/\{[\s\S]*\}/)
      const jsonStr = match ? match[0] : content
      const result = JSON.parse(jsonStr)

      return {
        isValid: result.isValid || false,
        confidence: result.confidence || 0.0,
        issues: result.issues || [],
        recommendations: result.recommendations || [],
        expertType
      }
    } catch (parseError) {
      console.error('[Domain Expert] Failed to parse validation response:', parseError)
      return {
        isValid: false,
        confidence: 0.0,
        issues: ['Failed to parse validation response'],
        recommendations: ['Check response format'],
        expertType
      }
    }

  } catch (error) {
    console.error('[Domain Expert] Validation error:', error)
    return {
      isValid: false,
      confidence: 0.0,
      issues: ['Validation process failed'],
      recommendations: ['Check network connectivity'],
      expertType
    }
  }
}

// Multi-expert validation system
export async function validateWithMultipleExperts(
  context: ValidationContext
): Promise<{
  overallValidation: DomainExpertValidation
  expertValidations: DomainExpertValidation[]
}> {
  const expertTypes: Array<'regulatory_affairs' | 'biotech_strategy' | 'financial_analyst' | 'manufacturing_expert'> = [
    'regulatory_affairs',
    'biotech_strategy', 
    'financial_analyst',
    'manufacturing_expert'
  ]

  const expertValidations: DomainExpertValidation[] = []

  // Run validations in parallel
  const validationPromises = expertTypes.map(expertType => 
    validateWithDomainExpert(context, expertType)
  )

  const results = await Promise.all(validationPromises)
  expertValidations.push(...results)

  // Calculate overall validation
  const validCount = expertValidations.filter(v => v.isValid).length
  const totalConfidence = expertValidations.reduce((sum, v) => sum + v.confidence, 0)
  const averageConfidence = expertValidations.length > 0 ? totalConfidence / expertValidations.length : 0

  const allIssues = expertValidations.flatMap(v => v.issues)
  const allRecommendations = expertValidations.flatMap(v => v.recommendations)

  const overallValidation: DomainExpertValidation = {
    isValid: validCount >= 3 && averageConfidence >= 0.7, // Require 3+ experts to validate
    confidence: averageConfidence,
    issues: allIssues,
    recommendations: allRecommendations,
    expertType: 'biotech_strategy' // Default type for overall
  }

  return {
    overallValidation,
    expertValidations
  }
}

// Specialized validation for specific sections
export async function validateRegulatorySection(
  regulatoryData: any,
  assetData: any
): Promise<DomainExpertValidation> {
  const context: ValidationContext = {
    assetData,
    response: { development_readiness: { regulatory_status: regulatoryData } },
    unblurredSections: [{
      category: 'Development Readiness',
      section: 'Regulatory Status & Milestones',
      data: regulatoryData
    }],
    validationConfig: { confidenceThreshold: 0.8 }
  }

  return await validateWithDomainExpert(context, 'regulatory_affairs')
}

export async function validateDealSection(
  dealData: any,
  assetData: any
): Promise<DomainExpertValidation> {
  const context: ValidationContext = {
    assetData,
    response: { executive_overview: { deal_activity: dealData } },
    unblurredSections: [{
      category: 'Executive Overview',
      section: 'Deal Activity',
      data: dealData
    }],
    validationConfig: { confidenceThreshold: 0.8 }
  }

  return await validateWithDomainExpert(context, 'biotech_strategy')
}

export async function validateTAMSection(
  tamData: any,
  assetData: any
): Promise<DomainExpertValidation> {
  const context: ValidationContext = {
    assetData,
    response: { strategic_synergy: { tam_analysis: tamData } },
    unblurredSections: [{
      category: 'Strategic Synergy',
      section: 'Current & Projected TAM',
      data: tamData
    }],
    validationConfig: { confidenceThreshold: 0.8 }
  }

  return await validateWithDomainExpert(context, 'financial_analyst')
}

export async function validateSupplyChainSection(
  supplyChainData: any,
  assetData: any
): Promise<DomainExpertValidation> {
  const context: ValidationContext = {
    assetData,
    response: { operational_readiness: { supply_chain_risk: supplyChainData } },
    unblurredSections: [{
      category: 'Operational Readiness',
      section: 'Supply Chain Risk & Disruption Profile',
      data: supplyChainData
    }],
    validationConfig: { confidenceThreshold: 0.8 }
  }

  return await validateWithDomainExpert(context, 'manufacturing_expert')
}

// Enhanced response processor with domain expert validation
export async function processEnhancedResponse(
  response: any,
  assetData: any,
  config: any
): Promise<{
  processedResponse: any
  validationResults: any
  confidence: number
  issues: string[]
}> {
  // First, validate the enhanced response structure
  const enhancedValidation = validateEnhancedResponse(response, config)
  
  if (!enhancedValidation.isValid) {
    return {
      processedResponse: response,
      validationResults: enhancedValidation,
      confidence: enhancedValidation.confidence,
      issues: enhancedValidation.issues
    }
  }

  // Then, validate with domain experts
  const context: ValidationContext = {
    assetData,
    response,
    unblurredSections: enhancedValidation.unblurredSections,
    validationConfig: config
  }

  const expertValidation = await validateWithMultipleExperts(context)

  // Process response based on validation results
  const processedResponse = { ...response }
  
  // Mark sections as validated or insufficient data
  enhancedValidation.unblurredSections.forEach(section => {
    const expertValidationForSection = expertValidation.expertValidations.find(
      ev => ev.expertType === getExpertTypeForSection(section.section)
    )
    
    if (expertValidationForSection && !expertValidationForSection.isValid) {
      // Mark section as insufficient data
      markSectionAsInsufficient(processedResponse, section)
    }
  })

  const overallConfidence = (enhancedValidation.confidence + expertValidation.overallValidation.confidence) / 2
  const allIssues = [...enhancedValidation.issues, ...expertValidation.overallValidation.issues]

  return {
    processedResponse,
    validationResults: {
      enhancedValidation,
      expertValidation
    },
    confidence: overallConfidence,
    issues: allIssues
  }
}

// Helper functions
function getExpertTypeForSection(section: string): 'regulatory_affairs' | 'biotech_strategy' | 'financial_analyst' | 'manufacturing_expert' {
  switch (section) {
    case 'Regulatory Status & Milestones':
      return 'regulatory_affairs'
    case 'Deal Activity':
      return 'biotech_strategy'
    case 'Current & Projected TAM':
      return 'financial_analyst'
    case 'Supply Chain Risk & Disruption Profile':
      return 'manufacturing_expert'
    default:
      return 'biotech_strategy'
  }
}

function markSectionAsInsufficient(response: any, section: any): void {
  switch (section.section) {
    case 'Deal Activity':
      if (response.executive_overview?.deal_activity) {
        response.executive_overview.deal_activity = 'Insufficient Data'
      }
      break
    case 'Regulatory Status & Milestones':
      if (response.development_readiness?.regulatory_status) {
        response.development_readiness.regulatory_status = 'Insufficient Data'
      }
      break
    case 'Supply Chain Risk & Disruption Profile':
      if (response.operational_readiness?.supply_chain_risk) {
        response.operational_readiness.supply_chain_risk = 'Insufficient Data'
      }
      break
    case 'Current & Projected TAM':
      if (response.strategic_synergy?.tam_analysis) {
        response.strategic_synergy.tam_analysis = 'Insufficient Data'
      }
      break
  }
} 