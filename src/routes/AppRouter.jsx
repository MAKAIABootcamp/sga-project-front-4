import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import DashboardRouter from './DashboardRouter'
// import PublicRouter from './PublicRouter'
// import PrivateRouter from './PrivateRouter'
import OlvidarContrasena from "../pages/OlvidarContrasena";
import NotFound from "../components/notFound/NotFound";
import Login from "../pages/Login";
import Cronograma from "../pages/Cronograma";
import Layout from "../components/layout/Layout";
import PanelSuperAdministrador from "../pages/PanelSuperAdministrador";
// import Panel from "../pages/Panel";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/olvidar-contrasena" element={<OlvidarContrasena />} />
        <Route element={<Layout />}>
          {/* <Route path="/dashboard" element={<Panel/>} /> */}
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path="/registro-administradores" element={<PanelSuperAdministrador />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
