const PURPLE = '#5C3FEE'
const GREEN  = '#169D2A'
const FONT   = "'Space Grotesk', sans-serif"

const COVERAGE_SCORE = 90

const COVERAGE_DETAILS = [
  { label: 'Plan Name',          value: 'Aetna Chioce PPO' },
  { label: 'Plan Type',          value: 'PPO' },
  { label: 'Network Status',     value: 'IN_Network' },
  { label: 'Ded_Remaining',      value: '$800' },
  { label: 'OOP_Remaining',      value: '@23,000' },
  { label: 'Coinsurance',        value: '20%' },
  { label: 'IV_timestamp',       value: '15/5/2026' },
  { label: 'Previous PAs Count', value: '10' },
  { label: 'Reference',          value: 'https://www.ablwebsite.com' },
]

function CircleProgress({ percent }: { percent: number }) {
  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ
  return (
    <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
      <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E8F5E9" strokeWidth="8" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={GREEN} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 700, color: GREEN, fontFamily: FONT }}>{percent}%</span>
      </div>
    </div>
  )
}

interface InsuranceCoverageProps {
  reasoningOpen: boolean
  onShowReasoning: () => void
}

export default function InsuranceCoverage({ reasoningOpen, onShowReasoning }: InsuranceCoverageProps) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Insurance Coverage</h2>
        {!reasoningOpen && (
          <button
            onClick={onShowReasoning}
            style={{ padding: '10px 24px', fontSize: '14px', fontWeight: 700, backgroundColor: 'transparent', color: PURPLE, border: `1px solid ${PURPLE}`, borderRadius: '10px', cursor: 'pointer', fontFamily: FONT }}
          >
            Reasoning
          </button>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
        <CircleProgress percent={COVERAGE_SCORE} />
        <p style={{ margin: 0, fontSize: '14px', color: '#757C8D', fontFamily: FONT }}>You can handle more than 90% of claims.</p>
      </div>
      <div style={{ borderTop: '1px solid #ECECEC', paddingTop: '20px' }}>
        <p style={{ margin: '0 0 18px', fontSize: '14px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>Details</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px 32px' }}>
          {COVERAGE_DETAILS.map(d => (
            <div key={d.label}>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#757C8D', fontFamily: FONT }}>{d.label}</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#262A33', fontFamily: FONT }}>{d.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
