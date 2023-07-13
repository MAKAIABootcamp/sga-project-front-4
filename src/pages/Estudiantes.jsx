import dayjs from "dayjs";
import { Input} from 'antd';
import { BsDownload } from "react-icons/bs";
import { Table } from 'antd';
import { Progress } from 'antd';
import '../styles/admin_estudiantes/estudiantes.scss'
import { useCallback, useEffect, useState } from "react";
import ButtonsFiltro from "../components/buttonsFiltro/ButtonsFiltro";
// import { utils, writeFileXLSX } from 'xlsx';
const { Search } = Input;
const today = dayjs();
// import AdminEstudiantes from '../components/adminEstudiantes/AdminEstudiantes'




const Estudiantes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [students, setStudents] = useState([
    {
      key: 1,
      name: "Jose",
      apellido: "Sanmiguel",
      type_doc: "Cédula",
      doc: 10014053343,
      email: 'example@example.com',
      entrenamiento: "Front-end",
      cohorte: "3",
      

    },
    {
      key: 2,
      name: "Luisa",
      apellido: "Urrego",
      type_doc: "Cédula",
      doc: 10014053343,
      email: 'example@example.com',
      entrenamiento: "Front-end",
      cohorte: "3",
    },
    {
      key: 3,
      name: "Yesid",
      apellido: "Vanegas",
      type_doc: "Cédula",
      doc: 10014053343,
      email: 'example@example.com',
      entrenamiento: "Front-end",
      cohorte: "3",
    },
    {
      key: 4,
      name: "John",
      apellido: "Cartagena",
      type_doc: "Cédula",
      doc: 10014053343,
      email: 'example@example.com',
      entrenamiento: "Front-end",
      cohorte: "3",
      
    },
    {
      key: 5,
      name: "Angie",
      apellido: "Moreno",
      type_doc: "Cédula",
      doc: 10014053343,
      email: 'example@example.com',
      entrenamiento: "Front-end",
      cohorte: "3",
   
    },
  ]);
  const [fallas, setFallas] = useState(0);

  // const exportFile = useCallback(() => {
  //   const ws = utils.json_to_sheet(students);
  //   const wb = utils.book_new();
  //   utils.book_append_sheet(wb, ws, 'Data');
  //   writeFileXLSX(wb, 'Prueba.xlsx');
  // }, [students]);


  

  useEffect(() => {
    const filtered = students.filter((user) => (user.name).toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered)
  }, [searchTerm, students]);

  const selectionType = 'checkbox';
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      render: (text) =>
      <>
        <span className="apodo">
          {text.slice(0, 2)}
        </span>
        <a>{text}</a>
      </>
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
   

    },
    {
      title: 'Tipo de documento',
      dataIndex: 'type_doc',
    },
    {
      title: 'Documento',
      dataIndex: 'doc',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Entrenamiento',
      dataIndex: 'entrenamiento',
    },
    {
      title: 'Cohorte',
      dataIndex: 'cohorte',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
    },
    {
      title: 'Acciones',
      dataIndex: 'estado',
    },
  ];



  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setFallas(selectedRows.length)
    },

  };

  const onSearch = (value) => console.log(value);
  return (
    <div className="asistencia">
      <div className="asistencia__calendar">
        <div className="infoAsistencia">
          <div className="totalidad">
            <p>
              Total de estudiantes: <span>{students.length}</span>
            </p>

          </div>

          <div className="">
            <div>
              <ButtonsFiltro/>
            </div>
            <div className="search">
              <Search placeholder="Buscar participante" value={searchTerm} onChange={(e) =>setSearchTerm(e.target.value) }  onSearch={onSearch} enterButton />
              
              {/* <button className="btnDescarga" onClick={exportFile}>
                <BsDownload />
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="asistencia__table">
        <Table className="tabla"
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={filteredUsers}

        />
      </div>
      <div className="asistencia__enviar">
        <button type="submit">
          Enviar
        </button>
      </div>
    </div>
  );
};


export default Estudiantes