import { Route, Routes } from "react-router-dom";
import PanelAdministrador from "../pages/PanelAdministrador";
import Estudiantes from "../pages/Estudiantes";
import Cronograma from "../pages/Cronograma";
import Perfil from "../pages/Perfil";

const DashboardRouter = () => {
    return (
      <Routes>
        {/* <Route path={"/administrador"} element={<PanelAdministrador/>} />
        <Route path={"/administrador/estudiantes"} element={<Estudiantes/>} />
        <Route path={"/administrador/cronograma"} element={<Cronograma/>} />
        <Route path={"/administrador/perfil"} element={<Perfil/>} /> */}
        {/* <Route path={"/restaurant/:id"} element={<Restaurant/>}>
          <Route path={"/dish/:id"} element={<Dish/>}/>
        </Route> */}
      </Routes>
    );
  };
  
  export default DashboardRouter;