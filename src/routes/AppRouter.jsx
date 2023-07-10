import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import DashboardRouter from './DashboardRouter'
// import PublicRouter from './PublicRouter'
// import PrivateRouter from './PrivateRouter'
import PerfilPage from '../pages/PerfilPage'
import AsistenciaPage from '../pages/AsistenciaPage'
import OlvidarContrasena from "../pages/OlvidarContrasena";
import NotFound from "../components/notFound/NotFound";
import Login from "../pages/Login";
import Cronograma from "../pages/Cronograma";
import Layout from "../components/layout/Layout";
import Panel from "../pages/Panel";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Navigate to="/" />}/>
          <Route path="/olvidar-contrasena" element={<OlvidarContrasena />}/>          
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Panel/>} />
          <Route path="/estudiantes" element={<PanelAdministrador />} />
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path='/perfil' element={<PerfilPage/>}/>
          <Route path='/asistencia' element={<AsistenciaPage/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
