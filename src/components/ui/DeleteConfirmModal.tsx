const FONT = "'Space Grotesk', sans-serif"

interface DeleteConfirmModalProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmModal({ message, onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      backgroundColor: 'rgba(38,42,51,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: '20px',
        padding: '40px 36px 32px', width: '100%', maxWidth: '380px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
      }}>
        {/* Red gradient circle with X */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', marginBottom: '24px',
          background: 'linear-gradient(135deg, #FF8A80 0%, #FF3333 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>

        <p style={{
          margin: '0 0 28px', fontSize: '18px', fontWeight: 700,
          color: '#262A33', fontFamily: FONT, textAlign: 'center', lineHeight: 1.45,
        }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '14px', width: '100%' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '12px', fontSize: '15px', fontWeight: 500,
              backgroundColor: '#F2F2F2', color: '#262A33',
              border: 'none', borderRadius: '12px', cursor: 'pointer',
              fontFamily: FONT, transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E8E8E8')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#F2F2F2')}
          >
            No
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '12px', fontSize: '15px', fontWeight: 600,
              backgroundColor: '#4361EE', color: '#FFFFFF',
              border: 'none', borderRadius: '12px', cursor: 'pointer',
              fontFamily: FONT, transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3451D1')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4361EE')}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}
