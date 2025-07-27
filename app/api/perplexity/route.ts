import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema for input validation
const InputSchema = z.object({
  therapeuticArea: z.string().min(1, "Therapeutic area is required"),
  indication: z.string().min(1, "Indication is required"),
  target: z.string().min(1, "Target is required"),
  modality: z.string().min(1, "Modality is required"),
  assetStage: z.string().min(1, "Asset stage is required")
})

// Schema for LLM response validation
const ResponseSchema = z.object({
  buyer: z.string().optional(),
  rationale: z.string().optional(),
  confidence_score: z.number().optional(),
  strategic_fit_score: z.number().optional(),
  alternative_buyers: z.array(z.string()).optional()
})

type InputData = z.infer<typeof InputSchema>
type ResponseData = z.infer<typeof ResponseSchema>

// Enhanced target normalization
function normalizeTarget(target: string): string {
  const targetMap: Record<string, string> = {
    'HER2': 'ERBB2',
    'EGFR': 'ERBB1',
    'VEGF': 'VEGFA',
    'PD-1': 'PDCD1',
    'CTLA-4': 'CTLA4',
    'PDL1': 'CD274',
    'BRAF': 'BRAF',
    'ALK': 'ALK',
    'ROS1': 'ROS1',
    'NTRK': 'NTRK1'
  }
  return targetMap[target.toUpperCase()] || target
}

// Valid indications for validation
const VALID_INDICATIONS = new Set([
  'breast cancer', 'lung cancer', 'prostate cancer', 'colorectal cancer', 'melanoma',
  'multiple myeloma', 'leukemia', 'lymphoma', 'ovarian cancer', 'pancreatic cancer',
  'gastric cancer', 'bladder cancer', 'kidney cancer', 'liver cancer', 'brain cancer',
  'alzheimer disease', 'parkinson disease', 'multiple sclerosis', 'amyotrophic lateral sclerosis',
  'huntington disease', 'spinal muscular atrophy', 'duchenne muscular dystrophy',
  'rheumatoid arthritis', 'psoriasis', 'inflammatory bowel disease', 'lupus',
  'diabetes', 'obesity', 'hypertension', 'heart failure', 'atherosclerosis',
  'hepatitis c', 'hiv', 'tuberculosis', 'malaria', 'covid-19',
  'hemophilia', 'sickle cell disease', 'cystic fibrosis', 'gaucher disease'
])

function validateIndication(indication: string): { isValid: boolean; normalized: string } {
  const normalized = indication.toLowerCase().trim()
  return {
    isValid: VALID_INDICATIONS.has(normalized),
    normalized
  }
}

// Enhanced pharma database with detailed scoring factors
const ENHANCED_PHARMA_DATABASE = [
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
    recent_deal_activity: 'high'
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
    recent_deal_activity: 'medium'
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
    recent_deal_activity: 'high'
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
    recent_deal_activity: 'high'
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
    recent_deal_activity: 'high'
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
    recent_deal_activity: 'medium'
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
    recent_deal_activity: 'medium'
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
    recent_deal_activity: 'medium'
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
    recent_deal_activity: 'high'
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
    recent_deal_activity: 'medium'
  }
]

