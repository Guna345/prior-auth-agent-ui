import type { AirCase, CaseDetail } from '../types/airHandling'

export const airCases: AirCase[] = [
  { caseId: 'CASE-00938', patientName: 'John Doe',        payer: 'United Healthcare',    airReason: 'Missing Clinical Notes',      requestDate: 'Oct 12, 2023', status: 'Approved' },
  { caseId: 'CASE-00939', patientName: 'Emma Watson',     payer: 'Blue Cross Blue Shield',airReason: 'Incorrect Billing Amount',    requestDate: 'Oct 13, 2023', status: 'Denied'   },
  { caseId: 'CASE-00940', patientName: 'Michael Chen',    payer: 'Aetna',                airReason: 'Authorization Delay',         requestDate: 'Oct 14, 2023', status: 'Denied'   },
  { caseId: 'CASE-00941', patientName: 'Sophia Hernandez',payer: 'Cigna',                airReason: 'Denied Claim Appeal',         requestDate: 'Oct 15, 2023', status: 'Denied'   },
  { caseId: 'CASE-00942', patientName: 'Liam Smith',      payer: 'Humana',               airReason: 'Coverage Verification',       requestDate: 'Oct 16, 2023', status: 'Denied'   },
  { caseId: 'CASE-00943', patientName: 'Olivia Johnson',  payer: 'Kaiser Permanente',    airReason: 'Duplicate Claim',             requestDate: 'Oct 17, 2023', status: 'Denied'   },
  { caseId: 'CASE-00944', patientName: 'Ethan Brown',     payer: 'United Healthcare',    airReason: 'Policy Update Request',       requestDate: 'Oct 18, 2023', status: 'Denied'   },
  { caseId: 'CASE-00945', patientName: 'Isabella Martinez',payer:'Blue Cross Blue Shield',airReason: 'Claim Status Inquiry',        requestDate: 'Oct 19, 2023', status: 'Approved' },
  { caseId: 'CASE-00946', patientName: 'Noah Davis',      payer: 'Aetna',                airReason: 'Prescription Coverage',       requestDate: 'Oct 20, 2023', status: 'Denied'   },
  { caseId: 'CASE-00947', patientName: 'Mia Wilson',      payer: 'Cigna',                airReason: 'Network Provider Issue',      requestDate: 'Oct 21, 2023', status: 'Denied'   },
  { caseId: 'CASE-00948', patientName: 'James Lee',       payer: 'Humana',               airReason: 'Benefit Clarification',       requestDate: 'Oct 22, 2023', status: 'Approved' },
  { caseId: 'CASE-00949', patientName: 'Amelia Garcia',   payer: 'Kaiser Permanente',    airReason: 'Claim Denial Explanation',    requestDate: 'Oct 23, 2023', status: 'Denied'   },
]

export const caseSelectOptions = [
  'Case 001 - Primary Osteoarthritis, Right Knee',
  'Case 002 - Type 2 Diabetes, Medication PA',
  'Case 003 - Hypertension Management',
  'Case 004 - Cardiac Catheterization',
  'Case 005 - MRI Brain Scan',
  'Case 006 - Physical Therapy Authorization',
]

const REASONING = `Patient Ramesh K. Patel (67M, MRN: 993847) presents with T2DM (HbA1c 8.4%) and CKD Stage 3b (eGFR 38, UACR 420 mg/g). Clinical Intelligence analysis confirms high-confidence ICD-CPT alignment for the primary (E11.65 → S5550: 91%) and secondary renal (N18.33 → S5550: 89%) indications.

Step therapy is fully documented and exhausted across three agents (Metformin, Glipizide, Sitagliptin). eGFR 38 is above the minimum initiation threshold of 20 mL/min/1.73m² for Empagliflozin. UACR 420 mg/g exceeds the 200 mg/g KDIGO 2024 threshold, satisfying both glycemic and renoprotective indications.

Care setting is Outpatient with Medication PA intent confirmed. One minor mismatch flagged (D63.1 — anemia of CKD vs SGLT2) — does not affect PA eligibility. Overall clinical context is strong; documentation quality meets MCG and KDIGO criteria for SGLT2 authorization.`

export const caseDetails: Record<string, CaseDetail> = {
  'CASE-00938': {
    caseId: 'CASE-00938', caseLabel: caseSelectOptions[0],
    status: 'Approved', decisionCode: 'CO - 197',
    denialReason: 'Not Medical Necessary', appealDeadline: 'May 11 (30days)',
    denialDeadline: '10/04/2025', aiAppealLetterId: 'APL-00192-v1',
    aiAppealReady: 'Draft Ready', p2pScheduled: '14/04/2026 (3:00 PM)', airStatus: 'In Progress',
    documents: [],
    reasoning: REASONING,
  },
  'CASE-00939': {
    caseId: 'CASE-00939', caseLabel: caseSelectOptions[1],
    status: 'Denied', decisionCode: 'CO - 197',
    denialReason: 'Not Medical Necessary', appealDeadline: 'May 11 (30days)',
    denialDeadline: '10/04/2025', aiAppealLetterId: 'APL-00193-v1',
    aiAppealReady: 'Draft Ready', p2pScheduled: '15/04/2026 (10:00 AM)', airStatus: 'In Progress',
    documents: [
      {
        title: 'Documentation of failed conservative treatment for minimum 6 weeks',
        policy: 'Policy 2024-KR-001, Section 4.2.1',
        evidence: 'Current documentation shows 4 weeks PT',
        docStatus: 'Partial',
      },
      {
        title: 'Updated BMI measurement within 30 days',
        policy: 'Policy 2024-KR-001, Section 4.2.1',
        docStatus: 'Missing',
      },
    ],
    reasoning: REASONING,
  },
  'CASE-00940': {
    caseId: 'CASE-00940', caseLabel: caseSelectOptions[2],
    status: 'Denied', decisionCode: 'CO - 204',
    denialReason: 'Authorization Delay', appealDeadline: 'Jun 01 (30days)',
    denialDeadline: '11/05/2025', aiAppealLetterId: 'APL-00194-v1',
    aiAppealReady: 'Pending', p2pScheduled: '20/04/2026 (2:00 PM)', airStatus: 'In Progress',
    documents: [
      {
        title: 'Physician attestation of medical necessity',
        policy: 'Policy 2024-HT-002, Section 3.1',
        evidence: 'Attestation form incomplete',
        docStatus: 'Partial',
      },
      {
        title: 'Lab results from last 60 days',
        policy: 'Policy 2024-HT-002, Section 3.2',
        docStatus: 'Missing',
      },
    ],
    reasoning: REASONING,
  },
}
