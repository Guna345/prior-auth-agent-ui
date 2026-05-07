import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { airCases } from '../../data/airHandling'
import type { CaseStatus } from '../../types/airHandling'
import Pagination from '../../components/ui/Pagination'

const PAGE_SIZE = 9

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '12px 16px',
  fontSize: '14px',
  fontWeight: 400,
  color: '#757C8D',
  borderBottom: '1px solid #ECECEC',
  whiteSpace: 'nowrap',
  fontFamily: "'Space Grotesk', sans-serif",
}

const tdStyle: React.CSSProperties = {
  padding: '14px 16px',
  fontSize: '14px',
  color: '#262A33',
  borderBottom: '1px solid #ECECEC',
  fontFamily: "'Space Grotesk', sans-serif",
}

function StatusBadge({ status }: { status: CaseStatus }) {
  if (status === 'Approved') {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '3px 12px', borderRadius: '5px', fontSize: '13px',
        backgroundColor: '#E8F5E9', color: '#169D2A', fontFamily: "'Space Grotesk', sans-serif",
      }}>
        Approved
      </span>
    )
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 12px', borderRadius: '5px', fontSize: '13px',
      backgroundColor: '#FFEBEE', color: '#E03B3B', fontFamily: "'Space Grotesk', sans-serif",
    }}>
      Denied
    </span>
  )
}

export default function AirHandlingPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'All' | CaseStatus>('All')
  const [filterOpen, setFilterOpen] = useState(false)
  const [page, setPage] = useState(1)

  const filtered = airCases.filter(c => {
    const matchesSearch =
      c.caseId.toLowerCase().includes(search.toLowerCase()) ||
      c.patientName.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <div style={{ padding: '20px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #ECECEC', flexShrink: 0 }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#262A33', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
          Air Handling
        </h1>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

        {/* Search + Filter row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          {/* Search */}
          <div style={{ position: 'relative', width: '340px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C3FEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search by Patient Name, ID"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '10px 12px 10px 38px',
                border: `1px solid ${searchFocused ? '#5C3FEE' : '#E3E5E8'}`,
                borderRadius: '8px',
                backgroundColor: '#F7F5FF', fontSize: '14px',
                color: '#262A33', outline: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'border-color 0.15s',
              }}
            />
          </div>

          {/* Status filter */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setFilterOpen(p => !p)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '9px 16px', border: '1px solid #E3E5E8',
                borderRadius: '8px', cursor: 'pointer', backgroundColor: '#FFFFFF',
                fontSize: '14px', color: '#262A33', userSelect: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {statusFilter === 'All' ? 'Status' : statusFilter}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#757C8D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            {filterOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', right: 0, zIndex: 100,
                backgroundColor: '#FFFFFF', border: '1px solid #E3E5E8', borderRadius: '8px',
                overflow: 'hidden', boxShadow: '0 8px 24px rgba(38,42,51,0.1)', minWidth: '140px',
              }}>
                {(['All', 'Approved', 'Denied'] as const).map((opt, i, arr) => (
                  <div
                    key={opt}
                    onClick={() => { setStatusFilter(opt); setFilterOpen(false); setPage(1) }}
                    style={{
                      padding: '11px 16px', fontSize: '14px', cursor: 'pointer',
                      color: statusFilter === opt ? '#5C3FEE' : '#262A33',
                      backgroundColor: statusFilter === opt ? '#F7F5FF' : '#FFFFFF',
                      borderBottom: i < arr.length - 1 ? '1px solid #ECECEC' : 'none',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F7F5FF')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = statusFilter === opt ? '#F7F5FF' : '#FFFFFF')}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9F9FF' }}>
                <th style={thStyle}>Case ID</th>
                <th style={thStyle}>Patient Name</th>
                <th style={thStyle}>Payer</th>
                <th style={thStyle}>AIR Reason</th>
                <th style={thStyle}>Request Date</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(c => (
                <tr key={c.caseId} style={{ backgroundColor: '#FFFFFF' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F9F9FF')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <td style={{ ...tdStyle, color: '#757C8D', fontFamily: "'Space Mono', monospace", fontSize: '13px' }}>{c.caseId}</td>
                  <td style={tdStyle}>{c.patientName}</td>
                  <td style={{ ...tdStyle, color: '#757C8D' }}>{c.payer}</td>
                  <td style={{ ...tdStyle, color: '#757C8D' }}>{c.airReason}</td>
                  <td style={{ ...tdStyle, color: '#757C8D' }}>{c.requestDate}</td>
                  <td style={tdStyle}><StatusBadge status={c.status} /></td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => navigate(`/air-handling/${c.caseId}`, { state: { status: c.status } })}
                      style={{
                        background: 'none', border: 'none', padding: 0,
                        fontSize: '14px', color: '#5C3FEE', cursor: 'pointer',
                        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                        textDecoration: 'underline', textUnderlineOffset: '2px',
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  )
}
