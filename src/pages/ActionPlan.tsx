import React, { useState } from 'react'
import { actionPlanData } from '../data/bomData'
import { PageHeader, Table, Tr, Td, StatusBadge, Tabs, SearchInput } from '../components/ui'

const axes = ['All', 'X Axis', 'Y Axis', 'Z Axis']
const statuses = ['All', 'Done', 'In Progress', 'Pending']

export default function ActionPlan() {
  const [axisFilter, setAxisFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = actionPlanData.filter(a => {
    const matchAxis = axisFilter === 'All' || a.axis === axisFilter
    const matchStatus = statusFilter === 'All' || a.status === statusFilter
    const q = search.toLowerCase()
    const matchSearch = !q || a.partName.toLowerCase().includes(q) || a.erpCode.toLowerCase().includes(q) || a.action.toLowerCase().includes(q)
    return matchAxis && matchStatus && matchSearch
  })

  const done = actionPlanData.filter(a => a.status === 'Done').length
  const inProgress = actionPlanData.filter(a => a.status === 'In Progress').length
  const pending = actionPlanData.filter(a => a.status === 'Pending').length

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="animate-in">
      <PageHeader
        title="Material Action Plan"
        subtitle="Finished Product: ARIA-LR-340-V1-R1 · Prepared by Ahmed Ramadan · Approved by Eng. Mostafa Nayel"
        badge="ACTIVE"
      >
        <SearchInput value={search} onChange={setSearch} placeholder="Search actions…" />
      </PageHeader>

      {/* Summary */}
      <div style={{
        padding: '12px 32px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        display: 'flex',
        gap: 24,
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'Done', val: done, color: 'var(--green)' },
            { label: 'In Progress', val: inProgress, color: 'var(--blue)' },
            { label: 'Pending', val: pending, color: 'var(--yellow)' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.val} {s.label}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 4, flex: 1, background: 'var(--bg-elevated)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(done / actionPlanData.length) * 100}%`,
            background: 'var(--green)',
            borderRadius: 2,
            transition: 'width 0.6s ease',
          }} />
        </div>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
          {Math.round((done / actionPlanData.length) * 100)}% complete
        </span>
      </div>

      {/* Filters */}
      <div style={{
        padding: '10px 32px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        background: 'var(--bg-surface)',
      }}>
        <div>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginRight: 8 }}>AXIS</span>
          <Tabs tabs={axes} active={axisFilter} onChange={setAxisFilter} />
        </div>
        <div>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginRight: 8 }}>STATUS</span>
          <Tabs tabs={statuses} active={statusFilter} onChange={setStatusFilter} />
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          {filtered.length} actions
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <Table headers={['#', 'AXIS', 'ITEM', 'ERP CODE', 'PART NAME', 'PART NO.', 'CATEGORY', 'MATERIAL', 'QTY', 'EXECUTION TYPE', 'ACTION', 'REF NO.', 'STATUS', 'RESPONSIBLE']}>
          {filtered.map((a, i) => (
            <Tr key={a.id}>
              <Td mono muted compact>{a.id}</Td>
              <Td compact>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{a.axis}</span>
              </Td>
              <Td mono muted compact>{a.itemNo}</Td>
              <Td mono compact>{a.erpCode}</Td>
              <Td compact>
                <span style={{ color: 'var(--text-primary)' }}>{a.partName}</span>
              </Td>
              <Td mono muted compact>{a.partNo}</Td>
              <Td muted compact>{a.category}</Td>
              <Td muted compact>{a.material}</Td>
              <Td mono compact>{a.qty}</Td>
              <Td muted compact>{a.executionType}</Td>
              <Td compact>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{a.action}</span>
              </Td>
              <Td mono muted compact>{a.refNo || '—'}</Td>
              <Td compact><StatusBadge status={a.status} /></Td>
              <Td muted compact>{a.responsible}</Td>
            </Tr>
          ))}
        </Table>
      </div>
    </div>
  )
}
