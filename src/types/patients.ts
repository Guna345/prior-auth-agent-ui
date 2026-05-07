export type PatientStatus =
  | 'Insurance Verification'
  | 'Pending Clinical Intelligence'
  | 'Authorization Pending'
  | 'Submission Complete'

export interface Patient {
  caseId: string
  name: string
  payerId: string
  procedureCodes: string
  diagnosisCode: string
  status: PatientStatus
}

export interface PatientDetail extends Patient {
  memberId: string
  dateOfBirth: string
  gender: string
  phone: string
  email: string
  address: string
  previousPAs: number
  insuranceProvider: string
  documents: string[]
}
