import { useState } from 'react'
import { rules } from '../../data/configPanel'
import type { RuleStatus } from '../../data/configPanel'
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

function StatusBadge({ status }: { status: RuleStatus }): React.JSX.Element {
  const isActive = status === 'Active'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '3px 12px',
      borderRadius: '5px', fontSize: '13px',
      backgroundColor: isActive ? '#E8F5E9' : '#FFEBEE',
      color: isActive ? '#169D2A' : '#E03B3B',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {status}
    </span>
  )
}

export default function RulesTab(): React.JSX.Element {
  const [data, setData] = useState(rules)
  return (
    <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Rule ID</th>
            <th style={thStyle}>CPT</th>
            <th style={thStyle}>Payer</th>
            <th style={{ ...thStyle, maxWidth: '300px' }}>Rule Description</th>
            <th style={thStyle}>Source</th>
            <th style={thStyle}>Status</th>
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
              <td style={{ ...tdStyle, color: '#757C8D' }}>{row.ruleId}</td>
              <td style={{ ...tdStyle, color: '#757C8D' }}>{row.cpt}</td>
              <td style={{ ...tdStyle, maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.payer}</td>
              <td style={{ ...tdStyle, maxWidth: '300px', color: '#757C8D' }}>{row.description}</td>
              <td style={{ ...tdStyle, color: '#757C8D' }}>{row.source}</td>
              <td style={tdStyle}><StatusBadge status={row.status} /></td>
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
