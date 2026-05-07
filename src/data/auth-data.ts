export const AUTH_QUESTIONS = [
  {
    id: 'aq1',
    title: 'Is there any current mania or psychosis present?',
    policy: "The policy mandates that there should be no current manic or psychotic symptoms for TMS treatment of bipolar depression. Confirming 'Yes' (indicating absence) supports eligibility.",
    question: 'Can you verify if the patient is currently free from manic or psychotic symptoms?',
    options: [
      { value: 'yes', label: 'Yes, the patient is currently free from mania and psychosis.' },
      { value: 'no',  label: 'No, the patient is currently experiencing mania or psychotic symptoms.' },
    ],
  },
  {
    id: 'aq2',
    title: 'Does the patient have a history of seizure disorders?',
    policy: "Patients with a seizure history need thorough evaluation before TMS treatment due to heightened risk. Confirming 'No' supports eligibility.",
    question: 'Does the patient have a known history of seizure disorders?',
    options: [
      { value: 'yes', label: 'Yes, the patient has a history of seizure disorders.' },
      { value: 'no',  label: 'No, the patient has no history of seizure disorders.' },
    ],
  },
  {
    id: 'aq3',
    title: 'Are there any metallic implants present?',
    policy: "Metallic implants in the head or neck may contraindicate TMS due to safety concerns. Confirming 'No' indicates eligibility.",
    question: 'Does the patient have any metallic implants in the cranial or cervical regions?',
    options: [
      { value: 'yes', label: 'Yes, the patient has metallic implants in the cranial or cervical regions.' },
      { value: 'no',  label: 'No, the patient has no metallic implants in these regions.' },
    ],
  },
]

export const AUTH_RESULTS = {
  cases: [
    'Case 001 - Primary Osteoarthritis, Right Knee',
    'Case 002 - Chronic Knee Instability',
  ],
  paRequired: 'Yes',
  paType: 'Procedure PA',
  rules: [
    { text: 'Conservative therapy attempted (> 6 weeks)', passed: true },
    { text: 'Clinical documentation supports medical necessity', passed: true },
    { text: 'ICD - 10 code supports requested procedure', passed: true },
    { text: 'Provider is in network', passed: true },
    { text: 'Prior imaging studies on files', passed: false },
  ],
  details: [
    { label: 'Eligibility Status', value: 'Active',        badge: 'green' },
    { label: 'Plan Type',          value: 'PPO',           badge: '' },
    { label: 'Network Status',     value: 'IN_Network',    badge: '' },
    { label: 'PA Required',        value: 'True',          badge: 'green' },
    { label: 'Auth Type',          value: 'PRIOR_AUTH',    badge: '' },
    { label: 'Lead time days',     value: '5',             badge: '' },
    { label: 'Payer Policy',       value: 'POL-2206',      badge: '' },
    { label: 'Submission',         value: '13/04/2026',    badge: '' },
    { label: 'PA Timestamp',       value: '13/04/2026',    badge: '' },
    { label: 'Required Docs',      value: 'Clinical_notes, Lab, Imageing_order', badge: '' },
    { label: 'Clinical Criteria',  value: 'MCG-MRI-CNS-C...', badge: '' },
  ],
  reasoning: `Authorization analysis confirms that the clinical documentation for Patient Ramesh K. Patel (67M, MRN: 993847) meets payer criteria for Procedure PA. Rule evaluation indicates that conservative therapy, clinical documentation, ICD-10 alignment, and network status all satisfy eligibility requirements. The only outstanding item is prior imaging studies on file. Overall, the authorization decision supports approval pending imaging confirmation.`,
}
