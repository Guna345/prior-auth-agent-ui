export type ConfigTab = 'Rules' | 'Payer' | 'Data Source' | 'Risk Score' | 'Form Management'

const TABS: ConfigTab[] = ['Rules', 'Payer', 'Data Source', 'Risk Score', 'Form Management']

interface TabBarProps {
  active: ConfigTab
  onChange: (tab: ConfigTab) => void
  action?: React.ReactNode
}

export default function TabBar({ active, onChange, action }: TabBarProps): React.JSX.Element {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid #ECECEC', marginBottom: '24px',
    }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        {TABS.map(tab => {
          const isActive = tab === active
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              style={{
                padding: '12px 16px',
                background: 'none', border: 'none',
                borderBottom: isActive ? '2px solid #5C3FEE' : '2px solid transparent',
                marginBottom: '-1px',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#5C3FEE' : '#757C8D',
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          )
        })}
      </div>
      {action && <div style={{ display: 'flex', gap: '10px', paddingBottom: '10px' }}>{action}</div>}
    </div>
  )
}
