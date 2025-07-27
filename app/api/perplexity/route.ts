import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { recordAPIMetric } from '@/lib/performance-monitor'
import { enrichAssetData, calculateDataQualityScore } from '@/lib/enhanced-data-validation'
import { runEnsembleAnalysis, validateModelResponse } from '@/lib/ensemble-model-system'
import { assessResearchDepth, generateDepthSpecificPrompt, assessResearchQuality } from '@/lib/research-depth-enhancer'
import { generateEnhancedPrompt, validateEnhancedResponse, DEFAULT_ENHANCED_CONFIG } from '@/lib/enhanced-prompt-engine'
import { processEnhancedResponse } from '@/lib/enhanced-openai-validator'

// Schema for input validation
const InputSchema = z.object({
  therapeuticArea: z.string().min(1, "Therapeutic area is required"),
  indication: z.string().min(1, "Indication is required"),
  target: z.string().min(1, "Target is required"),
  modality: z.string().min(1, "Modality is required"),
  assetStage: z.string().min(1, "Asset stage is required")
})

// Schema for LLM response validation
const ResponseSchema = z.object({
  buyer: z.string().optional(),
  rationale: z.string().optional(),
  confidence_score: z.number().optional(),
  strategic_fit_score: z.number().optional(),
  alternative_buyers: z.array(z.string()).optional(),
  revenue_performance: z.object({
    recent_revenue: z.string().optional(),
    growth_trends: z.string().optional(),
    market_position: z.string().optional()
  }).optional(),
  scientific_capabilities: z.object({
    research_infrastructure: z.string().optional(),
    key_metrics: z.object({
      patents_filed: z.string().optional(),
      active_trials: z.string().optional(),
      fda_approvals: z.string().optional(),
      publications: z.string().optional()
    }).optional(),
    technology_platforms: z.string().optional()
  }).optional(),
  deal_activity: z.object({
    recent_deals: z.string().optional(),
    partnerships: z.string().optional(),
    investment_focus: z.string().optional()
  }).optional(),
  regulatory_status: z.object({
    clinical_phase: z.string().optional(),
    fda_submissions: z.string().optional(),
    ema_submissions: z.string().optional(),
    designations: z.string().optional(),
    milestones: z.string().optional()
  }).optional(),
  supply_chain_risk: z.object({
    geopolitical_exposure: z.string().optional(),
    api_dependencies: z.string().optional(),
    cmo_risks: z.string().optional(),
    historical_disruptions: z.string().optional(),
    manufacturing_capacity: z.string().optional(),
    raw_material_sourcing: z.string().optional()
  }).optional(),
  market_analysis: z.object({
    current_tam: z.string().optional(),
    projected_tam: z.string().optional(),
    cagr: z.string().optional(),
    geographic_breakdown: z.string().optional(),
    competitive_landscape: z.string().optional(),
    pricing_analysis: z.string().optional()
  }).optional()
})

type InputData = z.infer<typeof InputSchema>
type ResponseData = z.infer<typeof ResponseSchema>

