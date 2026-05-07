export const RISK_QUESTIONS = [
  {
    id: 'rkq1',
    title: 'Is the patient eligible for treatment without any indications of manic or psychotic episodes?',
    policy: "For TMS therapy in cases of bipolar depression, it's essential that the patient is not experiencing any manic or psychotic symptoms. A 'Yes' confirmation means they are eligible.",
    question: 'Can you verify that the patient is ready and exhibits no signs of mania or psychosis?',
    options: [
      { value: 'yes', label: 'Yes, the patient is eligible and shows no signs of mania or psychosis.' },
      { value: 'no',  label: 'No, the patient is currently exhibiting signs of mania or psychosis.' },
    ],
  },
  {
    id: 'rkq2',
    title: 'Does the patient have any history of seizures that could influence their eligibility for treatment?',
    policy: "Patients with a seizure history need thorough evaluation before TMS therapy. A 'No' confirmation indicates they are eligible.",
    question: 'Does the patient have a documented history of seizure disorders that might affect their treatment eligibility?',
    options: [
      { value: 'yes', label: 'Yes, the patient has a documented history of seizure disorders.' },
      { value: 'no',  label: 'No, the patient has no documented history of seizure disorders.' },
    ],
  },
  {
    id: 'rkq3',
    title: 'Are there any contraindications present that could increase treatment risk?',
    policy: "Presence of contraindications such as metallic implants or cardiac devices elevates treatment risk. Confirming 'No' indicates the patient is eligible.",
    question: 'Does the patient have any known contraindications that could increase the risk of treatment?',
    options: [
      { value: 'yes', label: 'Yes, the patient has contraindications that could increase treatment risk.' },
      { value: 'no',  label: 'No, the patient has no known contraindications.' },
    ],
  },
]

export const RISK_RESULTS = {
  cases: ['Case 001 - Primary Osteoarthritis, Right Knee', 'Case 002 - Chronic Knee Instability'],
  byCaseIndex: [
    {
      denialRisk: {
        percent: 50,
        level: 'High Risk',
        scores: [
          { value: 30, label: 'Eligibility',                   desc: 'Insurance active & coverage valid.' },
          { value: 25, label: 'Payer Rules',                   desc: 'Frequency, prerequisites, coverage rules' },
          { value: 20, label: 'Documents',                     desc: 'Required documents present & complete' },
          { value: 15, label: 'Coding',                        desc: 'ICD \u2194 CPT correctness' },
          { value: 20, label: 'Clinical + History + Evidence', desc: 'Medical necessity & treatment proof' },
        ],
      },
      denialReasons: [
        'Missing Physician Order signature',
        'Insufficient clinical justification for surgical intervention',
        'Conservative treatment criteria not met (minimum 6 weeks PT required)',
        'Clinical notes do not adequately document failed non-surgical treatments',
      ],
      recommendations: [
        { text: 'Upload signed Physician Order',                                  points: 15, level: 'Critical' },
        { text: 'Strengthen clinical notes with treatment failure documentation', points: 12, level: 'Critical' },
        { text: 'Add physical therapy records (6+ weeks)',                        points: 10, level: 'High' },
        { text: 'Add secondary ICD code M17.12',                                 points: 5,  level: 'Medium' },
      ],
      explainability: {
        percent: 82,
        label: 'High Risk of Denial',
        reasons: [
          'Missing Physician Order signature',
          'Weak clinical justification',
          'Conservative treatment criteria not met',
        ],
      },
    },
    {
      denialRisk: {
        percent: 35,
        level: 'Medium Risk',
        scores: [
          { value: 35, label: 'Eligibility',                   desc: 'Insurance active & coverage valid.' },
          { value: 30, label: 'Payer Rules',                   desc: 'Frequency, prerequisites, coverage rules' },
          { value: 25, label: 'Documents',                     desc: 'Required documents present & complete' },
          { value: 20, label: 'Coding',                        desc: 'ICD \u2194 CPT correctness' },
          { value: 25, label: 'Clinical + History + Evidence', desc: 'Medical necessity & treatment proof' },
        ],
      },
      denialReasons: [
        'Secondary diagnosis code not specified',
        'Incomplete prior authorization documentation',
        'Referral letter missing attending physician signature',
      ],
      recommendations: [
        { text: 'Add secondary ICD code specificity',              points: 10, level: 'High' },
        { text: 'Complete prior authorization request form',       points: 8,  level: 'High' },
        { text: 'Obtain signed referral from attending physician', points: 5,  level: 'Medium' },
        { text: 'Attach most recent radiology report',             points: 3,  level: 'Medium' },
      ],
      explainability: {
        percent: 62,
        label: 'Medium Risk of Denial',
        reasons: [
          'Secondary diagnosis not adequately coded',
          'Incomplete PA documentation',
          'Missing attending physician signature',
        ],
      },
    },
  ],
  reasoning: `Patient Ramesh K. Patel (67M, MRN: 993847) presents with T2DM (HbA1c 8.4%) and CKD Stage 3b (eGFR 38, UACR 420 mg/g). Clinical Intelligence analysis confirms high-confidence ICD-CPT alignment for the primary (E11.65 \u2192 S5550: 91%) and secondary renal (N18.33 \u2192 S5550: 89%) indications.\n\nStep therapy is fully documented and exhausted across three agents (Metformin, Glipizide, Sitagliptin). eGFR 38 is above the minimum initiation threshold of 20 mL/min/1.73m\u00b2 for Empagliflozin. UACR 420 mg/g exceeds the 200 mg/g KDIGO 2024 threshold, satisfying both glycemic and renoprotective indications.\n\nCare setting is Outpatient with Medication PA intent confirmed. One minor mismatch flagged (D63.1 \u2014 anemia of CKD vs SGLT2) \u2014 does not affect PA eligibility. Overall clinical context is strong; documentation quality meets MCG and KDIGO criteria for SGLT2 authorization.`,
}

export const CASE_DOCUMENTS = [
  'Doctor Letter',
  'Patient Demographics',
  'Insurance Card',
  'Treatment History Documentation',
  'Physician Order',
  'Lab Results',
  'Clinical Notes',
]
