// Advanced research depth enhancer for comprehensive pharmaceutical analysis
export interface ResearchDepth {
  level: 'basic' | 'intermediate' | 'advanced' | 'expert'
  areas: ResearchArea[]
  confidence: number
  completeness: number
  specificity: number
}

export interface ResearchArea {
  name: string
  depth: number
  coverage: number
  sources: string[]
  insights: string[]
  gaps: string[]
}

export interface EnhancedResearchContext {
  assetData: any
  buyerProfiles: any[]
  marketData: any[]
  clinicalData: any[]
  regulatoryData: any[]
  financialData: any[]
  competitiveData: any[]
}

// Research depth configuration
const RESEARCH_DEPTH_CONFIG = {
  basic: {
    areas: ['strategic_fit', 'basic_market'],
    maxTokens: 4000,
    searchDepth: 'medium',
    sources: 3
  },
  intermediate: {
    areas: ['strategic_fit', 'market_analysis', 'clinical_data', 'financial_metrics'],
    maxTokens: 6000,
    searchDepth: 'high',
    sources: 5
  },
  advanced: {
    areas: ['strategic_fit', 'market_analysis', 'clinical_data', 'financial_metrics', 'regulatory_pathway', 'competitive_landscape'],
    maxTokens: 8000,
    searchDepth: 'high',
    sources: 8
  },
  expert: {
    areas: ['strategic_fit', 'market_analysis', 'clinical_data', 'financial_metrics', 'regulatory_pathway', 'competitive_landscape', 'supply_chain', 'manufacturing', 'commercial_strategy'],
    maxTokens: 12000,
    searchDepth: 'very_high',
    sources: 12
  }
}

// Research areas with specific focus points
const RESEARCH_AREAS = {
  strategic_fit: {
    name: 'Strategic Fit Analysis',
    focusPoints: [
      'therapeutic_area_alignment',
      'pipeline_gap_analysis',
      'technology_platform_synergy',
      'commercial_infrastructure_fit',
      'geographic_expansion_opportunities',
      'regulatory_expertise_alignment'
    ],
    dataRequirements: [
      'company_therapeutic_focus',
      'pipeline_gaps',
      'recent_deals',
      'strategic_priorities',
      'geographic_presence'
    ]
  },
  
  market_analysis: {
    name: 'Market Analysis',
    focusPoints: [
      'current_market_size',
      'growth_projections',
      'competitive_landscape',
      'pricing_analysis',
      'reimbursement_considerations',
      'geographic_breakdown'
    ],
    dataRequirements: [
      'market_size_data',
      'growth_rates',
      'competitor_analysis',
      'pricing_trends',
      'payer_dynamics'
    ]
  },
  
  clinical_data: {
    name: 'Clinical Data Analysis',
    focusPoints: [
      'clinical_trial_results',
      'safety_profile',
      'efficacy_data',
      'patient_population',
      'clinical_endpoints',
      'comparative_data'
    ],
    dataRequirements: [
      'trial_results',
      'safety_data',
      'efficacy_metrics',
      'patient_demographics',
      'clinical_trial_design'
    ]
  },
  
  financial_metrics: {
    name: 'Financial Analysis',
    focusPoints: [
      'revenue_projections',
      'cost_analysis',
      'profitability_metrics',
      'investment_requirements',
      'roi_analysis',
      'risk_assessment'
    ],
    dataRequirements: [
      'revenue_forecasts',
      'cost_estimates',
      'profitability_data',
      'investment_needs',
      'risk_factors'
    ]
  },
  
  regulatory_pathway: {
    name: 'Regulatory Pathway',
    focusPoints: [
      'regulatory_strategy',
      'approval_timeline',
      'regulatory_risks',
      'designations',
      'submission_requirements',
      'post_approval_obligations'
    ],
    dataRequirements: [
      'regulatory_strategy',
      'timeline_data',
      'risk_assessment',
      'designation_status',
      'submission_requirements'
    ]
  },
  
  competitive_landscape: {
    name: 'Competitive Landscape',
    focusPoints: [
      'direct_competitors',
      'indirect_competitors',
      'competitive_advantages',
      'market_positioning',
      'competitive_response',
      'differentiation_strategy'
    ],
    dataRequirements: [
      'competitor_profiles',
      'market_shares',
      'competitive_advantages',
      'positioning_data',
      'response_strategies'
    ]
  },
  
  supply_chain: {
    name: 'Supply Chain Analysis',
    focusPoints: [
      'manufacturing_capabilities',
      'supplier_relationships',
      'geopolitical_risks',
      'capacity_constraints',
      'quality_control',
      'cost_optimization'
    ],
    dataRequirements: [
      'manufacturing_data',
      'supplier_info',
      'risk_assessment',
      'capacity_data',
      'quality_metrics'
    ]
  },
  
  manufacturing: {
    name: 'Manufacturing Analysis',
    focusPoints: [
      'production_capacity',
      'technology_platforms',
      'quality_systems',
      'regulatory_compliance',
      'cost_structure',
      'scalability'
    ],
    dataRequirements: [
      'capacity_data',
      'technology_info',
      'quality_systems',
      'compliance_data',
      'cost_analysis'
    ]
  },
  
  commercial_strategy: {
    name: 'Commercial Strategy',
    focusPoints: [
      'market_entry_strategy',
      'pricing_strategy',
      'reimbursement_strategy',
      'sales_force_requirements',
      'marketing_strategy',
      'patient_access_programs'
    ],
    dataRequirements: [
      'entry_strategy',
      'pricing_data',
      'reimbursement_info',
      'sales_requirements',
      'marketing_plans'
    ]
  }
}

