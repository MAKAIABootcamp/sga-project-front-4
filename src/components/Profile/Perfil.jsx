import { CgSlack } from "react-icons/Cg";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { useState } from "react";
import ActualizarDatos from "./ActualizarDatos";
import DetallePerfil from "./DetallePerfil";
import "./StylesPerfil.scss";


const Perfil = () => {
  const [mostrarActualizar, setMostrarActualizar] = useState(false);
  const [botonSeleccionado, setBotonSeleccionado] = useState("detalle");

  const handleClickActualizarDatos = () => {
    setMostrarActualizar(true);
    setBotonSeleccionado("actualizar");
  };

  const handleClikMostrarDetalle = () => {
    setMostrarActualizar(false);
    setBotonSeleccionado("detalle");
  };

  return (
    <div className="perfil">
      <h3>Perfil</h3>
      <section>Home / Usuario / Perfil</section>
      <div className="perfil__contenido">
        <div className="perfil__img">
          <figure>
            <img
              src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/profile-img.jpg"
              alt="Usuario"
            />
          </figure>

          <h2 className="name">Kevin Anderson</h2>
          <p style={{fontSize:'1.3rem'}}>Administrador</p>
          <div className="icons">
            <CgSlack className="icon" />
            <BsGithub className="icon" />
            <BsLinkedin className="icon" />
          </div>
        </div>
        <div className="perfil__info">
          <div className="perfil__info__buttons">
            <button
              onClick={() => handleClikMostrarDetalle()}
              style={{
                color: botonSeleccionado === "detalle" ? "#4154f1" : "",
                borderBottom: botonSeleccionado === 'detalle' ? '2px solid #4154f1' : '',
              }}
            >
              Detalles
            </button>
            <button onClick={() => handleClickActualizarDatos()}
            style={{
              color: botonSeleccionado === "actualizar" ? "#4154f1" : "",
              borderBottom: botonSeleccionado === 'actualizarj' ? '2px solid #4154f1' : '',
            }}
            >
              Actualizar Datos
            </button>
          </div>
          <hr />
          <div>
            {mostrarActualizar ? <ActualizarDatos /> : <DetallePerfil />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
