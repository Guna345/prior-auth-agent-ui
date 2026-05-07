import { useState } from 'react'
import { CASE_DOCUMENTS } from '../../data/clinicalIntelligence'
import RightDrawer from '../ui/RightDrawer'

const FONT = "'Space Grotesk', sans-serif"
const PURPLE = '#5C3FEE'

interface Props {
  caseId: string
  onClose: () => void
}

function LabReportContent() {
  const rows = [
    { name: 'Urea',                    sub: 'Urease UV',              result: '15',  flag: '',     ref: '13 - 43',    unit: 'mg/dL' },
    { name: 'Creatinine',              sub: 'Modified Jaffe, Kinetic', result: '1.5', flag: 'High', ref: '0.7 - 1.3',  unit: 'mg/dL' },
    { name: 'Uric Acid',               sub: 'Uricase',                result: '5.5', flag: '',     ref: '3.5 - 7.2',  unit: 'mg/dL' },
    { name: 'Calcium, Total',          sub: 'Arsenazo III',            result: '10.2',flag: '',     ref: '8.7 - 10.4', unit: 'mg/dL' },
    { name: 'Phosphorus',              sub: 'Molybdate UV',            result: '1.4', flag: 'Low',  ref: '2.4 - 5.1',  unit: 'mg/dL' },
    { name: 'Alkaline Phosphatase (ALP)', sub: 'IFCC-AMP',            result: '80',  flag: '',     ref: '30 - 120',   unit: 'U/L'   },
    { name: 'Total Protein',           sub: 'Biuret',                  result: '5.9', flag: '',     ref: '5.7 - 8.2',  unit: 'g/dL'  },
    { name: 'Albumin',                 sub: 'BCG',                     result: '4.1', flag: '',     ref: '3.2 - 4.8',  unit: 'g/dL'  },
    { name: 'Sodium',                  sub: 'Indirect ISE',            result: '139', flag: '',     ref: '136 - 145',  unit: 'mEq/L' },
    { name: 'Potassium',               sub: 'Indirect ISE',            result: '3.9', flag: '',     ref: '3.5 - 5.1',  unit: 'mEq/L' },
    { name: 'Chloride',                sub: 'Indirect ISE',            result: '100', flag: '',     ref: '98 - 107',   unit: 'mEq/L' },
  ]
  return (
    <div style={{ fontFamily: FONT }}>
      {/* Lab header */}
      <div style={{ background: 'linear-gradient(90deg,#1A3E8F,#2563EB)', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>SMART <span style={{ color: '#93C5FD' }}>PATHOLOGY LAB</span></div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.12em' }}>Accurate | Caring | Instant</div>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '11px', color: '#fff' }}>
          <div>📞 9123456789 / 8912345678</div>
          <div style={{ marginTop: '3px' }}>✉ smartpatholab@gmail.com</div>
        </div>
      </div>
      <div style={{ backgroundColor: '#1E3A5F', padding: '5px 28px', fontSize: '10px', color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
        105-108, SMART VISION COMPLEX, HEALTHCARE ROAD, OPPOSITE HEALTHCARE COMPLEX, MUMBAI - 689578
      </div>
      <div style={{ height: '5px', backgroundImage: 'repeating-linear-gradient(-45deg,#1A3E8F 0px,#1A3E8F 5px,#93C5FD 5px,#93C5FD 10px)' }} />
      {/* Patient info */}
      <div style={{ padding: '14px 28px', display: 'flex', gap: '20px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: 700 }}>Yash M. Patel</div>
          <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '3px' }}>Age : 21 Years&nbsp; Sex : Male&nbsp; PID : 555</div>
        </div>
        <div style={{ flex: 1, fontSize: '11px' }}>
          <div style={{ fontWeight: 600 }}>Sample Collected At:</div>
          <div style={{ color: '#374151' }}>125, Shivam Bungalow, S G Road, Mumbai</div>
          <div style={{ marginTop: '5px' }}>Ref. By: <span style={{ fontWeight: 600, color: '#1A3E8F' }}>Dr. Hiren Shah</span></div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '10.5px', lineHeight: '1.8' }}>
          <div><b>Registered on:</b> 02:31 PM 02 Dec, 22</div>
          <div><b>Collected on:</b> 03:11 PM 02 Dec, 22</div>
          <div><b>Reported on:</b> 04:35 PM 02 Dec, 22</div>
        </div>
      </div>
      <div style={{ padding: '12px 28px', textAlign: 'center', fontWeight: 700, fontSize: '14px', borderBottom: '1px solid #E5E7EB', letterSpacing: '0.05em' }}>
        KIDNEY PANEL (KFT)
      </div>
      <div style={{ padding: '0 28px 20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '4px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #111' }}>
              <th style={{ padding: '8px 6px 6px 0', textAlign: 'left', fontSize: '12px' }}>Investigation</th>
              <th style={{ padding: '8px 6px 6px', textAlign: 'left', fontSize: '12px' }}>Result</th>
              <th style={{ padding: '8px 6px 6px', textAlign: 'left', fontSize: '12px' }}>Reference Value</th>
              <th style={{ padding: '8px 0 6px', textAlign: 'left', fontSize: '12px' }}>Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              <td style={{ padding: '6px 6px 6px 0', fontSize: '12px' }}>Primary Sample Type :</td>
              <td style={{ padding: '6px', fontSize: '12px' }}>Serum</td><td /><td />
            </tr>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '5px 6px 5px 0' }}>
                  <div style={{ fontSize: '12px' }}>{r.name}</div>
                  <div style={{ fontSize: '9px', color: '#9CA3AF' }}>{r.sub}</div>
                </td>
                <td style={{ padding: '5px 6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: r.flag ? 700 : 400, color: r.flag === 'High' ? '#DC2626' : r.flag === 'Low' ? '#2563EB' : '#111' }}>{r.result}</span>
                  {r.flag && <span style={{ marginLeft: '6px', fontSize: '10px', fontWeight: 600, color: r.flag === 'High' ? '#DC2626' : '#2563EB' }}>{r.flag}</span>}
                </td>
                <td style={{ padding: '5px 6px', fontSize: '12px', color: '#6B7280' }}>{r.ref}</td>
                <td style={{ padding: '5px 0', fontSize: '12px', color: '#6B7280' }}>{r.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '16px', padding: '12px 14px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '5px' }}>ADVICE: CKD RISK MAP</div>
          <div style={{ fontSize: '11px', color: '#4B5563', lineHeight: '1.65' }}>KDIGO guideline, 2012 recommends Chronic Kidney disease (CKD) should be classified based on cause, GFR category and albuminuria (ACR) category. GFR & ACR category combined together reflect risk of progression and helps clinician to identify individuals who are progressing at more rapid rate than anticipated.</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #E5E7EB', fontSize: '10px', color: '#9CA3AF' }}>
          <span>Thanks for Reference</span><span>****End of Report****</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
          {[{ n: 'Medical Lab Technician', t: '(DMLT, BMLT)' }, { n: 'Dr. Payal Shah', t: '(MD, Pathologist)' }, { n: 'Dr. Vimal Shah', t: '(MD, Pathologist)' }].map(s => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{ height: '24px', borderBottom: '1px solid #9CA3AF', width: '110px', marginBottom: '5px' }} />
              <div style={{ fontSize: '11px', fontWeight: 600 }}>{s.n}</div>
              <div style={{ fontSize: '10px', color: '#6B7280' }}>{s.t}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '16px', fontSize: '9px', color: '#9CA3AF', textAlign: 'center' }}>Generated on : 02 Dec, 2022 05:00 PM &nbsp; Page 1 of 1</div>
      </div>
      <div style={{ backgroundColor: '#1A3E8F', padding: '10px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#FACC15' }}>Sample Collection</div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>📱 9123456789</div>
      </div>
    </div>
  )
}

function GenericDocContent({ name }: { name: string }) {
  return (
    <div style={{ padding: '32px 40px', fontFamily: FONT }}>
      <div style={{ fontSize: '18px', fontWeight: 700, color: '#262A33', marginBottom: '6px' }}>{name}</div>
      <div style={{ fontSize: '12px', color: '#757C8D', marginBottom: '24px' }}>Prior Authorization Document</div>
      <div style={{ height: '1px', backgroundColor: '#ECECEC', marginBottom: '24px' }} />
      {['Patient Name: John Doe', 'Date: 02 Dec, 2022', 'Document Type: ' + name, 'Reference: REF-2022-0938', '', 'This document has been verified and is part of the Prior Authorization case file.'].map((line, i) =>
        line === '' ? <div key={i} style={{ height: '10px' }} /> :
        line.includes(':') ? (
          <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ fontWeight: 600, minWidth: '130px', color: '#262A33' }}>{line.split(':')[0]}:</span>
            <span style={{ color: '#4B5563' }}>{line.split(':').slice(1).join(':').trim()}</span>
          </div>
        ) : <p key={i} style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.7', margin: '0 0 8px' }}>{line}</p>
      )}
      <div style={{ marginTop: '32px' }}>
        {[100,85,92,60,75].map((w, i) => <div key={i} style={{ height: '9px', backgroundColor: '#F3F4F6', borderRadius: '4px', width: `${w}%`, marginBottom: '10px' }} />)}
      </div>
    </div>
  )
}

export default function CaseDocumentsDrawer({ caseId, onClose }: Props) {
  const [activeDoc, setActiveDoc] = useState(CASE_DOCUMENTS[0])

  return (
    <RightDrawer onClose={onClose}>
      {/* Header */}
      <div style={{ padding: '20px 28px', borderBottom: '1px solid #ECECEC', display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, fontFamily: FONT }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#262A33" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#262A33', fontFamily: FONT }}>
          CASE - {caseId.replace('CASE-', '')} Documents
        </h2>
      </div>

      {/* Body: tabs + content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left tabs */}
        <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid #ECECEC', overflowY: 'auto', padding: '16px 0' }}>
          {CASE_DOCUMENTS.map(doc => (
            <button
              key={doc}
              onClick={() => setActiveDoc(doc)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '12px 20px', fontSize: '14px', cursor: 'pointer',
                border: 'none', borderBottom: activeDoc === doc ? `2px solid ${PURPLE}` : '2px solid transparent',
                backgroundColor: 'transparent',
                color: activeDoc === doc ? PURPLE : '#757C8D',
                fontWeight: activeDoc === doc ? 600 : 400,
                fontFamily: FONT,
              }}
            >
              {doc}
            </button>
          ))}
        </div>

        {/* Right content — full height */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeDoc === 'Lab Results' ? <LabReportContent /> : <GenericDocContent name={activeDoc} />}
        </div>
      </div>
    </RightDrawer>
  )
}
