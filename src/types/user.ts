export type AccessLevel = 'None' | 'View' | 'Edit'
export type UserStatus = 'Active' | 'Inactive'
export type UserRole = 'PA Specialist' | 'Clinical Reviewer' | 'Coding Specialist' | 'Team Lead' | 'Ops Manager' | 'Org Admin'

export interface UserAccess {
  caseDetails: AccessLevel
  submitPA: AccessLevel
  uploadDocuments: AccessLevel
  validateClinicalContent: AccessLevel
  validateCodes: AccessLevel
  overrideAI: AccessLevel
  predictDenial: AccessLevel
  configureRules: AccessLevel
  userManagement: AccessLevel
  analytics: AccessLevel
}

export interface User {
  id: number
  username: string
  email: string
  roleAssigned: UserRole
  status: UserStatus
  access: UserAccess
}
