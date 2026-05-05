import { useState } from 'react'
import type { User } from '../../types/user'
import Badge from '../ui/Badge'

interface UserTableProps {
  users: User[]
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (userId: number) => void
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '12px 16px',
  fontSize: '14px',
  fontWeight: 400,
  color: '#757C8D',
  backgroundColor: '#F9F9FF',
  borderBottom: '1px solid #ECECEC',
  whiteSpace: 'nowrap',
}

function ActionBtn({
  onClick, title, children, danger,
}: {
  onClick: () => void
  title: string
  children: React.ReactNode
  danger?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const color = danger ? '#E03B3B' : '#5C3FEE'
  const hoverBg = danger ? '#FFEBEE' : '#F0EDFF'
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '6px',
        border: `1px solid ${color}`,
        backgroundColor: hovered ? hoverBg : 'transparent',
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

function TableRow({ user, onView, onEdit, onDelete }: {
  user: User
  onView: (u: User) => void
  onEdit: (u: User) => void
  onDelete: (id: number) => void
}) {
  const [hovered, setHovered] = useState(false)

  const tdBase: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 400,
    borderBottom: '1px solid #ECECEC',
  }

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? '#F9F9FF' : '#FFFFFF',
        transition: 'background 0.12s',
      }}
    >
      <td style={{ ...tdBase, color: '#757C8D' }}>{user.id}</td>
      <td style={{ ...tdBase, color: '#262A33' }}>{user.username}</td>
      <td style={{ ...tdBase, color: '#757C8D', fontFamily: "'Space Mono', monospace", fontSize: '13px' }}>
        {user.email}
      </td>
      <td style={{ ...tdBase, color: '#757C8D' }}>{user.roleAssigned}</td>
      <td style={tdBase}>
        <Badge status={user.status} />
      </td>
      <td style={tdBase}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ActionBtn onClick={() => onView(user)} title="View details">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </ActionBtn>
          <ActionBtn onClick={() => onEdit(user)} title="Edit user">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </ActionBtn>
          <ActionBtn onClick={() => onDelete(user.id)} title="Delete user" danger>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6m4-6v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </ActionBtn>
        </div>
      </td>
    </tr>
  )
}

export default function UserTable({ users, onView, onEdit, onDelete }: UserTableProps) {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{
        border: '1px solid #ECECEC',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, width: '64px' }}>S.No</th>
            <th style={thStyle}>User name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role Assigned</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <TableRow
              key={user.id}
              user={user}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
