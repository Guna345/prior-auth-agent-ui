import { useState } from 'react'
import type { User } from '../../types/user'

interface UserDetailPanelProps {
  user: User
  onClose: () => void
  onEdit: (user: User) => void
}

const accessFields: { key: keyof User['access']; label: string }[] = [
  { key: 'caseDetails', label: 'Case Details' },
  { key: 'submitPA', label: 'Submit PA' },
  { key: 'uploadDocuments', label: 'Upload Documents' },
  { key: 'validateClinicalContent', label: 'Validate Clinical Content' },
  { key: 'validateCodes', label: 'Validate Codes' },
  { key: 'overrideAI', label: 'Override AI' },
  { key: 'predictDenial', label: 'Predict Denial' },
  { key: 'configureRules', label: 'Configure Rules' },
  { key: 'userManagement', label: 'User Management' },
  { key: 'analytics', label: 'Analytics' },
]

function EditBtn({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '7px 20px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#5C3FEE',
        backgroundColor: hovered ? '#F0EDFF' : 'transparent',
        border: '1px solid #5C3FEE',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: "'Space Grotesk', sans-serif",
        transition: 'background 0.15s',
      }}
    >
      Edit
    </button>
  )
}

export default function UserDetailPanel({ user, onClose, onEdit }: UserDetailPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(38, 42, 51, 0.35)',
          zIndex: 40,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '480px',
          backgroundColor: '#FFFFFF',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.08)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #ECECEC',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                width: '28px',
                height: '28px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                color: '#757C8D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                padding: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#262A33',
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {user.username} Details
            </h3>
          </div>
          <EditBtn onClick={() => onEdit(user)} />
        </div>

        {/* Access Table */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{
                  textAlign: 'left',
                  padding: '14px 24px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#757C8D',
                  borderBottom: '1px solid #ECECEC',
                }}>
                  Detail
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '14px 24px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#757C8D',
                  borderBottom: '1px solid #ECECEC',
                }}>
                  Access
                </th>
              </tr>
            </thead>
            <tbody>
              {accessFields.map(({ key, label }) => (
                <tr key={key}>
                  <td style={{
                    padding: '16px 24px',
                    fontSize: '14px',
                    color: '#262A33',
                    borderBottom: '1px solid #ECECEC',
                  }}>
                    {label}
                  </td>
                  <td style={{
                    padding: '16px 24px',
                    fontSize: '14px',
                    color: '#262A33',
                    borderBottom: '1px solid #ECECEC',
                  }}>
                    {user.access[key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
