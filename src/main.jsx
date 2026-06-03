import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Landing from './Landing.jsx'
import PerfilTaller from './PerfilTaller.jsx'

const path = window.location.pathname;
const isApp    = path.startsWith('/app');
const isTaller = path.startsWith('/taller/');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isApp ? <App /> : isTaller ? <PerfilTaller /> : <Landing />}
  </StrictMode>,
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Landing from './Landing.jsx'
import PerfilTaller from './PerfilTaller.jsx'

const path = window.location.pathname;
const isApp    = path.startsWith('/app');
const isTaller = path.startsWith('/taller/');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isApp ? <App /> : isTaller ? <PerfilTaller /> : <Landing />}
  </StrictMode>,
)
