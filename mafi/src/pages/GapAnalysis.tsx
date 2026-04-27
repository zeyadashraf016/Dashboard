import React, { useState } from 'react'
import { bomData } from '../data/bomData'
import { PageHeader, Table, Tr, Td, StatusBadge, SearchInput } from '../components/ui'

export default function GapAnalysis() {
  const [joQty, setJoQty] = useState(1)
  const [search, setSearch] = useState('')

  // Calculate gap analysis from BOM data
  const gapItems = bomData
    .filter(b => b.level.split('.').length >= 2) // sub-components only
    .filter(b => {
      const q = search.toLowerCase()
      return !q || b.description.toLowerCase().includes(q) || b.erpCode.toLowerCase().includes(q)
    })
    .map(b => {
      const required = b.quantity * joQty
      // Simulate stock on hand based on status
      const stockOnHand = b.status === 'Available' || b.status === 'Active'
        ? Math.round(required * (0.8 + Math.random() * 0.4))
        : 0
      const openPO = b.status === 'On Order' ? required : 0
      const gap = Math.max(0, required - stockOnHand - openPO)
      const coverage = required > 0 ? Math.min(1, (stockOnHand + openPO) / required) : 1

      let status: string
      if (required === 0) status = 'N/A'
      else if (gap === 0 && openPO === 0 && stockOnHand >= required) status = 'Available'
      else if (gap === 0 && openPO > 0) status = 'On Order'
      else if (gap > 0 && openPO > 0) status = 'SHORTAGE'
      else if (gap > 0) status = 'SHORTAGE'
      else status = 'Available'

      return { ...b, required, stockOnHand, openPO, gap, coverage, gapStatus: status }
    })

  const shortages = gapItems.filter(g => g.gapStatus === 'SHORTAGE').length
  const onOrderCount = gapItems.filter(g => g.gapStatus === 'On Order').length
  const availableCount = gapItems.filter(g => g.gapStatus === 'Available').length

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="animate-in">
      <PageHeader
        title="Material Gap Analysis"
        subtitle="BOM Requirement vs Stock on Hand vs Open POs — Auto-calculates Net Gap & Status"
        badge="LIVE"
      >
        <SearchInput value={search} onChange={setSearch} placeholder="Search parts…" />
      </PageHeader>

      {/* Controls */}
      <div style={{
        padding: '12px 32px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        display: 'flex',
        gap: 24,
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>JO QTY (units)</span>
          <input
            type="number"
            min={1}
            max={99}
            value={joQty}
            onChange={e => setJoQty(Math.max(1, parseInt(e.target.value) || 1))}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '5px 10px',
              color: 'var(--accent)',
              fontSize: 14,
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              width: 70,
              textAlign: 'center',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 20, marginLeft: 16 }}>
          {[
            { label: '🟢 Available', val: availableCount },
            { label: '🟡 On Order', val: onOrderCount },
            { label: '🔴 Shortage', val: shortages },
          ].map(s => (
            <div key={s.label} style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              {s.label}: <strong style={{ color: 'var(--text-primary)' }}>{s.val}</strong>
            </div>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          {gapItems.length} line items
        </div>
      </div>

      {/* Legend */}
      <div style={{ padding: '8px 32px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', display: 'flex', gap: 24 }}>
        {[
          { label: 'AVAILABLE — Stock on hand covers requirement', color: 'var(--green)' },
          { label: 'ON ORDER — PO open, gap covered', color: 'var(--yellow)' },
          { label: 'SHORTAGE — Gap exists, action required', color: 'var(--red)' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{l.label}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <Table headers={['LINE', 'ERP CODE', 'DESCRIPTION', 'AXIS', 'BOM QTY/UNIT', 'TOTAL REQUIRED', 'STOCK ON HAND', 'OPEN PO QTY', 'NET GAP', 'COVERAGE %', 'STATUS']}>
          {gapItems.map((item, i) => {
            const coveragePct = Math.round(item.coverage * 100)
            const coverageColor = coveragePct >= 100 ? 'var(--green)' : coveragePct >= 50 ? 'var(--yellow)' : 'var(--red)'
            return (
              <Tr key={`${item.erpCode}-${i}`} dim={item.gapStatus === 'N/A'}>
                <Td mono muted compact>{i + 1}</Td>
                <Td mono compact>{item.erpCode}</Td>
                <Td compact>
                  <span style={{
                    color: item.gapStatus === 'SHORTAGE' ? 'var(--red)' : 'var(--text-primary)',
                    fontWeight: item.gapStatus === 'SHORTAGE' ? 500 : 400,
                  }}>
                    {item.description}
                  </span>
                </Td>
                <Td compact>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{item.axis}</span>
                </Td>
                <Td mono compact>{item.quantity} {item.uom}</Td>
                <Td mono compact>{item.required}</Td>
                <Td mono compact>
                  <span style={{ color: item.stockOnHand >= item.required ? 'var(--green)' : 'var(--text-secondary)' }}>
                    {item.stockOnHand}
                  </span>
                </Td>
                <Td mono compact>
                  <span style={{ color: item.openPO > 0 ? 'var(--yellow)' : 'var(--text-muted)' }}>
                    {item.openPO}
                  </span>
                </Td>
                <Td mono compact>
                  <span style={{ color: item.gap > 0 ? 'var(--red)' : 'var(--green)', fontWeight: item.gap > 0 ? 600 : 400 }}>
                    {item.gap > 0 ? `-${item.gap}` : '0'}
                  </span>
                </Td>
                <Td compact>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ background: 'var(--bg-elevated)', borderRadius: 2, height: 4, width: 60, overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(100, coveragePct)}%`, height: '100%', background: coverageColor, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: coverageColor }}>{coveragePct}%</span>
                  </div>
                </Td>
                <Td compact>
                  <StatusBadge status={item.gapStatus === 'N/A' ? 'Pending' : item.gapStatus} />
                </Td>
              </Tr>
            )
          })}
        </Table>
      </div>
    </div>
  )
}
