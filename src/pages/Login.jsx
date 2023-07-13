import React from "react";
import "../styles/login/Login.scss";
import logo from "../assets/images/Logo-Bootcamp.png";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .required("La contraseña es un campo obligatorio")
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .max(20, "La contraseña debe tener como máximo 20 caracteres.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
      ),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleToForgetPassword = () => {
    navigate("/olvidar-contrasena");
  };

  const handleToPanel = () => {
    navigate("/dashboard");
  };
  return (
    <section
      className="gradient-form"
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
                      <h2 className="mt-1 mb-5 pb-1 fw-bold">
                        Sistema de Gestión Académica
                      </h2>
                    </div>
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched, isValid }) => (
                        <Form>
                          <h5 className="mt-1 mb-6 pb-1">
                            Ingresa tus credenciales
                          </h5>
                          <div className="form-outline mb-4">
                            <Field
                              type="email"
                              id="form2Example11"
                              className={`form-control ${
                                errors.email && touched.email
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Correo electrónico"
                              name="email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                              render={(msg) => <div>{msg}</div>}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <Field
                              type="password"
                              id="form2Example22"
                              className={`form-control ${
                                errors.password && touched.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Contraseña"
                              name="password"
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                              render={(msg) => <div>{msg}</div>}
                            />
                          </div>
                          <div
                            className="text-center pt-1 mb-5 pb-1"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <button
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                              type="submit"
                              onClick={handleToPanel}
                              disabled={!isValid}
                            >
                              INGRESAR
                            </button>
                            <a
                              className="text-muted"
                              style={{ cursor: "pointer" }}
                              onClick={handleToForgetPassword}
                            >
                              ¿Olvidaste la contraseña?
                            </a>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div
                    className="text-white px-3 py-4 p-md-5 mx-md-4"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={logo}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
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

export default Login