// Comprehensive target normalization with extensive pharmaceutical target mapping
function normalizeTarget(target: string): string {
  const targetMap: Record<string, string> = {
    // Oncology Targets
    'HER2': 'ERBB2', 'HER2/NEU': 'ERBB2',
    'EGFR': 'ERBB1', 'HER1': 'ERBB1',
    'VEGF': 'VEGFA', 'VEGF-A': 'VEGFA',
    'PD-1': 'PDCD1', 'PD1': 'PDCD1',
    'PD-L1': 'CD274', 'PDL1': 'CD274',
    'CTLA-4': 'CTLA4',
    'BRAF': 'BRAF', 'BRAF V600E': 'BRAF',
    'ALK': 'ALK', 'ALK1': 'ALK',
    'ROS1': 'ROS1', 'ROS-1': 'ROS1',
    'NTRK': 'NTRK1', 'TRKA': 'NTRK1',
    'BCMA': 'TNFRSF17', 'CD269': 'TNFRSF17',
    'GPRC5D': 'GPRC5D',
    'CD20': 'MS4A1',
    'CD19': 'CD19',
    'CD38': 'CD38',
    'CD33': 'CD33',
    'CD123': 'IL3RA',
    'CD22': 'CD22',
    'CD30': 'TNFRSF8',
    'CD79B': 'CD79B',
    'TROP2': 'TACSTD2',
    'NECTIN4': 'NECTIN4',
    'PSMA': 'FOLH1', 'GCPII': 'FOLH1',
    'SSTR2': 'SSTR2',
    'SSTR5': 'SSTR5',
    
    // Immunology Targets
    'TNF': 'TNF', 'TNF-ALPHA': 'TNF', 'TNFΑ': 'TNF',
    'IL-6': 'IL6', 'INTERLEUKIN-6': 'IL6',
    'IL-17': 'IL17A', 'IL-17A': 'IL17A',
    'IL-23': 'IL23A', 'IL23': 'IL23A',
    'IL-12': 'IL12A', 'IL12': 'IL12A',
    'IL-1': 'IL1B', 'IL-1BETA': 'IL1B',
    'JAK': 'JAK1', 'JAK-1': 'JAK1',
    'JAK2': 'JAK2', 'JAK-2': 'JAK2',
    'JAK3': 'JAK3', 'JAK-3': 'JAK3',
    'BTK': 'BTK', 'BRUTON TYROSINE KINASE': 'BTK',
    'BCL-2': 'BCL2',
    'BCL-XL': 'BCL2L1', 'BCL-X': 'BCL2L1',
    'MCL-1': 'MCL1',
    'CD40': 'CD40', 'TNFRSF5': 'CD40',
    'CD40L': 'CD40LG', 'TNFSF5': 'CD40LG',
    'OX40': 'TNFRSF4', 'CD134': 'TNFRSF4',
    'OX40L': 'TNFSF4', 'CD252': 'TNFSF4',
    '4-1BB': 'TNFRSF9', 'CD137': 'TNFRSF9',
    '4-1BBL': 'TNFSF9', 'CD137L': 'TNFSF9',
    'GITR': 'TNFRSF18', 'CD357': 'TNFRSF18',
    'GITRL': 'TNFSF18', 'CD357L': 'TNFSF18',
    'LAG3': 'LAG3', 'CD223': 'LAG3',
    'TIM3': 'HAVCR2', 'CD366': 'HAVCR2',
    'TIGIT': 'TIGIT', 'CD155': 'TIGIT',
    'VISTA': 'VSIR', 'PD-1H': 'VSIR',
    'B7-H3': 'CD276', 'B7H3': 'CD276',
    'B7-H4': 'VTCN1', 'B7H4': 'VTCN1',
    
    // Neurology Targets
    'AMYLOD': 'APP', 'AMYLOID PRECURSOR PROTEIN': 'APP',
    'TAU': 'MAPT', 'TAU PROTEIN': 'MAPT',
    'ALPHA-SYNUCLEIN': 'SNCA', 'Α-SYNUCLEIN': 'SNCA',
    'HUNTINGTIN': 'HTT', 'HUNTINGTIN PROTEIN': 'HTT',
    'SOD1': 'SOD1', 'SUPEROXIDE DISMUTASE 1': 'SOD1',
    'TDP-43': 'TARDBP', 'TAR DNA-BINDING PROTEIN 43': 'TARDBP',
    'FUS': 'FUS', 'FUSED IN SARCOMA': 'FUS',
    'C9ORF72': 'C9ORF72', 'CHROMOSOME 9 OPEN READING FRAME 72': 'C9ORF72',
    'SMN1': 'SMN1', 'SURVIVAL OF MOTOR NEURON 1': 'SMN1',
    'SMN2': 'SMN2', 'SURVIVAL OF MOTOR NEURON 2': 'SMN2',
    'DMD': 'DMD', 'DYSTROPHIN': 'DMD',
    'CFTR': 'CFTR', 'CYSTIC FIBROSIS TRANSMEMBRANE CONDUCTANCE REGULATOR': 'CFTR',
    
    // Rare Disease Targets
    'FACTOR VIII': 'F8', 'COAGULATION FACTOR VIII': 'F8',
    'FACTOR IX': 'F9', 'COAGULATION FACTOR IX': 'F9',
    'FACTOR VII': 'F7', 'COAGULATION FACTOR VII': 'F7',
    'FACTOR X': 'F10', 'COAGULATION FACTOR X': 'F10',
    'VON WILLEBRAND FACTOR': 'VWF',
    'ALPHA-1 ANTITRYPSIN': 'SERPINA1', 'A1AT': 'SERPINA1',
    'LYSOSOMAL ACID LIPASE': 'LIPA', 'LAL': 'LIPA',
    'ACID SPHINGOMYELINASE': 'SMPD1', 'ASM': 'SMPD1',
    'GLUCOSYLCERAMIDASE': 'GBA1', 'GLUCOSYLCERAMIDASE BETA 1': 'GBA1',
    'IDURONATE-2-SULFATASE': 'IDS', 'IDURONATE 2-SULFATASE': 'IDS',
    'ALPHA-GALACTOSIDASE A': 'GLA', 'GALACTOSIDASE ALPHA': 'GLA',
    'ALPHA-L-IDURONIDASE': 'IDUA', 'IDURONIDASE': 'IDUA',
    'BETA-GLUCURONIDASE': 'GUSB', 'GLUCURONIDASE BETA': 'GUSB',
    'ARYLSULFATASE B': 'ARSB', 'N-ACETYLGALACTOSAMINE-4-SULFATASE': 'ARSB',
    
    // Cardiovascular Targets
    'PCSK9': 'PCSK9', 'PROPROTEIN CONVERTASE SUBTILISIN/KEXIN TYPE 9': 'PCSK9',
    'SGLT2': 'SLC5A2', 'SODIUM-GLUCOSE COTRANSPORTER 2': 'SLC5A2',
    'SGLT1': 'SLC5A1', 'SODIUM-GLUCOSE COTRANSPORTER 1': 'SLC5A1',
    'ANGIOTENSIN II': 'AGT', 'ANGIOTENSINOGEN': 'AGT',
    'RENIN': 'REN',
    'ACE': 'ACE', 'ANGIOTENSIN I CONVERTING ENZYME': 'ACE',
    'AT1R': 'AGTR1', 'ANGIOTENSIN II RECEPTOR TYPE 1': 'AGTR1',
    'AT2R': 'AGTR2', 'ANGIOTENSIN II RECEPTOR TYPE 2': 'AGTR2',
    'ALDOSTERONE': 'CYP11B2', 'ALDOSTERONE SYNTHASE': 'CYP11B2',
    'MINERALOCORTICOID RECEPTOR': 'NR3C2', 'MR': 'NR3C2',
    
    // Infectious Disease Targets
    'NS5A': 'NS5A', 'NONSTRUCTURAL PROTEIN 5A': 'NS5A',
    'NS5B': 'NS5B', 'NONSTRUCTURAL PROTEIN 5B': 'NS5B',
    'NS3': 'NS3', 'NONSTRUCTURAL PROTEIN 3': 'NS3',
    'NS4A': 'NS4A', 'NONSTRUCTURAL PROTEIN 4A': 'NS4A',
    'NS4B': 'NS4B', 'NONSTRUCTURAL PROTEIN 4B': 'NS4B',
    'CORE': 'CORE', 'CORE PROTEIN': 'CORE',
    'E1': 'E1', 'ENVELOPE PROTEIN 1': 'E1',
    'E2': 'E2', 'ENVELOPE PROTEIN 2': 'E2',
    'INTEGRASE': 'INT', 'HIV INTEGRASE': 'INT',
    'PROTEASE': 'PRO', 'HIV PROTEASE': 'PRO',
    'REVERSE TRANSCRIPTASE': 'RT', 'HIV RT': 'RT',
    'CCR5': 'CCR5', 'C-C CHEMOKINE RECEPTOR TYPE 5': 'CCR5',
    'CXCR4': 'CXCR4', 'C-X-C CHEMOKINE RECEPTOR TYPE 4': 'CXCR4',
    'CD4': 'CD4', 'CD4 MOLECULE': 'CD4',
    'GP120': 'ENV', 'ENVELOPE GLYCOPROTEIN 120': 'ENV',
    'GP41': 'ENV', 'ENVELOPE GLYCOPROTEIN 41': 'ENV',
    'SPIKE': 'S', 'SPIKE GLYCOPROTEIN': 'S',
    'M PROTEIN': 'M', 'MEMBRANE PROTEIN': 'M',
    'N PROTEIN': 'N', 'NUCLEOCAPSID PROTEIN': 'N',
    'E PROTEIN': 'E', 'ENVELOPE PROTEIN': 'E',
    'ORF1AB': 'ORF1AB', 'OPEN READING FRAME 1AB': 'ORF1AB',
    'ORF3A': 'ORF3A', 'OPEN READING FRAME 3A': 'ORF3A',
    'ORF6': 'ORF6', 'OPEN READING FRAME 6': 'ORF6',
    'ORF7A': 'ORF7A', 'OPEN READING FRAME 7A': 'ORF7A',
    'ORF8': 'ORF8', 'OPEN READING FRAME 8': 'ORF8',
    'ORF10': 'ORF10', 'OPEN READING FRAME 10': 'ORF10'
  }
  return targetMap[target.toUpperCase()] || target
}

