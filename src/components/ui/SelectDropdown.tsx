import { useState, useRef, useEffect } from 'react'

interface SelectDropdownProps {
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
}

const ITEM_HEIGHT = 48

export default function SelectDropdown({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = 'Select',
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(option: string) {
    onChange(option)
    setOpen(false)
  }

  return (
    <div style={{ marginBottom: '16px', position: 'relative' }} ref={ref}>
      {/* Label */}
      <div style={{
        fontSize: '14px',
        fontWeight: 400,
        color: '#262A33',
        marginBottom: '6px',
        fontFamily: "'Space Grotesk', sans-serif",
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        {label}
        {required && <span style={{ color: '#E03B3B', fontSize: '14px' }}>*</span>}
      </div>

      {/* Trigger — always same appearance */}
      <div
        onClick={() => setOpen(prev => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '11px 14px',
          backgroundColor: '#F7F5FF',
          border: '1px solid #E3E5E8',
          borderRadius: '10px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{
          fontSize: '14px',
          fontFamily: "'Space Grotesk', sans-serif",
          color: value ? '#262A33' : '#A0A6B2',
        }}>
          {value || placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#757C8D"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      {/* Dropdown list — absolute overlay, 4 items visible, rest scrollable */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: '#FFFFFF',
          border: '1px solid #E3E5E8',
          borderRadius: '10px',
          overflowY: 'auto',
          maxHeight: `${ITEM_HEIGHT * 4}px`,
          boxShadow: '0 8px 24px rgba(38, 42, 51, 0.12)',
        }}>
          {options.map((option, idx) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              style={{
                padding: '0 16px',
                height: `${ITEM_HEIGHT}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '15px',
                fontWeight: 400,
                color: '#262A33',
                fontFamily: "'Space Grotesk', sans-serif",
                cursor: 'pointer',
                borderBottom: idx < options.length - 1 ? '1px solid #ECECEC' : 'none',
                backgroundColor: value === option ? '#E8F5E9' : '#FFFFFF',
                flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = value === option ? '#E8F5E9' : '#F7F5FF')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = value === option ? '#E8F5E9' : '#FFFFFF')}
            >
              <span>{option}</span>
              {value === option && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#169D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
