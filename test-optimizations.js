// Test script for the optimized BD Agent API
const testOptimizations = async () => {
  console.log('🧪 Testing BD Agent Optimizations...\n')

  // Test 1: Back-testing
  console.log('1️⃣ Testing Back-testing API...')
  try {
    const backtestResponse = await fetch('http://localhost:3000/api/backtest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ runFullTest: false, testCount: 3 })
    })
    
    if (backtestResponse.ok) {
      const backtestData = await backtestResponse.json()
      console.log('✅ Back-testing successful!')
      console.log(`   Accuracy: ${(backtestData.metrics.accuracy * 100).toFixed(1)}%`)
      console.log(`   Precision: ${(backtestData.metrics.precision * 100).toFixed(1)}%`)
      console.log(`   Recall: ${(backtestData.metrics.recall * 100).toFixed(1)}%`)
      console.log(`   F1 Score: ${(backtestData.metrics.f1Score * 100).toFixed(1)}%`)
    } else {
      console.log('❌ Back-testing failed:', await backtestResponse.text())
    }
  } catch (error) {
    console.log('❌ Back-testing error:', error.message)
  }

  console.log('\n2️⃣ Testing Enhanced API with Second-Pass Verification...')
  
  // Test 2: Enhanced API with all optimizations
  const testAsset = {
    therapeuticArea: 'oncology',
    indication: 'breast cancer',
    target: 'HER2',
    modality: 'antibody-drug conjugate',
    assetStage: 'phase 2'
  }

  try {
    const apiResponse = await fetch('http://localhost:3000/api/perplexity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testAsset)
    })
    
    if (apiResponse.ok) {
      const apiData = await apiResponse.json()
      console.log('✅ Enhanced API successful!')
      console.log(`   Recommended Buyer: ${apiData.buyer}`)
      console.log(`   Strategic Fit Score: ${(apiData.strategic_fit_score * 100).toFixed(1)}%`)
      console.log(`   Confidence Score: ${(apiData.confidence_score * 100).toFixed(1)}%`)
      console.log(`   Alternative Buyers: ${apiData.alternative_buyers?.join(', ') || 'None'}`)
      console.log(`   Rationale: ${apiData.rationale?.substring(0, 100)}...`)
    } else {
      console.log('❌ Enhanced API failed:', await apiResponse.text())
    }
  } catch (error) {
    console.log('❌ Enhanced API error:', error.message)
  }

  console.log('\n3️⃣ Testing Buyer Scoring System...')
  
  // Test 3: Direct buyer scoring
  try {
    const { calculateBuyerScores } = await import('./lib/buyer-scoring.ts')
    const scores = calculateBuyerScores(testAsset)
    console.log('✅ Buyer scoring successful!')
    console.log('   Top 3 Buyers:')
    scores.slice(0, 3).forEach((score, index) => {
      console.log(`   ${index + 1}. ${score.name} (${(score.totalScore * 100).toFixed(1)}%)`)
    })
  } catch (error) {
    console.log('❌ Buyer scoring error:', error.message)
  }

  console.log('\n🎉 Optimization testing complete!')
  console.log('\n📊 Summary of Implemented Features:')
  console.log('   ✅ Back-testing against historic deals')
  console.log('   ✅ Second-pass verification with GPT-4o')
  console.log('   ✅ Fine-grained buyer scoring (deterministic)')
  console.log('   ✅ Input enrichment and validation')
  console.log('   ✅ Enhanced prompt engineering')
  console.log('   ✅ Aggressive caching')
  console.log('   ✅ Performance metrics tracking')
}

// Run the test if this file is executed directly
if (typeof window === 'undefined') {
  testOptimizations().catch(console.error)
}

export { testOptimizations } 