// Fine-grained buyer scoring
function calculateBuyerScores(assetData: InputData): any[] {
  const scores: any[] = []

  for (const company of ENHANCED_PHARMA_DATABASE) {
    let totalScore = 0
    
    // Therapeutic alignment (25%)
    const therapeuticAlignment = company.therapeutic_focus.includes(assetData.therapeuticArea.toLowerCase()) ? 1.0 : 0.0
    totalScore += therapeuticAlignment * 0.25
    
    // Pipeline gap (20%)
    const pipelineGap = company.pipeline_gaps.some(gap => 
      assetData.indication.toLowerCase().includes(gap) || gap.includes(assetData.indication.toLowerCase())
    ) ? 1.0 : 0.0
    totalScore += pipelineGap * 0.20
    
    // Cash position (15%)
    const cashPosition = company.cash_position === 'very_strong' ? 1.0 : 
                        company.cash_position === 'strong' ? 0.8 : 0.5
    totalScore += cashPosition * 0.15
    
    // Deal size tolerance (10%)
    const dealSizeTolerance = company.deal_size_tolerance === 'very_high' ? 1.0 :
                             company.deal_size_tolerance === 'high' ? 0.8 : 0.5
    totalScore += dealSizeTolerance * 0.10
    
    // Geographic reach (10%)
    const geographicReach = company.geographic_reach === 'global' ? 1.0 : 0.6
    totalScore += geographicReach * 0.10
    
    // Recent deal activity (8%)
    const recentDealActivity = company.recent_deal_activity === 'high' ? 1.0 :
                              company.recent_deal_activity === 'medium' ? 0.7 : 0.4
    totalScore += recentDealActivity * 0.08
    
    // Regulatory expertise (6%)
    const regulatoryExpertise = company.regulatory_expertise === 'excellent' ? 1.0 :
                               company.regulatory_expertise === 'good' ? 0.8 : 0.5
    totalScore += regulatoryExpertise * 0.06
    
    // Commercial infrastructure (6%)
    const commercialInfrastructure = company.commercial_infrastructure === 'excellent' ? 1.0 :
                                   company.commercial_infrastructure === 'good' ? 0.8 : 0.5
    totalScore += commercialInfrastructure * 0.06

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

  return scores.sort((a, b) => b.totalScore - a.totalScore)
}

// Retrieval layer - find top buyers
function findTopBuyers(assetData: InputData): any[] {
  const buyerScores = calculateBuyerScores(assetData)
  return buyerScores.slice(0, 5).map(score => ({
    ...ENHANCED_PHARMA_DATABASE.find(company => company.name === score.name),
    similarity_score: score.totalScore,
    score_breakdown: score.breakdown
  }))
}

// Cache management
const cache = new Map()
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

function getCacheKey(data: InputData): string {
  const normalized = {
    therapeuticArea: data.therapeuticArea.toLowerCase().trim(),
    indication: data.indication.toLowerCase().trim(),
    target: normalizeTarget(data.target),
    modality: data.modality.toLowerCase().trim(),
    assetStage: data.assetStage.toLowerCase().trim()
  }
  return JSON.stringify(normalized)
}

function getCachedResponse(cacheKey: string): ResponseData | null {
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data
  }
  cache.delete(cacheKey)
  return null
}

function setCachedResponse(cacheKey: string, data: ResponseData): void {
  cache.set(cacheKey, { data, timestamp: Date.now() })
}

