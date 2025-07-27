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

// Expert-level verification prompt for pharmaceutical business development analysis
function createVerificationPrompt(context: VerificationContext): string {
  return `You are a senior pharmaceutical business development executive with 25+ years of experience conducting rigorous verification of strategic analyses. You hold MD, PhD, and MBA degrees and have led major M&A transactions and strategic partnerships. Your verification must meet the highest standards of pharmaceutical industry expertise.

ASSET DETAILS:
- Therapeutic Area: ${context.assetData.therapeuticArea}
- Indication: ${context.assetData.indication}
- Target: ${context.assetData.target}
- Modality: ${context.assetData.modality}
- Asset Stage: ${context.assetData.assetStage}

LLM ANALYSIS TO VERIFY:
- Recommended Buyer: ${context.llmResponse.buyer}
- Rationale: ${context.llmResponse.rationale}
- Confidence Score: ${context.llmResponse.confidence_score}
- Strategic Fit Score: ${context.llmResponse.strategic_fit_score}
- Alternative Buyers: ${context.llmResponse.alternative_buyers?.join(', ') || 'None'}

EVIDENCE BASE:
${context.evidence.companyProfiles.map(company => 
  `${company.name}: Focus areas: ${company.therapeutic_focus.join(', ')}, Pipeline gaps: ${company.pipeline_gaps.join(', ')}, Recent deals: ${company.recent_deals.join(', ')}, Cash: ${company.cash_position}, Deal tolerance: ${company.deal_size_tolerance}`
).join('\n')}

EXPERT VERIFICATION CRITERIA:

1. **Factual Accuracy & Evidence Quality**
   - Are all claims supported by specific, verifiable evidence?
   - Are data sources credible and current (within 2-3 years)?
   - Are figures, dates, and company names accurate?
   - Is there sufficient detail to validate claims?

2. **Strategic Depth & Sophistication**
   - Does the analysis demonstrate senior executive-level strategic thinking?
   - Are multiple dimensions considered (technical, commercial, operational, financial)?
   - Is the competitive landscape analysis comprehensive?
   - Are risk factors and mitigation strategies identified?

3. **Technical Precision & Expertise**
   - Are molecular targets, mechanisms of action, and clinical pathways accurately described?
   - Is regulatory knowledge demonstrated (FDA/EMA processes, designations, milestones)?
   - Are clinical trial data and pipeline information precise?
   - Is manufacturing and supply chain knowledge evident?

4. **Commercial Acumen & Market Understanding**
   - Is market analysis sophisticated and data-driven?
   - Are pricing, reimbursement, and commercial considerations addressed?
   - Is competitive positioning analysis comprehensive?
   - Are revenue projections and financial metrics realistic?

5. **Operational Insight & Practicality**
   - Are manufacturing, supply chain, and operational considerations addressed?
   - Is integration planning and synergy analysis realistic?
   - Are implementation challenges and timelines considered?
   - Is the analysis actionable for business development teams?

6. **Completeness & Comprehensiveness**
   - Are all critical areas covered (strategic, technical, commercial, operational, financial)?
   - Is the analysis thorough and exhaustive?
   - Are gaps or missing information identified?
   - Is the level of detail appropriate for senior executive decision-making?

VERIFICATION SCORING:
- **0.9-1.0**: Expert-level analysis with comprehensive evidence and strategic depth
- **0.8-0.89**: High-quality analysis with minor gaps or areas for improvement
- **0.7-0.79**: Good analysis with some missing elements or insufficient detail
- **0.6-0.69**: Adequate analysis with significant gaps or inaccuracies
- **Below 0.6**: Insufficient quality for senior executive decision-making

VERIFICATION TASK:
Analyze the LLM response against the evidence and criteria above. Be extremely strict - only pass analyses that meet expert-level standards for pharmaceutical business development.

RESPONSE FORMAT (strict JSON):
{
  "passed": true/false,
  "confidence": 0.0-1.0,
  "reasoning": "Detailed explanation of verification decision with specific issues identified",
  "issues": ["Specific issue 1", "Specific issue 2"] or [],
  "suggested_improvements": ["Improvement 1", "Improvement 2"] or []
}

If the analysis has ANY factual errors, logical inconsistencies, lacks evidence support, contains generic statements without specific data, or fails to meet expert-level standards, mark as "failed". Only pass if the analysis is factually accurate, evidence-based, strategically sound, and demonstrates senior executive-level expertise.`
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