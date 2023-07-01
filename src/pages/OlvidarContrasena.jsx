import React from "react";
import logo from "../assets/images/logo2.png";
import "../styles/login/Login.scss";

const OlvidarContrasena = () => {
  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      {/* <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4> */}
                      <h2 className="mt-1 mb-5 pb-1">
                        Sistema de Gestión Académica
                      </h2>
                    </div>
                    <form>
                      <h5 className="mt-1 mb-6 pb-1">
                        Ingresa correo electronico
                      </h5>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Correo electrónico"
                        />
                      </div>
                      <div
                        className="text-center pt-1 mb-5 pb-1"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                        >
                          RECUPERAR CONTRASEÑA
                        </button>
                        <a className="text-muted" href="#!">
                          Regresar al login
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="col-lg-6 d-flex align-items-center gradient-custom-2" 
                >
                  <div
                    className="text-white px-3 py-4 p-md-5 mx-md-4"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                   
                  >
                    <img src={logo}  style={{
                     maxWidth: '100%',
                     height: 'auto'
                    }} />
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

export default OlvidarContrasena;
