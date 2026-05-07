import StepDot from './StepDot'
import type { PageView, SubStep } from '../../types/priorAuth'

const PURPLE = '#5C3FEE'
const GREEN  = '#169D2A'
const FONT   = "'Space Grotesk', sans-serif"

const STEPS = [
  'Insurance Verification',
  'Clinical Intelligence',
  'Authorization Decision',
  'Readiness',
  'Risk',
  'Submission',
]

const SUB_STEPS: ['Document List', 'Bundle', 'Form Submission'] = ['Document List', 'Bundle', 'Form Submission']

function getStepState(stepIndex: number, view: PageView): 'done' | 'active' | 'future' {
  if (view === 'insurance') return stepIndex === 0 ? 'active' : 'future'
  if (view === 'ci-questions' || view === 'ci-results') {
    if (stepIndex === 0) return 'done'
    if (stepIndex === 1) return 'active'
    return 'future'
  }
  if (view === 'auth-questions' || view === 'auth-results') {
    if (stepIndex <= 1) return 'done'
    if (stepIndex === 2) return 'active'
    return 'future'
  }
  if (view === 'readiness-questions' || view === 'readiness-results') {
    if (stepIndex <= 2) return 'done'
    if (stepIndex === 3) return 'active'
    return 'future'
  }
  if (view === 'submission') {
    if (stepIndex <= 4) return 'done'
    return 'active'
  }
  if (stepIndex <= 3) return 'done'
  if (stepIndex === 4) return 'active'
  return 'future'
}

interface StepTrackerProps {
  view: PageView
  submissionSubStep: SubStep
}

export default function StepTracker({ view, submissionSubStep }: StepTrackerProps) {
  return (
    <div style={{ width: '210px', flexShrink: 0, borderRight: '1px solid #ECECEC', padding: '28px 20px', overflowY: 'auto' }}>
      <p style={{ margin: '0 0 20px', fontSize: '11px', fontWeight: 600, color: '#757C8D', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: FONT }}>STEPS</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {STEPS.map((step, i) => {
          const state = getStepState(i, view)
          const isLast = i === STEPS.length - 1
          return (
            <div key={step} style={{ display: 'flex', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
                <StepDot state={state} />
                {!isLast && (
                  <div style={{ width: '2px', flex: 1, minHeight: '20px', backgroundColor: state === 'done' ? GREEN : '#E3E5E8', marginTop: '3px', marginBottom: '3px' }} />
                )}
              </div>
              <div style={{ paddingBottom: isLast ? 0 : '20px', paddingTop: '1px' }}>
                <span style={{ fontSize: '13px', lineHeight: '20px', color: state === 'active' ? PURPLE : state === 'done' ? '#262A33' : '#757C8D', fontWeight: state === 'active' ? 600 : 400, fontFamily: FONT }}>
                  {step}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {view === 'submission' && (
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #ECECEC' }}>
          <p style={{ margin: '0 0 14px', fontSize: '11px', fontWeight: 600, color: '#757C8D', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: FONT }}>SUBMISSION STEPS</p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SUB_STEPS.map((label, i) => {
              const n = (i + 1) as SubStep
              const s: 'done' | 'active' | 'future' = submissionSubStep > n ? 'done' : submissionSubStep === n ? 'active' : 'future'
              const isLast = i === 2
              return (
                <div key={label} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20px', flexShrink: 0 }}>
                    <StepDot state={s} />
                    {!isLast && (
                      <div style={{ width: '2px', flex: 1, minHeight: '16px', backgroundColor: s === 'done' ? GREEN : '#E3E5E8', marginTop: '3px', marginBottom: '3px' }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: isLast ? 0 : '14px', paddingTop: '1px' }}>
                    <span style={{ fontSize: '12px', lineHeight: '20px', color: s === 'active' ? PURPLE : s === 'done' ? '#262A33' : '#757C8D', fontWeight: s === 'active' ? 600 : 400, fontFamily: FONT }}>
                      {label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
