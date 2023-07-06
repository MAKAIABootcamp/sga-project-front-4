import React from "react";
import "../styles/login/Login.scss";
import logo from "../assets/images/logo2.png";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const handleToForgetPassword = () => {
    navigate("/olvidar-contrasena");
  }

  const handleToPanel = () => {
    navigate("/cronograma");
  }
  return (
    <section className="gradient-form" style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h2 className="mt-1 mb-5 pb-1 fw-bold">Sistema de Gestión Académica</h2>
                    </div>
                    <form>
                      <h5 className="mt-1 mb-6 pb-1">Ingresa tus credenciales</h5>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Correo electrónico"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          placeholder="Contraseña"
                        />
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1" style={{display: 'flex', flexDirection: 'column'}}>
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                          onClick={handleToPanel}
                        >
                          INGRESAR
                        </button>
                        <a className="text-muted" style={{ cursor: 'pointer' }} onClick={handleToForgetPassword}>
                          ¿Olvidaste la contraseña?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4" style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                  <img src={logo} style={{
                     maxWidth: '100%',
                     height: 'auto'
                    }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   
  );
};

export default Login;
