const PURPLE = '#5C3FEE'
const FONT   = "'Space Grotesk', sans-serif"

export default function SubmissionBundle() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '48px' }}>
      <div style={{ border: '1px solid #ECECEC', borderRadius: '16px', padding: '48px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', maxWidth: '420px', width: '100%' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '14px', backgroundColor: '#F7F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>PA Bundle Ready</p>
        <p style={{ margin: 0, fontSize: '13px', color: '#757C8D', fontFamily: FONT, textAlign: 'center', lineHeight: '1.6' }}>
          All required documents have been compiled and are ready for submission.
        </p>
        <button style={{ marginTop: '4px', padding: '10px 28px', borderRadius: '10px', border: `1.5px solid ${PURPLE}`, backgroundColor: 'transparent', color: PURPLE, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download Bundle
        </button>
      </div>
    </div>
  )
}