export async function POST(req: NextRequest) {
  console.log('[API] Received POST /api/perplexity')
  
  try {
    // Parse and validate input
    const body = await req.json()
    const validatedData = InputSchema.parse(body)
    console.log('[API] Validated request body:', validatedData)
    
    // Check cache first
    const cacheKey = getCacheKey(validatedData)
    const cachedResponse = getCachedResponse(cacheKey)
    if (cachedResponse) {
      console.log('[API] Returning cached response')
      return NextResponse.json(cachedResponse)
    }
    
    // Input enrichment
    const enrichedData = {
      ...validatedData,
      target: normalizeTarget(validatedData.target)
    }
    
    // Validate indication
    const indicationValidation = validateIndication(validatedData.indication)
    if (!indicationValidation.isValid) {
      return NextResponse.json({ 
        error: 'Invalid indication. Please provide a valid therapeutic indication.',
        suggestions: Array.from(VALID_INDICATIONS).slice(0, 10)
      }, { status: 400 })
    }
    
    // Retrieval layer - find top buyers
    const topBuyers = findTopBuyers(enrichedData)
    console.log('[API] Top buyers found:', topBuyers.map(b => ({ name: b.name, score: b.similarity_score })))
    
    // Enhanced prompt engineering
    const buyerContext = topBuyers.map(buyer => {
      const focus = buyer.therapeutic_focus?.join(', ') || 'Unknown'
      const gaps = buyer.pipeline_gaps?.join(', ') || 'Unknown'
      const deals = buyer.recent_deals?.join(', ') || 'Unknown'
      const cash = buyer.cash_position || 'Unknown'
      const tolerance = buyer.deal_size_tolerance || 'Unknown'
      
      return `${buyer.name}: Focus areas: ${focus}, Pipeline gaps: ${gaps}, Recent deals: ${deals}, Cash: ${cash}, Deal tolerance: ${tolerance}`
    }).join('\n')
    
    const enhancedPrompt = `You are a senior business development expert in pharmaceutical M&A. Analyze this asset and recommend a buyer.

ASSET DETAILS:
- Therapeutic Area: ${enrichedData.therapeuticArea}
- Indication: ${enrichedData.indication}
- Target: ${enrichedData.target}
- Modality: ${enrichedData.modality}
- Asset Stage: ${enrichedData.assetStage}

TOP POTENTIAL BUYERS:
${buyerContext}

TASK: Select the best strategic buyer from the list above and provide a rationale.

RESPONSE FORMAT (strict JSON):
{
  "buyer": "Company Name",
  "rationale": "Strategic rationale",
  "confidence_score": 0.8,
  "strategic_fit_score": 0.8,
  "alternative_buyers": ["Company1", "Company2"]
}`

    const apiKey = process.env.PERPLEXITY_API_KEY
    if (!apiKey) {
      console.error('[API] Missing Perplexity API key.')
      return NextResponse.json({ error: 'Missing Perplexity API key.' }, { status: 500 })
    }

    // Enhanced LLM call with better parameters
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          { role: 'system', content: 'You are a business development expert in pharma M&A. Provide precise, evidence-based analysis.' },
          { role: 'user', content: enhancedPrompt },
        ],
        max_tokens: 1024,
        temperature: 0.2,
        top_p: 0.8
      }),
    })
    
    console.log('[API] Perplexity API response status:', response.status)
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API] Perplexity API error:', errorText)
      return NextResponse.json({ error: 'Perplexity API error: ' + errorText }, { status: 500 })
    }
    
    const data = await response.json()
    console.log('[API] Perplexity API response received')
    
    // Enhanced response parsing with Zod validation
    let parsedResponse: ResponseData
    try {
      const content = data.choices?.[0]?.message?.content
      const match = content?.match(/\{[\s\S]*\}/)
      const jsonStr = match ? match[0] : content
      const parsed = JSON.parse(jsonStr)
      
      // Validate with Zod schema
      parsedResponse = ResponseSchema.parse(parsed)
      console.log('[API] Validated response:', parsedResponse)
      
    } catch (e) {
      console.error('[API] Could not parse or validate Perplexity response:', e)
      return NextResponse.json({ error: 'Could not parse Perplexity response.' }, { status: 500 })
    }
    
    // Deterministic buyer selection - override LLM choice with top scorer
    const deterministicTopBuyer = topBuyers[0]
    if (deterministicTopBuyer && (!parsedResponse.buyer || parsedResponse.buyer === 'null')) {
      console.log('[API] Using deterministic buyer selection:', deterministicTopBuyer.name)
      parsedResponse.buyer = deterministicTopBuyer.name
      parsedResponse.strategic_fit_score = deterministicTopBuyer.similarity_score
      
      if (!parsedResponse.rationale || parsedResponse.rationale === 'null') {
        parsedResponse.rationale = `Strategic fit analysis indicates ${deterministicTopBuyer.name} as the optimal buyer based on therapeutic alignment and pipeline gaps.`
      }
    }
    
    // Cache the response
    setCachedResponse(cacheKey, parsedResponse)
    
    return NextResponse.json(parsedResponse)
    
  } catch (err) {
    console.error('[API] Server error:', err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid input data', 
        details: err.errors 
      }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error: ' + (err instanceof Error ? err.message : 'Unknown error') }, { status: 500 })
  }
} 