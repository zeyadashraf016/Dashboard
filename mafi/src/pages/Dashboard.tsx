import React from 'react'
import type { Page } from '../App'
import { bomData, kpiData } from '../data/bomData'
import { StatCard, ProgressBar } from '../components/ui'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { weeklyKpiChart } from '../data/bomData'

interface Props {
  onNavigate: (page: Page) => void
}

export default function Dashboard({ onNavigate }: Props) {
  const totalParts = bomData.length
  const onOrder = bomData.filter(b => b.status === 'On Order').length
  const available = bomData.filter(b => b.status === 'Available' || b.status === 'Active').length
  const pending = bomData.filter(b => b.status === 'Pending').length

  const byAxis = ['X Axis', 'Y Axis', 'Z Axis', 'Fixation'].map(axis => ({
    axis,
    count: bomData.filter(b => b.axis === axis).length,
    onOrder: bomData.filter(b => b.axis === axis && b.status === 'On Order').length,
  }))

  return (
    <div style={{ flex: 1 }} className="animate-in">
      {/* Header */}
      <div style={{
        padding: '28px 32px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-surface)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
              <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)' }}>Production Engineering Tracker</h1>
              <span style={{
                fontSize: 10, fontFamily: 'var(--font-mono)',
                background: 'rgba(240,165,0,0.1)', color: 'var(--accent)',
                border: '1px solid rgba(240,165,0,0.25)',
                padding: '2px 8px', borderRadius: 3,
              }}>LIVE</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              ARIA LR 340 · Serial: 0005 MAFI · P&G Palletizing System · S/O: S00060
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              X · Y · Z-Outer · Z-Inner
            </div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: 2 }}>
              Rev. 01 · 2025
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <StatCard label="TOTAL PARTS" value={totalParts} sub="Bill of Materials" accent />
          <StatCard label="ON ORDER" value={onOrder} sub="Pending delivery" color="var(--yellow)" />
          <StatCard label="AVAILABLE" value={available} sub="Ready / Active" color="var(--green)" />
          <StatCard label="PENDING ACTION" value={pending} sub="Requires attention" color="var(--red)" />
        </div>

        {/* Middle Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Axis Status */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 16 }}>
              AXIS BREAKDOWN
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {byAxis.map(({ axis, count, onOrder: ord }) => (
                <div key={axis}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{axis}</span>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{ord} on order</span>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>{count} parts</span>
                    </div>
                  </div>
                  <ProgressBar value={count - ord} max={count} color={ord > 0 ? 'var(--yellow)' : 'var(--green)'} />
                </div>
              ))}
            </div>
          </div>

          {/* KPI Summary */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 16 }}>
              KPI SNAPSHOT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {kpiData.slice(0, 5).map(kpi => {
                const isInverse = kpi.inverse
                const isGood = isInverse ? kpi.actual <= kpi.target : kpi.actual >= kpi.target
                const pct = isInverse ? Math.max(0, Math.min(100, 100 - ((kpi.actual / kpi.target) * 100 - 100) * 2)) : Math.min(100, (kpi.actual / (kpi.target * 1.1)) * 100)
                return (
                  <div key={kpi.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{kpi.name}</span>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          tgt {kpi.target}{kpi.unit}
                        </span>
                        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: isGood ? 'var(--green)' : 'var(--red)' }}>
                          {kpi.actual}{kpi.unit}
                        </span>
                      </div>
                    </div>
                    <ProgressBar value={pct} color={isGood ? 'var(--green)' : 'var(--red)'} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 20 }}>
            WEEKLY KPI TREND
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyKpiChart}>
              <XAxis dataKey="week" tick={{ fill: '#555', fontSize: 10 }} axisLine={{ stroke: '#2a2a2a' }} tickLine={false} />
              <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip
                contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 4, fontSize: 11 }}
                labelStyle={{ color: '#888' }}
              />
              <Line type="monotone" dataKey="delivery" stroke="#f0a500" strokeWidth={2} dot={{ fill: '#f0a500', r: 3 }} name="On-Time Delivery" />
              <Line type="monotone" dataKey="bom" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} name="BOM Accuracy" />
              <Line type="monotone" dataKey="jo" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} name="JO Completion" />
              <Line type="monotone" dataKey="purchasing" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 3 }} name="Purchasing On-Time" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 20, marginTop: 12, justifyContent: 'center' }}>
            {[
              { label: 'On-Time Delivery', color: '#f0a500' },
              { label: 'BOM Accuracy', color: '#22c55e' },
              { label: 'JO Completion', color: '#3b82f6' },
              { label: 'Purchasing', color: '#a855f7' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 16, height: 2, background: l.color }} />
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Nav */}
        <div>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 12 }}>
            QUICK NAVIGATION
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
            {[
              { page: 'bom' as Page, no: '02', title: 'BOM Master', desc: 'Multi-level bill of materials' },
              { page: 'action-plan' as Page, no: '03', title: 'Action Plan', desc: 'Material actions & tracking' },
              { page: 'gap' as Page, no: '04', title: 'Gap Analysis', desc: 'Stock vs requirement' },
              { page: 'assembly' as Page, no: '05', title: 'Assembly Control', desc: 'Work instructions & steps' },
              { page: 'kpis' as Page, no: '06', title: 'KPI Dashboard', desc: 'Performance metrics' },
            ].map(item => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border-accent)'
                  el.style.background = 'var(--bg-elevated)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border)'
                  el.style.background = 'var(--bg-surface)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--accent)', marginBottom: 6 }}>{item.no}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
