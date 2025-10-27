import fs from 'fs'
import { chromium } from 'playwright'

// Helper to find Vite's port from dev server output
const findVitePort = () => new Promise((resolve) => {
  const net = require('net')
  const tryPort = (port) => {
    const server = net.createServer()
    server.once('error', () => {
      // Port in use, try next
      tryPort(port + 1)
    })
    server.once('listening', () => {
      server.close(() => resolve(port))
    })
    server.listen(port)
  }
  tryPort(3000)
})

const port = await findVitePort()
const url = process.argv[2] || `http://localhost:${port}`
console.log('Testing URL:', url)

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const logs = []

  page.on('console', msg => {
    try {
      const loc = msg.location ? msg.location() : undefined
      const entry = { type: 'console', level: msg.type(), text: msg.text(), location: loc }
      logs.push(entry)
      console.log('PAGE CONSOLE:', entry.level, entry.text)
    } catch (e) {
      console.log('PAGE CONSOLE (error reading):', msg.text())
    }
  })

  page.on('pageerror', err => {
    logs.push({ type: 'pageerror', error: String(err), stack: err.stack })
    console.error('PAGE ERROR:', err)
  })

  page.on('requestfailed', req => {
    const f = req.failure ? req.failure() : null
    logs.push({ type: 'requestfailed', url: req.url(), error: f ? f.errorText : null })
    console.error('REQUEST FAILED:', req.url())
  })

  page.on('request', req => {
    console.log('Request:', req.resourceType(), req.url())
    logs.push({ type: 'request', resourceType: req.resourceType(), url: req.url() })
    
    if (req.url().includes('main.jsx') || req.url().includes('index.html')) {
      console.log('Found entry point request:', req.url())
      logs.push({ type: 'entry-point', url: req.url() })
    }
  })

  // Add error listener to catch script load failures
  await page.addScriptTag({
    content: `
      window.addEventListener('error', function(e) {
        console.error('Script error:', e.message, 'at', e.filename, ':', e.lineno);
      });
    `
  })

  try {
    await page.goto(url, { waitUntil: 'networkidle' })
    // Wait for React to try mounting
    await page.waitForFunction(() => {
      return document.getElementById('root').children.length > 0 || 
             window.__REACT_ERROR__ || 
             document.querySelector('[data-error]');
    }, { timeout: 5000 }).catch(() => {
      console.log('No content rendered in #root after 5s')
    });
  } catch (err) {
    console.error('Goto error:', err)
    logs.push({ type: 'navigation-error', error: String(err) })
  }

  // give scripts a moment to run
  // Wait longer to ensure React loads and any errors surface
  await page.waitForTimeout(3000)
  console.log('PAGE CONTENT:', await page.content())

  const content = await page.content()
  const out = { url, timestamp: new Date().toISOString(), logs, contentSnippet: content.slice(0, 2000) }
  fs.writeFileSync('playwright-capture.json', JSON.stringify(out, null, 2))
  console.log('Saved capture to playwright-capture.json')

  await browser.close()
})()
