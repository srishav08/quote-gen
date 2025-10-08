// File: src/pages/PreviewPage.jsx
import React, { useRef } from 'react'
import { useQuote } from '../state/QuoteContext'
import { INR } from '../utils/format'
import { exportNodeToPdf } from '../utils/pdf'

export default function PreviewPage(){
  const q = useQuote()
  const ref = useRef(null)

  const priceFrom = (catalog, brand, category, name) => {
    const items = catalog?.map?.[brand]?.[category] || []
    const found = items.find(i => i.name === name)
    return found ? Number(found.price) || 0 : 0
  }

  const lines = []
  const push = (desc, qty, rate, amtRaw) =>
    lines.push({ desc, qty, rate: INR(rate), amt: INR(amtRaw), _rawAmt: amtRaw })

  // Laminates
  if (q.laminatePerSqft && q.laminateSelection.category){
    push(`Laminates - ${q.laminateSelection.category} (${q.laminateSelection.tier})`,
      `${q.areas.face} sq ft`, q.laminatePerSqft, q.areas.face*q.laminatePerSqft)
  }
  // Boards
  if (q.boardsPerSqft && q.boardSelection.category && q.boardSelection.type && q.boardSelection.thickness){
    push(`Boards - ${q.boardSelection.category} / ${q.boardSelection.type} / ${q.boardSelection.thickness}`,
      `${q.areas.face} sq ft`, q.boardsPerSqft, q.areas.face*q.boardsPerSqft)
  }
  // Hardware / Accessories
  q.hardwareLines.filter(r=>r.brand && r.category && r.item && r.qty>0).forEach(r=> {
    const rate = priceFrom(q.hardwareCatalog, r.brand, r.category, r.item)
    push(`Hardware - ${r.brand} / ${r.category} / ${r.item}`, `${r.qty} pcs`, rate, r.qty*rate)
  })
  q.accessoryLines.filter(r=>r.brand && r.category && r.item && r.qty>0).forEach(r=> {
    const rate = priceFrom(q.accessoryCatalog, r.brand, r.category, r.item)
    push(`Accessories - ${r.brand} / ${r.category} / ${r.item}`, `${r.qty} pcs`, rate, r.qty*rate)
  })
  // Installation / Transport
  if (q.installationYes === 'Yes' && q.installationAmount > 0){
    push('Installation', '-', 0, q.installationAmount)
  }
  if (q.transportValue > 0){
    push('Transport & Loading/Unloading', '-', 0, q.transportValue)
  }

  const grand = lines.reduce((s,l)=> s + (l._rawAmt||0), 0)

  return (
    <div className="row" style={{gridTemplateColumns:'1fr'}}>
      <div className="toolbar" style={{marginBottom:12}}>
        <button className="btn primary" onClick={()=> exportNodeToPdf(ref.current, `${q.quoteMeta.quoteNo}.pdf`)}>Export PDF</button>
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
      <div>
        <div style={{fontWeight:700, fontSize:18}}>{company.name || 'Company'}</div>
        <div className="muted">{company.address}</div>
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
        <div>Core: <b>{q.kitchen.core}</b></div>
        <div>Inner Liner: <b>{q.kitchen.innerLiner}</b></div>
      </div>
    </div>
  )
}

function Table({ lines, grand }){
  return (
    <table>
      <thead>
        <tr><th>Description</th><th className="right">Qty / Area</th><th className="right">Rate</th><th className="right">Amount</th></tr>
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
