import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import DashboardRouter from './DashboardRouter'
// import PublicRouter from './PublicRouter'
// import PrivateRouter from './PrivateRouter'
import PerfilPage from "../pages/PerfilPage";
import AsistenciaPage from "../pages/AsistenciaPage";
import OlvidarContrasena from "../pages/OlvidarContrasena";
import NotFound from "../components/notFound/NotFound";
import Login from "../pages/Login";
import Cronograma from "../pages/Cronograma";
import Layout from "../components/layout/Layout";
import Panel from "../pages/Panel";
import Estudiantes from "../pages/Estudiantes";
import PanelSuperAdministrador from "../pages/PanelSuperAdministrador";
import PlanDeEstudios from "../pages/PlanDeEstudios";
import Notas from "../pages/Notas";
import RecursosEstudiantes from "../pages/RecursosEstudiantes";
import Calificaiones from "../components/Calificaciones/Calificaiones";
import {
  //createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import { useSelector, useDispatch } from "react-redux";
//import { Spinner } from "react-bootstrap";
import { Box, CircularProgress } from "@mui/material";
import SuperAdminRouter from "./SuperAdminRouter";
import { keepInfoUserAction } from "../redux/actions/userActions";
import AdminRouter from "./AdminRouter";
import FormadorRoute from "./FormadorRouter";
import EstudiantesRoute from "./EstudianteRoutes";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setCheking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  const { user: loggedUser } = useSelector((store) => store.userReducer);
  console.log(loggedUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);
        if (!loggedUser) {
          dispatch(keepInfoUserAction(user.email));
        }
      } else {
        setIsLoggedIn(false);
      }
      setCheking(false);
    });
  }, [setIsLoggedIn, setCheking, dispatch, loggedUser]);

  if (checking) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route element={<PublicRouter isAutentication={isLoggedIn} />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/olvidar-contrasena" element={<OlvidarContrasena />} />
        </Route>
        {/* RUTAS PRIVADAS */}
        <Route element={<PrivateRouter isAutentication={isLoggedIn} />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Panel />} />
            <Route path="/perfil" element={<PerfilPage />} />
            {/* MODULOS DE PANEL DE ADMINISTRADOR */}
            <Route element={<AdminRouter userType={loggedUser?.rol} />}>
              <Route path="/estudiantes" element={<Estudiantes />} />


            </Route>

            <Route element={<FormadorRoute userType={loggedUser?.rol} />}>
              <Route path="/calificaciones" element={<Calificaiones />} />
              <Route path="/asistencia" element={<AsistenciaPage />} />
              <Route path="/cronograma" element={<Cronograma />} />
              <Route path="/recursos" element={<RecursosEstudiantes />} />
            </Route>

            <Route element={<EstudiantesRoute userType={loggedUser?.rol} />}>
              <Route path="/notas" element={<Notas />} />
              <Route path="/plan" element={<PlanDeEstudios />} />
            </Route>

            {/* MODULO DE FORMADOR*/}


            {/* MODULO DE ESTUDIANTE*/}

            {/* MODULO REGISTRO SUPER ADMINISTRADOR */}
            <Route element={<SuperAdminRouter userType={loggedUser?.rol} />}>
              <Route
                path="/registro-administradores"
                element={<PanelSuperAdministrador />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
