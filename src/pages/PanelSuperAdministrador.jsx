import React, { useEffect, useState} from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "../styles/super-administrador/SuperAdmin.scss";
import { Button, Modal } from "react-bootstrap";
import FormRegisterAdmin from "../components/form_register_admin/FormRegisterAdmin";
import { getAdmin } from "../services/getAdmin"


const PanelSuperAdministrador = () => {
  const [showModal, setShowModal] = useState(false);
  const [administradores, setAdministradores] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    getAdmin().then((data) => {
      setAdministradores(data);
    });
  }, []);

 
  return (
    <main id="main" className="main__panel">
      <div>
        <button className="buttons" onClick={handleOpenModal}>
          Agregar
        </button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Body
            closeButton
            style={{
              backgroundImage: `url(https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/03/Software-Developer-Programming-Computer.jpeg?fit=1200%2C801&quality=50&strip=all&ssl=1)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <FormRegisterAdmin />
            <div className="container__buttons">
            <Button variant="danger" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button>Agregar administrador</Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      
      <table className="table ">
        <thead>
          <tr >
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo de documento</th>
            <th scope="col"># documento</th>
            <th scope="col">E-mail</th>
            <th scope="col">Contraseña</th>
            <th scope="col">Rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {administradores.map((admin, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{admin.nombre_completo}</td>
      <td>{admin.tipo_documento}</td>
      <td>{admin.numero_documento}</td>
      <td>{admin.email}</td>
      <td>{admin.contraseña}</td>
      <td>{admin.rol}</td>
      <td>
        <MdDeleteForever />
        <CiEdit />
      </td>
          </tr>
        ))}
        </tbody>
      </table>
    </main>
  );
};

export default PanelSuperAdministrador;