// Enhanced prompt generation for different research depths
export function generateDepthSpecificPrompt(
  assetData: any,
  researchDepth: ResearchDepth,
  buyerContext: string
): string {
  const config = RESEARCH_DEPTH_CONFIG[researchDepth.level]
  const areas = researchDepth.areas
  
  let prompt = `You are a senior pharmaceutical business development executive with 25+ years of experience in M&A, strategic partnerships, and market analysis. You hold MD, PhD, and MBA degrees with deep expertise in pharmaceutical sciences, clinical development, regulatory affairs, and commercial strategy.

ASSET DETAILS:
- Therapeutic Area: ${assetData.therapeuticArea}
- Indication: ${assetData.indication}
- Target: ${assetData.target}
- Modality: ${assetData.modality}
- Asset Stage: ${assetData.assetStage}

RESEARCH DEPTH LEVEL: ${researchDepth.level.toUpperCase()}
RESEARCH AREAS: ${areas.map(a => a.name).join(', ')}

BUYER CONTEXT:
${buyerContext}

EXPERT ANALYSIS REQUIREMENTS (${researchDepth.level.toUpperCase()} LEVEL):

You must provide analysis at the ${researchDepth.level} level with the following characteristics:

${generateDepthRequirements(researchDepth.level)}

COMPREHENSIVE ANALYSIS AREAS:

${areas.map(area => generateAreaPrompt(area)).join('\n\n')}

CRITICAL EXPERT REQUIREMENTS:

- **Specificity**: Every claim must include specific data points, figures, dates, and sources
- **Currency**: Information must be recent (within 2-3 years) and reflect current market conditions
- **Evidence**: All statements must be supported by verifiable sources and evidence
- **Precision**: Use exact molecular targets, clinical trial identifiers, and regulatory pathways
- **Depth**: Provide multi-layered analysis considering technical, commercial, and strategic dimensions
- **Context**: Frame analysis within broader industry trends and competitive dynamics
- **Actionability**: Provide specific recommendations and next steps
- **Risk Assessment**: Identify potential challenges and mitigation strategies

RESPONSE FORMAT (strict JSON):
${generateResponseFormat(areas)}

If specific data is unavailable, explicitly state "Data unavailable" rather than making assumptions. Focus on providing analysis that would be expected from a senior pharmaceutical executive with decades of industry experience.`

  return prompt
}

// Generate depth-specific requirements
function generateDepthRequirements(level: string): string {
  switch (level) {
    case 'basic':
      return `- Provide fundamental strategic fit analysis
- Include basic market size and competitive overview
- Focus on key decision factors
- Use standard industry metrics and benchmarks`
    
    case 'intermediate':
      return `- Provide detailed strategic and market analysis
- Include clinical data and financial projections
- Analyze competitive positioning
- Consider regulatory pathway implications
- Use specific data points and industry sources`
    
    case 'advanced':
      return `- Provide comprehensive multi-dimensional analysis
- Include detailed clinical, financial, and regulatory analysis
- Deep competitive landscape assessment
- Supply chain and manufacturing considerations
- Use extensive data sources and expert insights
- Provide detailed risk assessment and mitigation strategies`
    
    case 'expert':
      return `- Provide expert-level comprehensive analysis
- Include all aspects: strategic, clinical, financial, regulatory, competitive, operational
- Deep supply chain and manufacturing analysis
- Comprehensive commercial strategy development
- Use extensive data sources, expert interviews, and industry insights
- Provide detailed implementation roadmap and risk mitigation
- Include specific recommendations for business development teams`
    
    default:
      return `- Provide comprehensive analysis appropriate to the research level`
  }
}

