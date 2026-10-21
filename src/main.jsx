import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Landing from './Landing.jsx'
import PerfilTaller from './PerfilTaller.jsx'
import Portal from './Portal.jsx'
import Blog from './Blog.jsx'

const path = window.location.pathname;
const isApp    = path.startsWith('/app');
const isTaller = path.startsWith('/taller/');
const isPortal = path.startsWith('/portal');
const isBlog   = path.startsWith('/blog');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isApp ? <App /> : isTaller ? <PerfilTaller /> : isPortal ? <Portal /> : isBlog ? <Blog /> : <Landing />}
  </StrictMode>,
)
