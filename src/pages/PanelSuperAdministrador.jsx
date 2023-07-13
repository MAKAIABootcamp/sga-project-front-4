import React, { useEffect, useState} from "react";
import { MdDeleteForever } from "react-icons/md";
import { GrSearch } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import "../styles/super-administrador/SuperAdmin.scss";
import { Button, Modal } from "react-bootstrap";
import FormRegisterAdmin from "../components/form_register_admin/FormRegisterAdmin";
import { getAdmin, deleteAdmin } from "../services/getAdmin"
import { listAdmin } from "../redux/actions/adminRegisterAction";
import { useDispatch, useSelector } from "react-redux";


const PanelSuperAdministrador = () => {
  const [showModal, setShowModal] = useState(false);
  const [administrador, setAdministradores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAdministradores, setFilteredAdministradores] = useState([]);
  
  const dispatch = useDispatch();
  
  const administradores = useSelector((store) => store.adminRegisterReducer.administradores);
  console.log("eventos desde page estudiantes", administradores);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  useEffect(() => {
    dispatch(listAdmin("administradores"));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filteredData = administradores.filter((admin) =>
        Object.values(admin).some((value) =>
          (value || "").toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredAdministradores(filteredData);
    } else {
      setFilteredAdministradores(administradores);
    }
  }, [searchQuery, administradores]);
  
  

  const handleEliminarAdmin = (id) => {
    deleteAdmin(id)
      .then((response) => {
        console.log('Administrador eliminado:', response);
        // Actualizar la lista de administrador después de eliminar uno con éxito
        getAdmin().then((data) => {
          setAdministradores(data);
        });
      })
      .catch((error) => {
        console.error('Error al eliminar administrador:', error);
      });
  };

  

  return (
    <main id="main" className="main__panel">
      
      <div>
        <div className="container__inputs">
        <button className="buttons" onClick={handleOpenModal}>
          Agregar
        </button>
        <input
          type="text"
          name="search"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleChange}
          className="filter__search"
          
          />
          <div className="contenedor__icon_search">
            
          <GrSearch/>
          </div>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Body
            closeButton
            style={{
              
              backgroundColor:"#03203A"
            }}
          >
            <FormRegisterAdmin />
            <div className="container__buttons">
            <Button variant="danger" onClick={handleCloseModal}>
              Cancelar
            </Button>

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
        {filteredAdministradores.map((admin, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{admin.nombre_completo}</td>
      <td>{admin.tipo_documento}</td>
      <td>{admin.numero_documento}</td>
      <td>{admin.email}</td>
      <td>{admin.contraseña.toString().replace(/./g, "*")}</td>
      <td>{admin.rol}</td>
      <td>
        <MdDeleteForever onClick={() => handleEliminarAdmin(admin.id)}/>
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
