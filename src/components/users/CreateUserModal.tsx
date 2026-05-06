import { useState } from 'react'
import type { User, UserAccess, UserRole } from '../../types/user'
import { defaultAccess } from '../../data/users'
import Modal from '../ui/Modal'
import FormField from '../ui/FormField'
import SelectDropdown from '../ui/SelectDropdown'
import AccessLevelControl from './AccessLevelControl'

interface CreateUserModalProps {
  onClose: () => void
  onCreate: (user: Omit<User, 'id'>) => void
}

const roles: UserRole[] = ['PA Specialist', 'Clinical Reviewer', 'Coding Specialist', 'Team Lead', 'Ops Manager', 'Org Admin']

const leftFields: { key: keyof UserAccess; label: string }[] = [
  { key: 'caseDetails', label: 'Case Details' },
  { key: 'uploadDocuments', label: 'Upload Documents' },
  { key: 'validateCodes', label: 'Validate Codes' },
  { key: 'predictDenial', label: 'Predict Denial' },
  { key: 'userManagement', label: 'User Management' },
]

const rightFields: { key: keyof UserAccess; label: string }[] = [
  { key: 'submitPA', label: 'Submit PA' },
  { key: 'validateClinicalContent', label: 'Validate Clinical Content' },
  { key: 'overrideAI', label: 'Override AI' },
  { key: 'configureRules', label: 'Configure Rules' },
  { key: 'analytics', label: 'Analytics' },
]

const PURPLE = '#5C3FEE'

export default function CreateUserModal({ onClose, onCreate }: CreateUserModalProps): React.JSX.Element {
  const [role, setRole] = useState<UserRole | ''>('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [access, setAccess] = useState<UserAccess>({ ...defaultAccess })

  function setAccessField(key: keyof UserAccess, value: UserAccess[keyof UserAccess]) {
    setAccess(prev => ({ ...prev, [key]: value }))
  }

  function handleCreate() {
    if (!role || !username || !email) return
    onCreate({ username, email, roleAssigned: role as UserRole, status: 'Active', access })
  }

  const canCreate = Boolean(role && username && email)

  return (
    <Modal
      title="Create New User"
      subtitle="Grant the user the required access."
      onClose={onClose}
      wide
      footer={
        <div style={{
          display: 'flex', justifyContent: 'flex-end', gap: '12px',
          paddingTop: '16px', borderTop: '1px solid #ECECEC',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px', fontSize: '14px', fontWeight: 700,
              color: PURPLE, backgroundColor: 'transparent',
              border: `1px solid ${PURPLE}`, borderRadius: '10px',
              cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!canCreate}
            style={{
              padding: '10px 24px', fontSize: '14px', fontWeight: 700,
              color: '#FFFFFF',
              backgroundColor: canCreate ? PURPLE : '#B8ACEF',
              border: 'none', borderRadius: '10px',
              cursor: canCreate ? 'pointer' : 'not-allowed',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Create
          </button>
        </div>
      }
    >
      <SelectDropdown
        label="Role"
        required
        value={role}
        onChange={val => setRole(val as UserRole)}
        options={roles}
        placeholder="Select"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '4px' }}>
        <FormField
          label="User Name"
          required
          value={username}
          onChange={setUsername}
          placeholder="Enter the Name"
        />
        <FormField
          label="User Email"
          required
          value={email}
          onChange={setEmail}
          placeholder="xyz@gmail.com"
          type="email"
        />
      </div>

      <div style={{ borderTop: '1px solid #ECECEC', paddingTop: '16px' }}>
        <p style={{
          fontSize: '12px', fontWeight: 600, color: '#757C8D',
          textTransform: 'uppercase', letterSpacing: '1px',
          margin: '0 0 12px', fontFamily: "'Space Grotesk', sans-serif",
        }}>
          Access Level Control
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
          <div>
            {leftFields.map(({ key, label }) => (
              <AccessLevelControl key={key} label={label} value={access[key]} onChange={val => setAccessField(key, val)} />
            ))}
          </div>
          <div>
            {rightFields.map(({ key, label }) => (
              <AccessLevelControl key={key} label={label} value={access[key]} onChange={val => setAccessField(key, val)} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
