// Comprehensive test script for BD Agent API
const testComprehensive = async () => {
  console.log('🧪 Running Comprehensive BD Agent API Tests...\n')

  const testCases = [
    {
      name: 'Oncology - Breast Cancer - HER2 ADC',
      data: {
        therapeuticArea: 'oncology',
        indication: 'breast cancer',
        target: 'HER2',
        modality: 'antibody-drug conjugate',
        assetStage: 'phase 2'
      }
    },
    {
      name: 'Immunology - Rheumatoid Arthritis - TNF',
      data: {
        therapeuticArea: 'immunology',
        indication: 'rheumatoid arthritis',
        target: 'TNF',
        modality: 'monoclonal antibody',
        assetStage: 'phase 3'
      }
    },
    {
      name: 'Neurology - Alzheimer - Amyloid',
      data: {
        therapeuticArea: 'neurology',
        indication: 'alzheimer disease',
        target: 'amyloid beta',
        modality: 'monoclonal antibody',
        assetStage: 'phase 1'
      }
    }
  ]

  let totalTests = 0
  let passedTests = 0
  let failedTests = 0

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

      // Test 2: Revenue performance data
      if (data.revenue_performance && 
          (data.revenue_performance.recent_revenue || 
           data.revenue_performance.growth_trends || 
           data.revenue_performance.market_position)) {
        console.log('✅ Revenue performance data: PASS')
        passedTests++
      } else {
        console.log('❌ Revenue performance data: FAIL')
        failedTests++
      }

      // Test 3: Scientific capabilities
      if (data.scientific_capabilities && 
          (data.scientific_capabilities.research_infrastructure || 
           data.scientific_capabilities.key_metrics || 
           data.scientific_capabilities.technology_platforms)) {
        console.log('✅ Scientific capabilities data: PASS')
        passedTests++
      } else {
        console.log('❌ Scientific capabilities data: FAIL')
        failedTests++
      }

      // Test 4: Deal activity
      if (data.deal_activity && 
          (data.deal_activity.recent_deals || 
           data.deal_activity.partnerships || 
           data.deal_activity.investment_focus)) {
        console.log('✅ Deal activity data: PASS')
        passedTests++
      } else {
        console.log('❌ Deal activity data: FAIL')
        failedTests++
      }

      // Test 5: Regulatory status
      if (data.regulatory_status && 
          (data.regulatory_status.clinical_phase || 
           data.regulatory_status.fda_submissions || 
           data.regulatory_status.designations)) {
        console.log('✅ Regulatory status data: PASS')
        passedTests++
      } else {
        console.log('❌ Regulatory status data: FAIL')
        failedTests++
      }

      // Test 6: Supply chain risk
      if (data.supply_chain_risk && 
          (data.supply_chain_risk.geopolitical_exposure || 
           data.supply_chain_risk.api_dependencies || 
           data.supply_chain_risk.cmo_risks)) {
        console.log('✅ Supply chain risk data: PASS')
        passedTests++
      } else {
        console.log('❌ Supply chain risk data: FAIL')
        failedTests++
      }

      // Test 7: Market analysis
      if (data.market_analysis && 
          (data.market_analysis.current_tam || 
           data.market_analysis.projected_tam || 
           data.market_analysis.cagr)) {
        console.log('✅ Market analysis data: PASS')
        passedTests++
      } else {
        console.log('❌ Market analysis data: FAIL')
        failedTests++
      }

      // Test 8: Data quality check
      const hasSpecificData = data.rationale && 
                             data.rationale.length > 100 && 
                             (data.rationale.includes('$') || data.rationale.includes('%') || data.rationale.includes('billion'))
      
      if (hasSpecificData) {
        console.log('✅ Data quality (specific figures): PASS')
        passedTests++
      } else {
        console.log('❌ Data quality (specific figures): FAIL')
        failedTests++
      }

      // Test 9: Response time check
      if (duration < 60) {
        console.log('✅ Response time (< 60s): PASS')
        passedTests++
      } else {
        console.log('❌ Response time (< 60s): FAIL')
        failedTests++
      }

      console.log(`📊 Sample data: ${data.buyer} - ${data.rationale.substring(0, 100)}...`)

    } catch (error) {
      console.log(`❌ Test failed with error: ${error.message}`)
      failedTests++
    }
  }

  console.log('\n📈 Test Summary:')
  console.log(`Total Tests: ${totalTests}`)
  console.log(`Passed: ${passedTests}`)
  console.log(`Failed: ${failedTests}`)
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`)

  if (failedTests === 0) {
    console.log('\n🎉 All tests passed! The API is working correctly.')
  } else {
    console.log('\n⚠️ Some tests failed. Review the issues above.')
  }
}

testComprehensive().catch(console.error) 