// Generate area-specific prompts
function generateAreaPrompt(area: ResearchArea): string {
  const areaConfig = RESEARCH_AREAS[area.name as keyof typeof RESEARCH_AREAS]
  if (!areaConfig) return ''
  
  return `${areaConfig.name} (Depth: ${area.depth}/10, Coverage: ${area.coverage}%)
${areaConfig.focusPoints.map(point => `- ${point}`).join('\n')}
Required data: ${areaConfig.dataRequirements.join(', ')}`
}

// Generate response format based on research areas
function generateResponseFormat(areas: ResearchArea[]): string {
  const baseFormat = {
    buyer: "Company Name",
    rationale: "Detailed strategic rationale with specific evidence and data points",
    confidence_score: 0.8,
    strategic_fit_score: 0.8,
    alternative_buyers: ["Company1", "Company2"]
  }
  
  const areaFormats: Record<string, any> = {
    market_analysis: {
      market_analysis: {
        current_tam: "Specific current TAM size with figures, sources, and methodology",
        projected_tam: "Specific projected market size with years and assumptions",
        cagr: "Specific CAGR with timeframe and methodology",
        geographic_breakdown: "Specific market breakdown by geography with percentages",
        competitive_landscape: "Specific competitive landscape with competitor names and market shares",
        pricing_analysis: "Specific pricing analysis with price ranges and payer dynamics"
      }
    },
    
    clinical_data: {
      clinical_analysis: {
        trial_results: "Specific clinical trial data with endpoints and statistical significance",
        safety_profile: "Detailed safety data with adverse event rates and profiles",
        efficacy_metrics: "Specific efficacy measures with confidence intervals",
        patient_population: "Detailed patient demographics and inclusion criteria",
        comparative_data: "Head-to-head comparison with standard of care"
      }
    },
    
    financial_metrics: {
      financial_analysis: {
        revenue_projections: "Specific revenue forecasts with assumptions and methodology",
        cost_analysis: "Detailed cost breakdown including development and commercialization",
        profitability_metrics: "Specific profitability measures and break-even analysis",
        investment_requirements: "Detailed investment needs and funding requirements",
        roi_analysis: "Specific ROI calculations with timeframes and assumptions"
      }
    },
    
    regulatory_pathway: {
      regulatory_analysis: {
        approval_strategy: "Specific regulatory strategy with timeline and milestones",
        regulatory_risks: "Detailed risk assessment with mitigation strategies",
        designations: "Specific regulatory designations and their implications",
        submission_requirements: "Detailed submission requirements and timelines",
        post_approval_obligations: "Specific post-approval requirements and commitments"
      }
    },
    
    competitive_landscape: {
      competitive_analysis: {
        direct_competitors: "Specific direct competitors with market positions",
        competitive_advantages: "Detailed competitive advantages and differentiation",
        market_positioning: "Specific positioning strategy and value proposition",
        competitive_response: "Expected competitive responses and counter-strategies"
      }
    },
    
    supply_chain: {
      supply_chain_analysis: {
        manufacturing_capabilities: "Specific manufacturing capabilities and capacity",
        supplier_relationships: "Detailed supplier network and dependencies",
        geopolitical_risks: "Specific geopolitical risks and mitigation strategies",
        quality_control: "Detailed quality control systems and processes"
      }
    },
    
    manufacturing: {
      manufacturing_analysis: {
        production_capacity: "Specific production capacity and scalability",
        technology_platforms: "Detailed technology platforms and capabilities",
        quality_systems: "Specific quality systems and regulatory compliance",
        cost_structure: "Detailed cost structure and optimization opportunities"
      }
    },
    
    commercial_strategy: {
      commercial_analysis: {
        market_entry_strategy: "Specific market entry strategy and timeline",
        pricing_strategy: "Detailed pricing strategy and reimbursement approach",
        sales_force_requirements: "Specific sales force requirements and structure",
        marketing_strategy: "Detailed marketing strategy and patient access programs"
      }
    }
  }
  
  // Build complete format
  let completeFormat = { ...baseFormat }
  
  areas.forEach(area => {
    const areaFormat = areaFormats[area.name]
    if (areaFormat) {
      Object.assign(completeFormat, areaFormat)
    }
  })
  
  return JSON.stringify(completeFormat, null, 2)
}

