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
import Estudiantes from "../pages/Estudiantes";
import PanelSuperAdministrador from "../pages/PanelSuperAdministrador";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PUBLICAS */}
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Navigate to="/" />}/>
          <Route path="/olvidar-contrasena" element={<OlvidarContrasena />}/>  
        {/* RUTAS PRIVADAS */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Panel/>} />
          {/* MODULOS DE PANEL DE ADMINISTRADOR */}
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path='/perfil' element={<PerfilPage/>}/>
          {/* MODULO REGISTRO SUPER ADMINISTRADOR */}
          <Route path="/registro-administradores" element={<PanelSuperAdministrador />} />
          {/* MODULO DE  FORMADOR*/}
          <Route path='/asistencia' element={<AsistenciaPage/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
