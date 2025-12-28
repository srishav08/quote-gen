// File: src/state/QuoteContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { INR, nnum } from '../utils/format'
import { loadAllFromGoogle } from '../hooks/useInventory';
import { innerLinerCatalog, externalLaminateCatalog, coreMaterialCatalog } from '../config/inventory/inventoryConstants';
import { hardwareInventoryCatalog, accessoryInventoryCatalog, pricing } from './pricingSheet';

const QuoteContext = createContext(null)
export const useQuote = () => useContext(QuoteContext)

// Helpers
export const coreKey = (v) => String(v || '').toLowerCase(); // "BWR" -> "bwr"
export const shutterKey = (v) => {
  const s = String(v || '').toLowerCase();
  if (s.includes('acrylic')) return 'acrylic';
  if (s.includes('pvc'))     return 'pvc';
  if (s.includes('1mm'))     return '1mm';
  if (s.includes('0.8'))     return '0.8mm';
  return s; // already "1mm" / "0.8mm" etc.
};
const laminateRate = (catalog, category, tier) => {
  const entry = catalog?.map?.[category]
  if (!entry) return 0
  return (tier?.toLowerCase?.() === 'premium') ? Number(entry.premium)||0 : Number(entry.basic)||0
}
const boardRate = (catalog, category, type, thickness) =>
  Number(catalog?.map?.[category]?.[type]?.[thickness] || 0)
const nestedPrice = (catalog, brand, category, item) => {
  const items = catalog?.map?.[brand]?.[category] || []
  const f = items.find(i => i.name === item)
  return f ? Number(f.price)||0 : 0
}

