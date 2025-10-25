import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DesignationProvider } from '../src/Components/Context/Context.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DesignationProvider>
    <App />
    </DesignationProvider>
  </StrictMode>,
)
