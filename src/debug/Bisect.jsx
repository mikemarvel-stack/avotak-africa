import React, { useEffect, useState } from 'react'
import ErrorBoundary from './ErrorBoundary'

// Validated module paths for testing
const ALLOWED_MODULES = {
  'Navbar': () => import('../components/Navbar.jsx'),
  'StickySocials': () => import('../components/StickySocials.jsx'),
  'BackToTop': () => import('../components/BackToTop.jsx'),
  'TawkChat': () => import('../components/TawkChat.jsx'),
  'Footer': () => import('../components/Footer.jsx'),
  'Home (page)': () => import('../pages/Home.jsx'),
  'Produce (page)': () => import('../pages/Produce.jsx'),
  'Projects (page)': () => import('../pages/Projects.jsx'),
}

const TESTS = Object.keys(ALLOWED_MODULES).map(name => ({ name }))

export default function Bisect() {
  const [results, setResults] = useState([])
  const [imported, setImported] = useState([])
  const [phase, setPhase] = useState('importing')

  useEffect(() => {
    let cancelled = false

    async function runImports() {
      for (const t of TESTS) {
        setResults((r) => [...r, { name: t.name, status: 'importing' }])
        try {
          const importFn = ALLOWED_MODULES[t.name]
          if (!importFn) throw new Error('Module not allowed')
          const mod = await importFn()
          if (cancelled) return
          setResults((r) => r.map(x => x.name === t.name ? { ...x, status: 'imported' } : x))
          setImported((r) => [...r, { name: t.name, Comp: mod.default }])
          console.log(`Bisect: imported ${t.name}`)
        } catch (err) {
          console.error(`Bisect: import failed for ${t.name}:`, err)
          setResults((r) => r.map(x => x.name === t.name ? { ...x, status: 'import-error', error: String(err) } : x))
        }
      }
      setPhase('render')
    }

    runImports()

    return () => { cancelled = true }
  }, [])

  const handleRenderError = (name) => (err) => {
    console.error(`Bisect: render error in ${name}:`, err)
    setResults((r) => r.map(x => x.name === name ? { ...x, status: 'render-error', error: String(err) } : x))
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Automated bisection — import + render test</h2>
      <p>Phase: <strong>{phase}</strong></p>

      <h3>Results</h3>
      <ul>
        {results.map((r, index) => (
          <li key={`${r.name}-${index}`}>
            {r.name}: <strong>{r.status}</strong>
            {r.error ? <div style={{ color: 'crimson' }}>{r.error}</div> : null}
          </li>
        ))}
      </ul>

      {phase === 'render' && (
        <div style={{ marginTop: 18 }}>
          <h3>Rendering imported components (wrapped in ErrorBoundary)</h3>
          {imported.map(({ name, Comp }) => (
            <div key={name} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
              <strong>{name}</strong>
              <ErrorBoundary onError={handleRenderError(name)} fallback={<div style={{ color: 'crimson' }}>Render failed for {name}</div>}>
                <div style={{ padding: 6, background: '#fafafa' }}>
                  {/* Try rendering; some components expect props or router context — that's ok, we just want to catch exceptions */}
                  <Comp />
                </div>
              </ErrorBoundary>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
