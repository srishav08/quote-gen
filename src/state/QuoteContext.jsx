// File: src/state/QuoteContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { INR, nnum } from '../utils/format'
import { loadAllFromGoogle } from '../hooks/useInventory';
import { innerLinerCatalog, externalLaminateCatalog, coreMaterialCatalog } from '../config/inventory/inventoryConstants';

const QuoteContext = createContext(null)
export const useQuote = () => useContext(QuoteContext)

// Helpers
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
    name: 'Tarush Kitchens',
    email: 'hello@tarushkitchens.com',
    website: 'tarushkitchens.com',
    instagram: 'instagram.com/tarushkitchens',
    address: 'Bengaluru, Karnataka, India',
    gst: '',
    bankDetails: `Bank: HDFC Bank
A/C Name: Tarush Kitchens
A/C No: 1234567890
IFSC: HDFC0000001
Branch: MG Road, Bengaluru`,
    logoDataUrl: ''
  })

  // Client / Quote meta
  const [client, setClient] = useState({ name:'', address:'' })
  const [quoteMeta, setQuoteMeta] = useState({ quoteNo: `TAR-${Date.now().toString().slice(-6)}`, date: new Date().toISOString().slice(0,10) })

  // Kitchen & areas
  const [kitchen, setKitchen] = useState({ name:'Kitchen', core:'BWR', innerLiner:'White', externalLaminate: '0.8mm' })
  const [areas, setAreas]   = useState({ face:0, visible:0, wall:0, base:0, tall:0 }) // Face area drives Laminates & Boards
  const [shelvesArea, setShelvesArea] = useState({ shelfAreaEach:0, shelfWidth:0, shelfDepth:0 });
  const [tandemBottomsArea, setTandemBottomsArea] = useState({ tandemAreaEach:0, tandemWidth:0, tandemDepth:0 });

  // Options
  const [installationYes, setInstallationYes] = useState('No')
  const [installationAmount, setInstallationAmount] = useState(0) // flat amount, used if Yes
  const [transportValue, setTransportValue] = useState(0)         // flat

  // Laminates catalog + selection
  const [laminatesCatalog, setLaminatesCatalog] = useState({ categories: [], map: {} })
  const [laminateSelection, setLaminateSelection] = useState({ category:'', tier:'Basic' })

  // Boards catalog + selection
  const [boardsCatalog, setBoardsCatalog] = useState({ categories: [], map: {} })
  const [boardSelection, setBoardSelection] = useState({ category:'', type:'', thickness:'' })

  // Hardware / Accessories catalogs & lines (Brand → Category → Item)
  const [hardwareCatalog, setHardwareCatalog]   = useState({ brands: [], map: {} })
  const [accessoryCatalog, setAccessoryCatalog] = useState({ brands: [], map: {} })
  const [hardwareLines, setHardwareLines]   = useState([{ id:1, brand:'', category:'', item:'', qty:0 }])
  const [accessoryLines, setAccessoryLines] = useState([{ id:1, brand:'', category:'', item:'', qty:0 }])

  // Load from your Google Sheet (hardcoded)
  useEffect(() => {
    const SHEET_ID = '1Iw51nEpyCpHpaHIxSVDhuFoT6RjMGLAyEf9jRM4nn1k'
    loadAllFromGoogle(SHEET_ID, {
      setLaminatesCatalog,
      setBoardsCatalog,
      setHardwareCatalog,
      setAccessoryCatalog,
    }).catch(() => {})
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

  const value = {
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

    // Totals
    hardwareTotal, accessoriesTotal,
    grandTotal,
  }

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}
