import { useState } from 'react'
import { AI_INSIGHTS_NOTES } from '../../data/clinicalIntelligence'

const PURPLE = '#5C3FEE'
const FONT = "'Space Grotesk', sans-serif"

const TOOLTIP_TEXT = 'The elsai Docloom agent creates notes from documents by converting raw data into useful insights, helping to improve decision-making and increase productivity.'

interface AIInsightsPanelProps {
  onClose: () => void
  onOpenDocuments: () => void
}

export default function AIInsightsPanel({ onClose, onOpenDocuments }: AIInsightsPanelProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  return (
    <div style={{
      width: '340px', flexShrink: 0,
      borderLeft: '3px solid #5C3FEE',
      backgroundColor: '#F7F5FF',
      overflowY: 'auto', padding: '24px 20px',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: PURPLE, fontFamily: FONT, lineHeight: '1.4' }}>
            AI insights based on Patient Document
          </span>
          {/* ⓘ info icon + tooltip */}
          <div style={{ position: 'relative', flexShrink: 0, marginTop: '2px' }}>
            <button
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
              style={{
                background: 'none', border: `1.5px solid ${PURPLE}`, borderRadius: '50%',
                width: '18px', height: '18px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 0, color: PURPLE, fontSize: '10px', fontWeight: 700, fontFamily: FONT,
              }}
            >
              i
            </button>
            {tooltipVisible && (
              <div style={{
                position: 'absolute', top: '24px', right: 0, zIndex: 300,
                backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '14px 16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.13)', width: '220px',
                fontSize: '13px', color: '#262A33', lineHeight: '1.65', fontFamily: FONT,
                border: '1px solid #ECECEC',
              }}>
                {TOOLTIP_TEXT}
              </div>
            )}
          </div>
        </div>
        {/* X close */}
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#757C8D" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Documents button */}
      <button
        onClick={onOpenDocuments}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          padding: '7px 14px', fontSize: '13px', fontWeight: 500,
          border: '1px solid #ECECEC', borderRadius: '8px',
          backgroundColor: '#FFFFFF', color: '#262A33',
          cursor: 'pointer', fontFamily: FONT, marginBottom: '18px',
        }}
      >
        Documents &nbsp;&gt;&gt;
      </button>

      {/* Notes */}
      <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.8', color: '#262A33', fontFamily: FONT }}>
        <span style={{ fontWeight: 600 }}>Notes: </span>
        {AI_INSIGHTS_NOTES}
      </p>
    </div>
  )
}
