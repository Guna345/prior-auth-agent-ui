const FONT = "'Space Grotesk', sans-serif"

const LAB_ROWS = [
  { name: 'Urea',                       sub: 'Urease UV',              result: '15',  flag: '',     ref: '13 - 43',   unit: 'mg/dL' },
  { name: 'Creatinine',                 sub: 'Modified Jaffe, Kinetic', result: '1.5', flag: 'High', ref: '0.7 - 1.3', unit: 'mg/dL' },
  { name: 'Uric Acid',                  sub: 'Uricase',                result: '5.5', flag: '',     ref: '3.5 - 7.2', unit: 'mg/dL' },
  { name: 'Calcium, Total',             sub: 'Arsenazo III',           result: '10.2',flag: '',     ref: '8.7 - 10.4',unit: 'mg/dL' },
  { name: 'Phosphorus',                 sub: 'Molybdate UV',           result: '1.4', flag: 'Low',  ref: '2.4 - 5.1', unit: 'mg/dL' },
  { name: 'Alkaline Phosphatase (ALP)', sub: 'IFCC-AMP',               result: '80',  flag: '',     ref: '30 - 120',  unit: 'U/L'   },
  { name: 'Total Protein',              sub: 'Biuret',                 result: '5.9', flag: '',     ref: '5.7 - 8.2', unit: 'g/dL'  },
  { name: 'Albumin',                    sub: 'BCG',                    result: '4.1', flag: '',     ref: '3.2 - 4.8', unit: 'g/dL'  },
  { name: 'Sodium',                     sub: 'Indirect ISE',           result: '139', flag: '',     ref: '136 - 145', unit: 'mEq/L' },
  { name: 'Potassium',                  sub: 'Indirect ISE',           result: '3.9', flag: '',     ref: '3.5 - 5.1', unit: 'mEq/L' },
  { name: 'Chloride',                   sub: 'Indirect ISE',           result: '100', flag: '',     ref: '98 - 107',  unit: 'mEq/L' },
]

