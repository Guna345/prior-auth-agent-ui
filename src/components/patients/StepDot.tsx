const PURPLE = '#5C3FEE'
const GREEN  = '#169D2A'

interface StepDotProps {
  state: 'done' | 'active' | 'future'
}

export default function StepDot({ state }: StepDotProps) {
  if (state === 'done') {
    return (
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
    )
  }
  if (state === 'active') {
    return (
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: PURPLE, border: `2px solid ${PURPLE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
      </div>
    )
  }
  return (
    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #C8CDD6', backgroundColor: 'transparent', flexShrink: 0 }} />
  )
}
