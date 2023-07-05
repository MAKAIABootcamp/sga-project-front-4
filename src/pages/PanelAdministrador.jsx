import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const PanelAdministrador = () => {
    // Define the validation schema using Yup
    const validationSchema = Yup.object({
      nombres: Yup.string().required('El nombre completo es obligatorio'),
      numDocumento: Yup.string().required('El número de documento es obligatorio')
      .min(3, "El documento debe contener al menos 3 caracteres.")
      .max(8, "El documento no puede contener más de 8 caracteres"),
      email: Yup.string().email('Debes ingresar un email').required('Este campo es obligatorio'),
      dirección: Yup.string().required('La dirección es obligatoria'),
      curso: Yup.string().required('El curso es obligatorio'),
      edad: Yup.string().required('La edad es obligatoria'),
    });

  return (
    <>
      <h1>Añadir estudiante</h1>
      <Formik
        initialValues={{ nombres: '', numDocumento: '', email: '', teléfono: '', dirección: '', curso: '', cohorte: '', edad: '' }}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <h4>Nombre completo</h4>
            <Field type="text" name="nombres" placeholder="Nombres" />
            <Field type="text" name="apellidos" placeholder="Apellidos" />
            <ErrorMessage
              name="nombres"
              component="div"
              style={{ color: 'red' }}
            />
            <ErrorMessage
              name="apellidos"
              component="div"
              style={{ color: 'red' }}
            />
          </div>

          <div>
            <h4>Documento</h4>
            <Field as="select" name="documento" >
              <option value="C.C.">C.C.</option>
              <option value="T.I.">T.I.</option>
              <option value="pep">PEP</option>
            </Field>
            <Field type="text" name="numDocumento" />
            <ErrorMessage
              name="numDocumento"
              component="div"
              style={{ color: 'red' }}
            />
          </div>

          <div>
            <h4>Email</h4>
            <Field type="email" name="email" placeholder="example@gmail.com" />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: 'red' }}
            />
          </div>

          <div>
            <h4>Número de teléfono</h4>
            <Field type="tel" name="teléfono" placeholder="Número de teléfono" />
            <ErrorMessage
              name="teléfono"
              component="div"
              style={{ color: 'red' }}
            />
          </div>

          <div>
            <h4>Dirección</h4>
            <Field type="text" name="dirección" placeholder="Cra 1 # 2 - 3 " /> <br />
            <Field type="text" name="ciudad" placeholder="Ciudad" />
            <ErrorMessage
              name="dirección"
              component="div"
              style={{ color: 'red' }}
            />
          </div>

          <div>
            <h4>Curso</h4>
            <Field as="select" name="curso" >
              <option value="frontend">Frontend.</option>
              <option value="backend">Backend</option>
              <option value="datos">Datos</option>
            </Field>
          </div>

          <div>
            <h4>Cohorte</h4>
            <Field type="number" name="cohorte" />
            <ErrorMessage
              name="cohorte"
              component="div"
              style={{ color: 'red' }}
            />
          </div>

          <div>
            <h4>Edad</h4>
            <Field type="number" name="edad" />
            <ErrorMessage
              name="edad"
              component="div"
              style={{ color: 'red' }}
            />
          </div>

          <button type="submit">Registro</button>
        </Form>
      </Formik>
    </>
  );
};

export default PanelAdministrador;
