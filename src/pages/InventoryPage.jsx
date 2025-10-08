// File: src/pages/InventoryPage.jsx
import React, { useRef } from 'react'
import { useQuote } from '../state/QuoteContext'
import { useInventoryLoaders } from '../hooks/useInventory'

export default function InventoryPage(){
  const q = useQuote()
  const { onInventoryUrl, onInventoryXlsx, onRatesFromXlsx } =
    useInventoryLoaders({
      setHardwareItems: q.setHardwareItems,
      setAccessoryItems: q.setAccessoryItems,
      setRates: q.setRates,
      setTransportValue: q.setTransportValue
    })

  const hwUrl = useRef(null)
  const acUrl = useRef(null)

  return (
    <div className="row" style={{gridTemplateColumns:'1fr'}}>
      <div className="card"><div className="body">
        <h3>Load Inventory (Optional)</h3>
        <p className="muted">App already loads from your Google Sheet. You can also override via CSV/XLSX.</p>

        <div className="grid g3" style={{marginTop:8}}>
          <div><label>Hardware CSV URL</label><input ref={hwUrl} placeholder="https://..."/></div>
          <div className="nowrap"><label>&nbsp;</label><button className="btn" onClick={()=> hwUrl.current.value && onInventoryUrl(hwUrl.current.value, 'hardware')}>Load Hardware</button></div>
        </div>
        <div className="grid g3" style={{marginTop:8}}>
          <div><label>Accessories CSV URL</label><input ref={acUrl} placeholder="https://..."/></div>
          <div className="nowrap"><label>&nbsp;</label><button className="btn" onClick={()=> acUrl.current.value && onInventoryUrl(acUrl.current.value, 'accessories')}>Load Accessories</button></div>
        </div>
      </div></div>

      <div className="card"><div className="body">
        <h3>Upload Excel (.xlsx)</h3>
        <p className="muted">Expected sheets: <b>Hardware</b>, <b>Accessories</b> (Name, Price). Optional <b>Rates</b> (Key, Value).</p>
        <div className="grid g3">
          <div>
            <label>Inventory .xlsx</label>
            <input type="file" accept=".xlsx" onChange={e=> e.target.files?.[0] && onInventoryXlsx(e.target.files[0]) }/>
          </div>
          <div>
            <label>Rates .xlsx</label>
            <input type="file" accept=".xlsx" onChange={e=> e.target.files?.[0] && onRatesFromXlsx(e.target.files[0]) }/>
          </div>
        </div>
      </div></div>

      <div className="card"><div className="body">
        <h3>Loaded Items</h3>
        <div className="grid g2">
          <div>
            <div className="pill" style={{marginBottom:8}}>Hardware ({q.hardwareItems.length})</div>
            <ul className="muted" style={{maxHeight:220, overflow:'auto'}}>
              {/* prices are intentionally hidden */}
              {q.hardwareItems.map(i => <li key={i.name}>{i.name}</li>)}
            </ul>
          </div>
          <div>
            <div className="pill" style={{marginBottom:8}}>Accessories ({q.accessoryItems.length})</div>
            <ul className="muted" style={{maxHeight:220, overflow:'auto'}}>
              {/* prices are intentionally hidden */}
              {q.accessoryItems.map(i => <li key={i.name}>{i.name}</li>)}
            </ul>
          </div>
        </div>
      </div></div>
    </div>
  )
}
