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
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Box, CircularProgress } from "@mui/material";

const AppRouter = () => {
  // useEffect(() => {
  // crearUsuario();
  // }, [])
  // const crearUsuario = async () => {
  //   const email = "jhonmariocartagena@gmail.com";
  //   const password="123456"
  //   try {
  //     const { user } = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     console.log(user);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [checking, setCheking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  const { user } = useSelector((store) => store.userReducer);
  console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setCheking(false);
    });
  }, [setIsLoggedIn, setCheking]);

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
            {/* MODULOS DE PANEL DE ADMINISTRADOR */}
            <Route path="/estudiantes" element={<Estudiantes />} />
            <Route path="/cronograma" element={<Cronograma />} />
            <Route path="/perfil" element={<PerfilPage />} />
            {/* MODULO REGISTRO SUPER ADMINISTRADOR */}
            <Route
              path="/registro-administradores"
              element={<PanelSuperAdministrador />}
            />
            {/* MODULO DE FORMADOR*/}
            <Route path="/asistencia" element={<AsistenciaPage />} />
            <Route path="/calificaciones" element={<Calificaiones />} />
            {/* MODULO DE ESTUDIANTE*/}
            <Route path="/plan" element={<PlanDeEstudios />} />
            <Route path="/notas" element={<Notas />} />
            <Route path="/recursos" element={<RecursosEstudiantes />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
