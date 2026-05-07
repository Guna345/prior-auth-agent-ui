const PURPLE = '#5C3FEE'

interface ChevronNavProps {
  canGoBack: boolean
  canGoNext: boolean
  onBack: () => void
  onNext: () => void
}

export default function ChevronNav({ canGoBack, canGoNext, onBack, onNext }: ChevronNavProps) {
  return (
    <div style={{ padding: '12px 32px 16px', display: 'flex', justifyContent: 'flex-end', gap: '10px', flexShrink: 0 }}>
      <ChevronBtn direction="left"  enabled={canGoBack} onClick={onBack} />
      <ChevronBtn direction="right" enabled={canGoNext} onClick={onNext} />
    </div>
  )
}

function ChevronBtn({ direction, enabled, onClick }: { direction: 'left' | 'right'; enabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={!enabled}
      style={{
        width: '40px', height: '40px', borderRadius: '8px',
        border: `1.5px solid ${enabled ? PURPLE : '#C8CDD6'}`,
        backgroundColor: 'transparent',
        cursor: enabled ? 'pointer' : 'not-allowed',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={enabled ? PURPLE : '#C8CDD6'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'left'
          ? <polyline points="15 18 9 12 15 6"/>
          : <polyline points="9 18 15 12 9 6"/>}
      </svg>
    </button>
  )
}
