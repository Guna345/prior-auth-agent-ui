import { AUTH_QUESTIONS } from '../../data/clinicalIntelligence'

const PURPLE = '#5C3FEE'
const FONT = "'Space Grotesk', sans-serif"

interface Props {
  answers: Record<string, string>
  onAnswer: (questionId: string, value: string) => void
  activeAIInsightId: string | null
  onToggleAIInsight: (id: string | null) => void
}

export default function AuthorizationQuestions({ answers, onAnswer, activeAIInsightId, onToggleAIInsight }: Props) {
  return (
    <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
      <h2 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
        Authorization Decision
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {AUTH_QUESTIONS.map(q => {
          const selected = answers[q.id]
          const isInsightActive = activeAIInsightId === q.id

          return (
            <div key={q.id} style={{ border: '1px solid #ECECEC', borderRadius: '12px', padding: '20px 24px' }}>
              {/* Title row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
                  {q.title}
                </span>
                <button
                  onClick={() => onToggleAIInsight(isInsightActive ? null : q.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '3px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 500,
                    cursor: 'pointer', fontFamily: FONT,
                    border: isInsightActive ? 'none' : `1px solid ${PURPLE}`,
                    backgroundColor: isInsightActive ? '#262A33' : 'transparent',
                    color: isInsightActive ? '#FFFFFF' : PURPLE,
                  }}
                >
                  {isInsightActive ? (
                    <>Hide <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                  ) : (
                    'AI Insights'
                  )}
                </button>
              </div>

              <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#757C8D', fontFamily: FONT, lineHeight: '1.6' }}>
                {q.policy}
              </p>
              <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#757C8D', fontFamily: FONT, lineHeight: '1.6' }}>
                {q.question}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.options.map(opt => {
                  const isSelected = selected === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => onAnswer(q.id, opt.value)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '13px 16px', borderRadius: '10px', cursor: 'pointer',
                        border: `1px solid ${isSelected ? PURPLE : '#E3E5E8'}`,
                        backgroundColor: isSelected ? '#F7F5FF' : '#FFFFFF',
                        textAlign: 'left', fontFamily: FONT,
                      }}
                    >
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                        backgroundColor: isSelected ? PURPLE : 'transparent',
                        border: `2px solid ${isSelected ? PURPLE : '#C8CDD6'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: '13px', color: '#262A33', fontWeight: isSelected ? 500 : 400, fontFamily: FONT }}>
                        {opt.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
