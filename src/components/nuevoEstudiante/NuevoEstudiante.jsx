import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "../../components/nuevoEstudiante/nuevoEstudiante.scss";
import { useDispatch,} from "react-redux";
import { useState } from "react";
import { addStudents } from "../../redux/actions/estudiantesActions";
// import { Button, Input } from 'semantic-ui-react'

const NuevoEstudiante = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre completo es obligatorio"),
    lastname: Yup.string().required("El apellido completo es obligatorio"),
    numeroDocumento: Yup.string()
      .required("El número de documento es obligatorio")
      .min(8, "El documento debe contener al menos 8 caracteres.")
      .max(10, "El documento no puede contener más de 10 caracteres"),
      telefono: Yup.string()
      .required("El número telefónico es obligatorio")
      .min(7, "El teléfono debe contener al menos 7 caracteres")
      .max(10, "El teléfono no puede contener más de 10 caracteres"),
      tipo_entrenamiento: Yup.string().required("El entrenamiento es obligatorio"),
    modulo: Yup.string().required("El módulo es obligatorio"),
    email: Yup.string()
      .email("Debes ingresar un email")
      .required("El e-mail es obligatorio"),
    cohorte: Yup.number().required("La cohorte es obligatorio"),
    estado: Yup.string().required("el estado es obligatorio"),
  });
  const dispatch = useDispatch();

  const [participante, setParticipante] = useState({});
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipante((preveState) => ({
      ...preveState,
      [name]: value,
    }));
    console.log(participante);
  };
  
  const handleSubmit = () => {
    Swal.fire({
      icon: "success",
      title: "Participante creado exitosamente",
      showConfirmButton: false,
      timer: 1500,
    })
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAgregarEstudiantes =  () => {
    dispatch(addStudents("estudiantes", participante));
    Swal.fire(
      'Buen trabajo!',
      'El administrador fue agregado con éxito!',
      'success'
    )
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }


  return (
    <main className="main">
      <h1 className="title_añadir_estudiante">Añadir estudiante</h1>
      <Formik
        initialValues={{
          nombres: "",
          apellidos: "",
          numeroDocumento: "",
          email: "",
          teléfono: "",
          dirección: "",
          ciudad: "",
          curso: "",
          cohorte: 0,
          edad: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="names">
            <h2>Nombre completo</h2>
            <Field type="text" name="name" placeholder="Nombres"  value={participante.name}
              onChange={handleChange} />
            <Field type="text" name="lastname" placeholder="Apellidos" value={participante.lastname}
              onChange={handleChange}/>

          </div>
          <ErrorMessage
            name="name"
            component="div"
            style={{ color: " #87CEEB" }}
          />
          <ErrorMessage
            name="lastname"
            component="div"
            style={{ color: "#87CEEB" }}
          />

          <div className="document">
            <h2>Documento</h2>
            <Field as="select" name="tipoDocumento" value={participante.tipoDocumento}
              onChange={handleChange}>
              <option value="C.C.">C.C.</option>
              <option value="T.I.">T.I.</option>
              <option value="pep">PEP</option>
            </Field>
            <Field type="text" name="numeroDocumento"   value={participante.numeroDocumento}
              onChange={handleChange}/>
          </div>
          <ErrorMessage
            name="numeroDocumento"
            component="div"
            style={{ color: "#87CEEB" }}
          />

          <div className="teléfono">
            <h2>Número de teléfono</h2>
            <Field
              type="tel"
              name="telefono"
              placeholder="Número de teléfono"
              value={participante.telefono}
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
            <Field as="select" name="tipo_entrenamiento"  value={participante.tipo_entrenamiento}
              onChange={handleChange}>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Analisis de datos">Analisis de datos</option>
            </Field>
          </div>
          <ErrorMessage
            name="tipo_entrenamiento"
            component="div"
            style={{ color: "hsl(201deg 66% 32%) 37%," }}
          />

          <div className="modulo">
            <h2>Módulo</h2>
            <Field as="select" name="modulo" value={participante.modulo}
              onChange={handleChange}>
              <option value="Fundamentos">Fundamentos</option>
              <option value="Profundización">Profundización</option>
            </Field>
          </div>
          <ErrorMessage
            name="modulo"
            component="div"
            style={{ color: "hsl(201deg 66% 32%) 37%," }}
          />

          <div className="cohorte">
            <h2>Cohorte</h2>
            <Field type="number" name="cohorte" value={participante.cohorte}
              onChange={handleChange} />
            <ErrorMessage
              name="cohorte"
              component="div"
              style={{ color: "#87CEEB" }}
            />
          </div>

          <div className="email">
            <h2>Email</h2>
            <Field type="email" name="email" placeholder="example@gmail.com"  value={participante.email}
              onChange={handleChange} />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "#87CEEB" }}
            />
          </div>


          {/* <div className="estado">
            <h2>Estado</h2>
            <Field type="text" name="estado" />
            <ErrorMessage
              name="estado"
              component="div"
              style={{ color: "#87CEEB"  }}
            />
          </div> */}

          <button type="submit" className="registro" onClick={handleAgregarEstudiantes}>
            Registro
          </button>
        </Form>
      </Formik>
    </main>
  );
};

export default NuevoEstudiante;
