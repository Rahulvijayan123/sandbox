// Test the enhanced API with comprehensive data
const testEnhancedAPI = async () => {
  console.log('🧪 Testing Enhanced API with Comprehensive Data...\n')

  const testAsset = {
    therapeuticArea: 'oncology',
    indication: 'breast cancer',
    target: 'HER2',
    modality: 'antibody-drug conjugate',
    assetStage: 'phase 2'
  }

  try {
    console.log('📡 Making request to enhanced API...')
    const startTime = Date.now()
    
    const response = await fetch('http://localhost:3000/api/perplexity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testAsset)
    })

    const endTime = Date.now()
    const duration = (endTime - startTime) / 1000

    console.log('📊 Response status:', response.status)
    console.log('⏱️ Response time:', duration + ' seconds')

    if (!response.ok) {
      const errorText = await response.text()
      console.log('❌ Enhanced API Error:', errorText)
      return
    }

    const data = await response.json()
    console.log('✅ Enhanced API Response successful!')
    
    // Check for enhanced fields
    console.log('\n📋 Checking for enhanced fields:')
    
    if (data.supply_chain_risk) {
      console.log('✅ Supply Chain Risk found')
      console.log('   - Geopolitical Exposure:', data.supply_chain_risk.geopolitical_exposure ? 'Yes' : 'No')
      console.log('   - API Dependencies:', data.supply_chain_risk.api_dependencies ? 'Yes' : 'No')
      console.log('   - CMO Risks:', data.supply_chain_risk.cmo_risks ? 'Yes' : 'No')
      console.log('   - Historical Disruptions:', data.supply_chain_risk.historical_disruptions ? 'Yes' : 'No')
      console.log('   - Manufacturing Capacity:', data.supply_chain_risk.manufacturing_capacity ? 'Yes' : 'No')
      console.log('   - Raw Material Sourcing:', data.supply_chain_risk.raw_material_sourcing ? 'Yes' : 'No')
    } else {
      console.log('❌ Supply Chain Risk missing')
    }
    
    if (data.market_analysis) {
      console.log('✅ Market Analysis found')
      console.log('   - Current TAM:', data.market_analysis.current_tam ? 'Yes' : 'No')
      console.log('   - Projected TAM:', data.market_analysis.projected_tam ? 'Yes' : 'No')
      console.log('   - CAGR:', data.market_analysis.cagr ? 'Yes' : 'No')
      console.log('   - Geographic Breakdown:', data.market_analysis.geographic_breakdown ? 'Yes' : 'No')
      console.log('   - Competitive Landscape:', data.market_analysis.competitive_landscape ? 'Yes' : 'No')
      console.log('   - Pricing Analysis:', data.market_analysis.pricing_analysis ? 'Yes' : 'No')
    } else {
      console.log('❌ Market Analysis missing')
    }

    // Show sample data
    if (data.supply_chain_risk?.geopolitical_exposure) {
      console.log('\n📄 Sample Supply Chain Data:')
      console.log('Geopolitical Exposure:', data.supply_chain_risk.geopolitical_exposure.substring(0, 100) + '...')
    }

    if (data.market_analysis?.current_tam) {
      console.log('\n📄 Sample Market Data:')
      console.log('Current TAM:', data.market_analysis.current_tam.substring(0, 100) + '...')
    }

  } catch (error) {
    console.log('❌ Enhanced API Error:', error.message)
  }
}

testEnhancedAPI().catch(console.error) 