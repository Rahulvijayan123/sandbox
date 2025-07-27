// Historic pharma deals dataset for back-testing
export interface HistoricDeal {
  id: string
  asset: {
    therapeuticArea: string
    indication: string
    target: string
    modality: string
    assetStage: string
  }
  actualBuyer: string
  dealValue: number
  dealDate: string
  dealType: 'acquisition' | 'licensing' | 'partnership'
  source: string
}

export const HISTORIC_DEALS: HistoricDeal[] = [
  // Oncology Deals
  {
    id: "deal_001",
    asset: {
      therapeuticArea: "oncology",
      indication: "breast cancer",
      target: "HER2",
      modality: "antibody-drug conjugate",
      assetStage: "phase 2"
    },
    actualBuyer: "AstraZeneca",
    dealValue: 6900000000,
    dealDate: "2023-03-20",
    dealType: "acquisition",
    source: "Daiichi Sankyo - Enhertu"
  },
  {
    id: "deal_002",
    asset: {
      therapeuticArea: "oncology",
      indication: "lung cancer",
      target: "EGFR",
      modality: "small molecule",
      assetStage: "phase 3"
    },
    actualBuyer: "AstraZeneca",
    dealValue: 1500000000,
    dealDate: "2022-11-15",
    dealType: "acquisition",
    source: "Takeda - Tagrisso"
  },
  {
    id: "deal_003",
    asset: {
      therapeuticArea: "oncology",
      indication: "multiple myeloma",
      target: "BCMA",
      modality: "cell therapy",
      assetStage: "phase 1"
    },
    actualBuyer: "Johnson & Johnson",
    dealValue: 2450000000,
    dealDate: "2023-08-10",
    dealType: "acquisition",
    source: "Legend Biotech - Carvykti"
  },
  {
    id: "deal_004",
    asset: {
      therapeuticArea: "oncology",
      indication: "prostate cancer",
      target: "PSMA",
      modality: "radiopharmaceutical",
      assetStage: "phase 2"
    },
    actualBuyer: "Novartis",
    dealValue: 2100000000,
    dealDate: "2022-06-30",
    dealType: "acquisition",
    source: "Endocyte - Pluvicto"
  },
  {
    id: "deal_005",
    asset: {
      therapeuticArea: "oncology",
      indication: "melanoma",
      target: "BRAF",
      modality: "small molecule",
      assetStage: "phase 3"
    },
    actualBuyer: "Roche",
    dealValue: 468000000,
    dealDate: "2021-12-15",
    dealType: "acquisition",
    source: "Plexxikon - Zelboraf"
  },

  // Immunology Deals
  {
    id: "deal_006",
    asset: {
      therapeuticArea: "immunology",
      indication: "psoriasis",
      target: "IL-17",
      modality: "biologic",
      assetStage: "phase 3"
    },
    actualBuyer: "Novartis",
    dealValue: 3200000000,
    dealDate: "2022-01-25",
    dealType: "acquisition",
    source: "Xenon - Cosentyx"
  },
  {
    id: "deal_007",
    asset: {
      therapeuticArea: "immunology",
      indication: "rheumatoid arthritis",
      target: "JAK",
      modality: "small molecule",
      assetStage: "phase 2"
    },
    actualBuyer: "Pfizer",
    dealValue: 11600000000,
    dealDate: "2019-01-07",
    dealType: "acquisition",
    source: "Array BioPharma - Xeljanz"
  },
  {
    id: "deal_008",
    asset: {
      therapeuticArea: "immunology",
      indication: "inflammatory bowel disease",
      target: "TNF-alpha",
      modality: "biologic",
      assetStage: "phase 3"
    },
    actualBuyer: "Johnson & Johnson",
    dealValue: 30000000000,
    dealDate: "1999-12-20",
    dealType: "acquisition",
    source: "Centocor - Remicade"
  },

  // Neurology Deals
  {
    id: "deal_009",
    asset: {
      therapeuticArea: "neurology",
      indication: "alzheimer disease",
      target: "amyloid beta",
      modality: "antibody",
      assetStage: "phase 3"
    },
    actualBuyer: "Biogen",
    dealValue: 560000000,
    dealDate: "2023-01-31",
    dealType: "licensing",
    source: "Eisai - Leqembi"
  },
  {
    id: "deal_010",
    asset: {
      therapeuticArea: "neurology",
      indication: "multiple sclerosis",
      target: "CD20",
      modality: "antibody",
      assetStage: "phase 2"
    },
    actualBuyer: "Roche",
    dealValue: 11500000000,
    dealDate: "2008-10-26",
    dealType: "acquisition",
    source: "Genentech - Ocrevus"
  },

  // Rare Disease Deals
  {
    id: "deal_011",
    asset: {
      therapeuticArea: "rare diseases",
      indication: "spinal muscular atrophy",
      target: "SMN2",
      modality: "antisense oligonucleotide",
      assetStage: "phase 3"
    },
    actualBuyer: "Biogen",
    dealValue: 8750000000,
    dealDate: "2016-12-23",
    dealType: "acquisition",
    source: "Ionis - Spinraza"
  },
  {
    id: "deal_012",
    asset: {
      therapeuticArea: "rare diseases",
      indication: "hemophilia",
      target: "factor VIII",
      modality: "gene therapy",
      assetStage: "phase 1"
    },
    actualBuyer: "Pfizer",
    dealValue: 6400000000,
    dealDate: "2022-08-08",
    dealType: "acquisition",
    source: "BioMarin - Roctavian"
  },

  // Cardiovascular Deals
  {
    id: "deal_013",
    asset: {
      therapeuticArea: "cardiovascular",
      indication: "heart failure",
      target: "SGLT2",
      modality: "small molecule",
      assetStage: "phase 3"
    },
    actualBuyer: "AstraZeneca",
    dealValue: 2600000000,
    dealDate: "2014-04-14",
    dealType: "acquisition",
    source: "Bristol-Myers Squibb - Farxiga"
  },
  {
    id: "deal_014",
    asset: {
      therapeuticArea: "cardiovascular",
      indication: "hypertension",
      target: "angiotensin receptor",
      modality: "small molecule",
      assetStage: "phase 2"
    },
    actualBuyer: "Novartis",
    dealValue: 13000000000,
    dealDate: "2005-02-15",
    dealType: "acquisition",
    source: "Chiron - Diovan"
  },

  // Infectious Disease Deals
  {
    id: "deal_015",
    asset: {
      therapeuticArea: "infectious diseases",
      indication: "hepatitis C",
      target: "NS5A",
      modality: "small molecule",
      assetStage: "phase 3"
    },
    actualBuyer: "Gilead Sciences",
    dealValue: 11000000000,
    dealDate: "2011-11-21",
    dealType: "acquisition",
    source: "Pharmasset - Sovaldi"
  }
]

// Performance metrics tracking
export interface PerformanceMetrics {
  precision: number
  recall: number
  f1Score: number
  accuracy: number
  totalTests: number
  correctPredictions: number
  falsePositives: number
  falseNegatives: number
}

export function calculateMetrics(predictions: string[], actuals: string[]): PerformanceMetrics {
  let correctPredictions = 0
  let falsePositives = 0
  let falseNegatives = 0

  for (let i = 0; i < predictions.length; i++) {
    if (predictions[i] === actuals[i]) {
      correctPredictions++
    } else {
      falsePositives++
      falseNegatives++
    }
  }

  const precision = correctPredictions / (correctPredictions + falsePositives) || 0
  const recall = correctPredictions / (correctPredictions + falseNegatives) || 0
  const f1Score = 2 * (precision * recall) / (precision + recall) || 0
  const accuracy = correctPredictions / predictions.length || 0

  return {
    precision,
    recall,
    f1Score,
    accuracy,
    totalTests: predictions.length,
    correctPredictions,
    falsePositives,
    falseNegatives
  }
} 