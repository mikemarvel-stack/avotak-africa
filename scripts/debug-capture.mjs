import fs from 'fs'
import path from 'path'
import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:3005'
if (!/^https?:\/\//.test(url)) {
  console.error('Invalid URL format')
  process.exit(1)
}
console.log('Testing URL:', url)

async function capture() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const logs = []

  page.on('console', msg => {
    const loc = msg.location ? msg.location() : undefined
    const entry = { type: 'console', level: msg.type(), text: msg.text(), location: loc }
    logs.push(entry)
    console.log('PAGE CONSOLE:', entry.level, entry.text)
  })

  page.on('pageerror', err => {
    logs.push({ type: 'pageerror', error: String(err), stack: err.stack })
    console.error('PAGE ERROR:', err)
  })

  page.on('request', req => {
    console.log('Request:', req.resourceType(), req.url())
    if (req.url().includes('main.jsx') || req.url().includes('src/') || req.url().includes('components/')) {
      logs.push({ type: 'app-request', url: req.url() })
    }
  })

  page.on('requestfailed', req => {
    const f = req.failure ? req.failure() : null
    logs.push({ type: 'requestfailed', url: req.url(), error: f ? f.errorText : null })
    console.error('REQUEST FAILED:', req.url(), f ? f.errorText : '')
  })

  try {
    await page.goto(url, { waitUntil: 'networkidle' })
    
    await page.waitForFunction(() => {
      return document.getElementById('root').children.length > 0
    }, { timeout: 5000 }).catch(() => {
      console.log('No content rendered in #root after 5s')
      logs.push({ type: 'render-timeout', message: 'No content in #root after 5s' })
    })

    const content = await page.content()
    const data = {
      url,
      timestamp: new Date().toISOString(),
      logs,
      contentSnippet: content.slice(0, 2000)
    }

    const outputPath = path.join(process.cwd(), 'debug-capture.json')
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
    console.log('Saved capture to', outputPath)
  } catch (err) {
    console.error('Capture failed:', err)
  }

  await browser.close()
}

capture().catch(console.error)