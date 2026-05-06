import { useState } from 'react'
import Modal from '../ui/Modal'
import FormField from '../ui/FormField'
import FormTextArea from '../ui/FormTextArea'
import SelectDropdown from '../ui/SelectDropdown'
import FileUploadZone from '../ui/FileUploadZone'
import type { Rule, RuleStatus } from '../../data/configPanel'

const PAYER_OPTIONS = [
  'BCBS PPO', 'Aetna HMO', 'Cigna POS', 'UnitedHealthcare',
  'Humana PPO', 'Blue Shield HMO', 'Aetna PPO',
]

const PURPLE = '#5C3FEE'

export interface RuleFormData {
  cpt: string
  payer: string
  description: string
  source: 'DB' | 'Excel'
  sourceUrl: string
  sourceFileName: string   // persisted filename for Excel rules
  file: File | null
}

interface RuleModalProps {
  mode: 'add' | 'edit'
  onClose: () => void
  onSave: (data: RuleFormData) => void
  initial?: Partial<Pick<Rule, 'cpt' | 'payer' | 'description' | 'source' | 'sourceUrl' | 'sourceFileName'>>
}

function RadioOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }): React.JSX.Element {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>
      <div
        onClick={onChange}
        style={{
          width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
          border: `2px solid ${checked ? PURPLE : '#B0B7C3'}`,
          backgroundColor: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {checked && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: PURPLE }} />}
      </div>
      <span onClick={onChange} style={{ fontSize: '14px', color: '#262A33', fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </span>
    </label>
  )
}

export default function RuleModal({ mode, onClose, onSave, initial = {} }: RuleModalProps): React.JSX.Element {
  const [cpt, setCpt] = useState(initial.cpt ?? '')
  const [payer, setPayer] = useState(initial.payer ?? '')
  const [description, setDescription] = useState(initial.description ?? '')
  const [source, setSource] = useState<'DB' | 'Excel'>(initial.source ?? 'DB')
  const [sourceUrl, setSourceUrl] = useState(initial.sourceUrl ?? '')

  // fileName is seeded from saved data — lets edit show the previously uploaded filename
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState(initial.sourceFileName ?? '')

  function handleFile(f: File) {
    setFile(f)
    setFileName(f.name)
  }

  function handleSave() {
    if (!cpt || !payer || !description) return
    if (source === 'DB' && !sourceUrl) return
    if (source === 'Excel' && !fileName) return
    onSave({ cpt, payer, description, source, sourceUrl, sourceFileName: fileName, file })
  }

  const canSave = Boolean(
    cpt && payer && description &&
    (source === 'DB' ? sourceUrl : fileName)
  )

  const isEdit = mode === 'edit'

  return (
    <Modal
      title={isEdit ? 'Edit Rule' : 'Create New Rule'}
      subtitle="Select source and configure logic for this rule version."
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
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      }
    >
      <FormField
        label="CPT"
        required
        value={cpt}
        onChange={setCpt}
        placeholder="00000"
      />

      <SelectDropdown
        label="Payer"
        required
        value={payer}
        onChange={setPayer}
        options={PAYER_OPTIONS}
        placeholder="payer name"
      />

      <FormTextArea
        label="Rule Description"
        required
        value={description}
        onChange={setDescription}
        placeholder="ACME INC"
        rows={4}
      />

      {/* Source radio */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', color: '#262A33', fontFamily: "'Space Grotesk', sans-serif" }}>Source</span>
          <span style={{ color: '#E03B3B', fontSize: '14px' }}>*</span>
        </div>
        <div style={{ display: 'flex', gap: '28px' }}>
          <RadioOption label="Data Base" checked={source === 'DB'} onChange={() => setSource('DB')} />
          <RadioOption label="Excel" checked={source === 'Excel'} onChange={() => setSource('Excel')} />
        </div>
      </div>

      {/* DB: pre-filled URL input */}
      {source === 'DB' && (
        <FormField
          label=""
          value={sourceUrl}
          onChange={setSourceUrl}
          placeholder="healthcaresource.in"
        />
      )}

      {/* Excel: show uploaded state if fileName already set (edit), else show upload zone */}
      {source === 'Excel' && (
        <FileUploadZone
          accept=".csv,.xlsx"
          uploadedFile={file}
          uploadedFileName={fileName}
          onFile={handleFile}
        />
      )}
    </Modal>
  )
}

export type { RuleStatus }
