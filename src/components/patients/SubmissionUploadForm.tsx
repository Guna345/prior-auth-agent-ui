import { useState } from 'react'
import { SUBMISSION_FORMS } from '../../data/submission-data'
import SelectDropdown from '../ui/SelectDropdown'
import FileUploadZone from '../ui/FileUploadZone'

const FONT = "'Space Grotesk', sans-serif"

interface SubmissionUploadFormProps {
  onFileUploaded: (file: File) => void
}

export default function SubmissionUploadForm({ onFileUploaded }: SubmissionUploadFormProps) {
  const [selectedForm, setSelectedForm] = useState('')

  return (
    <div>
      <SelectDropdown
        label="Select Form"
        options={SUBMISSION_FORMS}
        value={selectedForm}
        onChange={setSelectedForm}
        placeholder="Select"
      />
      <p style={{ margin: '16px 0 10px', fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
        Upload the Form
      </p>
      <FileUploadZone
        accept=".pdf,.csv,.xlsx"
        supportText="CSV, PDF, Excel"
        onFile={onFileUploaded}
      />
    </div>
  )
}
