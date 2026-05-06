import { useState } from 'react'
import { riskFactors } from '../../data/configPanel'

const PURPLE = '#5C3FEE'

function RiskSlider({ label, initial }: { label: string; initial: number }): React.JSX.Element {
  const [value, setValue] = useState(initial)
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '14px', color: '#262A33', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
          {label}
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          minWidth: '52px', padding: '3px 12px', borderRadius: '5px',
          backgroundColor: '#EDE9FF', color: PURPLE,
          fontSize: '13px', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {value}%
        </span>
      </div>
      <div style={{ position: 'relative', height: '6px' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '3px',
          background: `linear-gradient(to right, ${PURPLE} ${value}%, #E3E5E8 ${value}%)`,
        }} />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            appearance: 'none', WebkitAppearance: 'none',
            background: 'transparent', cursor: 'pointer', margin: 0,
          }}
        />
      </div>
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid ${PURPLE};
          box-shadow: 0 1px 4px rgba(92,63,238,0.18);
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2px solid ${PURPLE};
          box-shadow: 0 1px 4px rgba(92,63,238,0.18);
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default function RiskScoreTab(): React.JSX.Element {
  return (
    <div style={{ border: '1px solid #ECECEC', borderRadius: '10px', padding: '28px 32px', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '640px' }}>
        {riskFactors.map(f => (
          <RiskSlider key={f.label} label={f.label} initial={f.value} />
        ))}
      </div>
    </div>
  )
}
