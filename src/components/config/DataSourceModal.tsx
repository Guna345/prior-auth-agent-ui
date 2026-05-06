import { useState } from 'react'
import Modal from '../ui/Modal'
import FormField from '../ui/FormField'
import FormTextArea from '../ui/FormTextArea'
import SelectDropdown from '../ui/SelectDropdown'

const DATA_SOURCE_OPTIONS = [
  'File Upload', 'Data Bases', 'API Integration',
  'EHR (FHIR R4)', 'HL7 V2', 'DICOM', 'LIS', 'CCD', 'OMOP CDM',
]

interface DataSourceModalProps {
  mode: 'add' | 'edit'
  onClose: () => void
  onSave: (data: { versionName: string; description: string; source: string; connectionUrl: string }) => void
  initial?: { versionName?: string; description?: string; source?: string; connectionUrl?: string }
}

const PURPLE = '#5C3FEE'

export default function DataSourceModal({ mode, onClose, onSave, initial = {} }: DataSourceModalProps): React.JSX.Element {
  const [versionName, setVersionName] = useState(initial.versionName ?? '')
  const [description, setDescription] = useState(initial.description ?? '')
  const [source, setSource] = useState(initial.source ?? '')
  const [connectionUrl, setConnectionUrl] = useState(initial.connectionUrl ?? '')

  function handleSave() {
    if (!versionName || !description || !source) return
    onSave({ versionName, description, source, connectionUrl })
  }

  const canSave = Boolean(versionName && description && source)

  const title = mode === 'edit' ? 'Edit Data Source' : 'Add Data Source'
  const subtitle = 'Select source and configure logic for this rule version.'

  return (
    <Modal
      title={title}
      subtitle={subtitle}
      onClose={onClose}
      footer={
        <div style={{
          display: 'flex', justifyContent: 'flex-end', gap: '12px',
          paddingTop: '16px', borderTop: '1px solid #ECECEC',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 28px', fontSize: '14px', fontWeight: 700,
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
              padding: '10px 28px', fontSize: '14px', fontWeight: 700,
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
        label="Version Name"
        required
        value={versionName}
        onChange={setVersionName}
        placeholder="Name"
      />
      <FormTextArea
        label="Description"
        required
        value={description}
        onChange={setDescription}
        placeholder="ACME INC"
        rows={4}
      />
      <SelectDropdown
        label="Choose Data Source"
        required
        value={source}
        onChange={setSource}
        options={DATA_SOURCE_OPTIONS}
        placeholder="Select"
      />
      <FormField
        label="Connection String / URL"
        value={connectionUrl}
        onChange={setConnectionUrl}
        placeholder="Enter"
      />
    </Modal>
  )
}
