// File: src/pages/QuoteBuilder.jsx
import React from 'react'
import { useQuote } from '../state/QuoteContext'
import { INR } from '../utils/format'
import TwoDimensionalInput from '../components/twoDimensionalInput/TwoDimensionalnput'
import SectionDivider from '../components/divider/sectionDivider/SectionDivider'

import RadioYesNo from '../components/radio/Index'

export default function QuoteBuilder(){
  const q = useQuote()
  console.log(q)

  // Boards dependent options
  const boardTypes = q.boardSelection.category ? Object.keys(q.boardsCatalog.map[q.boardSelection.category] || {}) : []
  const boardThicknesses = (q.boardSelection.category && q.boardSelection.type)
    ? Object.keys(q.boardsCatalog.map[q.boardSelection.category]?.[q.boardSelection.type] || {})
    : []

  const evaluateTotalCost = () => {

  }

  const evaluateHardwareAccessoryCost = () => {

  }

  const evaluateInstallationCost = () => {

  }

  const evaluateModularCost = () => {
    
  }

  return (
    <div className="row">
      <div className="stack-16">
      {/* Client & Quote */}
      <div className="card"><div className="body">
        <h3>Client Details</h3>
        <div className="grid g2" style={{marginTop:8}}>
          <Field label="Client Name" value={q.client.name} onChange={v=>q.setClient({...q.client, name:v})}/>
          <Field label="Quote No" value={q.quoteMeta.quoteNo} onChange={v=>q.setQuoteMeta({...q.quoteMeta, quoteNo:v})}/>
          <Field label="Date (YYYY-MM-DD)" value={q.quoteMeta.date} onChange={v=>q.setQuoteMeta({...q.quoteMeta, date:v})}/>
          <Select
            label="Product"
            value={q.selectedProduct}
            onChange={v=>q.setSelectedProduct(v)}
            options={q.productCatlog}
          />
          <Field label="Site Address" value={q.client.address} onChange={v=>q.setClient({...q.client, address:v})} full />
        </div>
      </div></div>

      {/* Kitchen Basics */}
      {/* <div className="card"><div className="body">
        <h3>Kitchen</h3>
        <div className="grid g3" style={{marginTop:8}}>
          <Field label="Name" value={q.kitchen.name} onChange={v=>q.setKitchen({...q.kitchen, name:v})}/>
          <Select
            label="Core Material"
            value={q.kitchen.core || "--select--"}
            onChange={v=>q.setKitchen({...q.kitchen, core:v})}
            options={q.coreMaterialCatalog}
          />

          <Select
            label="Inner Liner"
            value={q.kitchen.innerLiner || "--select--"}
            onChange={v=>q.setKitchen({...q.kitchen, innerLiner:v})}
            options={q.innerLinerCatalog}
          />
          <Select
            label="External Laminate"
            value={q.kitchen.externalLaminate || "--select--"}
            onChange={v=>q.setKitchen({...q.kitchen, externalLaminate:v})}
            options={q.externalLaminateCatalog}
          />
        </div>
        <div className="grid g3" style={{marginTop:8}}>
          <NumberField label="Kitchen Face Area (sq ft)" value={q.areas.face} onChange={v=>{
            console.log(v);
            q.setAreas({...q.areas, face:v});
            if(q.installationYes==="Yes") {
              q.setInstallationAmount(150*globalThis.Number(v))
            }
          }}/>
          <NumberField label="Exposed/Visible Area (sq ft)" value={q.areas.visible} onChange={v=>{console.log(v);q.setAreas({...q.areas, visible:v})}}/>
          <NumberField label="Wall Unit Area (sq ft)" value={q.areas.wall} onChange={v=>{console.log(v);q.setAreas({...q.areas, wall:v})}}/>
          <NumberField label="Base Unit Area (sq ft)" value={q.areas.base} onChange={v=>{console.log(v);q.setAreas({...q.areas, base:v})}}/>
          <NumberField label="Tall Unit Area (sq ft)" value={q.areas.tall} onChange={v=>{console.log(v);q.setAreas({...q.areas, tall:v})}}/>
        </div>
        <div className="grid g2" style={{marginTop:8}}>
          <TwoDimensionalInput
            areaLabel="Shelf Area"
            d1Val={q.shelvesArea.shelfWidth}
            d2Val={q.shelvesArea.shelfDepth}
            area={q.shelvesArea.shelfAreaEach}
            onD1Change={(s)=>{
              const shelfWidth = (s === '' ? 0 : globalThis.Number(s));
              const w = shelfWidth === '' ? 0 : shelfWidth;
              const d = q.shelvesArea.shelfDepth === '' ? 0 : q.shelvesArea.shelfDepth;
              q.setShelvesArea({
                ...q.shelvesArea,
                shelfWidth,
                shelfAreaEach: (w * d) / 144, // inches->sq ft
              });
            }}
            onD2Change={(s)=>{
              const shelfDepth = (s === '' ? 0 : globalThis.Number(s));
              const d = shelfDepth === 0 ? 0 : shelfDepth;
              const w = q.shelvesArea.shelfWidth === '' ? 0 : q.shelvesArea.shelfWidth;
              q.setShelvesArea({
                ...q.shelvesArea,
                shelfDepth,
                shelfAreaEach: (w * d) / 144, // inches->sq ft
              });
            }}
          />

          <TwoDimensionalInput
            areaLabel="Tandem Bottoms Area"
            d1Val={q.tandemBottomsArea.tandemWidth}
            d2Val={q.tandemBottomsArea.tandemDepth}
            area={q.tandemBottomsArea.tandemAreaEach}
            onD1Change={(s)=>{
              const tandemWidth = (s === '' ? 0 : globalThis.Number(s));
              const w = tandemWidth === '' ? 0 : tandemWidth;
              const d = q.tandemBottomsArea.tandemDepth === '' ? 0 : q.tandemBottomsArea.tandemDepth;
              q.setTandemBottomsArea({
                ...q.tandemBottomsArea,
                tandemWidth,
                tandemAreaEach: (w * d) / 144, // inches->sq ft
              });
            }}
            onD2Change={(s)=>{
              const tandemDepth = (s === '' ? 0 : globalThis.Number(s));
              const d = tandemDepth === 0 ? 0 : tandemDepth;
              const w = q.tandemBottomsArea.tandemWidth === '' ? 0 : q.tandemBottomsArea.tandemWidth;
              q.setTandemBottomsArea({
                ...q.tandemBottomsArea,
                tandemDepth,
                tandemAreaEach: (w * d) / 144, // inches->sq ft
              });
            }}
          />
        </div>
      </div></div> */}

      {/* kitchen basic info */}
      <div className="card"><div className="body">
      <h3>Material Selection</h3>
      <div className="grid g3" style={{marginTop:8}}>
          <Select
            label="Core Material"
            value={q.kitchen.core || "--select--"}
            onChange={v=>q.setKitchen({...q.kitchen, core:v})}
            options={q.coreMaterialCatalog}
          />
          {/* <Field label="Core Material" value={q.kitchen.core} onChange={v=>q.setKitchen({...q.kitchen, core:v})}/> */}

          <Select
            label="Inner Liner"
            value={q.kitchen.innerLiner || "--select--"}
            onChange={v=>q.setKitchen({...q.kitchen, innerLiner:v})}
            options={q.innerLinerCatalog}
          />
          {/* <Field label="Inner Liner" value={q.kitchen.innerLiner} onChange={v=>q.setKitchen({...q.kitchen, innerLiner:v})}/> */}
          <Select
            label="Shutter Finish"
            value={q.kitchen.externalLaminate || "--select--"}
            onChange={v=>q.setKitchen({...q.kitchen, externalLaminate:v})}
            options={q.externalLaminateCatalog}
          />
        </div>
      </div></div>

      {/* Dimensions */}
      <div className="card"><div className="body">
      <h3>Dimensions</h3>
      <div className="grid g2" style={{marginTop:8}}>
          <NumberField label="Total Kitchen Face Area (sq ft)" value={q.areas.face} onChange={v=>{console.log(v);q.setAreas({...q.areas, face:v})}}/>
          <NumberField label="Exposed/Visible Area (sq ft)" value={q.areas.visible} onChange={v=>{console.log(v);q.setAreas({...q.areas, visible:v})}}/>
          <NumberField label="Tall Unit Area (sq ft)" value={q.areas.tall} onChange={v=>{console.log(v);q.setAreas({...q.areas, tall:v})}}/>
          <NumberField label="Base Unit Area (sq ft)" value={q.areas.base} onChange={v=>{console.log(v);q.setAreas({...q.areas, base:v})}}/>
          <NumberField label="Wall Unit Area (sq ft)" value={q.areas.wall} onChange={v=>{console.log(v);q.setAreas({...q.areas, wall:v})}}/>
          <NumberField label="Loft Area (sq ft)" value={q.areas.loft} onChange={v=>{console.log(v);q.setAreas({...q.areas, loft:v})}}/>
          <NumberField label="Shelf Area (sq ft)" value={q.areas.shelf} onChange={v=>{console.log(v);q.setAreas({...q.areas, shelf:v})}}/>
          <NumberField label="Tandem Bottoms Area (sq ft)" value={q.areas.tandem} onChange={v=>{console.log(v);q.setAreas({...q.areas, tandem:v})}}/>
        </div>
      </div></div>

      

      {/* Laminates */}
      {/* <div className="card"><div className="body">
        <h3>Laminates</h3>
        <div className="grid g3" style={{marginTop:8}}>
          <Select
            label="Type"
            value={q.laminateSelection.category}
            onChange={v=>q.setLaminateSelection({ ...q.laminateSelection, category:v })}
            options={q.laminatesCatalog.categories}
          />
          <Select
            label="Tier"
            value={q.laminateSelection.tier}
            onChange={v=>q.setLaminateSelection({ ...q.laminateSelection, tier:v })}
            options={['Basic','Premium']}
          />
          <Readout label="Rate (hidden)" value={q.laminatePerSqft ? INR(q.laminatePerSqft) : '—'} />
        </div>
        <div className="muted" style={{marginTop:6}}>Calculated as: rate × Kitchen Face Area.</div>
      </div></div> */}

      {/* Boards */}
      {/* <div className="card"><div className="body">
        <h3>Boards</h3>
        <div className="grid g3" style={{marginTop:8}}>
          <Select
            label="Category"
            value={q.boardSelection.category}
            onChange={v=>q.setBoardSelection({ category:v, type:'', thickness:'' })}
            options={q.boardsCatalog.categories}
          />
          <Select
            label="Type"
            value={q.boardSelection.type}
            onChange={v=>q.setBoardSelection({ ...q.boardSelection, type:v, thickness:'' })}
            options={boardTypes}
            disabled={!q.boardSelection.category}
          />
          <Select
            label="Thickness"
            value={q.boardSelection.thickness}
            onChange={v=>q.setBoardSelection({ ...q.boardSelection, thickness:v })}
            options={boardThicknesses}
            disabled={!q.boardSelection.type}
          />
        </div>
        <div className="grid g3" style={{marginTop:8}}>
          <Readout label="Rate (hidden)" value={q.boardsPerSqft ? INR(q.boardsPerSqft) : '—'} />
          <Readout label="Computed" value={INR(q.boardsTotal)} />
        </div>
        <div className="muted" style={{marginTop:6}}>Calculated as: rate × Kitchen Face Area.</div>
      </div></div> */}

      {/* Hardware & Accessories: Brand → Category → Item */}
      <div className="card"><div className="body" style={{marginTop:8}}>
        <h3>Hardware & Accessories</h3>
        <SectionDivider text="Hardware" dashed />
        <LinesEditor title="Hardware"   lines={q.hardwareLines}   setLines={q.setHardwareLines}   catalog={q.hardwareCatalog}/>
        <SectionDivider text="Accessories" dashed />
        <LinesEditor title="Accessories" lines={q.accessoryLines} setLines={q.setAccessoryLines} catalog={q.accessoryCatalog}/>
      </div></div>

      {/* Options */}
      <div className="card"><div className="body">
        <h3>Options</h3>
        <div className="grid g3" style={{marginTop:8}}>
          <NumberField label="Transport & Loading(₹)" value={q.transportValue} onChange={v=>{console.log(v);q.setTransportValue(v)}}/>
          <RadioYesNo
            label="Installation"
            name="installation"
            value={q.installationYes}
            onChange={q.setInstallationYes}
          />
          {/* <RadioYesNo
            label="Transport & Loading"
            name="transport"
            value={q.transportValue > 0 ? 'Yes' : 'No'}
            onChange={(v) => {
              if (v === 'No') q.setTransportValue(0);
              // if 'Yes', keep current value (0) and let the user type; field below enables
            }}
          /> */}
          {/* <Select label="Installation" value={q.installationYes} onChange={v=>{
            q.setInstallationYes(v);
            if(v==="Yes") {
              q.setInstallationAmount(150*globalThis.Number(q.areas.face));
            } else {
              q.setInstallationAmount(0);
            }
          }} options={['Yes','No']}/>
          <NumberField disabled={true} label="Installation Amount" value={q.installationAmount} onChange={q.setInstallationAmount}/>
          <NumberField label="Transport & Loading (flat)" value={q.transportValue} onChange={q.setTransportValue}/> */}
        </div>
      </div></div>

      

      {/* Constant footer */}
      <StaticFooter />
    </div>
    {/* RIGHT: sticky Price Summary */}
    <aside className="aside-sticky">
      {/* Summary */}
      <div className="card"><div className="body">
        <h3>Price Summary</h3>
        <div className="grid" style={{marginTop:8}}>
          <SummaryTile label="All Units + Shutters + Shelves + Tandem" value={INR(q.laminateTotal + q.boardsTotal)}/>
          <SummaryTile label="Hardware + Accessories" value={INR(q.hardwareTotal + q.accessoriesTotal)}/>
          <SummaryTile label="Installation + Transport & Loading/Unloading" value={INR(q.hardwareTotal + q.accessoriesTotal)}/>
          <SummaryTile label="Grand Total" value={INR(q.grandTotal)}/>
        </div>
      </div></div>
    </aside>
    </div>
  )
}

