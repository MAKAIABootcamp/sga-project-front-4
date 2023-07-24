import "./StylesDetallePerfil.scss";
import "./StylesActualizar.scss";
import { BsTrashFill } from "react-icons/bs";
import { useRef } from "react";
import { BsUpload } from 'react-icons/bs';
import { useSelector } from "react-redux";

const ActualizarDatos = () => {

  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Aquí puedes manejar la lógica de carga del archivo seleccionado
    console.log('Archivo seleccionado:', file);
  };

  const { user: loggedUser } = useSelector((store) => store.userReducer);
  console.log(loggedUser);
  return (
    <div className="detalle">
      <div className="actualizarDatos">
        <div className="actualizarDatos__image">
          <h4>Imagen de perfil</h4>
          <div>
            <img
              src={loggedUser?.foto}
              alt={loggedUser?.nombre}
            />

            <div className="actualizarDatos__image__btns">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
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
            <input type="text" value={"Kevin Anderson"} />
          </div>
          <div>
            <label>Sobre mi</label>
            <textarea

              rows="4"
              value={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, illum magni consequatur ab possimus non debitis iure eum temporibus facere ducimus quidem neque perspiciatis, atque dolore fuga inventore commodi expedita?"
              }
            ></textarea>
          </div>
          <div>
            <label>Compañía</label>
            <input type="text" value={"Makaia"} />
          </div>
          <div>
            <label>Trabajo</label>
            <input type="text" value={"Web Designer"} />
          </div>
          <div>
            <label>País</label>
            <input type="text" value={"Colombia"} />
          </div>
          <div>
            <label>Dirección</label>
            <input type="text" value={"Calle falsa 123"} />
          </div>
          <div>
            <label>Teléfono</label>
            <input type="text" value={"(436) 486-3538x29071"} />
          </div>
          <div>
            <label>Email</label>
            <input type="text" value={"k.anderson@example.com"} />
          </div>
          <div>
            <label>Slack</label>
            <input type="text" value={"https://slack.com/#"} />
          </div>
          <div>
            <label>LinkedIn</label>
            <input type="text" value={"https://linkedin.com/#"} />
          </div>
        </form>
        <div className="actualizarDatos__btnSave">
          <button type="submit">Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarDatos;
