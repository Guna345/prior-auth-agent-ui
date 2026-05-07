import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CI_QUESTIONS, AUTH_QUESTIONS, READINESS_QUESTIONS, RISK_QUESTIONS } from '../../data/clinicalIntelligence'
import type { PageView, SubStep } from '../../types/priorAuth'
import StepTracker from '../../components/patients/StepTracker'
import InsuranceCoverage from '../../components/patients/InsuranceCoverage'
import ReasoningPanel from '../../components/patients/ReasoningPanel'
import ActionBar from '../../components/patients/ActionBar'
import AIInsightsPanel from '../../components/patients/AIInsightsPanel'
import AuthorizationQuestions from '../../components/patients/AuthorizationQuestions'
import AuthorizationResults from '../../components/patients/AuthorizationResults'
import CaseDocumentsDrawer from '../../components/patients/CaseDocumentsDrawer'
import ClinicalIntelligenceQuestions from '../../components/patients/ClinicalIntelligenceQuestions'
import ClinicalIntelligenceResults from '../../components/patients/ClinicalIntelligenceResults'
import ReadinessQuestions from '../../components/patients/ReadinessQuestions'
import ReadinessResults from '../../components/patients/ReadinessResults'
import RiskQuestions from '../../components/patients/RiskQuestions'
import RiskResults from '../../components/patients/RiskResults'
import SubmissionView from '../../components/patients/SubmissionView'

const FONT = "'Space Grotesk', sans-serif"

