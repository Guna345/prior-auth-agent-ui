const FONT = "'Space Grotesk', sans-serif"
const PURPLE = '#5C3FEE'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')
  for (let i = current - 1; i <= current + 1; i++) {
    if (i > 1 && i < total) pages.push(i)
  }
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPages(page, totalPages)

  const btnBase: React.CSSProperties = {
    minWidth: '36px', height: '36px', padding: '0 6px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
    fontFamily: FONT, border: '1px solid #ECECEC',
    backgroundColor: '#FFFFFF', color: '#262A33',
    transition: 'all 0.15s',
  }

  const activeBtn: React.CSSProperties = {
    ...btnBase, backgroundColor: PURPLE, color: '#FFFFFF',
    border: `1px solid ${PURPLE}`, fontWeight: 600,
  }

  const arrowBtn = (disabled: boolean): React.CSSProperties => ({
    ...btnBase,
    opacity: disabled ? 0.35 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  })

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '6px', padding: '20px 0 4px',
    }}>
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        style={arrowBtn(page === 1)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} style={{ minWidth: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#757C8D', fontFamily: FONT }}>
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            style={p === page ? activeBtn : btnBase}
            onMouseEnter={e => { if (p !== page) (e.currentTarget as HTMLElement).style.backgroundColor = '#F7F5FF' }}
            onMouseLeave={e => { if (p !== page) (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF' }}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        style={arrowBtn(page === totalPages)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  )
}
