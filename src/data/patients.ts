import type { Patient, PatientDetail } from '../types/patients'

export const patients: Patient[] = [
  { caseId: 'CASE-00938', name: 'John Doe',        payerId: '00912', procedureCodes: '73645, 89204', diagnosisCode: '345', status: 'Insurance Verification'      },
  { caseId: 'CASE-00939', name: 'Jane Smith',       payerId: '00913', procedureCodes: '84512, 90231', diagnosisCode: '346', status: 'Pending Clinical Intelligence' },
  { caseId: 'CASE-00940', name: 'Michael Lee',      payerId: '00914', procedureCodes: '76123, 88456', diagnosisCode: '347', status: 'Authorization Pending'         },
  { caseId: 'CASE-00941', name: 'Emily Davis',      payerId: '00915', procedureCodes: '67234, 78901', diagnosisCode: '348', status: 'Submission Complete'           },
  { caseId: 'CASE-00942', name: 'David Martinez',   payerId: '00916', procedureCodes: '85412, 90123', diagnosisCode: '349', status: 'Insurance Verification'        },
  { caseId: 'CASE-00943', name: 'Sophia Turner',    payerId: '00917', procedureCodes: '76345, 89012', diagnosisCode: '350', status: 'Pending Clinical Intelligence' },
  { caseId: 'CASE-00944', name: 'James Wilson',     payerId: '00918', procedureCodes: '74561, 88234', diagnosisCode: '351', status: 'Authorization Pending'         },
  { caseId: 'CASE-00945', name: 'Olivia Brown',     payerId: '00919', procedureCodes: '81234, 89456', diagnosisCode: '352', status: 'Submission Complete'           },
  { caseId: 'CASE-00946', name: 'Liam Johnson',     payerId: '00920', procedureCodes: '78901, 86754', diagnosisCode: '353', status: 'Insurance Verification'        },
  { caseId: 'CASE-00947', name: 'Ava Garcia',       payerId: '00921', procedureCodes: '83456, 89901', diagnosisCode: '354', status: 'Pending Clinical Intelligence' },
  { caseId: 'CASE-00948', name: 'Ethan Martinez',   payerId: '00922', procedureCodes: '76543, 87210', diagnosisCode: '355', status: 'Authorization Pending'         },
  { caseId: 'CASE-00949', name: 'Mia Anderson',     payerId: '00923', procedureCodes: '78321, 80976', diagnosisCode: '356', status: 'Submission Complete'           },
]

const DOCUMENTS = [
  'Doctor letter',
  'Patient demographics',
  'Physician order',
  'Insurance card (front/back)',
  'Physician order',
  'Lab results',
  'Clinical notes',
  'Treatment history documentation',
]

export const patientDetails: Record<string, PatientDetail> = {
  'CASE-00938': { ...patients[0],  memberId: 'U12388946', dateOfBirth: '03/15/2001', gender: 'Female', phone: '(555) 123-4567', email: 'john.doe@email.com',       address: '123 Oak Street, Boston, MA 02101',         previousPAs: 8,  insuranceProvider: 'United Healthcare', documents: DOCUMENTS },
  'CASE-00939': { ...patients[1],  memberId: 'U12388947', dateOfBirth: '07/22/1985', gender: 'Female', phone: '(555) 234-5678', email: 'jane.smith@email.com',      address: '456 Maple Ave, Cambridge, MA 02139',       previousPAs: 3,  insuranceProvider: 'Aetna HMO',          documents: DOCUMENTS },
  'CASE-00940': { ...patients[2],  memberId: 'U12388948', dateOfBirth: '11/08/1978', gender: 'Male',   phone: '(555) 345-6789', email: 'michael.lee@email.com',     address: '789 Pine Rd, Somerville, MA 02143',        previousPAs: 5,  insuranceProvider: 'BCBS PPO',           documents: DOCUMENTS },
  'CASE-00941': { ...patients[3],  memberId: 'U12388949', dateOfBirth: '04/30/1993', gender: 'Female', phone: '(555) 456-7890', email: 'emily.davis@email.com',     address: '321 Elm St, Quincy, MA 02169',             previousPAs: 2,  insuranceProvider: 'Cigna POS',          documents: DOCUMENTS },
  'CASE-00942': { ...patients[4],  memberId: 'U12388950', dateOfBirth: '09/14/1970', gender: 'Male',   phone: '(555) 567-8901', email: 'david.martinez@email.com',  address: '654 Cedar Blvd, Brookline, MA 02445',      previousPAs: 11, insuranceProvider: 'United Healthcare',  documents: DOCUMENTS },
  'CASE-00943': { ...patients[5],  memberId: 'U12388951', dateOfBirth: '02/18/1989', gender: 'Female', phone: '(555) 678-9012', email: 'sophia.turner@email.com',   address: '987 Birch Lane, Newton, MA 02458',         previousPAs: 4,  insuranceProvider: 'Humana PPO',         documents: DOCUMENTS },
  'CASE-00944': { ...patients[6],  memberId: 'U12388952', dateOfBirth: '06/05/1962', gender: 'Male',   phone: '(555) 789-0123', email: 'james.wilson@email.com',    address: '147 Spruce Way, Waltham, MA 02451',        previousPAs: 7,  insuranceProvider: 'Aetna PPO',          documents: DOCUMENTS },
  'CASE-00945': { ...patients[7],  memberId: 'U12388953', dateOfBirth: '12/27/1997', gender: 'Female', phone: '(555) 890-1234', email: 'olivia.brown@email.com',    address: '258 Willow Ct, Medford, MA 02155',         previousPAs: 1,  insuranceProvider: 'BCBS PPO',           documents: DOCUMENTS },
  'CASE-00946': { ...patients[8],  memberId: 'U12388954', dateOfBirth: '08/19/1980', gender: 'Male',   phone: '(555) 901-2345', email: 'liam.johnson@email.com',    address: '369 Poplar Dr, Malden, MA 02148',          previousPAs: 6,  insuranceProvider: 'United Healthcare',  documents: DOCUMENTS },
  'CASE-00947': { ...patients[9],  memberId: 'U12388955', dateOfBirth: '03/03/2000', gender: 'Female', phone: '(555) 012-3456', email: 'ava.garcia@email.com',      address: '741 Ash St, Everett, MA 02149',            previousPAs: 2,  insuranceProvider: 'Cigna POS',          documents: DOCUMENTS },
  'CASE-00948': { ...patients[10], memberId: 'U12388956', dateOfBirth: '10/11/1975', gender: 'Male',   phone: '(555) 123-4568', email: 'ethan.martinez@email.com',  address: '852 Chestnut Ave, Chelsea, MA 02150',      previousPAs: 9,  insuranceProvider: 'Humana PPO',         documents: DOCUMENTS },
  'CASE-00949': { ...patients[11], memberId: 'U12388957', dateOfBirth: '05/25/1991', gender: 'Female', phone: '(555) 234-5679', email: 'mia.anderson@email.com',    address: '963 Walnut St, Revere, MA 02151',          previousPAs: 3,  insuranceProvider: 'Aetna HMO',          documents: DOCUMENTS },
}
