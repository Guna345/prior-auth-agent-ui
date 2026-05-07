import { useState } from 'react'

const PURPLE = '#5C3FEE'
const FONT   = "'Space Grotesk', sans-serif"

export interface Doc {
  name: string
  file: string
  size: string
  completion: number
  status: string
  tooltip: string
}

export default function DocCard({ doc }: { doc: Doc }) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const isFlagged = doc.tooltip !== ''
  const isGreen   = doc.completion >= 80
  const completionStyle = {
    display: 'inline-block', padding: '2px 8px', borderRadius: '5px',
    fontSize: '12px', fontWeight: 600 as const,
    backgroundColor: isGreen ? '#D1FAE5' : '#FEE2E2',
    color: isGreen ? '#065F46' : '#B91C1C',
  }

  return (
    <div style={{ border: '1px solid #ECECEC', borderRadius: '12px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>{doc.name}</span>
        <button style={{ width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0, backgroundColor: '#EDE9FF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        <div>
          <p style={{ margin: '0 0 3px', fontSize: '11px', color: '#757C8D', fontFamily: FONT }}>File</p>
          <p style={{ margin: 0, fontSize: '13px', color: '#262A33', fontFamily: FONT }}>{doc.file}</p>
        </div>
        <div>
          <p style={{ margin: '0 0 3px', fontSize: '11px', color: '#757C8D', fontFamily: FONT }}>File Size</p>
          <p style={{ margin: 0, fontSize: '13px', color: '#262A33', fontFamily: FONT }}>{doc.size}</p>
        </div>
        <div>
          <p style={{ margin: '0 0 3px', fontSize: '11px', color: '#757C8D', fontFamily: FONT }}>Completion Rate</p>
          <span style={completionStyle}>{doc.completion}%</span>
        </div>
        <div>
          <p style={{ margin: '0 0 3px', fontSize: '11px', color: '#757C8D', fontFamily: FONT }}>Status</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '13px', color: '#262A33', fontFamily: FONT }}>{doc.status}</span>
            {isFlagged && (
              <div style={{ position: 'relative' }}>
                <button
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                  style={{ background: 'none', border: '1.5px solid #9CA3AF', borderRadius: '50%', width: '16px', height: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: '#6B7280', fontSize: '9px', fontWeight: 700, fontFamily: FONT }}
                >
                  i
                </button>
                {tooltipVisible && (
                  <div style={{ position: 'absolute', top: '22px', left: '50%', transform: 'translateX(-50%)', zIndex: 300, backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '12px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: '200px', fontSize: '13px', color: '#374151', lineHeight: '1.55', fontFamily: FONT, border: '1px solid #ECECEC', whiteSpace: 'normal' }}>
                    {doc.tooltip}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
