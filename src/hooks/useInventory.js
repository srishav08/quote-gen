// File: src/hooks/useInventory.js
import * as XLSX from 'xlsx'

// Public: load everything from a single Google Sheet and push into state
export async function loadAllFromGoogle(
  sheetId,
  {
    setLaminatesCatalog,
    setBoardsCatalog,
    setHardwareCatalog,
    setAccessoryCatalog,
  }
){
  const wb = await fetchGoogleSheetXlsx(sheetId)

  // 1) Laminates
  setLaminatesCatalog(parseLaminatesSheet(wb))

  // 2) Boards
  setBoardsCatalog(parseBoardsSheet(wb))

  // 3) Hardware & Accessories from prefixed sheets
  setHardwareCatalog(buildCatalogFromPrefixedSheets(wb, /^HARDWARE[\s_-]/i))
  setAccessoryCatalog(buildCatalogFromPrefixedSheets(wb, /^ACCESSORY[\s_-]/i))
}

// ---------- helpers & parsers ----------

export async function fetchGoogleSheetXlsx(sheetId){
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch Google Sheet .xlsx')
  const buf = await res.arrayBuffer()
  return XLSX.read(buf, { type:'array' })
}

// Laminates: sheet "Laminates": S.NO | CATEGORY | BASIC | PREMIUM
// -> { categories: string[], map: { [category]: { basic:number, premium:number } } }
function parseLaminatesSheet(wb){
  const ws = wb.Sheets['LAMINATES']
  if (!ws) return { categories: [], map: {} }
  const rows = XLSX.utils.sheet_to_json(ws, { defval:'' })
  const map = {}
  for (const r of rows){
    const cat = String(r.CATEGORY || r.Category || '').trim()
    if (!cat) continue
    const basic   = Number(r.BASIC   ?? r.Basic   ?? 0) || 0
    const premium = Number(r.PREMIUM ?? r.Premium ?? 0) || 0
    map[cat] = { basic, premium }
  }
  const categories = Object.keys(map).sort((a,b)=>a.localeCompare(b))
  return { categories, map }
}

// Boards: sheet "Boards": S.NO | CATEGORY | TYPE | THICKNESS | PRICE
// -> { categories: string[], map: { [category]: { [type]: { [thickness]: price } } } }
function parseBoardsSheet(wb){
  const ws = wb.Sheets['BOARDS']
  if (!ws) return { categories: [], map: {} }
  const rows = XLSX.utils.sheet_to_json(ws, { defval:'' })
  const map = {}
  for (const r of rows){
    const category  = String(r.CATEGORY || r.Category || '').trim()
    const type      = String(r.TYPE     || r.Type     || '').trim()
    const thickness = String(r.THICKNESS|| r.Thickness|| '').trim()
    const price     = Number(r.PRICE    ?? r.Price    ?? 0) || 0
    if (!category || !type || !thickness) continue
    map[category] ??= {}
    map[category][type] ??= {}
    map[category][type][thickness] = price
  }
  const categories = Object.keys(map).sort((a,b)=>a.localeCompare(b))
  return { categories, map }
}

// Hardware/Accessory:
// Tabs: /^Hardware-/i or /^Accessory-/i
// Columns: CATEGORY | CODE | ITEM NAME | QTY | MRP | Landing Price
// -> { brands: string[], map: { [brand]: { [category]: Array<{name, price}> } } }
function buildCatalogFromPrefixedSheets(wb, prefixRegex){
  const brands = []
  const map = {}
  wb.SheetNames.forEach(sheetName => {
    if (!prefixRegex.test(sheetName)) return
    const brand = sheetName.replace(prefixRegex, '').trim()
    if (!brand) return
    const items = parseBrandSheet(wb, sheetName)
    if (!items.length) return
    brands.push(brand)
    if (!map[brand]) map[brand] = {}
    for (const it of items){
      const cat = it.category || 'General'
      if (!map[brand][cat]) map[brand][cat] = []
      map[brand][cat].push({ name: it.name, price: it.price })
    }
  })
  brands.sort((a,b)=> a.localeCompare(b))
  for (const b of Object.keys(map)){
    const sortedCats = Object.keys(map[b]).sort((a,c)=> a.localeCompare(c))
    const newObj = {}
    for (const c of sortedCats){
      newObj[c] = map[b][c].slice().sort((x,y)=> x.name.localeCompare(y.name))
    }
    map[b] = newObj
  }
  return { brands, map }
}

function parseBrandSheet(wb, sheetName){
  const ws = wb.Sheets[sheetName]
  if (!ws) return []
  const rows = XLSX.utils.sheet_to_json(ws, { defval:'' })
  const out = []
  for (const r of rows){
    const category = String(r.CATEGORY || r.Category || '').trim()
    const name = String(r['ITEM NAME'] || r.Item || r.ITEM || r['Item Name'] || r.Description || r.DESCRIPTION || '').trim()
    if (!name) continue
    // pick Landing Price (case/space variations)
    let price = 0
    for (const [k,v] of Object.entries(r)){
      if (/^\s*landing\s*price\s*$/i.test(String(k))) { price = Number(v)||0; break }
    }
    out.push({ category, name, price })
  }
  return out
}
