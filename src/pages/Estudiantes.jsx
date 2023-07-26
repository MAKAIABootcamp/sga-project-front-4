import dayjs from "dayjs";
import { Input } from "antd";
import { Modal, Button } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";
import { Table, Popconfirm } from "antd";
import { Progress } from "antd";
import "../styles/admin_estudiantes/estudiantes.scss";
import NuevoEstudiante from "../components/nuevoEstudiante/NuevoEstudiante";
import { useCallback, useEffect, useState } from "react";
import BotonesFiltrado from "../components/Asistencia/BtnFintrado/BotonesFiltrado";
import { deleteStudents, getStudents } from "../redux/actions/estudiantesActions";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
// import ButtonsFiltro from "../components/buttonsFiltro/ButtonsFiltro";
// import { utils, writeFileXLSX } from 'xlsx';
const { Search } = Input;
const today = dayjs();
// import AdminEstudiantes from '../components/adminEstudiantes/AdminEstudiantes'

const Estudiantes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [students, setEstudents] = useState([]);

  // const estudiantes = useSelector((store) => store.estudiantesReducer.estudiantes);
  // console.log("estudiantes desde page estudiantes", estudiantes);

  const arrayEstudiantes = useSelector((store) => store.estudiantesReducer.arrCohorte)

  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  // const exportFile = useCallback(() => {
  //   const ws = utils.json_to_sheet(students);
  //   const wb = utils.book_new();
  //   utils.book_append_sheet(wb, ws, 'Data');
  //   writeFileXLSX(wb, 'Prueba.xlsx');
  // }, [students]);


  useEffect(() => {
    dispatch(getStudents("estudiantes"))
  }, [dispatch]);

  const handleEliminarParticipante = (id) => {
    dispatch(deleteStudents("estudiantes", id));
    Swal.fire(
      'Buen trabajo!',
      'El estudiante fue eliminado con éxito!',
      'success'
    )
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  }


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
      title: "Tipo de documeto",
      dataIndex: "tipoDocumento",
      key: "tipoDocumento",
    },
    {
      title: "# documento",
      dataIndex: "numeroDocumento",
      key: "numeroDocumento",
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Tipo de entrenamiento",
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
          onConfirm={() => handleEliminarParticipante(record.id)}
          okText="Sí"
          cancelText="Cancelar"
        >
          <MdDeleteForever/>
          <CiEdit />
        </Popconfirm>
      )
    },
  ];

  // const mappedEstudiantes = arrayEstudiantes?.map((estudiante) => ({
  //   key: estudiante.id,
  //   name: estudiante.name,
  //   lastname: estudiante.lastname,
  //   tipoDocumento: estudiante.tipoDocumento,
  //   numeroDocumento: estudiante.numeroDocumento,
  //   telefono: estudiante.telefono,
  //   tipo_entrenamiento: estudiante.tipo_entrenamiento,
  //   modulo: estudiante.modulo,
  //   cohorte: estudiante.cohorte,
  //   email: estudiante.email,
  // }));

  
  // const filterData = (searchQuery) => {
  //   if (!searchQuery) return estudiantes;
  //   const searchFields = ["name", "lastname", "tipo_documeto", "numero_documento", "telefono", "tipo_entrenamiento", "modulo", "cohorte", "email"];
  //   return estudiantes.filter((estudiante) =>
  //     searchFields.some((field) =>
  //       (estudiante[field] || "").toString().toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  // };

  // const filteredEstudiantes = filterData(searchQuery);


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      
    },
  };

  return (
    <div className="estudiantes">
        <div className="infoAsistencia">
          <div className="totalidad">
            <p>
              {/* Total de estudiantes: <span>{filteredEstudiantes.length}</span> */}
            </p>
          </div>

          <div className="">
            <div>
              <BotonesFiltrado />
            </div>
            <div className="search">
              <Search
                placeholder="Buscar participante"
                //  value={searchQuery}
                //  onChange={(e) => setSearchQuery(e.target.value)}
                enterButton
              />
              <button className="button__agg" onClick={handleOpenModal}>
                Agregar
              </button>
              {/* <button className="btnDescarga" onClick={exportFile}>
                <BsDownload />
              </button> */}
            </div>
            <div></div>
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
         style={{width: "5rem"}}
          className="tabla"
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={arrayEstudiantes}
        />
     
    </div>
  );
};

export default Estudiantes;
