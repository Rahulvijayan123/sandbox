// Debug script to understand scoring system issues
const debugScoring = () => {
  console.log('🔍 Debugging Buyer Scoring System...\n')

  // Test case from backtest data
  const testAsset = {
    therapeuticArea: "oncology",
    indication: "breast cancer",
    target: "HER2",
    modality: "antibody-drug conjugate",
    assetStage: "phase 2"
  }

  console.log('📋 Test Asset:', testAsset)

  // Import the scoring function
  const { calculateBuyerScores } = require('./lib/buyer-scoring.ts')

  try {
    const scores = calculateBuyerScores(testAsset)
    
    console.log('\n📊 All Buyer Scores:')
    scores.forEach((score, index) => {
      console.log(`${index + 1}. ${score.name}: ${score.totalScore.toFixed(3)}`)
      console.log(`   Breakdown:`, score.breakdown)
    })

    console.log('\n🎯 Top Prediction:', scores[0]?.name)
    console.log('✅ Expected (from backtest): AstraZeneca')

    // Check why Pfizer is scoring high
    const pfizerScore = scores.find(s => s.name === 'Pfizer')
    const astrazenecaScore = scores.find(s => s.name === 'AstraZeneca')
    
    if (pfizerScore && astrazenecaScore) {
      console.log('\n🔍 Pfizer vs AstraZeneca Analysis:')
      console.log('Pfizer Score:', pfizerScore.totalScore.toFixed(3))
      console.log('AstraZeneca Score:', astrazenecaScore.totalScore.toFixed(3))
      
      console.log('\nPfizer Breakdown:', pfizerScore.breakdown)
      console.log('AstraZeneca Breakdown:', astrazenecaScore.breakdown)
    }

  } catch (error) {
    console.log('❌ Error:', error.message)
  }
}

debugScoring() 