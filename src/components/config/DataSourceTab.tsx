import { useState } from 'react'
import { dataSources } from '../../data/configPanel'
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

export default function DataSourceTab(): React.JSX.Element {
  const [data, setData] = useState(dataSources)
  return (
    <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Source Name</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Data Freshness</th>
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
              <td style={tdStyle}>{row.sourceName}</td>
              <td style={{ ...tdStyle, color: '#757C8D' }}>{row.category}</td>
              <td style={tdStyle}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', padding: '3px 12px',
                  borderRadius: '5px', fontSize: '13px',
                  backgroundColor: '#E8F5E9', color: '#169D2A',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  {row.status}
                </span>
              </td>
              <td style={{ ...tdStyle, color: '#757C8D' }}>{row.dataFreshness}</td>
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
