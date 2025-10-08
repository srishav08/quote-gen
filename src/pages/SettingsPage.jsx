// File: src/pages/SettingsPage.jsx
import React from 'react'
import { useQuote } from '../state/QuoteContext'
import { SHEET_ID } from '../config/constants'

export default function SettingsPage(){
  const q = useQuote()
  return (
    <div className="card">
      <div className="body">
        <h3>App Settings</h3>
        <p className="muted">
          All per-sq-ft rates and item prices are sourced from a single Google Sheet (hidden in UI).
        </p>
        <div className="muted" style={{marginTop:8}}>
          Sheet ID: <code>{SHEET_ID}</code>
        </div>
        <div style={{marginTop:12}}>
          <div className="muted">Company (read-only):</div>
          <div style={{fontSize:14, marginTop:6}}>
            <b>{q.company.name}</b> — {q.company.address}<br/>
            GST: {q.company.gst || '—'}<br/>
            {q.company.email} • {q.company.website} • {q.company.instagram}
          </div>
        </div>
      </div>
    </div>
  )
}
