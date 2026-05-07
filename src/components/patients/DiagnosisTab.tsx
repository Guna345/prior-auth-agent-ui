import { READINESS_RESULTS } from '../../data/readiness-data'

const PURPLE = '#5C3FEE'
const FONT   = "'Space Grotesk', sans-serif"

const labelStyle = { margin: 0, fontSize: '13px', fontWeight: 600 as const, color: '#262A33', fontFamily: FONT, minWidth: '160px' }
const valueStyle = { margin: 0, fontSize: '13px', color: '#374151', fontFamily: FONT, lineHeight: '1.6' }
const rowStyle   = { display: 'flex', gap: '16px', marginBottom: '10px' }

export default function DiagnosisTab() {
  const d = READINESS_RESULTS.diagnosis

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Diagnosis History Match</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {d.matches.map((m, i) => (
            <div key={i} style={{ border: '1px solid #ECECEC', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '10px', color: '#757C8D', fontFamily: FONT }}>ICD</p>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>{m.icd}</p>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#D1FAE5' }} />
                  <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, backgroundColor: '#D1FAE5', color: '#065F46', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#065F46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Matched
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#D1FAE5' }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '10px', color: '#757C8D', fontFamily: FONT }}>CPT</p>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: PURPLE, fontFamily: FONT }}>{m.cpt}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', alignItems: 'end' }}>
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: '10px', color: '#757C8D', fontFamily: FONT }}>Diagnosis Name</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#262A33', fontFamily: FONT }}>{m.name}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '10px', color: '#757C8D', fontFamily: FONT }}>Score</p>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#169D2A' }}>{m.score}%</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '10px', color: '#757C8D', fontFamily: FONT }}>Source</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#262A33', fontFamily: FONT }}>{m.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ border: '1px solid #DDD6FE', borderLeft: `3px solid ${PURPLE}`, borderRadius: '0 12px 12px 0', backgroundColor: '#FAFAFA' }}>
        <Section title="Extracted Diagnosis">
          <Row label="Primary Diagnosis:" value={d.extracted.primary} />
          <Row label="Secondary Diagnosis:" value={d.extracted.secondary} last />
        </Section>

        <Section title="CPT-ICD Justification">
          <Row label="Procedure:" value={d.justification.procedure} />
          <div style={rowStyle}>
            <p style={labelStyle}>Justification Status:</p>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#B45309', fontFamily: FONT }}>⚠️ {d.justification.status}</span>
          </div>
          <div style={{ ...rowStyle, marginBottom: 0 }}>
            <p style={labelStyle}>Reason:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {d.justification.reasons.map((r, i) => <p key={i} style={{ margin: 0, fontSize: '13px', color: '#374151', fontFamily: FONT }}>- {r}</p>)}
            </div>
          </div>
        </Section>

        <Section title="Clinical Validation Score">
          <Row label="Clinical Strength Score:" value={`${d.clinicalValidation.score}%`} />
          <InsightList label="Insights:" items={d.clinicalValidation.insights} last />
        </Section>

        <Section title="Coding Quality Check">
          <div style={rowStyle}>
            <p style={labelStyle}>Coding Accuracy:</p>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#065F46', fontFamily: FONT }}>✅ {d.codingQuality.accuracy}</span>
          </div>
          <InsightList label="Insights:" items={d.codingQuality.insights} last />
        </Section>

        <Section title="Explainability or Reasoning">
          <Row label="Decision:" value={d.explainability.decision} />
          <InsightList label="Insights:" items={d.explainability.insights} />
          <InsightList label="Source:" items={d.explainability.source} />
          <Row label="Action:" value={d.explainability.action} last />
        </Section>

        <div style={{ padding: '16px 20px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>System Outcome</p>
          <div style={rowStyle}>
            <p style={labelStyle}>Status:</p>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#B45309', fontFamily: FONT }}>⚠️ {d.systemOutcome.status}</span>
          </div>
          <div style={{ ...rowStyle, marginBottom: 0 }}>
            <p style={labelStyle}>Impact:</p>
            <p style={valueStyle}>{d.systemOutcome.impact}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: '16px 20px', borderBottom: '1px solid #ECECEC' }}>
      <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>{title}</p>
      {children}
    </div>
  )
}

function Row({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div style={{ ...rowStyle, marginBottom: last ? 0 : '10px' }}>
      <p style={labelStyle}>{label}</p>
      <p style={valueStyle}>{value}</p>
    </div>
  )
}

function InsightList({ label, items, last = false }: { label: string; items: string[]; last?: boolean }) {
  return (
    <div style={{ ...rowStyle, marginBottom: last ? 0 : '10px' }}>
      <p style={labelStyle}>{label}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {items.map((item, i) => <p key={i} style={{ margin: 0, fontSize: '13px', color: '#374151', fontFamily: FONT }}>- {item}</p>)}
      </div>
    </div>
  )
}
