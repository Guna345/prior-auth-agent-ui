import { useState } from 'react'
import { AUTH_RESULTS } from '../../data/clinicalIntelligence'
import CaseDropdown from '../ui/CaseDropdown'

const PURPLE = '#5C3FEE'
const FONT = "'Space Grotesk', sans-serif"

export default function AuthorizationResults() {
  const [selectedCase, setSelectedCase] = useState(AUTH_RESULTS.cases[0])

  return (
    <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
      <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
        Authorization Decision
      </h2>

      <CaseDropdown cases={AUTH_RESULTS.cases} value={selectedCase} onChange={setSelectedCase} />

      {/* Authorization Decision card — green tinted */}
      <div style={{
        border: '1px solid #D1FAE5', borderRadius: '12px',
        background: 'linear-gradient(180deg, #DCFCE7 0%, #FFFFFF 100%)', marginBottom: '20px', overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #D1FAE5' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
            Authorization Decision
          </span>
        </div>

        {/* PA Required / PA Type */}
        <div style={{ padding: '16px 20px', display: 'flex', gap: '48px', borderBottom: '1px solid #D1FAE5' }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#757C8D', fontFamily: FONT }}>PA Required</p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>{AUTH_RESULTS.paRequired}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#757C8D', fontFamily: FONT }}>PA Type</p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>{AUTH_RESULTS.paType}</p>
          </div>
        </div>

        {/* Rule Evaluation */}
        <div style={{ padding: '16px 20px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
            Rule Evaluation
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {AUTH_RESULTS.rules.map((rule, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px', lineHeight: 1 }}>{rule.passed ? '✅' : '❌'}</span>
                <span style={{ fontSize: '13px', color: '#262A33', fontFamily: FONT }}>
                  {rule.text}&nbsp;&nbsp;
                  <span style={{ color: PURPLE, textDecoration: 'underline', cursor: 'pointer', fontSize: '13px' }}>
                    Reference
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details section */}
      <div style={{ border: '1px solid #ECECEC', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
        <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Details</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px 24px' }}>
          {AUTH_RESULTS.details.map(d => (
            <div key={d.label}>
              <p style={{ margin: '0 0 5px', fontSize: '12px', color: '#757C8D', fontFamily: FONT }}>{d.label}</p>
              {d.badge === 'green' ? (
                <span style={{
                  display: 'inline-block', padding: '2px 12px', borderRadius: '6px',
                  fontSize: '13px', fontWeight: 600,
                  backgroundColor: '#D1FAE5', color: '#065F46',
                }}>
                  {d.value}
                </span>
              ) : (
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 500, color: '#262A33', fontFamily: FONT }}>{d.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reasoning — violet card with purple left border */}
      <div style={{
        border: '1px solid #DDD6FE', borderLeft: `3px solid ${PURPLE}`,
        borderRadius: '0 12px 12px 0', backgroundColor: '#F7F5FF',
        padding: '16px 20px',
      }}>
        <p style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: PURPLE, fontFamily: FONT }}>Reasoning</p>
        <p style={{ margin: 0, fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.8' }}>
          {AUTH_RESULTS.reasoning}
        </p>
      </div>
    </div>
  )
}
