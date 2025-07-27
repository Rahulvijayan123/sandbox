import { NextRequest, NextResponse } from 'next/server'
import { HISTORIC_DEALS, calculateMetrics, type PerformanceMetrics } from '@/lib/backtest-data'
import { getTopBuyer } from '@/lib/buyer-scoring'

export async function POST(req: NextRequest) {
  console.log('[Backtest] Starting back-testing process')
  
  try {
    const body = await req.json()
    const { runFullTest = true, testCount = 5 } = body

    const testDeals = runFullTest ? HISTORIC_DEALS : HISTORIC_DEALS.slice(0, testCount)
    const predictions: string[] = []
    const actuals: string[] = []
    const results: any[] = []

    console.log(`[Backtest] Testing ${testDeals.length} historic deals`)

    for (const deal of testDeals) {
      try {
        // Use deterministic scoring to predict buyer
        const predictedBuyer = getTopBuyer(deal.asset)
        const actualBuyer = deal.actualBuyer

        predictions.push(predictedBuyer)
        actuals.push(actualBuyer)

        const isCorrect = predictedBuyer === actualBuyer

        results.push({
          dealId: deal.id,
          asset: deal.asset,
          predictedBuyer,
          actualBuyer,
          isCorrect,
          dealValue: deal.dealValue,
          dealDate: deal.dealDate,
          dealType: deal.dealType,
          source: deal.source
        })

        console.log(`[Backtest] Deal ${deal.id}: Predicted ${predictedBuyer}, Actual ${actualBuyer}, Correct: ${isCorrect}`)

      } catch (error) {
        console.error(`[Backtest] Error processing deal ${deal.id}:`, error)
        predictions.push('Unknown')
        actuals.push(deal.actualBuyer)
      }
    }

    // Calculate performance metrics
    const metrics: PerformanceMetrics = calculateMetrics(predictions, actuals)

    // Generate detailed analysis
    const analysis = {
      summary: {
        totalTests: metrics.totalTests,
        correctPredictions: metrics.correctPredictions,
        accuracy: metrics.accuracy,
        precision: metrics.precision,
        recall: metrics.recall,
        f1Score: metrics.f1Score
      },
      breakdown: {
        byTherapeuticArea: analyzeByTherapeuticArea(results),
        byAssetStage: analyzeByAssetStage(results),
        byModality: analyzeByModality(results),
        byDealValue: analyzeByDealValue(results)
      },
      topPerformers: {
        bestPredictions: results.filter(r => r.isCorrect).slice(0, 5),
        worstPredictions: results.filter(r => !r.isCorrect).slice(0, 5)
      },
      recommendations: generateRecommendations(metrics, results)
    }

    console.log('[Backtest] Completed with metrics:', metrics)

    return NextResponse.json({
      success: true,
      metrics,
      analysis,
      results
    })

  } catch (error) {
    console.error('[Backtest] Error:', error)
    return NextResponse.json({ 
      error: 'Back-testing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Analysis helper functions
function analyzeByTherapeuticArea(results: any[]) {
  const areas: Record<string, { correct: number; total: number; accuracy: number }> = {}
  
  results.forEach(result => {
    const area = result.asset.therapeuticArea
    if (!areas[area]) {
      areas[area] = { correct: 0, total: 0, accuracy: 0 }
    }
    areas[area].total++
    if (result.isCorrect) areas[area].correct++
  })

  // Calculate accuracy for each area
  Object.keys(areas).forEach(area => {
    areas[area].accuracy = areas[area].correct / areas[area].total
  })

  return areas
}

function analyzeByAssetStage(results: any[]) {
  const stages: Record<string, { correct: number; total: number; accuracy: number }> = {}
  
  results.forEach(result => {
    const stage = result.asset.assetStage
    if (!stages[stage]) {
      stages[stage] = { correct: 0, total: 0, accuracy: 0 }
    }
    stages[stage].total++
    if (result.isCorrect) stages[stage].correct++
  })

  // Calculate accuracy for each stage
  Object.keys(stages).forEach(stage => {
    stages[stage].accuracy = stages[stage].correct / stages[stage].total
  })

  return stages
}

function analyzeByModality(results: any[]) {
  const modalities: Record<string, { correct: number; total: number; accuracy: number }> = {}
  
  results.forEach(result => {
    const modality = result.asset.modality
    if (!modalities[modality]) {
      modalities[modality] = { correct: 0, total: 0, accuracy: 0 }
    }
    modalities[modality].total++
    if (result.isCorrect) modalities[modality].correct++
  })

  // Calculate accuracy for each modality
  Object.keys(modalities).forEach(modality => {
    modalities[modality].accuracy = modalities[modality].correct / modalities[modality].total
  })

  return modalities
}

function analyzeByDealValue(results: any[]) {
  const valueRanges = [
    { name: 'Small (<$1B)', min: 0, max: 1000000000 },
    { name: 'Medium ($1B-$5B)', min: 1000000000, max: 5000000000 },
    { name: 'Large ($5B-$10B)', min: 5000000000, max: 10000000000 },
    { name: 'Very Large (>$10B)', min: 10000000000, max: Infinity }
  ]

  const analysis: Record<string, { correct: number; total: number; accuracy: number }> = {}
  
  valueRanges.forEach(range => {
    analysis[range.name] = { correct: 0, total: 0, accuracy: 0 }
  })

  results.forEach(result => {
    const value = result.dealValue
    const range = valueRanges.find(r => value >= r.min && value < r.max)
    if (range) {
      analysis[range.name].total++
      if (result.isCorrect) analysis[range.name].correct++
    }
  })

  // Calculate accuracy for each range
  Object.keys(analysis).forEach(range => {
    if (analysis[range].total > 0) {
      analysis[range].accuracy = analysis[range].correct / analysis[range].total
    }
  })

  return analysis
}

function generateRecommendations(metrics: PerformanceMetrics, results: any[]): string[] {
  const recommendations: string[] = []

  // Overall performance recommendations
  if (metrics.accuracy < 0.6) {
    recommendations.push('Overall accuracy is below 60%. Consider retraining the scoring algorithm with more recent deal data.')
  }

  if (metrics.precision < 0.5) {
    recommendations.push('Low precision indicates many false positives. Review the scoring weights for therapeutic alignment and pipeline gaps.')
  }

  if (metrics.recall < 0.5) {
    recommendations.push('Low recall indicates many false negatives. Consider expanding the buyer database or adjusting deal size tolerance scoring.')
  }

  // Specific area recommendations
  const areaAnalysis = analyzeByTherapeuticArea(results)
  Object.entries(areaAnalysis).forEach(([area, stats]) => {
    if (stats.accuracy < 0.5 && stats.total >= 2) {
      recommendations.push(`Poor performance in ${area} (${(stats.accuracy * 100).toFixed(1)}% accuracy). Review scoring for this therapeutic area.`)
    }
  })

  // Stage-specific recommendations
  const stageAnalysis = analyzeByAssetStage(results)
  Object.entries(stageAnalysis).forEach(([stage, stats]) => {
    if (stats.accuracy < 0.5 && stats.total >= 2) {
      recommendations.push(`Poor performance for ${stage} assets (${(stats.accuracy * 100).toFixed(1)}% accuracy). Review deal size tolerance scoring.`)
    }
  })

  // Positive recommendations
  if (metrics.accuracy >= 0.8) {
    recommendations.push('Excellent overall performance! The scoring algorithm is working well across different asset types.')
  }

  return recommendations
} 