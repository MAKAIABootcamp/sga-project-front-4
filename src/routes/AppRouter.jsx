import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import DashboardRouter from './DashboardRouter'
// import PublicRouter from './PublicRouter'
// import PrivateRouter from './PrivateRouter'
import OlvidarContrasena from "../pages/OlvidarContrasena";
import NotFound from "../components/notFound/NotFound";
import Login from "../pages/Login";
import PanelAdministrador from "../pages/PanelAdministrador";
import Cronograma from "../pages/Cronograma";
import Layout from "../components/layout/Layout";
import PanelSuperAdministrador from "../pages/PanelSuperAdministrador";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/olvidar-contrasena" element={<OlvidarContrasena />} />
        <Route element={<Layout />}>
          <Route path="/administrador" element={<PanelAdministrador />} />
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path="/resgistro-administradores" element={<PanelSuperAdministrador />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
