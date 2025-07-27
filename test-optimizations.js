// Comprehensive test script for all optimization layers
const testOptimizations = async () => {
  console.log('🧪 Testing All Optimization Layers...\n')

  // Test cases with varying complexity
  const testCases = [
    {
      name: 'Simple Case - Phase 3 Small Molecule',
      data: {
        therapeuticArea: 'oncology',
        indication: 'breast cancer',
        target: 'HER2',
        modality: 'small molecule',
        assetStage: 'phase 3'
      },
      expectedLevel: 'advanced'
    },
    {
      name: 'Complex Case - Phase 1 ADC',
      data: {
        therapeuticArea: 'oncology',
        indication: 'lung cancer',
        target: 'EGFR',
        modality: 'antibody-drug conjugate',
        assetStage: 'phase 1'
      },
      expectedLevel: 'expert'
    },
    {
      name: 'Edge Case - Typos and Variations',
      data: {
        therapeuticArea: 'oncolgy', // typo
        indication: 'breast caner', // typo
        target: 'her2', // lowercase
        modality: 'adc', // abbreviation
        assetStage: 'phase ii' // roman numeral
      },
      expectedLevel: 'intermediate'
    }
  ]

  for (const testCase of testCases) {
    console.log(`📋 Testing: ${testCase.name}`)
    
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

      console.log(`⏱️ Response time: ${duration} seconds`)

      if (!response.ok) {
        const errorText = await response.text()
        console.log(`❌ Error: ${errorText}`)
        continue
      }

      const data = await response.json()
      
      // Validate response structure
      console.log('✅ Response received successfully')
      
      // Check for enhanced fields
      const enhancedFields = [
        'buyer', 'rationale', 'confidence_score', 'strategic_fit_score',
        'revenue_performance', 'scientific_capabilities', 'deal_activity',
        'regulatory_status', 'supply_chain_risk', 'market_analysis'
      ]
      
      console.log('📊 Checking enhanced fields:')
      enhancedFields.forEach(field => {
        if (data[field]) {
          console.log(`  ✅ ${field}: Present`)
        } else {
          console.log(`  ❌ ${field}: Missing`)
        }
      })
      
      // Check data quality
      console.log('\n🔍 Data Quality Analysis:')
      
      // Check for specific data points
      const rationale = data.rationale || ''
      const hasSpecificData = /(\d+\.?\d*%?|\$\d+|\d{4})/.test(rationale)
      const hasCompanyNames = /(AstraZeneca|Roche|Pfizer|Novartis|Johnson & Johnson|Merck|Bristol-Myers Squibb|Amgen|Gilead|Regeneron)/i.test(rationale)
      const hasTechnicalTerms = /(HER2|EGFR|VEGF|PD-1|CTLA-4|ADC|CAR-T|Phase \d|FDA|EMA)/i.test(rationale)
      
      console.log(`  Specific Data: ${hasSpecificData ? '✅' : '❌'}`)
      console.log(`  Company Names: ${hasCompanyNames ? '✅' : '❌'}`)
      console.log(`  Technical Terms: ${hasTechnicalTerms ? '✅' : '❌'}`)
      
      // Check confidence scores
      const confidenceScore = data.confidence_score || 0
      const strategicFitScore = data.strategic_fit_score || 0
      
      console.log(`  Confidence Score: ${confidenceScore} ${confidenceScore > 0.7 ? '✅' : '❌'}`)
      console.log(`  Strategic Fit Score: ${strategicFitScore} ${strategicFitScore > 0.7 ? '✅' : '❌'}`)
      
      // Check alternative buyers
      const alternativeBuyers = data.alternative_buyers || []
      console.log(`  Alternative Buyers: ${alternativeBuyers.length} ${alternativeBuyers.length > 0 ? '✅' : '❌'}`)
      
      // Overall quality score
      let qualityScore = 0
      if (hasSpecificData) qualityScore += 0.3
      if (hasCompanyNames) qualityScore += 0.3
      if (hasTechnicalTerms) qualityScore += 0.2
      if (confidenceScore > 0.7) qualityScore += 0.1
      if (strategicFitScore > 0.7) qualityScore += 0.1
      
      console.log(`\n📈 Overall Quality Score: ${(qualityScore * 100).toFixed(1)}%`)
      
      if (qualityScore >= 0.8) {
        console.log('🎉 Excellent quality!')
      } else if (qualityScore >= 0.6) {
        console.log('👍 Good quality')
      } else {
        console.log('⚠️ Needs improvement')
      }
      
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`)
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
  }
}

// Test data validation specifically
const testDataValidation = async () => {
  console.log('🔍 Testing Data Validation Layer...\n')
  
  const validationTests = [
    {
      input: { therapeuticArea: 'oncolgy', indication: 'breast caner', target: 'her2', modality: 'adc', assetStage: 'phase ii' },
      expected: 'Should correct typos and normalize'
    },
    {
      input: { therapeuticArea: 'immunology', indication: 'rheumatoid arthritis', target: 'TNF-alpha', modality: 'monoclonal antibody', assetStage: 'phase 3' },
      expected: 'Should handle valid inputs'
    },
    {
      input: { therapeuticArea: 'unknown', indication: 'invalid', target: 'XYZ', modality: 'test', assetStage: 'unknown' },
      expected: 'Should reject invalid inputs'
    }
  ]
  
  for (const test of validationTests) {
    console.log(`Testing: ${test.expected}`)
    
    try {
      const response = await fetch('http://localhost:3000/api/perplexity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test.input)
      })
      
      if (response.ok) {
        console.log('✅ Validation passed')
      } else {
        const errorData = await response.json()
        console.log(`❌ Validation failed: ${errorData.error}`)
        if (errorData.suggestions) {
          console.log(`💡 Suggestions: ${errorData.suggestions.join(', ')}`)
        }
      }
    } catch (error) {
      console.log(`❌ Test error: ${error.message}`)
    }
  }
}

// Test performance under load
const testPerformance = async () => {
  console.log('⚡ Testing Performance...\n')
  
  const concurrentRequests = 3
  const requests = []
  
  const testData = {
    therapeuticArea: 'oncology',
    indication: 'breast cancer',
    target: 'HER2',
    modality: 'antibody-drug conjugate',
    assetStage: 'phase 2'
  }
  
  console.log(`🚀 Sending ${concurrentRequests} concurrent requests...`)
  
  const startTime = Date.now()
  
  for (let i = 0; i < concurrentRequests; i++) {
    requests.push(
      fetch('http://localhost:3000/api/perplexity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      }).then(async (response) => {
        const data = await response.json()
        return { success: response.ok, data }
      }).catch(error => ({ success: false, error: error.message }))
    )
  }
  
  const results = await Promise.all(requests)
  const endTime = Date.now()
  const totalTime = (endTime - startTime) / 1000
  
  console.log(`⏱️ Total time: ${totalTime} seconds`)
  console.log(`📊 Average time per request: ${(totalTime / concurrentRequests).toFixed(2)} seconds`)
  
  const successCount = results.filter(r => r.success).length
  console.log(`✅ Success rate: ${(successCount / concurrentRequests * 100).toFixed(1)}%`)
  
  return results
}

// Main test runner
const runAllTests = async () => {
  console.log('🚀 Starting Comprehensive Optimization Tests\n')
  
  try {
    // Test 1: Data validation
    await testDataValidation()
    console.log('\n' + '='.repeat(60) + '\n')
    
    // Test 2: Main optimization layers
    await testOptimizations()
    console.log('\n' + '='.repeat(60) + '\n')
    
    // Test 3: Performance
    await testPerformance()
    
    console.log('\n🎉 All tests completed!')
    
  } catch (error) {
    console.error('❌ Test suite failed:', error)
  }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runAllTests()
}

module.exports = { runAllTests, testOptimizations, testDataValidation, testPerformance } 