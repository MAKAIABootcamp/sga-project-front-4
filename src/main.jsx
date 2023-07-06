import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './routes/AppRouter.jsx'
import './styles/index.scss';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