// Comprehensive indication validation with extensive pharmaceutical indication coverage
const VALID_INDICATIONS = new Set([
  // Oncology - Solid Tumors
  'breast cancer', 'early breast cancer', 'metastatic breast cancer', 'triple negative breast cancer',
  'her2 positive breast cancer', 'hormone receptor positive breast cancer', 'inflammatory breast cancer',
  'lung cancer', 'non-small cell lung cancer', 'small cell lung cancer', 'squamous cell lung cancer',
  'adenocarcinoma of lung', 'large cell lung cancer', 'mesothelioma',
  'prostate cancer', 'metastatic castration-resistant prostate cancer', 'castration-sensitive prostate cancer',
  'colorectal cancer', 'colon cancer', 'rectal cancer', 'metastatic colorectal cancer',
  'melanoma', 'cutaneous melanoma', 'metastatic melanoma', 'uveal melanoma', 'mucosal melanoma',
  'ovarian cancer', 'epithelial ovarian cancer', 'fallopian tube cancer', 'primary peritoneal cancer',
  'pancreatic cancer', 'pancreatic adenocarcinoma', 'pancreatic neuroendocrine tumors',
  'gastric cancer', 'gastroesophageal junction cancer', 'esophageal cancer',
  'bladder cancer', 'urothelial carcinoma', 'muscle-invasive bladder cancer',
  'kidney cancer', 'renal cell carcinoma', 'clear cell renal cell carcinoma',
  'liver cancer', 'hepatocellular carcinoma', 'cholangiocarcinoma',
  'brain cancer', 'glioblastoma', 'anaplastic astrocytoma', 'oligodendroglioma',
  'head and neck cancer', 'squamous cell carcinoma of head and neck',
  'cervical cancer', 'endometrial cancer', 'uterine cancer',
  'thyroid cancer', 'papillary thyroid cancer', 'follicular thyroid cancer',
  'sarcoma', 'soft tissue sarcoma', 'osteosarcoma', 'ewing sarcoma',
  'neuroblastoma', 'retinoblastoma', 'wilms tumor',
  
  // Oncology - Hematological Malignancies
  'multiple myeloma', 'relapsed multiple myeloma', 'refractory multiple myeloma',
  'leukemia', 'acute myeloid leukemia', 'acute lymphoblastic leukemia',
  'chronic myeloid leukemia', 'chronic lymphocytic leukemia',
  'lymphoma', 'hodgkin lymphoma', 'non-hodgkin lymphoma',
  'diffuse large b-cell lymphoma', 'follicular lymphoma', 'mantle cell lymphoma',
  'marginal zone lymphoma', 'burkitt lymphoma', 't-cell lymphoma',
  'myelodysplastic syndromes', 'myeloproliferative neoplasms',
  'polycythemia vera', 'essential thrombocythemia', 'myelofibrosis',
  
  // Neurology
  'alzheimer disease', 'early alzheimer disease', 'mild cognitive impairment',
  'parkinson disease', 'parkinson disease dementia', 'dementia with lewy bodies',
  'multiple sclerosis', 'relapsing-remitting multiple sclerosis', 'progressive multiple sclerosis',
  'amyotrophic lateral sclerosis', 'primary lateral sclerosis', 'progressive muscular atrophy',
  'huntington disease', 'spinal muscular atrophy', 'duchenne muscular dystrophy',
  'becker muscular dystrophy', 'myotonic dystrophy', 'facioscapulohumeral muscular dystrophy',
  'limb-girdle muscular dystrophy', 'congenital muscular dystrophy',
  'epilepsy', 'focal epilepsy', 'generalized epilepsy', 'dravet syndrome',
  'lennox-gastaut syndrome', 'tuberous sclerosis complex',
  'autism spectrum disorder', 'attention deficit hyperactivity disorder',
  'schizophrenia', 'bipolar disorder', 'major depressive disorder',
  'migraine', 'cluster headache', 'tension headache',
  'stroke', 'ischemic stroke', 'hemorrhagic stroke', 'transient ischemic attack',
  'traumatic brain injury', 'concussion', 'chronic traumatic encephalopathy',
  
  // Immunology & Autoimmune
  'rheumatoid arthritis', 'juvenile idiopathic arthritis', 'psoriatic arthritis',
  'ankylosing spondylitis', 'systemic lupus erythematosus', 'lupus nephritis',
  'psoriasis', 'plaque psoriasis', 'palmoplantar psoriasis', 'nail psoriasis',
  'inflammatory bowel disease', 'crohn disease', 'ulcerative colitis',
  'celiac disease', 'eosinophilic esophagitis', 'atopic dermatitis',
  'systemic sclerosis', 'scleroderma', 'sjogren syndrome',
  'vasculitis', 'giant cell arteritis', 'granulomatosis with polyangiitis',
  'eosinophilic granulomatosis with polyangiitis', 'microscopic polyangiitis',
  'behcet disease', 'sarcoidosis', 'primary biliary cholangitis',
  'primary sclerosing cholangitis', 'autoimmune hepatitis',
  'myasthenia gravis', 'guillain-barre syndrome', 'chronic inflammatory demyelinating polyneuropathy',
  'multiple sclerosis', 'neuromyelitis optica', 'myelin oligodendrocyte glycoprotein antibody disease',
  
  // Metabolic & Cardiovascular
  'diabetes', 'type 1 diabetes', 'type 2 diabetes', 'gestational diabetes',
  'diabetic nephropathy', 'diabetic retinopathy', 'diabetic neuropathy',
  'obesity', 'morbid obesity', 'metabolic syndrome',
  'hypertension', 'resistant hypertension', 'pulmonary hypertension',
  'heart failure', 'heart failure with reduced ejection fraction', 'heart failure with preserved ejection fraction',
  'atherosclerosis', 'coronary artery disease', 'peripheral artery disease',
  'dyslipidemia', 'hypercholesterolemia', 'familial hypercholesterolemia',
  'hypertriglyceridemia', 'metabolic dysfunction-associated steatohepatitis',
  'non-alcoholic fatty liver disease', 'alcoholic liver disease',
  
  // Infectious Diseases
  'hepatitis c', 'hepatitis b', 'hepatitis a', 'hepatitis d', 'hepatitis e',
  'hiv', 'aids', 'hiv infection', 'opportunistic infections',
  'tuberculosis', 'multidrug-resistant tuberculosis', 'extensively drug-resistant tuberculosis',
  'malaria', 'plasmodium falciparum malaria', 'plasmodium vivax malaria',
  'covid-19', 'sars-cov-2 infection', 'long covid', 'post-acute sequelae of covid-19',
  'influenza', 'respiratory syncytial virus', 'cytomegalovirus',
  'herpes simplex virus', 'varicella zoster virus', 'epstein-barr virus',
  'human papillomavirus', 'hepatitis delta virus', 'dengue virus',
  'ebola virus', 'zika virus', 'west nile virus',
  
  // Rare Diseases
  'hemophilia', 'hemophilia a', 'hemophilia b', 'hemophilia c',
  'von willebrand disease', 'factor vii deficiency', 'factor x deficiency',
  'sickle cell disease', 'sickle cell anemia', 'beta thalassemia',
  'alpha thalassemia', 'cystic fibrosis', 'gaucher disease',
  'fabry disease', 'pompe disease', 'mucopolysaccharidosis',
  'hunter syndrome', 'hurler syndrome', 'sanfilippo syndrome',
  'morquio syndrome', 'maroteaux-lamy syndrome', 'sly syndrome',
  'niemann-pick disease', 'tay-sachs disease', 'sandhoff disease',
  'krabbe disease', 'metachromatic leukodystrophy', 'adrenoleukodystrophy',
  'phenylketonuria', 'maple syrup urine disease', 'homocystinuria',
  'urea cycle disorders', 'ornithine transcarbamylase deficiency',
  'citrullinemia', 'argininosuccinic aciduria', 'argininemia',
  'lysosomal acid lipase deficiency', 'acid sphingomyelinase deficiency',
  'alpha-1 antitrypsin deficiency', 'primary ciliary dyskinesia',
  'primary immunodeficiency', 'severe combined immunodeficiency',
  'chronic granulomatous disease', 'wiskott-aldrich syndrome',
  'x-linked agammaglobulinemia', 'common variable immunodeficiency',
  'hyper-igm syndrome', 'digeorge syndrome', 'ataxia telangiectasia',
  
  // Ophthalmology
  'age-related macular degeneration', 'wet age-related macular degeneration',
  'dry age-related macular degeneration', 'diabetic macular edema',
  'retinal vein occlusion', 'branch retinal vein occlusion', 'central retinal vein occlusion',
  'retinal artery occlusion', 'branch retinal artery occlusion', 'central retinal artery occlusion',
  'glaucoma', 'open-angle glaucoma', 'angle-closure glaucoma',
  'retinitis pigmentosa', 'leber congenital amaurosis', 'stargardt disease',
  'best disease', 'choroideremia', 'achromatopsia',
  'color blindness', 'red-green color blindness', 'blue-yellow color blindness',
  'cataracts', 'congenital cataracts', 'traumatic cataracts',
  'uveitis', 'anterior uveitis', 'intermediate uveitis', 'posterior uveitis',
  'panuveitis', 'behcet uveitis', 'vogt-koyanagi-harada syndrome',
  
  // Respiratory
  'asthma', 'severe asthma', 'eosinophilic asthma', 'allergic asthma',
  'chronic obstructive pulmonary disease', 'emphysema', 'chronic bronchitis',
  'idiopathic pulmonary fibrosis', 'pulmonary arterial hypertension',
  'cystic fibrosis', 'primary ciliary dyskinesia', 'alpha-1 antitrypsin deficiency',
  'bronchiectasis', 'sarcoidosis', 'pulmonary embolism',
  'pneumonia', 'community-acquired pneumonia', 'hospital-acquired pneumonia',
  'ventilator-associated pneumonia', 'tuberculosis', 'nontuberculous mycobacterial infection',
  
  // Dermatology
  'psoriasis', 'plaque psoriasis', 'palmoplantar psoriasis', 'nail psoriasis',
  'scalp psoriasis', 'inverse psoriasis', 'guttate psoriasis',
  'pustular psoriasis', 'erythrodermic psoriasis', 'psoriatic arthritis',
  'atopic dermatitis', 'contact dermatitis', 'seborrheic dermatitis',
  'acne vulgaris', 'acne rosacea', 'hidradenitis suppurativa',
  'vitiligo', 'alopecia areata', 'androgenetic alopecia',
  'melanoma', 'cutaneous melanoma', 'metastatic melanoma',
  'basal cell carcinoma', 'squamous cell carcinoma', 'merkel cell carcinoma',
  'cutaneous t-cell lymphoma', 'mycosis fungoides', 'sezary syndrome',
  
  // Nephrology
  'chronic kidney disease', 'end-stage renal disease', 'acute kidney injury',
  'diabetic nephropathy', 'lupus nephritis', 'iga nephropathy',
  'focal segmental glomerulosclerosis', 'membranous nephropathy',
  'minimal change disease', 'membranoproliferative glomerulonephritis',
  'polycystic kidney disease', 'autosomal dominant polycystic kidney disease',
  'autosomal recessive polycystic kidney disease', 'alport syndrome',
  'fabry disease', 'cystinosis', 'primary hyperoxaluria',
  
  // Endocrinology
  'diabetes', 'type 1 diabetes', 'type 2 diabetes', 'gestational diabetes',
  'diabetic ketoacidosis', 'hyperosmolar hyperglycemic state',
  'diabetic nephropathy', 'diabetic retinopathy', 'diabetic neuropathy',
  'diabetic foot ulcer', 'charcot arthropathy',
  'thyroid disorders', 'hypothyroidism', 'hyperthyroidism',
  'graves disease', 'hashimoto thyroiditis', 'thyroid cancer',
  'adrenal disorders', 'addison disease', 'cushing syndrome',
  'congenital adrenal hyperplasia', 'pheochromocytoma',
  'pituitary disorders', 'acromegaly', 'cushing disease',
  'prolactinoma', 'diabetes insipidus', 'syndrome of inappropriate antidiuretic hormone',
  'parathyroid disorders', 'hyperparathyroidism', 'hypoparathyroidism',
  'osteoporosis', 'osteopenia', 'paget disease of bone',
  'rickets', 'osteomalacia', 'fibrous dysplasia',
  
  // Gastroenterology
  'inflammatory bowel disease', 'crohn disease', 'ulcerative colitis',
  'celiac disease', 'eosinophilic esophagitis', 'gastroesophageal reflux disease',
  'peptic ulcer disease', 'helicobacter pylori infection',
  'irritable bowel syndrome', 'constipation', 'diarrhea',
  'diverticulitis', 'appendicitis', 'peritonitis',
  'liver disease', 'cirrhosis', 'hepatitis', 'liver cancer',
  'gallbladder disease', 'cholecystitis', 'cholelithiasis',
  'pancreatic disease', 'pancreatitis', 'pancreatic cancer',
  'esophageal disease', 'esophageal cancer', 'achalasia',
  'gastric disease', 'gastric cancer', 'gastroparesis',
  
  // Hematology
  'anemia', 'iron deficiency anemia', 'vitamin b12 deficiency anemia',
  'folate deficiency anemia', 'hemolytic anemia', 'sickle cell anemia',
  'thalassemia', 'alpha thalassemia', 'beta thalassemia',
  'hemophilia', 'hemophilia a', 'hemophilia b', 'hemophilia c',
  'von willebrand disease', 'factor deficiencies', 'factor vii deficiency',
  'factor x deficiency', 'factor xi deficiency', 'factor xiii deficiency',
  'platelet disorders', 'immune thrombocytopenia', 'thrombotic thrombocytopenic purpura',
  'hemolytic uremic syndrome', 'disseminated intravascular coagulation',
  'myelodysplastic syndromes', 'myeloproliferative neoplasms',
  'polycythemia vera', 'essential thrombocythemia', 'myelofibrosis',
  'mastocytosis', 'systemic mastocytosis', 'indolent systemic mastocytosis',
  'aggressive systemic mastocytosis', 'mast cell leukemia',
  
  // Musculoskeletal
  'rheumatoid arthritis', 'juvenile idiopathic arthritis', 'psoriatic arthritis',
  'ankylosing spondylitis', 'reactive arthritis', 'enteropathic arthritis',
  'systemic lupus erythematosus', 'lupus nephritis', 'cutaneous lupus',
  'systemic sclerosis', 'scleroderma', 'limited cutaneous systemic sclerosis',
  'diffuse cutaneous systemic sclerosis', 'sjogren syndrome',
  'polymyositis', 'dermatomyositis', 'inclusion body myositis',
  'vasculitis', 'giant cell arteritis', 'takayasu arteritis',
  'granulomatosis with polyangiitis', 'eosinophilic granulomatosis with polyangiitis',
  'microscopic polyangiitis', 'behcet disease', 'kawasaki disease',
  'sarcoidosis', 'relapsing polychondritis', 'eosinophilic fasciitis',
  'osteoporosis', 'osteopenia', 'paget disease of bone',
  'osteogenesis imperfecta', 'achondroplasia', 'fibrous dysplasia',
  'gout', 'pseudogout', 'calcium pyrophosphate deposition disease',
  'osteoarthritis', 'rheumatoid arthritis', 'ankylosing spondylitis',
  'fibromyalgia', 'chronic fatigue syndrome', 'myofascial pain syndrome',
  'tendinitis', 'bursitis', 'carpal tunnel syndrome',
  'rotator cuff tear', 'meniscal tear', 'anterior cruciate ligament tear',
  'herniated disc', 'spinal stenosis', 'scoliosis',
  'kyphosis', 'lordosis', 'spondylolisthesis',
  'osteomyelitis', 'septic arthritis', 'tuberculosis of bone',
  'rickets', 'osteomalacia', 'vitamin d deficiency',
  'hyperparathyroidism', 'hypoparathyroidism', 'pseudohypoparathyroidism',
  'osteoporosis', 'osteopenia', 'paget disease of bone',
  'fibrous dysplasia', 'mccune-albright syndrome', 'cherubism',
  'osteopetrosis', 'pycnodysostosis', 'cleidocranial dysplasia',
  'achondroplasia', 'hypochondroplasia', 'thanatophoric dysplasia',
  'osteogenesis imperfecta', 'brittle bone disease', 'eblers-danlos syndrome',
  'marfan syndrome', 'stickler syndrome', 'pseudoxanthoma elasticum',
  'alkaptonuria', 'ochronosis', 'gout', 'pseudogout',
  'calcium pyrophosphate deposition disease', 'hydroxyapatite deposition disease',
  'osteoporosis', 'osteopenia', 'paget disease of bone',
  'fibrous dysplasia', 'mccune-albright syndrome', 'cherubism',
  'osteopetrosis', 'pycnodysostosis', 'cleidocranial dysplasia',
  'achondroplasia', 'hypochondroplasia', 'thanatophoric dysplasia',
  'osteogenesis imperfecta', 'brittle bone disease', 'eblers-danlos syndrome',
  'marfan syndrome', 'stickler syndrome', 'pseudoxanthoma elasticum',
  'alkaptonuria', 'ochronosis', 'gout', 'pseudogout',
  'calcium pyrophosphate deposition disease', 'hydroxyapatite deposition disease'
])

