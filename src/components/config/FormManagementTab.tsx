import { useState } from 'react'
import { formItems } from '../../data/configPanel'
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

export default function FormManagementTab(): React.JSX.Element {
  const [data, setData] = useState(formItems)
  return (
    <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>S.No</th>
            <th style={thStyle}>Form Name</th>
            <th style={thStyle}>Payer Name</th>
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
              <td style={{ ...tdStyle, color: '#757C8D' }}>{row.sno}</td>
              <td style={tdStyle}>{row.formName}</td>
              <td style={{ ...tdStyle, color: '#757C8D' }}>{row.payerName}</td>
              <td style={tdStyle}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <ConfigActionBtn icon="view" onClick={() => {}} />
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
