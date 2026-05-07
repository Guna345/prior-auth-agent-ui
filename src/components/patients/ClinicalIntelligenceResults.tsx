import { useState } from 'react'
import { CI_RESULTS } from '../../data/clinicalIntelligence'
import ClinicalReferenceModal from './ClinicalReferenceModal'

const FONT = "'Space Grotesk', sans-serif"

export default function ClinicalIntelligenceResults() {
  const [refOpen, setRefOpen] = useState(false)
  return (
    <div style={{ padding: '28px 32px', overflowY: 'auto', flex: 1 }}>
      <h2 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
        Clinical Intelligence
      </h2>

      {/* Diagnoses List */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
          Diagnoses List
        </h3>
        {/* Severity badge */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '3px 14px',
          borderRadius: '6px', fontSize: '13px', fontWeight: 600, marginBottom: '14px',
          backgroundColor: '#FFE4E6', color: '#E11D48',
        }}>
          {CI_RESULTS.diagnosesLabel}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CI_RESULTS.diagnoses.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FECDD3', flexShrink: 0, marginTop: '4px' }} />
              <span style={{ fontSize: '14px', color: '#262A33', fontFamily: FONT, lineHeight: '1.5' }}>
                {d.text}&nbsp;
                <span onClick={() => setRefOpen(true)} style={{ fontSize: '13px', color: '#5C3FEE', textDecoration: 'underline', cursor: 'pointer' }}>Reference</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: '#ECECEC', marginBottom: '28px' }} />

      {/* Diagnoses Codes */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
          Diagnoses Codes
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {CI_RESULTS.codes.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#E3E5E8', flexShrink: 0 }} />
              <span style={{
                padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                backgroundColor: '#EDE9FF', color: '#5C3FEE',
              }}>
                {c.code}
              </span>
              <span style={{ fontSize: '14px', color: '#262A33', fontFamily: FONT }}>{c.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: '#ECECEC', marginBottom: '28px' }} />

      {/* Treatment History */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
          Treatment History
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {CI_RESULTS.treatments.map((t, i) => (
            <div key={i} style={{
              border: '1px solid #ECECEC', borderRadius: '10px', padding: '14px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              backgroundColor: '#FAFAFA',
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#262A33', fontFamily: FONT }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: '#757C8D', fontFamily: FONT, marginTop: '3px' }}>{t.duration}</div>
              </div>
              <span style={{
                padding: '3px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 600,
                backgroundColor: '#FFE4E6', color: '#E11D48',
              }}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Note */}
      <div>
        <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#757C8D', fontFamily: FONT }}>Clinical Note</p>
        <div style={{ backgroundColor: '#F7F5FF', borderRadius: '10px', padding: '16px 20px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.75' }}>
            {CI_RESULTS.clinicalNote}
          </p>
        </div>
      </div>

      {refOpen && <ClinicalReferenceModal onClose={() => setRefOpen(false)} />}
    </div>
  )
}
