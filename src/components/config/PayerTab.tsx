import { useState } from 'react'
import { payers } from '../../data/configPanel'
import type { PayerStatus } from '../../data/configPanel'
import ConfigActionBtn from './ConfigActionBtn'

const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '12px 16px', fontSize: '14px',
  fontWeight: 400, color: '#757C8D', backgroundColor: '#F9F9FF',
  borderBottom: '1px solid #ECECEC', whiteSpace: 'nowrap',
  fontFamily: "'Space Grotesk', sans-serif",
}
const tdStyle: React.CSSProperties = {
  padding: '13px 16px', fontSize: '14px', color: '#262A33',
  borderBottom: '1px solid #ECECEC', fontFamily: "'Space Grotesk', sans-serif",
}

function StatusBadge({ status }: { status: PayerStatus }): React.JSX.Element {
  const styles: Record<PayerStatus, { bg: string; color: string }> = {
    Connected:    { bg: '#E8F5E9', color: '#169D2A' },
    Pending:      { bg: '#FEF3C7', color: '#D97706' },
    Disconnected: { bg: '#FFEBEE', color: '#E03B3B' },
  }
  const s = styles[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '3px 12px',
      borderRadius: '5px', fontSize: '13px', backgroundColor: s.bg, color: s.color,
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {status}
    </span>
  )
}

export default function PayerTab(): React.JSX.Element {
  const [data, setData] = useState(payers)
  return (
    <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Payer Name</th>
            <th style={thStyle}>Connection Type</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Last Sync</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}
              style={{ backgroundColor: '#FFFFFF' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F9F9FF')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
            >
              <td style={tdStyle}>{row.payerName}</td>
              <td style={{ ...tdStyle, color: '#757C8D' }}>{row.connectionType}</td>
              <td style={tdStyle}><StatusBadge status={row.status} /></td>
              <td style={{ ...tdStyle, color: '#757C8D' }}>{row.lastSync}</td>
              <td style={tdStyle}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <ConfigActionBtn icon="edit" onClick={() => {}} />
                  <ConfigActionBtn icon="delete" danger onClick={() => setData(d => d.filter((_, idx) => idx !== i))} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
