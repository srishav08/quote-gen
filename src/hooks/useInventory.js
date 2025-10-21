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
  console.log(wb)

  // 1) Laminates
  setLaminatesCatalog(parseLaminatesSheet(wb))

  // 2) Boards
  setBoardsCatalog(parseBoardsSheet(wb))

  // 3) Hardware & Accessories from prefixed sheets
  setHardwareCatalog(buildCatalogFromPrefixedSheets(wb, /^HARDWARE[\s_-]/i))
  setAccessoryCatalog(buildCatalogFromPrefixedSheets(wb, /^ACCESSORY[\s_-]/i))
}

// ---------- helpers & parsers ----------

// src/hooks/useInventory.js  ➜ add helpers (top of file, once)

function cleanStr(v) {
  // turn undefined/null into '', strip NBSP and zero-width, remove quotes/smart quotes
  return String(v ?? '')
    .replace(/\u00A0/g, ' ')                  // NBSP -> space
    .replace(/[\u200B-\u200D\uFEFF]/g, '')    // zero-width
    .replace(/[“”‘’"]/g, '')                  // quotes
    .replace(/\s+/g, ' ')                     // collapse spaces
    .replace(/\.\s*$/,'')                     // trailing single dot
    .trim();
}

function normKey(v) {
  // normalize for header matching: keep letters/numbers only
  return cleanStr(v).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function toNumber(v) {
  if (typeof v === 'number' && isFinite(v)) return v;
  const s = cleanStr(v).replace(/,/g, '');
  const n = parseFloat(s);
  return isFinite(n) ? n : 0;
}

// Find a header row by scanning the first N rows and returning a key map
// wanted is array like ['category','basic','premium'] with canonical names
function findHeaderMap(rows, wanted, scanRows = 10) {
  for (let r = 0; r < Math.min(rows.length, scanRows); r++) {
    const headerCells = rows[r] || [];
    const keyIndex = {};
    headerCells.forEach((cell, i) => { keyIndex[normKey(cell)] = i; });

    const map = {};
    let ok = true;
    for (const w of wanted) {
      const k = normKey(w);
      const idx = keyIndex[k];
      if (idx == null) { ok = false; break; }
      map[w] = idx;
    }
    if (ok) return { rowIndex: r, map };
  }
  return null;
}


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
  // tolerant to sheet name casing
  const wsName = wb.SheetNames.find(n => normKey(n) === 'laminates');
  if (!wsName) return { categories: [], map: {} };
  const rowsA = XLSX.utils.sheet_to_json(wb.Sheets[wsName], { header: 1, defval: '' });

  if (!rowsA.length) return { categories: [], map: {} };

  // detect header row by looking for CATEGORY/BASIC/PREMIUM (case/space/quote-safe)
  const hdr = findHeaderMap(rowsA, ['CATEGORY','BASIC','PREMIUM']);
  if (!hdr) return { categories: [], map: {} };

  const { rowIndex, map } = hdr;
  const dataRows = rowsA.slice(rowIndex + 1);

  const outMap = {};
  for (const row of dataRows){
    const cat = cleanStr(row[map['CATEGORY']]);
    if (!cat) continue;
    const basic   = toNumber(row[map['BASIC']]);
    const premium = toNumber(row[map['PREMIUM']]);
    // ignore banner rows like "BASIC" or "PREMIUM" that slipped through:
    if (!basic && !premium) continue;
    outMap[cat] = { basic, premium };
  }

  const categories = Object.keys(outMap).sort((a,b)=> a.localeCompare(b));
  return { categories, map: outMap };
}

// Boards: sheet "Boards": S.NO | CATEGORY | TYPE | THICKNESS | PRICE
// -> { categories: string[], map: { [category]: { [type]: { [thickness]: price } } } }
function parseBoardsSheet(wb){
  // Case-insensitive match for the tab
  const wsName = wb.SheetNames.find(n => String(n).trim().toLowerCase() === 'boards');
  if (!wsName) return { categories: [], map: {} };

  // Read as AoA so we can find the real header row and handle merged/blank cells
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[wsName], { header: 1, defval: '' });
  if (!rows.length) return { categories: [], map: {} };

  // --- helpers (keep once in file if you already added them) ---
  const cleanStr = (v) =>
    String(v ?? '')
      .replace(/\u00A0/g, ' ')                 // NBSP
      .replace(/[\u200B-\u200D\uFEFF]/g, '')   // zero-width
      .replace(/[“”‘’"]/g, '')                 // quotes
      .replace(/\s+/g, ' ')
      .trim();
  const normKey = (v) => cleanStr(v).toLowerCase().replace(/[^a-z0-9]+/g, '');
  const toNumber = (v) => {
    if (typeof v === 'number' && isFinite(v)) return v;
    const s = cleanStr(v).replace(/,/g, '');
    const n = parseFloat(s);
    return isFinite(n) ? n : 0;
  };
  const findHeaderMap = (rowsAoA, wanted, scanRows = 10) => {
    for (let r = 0; r < Math.min(rowsAoA.length, scanRows); r++) {
      const row = rowsAoA[r] || [];
      const idxByKey = {};
      row.forEach((cell, i) => { idxByKey[normKey(cell)] = i; });
      const map = {};
      let ok = true;
      for (const w of wanted) {
        const k = normKey(w);
        if (idxByKey[k] == null) { ok = false; break; }
        map[w] = idxByKey[k];
      }
      if (ok) return { rowIndex: r, map };
    }
    return null;
  };
  // -------------------------------------------------------------

  // Find header indices for CATEGORY/TYPE/THICKNESS/PRICE
  const hdr = findHeaderMap(rows, ['CATEGORY','TYPE','THICKNESS','PRICE']);
  if (!hdr) return { categories: [], map: {} };
  const { rowIndex, map } = hdr;

  const data = rows.slice(rowIndex + 1);

  const out = {};
  let currentCategory = '';
  let currentType = '';

  for (const r of data) {
    const rawCat  = r[map['CATEGORY']];
    const rawType = r[map['TYPE']];
    const rawThk  = r[map['THICKNESS']];
    const rawPrc  = r[map['PRICE']];

    // Forward-fill CATEGORY / TYPE
    const cat = cleanStr(rawCat)  || currentCategory;
    const typ = cleanStr(rawType) || currentType;

    // Update trackers when new values appear
    if (cleanStr(rawCat))  currentCategory = cat;
    if (cleanStr(rawType)) currentType     = typ;

    const thickness = cleanStr(rawThk).toUpperCase(); // e.g., "6MM"
    const price     = toNumber(rawPrc);

    // Skip non-data rows (e.g., blank separators)
    if (!cat || !typ || !thickness) continue;
    if (!price) continue;

    // Build nested map
    out[cat] ??= {};
    out[cat][typ] ??= {};
    out[cat][typ][thickness] = price;
  }

  const categories = Object.keys(out).sort((a,b)=> a.localeCompare(b));
  return { categories, map: out };
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
  const ws = wb.Sheets[sheetName];
  if (!ws) return [];

  // Read as AoA so we can locate header row and forward-fill blanks
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  if (!rows.length) return [];

  // Auto-detect the real header row (case/spacing tolerant)
  const hdr = findHeaderMap(rows, ['CATEGORY','ITEM NAME','LANDING PRICE']);
  if (!hdr) return [];
  const { rowIndex, map } = hdr;

  const data = rows.slice(rowIndex + 1);
  const out = [];

  let currentCategory = '';

  for (const r of data) {
    const rawCat  = r[map['CATEGORY']];
    const rawName = r[map['ITEM NAME']];
    const rawLp   = r[map['LANDING PRICE']];

    // Forward-fill CATEGORY when cell is blank (due to merged cells in sheets)
    const category = cleanStr(rawCat) || currentCategory;
    if (cleanStr(rawCat)) currentCategory = category;

    const name  = cleanStr(rawName);
    const price = toNumber(rawLp);

    // Skip separators / banners / empty rows
    if (!category || !name) continue;
    if (!price) continue;

    out.push({ category, name, price });
  }

  return out;
}
