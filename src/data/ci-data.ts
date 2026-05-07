export const CI_QUESTIONS = [
  {
    id: 'q1',
    title: 'Current Mania/Psychosis?',
    policy: "Policy requires absence of current manic or psychotic features for TMS treatment of bipolar depression. Confirming 'Yes' (meaning absent) supports eligibility.",
    question: 'Can you confirm the patient is currently free of manic or psychotic features?',
    options: [
      { value: 'yes', label: 'Yes, Patient is currently free of Mania and Psychosis' },
      { value: 'no',  label: 'No, Patient has currently Mania or Psychosis Features.' },
    ],
  },
  {
    id: 'q2',
    title: 'History of Seizure Disorder?',
    policy: "Patients with a history of seizures require careful evaluation before TMS treatment due to increased risk. Confirming 'No' supports eligibility.",
    question: 'Does the patient have a known history of seizure disorder?',
    options: [
      { value: 'yes', label: 'Yes, Patient has a history of seizure disorder.' },
      { value: 'no',  label: 'No, Patient has no history of seizure disorder.' },
    ],
  },
  {
    id: 'q3',
    title: 'Presence of Metallic Implants?',
    policy: "Metallic implants in the head or neck area can contraindicate TMS due to safety concerns. Confirming 'No' indicates eligibility.",
    question: 'Does the patient have any metallic implants in the cranial or cervical regions?',
    options: [
      { value: 'yes', label: 'Yes, Patient has metallic implants in cranial or cervical regions.' },
      { value: 'no',  label: 'No, Patient has no metallic implants in these regions.' },
    ],
  },
]

export const AI_INSIGHTS_NOTES = `Patient Ramesh K. Patel (67M, MRN: 993847) presents with T2DM (HbA1c 8.4%) and CKD Stage 3b (eGFR 38, UACR 420 mg/g). Clinical Intelligence analysis confirms high-confidence ICD-CPT alignment for the primary (E11.65 → S5550: 91%) and secondary renal (N18.33 → S5550: 89%) indications.`

export const CI_RESULTS = {
  diagnosesLabel: 'Severe',
  diagnoses: [
    { text: 'Type 2 Diabetes Mellitus — HbA1c 8.4%, above individualized target of <7.5%' },
    { text: 'Chronic Kidney Disease Stage 3b — eGFR 38 mL/min/1.73m², declining (58→47→38)' },
  ],
  codes: [
    { code: 'M17.11', description: 'Primary Osteoarthritis, Right Knee' },
    { code: 'M23.51', description: 'Chronic Instability of Knee, Right' },
  ],
  treatments: [
    { name: 'Physical Therapy',   duration: '6 Weeks', status: 'Failed' },
    { name: 'NSAIDs (Ibuprofen)', duration: '8 Weeks', status: 'Failed' },
    { name: 'NSAIDs (Naproxen)',  duration: '4 Weeks', status: 'Failed' },
    { name: 'Rest & Ice Therapy', duration: '3 Weeks', status: 'Failed' },
  ],
  clinicalNote: '"MRI recommended to evaluate suspected ligament injury in the right knee. Patient has failed 6 weeks of physical therapy and multiple NSAID regimens. Clinical examination reveals joint instability and limited ROM. Advanced imaging is medically necessary to determine surgical candidacy."',
}
