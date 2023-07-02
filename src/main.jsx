import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './routes/AppRouter.jsx'
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
