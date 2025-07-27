// Comprehensive testing suite for optimized BD Agent API
const testOptimizedAPI = async () => {
  console.log('🧪 Testing Optimized BD Agent API...\n')

  const testCases = [
    {
      name: 'Oncology - Breast Cancer - HER2 ADC (Complex)',
      data: {
        therapeuticArea: 'oncology',
        indication: 'breast cancer',
        target: 'HER2',
        modality: 'antibody-drug conjugate',
        assetStage: 'phase 2'
      },
      expectedComplexity: 'high'
    },
    {
      name: 'Immunology - Rheumatoid Arthritis - TNF (Medium)',
      data: {
        therapeuticArea: 'immunology',
        indication: 'rheumatoid arthritis',
        target: 'TNF',
        modality: 'monoclonal antibody',
        assetStage: 'phase 3'
      },
      expectedComplexity: 'medium'
    },
    {
      name: 'Neurology - Alzheimer - Amyloid (High)',
      data: {
        therapeuticArea: 'neurology',
        indication: 'alzheimer disease',
        target: 'amyloid beta',
        modality: 'monoclonal antibody',
        assetStage: 'phase 1'
      },
      expectedComplexity: 'high'
    },
    {
      name: 'Rare Diseases - Hemophilia - Factor VIII (Medium)',
      data: {
        therapeuticArea: 'rare diseases',
        indication: 'hemophilia',
        target: 'factor VIII',
        modality: 'gene therapy',
        assetStage: 'phase 1'
      },
      expectedComplexity: 'medium'
    }
  ]

  let totalTests = 0
  let passedTests = 0
  let failedTests = 0
  const results = []

  for (const testCase of testCases) {
    console.log(`\n📋 Testing: ${testCase.name}`)
    totalTests++

    try {
      const startTime = Date.now()
      
      const response = await fetch('http://localhost:3000/api/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      })

      const endTime = Date.now()
      const duration = (endTime - startTime) / 1000

      console.log(`⏱️ Response time: ${duration.toFixed(2)}s`)

      if (!response.ok) {
        const errorText = await response.text()
        console.log(`❌ Test failed - Status: ${response.status}, Error: ${errorText}`)
        failedTests++
        results.push({
          testCase: testCase.name,
          status: 'FAILED',
          error: errorText,
          duration
        })
        continue
      }

      const data = await response.json()
      
      // Test 1: Basic response structure
      if (data.buyer && data.rationale) {
        console.log('✅ Basic response structure: PASS')
        passedTests++
      } else {
        console.log('❌ Basic response structure: FAIL')
        failedTests++
      }

      // Test 2: Enhanced fields presence
      const enhancedFields = [
        'revenue_performance',
        'scientific_capabilities', 
        'deal_activity',
        'regulatory_status',
        'supply_chain_risk',
        'market_analysis'
      ]

      let enhancedFieldsPassed = 0
      enhancedFields.forEach(field => {
        if (data[field]) {
          enhancedFieldsPassed++
        }
      })

      if (enhancedFieldsPassed >= 5) {
        console.log('✅ Enhanced fields: PASS')
        passedTests++
      } else {
        console.log(`❌ Enhanced fields: FAIL (${enhancedFieldsPassed}/6)`)
        failedTests++
      }

      // Test 3: Data quality (specific figures)
      const hasSpecificData = data.revenue_performance?.recent_revenue?.includes('$') ||
                             data.market_analysis?.current_tam?.includes('$') ||
                             data.scientific_capabilities?.key_metrics?.patents_filed?.includes('20')

      if (hasSpecificData) {
        console.log('✅ Data quality (specific figures): PASS')
        passedTests++
      } else {
        console.log('❌ Data quality (specific figures): FAIL')
        failedTests++
      }

      // Test 4: Response time optimization
      const maxTime = testCase.expectedComplexity === 'high' ? 120 : 90
      if (duration <= maxTime) {
        console.log(`✅ Response time (≤${maxTime}s): PASS`)
        passedTests++
      } else {
        console.log(`❌ Response time (≤${maxTime}s): FAIL`)
        failedTests++
      }

      // Test 5: Cache functionality
      const cacheStartTime = Date.now()
      const cacheResponse = await fetch('http://localhost:3000/api/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      })
      const cacheEndTime = Date.now()
      const cacheDuration = (cacheEndTime - cacheStartTime) / 1000

      if (cacheDuration < 1.0) {
        console.log('✅ Cache functionality: PASS')
        passedTests++
      } else {
        console.log('❌ Cache functionality: FAIL')
        failedTests++
      }

      results.push({
        testCase: testCase.name,
        status: 'PASSED',
        duration,
        cacheDuration,
        buyer: data.buyer,
        hasEnhancedFields: enhancedFieldsPassed,
        hasSpecificData
      })

      // Show sample data
      console.log(`📊 Sample data: ${data.buyer} - ${data.rationale?.substring(0, 100)}...`)

    } catch (error) {
      console.log('❌ Test error:', error.message)
      failedTests++
      results.push({
        testCase: testCase.name,
        status: 'ERROR',
        error: error.message
      })
    }
  }

  // Summary
  console.log('\n📈 Test Summary:')
  console.log(`Total Tests: ${totalTests}`)
  console.log(`Passed: ${passedTests}`)
  console.log(`Failed: ${failedTests}`)
  console.log(`Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`)

  // Detailed results
  console.log('\n📋 Detailed Results:')
  results.forEach(result => {
    console.log(`${result.status === 'PASSED' ? '✅' : '❌'} ${result.testCase}`)
    if (result.status === 'PASSED') {
      console.log(`   Duration: ${result.duration}s, Cache: ${result.cacheDuration}s`)
      console.log(`   Buyer: ${result.buyer}, Enhanced Fields: ${result.hasEnhancedFields}/6`)
    } else {
      console.log(`   Error: ${result.error}`)
    }
  })

  if (failedTests > 0) {
    console.log('\n⚠️ Some tests failed. Review the issues above.')
  } else {
    console.log('\n🎉 All tests passed! Optimizations are working correctly.')
  }
}

testOptimizedAPI().catch(console.error) 