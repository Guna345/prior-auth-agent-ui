import type { UserStatus } from '../../types/user'

interface BadgeProps {
  status: UserStatus
}

export default function Badge({ status }: BadgeProps) {
  const isActive = status === 'Active'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: 400,
        backgroundColor: isActive ? '#E8F5E9' : '#FFEBEE',
        color: isActive ? '#169D2A' : '#E03B3B',
      }}
    >
      {status}
    </span>
  )
}
