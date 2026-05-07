import { useState } from 'react'
import { payers } from '../../data/configPanel'
import type { Payer, PayerStatus } from '../../data/configPanel'
import ConfigActionBtn from './ConfigActionBtn'
import PayerModal from './PayerModal'
import type { PayerFormData } from './PayerModal'
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

interface PayerTabProps {
  addOpen?: boolean
  onAddClose?: () => void
}

export default function PayerTab({ addOpen = false, onAddClose }: PayerTabProps): React.JSX.Element {
  const [data, setData] = useState<Payer[]>(payers)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [pendingDeleteIdx, setPendingDeleteIdx] = useState<number | null>(null)

  function handleSave(vals: PayerFormData) {
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    if (editIdx !== null) {
      setData(d => d.map((row, i) => i === editIdx
        ? {
            ...row,
            payerName:          vals.payerName,
            connectionType:     vals.connectionType,
            connectionUrl:      vals.connectionUrl,
            connectionFileName: vals.connectionFileName,
            connectionNotes:    vals.connectionNotes,
          }
        : row
      ))
      setEditIdx(null)
    } else {
      setData(d => [...d, {
        payerName:          vals.payerName,
        connectionType:     vals.connectionType,
        status:             'Pending',
        lastSync:           today,
        connectionUrl:      vals.connectionUrl,
        connectionFileName: vals.connectionFileName,
        connectionNotes:    vals.connectionNotes,
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
          message="Are you sure you want to delete this payer?"
          onConfirm={() => { setData(d => d.filter((_, idx) => idx !== pendingDeleteIdx)); setPendingDeleteIdx(null) }}
          onCancel={() => setPendingDeleteIdx(null)}
        />
      )}

      {editIdx !== null && (
        <PayerModal
          mode="edit"
          onClose={() => setEditIdx(null)}
          onSave={handleSave}
          initial={{
            payerName:          data[editIdx]?.payerName,
            connectionType:     data[editIdx]?.connectionType,
            connectionUrl:      data[editIdx]?.connectionUrl,
            connectionFileName: data[editIdx]?.connectionFileName,
            connectionNotes:    data[editIdx]?.connectionNotes,
          }}
        />
      )}

      {addOpen && (
        <PayerModal
          mode="add"
          onClose={() => onAddClose?.()}
          onSave={handleSave}
        />
      )}
    </>
  )
}
