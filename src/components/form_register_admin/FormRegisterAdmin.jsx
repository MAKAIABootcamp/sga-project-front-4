import React, { useEffect, useState } from "react";
import "../../styles/form_register_admin/formRegisterAdmin.scss";

const FormRegisterAdmin = () => {
    const [administradores, setAdministradores] = useState({
        contraseña: "",
        email: "",
        id: "",
        nombre_completo: "",
        numero_documento: "",
        rol: "",
        tipo_documento: "",
      });

      const handleChange= e => {
        const {name, value} = e.target;
        setAdministradores(preveState=>({
          ...preveState,
          [name]: value
        }))
        console.log(administradores)
      }
    
  return (
    <section className="container__form">
      <form className="formularioAdmin">
        <div className="formularioAdmin__title">
          <h4>¡Registra los administradores del sistema!</h4>
        </div>
        <div className="formularioAdmin__labels">
          <div className="formularioAdmin__inputs">
            <h5>Nombre Completo</h5>
            <input type="text" name="nombre_completo" onChange={handleChange} />
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Tipo de documento</h5>
            <select className="select">
              <option selected>Selecciona tu tipo de documento</option>
              <option value="1">Cédula</option>
              <option value="2">Two</option>
            </select>
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Número de documento</h5>
            <input type="text" name="numero_documento" onChange={handleChange} />
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Email</h5>
            <input type="text" name="email"  onChange={handleChange}/>
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Contraseña</h5>
            <input type="password" name="contraseña" onChange={handleChange} />
          </div>
          <div class="form-check">
            <h5>Rol</h5>
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Administrador
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Default radio
            </label>
          </div>
        </div>
      </form>
    </section>
  );
};


export default FormRegisterAdmin;
