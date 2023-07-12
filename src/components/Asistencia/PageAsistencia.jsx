import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { Icon, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { BsDownload } from "react-icons/bs";
import { Table } from 'antd';
import { Progress } from 'antd';
import './StylesAsistencia.scss'
import { useCallback, useEffect, useState } from "react";
import { utils, writeFileXLSX } from 'xlsx';
import BotonesFiltrado from "./BtnFintrado/BotonesFiltrado";


const today = dayjs();


const PageAsistencia = () => {

  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [students, setStudents] = useState([
    {
      key: 1,
      name: "Jose",
      apellido: "Sanmiguel",
      doc: 10014053343,
      tel: "+57 311 859 9554",
      email: 'example@example.com',
      asistencia: 10,
      observaciones: ''
    },
    {
      key: 2,
      name: "Luisa",
      apellido: "Urrego",
      doc: 10014053343,
      tel: "+57 311 859 9554",
      email: 'example@example.com',
      asistencia: 5,
      observaciones: ''
    },
    {
      key: 3,
      name: "Yesid",
      apellido: "Vanegas",
      doc: 10014053343,
      tel: "+57 311 859 9554",
      email: 'example@example.com',
      asistencia: 8,
      observaciones: ''
    },
    {
      key: 4,
      name: "John",
      apellido: "Cartagena",
      doc: 10014053343,
      tel: "+57 311 859 9554",
      email: 'example@example.com',
      asistencia: 9,
      observaciones: ''
    },
    {
      key: 5,
      name: "Angie",
      apellido: "Moreno",
      doc: 10014053343,
      tel: "+57 311 859 9554",
      email: 'example@example.com',
      asistencia: 10,
      observaciones: ''
    },
  ]);
  const [fallas, setFallas] = useState(0);

  const exportFile = useCallback( () => {
      const ws = utils.json_to_sheet(students);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Data');
      writeFileXLSX(wb, 'Prueba.xlsx');
  }, [students]);


  

  useEffect(() => {
    const filtered = students.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered)
  }, [searchTerm, students]);

  const selectionType = 'checkbox';
  const columns = [
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      render: (text) =>
        <>
          <span className="apodo">
            {text.slice(0, 2)}
          </span>
          <a>{text}</a>
        </>

    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Documento',
      dataIndex: 'doc',
    },
    {
      title: 'Teléfono',
      dataIndex: 'tel',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: '% Asistencia',
      dataIndex: 'asistencia',
      render: (asistencia) => (
        <Progress percent={(asistencia / 10) * 100} />
      )
    },
    {
      title: 'Observaciones',
      dataIndex: 'observaciones',
      render: (text) => (
        <textarea style={{ borderRadius: '8px', width: '75%', height: '4rem' }}>{text}</textarea>
      )
    },
  ];



  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setFallas(selectedRows.length)
    },

  };

  return (
    <div className="asistencia">
      <h2>Campers</h2>
      <div className="asistencia__calendar">
        <div className="infoAsistencia">
          <div className="totalidad">
            <p>
              Total de estudiantes: <span>{students.length}</span>
            </p>
            <p>
              Total de fallas: <span>{students.length - fallas}</span>
            </p>
          </div>

          <div className="">
            <div>
              <BotonesFiltrado/>
            </div>
            <div className="search">
              <Input className="input" icon placeholder="Search..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}>
                <Icon name="search" />
                <input />
              </Input>

              <button onClick={exportFile}>
                <BsDownload />
              </button>
            </div>
          </div>
        </div>
        <div className="calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid
              container
              columns={{ xs: 1, lg: 2 }}
              spacing={4}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <DateCalendar defaultValue={today} disableFuture />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </div>

      </div>

      <div className="asistencia__table">
        <Table
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

export default PageAsistencia;
