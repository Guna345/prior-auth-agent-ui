import { useState } from 'react'
import { dataSources } from '../../data/configPanel'
import type { DataSource } from '../../data/configPanel'
import ConfigActionBtn from './ConfigActionBtn'
import DataSourceModal from './DataSourceModal'
import type { DataSourceFormData } from './DataSourceModal'
import DeleteConfirmModal from '../ui/DeleteConfirmModal'

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

interface DataSourceTabProps {
  addOpen?: boolean
  onAddClose?: () => void
}

export default function DataSourceTab({ addOpen = false, onAddClose }: DataSourceTabProps): React.JSX.Element {
  const [data, setData] = useState<DataSource[]>(dataSources)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [pendingDeleteIdx, setPendingDeleteIdx] = useState<number | null>(null)

  function handleSave(vals: DataSourceFormData) {
    if (editIdx !== null) {
      setData(d => d.map((row, i) => i === editIdx
        ? { ...row, sourceName: vals.sourceName, category: vals.category as DataSource['category'], dataFreshness: vals.dataFreshness }
        : row
      ))
      setEditIdx(null)
    } else {
      setData(d => [...d, {
        sourceName: vals.sourceName,
        category: vals.category as DataSource['category'],
        status: 'Active',
        dataFreshness: vals.dataFreshness,
      }])
      onAddClose?.()
    }
  }

  return (
    <>
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
                    <ConfigActionBtn icon="edit" onClick={() => setEditIdx(i)} />
                    <ConfigActionBtn icon="delete" danger onClick={() => setPendingDeleteIdx(i)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pendingDeleteIdx !== null && (
        <DeleteConfirmModal
          message="Are you sure you want to delete this data source?"
          onConfirm={() => { setData(d => d.filter((_, idx) => idx !== pendingDeleteIdx)); setPendingDeleteIdx(null) }}
          onCancel={() => setPendingDeleteIdx(null)}
        />
      )}

      {editIdx !== null && (
        <DataSourceModal
          mode="edit"
          onClose={() => setEditIdx(null)}
          onSave={handleSave}
          initial={{
            sourceName: data[editIdx]?.sourceName,
            category: data[editIdx]?.category,
            dataFreshness: data[editIdx]?.dataFreshness,
          }}
        />
      )}

      {addOpen && (
        <DataSourceModal
          mode="add"
          onClose={() => onAddClose?.()}
          onSave={handleSave}
        />
      )}
    </>
  )
}
