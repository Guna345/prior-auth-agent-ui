const FONT = "'Space Grotesk', sans-serif"

const PLACEHOLDER_WIDTHS = [100, 85, 92, 60, 75]

interface GenericDocPreviewProps {
  docName: string
}

export default function GenericDocPreview({ docName }: GenericDocPreviewProps) {
  const lines = [
    'Patient Name: John Doe',
    'Date: 02 Dec, 2022',
    'Document Type: ' + docName,
    'Reference: REF-2022-0938',
    '',
    'This document has been verified and is part of the Prior Authorization case file.',
    '',
    'All information contained herein is confidential and intended solely for the use of the individual or entity to which it is addressed.',
  ]

  return (
    <div style={{ fontFamily: FONT, padding: '32px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#262A33' }}>{docName}</div>
          <div style={{ fontSize: '12px', color: '#757C8D', marginTop: '4px' }}>Prior Authorization Document</div>
        </div>
        <div style={{ padding: '4px 12px', backgroundColor: '#E8F5E9', color: '#169D2A', borderRadius: '5px', fontSize: '12px', fontWeight: 600 }}>
          Verified
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: '#ECECEC', marginBottom: '24px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {lines.map((line, i) => (
          <div key={i}>
            {line === '' ? (
              <div style={{ height: '8px' }} />
            ) : line.includes(':') ? (
              <div style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
                <span style={{ fontWeight: 600, color: '#262A33', minWidth: '140px' }}>{line.split(':')[0]}:</span>
                <span style={{ color: '#4B5563' }}>{line.split(':').slice(1).join(':').trim()}</span>
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', lineHeight: '1.7' }}>{line}</p>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px' }}>
        {PLACEHOLDER_WIDTHS.map((w, i) => (
          <div key={i} style={{ height: '10px', backgroundColor: '#F3F4F6', borderRadius: '4px', width: `${w}%`, marginBottom: '10px' }} />
        ))}
      </div>

      <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid #ECECEC', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9CA3AF' }}>
        <span>Elsai Prior Authorization System</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  )
}
