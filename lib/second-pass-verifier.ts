// Second-pass verifier using GPT-4o to reduce hallucinations
export interface VerificationResult {
  passed: boolean
  confidence: number
  reasoning: string
  issues: string[]
}

export interface VerificationContext {
  assetData: {
    therapeuticArea: string
    indication: string
    target: string
    modality: string
    assetStage: string
  }
  llmResponse: {
    buyer: string
    rationale: string
    confidence_score: number | null
    strategic_fit_score: number | null
    alternative_buyers: string[] | null
  }
  evidence: {
    companyProfiles: any[]
    topBuyers: any[]
    strategicFitScores: any[]
  }
}

// Verification prompt for GPT-4o
function createVerificationPrompt(context: VerificationContext): string {
  return `You are a factual verification expert for pharmaceutical business development analysis. Your task is to verify if the provided analysis is factually accurate and well-supported by the evidence.

ASSET DETAILS:
- Therapeutic Area: ${context.assetData.therapeuticArea}
- Indication: ${context.assetData.indication}
- Target: ${context.assetData.target}
- Modality: ${context.assetData.modality}
- Asset Stage: ${context.assetData.assetStage}

LLM ANALYSIS:
- Recommended Buyer: ${context.llmResponse.buyer}
- Rationale: ${context.llmResponse.rationale}
- Confidence Score: ${context.llmResponse.confidence_score}
- Strategic Fit Score: ${context.llmResponse.strategic_fit_score}
- Alternative Buyers: ${context.llmResponse.alternative_buyers?.join(', ') || 'None'}

EVIDENCE BASE:
${context.evidence.companyProfiles.map(company => 
  `${company.name}: Focus areas: ${company.therapeutic_focus.join(', ')}, Pipeline gaps: ${company.pipeline_gaps.join(', ')}, Recent deals: ${company.recent_deals.join(', ')}, Cash: ${company.cash_position}, Deal tolerance: ${company.deal_size_tolerance}`
).join('\n')}

VERIFICATION CRITERIA:
1. Factual Accuracy: Are the claims about the recommended buyer's capabilities, focus areas, and recent activities accurate?
2. Logical Consistency: Does the rationale logically follow from the evidence provided?
3. Strategic Fit: Is the recommended buyer actually a good strategic fit based on the evidence?
4. Evidence Support: Are the key claims in the rationale supported by the provided evidence?
5. Completeness: Does the analysis consider relevant factors and alternatives?

VERIFICATION TASK:
Analyze the LLM response against the evidence and criteria above. Determine if the analysis is factually sound and well-supported.

RESPONSE FORMAT (strict JSON):
{
  "passed": true/false,
  "confidence": 0.0-1.0,
  "reasoning": "Detailed explanation of verification decision",
  "issues": ["Issue 1", "Issue 2"] or []
}

If the analysis has factual errors, logical inconsistencies, or lacks evidence support, mark as "failed". Only pass if the analysis is factually accurate and well-supported.`
}

// Call GPT-4o for verification
export async function verifyWithGPT4o(context: VerificationContext): Promise<VerificationResult> {
  const openaiApiKey = process.env.OPENAI_API_KEY
  if (!openaiApiKey) {
    console.error('[Verifier] Missing OpenAI API key')
    return {
      passed: false,
      confidence: 0.0,
      reasoning: 'Missing OpenAI API key for verification',
      issues: ['API key not configured']
    }
  }

  try {
    const prompt = createVerificationPrompt(context)
    
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
            content: 'You are a factual verification expert. Be strict and only pass analyses that are factually accurate and well-supported by evidence.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.1, // Very low temperature for consistency
        top_p: 0.9
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Verifier] OpenAI API error:', errorText)
      return {
        passed: false,
        confidence: 0.0,
        reasoning: 'OpenAI API error during verification',
        issues: ['API call failed']
      }
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return {
        passed: false,
        confidence: 0.0,
        reasoning: 'No response from verification model',
        issues: ['Empty response']
      }
    }

    // Parse the JSON response
    try {
      const match = content.match(/\{[\s\S]*\}/)
      const jsonStr = match ? match[0] : content
      const result = JSON.parse(jsonStr)

      return {
        passed: result.passed || false,
        confidence: result.confidence || 0.0,
        reasoning: result.reasoning || 'No reasoning provided',
        issues: result.issues || []
      }
    } catch (parseError) {
      console.error('[Verifier] Failed to parse verification response:', parseError)
      return {
        passed: false,
        confidence: 0.0,
        reasoning: 'Failed to parse verification response',
        issues: ['Response parsing failed']
      }
    }

  } catch (error) {
    console.error('[Verifier] Verification error:', error)
    return {
      passed: false,
      confidence: 0.0,
      reasoning: 'Verification process failed',
      issues: ['Network or processing error']
    }
  }
}

// Fallback to GPT-4o for second pass
export async function fallbackToGPT4o(
  assetData: any,
  evidence: any
): Promise<any> {
  const openaiApiKey = process.env.OPENAI_API_KEY
  if (!openaiApiKey) {
    throw new Error('Missing OpenAI API key for fallback')
  }

  const prompt = `You are a senior business development expert in pharmaceutical M&A. Analyze this asset and provide a strategic buyer recommendation.

ASSET DETAILS:
- Therapeutic Area: ${assetData.therapeuticArea}
- Indication: ${assetData.indication}
- Target: ${assetData.target}
- Modality: ${assetData.modality}
- Asset Stage: ${assetData.assetStage}

EVIDENCE:
${evidence.companyProfiles.map((company: any) => 
  `${company.name}: Focus areas: ${company.therapeutic_focus.join(', ')}, Pipeline gaps: ${company.pipeline_gaps.join(', ')}, Recent deals: ${company.recent_deals.join(', ')}, Cash: ${company.cash_position}, Deal tolerance: ${company.deal_size_tolerance}`
).join('\n')}

TASK: Provide a strategic buyer recommendation based on the evidence. Be factual and evidence-based.

RESPONSE FORMAT (strict JSON):
{
  "buyer": "Company Name",
  "rationale": "Detailed strategic rationale",
  "confidence_score": 0.0-1.0,
  "strategic_fit_score": 0.0-1.0,
  "alternative_buyers": ["Company1", "Company2"]
}`

  try {
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
            content: 'You are a business development expert. Provide precise, evidence-based analysis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0.2,
        top_p: 0.8
      }),
    })

    if (!response.ok) {
      throw new Error('OpenAI API call failed')
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('Empty response from OpenAI')
    }

    // Parse the JSON response
    const match = content.match(/\{[\s\S]*\}/)
    const jsonStr = match ? match[0] : content
    return JSON.parse(jsonStr)

  } catch (error) {
    console.error('[Fallback] GPT-4o fallback failed:', error)
    throw error
  }
} 