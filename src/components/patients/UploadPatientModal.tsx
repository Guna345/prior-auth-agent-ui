import { useState } from 'react'
import FileUploadZone from '../ui/FileUploadZone'
import DeleteConfirmModal from '../ui/DeleteConfirmModal'

const PURPLE = '#5C3FEE'
const FONT   = "'Space Grotesk', sans-serif"

export interface PatientRow {
  id: string
  name: string
  payerId: string
  procedureCode: string
  diagnosisCode: string
  serviceDate: string
  status: string
}

const MOCK_ROWS: PatientRow[] = [
  { id: 'PAT-00938', name: 'John Doe',       payerId: '00912', procedureCode: '73645', diagnosisCode: '345', serviceDate: '10/04/2025', status: 'New User' },
  { id: 'PAT-00939', name: 'Jane Smith',      payerId: '00913', procedureCode: '73646', diagnosisCode: '346', serviceDate: '11/04/2025', status: 'New User' },
  { id: 'PAT-00940', name: 'Robert Brown',    payerId: '00914', procedureCode: '73647', diagnosisCode: '347', serviceDate: '12/04/2025', status: 'New User' },
  { id: 'PAT-00941', name: 'Emily Davis',     payerId: '00915', procedureCode: '73648', diagnosisCode: '348', serviceDate: '13/04/2025', status: 'New User' },
  { id: 'PAT-00942', name: 'Michael Johnson', payerId: '00916', procedureCode: '73649', diagnosisCode: '349', serviceDate: '14/04/2025', status: 'New User' },
  { id: 'PAT-00943', name: 'Linda Martinez',  payerId: '00917', procedureCode: '73650', diagnosisCode: '350', serviceDate: '15/04/2025', status: 'New User' },
  { id: 'PAT-00944', name: 'David Wilson',    payerId: '00918', procedureCode: '73651', diagnosisCode: '351', serviceDate: '16/04/2025', status: 'New User' },
]

const COLUMNS = ['Patient ID', 'Name', 'Payer ID', 'Procedure Code', 'Diagnosis Code', 'Service Date', 'Status', 'Action']

interface UploadPatientModalProps {
  onClose: () => void
  onUpdate: (rows: PatientRow[]) => void
}

export default function UploadPatientModal({ onClose, onUpdate }: UploadPatientModalProps) {
  const [uploadedFile, setUploadedFile]     = useState<File | null>(null)
  const [rows, setRows]                     = useState<PatientRow[]>([])
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  function handleFile(file: File) {
    setUploadedFile(file)
    if (file.name.endsWith('.csv')) {
      const reader = new FileReader()
      reader.onload = e => {
        const text = e.target?.result as string
        const lines = text.trim().split('\n').slice(1) // skip header
        const parsed: PatientRow[] = lines.map((line, i) => {
          const cols = line.split(',').map(c => c.trim())
          return {
            id:            cols[0] ?? `PAT-0${i}`,
            name:          cols[1] ?? '',
            payerId:       cols[2] ?? '',
            procedureCode: cols[3] ?? '',
            diagnosisCode: cols[4] ?? '',
            serviceDate:   cols[5] ?? '',
            status:        cols[6] ?? 'New User',
          }
        }).filter(r => r.id)
        setRows(parsed.length ? parsed : MOCK_ROWS)
      }
      reader.readAsText(file)
    } else {
      setRows(MOCK_ROWS)
    }
  }

  function deleteRow(id: string) {
    setRows(prev => prev.filter(r => r.id !== id))
    setPendingDeleteId(null)
  }

  function handleUpdate() {
    onUpdate(rows)
    onClose()
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(38,42,51,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ width: '100%', maxWidth: '1190px', maxHeight: '90vh', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E3E5E8', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid #ECECEC', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Upload Patient Details</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#262A33" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {!uploadedFile ? (
            /* ── Upload Zone ── */
            <FileUploadZone
              accept=".csv,.xlsx,.pdf"
              supportText="CSV, PDF, Excel"
              onFile={handleFile}
            />
          ) : (
            /* ── Preview Table ── */
            <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9F9FF', borderBottom: '1px solid #ECECEC' }}>
                    {COLUMNS.map(col => (
                      <th key={col} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#757C8D', fontFamily: FONT, whiteSpace: 'nowrap' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.id} style={{ borderBottom: '1px solid #ECECEC' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F9F9FF')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                    >
                      <td style={td}>{row.id}</td>
                      <td style={td}>{row.name}</td>
                      <td style={td}>{row.payerId}</td>
                      <td style={td}>{row.procedureCode}</td>
                      <td style={td}>{row.diagnosisCode}</td>
                      <td style={td}>{row.serviceDate}</td>
                      <td style={td}>{row.status}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <button
                          onClick={() => setPendingDeleteId(row.id)}
                          style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #E03B3B', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FFEBEE')}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E03B3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/>
                            <path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {pendingDeleteId && (
          <DeleteConfirmModal
            message="Are you sure you want to delete this patient detail?"
            onConfirm={() => deleteRow(pendingDeleteId)}
            onCancel={() => setPendingDeleteId(null)}
          />
        )}

        {/* Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid #ECECEC', flexShrink: 0, display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{ padding: '10px 28px', fontSize: '14px', fontWeight: 700, backgroundColor: 'transparent', color: PURPLE, border: `1px solid ${PURPLE}`, borderRadius: '10px', cursor: 'pointer', fontFamily: FONT }}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={!uploadedFile || rows.length === 0}
            style={{ padding: '10px 28px', fontSize: '14px', fontWeight: 700, backgroundColor: (!uploadedFile || rows.length === 0) ? '#B8ACEF' : PURPLE, color: '#FFFFFF', border: 'none', borderRadius: '10px', cursor: (!uploadedFile || rows.length === 0) ? 'not-allowed' : 'pointer', fontFamily: FONT }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

const td: React.CSSProperties = {
  padding: '13px 16px', fontSize: '14px', color: '#262A33',
  fontFamily: FONT, whiteSpace: 'nowrap',
}
