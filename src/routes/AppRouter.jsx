import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import DashboardRouter from './DashboardRouter'
// import PublicRouter from './PublicRouter'
// import PrivateRouter from './PrivateRouter'
import OlvidarContrasena from '../pages/OlvidarContrasena'
import NotFound from '../components/notFound/NotFound'
import Login from '../pages/Login'
import PanelAdministrador from '../pages/PanelAdministrador'
import Calendario from '../components/cronograma/Calendario'
import CalendarioConFechaActual from '../pages/CalendarioDocente'
import CalendarioVisualizacion from '../components/cronograma/CalendarioVisualizacion'
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Navigate to="/" />}/>
          <Route path="/olvidar-contrasena" element={<OlvidarContrasena />}/>
          <Route path="/administrador" element={<PanelAdministrador />}/>
          <Route path="/cronograma" element={<CalendarioVisualizacion/>}/>
          <Route path="*" element={<NotFound />} />
      </Routes>
   </BrowserRouter>
  )
}

export default AppRouter