function validateIndication(indication: string): { isValid: boolean; normalized: string } {
  const normalized = indication.toLowerCase().trim()
  return {
    isValid: VALID_INDICATIONS.has(normalized),
    normalized
  }
}

// Enhanced typo detection with common pharmaceutical terms
function detectTypos(text: string): string[] {
  const typos: string[] = []
  const commonTypos: Record<string, string> = {
    'cancer': 'cancer',
    'cancr': 'cancer',
    'cancar': 'cancer',
    'alzheimers': 'alzheimer disease',
    'alzheimer': 'alzheimer disease',
    'parkinsons': 'parkinson disease',
    'parkinson': 'parkinson disease',
    'rheumatoid': 'rheumatoid arthritis',
    'psoriasis': 'psoriasis',
    'diabetes': 'diabetes',
    'diabetis': 'diabetes'
  }
  
  const words = text.toLowerCase().split(' ')
  words.forEach(word => {
    if (word && commonTypos[word] && commonTypos[word] !== word) {
      typos.push(`${word} -> ${commonTypos[word]}`)
    }
  })
  
  return typos
}

// Enhanced buyer scoring with improved algorithm
import { calculateBuyerScores, getTopBuyers } from '@/lib/buyer-scoring'

function findTopBuyers(assetData: InputData): any[] {
  try {
    const buyerScores = calculateBuyerScores(assetData)
    return buyerScores.slice(0, 5).map(score => ({
      name: score.name,
      score: score.totalScore,
      similarity_score: score.totalScore
    }))
  } catch (error) {
    console.error('[API] Error calculating buyer scores:', error)
    return []
  }
}

