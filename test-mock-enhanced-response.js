// Test script to generate mock enhanced API response
const generateMockEnhancedResponse = () => {
  const mockResponse = {
    buyer: "Johnson & Johnson",
    rationale: "J&J represents the optimal pharmaceutical acquisition partner based on comprehensive analysis across scientific, operational, strategic, and financial dimensions. Their exceptional track record, global infrastructure, and proven integration capabilities position them as the clear choice for drug acquisition opportunities. The company's leadership in innovation, regulatory compliance, and commercial execution is evidenced by industry awards and consistent outperformance of peers. Strategic investments in R&D, digital health, and emerging markets underpin a robust growth outlook. The combination of financial strength, operational excellence, and strategic market position creates an ideal environment for maximizing the value of acquired pharmaceutical assets.",
    confidence_score: 0.87,
    strategic_fit_score: 0.92,
    alternative_buyers: ["Pfizer", "Roche", "Novartis", "Merck"],
    
    // Enhanced unblurred sections
    executive_overview: {
      deal_activity: {
        target_aligned_deals: [
          {
            asset_name: "EGFR Inhibitor XR-847",
            transaction_amount: "$2.1B upfront + $1.8B milestones",
            deal_date: "2024-03-15",
            relevance_score: 0.89,
            source: "SEC Filing 8-K, March 2024"
          },
          {
            asset_name: "HER2 Antibody YT-932",
            transaction_amount: "$1.7B total value",
            deal_date: "2023-11-22",
            relevance_score: 0.76,
            source: "Press Release, November 2023"
          }
        ],
        modality_aligned_deals: [
          {
            asset_name: "Monoclonal Antibody ZK-445",
            transaction_amount: "$950M upfront",
            deal_date: "2024-01-10",
            relevance_score: 0.82,
            source: "Company Investor Presentation"
          }
        ],
        indication_aligned_deals: [
          {
            asset_name: "NSCLC Therapy AB-123",
            transaction_amount: "$3.2B total value",
            deal_date: "2023-08-05",
            relevance_score: 0.94,
            source: "PitchBook Database"
          }
        ]
      }
    },
    
    development_readiness: {
      regulatory_status: {
        fast_track_designation: {
          likelihood: "High",
          rationale: "Asset targets EGFR mutation in NSCLC, a serious condition with unmet medical need. Disease prevalence of 85,000 new cases annually in US. Asset demonstrates superior efficacy in Phase 2 trials with 45% response rate vs 12% standard of care.",
          confidence: 0.91
        },
        orphan_drug_designation: {
          likelihood: "Medium",
          rationale: "While NSCLC is common, the specific EGFR exon 20 insertion mutation affects only 2-3% of patients (~2,500 cases annually), potentially qualifying under orphan criteria. However, broader NSCLC indication may limit eligibility.",
          confidence: 0.67
        },
        priority_review_voucher: {
          likelihood: "Low",
          rationale: "Asset does not target tropical disease or pediatric indication. NSCLC is primarily an adult disease in developed markets, not qualifying for PRV pathway under current FDA guidance.",
          confidence: 0.23
        },
        rmat_designation: {
          likelihood: "Low",
          rationale: "Asset is a small molecule inhibitor, not a cell or gene therapy. RMAT designation is specifically for regenerative medicine advanced therapies, which this asset does not qualify for.",
          confidence: 0.15
        },
        conditional_marketing_authorization: {
          likelihood: "Medium",
          rationale: "Asset addresses unmet medical need in EGFR-mutated NSCLC. EMA may consider conditional approval based on Phase 2 data showing significant clinical benefit, pending confirmatory Phase 3 results.",
          confidence: 0.72
        }
      }
    },
    
    operational_readiness: {
      supply_chain_risk: {
        raw_material_risks: [
          {
            risk_level: "Medium",
            specific_challenge: "API synthesis requires specialized chiral intermediates",
            relevance: "EGFR inhibitors require complex stereochemistry, limiting supplier options and increasing dependency on specialized CDMOs",
            historical_analogs: "Similar challenges seen with Tagrisso (osimertinib) manufacturing, leading to 3-month supply disruptions in 2022",
            confidence: 0.78
          }
        ],
        cdmo_risks: [
          {
            risk_level: "Low",
            specific_challenge: "Established CDMO network with redundancy",
            relevance: "J&J has multiple qualified CDMOs for small molecule manufacturing, reducing single-point failure risk",
            historical_analogs: "Successfully managed CDMO transitions during COVID-19 without supply disruption",
            confidence: 0.85
          }
        ],
        qa_qc_risks: [
          {
            risk_level: "Medium",
            specific_challenge: "Complex impurity profile requires advanced analytical methods",
            relevance: "EGFR inhibitors have multiple degradation pathways requiring sophisticated stability testing and impurity control",
            historical_analogs: "Similar challenges with Iressa (gefitinib) led to 6-month analytical method validation delays",
            confidence: 0.69
          }
        ],
        distribution_risks: [
          {
            risk_level: "Low",
            specific_challenge: "Standard oral formulation with room temperature stability",
            relevance: "Oral tablet formulation eliminates cold chain requirements and simplifies distribution logistics",
            historical_analogs: "Similar EGFR inhibitors (Tagrisso, Iressa) have demonstrated stable distribution without cold chain",
            confidence: 0.92
          }
        ]
      }
    },
    
    strategic_synergy: {
      tam_analysis: {
        current_tam: {
          value: "$8.7B",
          assumptions: {
            patient_population: "85,000 new EGFR-mutated NSCLC cases annually in US/EU",
            penetration_rate: "35% market penetration based on current EGFR inhibitor adoption",
            pricing: "$12,500 per month treatment cost (similar to Tagrisso)",
            geographic_coverage: "US, EU5, Japan, Canada, Australia"
          }
        },
        projected_tam: {
          value: "$14.2B",
          assumptions: {
            patient_population_growth: "2.3% annual growth in NSCLC incidence",
            penetration_rate_increase: "45% penetration by 2030 due to improved diagnostics",
            pricing_evolution: "3% annual price increases offset by 15% generic competition",
            market_expansion: "Expansion to China, Brazil, and emerging markets"
          }
        },
        validation: {
          math_verified: true,
          growth_rates_defensible: true,
          assumptions_specific: true
        }
      }
    }
  }

  return mockResponse
}

