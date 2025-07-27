import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getTopBuyers, calculateBuyerScores, ENHANCED_PHARMA_DATABASE } from '@/lib/buyer-scoring'
import { verifyWithGPT4o, fallbackToGPT4o } from '@/lib/second-pass-verifier'

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
  buyer: z.string().nullable(),
  rationale: z.string().nullable(),
  confidence_score: z.number().min(0).max(1).nullable(),
  strategic_fit_score: z.number().min(0).max(1).nullable(),
  alternative_buyers: z.array(z.string()).nullable()
})

// Type definitions
type InputData = z.infer<typeof InputSchema>
type ResponseData = z.infer<typeof ResponseSchema>

// In-memory cache (in production, use Redis or similar)
const cache = new Map<string, { data: ResponseData; timestamp: number }>()
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

// Ontology mapping for target normalization
const TARGET_ONTOLOGY: Record<string, string> = {
  'her2': 'ERBB2',
  'her-2': 'ERBB2',
  'her2/neu': 'ERBB2',
  'egfr': 'EGFR',
  'vegf': 'VEGFA',
  'pd-1': 'PDCD1',
  'pd1': 'PDCD1',
  'pdl1': 'CD274',
  'pd-l1': 'CD274',
  'fcrn': 'FCGRT',
  'fcgrn': 'FCGRT',
  'il-17': 'IL17A',
  'il17': 'IL17A',
  'tnf-alpha': 'TNF',
  'tnfa': 'TNF',
  'jak': 'JAK1',
  'jak1': 'JAK1',
  'jak2': 'JAK2',
  'btk': 'BTK',
  'parp': 'PARP1',
  'parp1': 'PARP1',
  'cdk4/6': 'CDK4',
  'cdk4': 'CDK4',
  'cdk6': 'CDK6',
  'pi3k': 'PIK3CA',
  'mek': 'MAP2K1',
  'braf': 'BRAF',
  'kras': 'KRAS',
  'alk': 'ALK',
  'ros1': 'ROS1',
  'met': 'MET',
  'ret': 'RET',
  'ntrk': 'NTRK1',
  'bcl-2': 'BCL2',
  'bcl2': 'BCL2',
  'mcl-1': 'MCL1',
  'mcl1': 'MCL1',
  'bcl-xl': 'BCL2L1',
  'bclxl': 'BCL2L1'
}

// Indication validation and normalization
const VALID_INDICATIONS = new Set([
  'breast cancer', 'lung cancer', 'colorectal cancer', 'prostate cancer', 'ovarian cancer',
  'pancreatic cancer', 'gastric cancer', 'hepatocellular carcinoma', 'melanoma',
  'multiple myeloma', 'leukemia', 'lymphoma', 'non-hodgkin lymphoma', 'hodgkin lymphoma',
  'acute myeloid leukemia', 'chronic lymphocytic leukemia', 'acute lymphoblastic leukemia',
  'rheumatoid arthritis', 'psoriasis', 'psoriatic arthritis', 'ankylosing spondylitis',
  'inflammatory bowel disease', 'crohn disease', 'ulcerative colitis', 'multiple sclerosis',
  'alzheimer disease', 'parkinson disease', 'huntington disease', 'amyotrophic lateral sclerosis',
  'diabetes mellitus', 'type 1 diabetes', 'type 2 diabetes', 'obesity', 'nonalcoholic steatohepatitis',
  'cystic fibrosis', 'sickle cell disease', 'hemophilia', 'myasthenia gravis', 'systemic lupus erythematosus',
  'scleroderma', 'vasculitis', 'gout', 'osteoporosis', 'fibromyalgia', 'chronic pain',
  'migraine', 'epilepsy', 'schizophrenia', 'bipolar disorder', 'major depressive disorder',
  'anxiety disorders', 'autism spectrum disorder', 'attention deficit hyperactivity disorder',
  'hypertension', 'heart failure', 'coronary artery disease', 'atrial fibrillation',
  'chronic kidney disease', 'polycystic kidney disease', 'glomerulonephritis',
  'asthma', 'chronic obstructive pulmonary disease', 'pulmonary fibrosis', 'pulmonary hypertension'
])

// Using enhanced pharma database from buyer-scoring.ts

// Input enrichment functions
function normalizeTarget(target: string): string {
  const normalized = target.toLowerCase().trim()
  return TARGET_ONTOLOGY[normalized] || target
}

function validateIndication(indication: string): { isValid: boolean; normalized: string } {
  const normalized = indication.toLowerCase().trim()
  return {
    isValid: VALID_INDICATIONS.has(normalized),
    normalized: normalized
  }
}

function detectTypos(text: string): string[] {
  const typos: string[] = []
  const words = text.toLowerCase().split(/\s+/)
  
  // Simple typo detection (in production, use a proper spell checker)
  const commonTypos: Record<string, string> = {
    'cancer': 'cancer',
    'cancr': 'cancer',
    'oncology': 'oncology',
    'oncolgy': 'oncology',
    'immunology': 'immunology',
    'immunolgy': 'immunology',
    'cardiovascular': 'cardiovascular',
    'cardiovasular': 'cardiovascular',
    'neurology': 'neurology',
    'neurolgy': 'neurology'
  }
  
  words.forEach(word => {
    if (commonTypos[word] && commonTypos[word] !== word) {
      typos.push(`${word} -> ${commonTypos[word]}`)
    }
  })
  
  return typos
}

