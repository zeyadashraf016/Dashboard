import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import BomMaster from './pages/BomMaster'
import ActionPlan from './pages/ActionPlan'
import AssemblyControl from './pages/AssemblyControl'
import KPIs from './pages/KPIs'
import GapAnalysis from './pages/GapAnalysis'

export type Page = 'dashboard' | 'bom' | 'action-plan' | 'assembly' | 'kpis' | 'gap'

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={setPage} />
      case 'bom': return <BomMaster />
      case 'action-plan': return <ActionPlan />
      case 'assembly': return <AssemblyControl />
      case 'kpis': return <KPIs />
      case 'gap': return <GapAnalysis />
      default: return <Dashboard onNavigate={setPage} />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-base)' }}>
      <Sidebar currentPage={page} onNavigate={setPage} />
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>
    </div>
  )
}
