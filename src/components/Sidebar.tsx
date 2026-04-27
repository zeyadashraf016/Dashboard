import React from 'react'
import type { Page } from '../App'

interface NavItem {
  id: Page
  label: string
  icon: string
  shortcode: string
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬛', shortcode: '01' },
  { id: 'bom', label: 'BOM Master', icon: '⬛', shortcode: '02' },
  { id: 'action-plan', label: 'Action Plan', icon: '⬛', shortcode: '03' },
  { id: 'gap', label: 'Gap Analysis', icon: '⬛', shortcode: '04' },
  { id: 'assembly', label: 'Assembly Control', icon: '⬛', shortcode: '05' },
  { id: 'kpis', label: 'KPI Dashboard', icon: '⬛', shortcode: '06' },
]

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside style={{
      width: 220,
      minWidth: 220,
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 20px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '-1px',
          }}>MAFI</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>v1.0</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)', marginTop: 4, letterSpacing: '0.05em' }}>
          ARIA LR340 · P&G
        </div>
        <div style={{
          marginTop: 10,
          padding: '6px 8px',
          background: 'rgba(240,165,0,0.08)',
          border: '1px solid rgba(240,165,0,0.2)',
          borderRadius: 4,
        }}>
          <div style={{ fontSize: 9, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>SERIAL: 0005</div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>S/O: S00060</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        <div style={{ padding: '0 12px 8px', fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          NAVIGATION
        </div>
        {navItems.map(item => {
          const active = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '9px 16px',
                background: active ? 'var(--accent-bg)' : 'transparent',
                border: 'none',
                borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'
              }}
              onMouseLeave={e => {
                if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: active ? 'var(--accent)' : 'var(--text-muted)', width: 20 }}>
                {item.shortcode}
              </span>
              <span style={{ fontSize: 13, color: active ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: active ? 500 : 400 }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Bottom Info */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
          <div>ARIA TECHNOLOGIES</div>
          <div>Industrial Zone — Plot 813</div>
          <div>Cairo, Egypt</div>
          <div style={{ marginTop: 6, color: 'var(--text-muted)' }}>OBM LoBÂ · ARIA LR 340</div>
        </div>
      </div>
    </aside>
  )
}
