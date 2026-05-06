import { useRef, useState } from 'react'

interface FileUploadZoneProps {
  onFile?: (file: File) => void
  accept?: string
  uploadedFile?: File | null
  uploadedFileName?: string   // pre-saved filename (no File object needed)
}

const PURPLE = '#5C3FEE'

export default function FileUploadZone({ onFile, accept = '.csv', uploadedFile, uploadedFileName }: FileUploadZoneProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function handleFile(file: File) {
    onFile?.(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  // Show uploaded state if we have an actual File OR a saved filename string
  const displayName = uploadedFile?.name ?? uploadedFileName ?? ''

  if (displayName) {
    return (
      <div style={{
        border: `1.5px dashed ${PURPLE}`, borderRadius: '14px',
        padding: '18px 20px', backgroundColor: '#FFFFFF',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        {/* Filled green circle with white tick */}
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          backgroundColor: '#169D2A', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#262A33', fontFamily: "'Space Grotesk', sans-serif" }}>
            {displayName}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#169D2A', fontFamily: "'Space Grotesk', sans-serif" }}>
            Uploaded
          </p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          style={{
            marginLeft: 'auto', padding: '7px 18px', fontSize: '13px', fontWeight: 500,
            color: PURPLE, backgroundColor: 'transparent',
            border: `1px solid ${PURPLE}`, borderRadius: '8px',
            cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Replace
        </button>
        <input ref={inputRef} type="file" accept={accept} onChange={handleChange} style={{ display: 'none' }} />
      </div>
    )
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `1.5px dashed ${dragging ? '#3D22D4' : PURPLE}`,
        borderRadius: '12px', padding: '36px 24px',
        backgroundColor: dragging ? '#F0EDFF' : '#FAFAFE',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '8px', transition: 'background 0.15s',
      }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '12px',
        backgroundColor: '#EDE9FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '4px',
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>

      <p style={{ margin: 0, fontSize: '14px', color: '#262A33', fontFamily: "'Space Grotesk', sans-serif", textAlign: 'center' }}>
        Drag &amp; Drop or{' '}
        <span
          onClick={() => inputRef.current?.click()}
          style={{ color: PURPLE, cursor: 'pointer', textDecoration: 'underline' }}
        >
          choose files
        </span>
        {' '}to Upload
      </p>
      <p style={{ margin: 0, fontSize: '12px', color: '#757C8D', fontFamily: "'Space Grotesk', sans-serif" }}>
        File support format: CSV
      </p>

      <button
        onClick={() => inputRef.current?.click()}
        style={{
          marginTop: '8px', padding: '8px 24px', fontSize: '14px',
          color: PURPLE, backgroundColor: 'transparent',
          border: `1px solid ${PURPLE}`, borderRadius: '8px',
          cursor: 'pointer', fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        + upload
      </button>

      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} style={{ display: 'none' }} />
    </div>
  )
}
