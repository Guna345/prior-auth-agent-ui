export const READINESS_QUESTIONS = [
  {
    id: 'rq1',
    title: 'Is the patient ready for treatment without any signs of mania or psychosis?',
    policy: "For TMS treatment of bipolar depression, the patient must be free from any manic or psychotic symptoms. Confirming 'Yes' indicates they are ready.",
    question: 'Can you confirm the patient is prepared and shows no signs of mania or psychosis?',
    options: [
      { value: 'yes', label: 'Yes, the patient is ready and shows no signs of mania or psychosis.' },
      { value: 'no',  label: 'No, the patient is currently showing signs of mania or psychosis.' },
    ],
  },
  {
    id: 'rq2',
    title: 'Does the patient have any history of seizures that could affect readiness for treatment?',
    policy: "Patients with a history of seizures require careful assessment before TMS treatment. Confirming 'No' indicates they are ready.",
    question: 'Does the patient have a known history of seizure disorders that might impact their treatment readiness?',
    options: [
      { value: 'yes', label: 'Yes, the patient has a history of seizure disorders.' },
      { value: 'no',  label: 'No, the patient has no history of seizure disorders.' },
    ],
  },
  {
    id: 'rq3',
    title: 'Are there any metallic implants that could affect treatment readiness?',
    policy: "Metallic implants in the head or neck may contraindicate TMS. Confirming 'No' indicates the patient is ready.",
    question: 'Does the patient have any metallic implants in the cranial or cervical regions that could affect treatment readiness?',
    options: [
      { value: 'yes', label: 'Yes, the patient has metallic implants in the cranial or cervical regions.' },
      { value: 'no',  label: 'No, the patient has no metallic implants in these regions.' },
    ],
  },
]

export const READINESS_RESULTS = {
  cases: ['Case 001 - Primary Osteoarthritis, Right Knee', 'Case 002 - Chronic Knee Instability'],
  alert: { title: 'LAB REPORT MISSING', message: 'The lab scanning report from last month is missing.' },
  docs: [
    { name: 'Medical History Report', file: 'PDF',   size: '0.5 MB', completion: 100, status: 'Complete', tooltip: '' },
    { name: 'Lab Results Summary',    file: 'Excel', size: '1.2 MB', completion: 95,  status: 'Complete', tooltip: '' },
    { name: 'Radiology Images',       file: 'DICOM', size: '3.8 GB', completion: 30,  status: 'Flagged',  tooltip: 'Missing the Last week Lab reports values' },
    { name: 'Patient Consent Forms',  file: 'DOCX',  size: '750 KB', completion: 100, status: 'Signed',   tooltip: '' },
  ],
  reasoning: `Patient Ramesh K. Patel (67M, MRN: 993847) presents with T2DM (HbA1c 8.4%) and CKD Stage 3b (eGFR 38, UACR 420 mg/g). Clinical Intelligence analysis confirms high-confidence ICD-CPT alignment for the primary (E11.65 \u2192 S5550: 91%) and secondary renal (N18.33 \u2192 S5550: 89%) indications.\n\nStep therapy is fully documented and exhausted across three agents (Metformin, Glipizide, Sitagliptin). eGFR 38 is above the minimum initiation threshold of 20 mL/min/1.73m\u00b2 for Empagliflozin. UACR 420 mg/g exceeds the 200 mg/g KDIGO 2024 threshold, satisfying both glycemic and renoprotective indications.\n\nCare setting is Outpatient with Medication PA intent confirmed. One minor mismatch flagged (D63.1 \u2014 anemia of CKD vs SGLT2) \u2014 does not affect PA eligibility. Overall clinical context is strong; documentation quality meets MCG and KDIGO criteria for SGLT2 authorization.`,
  diagnosis: {
    matches: [
      { icd: 'M17.11', cpt: '99213', name: 'Primary Osteoarthritis, Right Knee',  score: 92, source: 'ICD Book' },
      { icd: 'M23.51', cpt: '99213', name: 'Chronic Instability of Knee, Right',  score: 85, source: 'ICD Book' },
    ],
    extracted: {
      primary:   'E11.65 \u2013 Type 2 Diabetes Mellitus with Hyperglycemia',
      secondary: 'I10 \u2013 Essential Hypertension , E78.5 \u2013 Hyperlipidemia',
    },
    justification: {
      procedure: '70553 \u2013 MRI Brain',
      status: 'PARTIALLY JUSTIFIED',
      reasons: [
        'Diabetes diagnosis alone does NOT justify MRI Brain',
        'No neurological symptoms documented Payer Alignment:',
        'MRI requires neurological indication (per payer rules)',
      ],
    },
    clinicalValidation: {
      score: 68,
      insights: [
        'Diagnosis supported by lab values (HbA1c 8.2%)',
        'Missing symptom linkage for requested procedure',
        'No prior conservative treatment documented',
      ],
    },
    codingQuality: {
      accuracy: 'VALID',
      insights: [
        'ICD specificity is appropriate (E11.65 vs E11.9)',
        'No ICD-CPT mismatch detected at coding level',
      ],
    },
    explainability: {
      decision: 'Procedure is NOT strongly justified',
      insights: ['CPT requires neurological indication', 'Clinical notes do not support it'],
      source:   ['Clinical notes (EHR)', 'Payer rule engine', 'Historical approval patterns'],
      action:   'Add neurological symptoms OR revise procedure',
    },
    systemOutcome: {
      status: 'Needs Review Before PA Determination',
      impact:  'High risk of denial if submitted as-is',
    },
  },
}
