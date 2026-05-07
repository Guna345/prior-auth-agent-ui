import { SUBMISSION_DOCS } from '../../data/submission-data'

const PURPLE = '#5C3FEE'
const FONT   = "'Space Grotesk', sans-serif"

export default function SubmissionDocList() {
  return (
    <div>
      <div style={{ border: '1px solid #ECECEC', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#757C8D', fontFamily: FONT }}>Submit ID</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: PURPLE, fontFamily: FONT }}>{SUBMISSION_DOCS.submitId}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {SUBMISSION_DOCS.cases.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#757C8D', fontSize: '13px', flexShrink: 0 }}>◇</span>
              <span style={{ fontSize: '13px', color: '#374151', fontFamily: FONT }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>Documents</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
        {SUBMISSION_DOCS.documents.map((doc, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #ECECEC', borderRadius: '10px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, overflow: 'hidden' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#757C8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span style={{ fontSize: '12px', color: '#262A33', fontFamily: FONT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {doc.name}
              </span>
            </div>
            <span style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, flexShrink: 0, backgroundColor: doc.status === 'Success' ? '#DCFCE7' : '#FEE2E2', color: doc.status === 'Success' ? '#15803D' : '#B91C1C' }}>
              {doc.status === 'Success' ? '✓ Success' : '✕ Failed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
