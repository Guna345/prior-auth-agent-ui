const PURPLE = '#5C3FEE'
const FONT   = "'Space Grotesk', sans-serif"

const REASONING = `Patient Ramesh K. Patel (67M, MRN: 093847) presents with T2DM (HbA1c 8.4%) and CKD Stage 3b (eGFR 38, UACR 420 mg/g). Clinical Intelligence analysis confirms high-confidence ICD-CPT alignment for the primary (E11.65 → S5550: 91%) and secondary renal (N18.33 → S5550: 89%) indications.

Step therapy is fully documented and exhausted across three agents (Metformin, Glipizide, Sitagliptin). eGFR 38 is above the minimum initiation threshold of 20 mL/min/1.73m² for Empagliflozin. UACR 420 mg/g exceeds the 200 mg/g KDIGO 2024 threshold, satisfying both glycemic and renoprotective indications.

Care setting is Outpatient with Medication PA intent confirmed. One minor mismatch flagged (D65.1 — anemia of CKD vs SGLT2) — does not affect PA eligibility. Overall clinical context is strong; documentation quality meets MCG and KDIGO criteria for SGLT2 authorization.`

interface ReasoningPanelProps {
  onClose: () => void
}

export default function ReasoningPanel({ onClose }: ReasoningPanelProps) {
  return (
    <div style={{ width: '360px', flexShrink: 0, borderLeft: `3px solid ${PURPLE}`, backgroundColor: '#F7F5FF', overflowY: 'auto', padding: '24px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
          <span style={{ fontSize: '15px', fontWeight: 700, color: PURPLE, fontFamily: FONT }}>Reasoning</span>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#757C8D" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.85', color: '#262A33', whiteSpace: 'pre-line', fontFamily: FONT }}>{REASONING}</p>
    </div>
  )
}
