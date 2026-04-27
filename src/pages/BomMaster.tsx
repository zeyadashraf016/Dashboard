import React, { useState } from 'react'
import { bomData } from '../data/bomData'
import { PageHeader, Table, Tr, Td, StatusBadge, Tabs, SearchInput } from '../components/ui'

const axes = ['All', 'X Axis', 'Y Axis', 'Z Axis', 'Fixation']
const categories = ['All', 'Raw Material', 'Manufacturing Part', 'Standard FG', 'Standard Fastener', 'Semi Finished', 'Finished Good']

export default function BomMaster() {
  const [axisFilter, setAxisFilter] = useState('All')
  const [catFilter, setCatFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = bomData.filter(b => {
    const matchAxis = axisFilter === 'All' || b.axis === axisFilter
    const matchCat = catFilter === 'All' || b.category === catFilter
    const q = search.toLowerCase()
    const matchSearch = !q || b.description.toLowerCase().includes(q) || b.erpCode.toLowerCase().includes(q) || b.partNo.toLowerCase().includes(q)
    return matchAxis && matchCat && matchSearch
  })

  const selectedItem = selected ? bomData.find(b => b.erpCode === selected) : null

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="animate-in">
      <PageHeader
        title="BOM Master"
        subtitle="OBM-BOM-LR340 · Multi-Level, Revision-Controlled"
        badge="REV 01"
      >
        <SearchInput value={search} onChange={setSearch} placeholder="Search parts…" />
      </PageHeader>

      {/* Filters */}
      <div style={{
        padding: '12px 32px',
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
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginRight: 8 }}>CATEGORY</span>
          <select
            value={catFilter}
            onChange={e => setCatFilter(e.target.value)}
            style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', padding: '5px 10px', borderRadius: 4,
              fontSize: 12, fontFamily: 'var(--font-mono)', cursor: 'pointer',
            }}
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          {filtered.length} / {bomData.length} items
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Table headers={['LEVEL', 'ERP CODE', 'DESCRIPTION', 'PART NO.', 'CATEGORY', 'MATERIAL', 'QTY', 'UOM', 'MAKE/BUY', 'SUPPLIER', 'LEAD', 'STATUS']}>
            {filtered.map(item => (
              <Tr
                key={`${item.level}-${item.erpCode}`}
                onClick={() => setSelected(selected === item.erpCode ? null : item.erpCode)}
                selected={selected === item.erpCode}
              >
                <Td mono muted compact>
                  <div style={{ paddingLeft: `${(item.level.split('.').length - 1) * 12}px` }}>
                    {item.level}
                  </div>
                </Td>
                <Td mono compact>{item.erpCode}</Td>
                <Td compact>
                  <span style={{ color: 'var(--text-primary)', fontWeight: item.level.split('.').length <= 1 ? 600 : 400 }}>
                    {item.description}
                  </span>
                </Td>
                <Td mono muted compact>{item.partNo}</Td>
                <Td muted compact>{item.category}</Td>
                <Td muted compact>{item.material}</Td>
                <Td mono compact>{item.quantity}</Td>
                <Td mono muted compact>{item.uom}</Td>
                <Td compact>
                  <span style={{ color: item.makeBuy === 'Make' ? 'var(--blue)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                    {item.makeBuy}
                  </span>
                </Td>
                <Td muted compact>{item.preferredSupplier}</Td>
                <Td mono muted compact>{item.leadTimeDays}d</Td>
                <Td compact><StatusBadge status={item.status} /></Td>
              </Tr>
            ))}
          </Table>
        </div>

        {/* Detail Panel */}
        {selectedItem && (
          <div style={{
            width: 280,
            borderLeft: '1px solid var(--border)',
            background: 'var(--bg-surface)',
            padding: 20,
            overflowY: 'auto',
            flexShrink: 0,
          }}>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 12 }}>
              PART DETAIL
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.3 }}>
                {selectedItem.description}
              </div>
              <StatusBadge status={selectedItem.status} />
            </div>
            {[
              { label: 'ERP Code', value: selectedItem.erpCode },
              { label: 'Part Number', value: selectedItem.partNo },
              { label: 'BOM Level', value: selectedItem.level },
              { label: 'Category', value: selectedItem.category },
              { label: 'Material', value: selectedItem.material },
              { label: 'Quantity', value: `${selectedItem.quantity} ${selectedItem.uom}` },
              { label: 'Make / Buy', value: selectedItem.makeBuy },
              { label: 'Supplier', value: selectedItem.preferredSupplier },
              { label: 'Lead Time', value: `${selectedItem.leadTimeDays} days` },
              { label: 'Axis', value: selectedItem.axis },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', textAlign: 'right', maxWidth: 140 }}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