// Test the mock response
const testMockResponse = () => {
  console.log('🧪 Testing Mock Enhanced Response\n')
  
  const mockResponse = generateMockEnhancedResponse()
  
  console.log('✅ Mock Response Generated Successfully')
  console.log(`Buyer: ${mockResponse.buyer}`)
  console.log(`Confidence Score: ${mockResponse.confidence_score}`)
  console.log(`Strategic Fit Score: ${mockResponse.strategic_fit_score}`)
  
  console.log('\n📊 Unblurred Sections Data:')
  console.log(`- Deal Activity: ${mockResponse.executive_overview.deal_activity.target_aligned_deals.length} target-aligned deals`)
  console.log(`- Regulatory Status: ${Object.keys(mockResponse.development_readiness.regulatory_status).length} designations analyzed`)
  console.log(`- Supply Chain Risk: ${mockResponse.operational_readiness.supply_chain_risk.raw_material_risks.length} risk categories`)
  console.log(`- TAM Analysis: Current $${mockResponse.strategic_synergy.tam_analysis.current_tam.value}, Projected $${mockResponse.strategic_synergy.tam_analysis.projected_tam.value}`)
  
  console.log('\n🎯 Strategic Rationale Quality:')
  console.log(`- Length: ${mockResponse.rationale.length} characters`)
  console.log(`- Comprehensive: ${mockResponse.rationale.includes('comprehensive analysis') ? 'Yes' : 'No'}`)
  console.log(`- Data-driven: ${mockResponse.rationale.includes('evidence') ? 'Yes' : 'No'}`)
  
  console.log('\n📋 Validation Status:')
  console.log(`- Math Verified: ${mockResponse.strategic_synergy.tam_analysis.validation.math_verified}`)
  console.log(`- Growth Rates Defensible: ${mockResponse.strategic_synergy.tam_analysis.validation.growth_rates_defensible}`)
  console.log(`- Assumptions Specific: ${mockResponse.strategic_synergy.tam_analysis.validation.assumptions_specific}`)
  
  return mockResponse
}

// Function to save mock response to localStorage for testing
const saveMockResponseToLocalStorage = () => {
  const mockResponse = generateMockEnhancedResponse()
  localStorage.setItem('perplexityResult', JSON.stringify(mockResponse))
  console.log('✅ Mock response saved to localStorage')
  console.log('🔄 Refresh the dashboard page to see the unblurred sections')
}

// Export functions
if (typeof window !== 'undefined') {
  // Browser environment
  window.generateMockEnhancedResponse = generateMockEnhancedResponse
  window.testMockResponse = testMockResponse
  window.saveMockResponseToLocalStorage = saveMockResponseToLocalStorage
}

if (typeof module !== 'undefined') {
  // Node.js environment
  module.exports = {
    generateMockEnhancedResponse,
    testMockResponse,
    saveMockResponseToLocalStorage
  }
}

// Run test if called directly
if (typeof window === 'undefined' && typeof module !== 'undefined') {
  testMockResponse()
} 