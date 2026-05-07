import { useState } from 'react'
import { RISK_RESULTS } from '../../data/clinicalIntelligence'
import CaseDropdown from '../ui/CaseDropdown'

const PURPLE = '#5C3FEE'
const FONT = "'Space Grotesk', sans-serif"

function riskColor(level: string) {
  return level === 'High Risk' ? '#DC2626' : '#F97316'
}

function riskBadgeStyle(level: string): React.CSSProperties {
  if (level === 'High Risk') return { backgroundColor: '#FEE2E2', color: '#B91C1C' }
  return { backgroundColor: '#FEF3C7', color: '#92400E' }
}

function recommendationBadge(level: string): React.CSSProperties {
  if (level === 'Critical') return { backgroundColor: '#FEE2E2', color: '#B91C1C' }
  if (level === 'High')     return { backgroundColor: '#FFEDD5', color: '#C2410C' }
  return { backgroundColor: '#EFF6FF', color: '#1D4ED8' }
}

function RiskCircle({ percent, color, size = 80 }: { percent: number; color: string; size?: number }) {
  const r = size * 0.38
  const cx = size / 2
  const cy = size / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F3F4F6" strokeWidth="7" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size * 0.22, fontWeight: 700, color, fontFamily: FONT }}>{percent}%</span>
      </div>
    </div>
  )
}

export default function RiskResults() {
  const [selectedCase, setSelectedCase] = useState(RISK_RESULTS.cases[0])
  const [reasoningExpanded, setReasoningExpanded] = useState(false)

  const caseIndex = RISK_RESULTS.cases.indexOf(selectedCase)
  const data = RISK_RESULTS.byCaseIndex[caseIndex] ?? RISK_RESULTS.byCaseIndex[0]
  const rCol = riskColor(data.denialRisk.level)
  const reasoningPreview = RISK_RESULTS.reasoning.split('\n\n')[0]

  return (
    <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
      <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Risk</h2>

      {/* Reusable case dropdown */}
      <CaseDropdown cases={RISK_RESULTS.cases} value={selectedCase} onChange={setSelectedCase} />

      {/* ── Denial Risk ── */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Denial Risk</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <RiskCircle percent={data.denialRisk.percent} color={rCol} size={80} />
          <div>
            <span style={{
              display: 'inline-block', padding: '3px 12px', borderRadius: '6px',
              fontSize: '12px', fontWeight: 700, marginBottom: '6px',
              ...riskBadgeStyle(data.denialRisk.level),
            }}>
              {data.denialRisk.level}
            </span>
            <p style={{ margin: 0, fontSize: '12px', color: '#757C8D', fontFamily: FONT }}>AI Analysed Based on the Below values</p>
          </div>
        </div>

        {/* Score grid — 3 then 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px 20px', marginBottom: '8px' }}>
          {data.denialRisk.scores.slice(0, 3).map(s => (
            <div key={s.label}>
              <p style={{ margin: '0 0 2px', fontSize: '20px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>{s.value}</p>
              <p style={{ margin: '0 0 3px', fontSize: '12px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#757C8D', fontFamily: FONT }}>• {s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 20px' }}>
          {data.denialRisk.scores.slice(3).map(s => (
            <div key={s.label}>
              <p style={{ margin: '0 0 2px', fontSize: '20px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>{s.value}</p>
              <p style={{ margin: '0 0 3px', fontSize: '12px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#757C8D', fontFamily: FONT }}>• {s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Reasons for Denial ── */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '16px' }}>⚠️</span>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Reasons for Denial</p>
        </div>
        <div style={{
          backgroundColor: '#FFF1F2', border: '1px solid #FECDD3',
          borderRadius: '10px', padding: '16px 20px',
          display: 'flex', flexDirection: 'column', gap: '10px',
        }}>
          {data.denialReasons.map((reason, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ color: '#FB7185', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>◇</span>
              <span style={{ fontSize: '13px', color: '#374151', fontFamily: FONT, lineHeight: '1.5' }}>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recommendations ── */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '16px' }}>💡</span>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Recommendations</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {data.recommendations.map((rec, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 18px', backgroundColor: '#F0FDF4',
              borderTop: i === 0 ? '1px solid #BBF7D0' : 'none',
              borderBottom: '1px solid #BBF7D0',
              borderLeft: '1px solid #BBF7D0',
              borderRight: '1px solid #BBF7D0',
              borderRadius: i === 0 ? '10px 10px 0 0' : i === data.recommendations.length - 1 ? '0 0 10px 10px' : '0',
              gap: '12px',
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>{rec.text}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#757C8D', fontFamily: FONT }}>Risk -{rec.points} points</p>
              </div>
              <span style={{
                padding: '3px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700,
                flexShrink: 0, ...recommendationBadge(rec.level),
              }}>
                {rec.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Explainability ── */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Explainability</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
          <RiskCircle percent={data.explainability.percent} color={rCol} size={80} />
          <p style={{ margin: 0, fontSize: '13px', color: '#757C8D', fontFamily: FONT }}>{data.explainability.label}</p>
        </div>

        <div style={{ backgroundColor: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: '10px', padding: '14px 18px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Reasons for Denial</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.explainability.reasons.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#FB7185', fontSize: '14px', flexShrink: 0 }}>◇</span>
                <span style={{ fontSize: '13px', color: '#374151', fontFamily: FONT }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reasoning ── */}
      <div style={{
        border: '1px solid #DDD6FE', borderLeft: `3px solid ${PURPLE}`,
        borderRadius: '0 12px 12px 0', backgroundColor: '#F7F5FF', padding: '16px 20px',
      }}>
        <p style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: PURPLE, fontFamily: FONT }}>Reasoning</p>
        <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.8', whiteSpace: 'pre-line' }}>
          {reasoningExpanded ? RISK_RESULTS.reasoning : reasoningPreview}
        </p>
        <button
          onClick={() => setReasoningExpanded(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: PURPLE, fontFamily: FONT, padding: 0 }}
        >
          {reasoningExpanded ? 'View Less ▲' : 'View More ▼'}
        </button>
      </div>
    </div>
  )
}
