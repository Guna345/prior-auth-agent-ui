export type CaseStatus = 'Approved' | 'Denied'
export type DocumentStatus = 'Partial' | 'Missing' | 'Present'

export interface AirCase {
  caseId: string
  patientName: string
  payer: string
  airReason: string
  requestDate: string
  status: CaseStatus
}

export interface CaseDocument {
  title: string
  policy: string
  evidence?: string
  docStatus: DocumentStatus
}

export interface CaseDetail {
  caseId: string
  caseLabel: string
  status: CaseStatus
  decisionCode: string
  denialReason: string
  appealDeadline: string
  denialDeadline: string
  aiAppealLetterId: string
  aiAppealReady: string
  p2pScheduled: string
  airStatus: string
  documents: CaseDocument[]
  reasoning: string
}
