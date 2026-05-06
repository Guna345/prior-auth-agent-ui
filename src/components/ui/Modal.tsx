import type { ReactNode } from 'react'

interface ModalProps {
  title: string
  subtitle?: string
  onClose: () => void
  children: ReactNode
  footer: ReactNode
  wide?: boolean
  maxWidth?: string
}

export default function Modal({ title, subtitle, onClose, children, footer, wide, maxWidth }: ModalProps) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(38, 42, 51, 0.45)',
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        width: '100%',
        maxWidth: maxWidth ?? (wide ? '1120px' : '480px'),
        margin: '0 16px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E3E5E8',
      }}>
        {/* Header — fixed */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 28px 16px',
          borderBottom: '1px solid #ECECEC',
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#000000',
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {title}
            </h2>
            {subtitle && (
              <p style={{ fontSize: '13px', color: '#757C8D', margin: '4px 0 0', fontFamily: "'Space Grotesk', sans-serif" }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: '#757C8D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 28px',
        }}>
          {children}
        </div>

        {/* Footer — fixed at bottom */}
        <div style={{
          flexShrink: 0,
          padding: '0 28px 24px',
        }}>
          {footer}
        </div>
      </div>
    </div>
  )
}