// Retrieval layer - use fine-grained scoring
function findTopBuyers(assetData: InputData): any[] {
  const buyerScores = calculateBuyerScores(assetData)
  return buyerScores.slice(0, 5).map(score => ({
    ...ENHANCED_PHARMA_DATABASE.find((company: any) => company.name === score.name),
    similarity_score: score.totalScore,
    score_breakdown: score.breakdown
  }))
}

// Cache management
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

// Strategic fit calculation now handled by buyer-scoring.ts

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
    
    // Detect typos
    const typos = detectTypos(validatedData.therapeuticArea + ' ' + validatedData.indication)
    if (typos.length > 0) {
      console.log('[API] Detected potential typos:', typos)
    }
    
         // Retrieval layer - find top buyers
     const topBuyers = findTopBuyers(enrichedData)
     const buyerScores = calculateBuyerScores(enrichedData)
     console.log('[API] Top buyers found:', topBuyers.map(b => ({ name: b.name, score: b.similarity_score })))
    
    // Enhanced prompt engineering
    const buyerContext = topBuyers.map(buyer => 
      `${buyer.name}: Focus areas: ${buyer.therapeutic_focus.join(', ')}, Pipeline gaps: ${buyer.pipeline_gaps.join(', ')}, Recent deals: ${buyer.recent_deals.join(', ')}, Cash: ${buyer.cash_position}, Deal tolerance: ${buyer.deal_size_tolerance}`
    ).join('\n')
    
    const enhancedPrompt = `You are a senior business development expert in pharmaceutical M&A with deep knowledge of company pipelines, strategic priorities, and deal-making patterns.

ASSET DETAILS:
- Therapeutic Area: ${enrichedData.therapeuticArea}
- Indication: ${enrichedData.indication}
- Target: ${enrichedData.target} (normalized from ${validatedData.target})
- Modality: ${enrichedData.modality}
- Asset Stage: ${enrichedData.assetStage}

TOP POTENTIAL BUYERS (ranked by strategic fit):
${buyerContext}

TASK: Analyze this asset and identify the best strategic buyer. Follow this process:
1. First, rank the top 3 buyers based on strategic fit, pipeline gaps, and deal-making history
2. Select the best buyer and provide a detailed rationale
3. Consider therapeutic area alignment, pipeline gaps, cash position, and recent deal themes

RESPONSE FORMAT (strict JSON):
{
  "buyer": "Company Name or null if no suitable buyer",
  "rationale": "Detailed strategic rationale or null",
  "confidence_score": 0.0-1.0 or null,
  "strategic_fit_score": 0.0-1.0 or null,
  "alternative_buyers": ["Company1", "Company2"] or null
}

If you cannot fill a field, return null. Be precise and evidence-based.`

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
        max_tokens: 1024, // Increased for more detailed reasoning
        temperature: 0.2, // Lower for consistency
        top_p: 0.8, // Controlled randomness
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      }),
    })
    
    console.log('[API] Perplexity API response status:', response.status)
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API] Perplexity API error:', errorText)
      return NextResponse.json({ error: 'Perplexity API error.' }, { status: 500 })
    }
    
    const data = await response.json()
    console.log('[API] Perplexity API response JSON:', data)
    
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
    
         // Second-pass verification with GPT-4o
     console.log('[API] Starting second-pass verification')
     const verificationContext = {
       assetData: enrichedData,
       llmResponse: {
         buyer: parsedResponse.buyer || 'Unknown',
         rationale: parsedResponse.rationale || 'No rationale provided',
         confidence_score: parsedResponse.confidence_score,
         strategic_fit_score: parsedResponse.strategic_fit_score,
         alternative_buyers: parsedResponse.alternative_buyers
       },
       evidence: {
         companyProfiles: topBuyers,
         topBuyers: topBuyers,
         strategicFitScores: buyerScores
       }
     }
     
     const verificationResult = await verifyWithGPT4o(verificationContext)
     console.log('[API] Verification result:', verificationResult)
     
     // If verification fails, fallback to GPT-4o
     if (!verificationResult.passed) {
       console.log('[API] Verification failed, falling back to GPT-4o')
       try {
         const fallbackResponse = await fallbackToGPT4o(enrichedData, {
           companyProfiles: topBuyers
         })
         parsedResponse = fallbackResponse
       } catch (fallbackError) {
         console.error('[API] Fallback to GPT-4o failed:', fallbackError)
         // Continue with original response if fallback fails
       }
     }
     
     // Deterministic buyer selection - override LLM choice with top scorer
     const deterministicTopBuyer = getTopBuyers(enrichedData, 1)[0]
     if (deterministicTopBuyer) {
       console.log('[API] Deterministic buyer selection:', deterministicTopBuyer.name)
       parsedResponse.buyer = deterministicTopBuyer.name
       parsedResponse.strategic_fit_score = deterministicTopBuyer.totalScore
       
       // Let LLM write rationale but use deterministic buyer
       if (!parsedResponse.rationale || parsedResponse.rationale.includes('null')) {
         parsedResponse.rationale = `Strategic fit analysis indicates ${deterministicTopBuyer.name} as the optimal buyer based on therapeutic alignment (${(deterministicTopBuyer.breakdown.therapeuticAlignment * 100).toFixed(1)}%), pipeline gap match (${(deterministicTopBuyer.breakdown.pipelineGap * 100).toFixed(1)}%), and deal size tolerance (${(deterministicTopBuyer.breakdown.dealSizeTolerance * 100).toFixed(1)}%).`
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
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
} 