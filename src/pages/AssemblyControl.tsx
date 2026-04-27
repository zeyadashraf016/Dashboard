import React, { useState } from 'react'
import { assemblySteps } from '../data/bomData'
import { PageHeader, Table, Tr, Td, StatusBadge } from '../components/ui'

export default function AssemblyControl() {
  const [selectedSheet, setSelectedSheet] = useState(0)

  const step = assemblySteps[selectedSheet]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className="animate-in">
      <PageHeader
        title="Assembly Control"
        subtitle="OBM LoBÂ · ARIA LR 340 · X Axis 340 Sub Assembly · 0005 MAFI"
        badge="6 SHEETS"
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sheet Selector */}
        <div style={{
          width: 200,
          borderRight: '1px solid var(--border)',
          background: 'var(--bg-surface)',
          overflowY: 'auto',
          flexShrink: 0,
        }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            ASSEMBLY SHEETS
          </div>
          {assemblySteps.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedSheet(i)}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                background: selectedSheet === i ? 'var(--accent-bg)' : 'transparent',
                border: 'none',
                borderLeft: selectedSheet === i ? '2px solid var(--accent)' : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (selectedSheet !== i) (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'
              }}
              onMouseLeave={e => {
                if (selectedSheet !== i) (e.currentTarget as HTMLElement).style.background = 'transparent'
              }}
            >
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: selectedSheet === i ? 'var(--accent)' : 'var(--text-muted)', marginBottom: 4 }}>
                SHEET {s.sheet} OF {assemblySteps.length}
              </div>
              <div style={{ fontSize: 12, color: selectedSheet === i ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: selectedSheet === i ? 500 : 400, lineHeight: 1.3 }}>
                {s.title}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>
                Est. {s.estimatedHours}h
              </div>
            </button>
          ))}
        </div>

        {/* Sheet Detail */}
        <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>

            {/* Sheet Header */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 24,
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 6 }}>
                    SHEET {step.sheet} OF {assemblySteps.length} · SCALE 1:12.5
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{step.title}</h2>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 600 }}>{step.description}</p>
                </div>
                <div style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '12px 16px',
                  textAlign: 'right',
                  flexShrink: 0,
                }}>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4 }}>ESTIMATED</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{step.estimatedHours}h</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4 }}>REQUIRED TOOLS</div>
                  {step.tools.map(t => (
                    <div key={t} style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>· {t}</div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4 }}>TORQUE STANDARD</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{step.torqueStandard}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4 }}>AUTHORIZATION</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Issued: {step.issuedBy}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Approved: {step.approvedBy}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{step.date}</div>
                </div>
              </div>
            </div>

            {/* Signature Block */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 20,
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 16 }}>
                PRODUCTION CONTROL SIGN-OFF
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                  { dept: 'Design Dep.', role: 'Issued By' },
                  { dept: 'Production Dep.', role: 'Assembled By' },
                  { dept: 'Production Dep.', role: 'Supervision By' },
                  { dept: 'Quality Dep.', role: 'Inspected By' },
                ].map(({ dept, role }) => (
                  <div key={role} style={{ border: '1px solid var(--border)', borderRadius: 4, padding: '10px 12px' }}>
                    <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 4 }}>{dept}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8 }}>{role}</div>
                    <div style={{ height: 24, borderBottom: '1px solid var(--border-accent)', marginBottom: 6 }} />
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Date: ___________</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parts Table */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              overflow: 'hidden',
            }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  ITEM LIST
                </div>
              </div>
              <Table headers={['ITEM NO.', 'DESCRIPTION', 'PART NO.', 'RM CODE', 'QTY.']}>
                {step.items.map(item => (
                  <Tr key={item.no}>
                    <Td mono compact>{item.no}</Td>
                    <Td compact><span style={{ color: 'var(--text-primary)' }}>{item.description}</span></Td>
                    <Td mono muted compact>{item.partNo}</Td>
                    <Td mono muted compact>{item.rmCode}</Td>
                    <Td mono compact>{item.qty}</Td>
                  </Tr>
                ))}
              </Table>
            </div>

            {/* Legal notice */}
            <div style={{ marginTop: 16, padding: '10px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 4 }}>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                The information contained herein is the property of ARIA Technologies & cannot be copied, used or disclosed in whole or in part to any third party except with the written approval of ARIA Technologies or if it is authorised under a contract.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
