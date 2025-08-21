import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// In React, <StrictMode> is a developer tool that helps you catch potential problems
//  in your application during development (it does not affect production build).
// StrictMode only runs in development, not in production.