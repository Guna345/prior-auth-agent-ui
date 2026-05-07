export const SUBMISSION_DOCS = {
  submitId: 'SUB001',
  cases: [
    'Case 001 - Primary Osteoarthritis, Right Knee',
    'Case 002 - Chronic Knee Instability',
  ],
  documents: [
    { name: 'Doctor Letter',                   status: 'Success' as const },
    { name: 'Patient Demographics',            status: 'Success' as const },
    { name: 'Insurance Card',                  status: 'Success' as const },
    { name: 'Treatment History Documentation', status: 'Failed'  as const },
    { name: 'Physician Order',                 status: 'Failed'  as const },
    { name: 'Lab Results',                     status: 'Success' as const },
  ],
}

export const SUBMISSION_FORMS = [
  'Aetna PA Form — Standard',
  'Aetna PA Form — Specialty',
  'BCBS Authorization Request',
  'United Health PA Form',
]