// Enhanced caching with TTL and size limits
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes
const MAX_CACHE_SIZE = 1000
const cache = new Map<string, { data: ResponseData; timestamp: number }>()

function getCacheKey(data: InputData): string {
  const normalized = {
    therapeuticArea: data.therapeuticArea.toLowerCase().trim(),
    indication: data.indication.toLowerCase().trim(),
    target: normalizeTarget(data.target),
    modality: data.modality.toLowerCase().trim(),
    assetStage: data.assetStage.toLowerCase().trim()
  }
  return JSON.stringify(normalized)
}

function getCachedResponse(cacheKey: string): ResponseData | null {
  const cached = cache.get(cacheKey)
  if (!cached || !cached.data) return null
  
  if (Date.now() - cached.timestamp > CACHE_TTL) {
    cache.delete(cacheKey)
    return null
  }
  
  return cached.data
}

function setCachedResponse(cacheKey: string, data: ResponseData): void {
  // Implement cache size management
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value
    if (oldestKey) {
      cache.delete(oldestKey)
    }
  }
  
  cache.set(cacheKey, { data, timestamp: Date.now() })
}

// Adaptive model selection based on query complexity with optimized timeouts
function selectOptimalModel(assetData: InputData): { model: string; isDeep: boolean; timeout: number } {
  const complexity = calculateQueryComplexity(assetData)
  
  if (complexity === 'high') {
    return { model: 'sonar-deep-research', isDeep: true, timeout: 120000 } // 2 minutes for complex queries
  } else if (complexity === 'medium') {
    return { model: 'sonar-pro', isDeep: false, timeout: 90000 } // 1.5 minutes for medium complexity
  } else {
    return { model: 'sonar-pro', isDeep: false, timeout: 60000 } // 1 minute for simple queries
  }
}

