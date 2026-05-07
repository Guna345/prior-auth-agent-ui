const FONT = "'Space Grotesk', sans-serif"
const NAVY = '#1B2D4F'

interface Props { onClose: () => void }

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{
      backgroundColor: NAVY, color: '#FFFFFF', padding: '8px 16px',
      fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em',
      fontFamily: FONT, marginTop: '20px', marginBottom: '10px',
    }}>
      {title}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #E8ECF0' }}>
      <div style={{ width: '180px', flexShrink: 0, padding: '8px 12px', fontSize: '13px', fontWeight: 700, color: '#1B2D4F', fontFamily: FONT }}>
        {label}
      </div>
      <div style={{ flex: 1, padding: '8px 12px', fontSize: '13px', color: '#262A33', fontFamily: FONT }}>
        {value}
      </div>
    </div>
  )
}

export default function ClinicalReferenceModal({ onClose }: Props) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1500, backgroundColor: 'rgba(38,42,51,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 1501,
          width: '44px', height: '44px', borderRadius: '50%',
          backgroundColor: '#FFFFFF', border: '1px solid #E3E5E8',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#262A33" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Document card */}
      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: '12px',
        width: '100%', maxWidth: '720px', maxHeight: '88vh',
        overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        padding: '36px 40px',
      }}>
        {/* Letterhead */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: 700, color: NAVY, fontFamily: FONT, letterSpacing: '0.02em' }}>
            HOUSTON DIABETES &amp; ENDOCRINE CENTER
          </h1>
          <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#555', fontFamily: FONT }}>
            9200 Bellaire Blvd, Suite 410 | Houston, TX 77036
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#555', fontFamily: FONT }}>
            Phone: (713) 555-1840 | Fax: (713) 555-1841
          </p>
          <div style={{ height: '2px', backgroundColor: NAVY, marginTop: '16px' }} />
        </div>

        {/* Title */}
        <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: 700, color: NAVY, fontFamily: FONT, margin: '0 0 16px', letterSpacing: '0.03em' }}>
          ENDOCRINOLOGY CONSULTATION NOTE — HISTORY &amp; PHYSICAL
        </p>

        {/* Patient info */}
        <div style={{ border: '1px solid #E8ECF0', borderRadius: '4px', overflow: 'hidden', marginBottom: '4px' }}>
          <InfoRow label="Patient:" value="PATEL, RAMESH K." />
          <InfoRow label="DOB:" value="06/22/1958 (Age: 67)" />
          <InfoRow label="MRN:" value="993847" />
          <InfoRow label="DOS:" value="April 01, 2026" />
          <InfoRow label="Provider:" value="Anita Krishnamurthy, MD — Endocrinology" />
          <InfoRow label="Visit Type:" value="Follow-up / Medication Management" />
          <InfoRow label="Referring Provider:" value="Dr. James Okafor, MD — Internal Medicine, NPI: 3841029567" />
        </div>

        <SectionHeader title="CHIEF COMPLAINT" />
        <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.75', padding: '0 2px' }}>
          Evaluation and management of Type 2 Diabetes Mellitus with persistent suboptimal glycemic control and Stage 3b Chronic Kidney Disease. Request for advanced diabetes pharmacotherapy (SGLT2 inhibitor — Empagliflozin/Jardiance) for dual glycemic and renoprotective benefit.
        </p>

        <SectionHeader title="HISTORY OF PRESENT ILLNESS" />
        <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.75', padding: '0 2px' }}>
          Mr. Patel is a 67-year-old South Asian male with a 13-year history of Type 2 Diabetes Mellitus diagnosed in 2013. He has been managed primarily by his internist and now presents to endocrinology for specialist evaluation. His most recent HbA1c (03/28/2026) is 8.4%, which remains above his individualized target of &lt;7.5% per ADA 2026 guidelines for patients with CKD. He reports compliance with his current regimen of Metformin 1000 mg BID.
        </p>
        <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.75', padding: '0 2px' }}>
          Kidney function has been progressively declining. eGFR was 58 in 2023, 47 in 2024, and now 38 mL/min/1.73m2 (March 2026), confirming Stage 3b CKD. Urine albumin-to-creatinine ratio (UACR) has risen from 180 mg/g (2024) to 420 mg/g (March 2026), indicating severely increased albuminuria — a key marker of CKD progression risk.
        </p>
        <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.75', padding: '0 2px' }}>
          He denies polyuria, polydipsia, or significant weight changes. He reports mild fatigue and lower extremity edema (trace, bilateral). Blood pressure is moderately controlled on Lisinopril 10 mg daily (today: 138/84 mmHg). Cardiovascular review reveals no symptoms of heart failure or recent cardiac events. He has no history of urinary tract infections, genital mycotic infections, or Fournier's gangrene — key safety considerations for SGLT2 therapy.
        </p>

        <SectionHeader title="PAST MEDICAL HISTORY" />
        <ol style={{ margin: '0 0 8px', paddingLeft: '20px' }}>
          {[
            'Type 2 Diabetes Mellitus — diagnosed 2013; 13-year history',
            'Chronic Kidney Disease, Stage 3b — eGFR 38; UACR 420 mg/g (severely increased)',
            'Essential Hypertension — moderately controlled; on ACE inhibitor',
            'Hyperlipidemia — on statin therapy; LDL 92 mg/dL (last checked 01/2026)',
            'Diabetic Peripheral Neuropathy — mild, bilateral feet; managed conservatively',
            'Non-alcoholic Fatty Liver Disease (NAFLD) — confirmed on ultrasound 2024; stable',
            'Obesity — BMI 31.8 kg/m2',
            'Microalbuminuria / Proteinuria — progressive; UACR 420 mg/g',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.75', marginBottom: '2px' }}>
              {item}
            </li>
          ))}
        </ol>

        <SectionHeader title="SURGICAL HISTORY" />
        <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#262A33', fontFamily: FONT, lineHeight: '1.75', padding: '0 2px' }}>
          Appendectomy (1998). Right carpal tunnel release (2019). No cardiac or renal surgeries.
        </p>
      </div>
    </div>
  )
}
