import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css' 
import Main_App from './Main_App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main_App />
  </StrictMode>,
)
