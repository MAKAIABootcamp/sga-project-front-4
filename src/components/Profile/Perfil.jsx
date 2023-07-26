import { CgSlack } from "react-icons/Cg";
import { BsGithub } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { useState } from "react";
import ActualizarDatos from "./ActualizarDatos";
import DetallePerfil from "./DetallePerfil";
import "./StylesPerfil.scss";
import { useSelector } from "react-redux";


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
  const { user: loggedUser } = useSelector((store) => store.userReducer);
  console.log(loggedUser);
  return (
    <div className="perfil">
      <h3>Perfil</h3>
      <section>Home / Usuario / Perfil</section>
      <div className="perfil__contenido">
        <div className="perfil__img">
          <figure>
            <img
              src={loggedUser?.foto}
              alt={loggedUser?.nombre}
            />
          </figure>

          <h2 className="name">{loggedUser?.nombre}   {loggedUser?.apellido}</h2>
          <p style={{fontSize:'1.3rem'}}>{loggedUser?.rol}</p>
          <div className="icons">
            <a href={loggedUser?.salck}><CgSlack className="icon" /></a>
            <a href={loggedUser?.github}><BsGithub className="icon" /></a>
            <a href={loggedUser?.linkedin}> <BsLinkedin className="icon" /></a>
           
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
