import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "../../components/nuevoEstudiante/nuevoEstudiante.scss"
// import { Button, Input } from 'semantic-ui-react'

const NuevoEstudiante = () => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    nombres: Yup.string().required("El nombre completo es obligatorio"),
    apellidos: Yup.string().required("El apellido completo es obligatorio"),
    numDocumento: Yup.string()
      .required("El número de documento es obligatorio")
      .min(8, "El documento debe contener al menos 8 caracteres.")
      .max(10, "El documento no puede contener más de 10 caracteres"),
    teléfono: Yup.string()
      .required("El número telefónico es obligatorio")
      .min(7, "El teléfono debe contener al menos 7 caracteres")
      .max(10, "El teléfono no puede contener más de 10 caracteres"),
    email: Yup.string()
      .email("Debes ingresar un email")
      .required("El e-mail es obligatorio"),
    dirección: Yup.string().required("La dirección es obligatoria"),
    ciudad: Yup.string().required("La ciudad es obligatoria"),
    curso: Yup.string().required("El curso es obligatorio"),
    cohorte: Yup.string().required("La cohorte es obligatorio"),
    edad: Yup.string().required("La edad es obligatoria"),
  });

  const handleSubmit = () => {
    Swal.fire({
      icon: 'success',
      title: 'Participante creado exitosamente',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      // navigate('/');
    }).catch((error) => {
      // Manejar errores en caso de que ocurra un problema durante el registro del usuario
      console.log(error);
    });
  };

  return (
    <main className="main">
      <h1 className="title_añadir_estudiante">Añadir estudiante</h1>
      <Formik
        initialValues={{
          nombres: "",
          apellidos: "",
          numDocumento: "",
          email: "",
          teléfono: "",
          dirección: "",
          ciudad: "",
          curso: "",
          cohorte: "",
          edad: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="names">
          <h2>Nombre completo</h2>
            <Field type="text" name="nombres" placeholder="Nombres" />
            <Field type="text" name="apellidos" placeholder="Apellidos" /> 
          </div>
            <ErrorMessage
              name="nombres"
              component="div"
              style={{ color: "yellow" }}
            />
            <ErrorMessage
              name="apellidos"
              component="div"
              style={{ color: "yellow" }}
            />

          <div className="document">
          <h2>Documento</h2>
            <Field as="select" name="documento">
              <option value="C.C.">C.C.</option>
              <option value="T.I.">T.I.</option>
              <option value="pep">PEP</option>
            </Field>
            <Field type="text" name="numDocumento" />
            </div>
            <ErrorMessage
              name="numDocumento"
              component="div"
              style={{ color: "yellow" }}
            />

          <div className="email">
          <h2>Email</h2>
            <Field type="email" name="email" placeholder="example@gmail.com" />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "yellow" }}
            />
          </div>

          <div className="teléfono">
          <h2>Número de teléfono</h2>
            <Field
              type="tel"
              name="teléfono"
              placeholder="Número de teléfono"
            />
            <ErrorMessage
              name="teléfono"
              component="div"
              style={{ color: "yellow" }}
            />
          </div>

          <div className="dirección">
          <h2>Dirección</h2>
            <Field
              type="text"
              name="dirección"
              placeholder="Cra 1 # 2 - 3 "
            />{" "}
            <br />
            <Field type="text" name="ciudad" placeholder="Ciudad" />
            </div>
            <ErrorMessage
              name="dirección"
              component="div"
              style={{ color: "yellow" }}
            />
            <ErrorMessage
              name="ciudad"
              component="div"
              style={{ color: "yellow" }}
            />

          <div className="curso">
            <h2>Curso</h2>
            <Field as="select" name="curso">
              <option value="frontend">Frontend.</option>
              <option value="backend">Backend</option>
              <option value="datos">Datos</option>
            </Field>
          </div>

          <div className="cohorte">
            <h2>Cohorte</h2>
            <Field type="number" name="cohorte" />
            <ErrorMessage
              name="cohorte"
              component="div"
              style={{ color: "yellow" }}
            />
          </div>

          <div className="edad">
            <h2>Edad</h2>
            <Field type="number" name="edad" />
            <ErrorMessage
              name="edad"
              component="div"
              style={{ color: "yellow" }}
            />
          </div>

          <button type="submit" className="registro">Registro</button>
        </Form>
      </Formik>
    </main>
  );
};

export default NuevoEstudiante;
