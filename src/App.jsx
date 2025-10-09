// File: src/App.jsx
import { NavLink, Route, Routes } from 'react-router-dom'
import QuoteBuilder from './pages/QuoteBuilder'
import SettingsPage from './pages/SettingsPage'
import PreviewPage from './pages/PreviewPage'
import logoUrl from './assets/logo.svg'

export default function App(){
  return (
    <>
      <header className="header">
        <div className="container" style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px'}}>
          <div className="brand">
            <img src={logoUrl} alt="logo"/>
            <strong>Kitchen Quotation</strong>
          </div>
          <nav style={{marginLeft:'auto', display:'flex', gap:12}}>
            <NavLink className="btn" to="/quote">Quote</NavLink>
            <NavLink className="btn" to="/settings">Settings</NavLink>
            <NavLink className="btn primary" to="/preview">Preview / PDF</NavLink>
          </nav>
        </div>
      </header>
      <div className="container" style={{padding:'16px'}}>
        <Routes>
          <Route path="/" element={<QuoteBuilder/>} />
          <Route path="/quote" element={<QuoteBuilder/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          <Route path="/preview" element={<PreviewPage/>} />
        </Routes>
      </div>
    </>
  )
}
