import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './UserContext.jsx'; // Importez le UserProvider
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* Ajoutez cette ligne */}
      <App />
    </UserProvider> {/* Et celle-ci */}
  </React.StrictMode>,
)

