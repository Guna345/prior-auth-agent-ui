import { useState } from 'react'
import { READINESS_RESULTS } from '../../data/readiness-data'
import CaseDropdown from '../ui/CaseDropdown'
import DocCard from './DocCard'
import DiagnosisTab from './DiagnosisTab'

const PURPLE = '#5C3FEE'
const FONT   = "'Space Grotesk', sans-serif"

export default function ReadinessResults() {
  const [activeTab, setActiveTab]           = useState<'documents' | 'diagnosis'>('documents')
  const [selectedCase, setSelectedCase]     = useState(READINESS_RESULTS.cases[0])
  const [reasoningExpanded, setExpanded]    = useState(false)

  const reasoningPreview = READINESS_RESULTS.reasoning.split('\n\n')[0]

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '10px 0', marginRight: '28px', fontSize: '14px', fontWeight: active ? 600 : 400,
    color: active ? PURPLE : '#757C8D', background: 'none', border: 'none',
    borderBottom: active ? `2px solid ${PURPLE}` : '2px solid transparent',
    cursor: 'pointer', fontFamily: FONT,
  })

  return (
    <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
      <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Readiness</h2>

      <CaseDropdown cases={READINESS_RESULTS.cases} value={selectedCase} onChange={setSelectedCase} />

      <div style={{ display: 'flex', borderBottom: '1px solid #ECECEC', marginBottom: '20px' }}>
        <button style={tabStyle(activeTab === 'documents')} onClick={() => setActiveTab('documents')}>Documents</button>
        <button style={tabStyle(activeTab === 'diagnosis')} onClick={() => setActiveTab('diagnosis')}>Diagnosis</button>
      </div>

      {activeTab === 'documents' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px 16px', borderRadius: '10px', marginBottom: '20px', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
            <span style={{ fontSize: '16px', lineHeight: 1, flexShrink: 0 }}>⚠️</span>
            <div>
              <p style={{ margin: '0 0 3px', fontSize: '13px', fontWeight: 700, color: '#92400E', fontFamily: FONT }}>{READINESS_RESULTS.alert.title}</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#B45309', fontFamily: FONT }}>{READINESS_RESULTS.alert.message}</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Docs</p>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: PURPLE, fontFamily: FONT }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16"/>
                <line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
              </svg>
              Upload Docs
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px', marginBottom: '24px' }}>
            {READINESS_RESULTS.docs.map(doc => (
              <DocCard key={doc.name} doc={doc} />
            ))}
          </div>

          <div style={{ border: '1px solid #DDD6FE', borderLeft: `3px solid ${PURPLE}`, borderRadius: '0 12px 12px 0', backgroundColor: '#F7F5FF', padding: '16px 20px' }}>
            <p style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: PURPLE, fontFamily: FONT }}>Reasoning</p>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {reasoningExpanded ? READINESS_RESULTS.reasoning : reasoningPreview}
            </p>
            <button onClick={() => setExpanded(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: PURPLE, fontFamily: FONT, padding: 0 }}>
              {reasoningExpanded ? 'View Less ▲' : 'View More ▼'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'diagnosis' && <DiagnosisTab />}
    </div>
  )
}