export default function LabResultsPreview() {
  return (
    <div style={{ fontFamily: FONT, color: '#1a1a1a' }}>
      <div style={{ background: 'linear-gradient(90deg, #1A3E8F 0%, #1A3E8F 60%, #2563EB 100%)', padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF' }}>
              <span>SMART </span><span style={{ color: '#93C5FD' }}>PATHOLOGY LAB</span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.15em', marginTop: '2px' }}>
              Accurate &nbsp;|&nbsp; Caring &nbsp;|&nbsp; Instant
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#4ADE80" stroke="#4ADE80" strokeWidth="1"><circle cx="12" cy="12" r="10"/></svg>
            9123456789 / 8912345678
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FCD34D" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            smartpatholab@gmail.com
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#1E3A5F', padding: '6px 28px', fontSize: '10.5px', color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
        105-108, SMART VISION COMPLEX, HEALTHCARE ROAD, OPPOSITE HEALTHCARE COMPLEX, MUMBAI - 689578
      </div>
      <div style={{ height: '6px', backgroundImage: 'repeating-linear-gradient(-45deg, #1A3E8F 0px, #1A3E8F 6px, #93C5FD 6px, #93C5FD 12px)' }} />

      <div style={{ padding: '16px 28px', display: 'flex', gap: '24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Yash M. Patel</div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Age : 21 Years</div>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>Sex : Male</div>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>PID : 555</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Sample Collected At:</div>
          <div style={{ fontSize: '12px', color: '#374151', marginTop: '3px' }}>125, Shivam Bungalow, S G Road, Mumbai</div>
          <div style={{ fontSize: '12px', marginTop: '6px' }}>
            <span style={{ color: '#6B7280' }}>Ref. By: </span>
            <span style={{ fontWeight: 600, color: '#1A3E8F' }}>Dr. Hiren Shah</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '11px', color: '#374151', lineHeight: '1.8' }}>
          <div><span style={{ fontWeight: 600 }}>Registered on:</span> 02:31 PM 02 Dec, 22</div>
          <div><span style={{ fontWeight: 600 }}>Collected on:</span> 03:11 PM 02 Dec, 22</div>
          <div><span style={{ fontWeight: 600 }}>Reported on:</span> 04:35 PM 02 Dec, 22</div>
        </div>
      </div>

      <div style={{ padding: '14px 28px', textAlign: 'center', fontSize: '15px', fontWeight: 700, color: '#111827', letterSpacing: '0.05em', borderBottom: '1px solid #E5E7EB' }}>
        KIDNEY PANEL (KFT)
      </div>

      <div style={{ padding: '0 28px 20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #111827' }}>
              <th style={{ padding: '10px 8px 8px 0', textAlign: 'left', fontSize: '13px', fontWeight: 700 }}>Investigation</th>
              <th style={{ padding: '10px 8px 8px', textAlign: 'left', fontSize: '13px', fontWeight: 700 }}>Result</th>
              <th style={{ padding: '10px 8px 8px', textAlign: 'left', fontSize: '13px', fontWeight: 700 }}>Reference Value</th>
              <th style={{ padding: '10px 0 8px', textAlign: 'left', fontSize: '13px', fontWeight: 700 }}>Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              <td style={{ padding: '8px 8px 8px 0', fontSize: '13px', color: '#374151' }}>Primary Sample Type :</td>
              <td style={{ padding: '8px', fontSize: '13px', color: '#374151' }}>Serum</td>
              <td /><td />
            </tr>
            {LAB_ROWS.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '7px 8px 7px 0' }}>
                  <div style={{ fontSize: '13px', color: '#111827' }}>{r.name}</div>
                  <div style={{ fontSize: '10px', color: '#9CA3AF' }}>{r.sub}</div>
                </td>
                <td style={{ padding: '7px 8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: r.flag ? 700 : 400, color: r.flag === 'High' ? '#DC2626' : r.flag === 'Low' ? '#2563EB' : '#111827' }}>{r.result}</span>
                  {r.flag && <span style={{ marginLeft: '8px', fontSize: '11px', fontWeight: 600, color: r.flag === 'High' ? '#DC2626' : '#2563EB' }}>{r.flag}</span>}
                </td>
                <td style={{ padding: '7px 8px', fontSize: '13px', color: '#6B7280' }}>{r.ref}</td>
                <td style={{ padding: '7px 0', fontSize: '13px', color: '#6B7280' }}>{r.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '20px', padding: '14px 16px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>ADVICE: CKD RISK MAP</div>
          <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: '1.7' }}>
            KDIGO guideline, 2012 recommends Chronic Kidney disease (CKD) should be classified based on cause, GFR category and albuminuria (ACR) category.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #E5E7EB', fontSize: '11px', color: '#9CA3AF' }}>
          <span>Thanks for Reference</span>
          <span>****End of Report****</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '12px' }}>
          {[{ name: 'Medical Lab Technician', title: '(DMLT, BMLT)' }, { name: 'Dr. Payal Shah', title: '(MD, Pathologist)' }, { name: 'Dr. Vimal Shah', title: '(MD, Pathologist)' }].map(s => (
            <div key={s.name} style={{ textAlign: 'center' }}>
              <div style={{ height: '28px', borderBottom: '1px solid #9CA3AF', marginBottom: '6px', width: '120px' }} />
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>{s.name}</div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>{s.title}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', fontSize: '10px', color: '#9CA3AF', textAlign: 'center' }}>
          Generated on : 02 Dec, 2022 05:00 PM &nbsp;&nbsp; Page 1 of 1
        </div>
      </div>

      <div style={{ backgroundColor: '#1A3E8F', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{ width: '16px', height: '28px', backgroundColor: i % 2 === 0 ? 'rgba(0,0,0,0.3)' : 'transparent', transform: 'skewX(-20deg)', marginRight: '2px' }} />
          ))}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#FACC15' }}>Sample Collection</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>📱 9123456789</div>
      </div>
    </div>
  )
}
