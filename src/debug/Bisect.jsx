import React, { useEffect, useState } from 'react'
import ErrorBoundary from './ErrorBoundary'

// List of modules to test (relative to this file when using dynamic import)
const TESTS = [
  { name: 'Navbar', path: '../components/Navbar.jsx' },
  { name: 'StickySocials', path: '../components/StickySocials.jsx' },
  { name: 'BackToTop', path: '../components/BackToTop.jsx' },
  { name: 'TawkChat', path: '../components/TawkChat.jsx' },
  { name: 'Footer', path: '../components/Footer.jsx' },
  { name: 'Home (page)', path: '../pages/Home.jsx' },
  { name: 'Produce (page)', path: '../pages/Produce.jsx' },
]

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
          const mod = await import(/* @vite-ignore */ t.path)
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
