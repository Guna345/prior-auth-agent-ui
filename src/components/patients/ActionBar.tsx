const PURPLE = '#5C3FEE'
const FONT   = "'Space Grotesk', sans-serif"

interface ActionBarProps {
  onBack: () => void
  onNext: () => void
  backLabel: string
  nextLabel: string
  nextDisabled?: boolean
}

export default function ActionBar({ onBack, onNext, backLabel, nextLabel, nextDisabled = false }: ActionBarProps) {
  return (
    <div style={{ borderTop: '1px solid #ECECEC', padding: '16px 32px', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0, backgroundColor: '#FFFFFF' }}>
      <button
        onClick={onBack}
        style={{ padding: '10px 24px', fontSize: '14px', fontWeight: 700, backgroundColor: 'transparent', color: PURPLE, border: `1px solid ${PURPLE}`, borderRadius: '10px', cursor: 'pointer', fontFamily: FONT }}
      >
        {backLabel}
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        style={{ padding: '10px 24px', fontSize: '14px', fontWeight: 700, backgroundColor: nextDisabled ? '#B8ACEF' : PURPLE, color: '#FFFFFF', border: 'none', borderRadius: '10px', cursor: nextDisabled ? 'not-allowed' : 'pointer', fontFamily: FONT }}
      >
        {nextLabel}
      </button>
    </div>
  )
}