// Research depth assessment
export function assessResearchDepth(
  assetData: any,
  buyerProfiles: any[]
): ResearchDepth {
  // Determine complexity based on asset characteristics
  let complexity = 0
  
  // Therapeutic area complexity
  const complexAreas = ['oncology', 'neurology', 'rare diseases']
  if (complexAreas.includes(assetData.therapeuticArea.toLowerCase())) {
    complexity += 2
  }
  
  // Asset stage complexity
  if (assetData.assetStage.includes('phase 1')) {
    complexity += 1
  } else if (assetData.assetStage.includes('phase 2')) {
    complexity += 2
  } else if (assetData.assetStage.includes('phase 3')) {
    complexity += 3
  }
  
  // Modality complexity
  const complexModalities = ['cell therapy', 'gene therapy', 'antibody-drug conjugate']
  if (complexModalities.some(mod => assetData.modality.toLowerCase().includes(mod))) {
    complexity += 2
  }
  
  // Determine research level based on complexity
  let level: 'basic' | 'intermediate' | 'advanced' | 'expert'
  if (complexity <= 3) {
    level = 'basic'
  } else if (complexity <= 5) {
    level = 'intermediate'
  } else if (complexity <= 7) {
    level = 'advanced'
  } else {
    level = 'expert'
  }
  
  // Define research areas based on level
  const config = RESEARCH_DEPTH_CONFIG[level]
  const areas: ResearchArea[] = config.areas.map(areaName => ({
    name: areaName,
    depth: Math.min(10, complexity + Math.floor(Math.random() * 3)),
    coverage: Math.min(100, 70 + Math.floor(Math.random() * 30)),
    sources: [],
    insights: [],
    gaps: []
  }))
  
  return {
    level,
    areas,
    confidence: Math.min(1.0, 0.6 + complexity * 0.1),
    completeness: Math.min(1.0, 0.5 + complexity * 0.15),
    specificity: Math.min(1.0, 0.4 + complexity * 0.2)
  }
}

// Quality assessment for research outputs
export function assessResearchQuality(
  response: any,
  researchDepth: ResearchDepth
): {
  quality: number
  areas: Record<string, number>
  recommendations: string[]
} {
  const areas: Record<string, number> = {}
  const recommendations: string[] = []
  let totalQuality = 0
  
  // Assess each research area
  researchDepth.areas.forEach(area => {
    let areaQuality = 0
    
    // Check for area-specific content
    const areaContent = response[`${area.name}_analysis`] || response[area.name] || {}
    
    // Assess specificity
    const hasSpecificData = JSON.stringify(areaContent).match(/(\d+\.?\d*%?|\$\d+|\d{4})/g)
    if (hasSpecificData) {
      areaQuality += 0.3
    } else {
      recommendations.push(`Add specific data points to ${area.name} analysis`)
    }
    
    // Assess completeness
    const requiredFields = RESEARCH_AREAS[area.name as keyof typeof RESEARCH_AREAS]?.focusPoints || []
    const coveredFields = requiredFields.filter(field => 
      JSON.stringify(areaContent).toLowerCase().includes(field.toLowerCase())
    ).length
    
    const completeness = coveredFields / requiredFields.length
    areaQuality += completeness * 0.4
    
    if (completeness < 0.7) {
      recommendations.push(`Improve coverage of ${area.name} focus points`)
    }
    
    // Assess depth
    const contentLength = JSON.stringify(areaContent).length
    const expectedLength = researchDepth.level === 'expert' ? 1000 : 
                          researchDepth.level === 'advanced' ? 700 :
                          researchDepth.level === 'intermediate' ? 500 : 300
    
    if (contentLength >= expectedLength) {
      areaQuality += 0.3
    } else {
      recommendations.push(`Increase depth of ${area.name} analysis`)
    }
    
    areas[area.name] = areaQuality
    totalQuality += areaQuality
  })
  
  const overallQuality = totalQuality / researchDepth.areas.length
  
  return {
    quality: overallQuality,
    areas,
    recommendations
  }
} 