import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
   //we have support of react reuter in our project
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
