import { useState } from 'react'

interface ConfigActionBtnProps {
  onClick: () => void
  danger?: boolean
  icon: 'edit' | 'delete' | 'view'
}

const ICONS = {
  edit: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  delete: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6m4-6v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  ),
  view: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
}

export default function ConfigActionBtn({ onClick, danger = false, icon }: ConfigActionBtnProps): React.JSX.Element {
  const [hovered, setHovered] = useState(false)
  const color = danger ? '#E03B3B' : '#5C3FEE'
  const hoverBg = danger ? '#FFEBEE' : '#F0EDFF'
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '32px', height: '32px', borderRadius: '6px',
        border: `1px solid ${color}`, backgroundColor: hovered ? hoverBg : 'transparent',
        color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.15s', flexShrink: 0,
      }}
    >
      {ICONS[icon]}
    </button>
  )
}
