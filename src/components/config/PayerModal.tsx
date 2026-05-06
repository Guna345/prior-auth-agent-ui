import { useState } from 'react'
import Modal from '../ui/Modal'
import FormField from '../ui/FormField'
import FormTextArea from '../ui/FormTextArea'
import SelectDropdown from '../ui/SelectDropdown'
import FileUploadZone from '../ui/FileUploadZone'
import type { Payer } from '../../data/configPanel'

const CONNECTION_TYPES = [
  'File Upload',
  'API Integration',
  'Data Migration',
  'Feature Deployment',
  'User Acceptance Testing',
  'Security Audit',
  'Performance Optimization',
  'Documentation Update',
  'Training Session',
  'Go-Live Preparation',
  'Final Deployment',
  'Post-Deployment Review',
]

// Maps each connection type to what extra field it needs
const FILE_TYPES   = ['File Upload', 'Documentation Update']
const URL_TYPES    = ['API Integration', 'Data Migration']

const URL_LABELS: Record<string, string> = {
  'API Integration': 'API Endpoint URL',
  'Data Migration':  'Connection String',
}

const NOTES_LABELS: Record<string, string> = {
  'Feature Deployment':      'Version / Release Notes',
  'User Acceptance Testing': 'Test Notes',
  'Security Audit':          'Audit Reference / Notes',
  'Performance Optimization':'Optimization Notes',
  'Training Session':        'Session Notes',
  'Go-Live Preparation':     'Preparation Notes',
  'Final Deployment':        'Deployment Notes',
  'Post-Deployment Review':  'Review Notes',
}

const FILE_ACCEPTS: Record<string, string> = {
  'File Upload':        '.csv,.xlsx',
  'Documentation Update': '.pdf,.docx,.xlsx,.csv',
}

const PURPLE = '#5C3FEE'

export interface PayerFormData {
  payerName: string
  connectionType: string
  connectionUrl: string
  connectionFileName: string
  connectionNotes: string
  file: File | null
}

interface PayerModalProps {
  mode: 'add' | 'edit'
  onClose: () => void
  onSave: (data: PayerFormData) => void
  initial?: Partial<Pick<Payer, 'payerName' | 'connectionType' | 'connectionUrl' | 'connectionFileName' | 'connectionNotes'>>
}

export default function PayerModal({ mode, onClose, onSave, initial = {} }: PayerModalProps): React.JSX.Element {
  const [payerName,       setPayerName]       = useState(initial.payerName       ?? '')
  const [connectionType,  setConnectionType]  = useState(initial.connectionType  ?? '')
  const [connectionUrl,   setConnectionUrl]   = useState(initial.connectionUrl   ?? '')
  const [connectionNotes, setConnectionNotes] = useState(initial.connectionNotes ?? '')
  const [file,            setFile]            = useState<File | null>(null)
  const [fileName,        setFileName]        = useState(initial.connectionFileName ?? '')

  function handleFile(f: File) {
    setFile(f)
    setFileName(f.name)
  }

  // Clear extra fields when connection type changes
  function handleTypeChange(t: string) {
    setConnectionType(t)
    setConnectionUrl('')
    setConnectionNotes('')
    setFile(null)
    setFileName('')
  }

  function handleSave() {
    if (!payerName || !connectionType) return
    onSave({ payerName, connectionType, connectionUrl, connectionFileName: fileName, connectionNotes, file })
  }

  const canSave = Boolean(payerName && connectionType)
  const isEdit  = mode === 'edit'

  const isFileType  = FILE_TYPES.includes(connectionType)
  const isUrlType   = URL_TYPES.includes(connectionType)
  const isNotesType = connectionType && !isFileType && !isUrlType

  return (
    <Modal
      title={isEdit ? 'Edit Payer' : 'Add Payer'}
      subtitle="Configure payer connection details."
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
            {isEdit ? 'Update' : 'Save'}
          </button>
        </div>
      }
    >
      {/* Payer Name */}
      <FormField
        label="Payer Name"
        required
        value={payerName}
        onChange={setPayerName}
        placeholder="Enter payer name"
      />

      {/* Connection Type */}
      <SelectDropdown
        label="Connection Type"
        required
        value={connectionType}
        onChange={handleTypeChange}
        options={CONNECTION_TYPES}
        placeholder="Select connection type"
      />

      {/* Dynamic field: File Upload / Documentation Update */}
      {isFileType && (
        <div style={{ marginTop: '4px' }}>
          <label style={{
            display: 'block', fontSize: '14px', fontWeight: 400, color: '#262A33',
            marginBottom: '8px', fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {connectionType === 'Documentation Update' ? 'Upload Document' : 'Upload File'}
          </label>
          <FileUploadZone
            accept={FILE_ACCEPTS[connectionType] ?? '.csv,.xlsx'}
            uploadedFile={file}
            uploadedFileName={fileName}
            onFile={handleFile}
          />
        </div>
      )}

      {/* Dynamic field: API Integration / Data Migration */}
      {isUrlType && (
        <FormField
          label={URL_LABELS[connectionType] ?? 'Connection URL'}
          required
          value={connectionUrl}
          onChange={setConnectionUrl}
          placeholder={connectionType === 'API Integration' ? 'https://api.payer.com/v1/...' : 'server=host;database=name;...'}
        />
      )}

      {/* Dynamic field: all note-based types */}
      {isNotesType && (
        <FormTextArea
          label={NOTES_LABELS[connectionType] ?? 'Notes'}
          value={connectionNotes}
          onChange={setConnectionNotes}
          placeholder="Enter details..."
          rows={4}
        />
      )}
    </Modal>
  )
}
