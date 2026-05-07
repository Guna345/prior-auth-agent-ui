import { useState } from 'react'
import type { SubStep } from '../../types/priorAuth'
import ChevronNav from '../ui/ChevronNav'
import SubmissionDocList from './SubmissionDocList'
import SubmissionBundle from './SubmissionBundle'
import SubmissionUploadForm from './SubmissionUploadForm'
import SubmissionWorkspace from './SubmissionWorkspace'

const FONT = "'Space Grotesk', sans-serif"

interface SubmissionViewProps {
  subStep: SubStep
  onSubStepChange: (n: SubStep) => void
  formUploaded: boolean
  onFormUpload: () => void
  onClearUpload: () => void
}

export default function SubmissionView({ subStep, onSubStepChange, formUploaded, onFormUpload, onClearUpload }: SubmissionViewProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const canGoBack = subStep > 1
  const canGoNext = subStep < 3

  function prev() { if (canGoBack) onSubStepChange((subStep - 1) as SubStep) }
  function next() { if (canGoNext) onSubStepChange((subStep + 1) as SubStep) }

  if (subStep === 3 && formUploaded) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '24px 32px 16px', flexShrink: 0 }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Submission</h2>
        </div>
        <SubmissionWorkspace
          uploadedFile={uploadedFile}
          onReUpload={() => { setUploadedFile(null); onClearUpload() }}
        />
        <ChevronNav canGoBack={canGoBack} canGoNext={canGoNext} onBack={prev} onNext={next} />
      </div>
    )
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>Submission</h2>

        {subStep === 1 && <SubmissionDocList />}
        {subStep === 2 && <SubmissionBundle />}
        {subStep === 3 && !formUploaded && (
          <SubmissionUploadForm
            onFileUploaded={file => { setUploadedFile(file); onFormUpload() }}
          />
        )}
      </div>
      <ChevronNav canGoBack={canGoBack} canGoNext={canGoNext} onBack={prev} onNext={next} />
    </div>
  )
}