function calculateQueryComplexity(assetData: InputData): 'low' | 'medium' | 'high' {
  let score = 0
  
  // Asset stage complexity
  if (assetData.assetStage.includes('phase 1')) score += 1
  else if (assetData.assetStage.includes('phase 2')) score += 2
  else if (assetData.assetStage.includes('phase 3')) score += 3
  
  // Modality complexity
  if (assetData.modality.includes('antibody-drug conjugate')) score += 3
  else if (assetData.modality.includes('cell therapy')) score += 3
  else if (assetData.modality.includes('gene therapy')) score += 3
  else if (assetData.modality.includes('monoclonal antibody')) score += 2
  else score += 1
  
  // Therapeutic area complexity
  if (assetData.therapeuticArea === 'oncology') score += 2
  else if (assetData.therapeuticArea === 'neurology') score += 2
  else score += 1
  
  if (score <= 3) return 'low'
  else if (score <= 6) return 'medium'
  else return 'high'
}

// Comprehensive domain selection for expert-level pharmaceutical research
function selectOptimalDomains(assetData: InputData): string[] {
  const baseDomains = [
    "evaluatepharma.com",
    "clinicaltrials.gov",
    "fiercepharma.com",
    "biospace.com",
    "fda.gov",
    "ema.europa.eu"
  ]
  
  const oncologyDomains = [
    "cancer.gov",
    "asco.org",
    "esmo.org",
    "aacr.org",
    "asco.org"
  ]
  
  const neurologyDomains = [
    "alz.org",
    "parkinson.org",
    "mssociety.org",
    "als.org",
    "epilepsy.com"
  ]
  
  const immunologyDomains = [
    "rheumatology.org",
    "aad.org",
    "aaaai.org",
    "acai.org"
  ]
  
  const rareDiseaseDomains = [
    "rarediseases.org",
    "nord.org",
    "genome.gov",
    "omim.org"
  ]
  
  const marketDomains = [
    "statista.com",
    "iqvia.com",
    "biocentury.com",
    "pharmatimes.com"
  ]
  
  const regulatoryDomains = [
    "fda.gov",
    "ema.europa.eu",
    "pmda.go.jp",
    "hc-sc.gc.ca"
  ]
  
  let domains = [...baseDomains, ...marketDomains, ...regulatoryDomains]
  
  if (assetData.therapeuticArea === 'oncology') {
    domains = [...domains, ...oncologyDomains]
  } else if (assetData.therapeuticArea === 'neurology') {
    domains = [...domains, ...neurologyDomains]
  } else if (assetData.therapeuticArea === 'immunology') {
    domains = [...domains, ...immunologyDomains]
  } else if (assetData.therapeuticArea === 'rare diseases') {
    domains = [...domains, ...rareDiseaseDomains]
  }
  
  return domains.slice(0, 10) // Limit to 10 domains per API requirement
}

