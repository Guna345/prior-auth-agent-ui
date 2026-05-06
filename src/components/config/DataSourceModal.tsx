import { useState } from 'react'
import Modal from '../ui/Modal'
import FormField from '../ui/FormField'
import SelectDropdown from '../ui/SelectDropdown'

const CATEGORY_OPTIONS = ['Clinical', 'Imaging', 'Laboratory', 'Research']
const FRESHNESS_OPTIONS = ['Real - Time', 'Batch', 'Near - Real - Time']

const PURPLE = '#5C3FEE'

export interface DataSourceFormData {
  sourceName: string
  category: string
  dataFreshness: string
}

interface DataSourceModalProps {
  mode: 'add' | 'edit'
  onClose: () => void
  onSave: (data: DataSourceFormData) => void
  initial?: Partial<DataSourceFormData>
}

export default function DataSourceModal({ mode, onClose, onSave, initial = {} }: DataSourceModalProps): React.JSX.Element {
  const [sourceName, setSourceName] = useState(initial.sourceName ?? '')
  const [category, setCategory] = useState(initial.category ?? '')
  const [dataFreshness, setDataFreshness] = useState(initial.dataFreshness ?? '')

  function handleSave() {
    if (!sourceName || !category || !dataFreshness) return
    onSave({ sourceName, category, dataFreshness })
  }

  const canSave = Boolean(sourceName && category && dataFreshness)
  const title = mode === 'edit' ? 'Edit Data Source' : 'Add Data Source'

  return (
    <Modal
      title={title}
      onClose={onClose}
      maxWidth="740px"
      footer={
        <div style={{
          display: 'flex', justifyContent: 'flex-end', gap: '12px',
          paddingTop: '16px', borderTop: '1px solid #ECECEC',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 40px', fontSize: '14px', fontWeight: 700,
              color: PURPLE, backgroundColor: 'transparent',
              border: `1px solid ${PURPLE}`, borderRadius: '10px',
              cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            style={{
              padding: '10px 40px', fontSize: '14px', fontWeight: 700,
              color: '#FFFFFF',
              backgroundColor: canSave ? PURPLE : '#B8ACEF',
              border: 'none', borderRadius: '10px',
              cursor: canSave ? 'pointer' : 'not-allowed',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Save
          </button>
        </div>
      }
    >
      <FormField
        label="Source Name"
        required
        value={sourceName}
        onChange={setSourceName}
        placeholder="Name"
      />
      <SelectDropdown
        label="Category"
        required
        value={category}
        onChange={setCategory}
        options={CATEGORY_OPTIONS}
        placeholder="Select"
      />
      <SelectDropdown
        label="Data Freshness"
        required
        value={dataFreshness}
        onChange={setDataFreshness}
        options={FRESHNESS_OPTIONS}
        placeholder="Select"
      />
    </Modal>
  )
}
