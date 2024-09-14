import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import {BrowserRouter} from 'react-router-dom'
import keys from '../keys.json';

const domain = keys["domain"]
const clientId = keys["clientId"]


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
   </Auth0Provider>
   </BrowserRouter>
  </StrictMode>,
)