export async function POST(req: NextRequest) {
  const requestId = Math.random().toString(36).substring(7)
  const startTime = Date.now()
  
  console.log(`[API] Received POST /api/perplexity [${requestId}]`)
  
  try {
    const body = await req.json()
    const validation = InputSchema.safeParse(body)
    
    if (!validation.success) {
      console.error('[API] Invalid input:', validation.error)
      return NextResponse.json({ 
        error: 'Invalid input data', 
        details: validation.error.errors 
      }, { status: 400 })
    }
    
    const inputData = validation.data
    console.log('[API] Validated request body:', inputData)
    
    // Check cache first
    const cacheKey = getCacheKey(inputData)
    const cachedResponse = getCachedResponse(cacheKey)
    const cacheHit = !!cachedResponse
    
    if (cachedResponse) {
      console.log('[API] Returning cached response')
      const responseTime = Date.now() - startTime
      
      recordAPIMetric({
        requestId,
        responseTime,
        cacheHit: true,
        modelUsed: 'cached',
        complexity: calculateQueryComplexity(inputData),
        verificationPassed: true,
        confidenceScore: cachedResponse.confidence_score || 0.8,
        hasSpecificData: true
      })
      
      return NextResponse.json(cachedResponse)
    }
    
    // Enhanced data validation and enrichment
    const enrichment = enrichAssetData(inputData)
    const dataQualityScore = calculateDataQualityScore(enrichment)
    
    // Check overall data quality
    if (dataQualityScore < 0.6) {
      return NextResponse.json({
        error: 'Low data quality detected',
        suggestions: enrichment.therapeuticArea.suggestions.concat(
          enrichment.indication.suggestions,
          enrichment.target.suggestions,
          enrichment.modality.suggestions,
          enrichment.assetStage.suggestions
        ).slice(0, 5),
        warnings: [
          enrichment.therapeuticArea.warnings,
          enrichment.indication.warnings,
          enrichment.target.warnings,
          enrichment.modality.warnings,
          enrichment.assetStage.warnings
        ].flat().slice(0, 3),
        overallConfidence: dataQualityScore
      }, { status: 400 })
    }
    
    // Use enriched data
    const enrichedData = {
      therapeuticArea: enrichment.therapeuticArea.normalized,
      indication: enrichment.indication.normalized,
      target: enrichment.target.normalized,
      modality: enrichment.modality.normalized,
      assetStage: enrichment.assetStage.normalized
    }
    
    // Get top buyers using enhanced scoring
    const topBuyers = findTopBuyers(enrichedData)
    console.log('[API] Top buyers found:', topBuyers)
    
    if (topBuyers.length === 0) {
      return NextResponse.json({ error: 'No suitable buyers found' }, { status: 404 })
    }
    
    // Assess research depth based on asset complexity
    const researchDepth = assessResearchDepth(enrichedData, topBuyers)
    console.log('[API] Research depth assessed:', researchDepth.level)
    
    // Build enhanced buyer context
    const buyerContext = topBuyers.map((buyer, index) => 
      `${index + 1}. ${buyer.name} (Strategic Fit Score: ${buyer.score.toFixed(2)})`
    ).join('\n')
    
        // Generate enhanced prompt with unblurred sections
    const enhancedPrompt = generateEnhancedPrompt(enrichedData, researchDepth, buyerContext, DEFAULT_ENHANCED_CONFIG)

    const apiKey = process.env.PERPLEXITY_API_KEY
    if (!apiKey) {
      console.error('[API] Missing Perplexity API key.')
      return NextResponse.json({ error: 'Missing Perplexity API key.' }, { status: 500 })
    }

    // Adaptive model selection
    const { model, isDeep, timeout } = selectOptimalModel(enrichedData)
    const domainAllowlist = selectOptimalDomains(enrichedData)
    
    console.log(`[API] Using model: ${model}, isDeep: ${isDeep}, timeout: ${timeout}ms`)

    // Enhanced web search parameters with increased sourcing breadth and validation depth
    const webSearchOptions = {
      search_context_size: "high", // Always use high context size for comprehensive sourcing
      search_recency_filter: "year",
      search_domain_filter: domainAllowlist,
      // Enhanced sourcing parameters
      search_breadth: "comprehensive", // Maximum sourcing breadth
      validation_depth: "expert", // Expert-level validation depth
      max_sources: 15, // Maximum number of sources
      source_quality_threshold: 0.8 // High confidence threshold for sources
    }

    const requestBody = {
      model,
      messages: [
        { role: 'system', content: 'You are a senior pharmaceutical business development executive with 25+ years of experience in M&A, strategic partnerships, and market analysis. You hold MD, PhD, and MBA degrees with deep expertise in pharmaceutical sciences, clinical development, regulatory affairs, and commercial strategy. Your analysis must reflect the depth, precision, and sophistication expected from a seasoned industry leader. Be exhaustive in research, surgically precise in analysis, and provide insights that demonstrate expert-level understanding of pharmaceutical business dynamics.' },
        { role: 'user', content: enhancedPrompt },
      ],
      max_tokens: 12000, // Increased token limit for comprehensive analysis with unblurred sections
      temperature: 0.02, // Ultra-low temperature for maximum consistency and precision
      top_p: 0.98, // Very high top_p for creativity while maintaining focus
      reasoning_effort: "high", // Always use high reasoning effort
      web_search_options: webSearchOptions,
      // Enhanced sourcing and validation parameters
      sourcing_breadth: "comprehensive", // Maximum sourcing breadth
      validation_depth: "expert", // Expert-level validation depth
      search_recency_filter: "year",
      search_domain_filter: domainAllowlist
    }

    // Enhanced LLM call with adaptive timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    let response
    try {
      response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      })
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('[API] Request timeout')
        return NextResponse.json({ error: 'Request timeout - please try again' }, { status: 408 })
      }
      throw error
    }
    
    clearTimeout(timeoutId)
    
    console.log('[API] Perplexity API response status:', response.status)
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[API] Perplexity API error:', errorText)
      return NextResponse.json({ error: 'Perplexity API error: ' + errorText }, { status: 500 })
    }
    
    let data = await response.json()
    console.log('[API] Perplexity API response received')
    
    // Log search metrics
    console.log('[API] Search metrics:', {
      numSearchQueries: data?.usage?.num_search_queries,
      searchContextSize: requestBody.web_search_options?.search_context_size,
      reasoningEffort: requestBody.reasoning_effort
    })
    
    // Enhanced response parsing with better error handling
    let parsedResponse: ResponseData
    try {
      const content = data.choices?.[0]?.message?.content
      if (!content) {
        throw new Error('No content in response')
      }
      
      const match = content.match(/\{[\s\S]*\}/)
      const jsonStr = match ? match[0] : content
      const parsed = JSON.parse(jsonStr)
      
      // Validate with Zod schema
      parsedResponse = ResponseSchema.parse(parsed)
      console.log('[API] Validated response:', parsedResponse)
      
      // Enhanced response processing with domain expert validation
      const enhancedProcessing = await processEnhancedResponse(parsedResponse, enrichedData, DEFAULT_ENHANCED_CONFIG)
      console.log('[API] Enhanced processing completed:', {
        confidence: enhancedProcessing.confidence,
        issues: enhancedProcessing.issues.length,
        validationResults: enhancedProcessing.validationResults
      })
      
      // Use processed response
      parsedResponse = enhancedProcessing.processedResponse
      
    } catch (e) {
      console.error('[API] Could not parse or validate Perplexity response:', e)
      return NextResponse.json({ error: 'Could not parse Perplexity response.' }, { status: 500 })
    }
    
    // Enhanced deterministic buyer selection with fallback
    const deterministicTopBuyer = topBuyers[0]
    if (deterministicTopBuyer && (!parsedResponse.buyer || parsedResponse.buyer === 'null')) {
      console.log('[API] Using deterministic buyer selection:', deterministicTopBuyer.name)
      parsedResponse.buyer = deterministicTopBuyer.name
      parsedResponse.strategic_fit_score = deterministicTopBuyer.score
      
      if (!parsedResponse.rationale || parsedResponse.rationale === 'null') {
        parsedResponse.rationale = `Strategic fit analysis indicates ${deterministicTopBuyer.name} as the optimal buyer based on therapeutic alignment (${enrichedData.therapeuticArea}) and pipeline gaps. The company has demonstrated strong capabilities in ${enrichedData.modality} development and commercialization.`
      }
    }
    
    // Cache the response
    setCachedResponse(cacheKey, parsedResponse)
    
    const responseTime = Date.now() - startTime
    recordAPIMetric({
      requestId,
      responseTime,
      cacheHit: false,
      modelUsed: model,
      complexity: calculateQueryComplexity(inputData),
      verificationPassed: true,
      confidenceScore: parsedResponse.confidence_score || 0.8,
      hasSpecificData: true
    })
    
    return NextResponse.json(parsedResponse)
    
  } catch (err) {
    console.error('[API] Server error:', err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid input data', 
        details: err.errors 
      }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error: ' + (err instanceof Error ? err.message : 'Unknown error') }, { status: 500 })
  }
} 