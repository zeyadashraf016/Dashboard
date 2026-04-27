import React from 'react'

// ─── Page Shell ───────────────────────────────────────────────────────────────
interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  children?: React.ReactNode
}

export function PageHeader({ title, subtitle, badge, children }: PageHeaderProps) {
  return (
    <div style={{
      padding: '28px 32px 20px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            {title}
          </h1>
          {badge && (
            <span style={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              background: 'var(--accent-bg)',
              color: 'var(--accent)',
              border: '1px solid rgba(240,165,0,0.25)',
              padding: '2px 7px',
              borderRadius: 3,
              letterSpacing: '0.05em',
            }}>{badge}</span>
          )}
        </div>
        {subtitle && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
  color?: string
}

export function StatCard({ label, value, sub, accent, color }: StatCardProps) {
  return (
    <div style={{
      background: accent ? 'var(--accent-bg)' : 'var(--bg-surface)',
      border: `1px solid ${accent ? 'rgba(240,165,0,0.25)' : 'var(--border)'}`,
      borderRadius: 6,
      padding: '16px 20px',
    }}>
      <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: color || (accent ? 'var(--accent)' : 'var(--text-primary)'), fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
interface StatusBadgeProps {
  status: string
}

const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
  'Done':        { bg: 'rgba(34,197,94,0.1)',  color: '#22c55e', label: 'Done' },
  'Active':      { bg: 'rgba(34,197,94,0.1)',  color: '#22c55e', label: 'Active' },
  'Available':   { bg: 'rgba(34,197,94,0.1)',  color: '#22c55e', label: 'Available' },
  'In Progress': { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', label: 'In Progress' },
  'On Order':    { bg: 'rgba(234,179,8,0.1)',  color: '#eab308', label: 'On Order' },
  'Pending':     { bg: 'rgba(234,179,8,0.1)',  color: '#eab308', label: 'Pending' },
  'SHORTAGE':    { bg: 'rgba(239,68,68,0.1)',  color: '#ef4444', label: 'Shortage' },
  'default':     { bg: 'rgba(136,136,136,0.1)', color: '#888', label: '' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = statusConfig[status] || { ...statusConfig.default, label: status }
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '2px 8px',
      borderRadius: 3,
      background: cfg.bg,
      color: cfg.color,
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      letterSpacing: '0.03em',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color, display: 'inline-block' }} />
      {cfg.label || status}
    </span>
  )
}

// ─── Table ────────────────────────────────────────────────────────────────────
interface TableProps {
  headers: string[]
  children: React.ReactNode
  compact?: boolean
}

export function Table({ headers, children, compact }: TableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: compact ? 12 : 13 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: compact ? '8px 12px' : '10px 14px',
                textAlign: 'left',
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                letterSpacing: '0.07em',
                borderBottom: '1px solid var(--border)',
                whiteSpace: 'nowrap',
                background: 'var(--bg-surface)',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

interface TrProps {
  children: React.ReactNode
  onClick?: () => void
  selected?: boolean
  dim?: boolean
}

export function Tr({ children, onClick, selected, dim }: TrProps) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <tr
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? 'var(--accent-bg)' : hovered ? 'var(--bg-hover)' : 'transparent',
        cursor: onClick ? 'pointer' : 'default',
        opacity: dim ? 0.5 : 1,
        transition: 'background 0.1s',
      }}
    >
      {children}
    </tr>
  )
}

interface TdProps {
  children: React.ReactNode
  mono?: boolean
  muted?: boolean
  center?: boolean
  compact?: boolean
}

export function Td({ children, mono, muted, center, compact }: TdProps) {
  return (
    <td style={{
      padding: compact ? '7px 12px' : '9px 14px',
      borderBottom: '1px solid var(--border)',
      color: muted ? 'var(--text-muted)' : 'var(--text-secondary)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: mono ? 11 : 13,
      textAlign: center ? 'center' : 'left',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </td>
  )
}

// ─── Pill Tabs ─────────────────────────────────────────────────────────────────
interface TabsProps {
  tabs: string[]
  active: string
  onChange: (tab: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div style={{ display: 'flex', gap: 2, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 3 }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: '5px 14px',
            borderRadius: 4,
            border: 'none',
            background: active === tab ? 'var(--bg-elevated)' : 'transparent',
            color: active === tab ? 'var(--text-primary)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: active === tab ? 500 : 400,
            transition: 'all 0.15s',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

// ─── Search Input ──────────────────────────────────────────────────────────────
interface SearchInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 12 }}>⌕</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Search…'}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 5,
          padding: '7px 12px 7px 28px',
          color: 'var(--text-primary)',
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          width: 220,
          outline: 'none',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--border-accent)')}
        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
      />
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number
  max?: number
  color?: string
}

export function ProgressBar({ value, max = 100, color }: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100)
  const c = color || (pct >= 90 ? 'var(--green)' : pct >= 75 ? 'var(--accent)' : 'var(--red)')
  return (
    <div style={{ background: 'var(--bg-elevated)', borderRadius: 2, height: 4, overflow: 'hidden', minWidth: 80 }}>
      <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: 2, transition: 'width 0.6s ease' }} />
    </div>
  )
}

// ─── Section Label ─────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 9,
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-muted)',
      letterSpacing: '0.12em',
      padding: '12px 32px 8px',
      borderBottom: '1px solid var(--border)',
    }}>
      {children}
    </div>
  )
}