export default function PriorAuthPage() {
  const { caseId = '' } = useParams()
  const navigate = useNavigate()

  const [view, setView]                           = useState<PageView>('insurance')
  const [reasoningOpen, setReasoningOpen]         = useState(true)
  const [ciAnswers, setCiAnswers]                 = useState<Record<string, string>>({})
  const [authAnswers, setAuthAnswers]             = useState<Record<string, string>>({})
  const [readinessAnswers, setReadinessAnswers]   = useState<Record<string, string>>({})
  const [riskAnswers, setRiskAnswers]             = useState<Record<string, string>>({})
  const [aiInsightId, setAiInsightId]             = useState<string | null>(null)
  const [authAiId, setAuthAiId]                   = useState<string | null>(null)
  const [readAiId, setReadAiId]                   = useState<string | null>(null)
  const [riskAiId, setRiskAiId]                   = useState<string | null>(null)
  const [docsOpen, setDocsOpen]                   = useState(false)
  const [subStep, setSubStep]                     = useState<SubStep>(1)
  const [formUploaded, setFormUploaded]           = useState(false)

  const allCI       = CI_QUESTIONS.every(q => ciAnswers[q.id] !== undefined)
  const allAuth     = AUTH_QUESTIONS.every(q => authAnswers[q.id] !== undefined)
  const allReadiness= READINESS_QUESTIONS.every(q => readinessAnswers[q.id] !== undefined)
  const allRisk     = RISK_QUESTIONS.every(q => riskAnswers[q.id] !== undefined)

  const rightOpen =
    (view === 'insurance' && reasoningOpen) ||
    (view === 'ci-questions' && aiInsightId !== null) ||
    (view === 'auth-questions' && authAiId !== null) ||
    (view === 'readiness-questions' && readAiId !== null) ||
    (view === 'risk-questions' && riskAiId !== null)

  // Navigation helpers
  function goToCI()        { setView(allCI ? 'ci-results' : 'ci-questions'); setReasoningOpen(false) }
  function goToAuth()      { setView(allAuth ? 'auth-results' : 'auth-questions') }
  function goToReadiness() { setView(allReadiness ? 'readiness-results' : 'readiness-questions') }
  function goToRisk()      { setView(allRisk ? 'risk-results' : 'risk-questions') }
  function goToSubmission(){ setView('submission'); setSubStep(1) }

  // Action bar config per view
  const barConfig: Record<PageView, { backLabel: string; backFn: () => void; nextLabel: string; nextFn: () => void; nextDisabled: boolean }> = {
    insurance:            { backLabel: 'Back to Details',   backFn: () => navigate(`/patients/${caseId}`), nextLabel: 'Next',         nextFn: goToCI,                                           nextDisabled: false },
    'ci-questions':       { backLabel: 'Back to Insurance', backFn: () => { setView('insurance'); setReasoningOpen(true) },            nextLabel: 'View Results', nextFn: () => allCI && setView('ci-results'),       nextDisabled: !allCI },
    'ci-results':         { backLabel: 'Back to Insurance', backFn: () => { setView('insurance'); setReasoningOpen(true) },            nextLabel: 'Next',         nextFn: goToAuth,                                     nextDisabled: false },
    'auth-questions':     { backLabel: 'Back to Clinical',  backFn: () => setView('ci-results'),                                      nextLabel: 'View Results', nextFn: () => allAuth && setView('auth-results'),    nextDisabled: !allAuth },
    'auth-results':       { backLabel: 'Back to Clinical',  backFn: () => setView('ci-results'),                                      nextLabel: 'Next',         nextFn: goToReadiness,                                nextDisabled: false },
    'readiness-questions':{ backLabel: 'Back to Auth',      backFn: () => setView('auth-results'),                                    nextLabel: 'View Results', nextFn: () => allReadiness && setView('readiness-results'), nextDisabled: !allReadiness },
    'readiness-results':  { backLabel: 'Back to Auth',      backFn: () => setView('auth-results'),                                    nextLabel: 'Next',         nextFn: goToRisk,                                     nextDisabled: false },
    'risk-questions':     { backLabel: 'Back to Readiness', backFn: () => setView('readiness-results'),                               nextLabel: 'View Results', nextFn: () => allRisk && setView('risk-results'),     nextDisabled: !allRisk },
    'risk-results':       { backLabel: 'Back to Readiness', backFn: () => setView('readiness-results'),                               nextLabel: 'Next',         nextFn: goToSubmission,                               nextDisabled: false },
    submission:           { backLabel: 'Back to Risk',      backFn: () => setView('risk-results'),                                    nextLabel: 'Submit',       nextFn: () => navigate('/patients', { state: { completedCaseId: caseId } }), nextDisabled: !(subStep === 3 && formUploaded) },
  }
  const bar = barConfig[view]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', minWidth: '1010px', backgroundColor: '#FFFFFF', fontFamily: FONT }}>

      {/* Breadcrumb */}
      <div style={{ padding: '16px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #ECECEC', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/patients')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#757C8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span onClick={() => navigate('/patients')} style={{ fontSize: '14px', color: '#757C8D', cursor: 'pointer' }}>Pre-Auth Patient Queue</span>
        <span style={{ fontSize: '14px', color: '#757C8D' }}>/</span>
        <span onClick={() => navigate(`/patients/${caseId}`)} style={{ fontSize: '14px', color: '#757C8D', cursor: 'pointer' }}>{caseId} Details</span>
        <span style={{ fontSize: '14px', color: '#757C8D' }}>/</span>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#262A33' }}>Prior Authorization Process</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <StepTracker view={view} submissionSubStep={subStep} />

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: rightOpen ? '1px solid #ECECEC' : 'none' }}>
          {view === 'insurance'             && <InsuranceCoverage reasoningOpen={reasoningOpen} onShowReasoning={() => setReasoningOpen(true)} />}
          {view === 'ci-questions'          && <ClinicalIntelligenceQuestions answers={ciAnswers} onAnswer={(id, val) => setCiAnswers(p => ({ ...p, [id]: val }))} activeAIInsightId={aiInsightId} onToggleAIInsight={setAiInsightId} />}
          {view === 'ci-results'            && <ClinicalIntelligenceResults />}
          {view === 'auth-questions'        && <AuthorizationQuestions answers={authAnswers} onAnswer={(id, val) => setAuthAnswers(p => ({ ...p, [id]: val }))} activeAIInsightId={authAiId} onToggleAIInsight={setAuthAiId} />}
          {view === 'auth-results'          && <AuthorizationResults />}
          {view === 'readiness-questions'   && <ReadinessQuestions answers={readinessAnswers} onAnswer={(id, val) => setReadinessAnswers(p => ({ ...p, [id]: val }))} activeAIInsightId={readAiId} onToggleAIInsight={setReadAiId} />}
          {view === 'readiness-results'     && <ReadinessResults />}
          {view === 'risk-questions'        && <RiskQuestions answers={riskAnswers} onAnswer={(id, val) => setRiskAnswers(p => ({ ...p, [id]: val }))} activeAIInsightId={riskAiId} onToggleAIInsight={setRiskAiId} />}
          {view === 'risk-results'          && <RiskResults />}
          {view === 'submission'            && <SubmissionView subStep={subStep} onSubStepChange={setSubStep} formUploaded={formUploaded} onFormUpload={() => setFormUploaded(true)} onClearUpload={() => setFormUploaded(false)} />}
        </div>

        {/* Right panel */}
        {view === 'insurance' && reasoningOpen && <ReasoningPanel onClose={() => setReasoningOpen(false)} />}
        {view === 'ci-questions'        && aiInsightId !== null && <AIInsightsPanel onClose={() => setAiInsightId(null)} onOpenDocuments={() => setDocsOpen(true)} />}
        {view === 'auth-questions'      && authAiId !== null    && <AIInsightsPanel onClose={() => setAuthAiId(null)} onOpenDocuments={() => setDocsOpen(true)} />}
        {view === 'readiness-questions' && readAiId !== null    && <AIInsightsPanel onClose={() => setReadAiId(null)} onOpenDocuments={() => setDocsOpen(true)} />}
        {view === 'risk-questions'      && riskAiId !== null    && <AIInsightsPanel onClose={() => setRiskAiId(null)} onOpenDocuments={() => setDocsOpen(true)} />}
      </div>

      <ActionBar onBack={bar.backFn} onNext={bar.nextFn} backLabel={bar.backLabel} nextLabel={bar.nextLabel} nextDisabled={bar.nextDisabled} />

      {docsOpen && <CaseDocumentsDrawer caseId={caseId} onClose={() => setDocsOpen(false)} />}
    </div>
  )
}
