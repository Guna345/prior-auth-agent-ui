export type RuleStatus = 'Active' | 'Inactive'
export type PayerStatus = 'Connected' | 'Pending' | 'Disconnected'

export interface Rule {
  ruleId: string; cpt: string; payer: string
  description: string; source: 'DB' | 'Excel'; status: RuleStatus
  sourceUrl?: string
  sourceFileName?: string
}
export interface Payer {
  payerName: string; connectionType: string; status: PayerStatus; lastSync: string
}
export interface DataSource {
  sourceName: string; category: string; status: 'Active'; dataFreshness: string
}
export interface RiskFactor { label: string; value: number }
export interface FormItem { sno: number; formName: string; payerName: string }

export const rules: Rule[] = [
  { ruleId: 'R001', cpt: '23513',  payer: 'BCBS PPO',         description: 'Total knee replacement requires PA for all non-emergency cases',   source: 'DB',    status: 'Active',   sourceUrl:      'bcbs.healthcare.io/rules/knee'          },
  { ruleId: 'R001', cpt: '23513',  payer: 'BCBS PPO',         description: 'Total knee replacement requires PA for all non-emergency cases',   source: 'Excel', status: 'Active',   sourceFileName: 'BCBS_PPO_knee_rules.xlsx'               },
  { ruleId: 'R002', cpt: '27447',  payer: 'Aetna HMO',        description: 'ACL reconstruction mandates referral and pre-authorization',       source: 'DB',    status: 'Active',   sourceUrl:      'aetna.healthcare.io/rules/acl'          },
  { ruleId: 'R003', cpt: '298277', payer: 'Cigna POS',        description: 'Shoulder arthroscopy requires PA for outpatient procedures',       source: 'Excel', status: 'Inactive', sourceFileName: 'Cigna_POS_shoulder_rules.xlsx'          },
  { ruleId: 'R004', cpt: '22612',  payer: 'UnitedHealthcare', description: 'Spinal fusion surgeries require prior approval in all cases',      source: 'DB',    status: 'Active',   sourceUrl:      'uhc.healthcare.io/rules/spinal-fusion'  },
  { ruleId: 'R005', cpt: '274866', payer: 'Humana PPO',       description: 'Meniscus repair covered with PA only when performed outpatient',   source: 'Excel', status: 'Active',   sourceFileName: 'Humana_PPO_meniscus_rules.xlsx'         },
  { ruleId: 'R006', cpt: '298888', payer: 'Blue Shield HMO',  description: 'Rotator cuff repairs require documentation and PA',               source: 'DB',    status: 'Inactive', sourceUrl:      'blueshield.healthcare.io/rules/rotator' },
  { ruleId: 'R007', cpt: '274055', payer: 'Aetna PPO',        description: 'Knee arthroscopy needs prior authorization if inpatient',         source: 'Excel', status: 'Active',   sourceFileName: 'Aetna_PPO_knee_arthroscopy_rules.xlsx'  },
  { ruleId: 'R008', cpt: '298277', payer: 'Cigna POS',        description: 'Labral repair surgeries require pre-approval for coverage',       source: 'DB',    status: 'Active',   sourceUrl:      'cigna.healthcare.io/rules/labral'       },
  { ruleId: 'R009', cpt: '234722', payer: 'UnitedHealthcare', description: 'Joint replacement surgeries need PA for elective cases',          source: 'Excel', status: 'Inactive', sourceFileName: 'UHC_joint_replacement_rules.xlsx'       },
  { ruleId: 'R010', cpt: '298066', payer: 'Humana PPO',       description: 'Arthroscopic debridement requires prior authorization',           source: 'DB',    status: 'Active',   sourceUrl:      'humana.healthcare.io/rules/debridement' },
  { ruleId: 'R011', cpt: '27447',  payer: 'Blue Shield HMO',  description: 'Meniscectomy procedures require PA only for outpatient settings', source: 'Excel', status: 'Active',   sourceFileName: 'BlueShield_meniscectomy_rules.xlsx'     },
]

export const payers: Payer[] = [
  { payerName: 'UnitedHealthcare', connectionType: 'File Upload',            status: 'Connected',    lastSync: '02/04/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'Feature Deployment',     status: 'Pending',      lastSync: '02/15/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'Data Migration',         status: 'Connected',    lastSync: '02/20/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'API Integration',        status: 'Connected',    lastSync: '02/25/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'User Acceptance Testing',status: 'Connected',    lastSync: '03/01/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'Security Audit',         status: 'Connected',    lastSync: '03/05/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'Performance Optimization',status:'Connected',    lastSync: '03/10/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'Documentation Update',   status: 'Connected',    lastSync: '03/15/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'Training Session',       status: 'Connected',    lastSync: '03/20/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'Go-Live Preparation',    status: 'Connected',    lastSync: '03/25/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'Final Deployment',       status: 'Connected',    lastSync: '03/30/2026' },
  { payerName: 'UnitedHealthcare', connectionType: 'Post-Deployment Review', status: 'Connected',    lastSync: '04/05/2026' },
]

export const dataSources: DataSource[] = [
  { sourceName: 'EHR(FHIR R4)', category: 'Clinical',    status: 'Active', dataFreshness: 'Real - Time'       },
  { sourceName: 'HL7 V2',       category: 'Clinical',    status: 'Active', dataFreshness: 'Batch'             },
  { sourceName: 'DICOM',        category: 'Imaging',     status: 'Active', dataFreshness: 'Real - Time'       },
  { sourceName: 'LIS',          category: 'Laboratory',  status: 'Active', dataFreshness: 'Near - Real - Time'},
  { sourceName: 'CCD',          category: 'Clinical',    status: 'Active', dataFreshness: 'Batch'             },
  { sourceName: 'FHIR DSTU2',   category: 'Clinical',    status: 'Active', dataFreshness: 'Real - Time'       },
  { sourceName: 'OMOP CDM',     category: 'Research',    status: 'Active', dataFreshness: 'Batch'             },
]

export const riskFactors: RiskFactor[] = [
  { label: 'Eligibility',                    value: 36 },
  { label: 'Payer Rules',                    value: 53 },
  { label: 'Documents',                      value: 64 },
  { label: 'Coding',                         value: 36 },
  { label: 'Clinical + History + Evidence',  value: 64 },
]

export const formItems: FormItem[] = [
  { sno: 1,  formName: 'Submission Form',      payerName: 'ABL Healthcare'   },
  { sno: 2,  formName: 'User Onboarding',      payerName: 'Tech Innovations' },
  { sno: 3,  formName: 'Feedback Survey',      payerName: 'Green Energy Co.' },
  { sno: 4,  formName: 'Order Confirmation',   payerName: 'Retail Express'   },
  { sno: 5,  formName: 'Issue Tracker',        payerName: 'Cyber Solutions'  },
  { sno: 6,  formName: 'Appointment Scheduler',payerName: 'MediCorp'         },
  { sno: 7,  formName: 'Payment Gateway',      payerName: 'Fintech Partners' },
  { sno: 8,  formName: 'Newsletter Signup',    payerName: 'EduWorld'         },
  { sno: 9,  formName: 'Bug Report',           payerName: 'AppDev Studios'   },
  { sno: 10, formName: 'Event Registration',   payerName: 'City Events'      },
  { sno: 11, formName: 'Survey Form',          payerName: 'Health Insights'  },
  { sno: 12, formName: 'Contact Us',           payerName: 'Global Services'  },
]
