import React, { useEffect, useState } from "react";
import "../../styles/form_register_admin/formRegisterAdmin.scss";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin } from "../../redux/actions/adminRegisterAction";
import { AiOutlineEye } from "react-icons/ai";
import Swal from "sweetalert2";
const FormRegisterAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin] = useState({});
  const dispatch = useDispatch();

  const administradores = useSelector(
    (store) => store.adminRegisterReducer.admin
  );
  console.log("eventos desde page estudiantes", administradores);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((preveState) => ({
      ...preveState,
      [name]: value,
    }));
    console.log(admin);
  };
  const handleAgregarAdmin =  () => {
      dispatch(addAdmin("administradores", admin));
      Swal.fire(
        'Buen trabajo!',
        'El administrador fue agregado con éxito!',
        'success'
      )
      setTimeout(() => {
        window.location.reload();
      }, 1000);
   
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
            <input
              type="text"
              name="nombre_completo"
              value={admin.nombre_completo}
              onChange={handleChange}
            />
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Tipo de documento</h5>
            <select
              className="select__form_register"
              name="tipo_documento"
              value={admin.tipo_documento}
              onChange={handleChange}
            >
              <option selected>Selecciona tu tipo de documento</option>
              <option>Cédula</option>
              <option>Two</option>
            </select>
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Número de documento</h5>
            <input
              type="number"
              name="numero_documento"
              value={admin.numero_documento}
              onChange={handleChange}
            />
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Email</h5>
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleChange}
            />
          </div>
          <div className="formularioAdmin__inputs">
            <h5>Contraseña</h5>
            <input
              type={showPassword ? "text" : "password"}
              name="contraseña"
              value={admin.contraseña}
              onChange={handleChange}
            />
            <div className="icon__password">
              <AiOutlineEye
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <div class="form-check">
            <h5>Rol</h5>
            <input
              class="form-check-input"
              type="radio"
              name="rol"
              value="administrador"
              checked={admin.rol === "administrador"}
              onChange={handleChange}
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Administrador
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
