import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { patientDetails } from '../../data/patients'
import DocumentPreviewModal from '../../components/patients/DocumentPreviewModal'
import UploadPatientModal, { type PatientRow } from '../../components/patients/UploadPatientModal'

const FONT = "'Space Grotesk', sans-serif"

export default function PatientDetailPage() {
  const { caseId = '' } = useParams()
  const navigate = useNavigate()
  const patient = patientDetails[caseId]
  const [previewDoc, setPreviewDoc]       = useState<string | null>(null)
  const [uploadOpen, setUploadOpen]       = useState(false)
  const [uploadedRows, setUploadedRows]   = useState<PatientRow[]>([])

  if (!patient) {
    return (
      <div style={{ padding: '40px', fontFamily: FONT, color: '#262A33' }}>
        Patient not found.
      </div>
    )
  }

  const infoFields = [
    { label: 'Case ID',        value: patient.caseId },
    { label: 'Member ID',      value: patient.memberId },
    { label: 'Date of Birth',  value: patient.dateOfBirth },
    { label: 'Gender',         value: patient.gender },
    { label: 'Phone',          value: patient.phone },
    { label: 'Email',          value: patient.email },
    { label: 'Address',        value: patient.address },
    { label: "Previous PA's",  value: String(patient.previousPAs) },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#FFFFFF', fontFamily: FONT }}>

      {/* Breadcrumb */}
      <div style={{ padding: '16px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #ECECEC', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => navigate('/patients')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#757C8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span onClick={() => navigate('/patients')} style={{ fontSize: '16px', color: '#757C8D', cursor: 'pointer', fontFamily: FONT }}>
          Pre-Auth Patient Queue
        </span>
        <span style={{ fontSize: '16px', color: '#757C8D' }}>/</span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
          {caseId} Details
        </span>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', paddingBottom: '100px' }}>

        {/* Purple header card — 250px, stripe pattern */}
        <div style={{
          width: '250px', borderRadius: '14px', overflow: 'hidden',
          position: 'relative', marginBottom: '28px',
          background: 'linear-gradient(135deg, #5C3FEE 0%, #7B5CF8 100%)',
        }}>
          {/* Diagonal stripe overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 7px, rgba(255,255,255,0.07) 7px, rgba(255,255,255,0.07) 8px)',
          }} />
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, padding: '22px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: FONT }}>Patient</p>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#FFFFFF', fontFamily: FONT }}>
                {patient.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Patient Info grid — no card border, flat */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px 20px' }}>
            {infoFields.map(f => (
              <div key={f.label}>
                <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#757C8D', fontFamily: FONT }}>{f.label}</p>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#262A33', fontFamily: FONT }}>{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#ECECEC', marginBottom: '28px' }} />

        {/* Payer Details */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>
            Payer Details
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#757C8D', fontFamily: FONT }}>Payer ID</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#262A33', fontFamily: FONT }}>{patient.payerId}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#757C8D', fontFamily: FONT }}>Insurance Provider Name</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#262A33', fontFamily: FONT }}>{patient.insuranceProvider}</p>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#ECECEC', marginBottom: '28px' }} />

        {/* Documents */}
        <div>
          <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>
            Documents
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {patient.documents.map((doc, i) => (
              <button
                key={i}
                onClick={() => setPreviewDoc(doc)}
                style={{
                  border: '1px solid #ECECEC', borderRadius: '10px', padding: '14px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '10px', cursor: 'pointer', backgroundColor: '#FFFFFF',
                  transition: 'background-color 0.15s', textAlign: 'left',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F7F5FF')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                    backgroundColor: '#EDE9FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C3FEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '13px', fontWeight: 400, color: '#262A33', fontFamily: FONT,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {doc}
                  </span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C3FEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Uploaded rows table (shown after update) */}
      {uploadedRows.length > 0 && (
        <div style={{ padding: '0 32px 28px' }}>
          <p style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>Uploaded Patient Data</p>
          <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9F9FF', borderBottom: '1px solid #ECECEC' }}>
                  {['Patient ID', 'Name', 'Payer ID', 'Procedure Code', 'Diagnosis Code', 'Service Date', 'Status'].map(col => (
                    <th key={col} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#757C8D', fontFamily: FONT }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uploadedRows.map(row => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #ECECEC' }}>
                    {[row.id, row.name, row.payerId, row.procedureCode, row.diagnosisCode, row.serviceDate, row.status].map((val, i) => (
                      <td key={i} style={{ padding: '13px 16px', fontSize: '14px', color: '#262A33', fontFamily: FONT }}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fixed bottom bar */}
      <div style={{
        position: 'sticky', bottom: 0, backgroundColor: '#FFFFFF',
        borderTop: '1px solid #ECECEC', padding: '16px 32px',
        display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0,
      }}>
        <button
          onClick={() => setUploadOpen(true)}
          style={{ padding: '10px 24px', fontSize: '14px', fontWeight: 700, backgroundColor: 'transparent', color: '#5C3FEE', border: '1px solid #5C3FEE', borderRadius: '10px', cursor: 'pointer', fontFamily: FONT }}
        >
          Upload
        </button>
        <button
          onClick={() => navigate(`/patients/${caseId}/prior-auth`)}
          style={{ padding: '10px 24px', fontSize: '14px', fontWeight: 700, backgroundColor: '#5C3FEE', color: '#FFFFFF', border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: FONT }}
        >
          Start Prior Auth
        </button>
      </div>

      {/* Document preview modal */}
      {previewDoc && (
        <DocumentPreviewModal docName={previewDoc} onClose={() => setPreviewDoc(null)} />
      )}

      {/* Upload patient modal */}
      {uploadOpen && (
        <UploadPatientModal
          onClose={() => setUploadOpen(false)}
          onUpdate={rows => setUploadedRows(rows)}
        />
      )}
    </div>
  )
}
