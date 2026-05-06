import { useState } from 'react'
import { rules } from '../../data/configPanel'
import type { Rule, RuleStatus } from '../../data/configPanel'
import ConfigActionBtn from './ConfigActionBtn'
import RuleModal from './RuleModal'
import type { RuleFormData } from './RuleModal'

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

interface RulesTabProps {
  addOpen?: boolean
  onAddClose?: () => void
}

let nextRuleId = 12

export default function RulesTab({ addOpen = false, onAddClose }: RulesTabProps): React.JSX.Element {
  const [data, setData] = useState<Rule[]>(rules)
  const [editIdx, setEditIdx] = useState<number | null>(null)

  function handleSave(vals: RuleFormData) {
    if (editIdx !== null) {
      setData(d => d.map((row, i) => i === editIdx
        ? {
            ...row,
            cpt: vals.cpt,
            payer: vals.payer,
            description: vals.description,
            source: vals.source,
            sourceUrl: vals.sourceUrl,
            sourceFileName: vals.sourceFileName,
          }
        : row
      ))
      setEditIdx(null)
    } else {
      nextRuleId++
      setData(d => [...d, {
        ruleId: `R${String(nextRuleId).padStart(3, '0')}`,
        cpt: vals.cpt,
        payer: vals.payer,
        description: vals.description,
        source: vals.source,
        sourceUrl: vals.sourceUrl,
        sourceFileName: vals.sourceFileName,
        status: 'Active',
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
                    <ConfigActionBtn icon="edit" onClick={() => setEditIdx(i)} />
                    <ConfigActionBtn icon="delete" danger onClick={() => setData(d => d.filter((_, idx) => idx !== i))} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editIdx !== null && (
        <RuleModal
          mode="edit"
          onClose={() => setEditIdx(null)}
          onSave={handleSave}
          initial={{
            cpt: data[editIdx]?.cpt,
            payer: data[editIdx]?.payer,
            description: data[editIdx]?.description,
            source: data[editIdx]?.source,
            sourceUrl: data[editIdx]?.sourceUrl,
            sourceFileName: data[editIdx]?.sourceFileName,
          }}
        />
      )}

      {addOpen && (
        <RuleModal
          mode="add"
          onClose={() => onAddClose?.()}
          onSave={handleSave}
        />
      )}
    </>
  )
}
