import LabResultsPreview from './LabResultsPreview'
import GenericDocPreview from './GenericDocPreview'

interface DocumentPreviewModalProps {
  docName: string
  onClose: () => void
}

export default function DocumentPreviewModal({ docName, onClose }: DocumentPreviewModalProps) {
  const isLabResult = docName === 'Lab results'

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(38, 42, 51, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <button
        onClick={onClose}
        style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 1001, width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: '1px solid #E3E5E8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#262A33" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: isLabResult ? '720px' : '640px', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        {isLabResult ? <LabResultsPreview /> : <GenericDocPreview docName={docName} />}
      </div>
    </div>
  )
}
