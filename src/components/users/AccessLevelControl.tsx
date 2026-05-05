import type { AccessLevel } from '../../types/user'

interface AccessLevelControlProps {
  label: string
  value: AccessLevel
  onChange: (value: AccessLevel) => void
}

const levels: AccessLevel[] = ['None', 'View', 'Edit']

export default function AccessLevelControl({ label, value, onChange }: AccessLevelControlProps) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <span style={{
        display: 'block',
        fontSize: '15px',
        fontWeight: 400,
        color: '#262A33',
        marginBottom: '10px',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {levels.map(level => (
          <label key={level} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name={`access-${label}`}
              value={level}
              checked={value === level}
              onChange={() => onChange(level)}
              style={{ accentColor: '#5C3FEE', width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <span style={{
              fontSize: '14px',
              color: '#262A33',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {level}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