export function QuoteProvider({ children }){
  // Company (constant footer)
  const [company] = useState({
    name: 'Tarush Furnitures',
    email: 'hello@tarushkitchens.com',
    website: 'tarushkitchens.com',
    instagram: 'instagram.com/tarushkitchens',
    address: 'Bengaluru, Karnataka, India',
    gst: '',
    bankDetails: `Bank: HDFC Bank
A/C Name: Tarush Furnitures
A/C No: 1234567890
IFSC: HDFC0000001
Branch: MG Road, Bengaluru`,
    logoDataUrl: ''
  })

  // Client / Quote meta
  const [selectedProduct, setSelectedProduct] = useState("");
  const productCatlog = ['kitchen', 'wardrobe'];
  const [client, setClient] = useState({ name:'', address:'' })
  const [quoteMeta, setQuoteMeta] = useState({ quoteNo: `TAR-${Date.now().toString().slice(-6)}`, date: new Date().toISOString().slice(0,10) })

  // Kitchen & areas
  const [kitchen, setKitchen] = useState({ name:'', core:'', innerLiner:'', externalLaminate: '' })
  const [areas, setAreas]   = useState({ face:'', visible:'', wall:'', base:'', loft:'', tall:'', tandem:'', shelf:'' }) // Face area drives Laminates & Boards
  const [shelvesArea, setShelvesArea] = useState({ shelfAreaEach:0, shelfWidth:0, shelfDepth:0 });
  const [tandemBottomsArea, setTandemBottomsArea] = useState({ tandemAreaEach:0, tandemWidth:0, tandemDepth:0 });

  // Options
  const [installationYes, setInstallationYes] = useState('No')
  const [installationAmount, setInstallationAmount] = useState(0) // flat amount, used if Yes
  const [transportValue, setTransportValue] = useState()         // flat

  // Laminates catalog + selection
  const [laminatesCatalog, setLaminatesCatalog] = useState({ categories: [], map: {} })
  const [laminateSelection, setLaminateSelection] = useState({ category:'', tier:'Basic' })

  // Boards catalog + selection
  const [boardsCatalog, setBoardsCatalog] = useState({ categories: [], map: {} })
  const [boardSelection, setBoardSelection] = useState({ category:'', type:'', thickness:'' })

  // Hardware / Accessories catalogs & lines (Brand → Category → Item)
  const [hardwareCatalog, setHardwareCatalog]   = useState({})
  const [accessoryCatalog, setAccessoryCatalog] = useState({})
  const [hardwareLines, setHardwareLines]   = useState([{ id:1, brand:'', item:'', qty:0, cost:0 }])
  const [accessoryLines, setAccessoryLines] = useState([{ id:1, brand:'', item:'', qty:0, cost:0 }])

  //cost
  const [totalCost, setTotalCost] = useState(0);
  const [moduleCost, setModuleCost] = useState({carcus:0, shutter:0,exposed:0,shelves:0,tandem:0,installation:0,transport:0,hw:0,accessories:0});

  // Load from your Google Sheet (hardcoded)
  useEffect(() => {
    // const SHEET_ID = '1Iw51nEpyCpHpaHIxSVDhuFoT6RjMGLAyEf9jRM4nn1k'
    // loadAllFromGoogle(SHEET_ID, {
    //   setLaminatesCatalog,
    //   setBoardsCatalog,
    //   setHardwareCatalog,
    //   setAccessoryCatalog,
    // }).catch(() => {})
    setHardwareCatalog(hardwareInventoryCatalog);
    setAccessoryCatalog(accessoryInventoryCatalog);
  }, [])



  // Derived totals
  const laminatePerSqft = laminateRate(laminatesCatalog, laminateSelection.category, laminateSelection.tier)
  const boardsPerSqft   = boardRate(boardsCatalog, boardSelection.category, boardSelection.type, boardSelection.thickness)

  const laminateTotal = useMemo(() => nnum(areas.face) * nnum(laminatePerSqft), [areas.face, laminatePerSqft])
  const boardsTotal   = useMemo(() => nnum(areas.face) * nnum(boardsPerSqft),   [areas.face, boardsPerSqft])

  const hardwareTotal = useMemo(() =>
    hardwareLines.reduce((s, r) => s + nnum(r.qty) * nestedPrice(hardwareCatalog, r.brand, r.category, r.item), 0),
    [hardwareLines, hardwareCatalog]
  )
  const accessoriesTotal = useMemo(() =>
    accessoryLines.reduce((s, r) => s + nnum(r.qty) * nestedPrice(accessoryCatalog, r.brand, r.category, r.item), 0),
    [accessoryLines, accessoryCatalog]
  )

  const installTotal = installationYes === 'Yes' ? nnum(installationAmount) : 0

  const grandTotal = laminateTotal + boardsTotal + hardwareTotal + accessoriesTotal + nnum(transportValue) + installTotal


  //calculation
  // ---- derive core + shutter costs from selections and areas ----
  const n = (x) => (x === '' || x == null ? 0 : Number(x) || 0)
  const coreRates = pricing.core[coreKey(kitchen.core)] || { base:0, tall:0, wall:0, shelf:0, tandem:0 };
  const core_base   = React.useMemo(() => areas.base   * n(coreRates.base),   [areas.base,   coreRates.base])
const core_tall   = React.useMemo(() => areas.tall   * n(coreRates.tall),   [areas.tall,   coreRates.tall])
const core_wall   = React.useMemo(() => areas.wall   * n(coreRates.wall),   [areas.wall,   coreRates.wall])
const core_shelf  = React.useMemo(() => areas.shelf  * n(coreRates.shelf),  [areas.shelf,  coreRates.shelf])
const core_tandem = React.useMemo(() => areas.tandem * n(coreRates.tandem), [areas.tandem, coreRates.tandem])

const carcusCost  = core_base + core_tall + core_wall
const shelvesCost = core_shelf
const tandemCost  = core_tandem
const selectedCore    = coreKey(kitchen.core)
const selectedShutter = shutterKey(kitchen.externalLaminate)
const shutterPerSqft = pricing.shutter[selectedShutter] || 0
const shutterCost = React.useMemo(() => areas.visible * n(shutterPerSqft), [areas.visible, shutterPerSqft])

  // If you already compute hardware/accessory totals elsewhere, alias them:
  const hwTotal  = nnum(moduleCost.hw);
  const accTotal = nnum(moduleCost.accessories);

  const installationCost = (installationYes === 'Yes' && Number.isFinite(areas.face)) ? n(pricing?.installation*areas.face) : 0
const transportCost    = n(transportValue)

  // keep moduleCost/totalCost in sync whenever inputs change
  useEffect(() => {
    const carcus = core_base + core_tall + core_wall;
    const shelves = core_shelf;
    const tandem  = core_tandem;
    const shutter = shutterCost;
    const exposed = shutterCost; // or 0 if you don't want this bucket
    const installation = installationYes === 'Yes' ? nnum(rates?.installation) : 0;
    const transport    = nnum(transportValue);

    const next = {
    carcus, shutter, exposed, shelves, tandem,
    installation, transport,
    hw: hwTotal, accessories: accTotal
  };   
   setModuleCost(next);
   setTotalCost(Object.values(next).reduce((s,v)=> s + nnum(v), 0));
 }, [
  carcusCost,
  shelvesCost,
  tandemCost,
  shutterCost,
  installationCost,
  transportCost,
  hwTotal,
  accTotal
]);

  const value = {
    selectedProduct,
    setSelectedProduct,
    productCatlog,
    company,
    client, setClient,
    quoteMeta, setQuoteMeta,
    kitchen, setKitchen,
    areas, setAreas,
    shelvesArea, setShelvesArea,
    tandemBottomsArea, setTandemBottomsArea,

    //catlog constants
    innerLinerCatalog, externalLaminateCatalog, coreMaterialCatalog,

    // Options
    installationYes, setInstallationYes,
    installationAmount, setInstallationAmount,
    transportValue, setTransportValue,

    // Laminates
    laminatesCatalog, laminateSelection, setLaminateSelection, laminatePerSqft, laminateTotal,
    // Boards
    boardsCatalog, boardSelection, setBoardSelection, boardsPerSqft, boardsTotal,

    // Hardware / Accessories
    hardwareCatalog, accessoryCatalog,
    hardwareLines, setHardwareLines,
    accessoryLines, setAccessoryLines,
    pricing,

    // Totals
    totalCost, setTotalCost,
    moduleCost, setModuleCost
  }

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}
