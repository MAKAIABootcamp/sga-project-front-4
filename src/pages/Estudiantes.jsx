
import { Input } from "antd";
import { Modal } from "react-bootstrap";
import { Table, Popconfirm } from "antd";
import "../styles/admin_estudiantes/estudiantes.scss";
import NuevoEstudiante from "../components/nuevoEstudiante/NuevoEstudiante";
import { useEffect, useState } from "react";
import BotonesFiltrado from "../components/Asistencia/BtnFintrado/BotonesFiltrado";
import {
  deleteStudents,
  getStudents,
} from "../redux/actions/estudiantesActions";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
const { Search } = Input;
// const today = dayjs();
// import ButtonsFiltro from "../components/buttonsFiltro/ButtonsFiltro";
// import { utils, writeFileXLSX } from 'xlsx';
// import AdminEstudiantes from '../components/adminEstudiantes/AdminEstudiantes'

const Estudiantes = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();

  const arrayEstudiantes = useSelector(
    (store) => store.estudiantesReducer.arrCohorte
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleEliminarParticipante = async (key) => {
    try {
      await dispatch(deleteStudents("estudiantes", key));
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.filter((estudiante) => estudiante.key !== key)
      );
      Swal.fire(
        "Buen trabajo!",
        "El estudiante fue eliminado con éxito!",
        "success"
      );
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    dispatch(getStudents("estudiantes"));
  }, [dispatch]);

  useEffect(() => {
    const filtered = arrayEstudiantes.filter((user) =>
      Object.values(user).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  }, [searchTerm, arrayEstudiantes]);
  const onSearch = (value) => console.log(value);
  const selectionType = "checkbox";
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Tipo de documento",
      dataIndex: "tipoDocumento",
      key: "tipoDocumento",
    },
    {
      title: "Número de documento",
      dataIndex: "numeroDocumento",
      key: "numeroDocumento",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Entrenamiento",
      dataIndex: "tipo_entrenamiento",
      key: "tipo_entrenamiento",
    },
    {
      title: "Módulo",
      dataIndex: "modulo",
      key: "modulo",
    },
    {
      title: "Cohorte",
      dataIndex: "cohorte",
      key: "cohorte",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Acciones",
      dataIndex: "estado",
      render: (_, record) => (
        <Popconfirm
          title="¿Estás seguro de eliminar este estudiante?"
          onConfirm={() => handleEliminarParticipante(record.key)}
          okText="Sí"
          cancelText="Cancelar"
        >
          <MdDeleteForever />
          <CiEdit />
        </Popconfirm>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };


  // const exportFile = useCallback(() => {
  //   const ws = utils.json_to_sheet(students);
  //   const wb = utils.book_new();
  //   utils.book_append_sheet(wb, ws, 'Data');
  //   writeFileXLSX(wb, 'Prueba.xlsx');
  // }, [students]);

  return (
    <div className="estudiantes">
      <div className="infoAsistencia">
        <div className="totalidad">
          <p>
            Total de resultados: <span>{arrayEstudiantes.length}</span>
          </p>
        </div>

        <div className="">
          <div>
            <BotonesFiltrado />
          </div>
          <div className="search">
            <Search
              placeholder="Buscar participante"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={onSearch}
              enterButton
            />
            <button className="button__agg" onClick={handleOpenModal}>
              Agregar
            </button>
            {/* <button className="btnDescarga" onClick={exportFile}>
                <BsDownload />
              </button> */}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <NuevoEstudiante />
        <div className="container__button">
          <button className="button__cancelar" onClick={handleCloseModal}>
            Cancelar
          </button>
        </div>
      </Modal>

      <Table
        style={{ width: "5rem" }}
        className="tabla"
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={filteredUsers}
      />
    </div>
  );
};

export default Estudiantes;
