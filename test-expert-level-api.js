// Expert-level testing suite for BD Agent API
const testExpertLevelAPI = async () => {
  console.log('🧪 Testing Expert-Level BD Agent API...\n')

  const testCases = [
    {
      name: 'Oncology - HER2+ Breast Cancer - ADC (High Complexity)',
      data: {
        therapeuticArea: 'oncology',
        indication: 'her2 positive breast cancer',
        target: 'HER2',
        modality: 'antibody-drug conjugate',
        assetStage: 'phase 2'
      },
      expectedComplexity: 'high',
      expectedExpertise: ['molecular targeting', 'clinical development', 'commercial strategy']
    },
    {
      name: 'Neurology - Alzheimer Disease - Small Molecule (High Complexity)',
      data: {
        therapeuticArea: 'neurology',
        indication: 'alzheimer disease',
        target: 'AMYLOD',
        modality: 'small molecule',
        assetStage: 'phase 3'
      },
      expectedComplexity: 'high',
      expectedExpertise: ['regulatory pathways', 'clinical trial design', 'market access']
    },
    {
      name: 'Immunology - Rheumatoid Arthritis - Biologic (Medium Complexity)',
      data: {
        therapeuticArea: 'immunology',
        indication: 'rheumatoid arthritis',
        target: 'TNF',
        modality: 'monoclonal antibody',
        assetStage: 'phase 1'
      },
      expectedComplexity: 'medium',
      expectedExpertise: ['immunology', 'biologics manufacturing', 'competitive landscape']
    },
    {
      name: 'Rare Disease - Hemophilia A - Gene Therapy (High Complexity)',
      data: {
        therapeuticArea: 'rare diseases',
        indication: 'hemophilia a',
        target: 'FACTOR VIII',
        modality: 'gene therapy',
        assetStage: 'phase 2'
      },
      expectedComplexity: 'high',
      expectedExpertise: ['gene therapy', 'regulatory strategy', 'pricing strategy']
    },
    {
      name: 'Cardiovascular - Heart Failure - Small Molecule (Medium Complexity)',
      data: {
        therapeuticArea: 'cardiovascular',
        indication: 'heart failure',
        target: 'SGLT2',
        modality: 'small molecule',
        assetStage: 'phase 3'
      },
      expectedComplexity: 'medium',
      expectedExpertise: ['cardiovascular', 'clinical outcomes', 'reimbursement']
    }
  ]

  let totalTests = 0
  let passedTests = 0
  let failedTests = 0

  for (const testCase of testCases) {
    console.log(`\n🔍 Testing: ${testCase.name}`)
    console.log(`📊 Expected Complexity: ${testCase.expectedComplexity}`)
    console.log(`🎯 Expected Expertise Areas: ${testCase.expectedExpertise.join(', ')}`)

    try {
      const startTime = Date.now()
      
      const response = await fetch('http://localhost:3000/api/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      })

      const duration = (Date.now() - startTime) / 1000
      const result = await response.json()

      totalTests++

      // Test 1: Response structure
      if (result.buyer && result.rationale && result.confidence_score !== undefined) {
        console.log('✅ Response structure: PASS')
        passedTests++
      } else {
        console.log('❌ Response structure: FAIL')
        failedTests++
      }

      // Test 2: Expert-level content quality
      const hasSpecificData = result.rationale.includes('$') || 
                             result.rationale.includes('%') || 
                             result.rationale.includes('phase') ||
                             result.rationale.includes('FDA') ||
                             result.rationale.includes('EMA')
      
      if (hasSpecificData) {
        console.log('✅ Expert-level content: PASS')
        passedTests++
      } else {
        console.log('❌ Expert-level content: FAIL')
        failedTests++
      }

      // Test 3: Strategic depth
      const hasStrategicDepth = result.rationale.includes('strategic') ||
                               result.rationale.includes('synergy') ||
                               result.rationale.includes('pipeline') ||
                               result.rationale.includes('commercial')
      
      if (hasStrategicDepth) {
        console.log('✅ Strategic depth: PASS')
        passedTests++
      } else {
        console.log('❌ Strategic depth: FAIL')
        failedTests++
      }

      // Test 4: Technical precision
      const hasTechnicalPrecision = result.rationale.includes('target') ||
                                   result.rationale.includes('mechanism') ||
                                   result.rationale.includes('clinical') ||
                                   result.rationale.includes('regulatory')
      
      if (hasTechnicalPrecision) {
        console.log('✅ Technical precision: PASS')
        passedTests++
      } else {
        console.log('❌ Technical precision: FAIL')
        failedTests++
      }

      // Test 5: Response time optimization
      const maxTime = testCase.expectedComplexity === 'high' ? 120 : 90
      if (duration <= maxTime) {
        console.log(`✅ Response time (≤${maxTime}s): PASS`)
        passedTests++
      } else {
        console.log(`❌ Response time (≤${maxTime}s): FAIL`)
        failedTests++
      }

      // Test 6: Confidence score validation
      if (result.confidence_score >= 0.7 && result.confidence_score <= 1.0) {
        console.log('✅ Confidence score validation: PASS')
        passedTests++
      } else {
        console.log('❌ Confidence score validation: FAIL')
        failedTests++
      }

      // Test 7: Comprehensive analysis areas
      const analysisAreas = [
        'revenue', 'scientific', 'deal', 'regulatory', 'supply', 'market'
      ]
      const coveredAreas = analysisAreas.filter(area => 
        result.rationale.toLowerCase().includes(area)
      )
      
      if (coveredAreas.length >= 4) {
        console.log('✅ Comprehensive analysis: PASS')
        passedTests++
      } else {
        console.log('❌ Comprehensive analysis: FAIL')
        failedTests++
      }

      console.log(`⏱️  Response time: ${duration.toFixed(2)}s`)
      console.log(`🎯 Confidence score: ${result.confidence_score}`)
      console.log(`📈 Analysis areas covered: ${coveredAreas.length}/6`)

    } catch (error) {
      console.error(`❌ Test failed with error: ${error.message}`)
      failedTests++
      totalTests++
    }
  }

  console.log(`\n📊 TEST SUMMARY:`)
  console.log(`Total test cases: ${testCases.length}`)
  console.log(`Total individual tests: ${totalTests}`)
  console.log(`Passed: ${passedTests}`)
  console.log(`Failed: ${failedTests}`)
  console.log(`Success rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`)

  if (passedTests / totalTests >= 0.7) {
    console.log('\n🎉 Expert-level API validation PASSED!')
    return true
  } else {
    console.log('\n⚠️  Expert-level API validation needs improvement.')
    return false
  }
}

// Run the expert-level tests
if (require.main === module) {
  testExpertLevelAPI()
    .then(success => {
      process.exit(success ? 0 : 1)
    })
    .catch(error => {
      console.error('Test execution failed:', error)
      process.exit(1)
    })
}

module.exports = { testExpertLevelAPI } 