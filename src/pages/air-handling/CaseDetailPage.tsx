import { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { caseDetails, caseSelectOptions } from '../../data/airHandling'
import type { CaseStatus, DocumentStatus } from '../../types/airHandling'
import SelectDropdown from '../../components/ui/SelectDropdown'

function DocStatusBadge({ status }: { status: DocumentStatus }) {
  const styles: Record<DocumentStatus, React.CSSProperties> = {
    Partial: { backgroundColor: '#FFF8E1', color: '#D97706', border: '1px solid #FDE68A' },
    Missing: { backgroundColor: '#FEF2F2', color: '#E03B3B', border: '1px solid #FECACA' },
    Present: { backgroundColor: '#E8F5E9', color: '#169D2A', border: '1px solid #A7F3D0' },
  }
  return (
    <span style={{
      ...styles[status],
      padding: '3px 10px', borderRadius: '5px',
      fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {status}
    </span>
  )
}

export default function CaseDetailPage() {
  const { caseId = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Status is determined once from the row clicked in the list — fixed for all case switches
  const pageStatus: CaseStatus = location.state?.status ?? 'Denied'

  const detail = caseDetails[caseId]
  const [selectedCase, setSelectedCase] = useState(detail?.caseLabel ?? caseSelectOptions[0])
  const [showFullReasoning, setShowFullReasoning] = useState(false)

  const reasoning = detail?.reasoning ?? ''
  const reasoningShort = reasoning.split('\n\n').slice(0, 2).join('\n\n')

  function handleCaseSelect(label: string) {
    setSelectedCase(label)
    const matched = Object.values(caseDetails).find(c => c.caseLabel === label)
    if (matched) {
      // Preserve the original pageStatus when switching cases
      navigate(`/air-handling/${matched.caseId}`, { state: { status: pageStatus } })
    }
  }

  const detailCols = detail ? [
    { label: 'Denial Reason',      value: detail.denialReason },
    { label: 'Appeal Deadline',    value: detail.appealDeadline },
    { label: 'Denial Deadline',    value: detail.denialDeadline },
    { label: 'AI Appeal Letter ID',value: detail.aiAppealLetterId },
    { label: 'AI Appeal Ready',    value: detail.aiAppealReady },
    { label: 'P2P with Dr.Aetna', value: detail.p2pScheduled },
    { label: 'Air Status',         value: detail.airStatus },
  ] : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Breadcrumb header */}
      <div style={{ padding: '16px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #ECECEC', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => navigate('/air-handling')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#757C8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span
          onClick={() => navigate('/air-handling')}
          style={{ fontSize: '16px', color: '#757C8D', cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Air Handling
        </span>
        <span style={{ fontSize: '16px', color: '#757C8D' }}>/</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: "'Space Grotesk', sans-serif" }}>
          Case - {caseId.replace('CASE-', '')}
        </span>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>

        {/* Case ID selector */}
        <div style={{ marginBottom: '20px' }}>
          <SelectDropdown
            label="Select the Case ID"
            value={selectedCase}
            onChange={handleCaseSelect}
            options={caseSelectOptions}
            placeholder="Select a case"
          />
        </div>

        {/* Payer Decision card */}
        <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
          <p style={{ fontSize: '13px', color: '#757C8D', margin: '0 0 8px', fontFamily: "'Space Grotesk', sans-serif" }}>
            Payer Decision
          </p>
          <p style={{
            fontSize: '26px', fontWeight: 700, margin: '0 0 20px',
            color: pageStatus === 'Approved' ? '#169D2A' : '#E03B3B',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {pageStatus === 'Approved' ? 'Approved' : 'Denied'} - {detail?.decisionCode ?? 'CO - 197'}
          </p>

          {/* Details columns */}
          <div style={{ borderTop: '1px solid #ECECEC', paddingTop: '16px' }}>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#262A33', margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif" }}>
              Details
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
              {detailCols.map(col => (
                <div key={col.label}>
                  <p style={{ fontSize: '12px', color: '#757C8D', margin: '0 0 4px', fontFamily: "'Space Grotesk', sans-serif" }}>
                    {col.label}
                  </p>
                  <p style={{ fontSize: '13px', color: '#262A33', margin: 0, fontWeight: 500, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {col.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Required Documents — Denied only */}
        {pageStatus === 'Denied' && detail?.documents && detail.documents.length > 0 && (
          <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#262A33', margin: '0 0 16px', fontFamily: "'Space Grotesk', sans-serif" }}>
              Required Documents
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {detail.documents.map((doc, i) => (
                <div key={i} style={{ border: '1px solid #ECECEC', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ padding: '14px 16px', backgroundColor: '#FFFDF5', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#262A33', margin: '0 0 4px', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {doc.title}
                      </p>
                      <p style={{ fontSize: '13px', color: '#757C8D', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                        <span style={{ fontWeight: 500, color: '#262A33' }}>Policy :</span> {doc.policy}
                      </p>
                    </div>
                    <DocStatusBadge status={doc.docStatus} />
                  </div>
                  {doc.evidence && (
                    <div style={{ padding: '10px 16px', backgroundColor: '#FFFFFF', borderTop: '1px solid #ECECEC' }}>
                      <p style={{ fontSize: '13px', color: '#757C8D', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
                        <span style={{ fontWeight: 500, color: '#262A33' }}>Evidence:</span> {doc.evidence}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reasoning card */}
        {reasoning && (
          <div style={{ border: '2px solid #5C3FEE', borderRadius: '10px', padding: '20px 24px' }}>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#5C3FEE', margin: '0 0 14px', fontFamily: "'Space Grotesk', sans-serif" }}>
              Reasoning
            </p>
            <div style={{ fontSize: '14px', color: '#262A33', lineHeight: '1.7', fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'pre-line' }}>
              {showFullReasoning ? reasoning : reasoningShort}
            </div>
            <button
              onClick={() => setShowFullReasoning(p => !p)}
              style={{
                background: 'none', border: 'none', padding: '12px 0 0',
                fontSize: '13px', color: '#5C3FEE', cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              {showFullReasoning ? 'View Less ↑' : 'View More ↓'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
