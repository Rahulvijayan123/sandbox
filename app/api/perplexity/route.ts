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
  alternative_buyers: z.array(z.string()).optional(),
  revenue_performance: z.object({
    recent_revenue: z.string().optional(),
    growth_trends: z.string().optional(),
    market_position: z.string().optional()
  }).optional(),
  scientific_capabilities: z.object({
    research_infrastructure: z.string().optional(),
    key_metrics: z.object({
      patents_filed: z.string().optional(),
      active_trials: z.string().optional(),
      fda_approvals: z.string().optional(),
      publications: z.string().optional()
    }).optional(),
    technology_platforms: z.string().optional()
  }).optional(),
  deal_activity: z.object({
    recent_deals: z.string().optional(),
    partnerships: z.string().optional(),
    investment_focus: z.string().optional()
  }).optional(),
  regulatory_status: z.object({
    clinical_phase: z.string().optional(),
    fda_submissions: z.string().optional(),
    ema_submissions: z.string().optional(),
    designations: z.string().optional(),
    milestones: z.string().optional()
  }).optional(),
  supply_chain_risk: z.object({
    geopolitical_exposure: z.string().optional(),
    api_dependencies: z.string().optional(),
    cmo_risks: z.string().optional(),
    historical_disruptions: z.string().optional()
  }).optional(),
  market_analysis: z.object({
    current_tam: z.string().optional(),
    projected_tam: z.string().optional(),
    cagr: z.string().optional(),
    geographic_breakdown: z.string().optional()
  }).optional()
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
    
    const enhancedPrompt = `You are a senior business development expert in pharmaceutical M&A with deep knowledge of company pipelines, strategic priorities, and deal-making patterns. Conduct comprehensive research to provide evidence-based analysis.

ASSET DETAILS:
- Therapeutic Area: ${enrichedData.therapeuticArea}
- Indication: ${enrichedData.indication}
- Target: ${enrichedData.target}
- Modality: ${enrichedData.modality}
- Asset Stage: ${enrichedData.assetStage}

TOP POTENTIAL BUYERS:
${buyerContext}

TASK: Analyze this asset and provide comprehensive insights including:

1. Strategic buyer recommendation with detailed rationale
2. Revenue performance analysis for the recommended buyer
3. Scientific capabilities and research infrastructure
4. Recent deal activity and M&A track record
5. Pipeline alignment and synergy opportunities
6. Regulatory status and milestones (FDA/EMA submissions, designations, clinical phase transitions)
7. Supply chain risk and disruption profile (geopolitical exposure, API dependencies, CMO risks)
8. Current and projected TAM (market sizing, CAGR, geographic breakdown)

RESPONSE FORMAT (strict JSON):
{
  "buyer": "Company Name",
  "rationale": "Detailed strategic rationale with evidence",
  "confidence_score": 0.8,
  "strategic_fit_score": 0.8,
  "alternative_buyers": ["Company1", "Company2"],
  "revenue_performance": {
    "recent_revenue": "Detailed revenue analysis with specific figures",
    "growth_trends": "Revenue growth trends and drivers",
    "market_position": "Market position and competitive analysis"
  },
  "scientific_capabilities": {
    "research_infrastructure": "Detailed research capabilities and facilities",
    "key_metrics": {
      "patents_filed": "Number with year",
      "active_trials": "Number with therapeutic areas",
      "fda_approvals": "Number with recent examples",
      "publications": "Number with impact factor"
    },
    "technology_platforms": "Key technology platforms and innovations"
  },
  "deal_activity": {
    "recent_deals": "Recent M&A activity with deal values",
    "partnerships": "Strategic partnerships and collaborations",
    "investment_focus": "Investment priorities and strategic direction"
  },
  "regulatory_status": {
    "clinical_phase": "Current clinical phase and timeline",
    "fda_submissions": "FDA submissions, designations, and interactions",
    "ema_submissions": "EMA submissions and regulatory status",
    "designations": "Orphan drug, fast track, breakthrough therapy designations",
    "milestones": "Key regulatory milestones and upcoming events"
  },
  "supply_chain_risk": {
    "geopolitical_exposure": "Geopolitical risks and regional dependencies",
    "api_dependencies": "API sourcing dependencies and suppliers",
    "cmo_risks": "Contract manufacturing organization risks",
    "historical_disruptions": "Past supply chain disruptions and lessons learned"
  },
  "market_analysis": {
    "current_tam": "Current total addressable market size with sources",
    "projected_tam": "Projected market size and growth forecasts",
    "cagr": "Compound annual growth rate with timeframe",
    "geographic_breakdown": "Market breakdown by geography and regions"
  }
}`

    const apiKey = process.env.PERPLEXITY_API_KEY
    if (!apiKey) {
      console.error('[API] Missing Perplexity API key.')
      return NextResponse.json({ error: 'Missing Perplexity API key.' }, { status: 500 })
    }

    // Optimized model selection and parameters for faster response
    const model = 'sonar-pro' // Using sonar-pro for faster response
    const isDeep = false // Disable deep research to avoid timeout
    
    const domainAllowlist = [
      "evaluatepharma.com",
      "clinicaltrials.gov",
      "fiercepharma.com",
      "biospace.com",
      "fda.gov",
      "ema.europa.eu",
      "statista.com",
      "iqvia.com",
      "biocentury.com",
      "pharmatimes.com"
    ]

    // Set up web search parameters
    const webSearchOptions = {
      search_context_size: "medium" // Reduced context size for speed
    }

    const requestBody = {
      model,
      messages: [
        { role: 'system', content: 'You are a business development expert in pharma M&A. Provide precise, evidence-based analysis.' },
        { role: 'user', content: enhancedPrompt },
      ],
      max_tokens: 2000, // Reduced token limit for faster response
      temperature: 0.1,
      reasoning_effort: "medium", // Reduced reasoning effort
      web_search_options: webSearchOptions,
      search_recency_filter: "year",
      search_domain_filter: domainAllowlist
    }

    // Enhanced LLM call with timeout protection
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 25000) // 25 second timeout
    
    let response
    try {
      response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      })
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('[API] Request timeout')
        return NextResponse.json({ error: 'Request timeout - please try again' }, { status: 408 })
      }
      throw error
    }
    
    clearTimeout(timeoutId)
    
    console.log('[API] Perplexity API response status:', response.status)
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API] Perplexity API error:', errorText)
      return NextResponse.json({ error: 'Perplexity API error: ' + errorText }, { status: 500 })
    }
    
    // Handle timeout errors
    if (response.status === 0) {
      console.error('[API] Request timeout')
      return NextResponse.json({ error: 'Request timeout - please try again' }, { status: 408 })
    }
    
    let data = await response.json()
    console.log('[API] Perplexity API response received')
    
    // Simplified retry logic for faster response
    const MIN_QUERIES = 10 // Reduced threshold
    if (data?.usage?.num_search_queries < MIN_QUERIES && isDeep) {
      console.log('[API] Skipping retry to avoid timeout - proceeding with current response')
    }
    
    // Log search metrics
    console.log('[API] Search metrics:', {
      numSearchQueries: data?.usage?.num_search_queries,
      searchContextSize: requestBody.web_search_options?.search_context_size,
      reasoningEffort: requestBody.reasoning_effort
    })
    
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