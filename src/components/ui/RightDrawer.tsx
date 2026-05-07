interface RightDrawerProps {
  width?: string
  onClose: () => void
  children: React.ReactNode
}

export default function RightDrawer({ width = '960px', onClose, children }: RightDrawerProps) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex' }}>
      {/* Backdrop — left portion */}
      <div
        style={{ flex: 1, backgroundColor: 'rgba(38, 42, 51, 0.45)', cursor: 'pointer' }}
        onClick={onClose}
      />
      {/* Drawer panel — right side, full height */}
      <div style={{
        width, maxWidth: '95vw', flexShrink: 0,
        backgroundColor: '#FFFFFF', height: '100%',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
      }}>
        {children}
      </div>
    </div>
  )
}
