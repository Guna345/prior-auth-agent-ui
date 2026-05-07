import type { FormItem } from '../../data/configPanel'

const FONT = "'Space Grotesk', sans-serif"
const NAVY = '#1B2D4F'

interface Props {
  form: FormItem
  onClose: () => void
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{
      backgroundColor: NAVY, color: '#FFFFFF', padding: '8px 16px',
      fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em',
      fontFamily: FONT, marginTop: '20px', marginBottom: '12px',
    }}>
      {title}
    </div>
  )
}

function FieldRow({ label, value = '' }: { label: string; value?: string }) {
  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
      <div style={{ width: '200px', flexShrink: 0, fontSize: '13px', fontWeight: 600, color: NAVY, fontFamily: FONT, paddingTop: '2px' }}>
        {label}
      </div>
      <div style={{
        flex: 1, borderBottom: '1.5px solid #C8CDD6', padding: '2px 4px',
        fontSize: '13px', color: value ? '#262A33' : '#B0B7C3', fontFamily: FONT, minHeight: '22px',
      }}>
        {value || '________________________________'}
      </div>
    </div>
  )
}

function CheckRow({ label, checked = false }: { label: string; checked?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <div style={{
        width: '16px', height: '16px', border: `1.5px solid ${NAVY}`,
        borderRadius: '3px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: checked ? NAVY : 'transparent',
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </div>
      <span style={{ fontSize: '13px', color: '#262A33', fontFamily: FONT }}>{label}</span>
    </div>
  )
}

export default function FormPreviewModal({ form, onClose }: Props) {
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
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 700, color: NAVY, fontFamily: FONT, letterSpacing: '0.02em' }}>
            {form.payerName.toUpperCase()}
          </h1>
          <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#555', fontFamily: FONT }}>
            Prior Authorization Request Form
          </p>
          <div style={{ height: '2px', backgroundColor: NAVY, marginTop: '14px' }} />
        </div>

        {/* Form title */}
        <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: 700, color: NAVY, fontFamily: FONT, margin: '0 0 4px', letterSpacing: '0.03em' }}>
          {form.formName.toUpperCase()}
        </p>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#757C8D', fontFamily: FONT, margin: '0 0 16px' }}>
          Form #{`F-${String(form.sno).padStart(4, '0')}`} &nbsp;|&nbsp; Version 2.1 &nbsp;|&nbsp; Effective: 01/01/2026
        </p>

        {/* Patient Information */}
        <SectionHeader title="PATIENT INFORMATION" />
        <div style={{ padding: '0 4px' }}>
          <FieldRow label="Patient Full Name:" value="Patel, Ramesh K." />
          <FieldRow label="Date of Birth:" value="06/22/1958" />
          <FieldRow label="Member ID / Policy #:" value="MBR-993847-26" />
          <FieldRow label="Group Number:" value="GRP-00912" />
          <FieldRow label="Phone Number:" value="(713) 555-0192" />
          <FieldRow label="Address:" value="4821 Westheimer Rd, Houston, TX 77056" />
        </div>

        {/* Requesting Provider */}
        <SectionHeader title="REQUESTING PROVIDER INFORMATION" />
        <div style={{ padding: '0 4px' }}>
          <FieldRow label="Provider Name:" value="Anita Krishnamurthy, MD" />
          <FieldRow label="Specialty:" value="Endocrinology" />
          <FieldRow label="NPI Number:" value="3841029567" />
          <FieldRow label="Facility / Practice:" value="Houston Diabetes & Endocrine Center" />
          <FieldRow label="Phone:" value="(713) 555-1840" />
          <FieldRow label="Fax:" value="(713) 555-1841" />
        </div>

        {/* Service Details */}
        <SectionHeader title="REQUESTED SERVICE / PROCEDURE" />
        <div style={{ padding: '0 4px' }}>
          <FieldRow label="CPT / Procedure Code:" value="73645, 89204" />
          <FieldRow label="ICD-10 Diagnosis Code:" value="E11.65, N18.3" />
          <FieldRow label="Service Description:" value="SGLT2 Inhibitor — Empagliflozin/Jardiance" />
          <FieldRow label="Requested Start Date:" value="04/15/2026" />
          <FieldRow label="Duration / # of Visits:" value="12 months / Ongoing" />
          <FieldRow label="Place of Service:" value="11 — Office" />
        </div>

        {/* Clinical Justification */}
        <SectionHeader title="CLINICAL JUSTIFICATION" />
        <div style={{ padding: '0 4px', marginBottom: '8px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600, color: NAVY, fontFamily: FONT }}>
            Type of Request:
          </p>
          <div style={{ display: 'flex', gap: '32px', marginBottom: '14px' }}>
            <CheckRow label="Initial Request" checked />
            <CheckRow label="Reauthorization" />
            <CheckRow label="Urgent / Expedited" />
          </div>
          <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600, color: NAVY, fontFamily: FONT }}>
            Supporting Clinical Criteria:
          </p>
          <CheckRow label="HbA1c ≥ 7.5% on current therapy (most recent: 8.4% — 03/28/2026)" checked />
          <CheckRow label="Stage 3b CKD confirmed — eGFR 38 mL/min/1.73m² (03/2026)" checked />
          <CheckRow label="UACR ≥ 300 mg/g — severely increased albuminuria (420 mg/g)" checked />
          <CheckRow label="Failure or contraindication to first-line agents" checked />
          <CheckRow label="Cardiovascular disease or high CV risk" />
        </div>

        {/* Prior Auth Details */}
        <SectionHeader title="AUTHORIZATION DETAILS" />
        <div style={{ padding: '0 4px' }}>
          <FieldRow label="Previous Auth Number:" />
          <FieldRow label="Referring Physician:" value="Dr. James Okafor, MD — Internal Medicine" />
          <FieldRow label="Referring NPI:" value="3841029568" />
        </div>

        {/* Signature */}
        <SectionHeader title="PROVIDER CERTIFICATION" />
        <div style={{ padding: '0 4px' }}>
          <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#555', fontFamily: FONT, lineHeight: '1.7' }}>
            I certify that the information provided on this form is true and accurate to the best of my knowledge, and that the requested service is medically necessary for this patient based on current clinical evidence and guidelines.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FieldRow label="Provider Signature:" />
            <FieldRow label="Date:" />
          </div>
          <FieldRow label="Printed Name:" value="Anita Krishnamurthy, MD" />
        </div>

        {/* Footer */}
        <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1.5px solid #ECECEC', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', fontFamily: FONT }}>
            Submit completed form to: {form.payerName} Prior Authorization Department &nbsp;|&nbsp; Fax: (800) 555-0100
          </p>
        </div>
      </div>
    </div>
  )
}
