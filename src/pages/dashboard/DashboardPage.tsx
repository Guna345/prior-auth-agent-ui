import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

/* ── Data ─────────────────────────────────────────── */

const statCards = [
  { label: 'Total Active Cases',   value: '156',      color: '#262A33' },
  { label: 'Avg. Processing Time', value: '1.8 Days', color: '#262A33' },
  { label: 'Auth Approval Rate',   value: '92%',      color: '#15B8A6' },
  { label: 'Daily New Cases',      value: '24',       color: '#262A33' },
]

const workflowData = [
  { stage: 'Verification',   cases: 45 },
  { stage: 'Clinical Intel', cases: 35 },
  { stage: 'Auth Decision',  cases: 40 },
  { stage: 'Readiness',      cases: 30 },
  { stage: 'Risk',           cases: 27 },
  { stage: 'Submission',     cases: 16 },
]

const payerData = [
  { name: 'United Healthcare (40%)', value: 40 },
  { name: 'Blue Cross (30%)',        value: 30 },
  { name: 'Aetna (20%)',             value: 20 },
  { name: 'Other (10%)',             value: 10 },
]
const PAYER_COLORS = ['#5C3FEE', '#15B8A6', '#F59E0B', '#C4C4C4']

const activityItems = [
  { dot: '#15B8A6', text: 'CASE-0945 approved by Clinical Reviewer' },
  { dot: '#15B8A6', text: 'New lab results uploaded for CASE-0942' },
  { dot: '#F59E0B', text: 'CASE-0940 moved to Auth Decision stage' },
  { dot: '#C4C4C4', text: 'System maintenance scheduled for 02:00 AM' },
]

const teamData = [
  { rank: 1, name: 'Jane Smith',    cases: 42, score: '97%' },
  { rank: 2, name: 'Michael Brown', cases: 38, score: '94%' },
  { rank: 3, name: 'Emily Davis',   cases: 35, score: '91%' },
  { rank: 4, name: 'David Wilson',  cases: 31, score: '88%' },
]

/* ── Shared styles ────────────────────────────────── */

const card: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #EEEEEC',
  borderRadius: '12px',
  padding: '20px',
}

/* ── Sub-components ───────────────────────────────── */

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={card}>
      <p style={{ fontSize: '13px', color: '#757C8D', margin: '0 0 10px', fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </p>
      <p style={{ fontSize: '30px', fontWeight: 700, color, margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
        {value}
      </p>
    </div>
  )
}

const renderLegend = (props: { payload?: { color: string; value: string }[] }) => {
  const { payload = [] } = props
  return (
    <ul style={{ listStyle: 'none', margin: '12px 0 0', padding: 0 }}>
      {payload.map((entry, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{
            display: 'inline-block', width: '10px', height: '10px',
            borderRadius: '2px', backgroundColor: entry.color, flexShrink: 0,
          }} />
          <span style={{ fontSize: '13px', color: '#262A33', fontFamily: "'Space Grotesk', sans-serif" }}>
            {entry.value}
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ── Page ─────────────────────────────────────────── */

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header — matches User Management style */}
      <div style={{
        padding: '20px 32px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #ECECEC',
        flexShrink: 0,
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#262A33', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
          Dashboard
        </h1>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', backgroundColor: '#FFFFFF' }}>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
          {statCards.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Charts row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '16px', marginBottom: '20px' }}>

          {/* Bar chart card */}
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#262A33', margin: 0 }}>
                Cases by Workflow Stage
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#5C3FEE', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', color: '#757C8D' }}>Cases</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={workflowData} barCategoryGap="38%">
                <XAxis
                  dataKey="stage"
                  tick={{ fontSize: 12, fill: '#757C8D', fontFamily: 'Space Grotesk, sans-serif' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #EEEEEC', fontSize: '13px' }}
                  cursor={{ fill: '#F4F2FF' }}
                />
                <Bar dataKey="cases" fill="#5C3FEE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Donut chart card */}
          <div style={card}>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#262A33', margin: '0 0 4px' }}>
              Payer Volume Distribution
            </p>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie
                  data={payerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={88}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                >
                  {payerData.map((_, i) => <Cell key={i} fill={PAYER_COLORS[i]} />)}
                </Pie>
                <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle">
                  <tspan fontSize="20" fontWeight="700" fill="#262A33" fontFamily="Space Grotesk, sans-serif">100%</tspan>
                </text>
                <text x="50%" y="57%" textAnchor="middle" dominantBaseline="middle">
                  <tspan fontSize="11" fill="#757C8D" fontFamily="Space Grotesk, sans-serif">Total</tspan>
                </text>
              </PieChart>
            </ResponsiveContainer>
            <Legend
              payload={payerData.map((d, i) => ({ value: d.name, color: PAYER_COLORS[i] }))}
              content={renderLegend as React.ComponentType<unknown>}
            />
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

          {/* Recent Activity */}
          <div style={card}>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#262A33', margin: '0 0 16px' }}>
              Recent System Activity
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activityItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.dot, flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', color: '#262A33' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div style={card}>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#262A33', margin: '0 0 12px' }}>
              Team Performance
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['', 'Specialist', 'Cases', 'Efficiency Score'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '8px 10px', fontSize: '12px',
                      color: '#757C8D', fontWeight: 400, borderBottom: '1px solid #EEEEEC',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamData.map(row => (
                  <tr key={row.rank}>
                    <td style={{ padding: '12px 10px', fontSize: '13px', color: '#757C8D', borderBottom: '1px solid #F5F5F5', width: '32px' }}>
                      {row.rank}
                    </td>
                    <td style={{ padding: '12px 10px', fontSize: '13px', color: '#262A33', fontWeight: 600, borderBottom: '1px solid #F5F5F5' }}>
                      {row.name}
                    </td>
                    <td style={{ padding: '12px 10px', fontSize: '13px', color: '#262A33', borderBottom: '1px solid #F5F5F5' }}>
                      {row.cases}
                    </td>
                    <td style={{ padding: '12px 10px', fontSize: '13px', color: '#5C3FEE', fontWeight: 600, borderBottom: '1px solid #F5F5F5' }}>
                      {row.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
