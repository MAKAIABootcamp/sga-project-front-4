import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import DashboardRouter from './DashboardRouter'
// import PublicRouter from './PublicRouter'
// import PrivateRouter from './PrivateRouter'
import PerfilPage from '../pages/PerfilPage'
import AsistenciaPage from '../pages/AsistenciaPage'
import OlvidarContrasena from "../pages/OlvidarContrasena";
import NotFound from "../components/notFound/NotFound";
import Login from "../pages/Login";
import PanelAdministrador from "../pages/PanelAdministrador";
import Cronograma from "../pages/Cronograma";
import Layout from "../components/layout/Layout";
import CalendarioConFechaActual from "../pages/CronogramaEstudiantes";
import RecursosEducativosDocente from "../pages/RecursosEducativosDocente";
import RecursosEducativos from "../components/recursosEducativos/client";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Navigate to="/" />}/>
          <Route path="/olvidar-contrasena" element={<OlvidarContrasena />}/>          
        <Route element={<Layout />}>
          <Route path="/estudiantes" element={<PanelAdministrador />} />
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path='/perfil' element={<PerfilPage/>}/>
          <Route path='/asistencia' element={<AsistenciaPage/>}/>
          <Route path="/cronogramaestudiante" element={<CalendarioConFechaActual/>} />
          <Route path="/recursoseducativos" element={<RecursosEducativosDocente/>}></Route>
          <Route path="/agregarrecursoseducativos/:tituloCurso" element={<RecursosEducativos />} />

        </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
