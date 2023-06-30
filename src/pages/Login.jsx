import React from "react";
import "../styles/Login.scss";
import logo from "../assets/images/logoBootcamp1.png";

const Login = () => {
  return (
    <div class="login-container">
      <div className="form">
        <h2>Sistema de Gestión de Aprendizaje</h2>
        <h5>Ingresa tus credenciales</h5>
        <form>
          <div className="form__input">
            <input type="text" placeholder="Número de documento" />
          </div>
          <div className="form__input">
            <input type="password" placeholder="Contraseña" />
          </div>
          <button type="submit">Ingresar</button>
          <div className="form__link_contrasena">
            <h6>¿Olvidaste tú contraseña?</h6>
          </div>
        </form>
      </div>
      <div className="sidebar">
        <div className="logo">
        <img src={logo}/>
        </div>
      </div>
    </div>
   
  );
};

export default Login;
