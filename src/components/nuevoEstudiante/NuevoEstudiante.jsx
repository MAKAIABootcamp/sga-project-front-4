import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "../../components/nuevoEstudiante/nuevoEstudiante.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addStudents } from "../../redux/actions/estudiantesActions";

const NuevoEstudiante = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .matches(/^[a-zA-Z\s]+$/, "El nombre debe contener solo letras.")
      .min(4, "El nombre debe contener al menos 4 caracteres."),
    lastname: Yup.string()
      .required("El apellido completo es obligatorio")
      .matches(/^[a-zA-Z\s]+$/, "El apellido  debe contener solo letras.")
      .min(4, "El apellido debe contener al menos 4 caracteres."),
    numeroDocumento: Yup.string()
      .required("El número de documento es obligatorio")
      .min(8, "El documento debe contener al menos 8 caracteres.")
      .max(10, "El documento no puede contener más de 10 caracteres"),
    telefono: Yup.string()
      .min(7, "El teléfono debe contener al menos 7 caracteres")
      .max(10, "El teléfono no puede contener más de 10 caracteres"),
    tipo_entrenamiento: Yup.string().required(
      "El entrenamiento es obligatorio"
    ),
    modulo: Yup.string().required("El módulo es obligatorio"),
    email: Yup.string()
      .email("Debes ingresar un email"),
    cohorte: Yup.number(),
  });
  const dispatch = useDispatch();

  const [participante, setParticipante] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipante((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(participante.tipoDocumento);
  };

  const handleAgregarEstudiantes = () => {
    if (
      participante.name &&
      participante.lastname &&
      participante.numeroDocumento &&
      participante.telefono &&
      participante.tipo_entrenamiento &&
      participante.modulo &&
      participante.email &&
      participante.cohorte
    ) {
      dispatch(addStudents("estudiantes", participante));
      Swal.fire(
        "Buen trabajo!",
        "El estudiante fue agregado con éxito!",
        "success"
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      Swal.fire(
        "Error",
        "Por favor, completa todos los campos obligatorios.",
        "error"
      );
    }
  };

  return (
    <main className="main">
      <h1 className="title_añadir_estudiante">Añadir estudiante</h1>
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          numeroDocumento: "",
          email: "",
          telefono: "",
          curso: "",
          cohorte: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleAgregarEstudiantes}
      >
        <Form>
          <div className="names">
            <h2>Nombre completo</h2>
            <Field
              type="text"
              name="name"
              placeholder="Nombres"
              value={participante.name || ""}
              onChange={handleChange}
            />
            <Field
              type="text"
              name="lastname"
              placeholder="Apellidos"
              value={participante.lastname || ""}
              onChange={handleChange}
            />
          </div>
          {!participante.name && (
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: " #87CEEB" }}
            />
          )}
          {!participante.lastname && (
            <ErrorMessage
              name="lastname"
              component="div"
              style={{ color: " #87CEEB" }}
            />
          )}

          <div className="document">
            <h2>Documento</h2>
            <select
              name="tipoDocumento"
              value={participante.tipoDocumento || ""}
              onChange={handleChange}
            >
              <option value>Selecciona tu tipo de documento</option>
              <option defaultValue="CC">C.C.</option>
              <option value="TI">T.I.</option>
              <option value="PEP">PEP</option>
            </select>
            <Field
              type="text"
              name="numeroDocumento"
              value={participante.numeroDocumento || ""}
              onChange={handleChange}
            />
          </div>
          {!participante.numeroDocumento && (
            <ErrorMessage
              name="numeroDocumento"
              component="div"
              style={{ color: " #87CEEB" }}
            />
          )}

          <div className="teléfono">
            <h2>Número de teléfono</h2>
            <Field
              type="tel"
              name="telefono"
              placeholder="Número de teléfono"
              value={participante.telefono || ""}
              onChange={handleChange}
            />
            <ErrorMessage
              name="telefono"
              component="div"
              style={{ color: "#87CEEB" }}
            />
          </div>

          <div className="entrenamiento">
            <h2>Entrenamiento</h2>
            <select
              name="tipo_entrenamiento"
              value={participante.tipo_entrenamiento || ""}
              onChange={handleChange}
            >
              <option defaultValue>Selecciona el entrenamiento</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Análisis de datos">Análisis de datos</option>
            </select>
          </div>
          <ErrorMessage
            name="tipo_entrenamiento"
            component="div"
            style={{ color: "hsl(201deg 66% 32%) 37%," }}
          />

          <div className="modulo">
            <h2>Módulo</h2>
            <select
              name="modulo"
              value={participante.modulo || ""}
              onChange={handleChange}
            >
              <option defaultValue>Selecciona el módulo</option>
              <option value="Fundamentos">Fundamentos</option>
              <option value="Profundización">Profundización</option>
            </select>
          </div>
          <ErrorMessage
            name="modulo"
            component="div"
            style={{ color: "hsl(201deg 66% 32%) 37%," }}
          />

          <div className="cohorte">
            <h2>Cohorte</h2>
            <Field
              type="number"
              name="cohorte"
              value={participante.cohorte || ""}
              onChange={handleChange}
            />
            <ErrorMessage
              name="cohorte"
              component="div"
              style={{ color: "#87CEEB" }}
            />
          </div>

          <div className="email">
            <h2>Email</h2>
            <Field
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={participante.email || ""}
              onChange={handleChange}
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "#87CEEB" }}
            />
          </div>

          <button
            type="submit"
            className="registro"
            onClick={handleAgregarEstudiantes}
          >
            Registro
          </button>
        </Form>
      </Formik>
    </main>
  );
};

export default NuevoEstudiante;
