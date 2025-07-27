// Test the backtest functionality
const testBacktest = async () => {
  console.log('🧪 Testing Backtest Functionality...\n')

  try {
    const response = await fetch('http://localhost:3000/api/backtest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        runFullTest: false,
        testCount: 5
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log('❌ Backtest failed:', errorText)
      return
    }

    const data = await response.json()
    
    console.log('✅ Backtest completed successfully!')
    console.log('\n📊 Performance Metrics:')
    console.log(`Total Tests: ${data.metrics.totalTests}`)
    console.log(`Correct Predictions: ${data.metrics.correctPredictions}`)
    console.log(`Accuracy: ${(data.metrics.accuracy * 100).toFixed(1)}%`)
    console.log(`Precision: ${(data.metrics.precision * 100).toFixed(1)}%`)
    console.log(`Recall: ${(data.metrics.recall * 100).toFixed(1)}%`)
    console.log(`F1 Score: ${(data.metrics.f1Score * 100).toFixed(1)}%`)

    console.log('\n📋 Sample Results:')
    data.results.slice(0, 3).forEach(result => {
      console.log(`- ${result.asset.therapeuticArea}/${result.asset.indication}: Predicted ${result.predictedBuyer}, Actual ${result.actualBuyer} (${result.isCorrect ? '✅' : '❌'})`)
    })

    console.log('\n💡 Recommendations:')
    data.analysis.recommendations.slice(0, 3).forEach(rec => {
      console.log(`- ${rec}`)
    })

  } catch (error) {
    console.log('❌ Backtest error:', error.message)
  }
}

testBacktest().catch(console.error) 