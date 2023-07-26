import "./StylesDetallePerfil.scss";
import "./StylesActualizar.scss";
import { BsTrashFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import fileUpLoad from "../../services/fileUpload";
import { updateInfoUserAction } from "../../redux/actions/userActions";
import Swal from "sweetalert2";

const ActualizarDatos = () => {
  const { user: loggedUser } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nombre: "" || loggedUser?.nombre,
    sobremi: loggedUser?.sobremi || "",
    compania: loggedUser?.compania || "",
    trabajo: loggedUser?.trabajo || "",
    pais: loggedUser?.pais || "",
    direccion: loggedUser?.direccion || "",
    telefono: loggedUser?.telefono || "",
    email: loggedUser?.email || "",
    slack: loggedUser?.slack || "",
    linkedin: loggedUser?.linkedin || "",
    github: loggedUser?.github || "",
    foto: loggedUser?.foto || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    // Aquí puedes manejar la lógica de carga del archivo seleccionado
    console.log("Archivo seleccionado:", file);
    const avatarLink = await fileUpLoad(file);
    setFormData((prevFormData) => ({
      ...prevFormData,
      foto: avatarLink,
    }));
  };

  const handleClickEnviar = () => {
    dispatch(updateInfoUserAction(loggedUser?.id, formData));
    Swal.fire(
      'Buen trabajo!',
      'Tus datos fueron actualizados correctamente!',
      'success'
    )
  };
  return (
    <div className="detalle">
      <div className="actualizarDatos">
        <div className="actualizarDatos__image">
          <h4>Imagen de perfil</h4>
          <div>
            <img src={loggedUser?.foto} alt={loggedUser?.nombre} />

            <div className="actualizarDatos__image__btns">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button className="btn1" onClick={handleFileSelect}>
                <BsUpload style={{ color: "#fff", fontSize: "1.1rem" }} />
              </button>
              <button className="btn2">
                <BsTrashFill style={{ color: "#fff", fontSize: "1.1rem" }} />
              </button>
            </div>
          </div>
        </div>
        <form>
          <div>
            <label>Nombre Completo</label>
            <input
              type="text"
              defaultValue={loggedUser?.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
          </div>
          <div>
            <label>Sobre mi</label>
            <textarea
              rows="4"
              defaultValue={loggedUser?.sobremi}
              onChange={handleInputChange}
              name="sobremi"
            ></textarea>
          </div>
          <div>
            <label>Compañía</label>
            <input
              type="text"
              defaultValue={loggedUser?.compania}
              onChange={handleInputChange}
              name="compania"
            />
          </div>
          <div>
            <label>Trabajo</label>
            <input
              type="text"
              defaultValue={loggedUser?.trabajo}
              onChange={handleInputChange}
              name="trabajo"
            />
          </div>
          <div>
            <label>País</label>
            <input
              type="text"
              defaultValue={loggedUser?.pais}
              onChange={handleInputChange}
              name="pais"
            />
          </div>
          <div>
            <label>Dirección</label>
            <input
              type="text"
              defaultValue={loggedUser?.direccion}
              onChange={handleInputChange}
              name="direccion"
            />
          </div>
          <div>
            <label>Teléfono</label>
            <input
              type="text"
              defaultValue={loggedUser?.telefono}
              onChange={handleInputChange}
              name="telefono"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              defaultValue={loggedUser?.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div>
            <label>Slack</label>
            <input
              type="text"
              defaultValue={loggedUser?.slack}
              onChange={handleInputChange}
              name="slack"
            />
          </div>
          <div>
            <label>LinkedIn</label>
            <input
              type="text"
              defaultValue={loggedUser?.linkedin}
              onChange={handleInputChange}
              name="linkedin"
            />
          </div>
          <div>
            <label>GitHub</label>
            <input
              type="text"
              defaultValue={loggedUser?.github}
              onChange={handleInputChange}
              name="github"
            />
          </div>
        </form>
        <div className="actualizarDatos__btnSave">
          <button onClick={() => handleClickEnviar()} type="submit">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarDatos;
