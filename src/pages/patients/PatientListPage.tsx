import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { patients } from '../../data/patients'
import type { PatientStatus } from '../../types/patients'
import UploadPatientModal from '../../components/patients/UploadPatientModal'
import Pagination from '../../components/ui/Pagination'

const PAGE_SIZE = 9

const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '12px 16px', fontSize: '14px',
  fontWeight: 400, color: '#757C8D', backgroundColor: '#F9F9FF',
  borderBottom: '1px solid #ECECEC', whiteSpace: 'nowrap',
  fontFamily: "'Space Grotesk', sans-serif",
}

const tdStyle: React.CSSProperties = {
  padding: '14px 16px', fontSize: '14px', color: '#262A33',
  borderBottom: '1px solid #ECECEC', fontFamily: "'Space Grotesk', sans-serif",
}

const STATUS_STYLES: Record<PatientStatus, { bg: string; color: string }> = {
  'Insurance Verification':       { bg: '#E8F0FE', color: '#1A56DB' },
  'Pending Clinical Intelligence': { bg: '#FEF3C7', color: '#D97706' },
  'Authorization Pending':        { bg: '#FFF0E6', color: '#C2570C' },
  'Submission Complete':          { bg: '#E8F5E9', color: '#169D2A' },
}

const ALL_STATUSES: PatientStatus[] = [
  'Insurance Verification',
  'Pending Clinical Intelligence',
  'Authorization Pending',
  'Submission Complete',
]

function StatusBadge({ status }: { status: PatientStatus }) {
  const s = STATUS_STYLES[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '3px 12px',
      borderRadius: '5px', fontSize: '13px', backgroundColor: s.bg, color: s.color,
      fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  )
}

export default function PatientListPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const completedCaseId = (location.state as { completedCaseId?: string } | null)?.completedCaseId ?? null
  const [toastVisible, setToastVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'All' | PatientStatus>('All')
  const [filterOpen, setFilterOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (completedCaseId) {
      setToastVisible(true)
      const t = setTimeout(() => setToastVisible(false), 7000)
      return () => clearTimeout(t)
    }
  }, [completedCaseId])

  const filtered = patients.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = p.name.toLowerCase().includes(q) || p.caseId.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || p.status === statusFilter
    return matchSearch && matchStatus
  })
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <div style={{ padding: '20px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #ECECEC', flexShrink: 0 }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#262A33', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
          Pre-Auth Patient Queue
        </h1>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

        {/* Search + Filter + Upload row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>

          {/* Search */}
          <div style={{ position: 'relative', width: '340px' }}>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#5C3FEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search by Patient Name, ID"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '9px 12px 9px 36px', fontSize: '14px',
                border: `1px solid ${searchFocused ? '#5C3FEE' : '#E3E5E8'}`,
                borderRadius: '8px', outline: 'none', backgroundColor: '#FFFFFF',
                fontFamily: "'Space Grotesk', sans-serif", color: '#262A33',
                transition: 'border-color 0.15s',
              }}
            />
          </div>

          {/* Right side: Status filter + Upload */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

            {/* Status filter */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setFilterOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '9px 14px', fontSize: '14px', cursor: 'pointer',
                  border: `1px solid ${filterOpen ? '#5C3FEE' : '#E3E5E8'}`,
                  borderRadius: '8px', backgroundColor: '#FFFFFF',
                  fontFamily: "'Space Grotesk', sans-serif", color: '#262A33',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#757C8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                {statusFilter === 'All' ? 'Filter by Status' : statusFilter}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#757C8D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points={filterOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}/>
                </svg>
              </button>

              {filterOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 4px)', right: 0, zIndex: 100,
                  backgroundColor: '#FFFFFF', border: '1px solid #E3E5E8', borderRadius: '10px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.10)', minWidth: '220px', overflow: 'hidden',
                }}>
                  {(['All', ...ALL_STATUSES] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setFilterOpen(false); setPage(1) }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '10px 16px', fontSize: '14px', cursor: 'pointer',
                        border: 'none', backgroundColor: statusFilter === s ? '#F7F5FF' : '#FFFFFF',
                        color: statusFilter === s ? '#5C3FEE' : '#262A33',
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                      onMouseEnter={e => { if (statusFilter !== s) (e.currentTarget as HTMLElement).style.backgroundColor = '#F9F9FF' }}
                      onMouseLeave={e => { if (statusFilter !== s) (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Upload button */}
            <button
              onClick={() => setUploadOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 18px', fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                border: '1px solid #5C3FEE', borderRadius: '8px', backgroundColor: 'transparent',
                color: '#5C3FEE', fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C3FEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Upload
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={thStyle}>Case ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Payer ID</th>
                <th style={thStyle}>Procedure Code (CPT)</th>
                <th style={thStyle}>Diagnosis Code (ICD)</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, i) => (
                <tr
                  key={p.caseId}
                  style={{ backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F7F5FF')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#FFFFFF' : '#FAFAFA')}
                >
                  <td style={tdStyle}>{p.caseId}</td>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={{ ...tdStyle, color: '#757C8D' }}>{p.payerId}</td>
                  <td style={{ ...tdStyle, color: '#757C8D' }}>{p.procedureCodes}</td>
                  <td style={{ ...tdStyle, color: '#757C8D' }}>{p.diagnosisCode}</td>
                  <td style={tdStyle}><StatusBadge status={p.status} /></td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => navigate(`/patients/${p.caseId}`)}
                      style={{
                        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                        fontSize: '14px', color: '#5C3FEE', fontWeight: 400,
                        fontFamily: "'Space Grotesk', sans-serif", textDecoration: 'underline',
                        textUnderlineOffset: '2px',
                      }}
                    >
                      Case Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#757C8D', fontSize: '14px', fontFamily: "'Space Grotesk', sans-serif" }}>
              No patients found.
            </div>
          )}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={p => { setPage(p) }} />
      </div>

      {uploadOpen && (
        <UploadPatientModal onClose={() => setUploadOpen(false)} onUpdate={() => setUploadOpen(false)} />
      )}

      {toastVisible && completedCaseId && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
          backgroundColor: '#262A33', color: '#FFFFFF',
          borderRadius: '10px', padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          fontFamily: "'Space Grotesk', sans-serif",
          maxWidth: '400px',
        }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#169D2A',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 500, flex: 1, lineHeight: '1.5' }}>
            Prior Authorization flow was completed for {completedCaseId}
          </span>
          <button
            onClick={() => setToastVisible(false)}
            style={{ background: 'none', border: 'none', padding: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#9CA3AF', flexShrink: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
