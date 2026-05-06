import { useState } from 'react'

interface FormTextAreaProps {
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  disabled?: boolean
  rows?: number
}

export default function FormTextArea({
  label, required, value, onChange, placeholder, error, disabled, rows = 4,
}: FormTextAreaProps): React.JSX.Element {
  const [focused, setFocused] = useState(false)

  const borderColor = error ? '#E03B3B' : focused ? '#5C3FEE' : '#E3E5E8'
  const bgColor = disabled ? '#EBEBEF' : '#F7F5FF'
  const textColor = disabled ? '#A0A6B2' : '#262A33'

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block', fontSize: '14px', fontWeight: 400, color: '#262A33',
        marginBottom: '6px', fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {label}
        {required && <span style={{ color: '#E03B3B', marginLeft: '2px' }}>*</span>}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', boxSizing: 'border-box',
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '10px',
          padding: '11px 14px',
          fontSize: '14px',
          color: textColor,
          fontFamily: "'Space Grotesk', sans-serif",
          outline: 'none',
          resize: 'vertical',
          cursor: disabled ? 'not-allowed' : 'text',
          transition: 'border-color 0.15s',
        }}
      />
      {error && (
        <p style={{
          fontSize: '12px', color: '#E03B3B', margin: '4px 0 0',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {error}
        </p>
      )}
    </div>
  )
}
