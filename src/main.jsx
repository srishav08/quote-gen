import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { QuoteProvider } from './state/QuoteContext'


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<BrowserRouter>
<QuoteProvider>
<App />
</QuoteProvider>
</BrowserRouter>
</React.StrictMode>
)