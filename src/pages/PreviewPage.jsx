// File: src/pages/PreviewPage.jsx
import React, { useRef, useMemo } from 'react'
import { useQuote } from '../state/QuoteContext'
import { INR } from '../utils/format'
import { exportNodeToPdf } from '../utils/pdf'

export default function PreviewPage(){
  const q = useQuote()
  const ref = useRef(null)

  const n = (x) => (x === '' || x == null ? 0 : Number(x) || 0)

  // Build printable lines from moduleCost (no lineTotals dependency)
  const { lines, grand } = useMemo(() => {
    const L = []
    const push = (desc, qtyText, rateNum, amtNum) =>
      L.push({ desc, qty: qtyText, rate: INR(rateNum), amt: INR(amtNum), _rawAmt: amtNum })

    const mc = q.moduleCost || {}
    // Core breakup
    if (n(mc.carcus)  > 0) push(`Core (Carcus) – ${q.kitchen?.core || '-'}`, '-', 0, n(mc.carcus))
    if (n(mc.shelves) > 0) push(`Shelves – ${q.kitchen?.core || '-'}`, '-', 0, n(mc.shelves))
    if (n(mc.tandem)  > 0) push(`Tandem Bottoms – ${q.kitchen?.core || '-'}`, '-', 0, n(mc.tandem))
    // Shutter finish
    if (n(mc.shutter) > 0) {
      const label = q.kitchen?.externalLaminate ?? q.kitchen?.externalLam ?? '-'
      push(`Shutter Finish (${label})`, '-', 0, n(mc.shutter))
    }
    // Hardware & Accessories (itemized; totals still come from moduleCost)
    const hwLines = Array.isArray(q.hardwareLines) ? q.hardwareLines : []
    const hwCatalog = q.hardwareCatalog || q.hardwareItems || {}
    for (const r of hwLines){
      const qty = n(r.qty); if (!r.brand && !r.item && !r.item_name) continue
      if (qty <= 0) continue
      // support both schemas: brand+id or simple name+price list
      const item =
        (r.brand && r.item && Array.isArray(hwCatalog?.[r.brand]) && hwCatalog[r.brand].find(x => x.id === r.item)) ||
        (Array.isArray(hwCatalog) && hwCatalog.find(i => i.name === r.item)) ||
        null
      const name = item?.item_name || r.item || r.item_name || 'Hardware Item'
      const rate = n(item?.mrp || item?.price)
      push(`Hardware - ${name}`, `${qty} pcs`, rate, qty * rate)
    }

    const accLines = Array.isArray(q.accessoryLines) ? q.accessoryLines : []
    const accCatalog = q.accessoryCatalog || q.accessoryItems || {}
    for (const r of accLines){
      const qty = n(r.qty); if (!r.brand && !r.item && !r.item_name) continue
      if (qty <= 0) continue
      const item =
        (r.brand && r.item && Array.isArray(accCatalog?.[r.brand]) && accCatalog[r.brand].find(x => x.id === r.item)) ||
        (Array.isArray(accCatalog) && accCatalog.find(i => i.name === r.item)) ||
        null
      const name = item?.item_name || r.item || r.item_name || 'Accessory'
      const rate = n(item?.mrp || item?.price)
      push(`Accessories - ${name}`, `${qty} pcs`, rate, qty * rate)
    }

    // Installation / Transport
    if (n(mc.installation) > 0) push('Installation', '-', 0, n(mc.installation))
    if (n(mc.transport)    > 0) push('Transport & Loading/Unloading', '-', 0, n(mc.transport))

    // Grand total: prefer q.totalCost if present, else sum of lines
    const computedGrand = L.reduce((s, l) => s + n(l._rawAmt), 0)
    const grand = n(q.totalCost) || computedGrand

    return { lines: L, grand }
  }, [q])

  return (
    <div className="row" style={{gridTemplateColumns:'1fr'}}>
      <div className="toolbar" style={{marginBottom:12}}>
        <button className="btn primary" onClick={() => exportNodeToPdf(ref.current, `${q.quoteMeta.quoteNo}.pdf`)}>Export PDF</button>
      </div>
      <div ref={ref} className="card"><div className="body">
        <Header company={q.company} quoteMeta={q.quoteMeta}/>
        <TopBlocks q={q}/>
        <Table lines={lines} grand={grand}/>
        <Footer company={q.company} />
      </div></div>
    </div>
  )
}

function Header({ company, quoteMeta }){
  return (
    <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid var(--border)',paddingBottom:10, marginBottom:12}}>
      <div className="brand">
        {company.logoDataUrl ? <img src={company.logoDataUrl} alt="logo"/> : null}
        <div>
          <div style={{fontWeight:700, fontSize:18}}>{company.name || 'Company'}</div>
          <div className="muted">{company.address}</div>
        </div>
      </div>
      <div className="right">
        <div style={{fontWeight:800, fontSize:18}}>QUOTATION</div>
        <div>Quote No: <b>{quoteMeta.quoteNo}</b></div>
        <div>Date: <b>{quoteMeta.date}</b></div>
      </div>
    </div>
  )
}

function TopBlocks({ q }){
  return (
    <div className="grid g2" style={{marginBottom:12}}>
      <div>
        <div style={{fontWeight:600, marginBottom:4}}>Bill To</div>
        <div><b>{q.client.name || 'Client Name'}</b></div>
        <div className="muted" style={{whiteSpace:'pre-line'}}>{q.client.address}</div>
        {q.company.gst && (<div style={{marginTop:6}}>GST: <b>{q.company.gst}</b></div>)}
      </div>
      <div className="right">
        <div>Core: <b>{q.kitchen.core || '-'}</b></div>
        <div>Inner Liner: <b>{q.kitchen.innerLiner || '-'}</b></div>
        <div>Shutter Finish: <b>{q.kitchen.externalLaminate ?? q.kitchen.externalLam ?? '-'}</b></div>
      </div>
    </div>
  )
}

function Table({ lines, grand }){
  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th className="right">Qty / Area</th>
          <th className="right">Rate</th>
          <th className="right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {lines.map((r,i)=> (
          <tr key={i}>
            <td>{r.desc}</td>
            <td className="right">{r.qty}</td>
            <td className="right">{r.rate}</td>
            <td className="right">{r.amt}</td>
          </tr>
        ))}
      </tbody>
      <tfoot className="table-foot">
        <tr>
          <td colSpan="3" className="right">Grand Total</td>
          <td className="right">{INR(grand)}</td>
        </tr>
      </tfoot>
    </table>
  )
}

function Footer({ company }){
  return (
    <div style={{marginTop:16, paddingTop:12, borderTop:'1px solid var(--border)', textAlign:'center', fontSize:12}}>
      <div style={{fontWeight:600}}>{company.name}</div>
      <div className="muted" style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
        <span>{company.email}</span><span>•</span><span>{company.website}</span><span>•</span><span>{company.instagram}</span>
      </div>
    </div>
  )
}
