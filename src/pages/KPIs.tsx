import React from 'react'
import { kpiData, weeklyKpiChart } from '../data/bomData'
import { PageHeader, ProgressBar } from '../components/ui'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line, Legend } from 'recharts'

export default function KPIs() {
  return (
    <div style={{ flex: 1, overflow: 'auto' }} className="animate-in">
      <PageHeader
        title="KPI Dashboard"
        subtitle="Weekly / Monthly Metrics · Target vs Actual · Trend Tracking"
        badge="LIVE"
      />

      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {kpiData.map(kpi => {
            const isInverse = kpi.inverse
            const isGood = isInverse ? kpi.actual <= kpi.target : kpi.actual >= kpi.target
            const pct = isInverse
              ? Math.max(0, 100 - Math.max(0, kpi.actual - kpi.target) * 10)
              : Math.min(100, (kpi.actual / kpi.target) * 100)
            const color = isGood ? 'var(--green)' : kpi.actual > (isInverse ? kpi.target * 1.5 : kpi.target * 0.8) ? 'var(--yellow)' : 'var(--red)'

            return (
              <div key={kpi.name} style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: 16,
              }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.06em' }}>
                  {kpi.name.toUpperCase()}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
                  <div style={{ fontSize: 26, fontWeight: 700, fontFamily: 'var(--font-mono)', color, lineHeight: 1 }}>
                    {kpi.actual}<span style={{ fontSize: 12 }}>{kpi.unit}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TARGET</div>
                    <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{kpi.target}{kpi.unit}</div>
                  </div>
                </div>
                <ProgressBar value={pct} color={color} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {isGood ? '▲ ON TARGET' : '▼ BELOW TARGET'}
                  </span>
                  <span style={{ fontSize: 10, color: kpi.trend === 'up' ? 'var(--green)' : kpi.trend === 'down' ? 'var(--red)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'} {kpi.trend}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Weekly Trend Line */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 16 }}>
              WEEKLY PERFORMANCE TREND
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyKpiChart}>
                <XAxis dataKey="week" tick={{ fill: '#555', fontSize: 10 }} axisLine={{ stroke: '#2a2a2a' }} tickLine={false} />
                <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} domain={[60, 100]} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 4, fontSize: 11 }} />
                <ReferenceLine y={90} stroke="#2a2a2a" strokeDasharray="4 2" />
                <Line type="monotone" dataKey="delivery" stroke="#f0a500" strokeWidth={2} dot={{ fill: '#f0a500', r: 3 }} name="Delivery" />
                <Line type="monotone" dataKey="bom" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} name="BOM" />
                <Line type="monotone" dataKey="jo" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} name="JO" />
                <Line type="monotone" dataKey="purchasing" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 3 }} name="Purchasing" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 16 }}>
              ACTUAL VS TARGET (%)
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={kpiData.filter(k => !k.inverse && k.unit === '%')} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} width={130} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 4, fontSize: 11 }} />
                <ReferenceLine x={90} stroke="#2a2a2a" strokeDasharray="4 2" />
                <Bar dataKey="target" fill="#2a2a2a" name="Target" radius={[0, 2, 2, 0]} />
                <Bar dataKey="actual" fill="#f0a500" name="Actual" radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            KPI DETAIL TABLE
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['KPI', 'DESCRIPTION', 'TARGET', 'ACTUAL', 'GAP', 'FREQUENCY', 'STATUS'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.07em', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kpiData.map(kpi => {
                const isInverse = kpi.inverse
                const isGood = isInverse ? kpi.actual <= kpi.target : kpi.actual >= kpi.target
                const gap = isInverse ? kpi.target - kpi.actual : kpi.actual - kpi.target
                const descriptions: Record<string, string> = {
                  'On-Time Delivery': '% of JOs completed on or before due date',
                  'BOM Accuracy': '% of BOMs with no open discrepancies',
                  'JO Completion Rate': '% of JOs closed vs total issued',
                  'Purchasing On-Time %': '% of POs received on promised date',
                  'External Op Return On-Time': '% of outsourced ops returned on time',
                  'Scrap & Rework Rate': '% of production qty scrapped or reworked',
                  'ERP Data Quality Score': '% of audit items resolved / closed',
                  'Open ECO Age (avg days)': 'Average age of open ECOs in days',
                }
                return (
                  <tr key={kpi.name} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 16px', color: 'var(--text-primary)', fontWeight: 500 }}>{kpi.name}</td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontSize: 12 }}>{descriptions[kpi.name] || ''}</td>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{kpi.target}{kpi.unit}</td>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', color: isGood ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>{kpi.actual}{kpi.unit}</td>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', color: gap >= 0 ? 'var(--green)' : 'var(--red)', fontSize: 12 }}>
                      {gap >= 0 ? '+' : ''}{gap.toFixed(1)}{kpi.unit}
                    </td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontSize: 12 }}>
                      {['BOM Accuracy', 'ERP Data Quality Score', 'Open ECO Age (avg days)'].includes(kpi.name) ? 'Monthly' : 'Weekly'}
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{
                        fontSize: 10, fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: 3,
                        background: isGood ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                        color: isGood ? 'var(--green)' : 'var(--red)',
                      }}>
                        {isGood ? 'ON TARGET' : 'BELOW TARGET'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