function LinesEditor({ title, lines, setLines, catalog }){
  const add = () => setLines([...lines, { id:Date.now(), brand:'', category:'', item:'', qty:0 }])
  const remove = (id) => setLines(lines.filter(r => r.id !== id))
  const change = (idx, field, value) => {
    const copy = [...lines]
    copy[idx] = { ...copy[idx], [field]: value }
    if (field === 'brand'){ copy[idx].category = ''; copy[idx].item = '' }
    if (field === 'category'){ copy[idx].item = '' }
    setLines(copy)
  }

  const brandOptions = catalog?.brands || []

  return (
    <div style={{marginTop:8}}>
      {/* <div style={{display:'flex',alignItems:'center',gap:8, margin:'8px 0'}}>
        <span className="pill">{title}</span>
      </div> */}

      {lines.map((r,idx) => {
        const categories = r.brand ? Object.keys((catalog?.map?.[r.brand]) || {}) : []
        const items = (r.brand && r.category)
          ? ((catalog?.map?.[r.brand]?.[r.category]) || []).map(o => o.name)
          : []

        return (
          <div key={r.id} className="grid g4" style={{marginTop:20, alignItems:'end'}}>
            <div>
              <label>Brand</label>
              <select value={r.brand} onChange={e=>change(idx,'brand', e.target.value)}>
                <option value="">-- select brand --</option>
                {brandOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            {/* <div>
              <label>Category</label>
              <select value={r.category} disabled={!r.brand} onChange={e=>change(idx,'category', e.target.value)}>
                <option value="">{r.brand ? '-- select category --' : 'select brand first'}</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div> */}
            <div>
              <label>Item</label>
              <select value={r.item} disabled={!r.category} onChange={e=>change(idx,'item', e.target.value)}>
                <option value="">{r.category ? '-- select item --' : 'select category first'}</option>
                {items.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label>Qty</label>
              <input type="number" value={r.qty} onChange={e=>change(idx,'qty', Number(e.target.value))}/>
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
              <button className="btn" onClick={()=>remove(r.id)}>Remove</button>
            </div>
          </div>
        )
      })}
      <div style={{display:'flex',alignItems:'center',gap:8, margin:'8px 0'}}>
        <button className="btn blue" onClick={add}>Add</button>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, full }){
  return (
    <div style={full ? {gridColumn:'1 / -1'} : undefined}>
      <label>{label}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} />
    </div>
  )
}
function NumberField({ label, value, onChange, disabled=false }){
    const handleChange = (e) => {
        const s = e.target.value;
        // allow blank while typing; coerce only when not blank
        onChange(s === '' ? 0 : Number(s));
      };
    //   console.log(value)
  return (
    <div>
      <label>{label}</label>
      <input disabled={disabled} type="number" value={value} onChange={e=>onChange(e.target.value)} />
    </div>
  )
}
function Select({ label, value, onChange, options, disabled }){
  return (
    <div>
      <label>{label}</label>
      <select disabled={disabled} value={value} onChange={e=>onChange(e.target.value)}>
        <option value="--select--"></option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
function Readout({ label, value }){
  return (
    <div>
      <label>{label}</label>
      <div className="muted" style={{padding:'10px 12px', border:'1px dashed var(--border)', borderRadius:10}}>{value}</div>
    </div>
  )
}
function SummaryTile({ label, value }){
  return (
    <div>
      <div className="muted">{label}</div>
      <strong>{value}</strong>
    </div>
  )
}
function StaticFooter(){
  const { company } = useQuote()
  return (
    <div className="card" style={{marginTop:8}}>
      <div className="body" style={{textAlign:'center', fontSize:12}}>
        <div style={{fontWeight:600}}>{company.name}</div>
        <div className="muted" style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
          <span>{company.email}</span><span>•</span>
          <span>{company.website}</span>
          {/* <span>{company.instagram}</span> */}
        </div>
        {/* <div className="muted" style={{whiteSpace:'pre-line', marginTop:6}}>
          {company.bankDetails}
        </div> */}
      </div>
    </div>
  )
}