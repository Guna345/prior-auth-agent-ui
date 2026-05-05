import type { User } from '../types/user'

export const defaultAccess = {
  caseDetails: 'None' as const,
  submitPA: 'None' as const,
  uploadDocuments: 'None' as const,
  validateClinicalContent: 'None' as const,
  validateCodes: 'None' as const,
  overrideAI: 'None' as const,
  predictDenial: 'None' as const,
  configureRules: 'None' as const,
  userManagement: 'None' as const,
  analytics: 'None' as const,
}

export const mockUsers: User[] = [
  { id: 1,  username: 'John Doe',         email: 'johndoe@gmail.com',           roleAssigned: 'PA Specialist',      status: 'Active',   access: { ...defaultAccess, uploadDocuments: 'View', validateClinicalContent: 'View', overrideAI: 'Edit', predictDenial: 'Edit', configureRules: 'Edit' } },
  { id: 2,  username: 'Jane Smith',        email: 'janesmith@yahoo.com',         roleAssigned: 'Clinical Reviewer',  status: 'Active',   access: { ...defaultAccess, caseDetails: 'View', submitPA: 'View', validateClinicalContent: 'Edit' } },
  { id: 3,  username: 'Michael Brown',     email: 'michael.brown@outlook.com',   roleAssigned: 'Coding Specialist',  status: 'Inactive', access: { ...defaultAccess, validateCodes: 'Edit' } },
  { id: 4,  username: 'Emily Davis',       email: 'emilydavis@hotmail.com',      roleAssigned: 'Team Lead',          status: 'Active',   access: { ...defaultAccess, caseDetails: 'Edit', submitPA: 'Edit', uploadDocuments: 'Edit', analytics: 'View' } },
  { id: 5,  username: 'David Wilson',      email: 'dwilson@gmail.com',           roleAssigned: 'Ops Manager',        status: 'Active',   access: { ...defaultAccess, predictDenial: 'View', analytics: 'Edit' } },
  { id: 6,  username: 'Sophia Martinez',   email: 'smartinez@yahoo.com',         roleAssigned: 'Org Admin',          status: 'Active',   access: { caseDetails: 'Edit', submitPA: 'Edit', uploadDocuments: 'Edit', validateClinicalContent: 'Edit', validateCodes: 'Edit', overrideAI: 'Edit', predictDenial: 'Edit', configureRules: 'Edit', userManagement: 'Edit', analytics: 'Edit' } },
  { id: 7,  username: 'James Taylor',      email: 'jtaylor@gmail.com',           roleAssigned: 'PA Specialist',      status: 'Inactive', access: { ...defaultAccess, submitPA: 'View' } },
  { id: 8,  username: 'Olivia Anderson',   email: 'oanderson@company.com',       roleAssigned: 'Clinical Reviewer',  status: 'Active',   access: { ...defaultAccess, caseDetails: 'View', validateClinicalContent: 'View' } },
  { id: 9,  username: 'William Thomas',    email: 'willthomas@hotmail.com',      roleAssigned: 'Coding Specialist',  status: 'Active',   access: { ...defaultAccess, validateCodes: 'View', configureRules: 'View' } },
  { id: 10, username: 'Isabella Jackson',  email: 'isabellaj@gmail.com',         roleAssigned: 'Team Lead',          status: 'Inactive', access: { ...defaultAccess, caseDetails: 'Edit', userManagement: 'View' } },
  { id: 11, username: 'Alexander White',   email: 'awhite@outlook.com',          roleAssigned: 'Ops Manager',        status: 'Active',   access: { ...defaultAccess, analytics: 'Edit', predictDenial: 'View' } },
  { id: 12, username: 'Mia Harris',        email: 'mharris@yahoo.com',           roleAssigned: 'Org Admin',          status: 'Active',   access: { caseDetails: 'Edit', submitPA: 'Edit', uploadDocuments: 'Edit', validateClinicalContent: 'Edit', validateCodes: 'Edit', overrideAI: 'Edit', predictDenial: 'Edit', configureRules: 'Edit', userManagement: 'Edit', analytics: 'Edit' } },
  { id: 13, username: 'Ethan Martin',      email: 'ethanmartin@gmail.com',       roleAssigned: 'PA Specialist',      status: 'Inactive', access: { ...defaultAccess } },
]
