import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.log('[API] Received POST /api/perplexity')
  const body = await req.json()
  const { therapeuticArea, indication, target, modality, assetStage } = body
  console.log('[API] Request body:', body)
  const apiKey = process.env.PERPLEXITY_API_KEY

  if (!apiKey) {
    console.error('[API] Missing Perplexity API key.')
    return NextResponse.json({ error: 'Missing Perplexity API key.' }, { status: 500 })
  }

  // Compose a prompt for Perplexity
  const prompt = `Given the following asset details:\nTherapeutic Area: ${therapeuticArea}\nIndication: ${indication}\nTarget: ${target}\nModality: ${modality}\nAsset Stage: ${assetStage}\n\nWho is the best big pharma buyer for this asset and why? Respond in JSON with keys 'buyer' and 'rationale'.`
  console.log('[API] Prompt for Perplexity:', prompt)

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          { role: 'system', content: 'You are a business development expert in pharma M&A.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 512,
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
    // Try to extract JSON from Perplexity's response
    let buyer = '', rationale = ''
    try {
      const match = data.choices?.[0]?.message?.content?.match(/\{[\s\S]*\}/)
      if (match) {
        const parsed = JSON.parse(match[0])
        buyer = parsed.buyer
        rationale = parsed.rationale
        console.log('[API] Parsed JSON from match:', parsed)
      } else {
        // fallback: try to parse as JSON directly
        const parsed = JSON.parse(data.choices?.[0]?.message?.content)
        buyer = parsed.buyer
        rationale = parsed.rationale
        console.log('[API] Parsed JSON from direct:', parsed)
      }
    } catch (e) {
      console.error('[API] Could not parse Perplexity response:', e)
      return NextResponse.json({ error: 'Could not parse Perplexity response.' }, { status: 500 })
    }
    return NextResponse.json({ company: buyer, rationale })
  } catch (err) {
    console.error('[API] Server error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
} 