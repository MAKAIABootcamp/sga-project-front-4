import React, { useEffect, useState } from "react";
import "../../styles/form_register_admin/formRegisterAdmin.scss";
import { Button, Modal } from "react-bootstrap";
import { addAdmin, getAdmin } from "../../services/getAdmin";

const FormRegisterAdmin = () => {
  
    const [administradores, setAdministradores] = useState({});

      const handleChange= e => {
        const {name, value} = e.target;
        setAdministradores(preveState=>({
          ...preveState,
          [name]: value
        }))
        console.log(administradores)
      }
    
    const handleAgregarAdmin = () => {
      addAdmin(administradores)
        .then((response) => {
          console.log('Administrador agregado:', response);
        })
        .catch((error) => {
          console.error('Error al agregar administrador:', error);
        });


    };
  return (
    <section className="container__form">
      <form className="formularioAdmin">
        <div className="formularioAdmin__title">
          <h4>¡Registra los administradores del sistema!</h4>
        </div>
        <div className="formularioAdmin__labels">
          <div className="formularioAdmin__inputs">
            <h5>Nombre Completo</h5>
            <input type="text" name="nombre_completo"  value={administradores.nombre_completo} onChange={handleChange} />
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Tipo de documento</h5>
            <select className="select"  name="tipo_documento" value={administradores.tipo_documento} onChange={handleChange}>
              <option selected>Selecciona tu tipo de documento</option>
              <option >Cédula</option>
              <option >Two</option>
            </select>
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Número de documento</h5>
            <input type="number" name="numero_documento"   value={administradores.numero_documento} onChange={handleChange}/>
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Email</h5>
            <input type="email" name="email"  value={administradores.email} onChange={handleChange} />
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Contraseña</h5>
            <input type="password" name="contraseña"   value={administradores.contraseña} onChange={handleChange}/>
          </div>
          <div class="form-check">
            <h5>Rol</h5>
            <input
              class="form-check-input"
              type="radio"
              name="rol"
              value="administrador"
              checked={administradores.rol === "administrador"}
              onChange={handleChange}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Administrador
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="rol"
              value="default"
              checked={administradores.rol === "default"}
              onChange={handleChange}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Default radio
            </label>
          </div>
          <div>
          <Button onClick={handleAgregarAdmin}>Agregar administrador</Button>
          </div>
        </div>
      </form>
    </section>
  );
};


export default FormRegisterAdmin;
