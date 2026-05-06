import { useState } from 'react'
import TabBar from '../../components/config/TabBar'
import type { ConfigTab } from '../../components/config/TabBar'
import RulesTab from '../../components/config/RulesTab'
import PayerTab from '../../components/config/PayerTab'
import DataSourceTab from '../../components/config/DataSourceTab'
import RiskScoreTab from '../../components/config/RiskScoreTab'
import FormManagementTab from '../../components/config/FormManagementTab'

const PURPLE = '#5C3FEE'

function HeaderBtn({ label, onClick, outlined }: { label: string; onClick?: () => void; outlined?: boolean }): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '9px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 500,
        fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer',
        border: `1px solid ${PURPLE}`,
        backgroundColor: outlined ? 'transparent' : PURPLE,
        color: outlined ? PURPLE : '#FFFFFF',
      }}
    >
      {label}
    </button>
  )
}

function AutoSaveIndicator(): React.JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#169D2A', display: 'inline-block' }} />
      <span style={{ fontSize: '13px', color: '#169D2A', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
        Auto Saved
      </span>
    </div>
  )
}

export default function ConfigurationPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<ConfigTab>('Rules')
  const [dsAddOpen, setDsAddOpen] = useState(false)

  function renderAction(): React.ReactNode {
    if (activeTab === 'Rules') {
      return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <HeaderBtn label="Upload Rules" outlined />
          <HeaderBtn label="+ Add Rule" />
        </div>
      )
    }
    if (activeTab === 'Payer' || activeTab === 'Form Management') {
      return <HeaderBtn label="+ Add Payer" />
    }
    if (activeTab === 'Data Source') {
      return <HeaderBtn label="+ Add Data Source" onClick={() => setDsAddOpen(true)} />
    }
    if (activeTab === 'Risk Score') {
      return <AutoSaveIndicator />
    }
    return null
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 28px', borderBottom: '1px solid #ECECEC', flexShrink: 0,
      }}>
        <h1 style={{
          margin: 0, fontSize: '20px', fontWeight: 700,
          color: '#262A33', fontFamily: "'Space Grotesk', sans-serif",
        }}>
          Configuration Panel
        </h1>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
        <TabBar active={activeTab} onChange={setActiveTab} action={renderAction()} />

        {activeTab === 'Rules'           && <RulesTab />}
        {activeTab === 'Payer'           && <PayerTab />}
        {activeTab === 'Data Source'     && (
          <DataSourceTab
            addOpen={dsAddOpen}
            onAddClose={() => setDsAddOpen(false)}
          />
        )}
        {activeTab === 'Risk Score'      && <RiskScoreTab />}
        {activeTab === 'Form Management' && <FormManagementTab />}
      </div>
    </div>
  )
}
