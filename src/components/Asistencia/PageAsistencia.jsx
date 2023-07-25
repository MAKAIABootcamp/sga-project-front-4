import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Input} from 'antd';
import { Table } from 'antd';
import { Progress } from 'antd';
import './StylesAsistencia.scss'
import { useEffect, useState } from "react";
import BotonesFiltrado from "./BtnFintrado/BotonesFiltrado";
import { useSelector } from "react-redux";
import BtnDescarga from "../BotonDescarga/BtnDescarga";




const { Search } = Input;
const today = dayjs();


const PageAsistencia = () => {

  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const arrayEstudiantes = useSelector((store) => store.estudiantesReducer.arrCohorte)
  const [fallas, setFallas] = useState(0);
  




  

  useEffect(() => {
    const filtered = arrayEstudiantes.filter((user) => (user.name).toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered)
  }, [searchTerm, arrayEstudiantes]);

  const handleDateChange = (date) => {
    console.log(date.$d);
  }
 

  const columns = [
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      render: (text, record) =>
        <>
          <span className="apodo">
            {record.name.slice(0, 2)}
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
      dataIndex: 'numeroDocumento',
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: '% Asistencia',
      dataIndex: 'asistencia',
      render: (asistencia) => (
        <Progress percent={(asistencia * 100) / 80} />
      )
    },
    {
      title: 'Observaciones',
      dataIndex: 'observaciones',
      render: (text) => (
        <textarea style={{ borderRadius: '8px', width: '75%', height: '4rem' }} defaultValue={text} />
      )
    },
  ];



  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setFallas(selectedRows)
    },

  };

  const onSearch = (value) => console.log(value);

  return (
    <div className="asistencia">
      <h2>Campers</h2>
      <div className="asistencia__calendar">
        <div className="infoAsistencia">
          <div className="totalidad">
            <p>
              Total de estudiantes: <span>{arrayEstudiantes.length}</span>
            </p>
            <p>
              Total de fallas: <span>{arrayEstudiantes.length - fallas.length }</span>
            </p>
          </div>

          <div className="">
            <div>
              <BotonesFiltrado/>
            </div>
            <div className="search">
              <Search placeholder="Buscar participante" value={searchTerm} onChange={(e) =>setSearchTerm(e.target.value) }  onSearch={onSearch} enterButton />
              
              <BtnDescarga arrayEstudiantes={arrayEstudiantes ? arrayEstudiantes : ''} nombreArchivo={'Asistencia.xlsx'}/> 
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
                <DateCalendar defaultValue={today} disableFuture onChange={handleDateChange} />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </div>

      </div>

      <div className="asistencia__table">
        <Table className="tabla"
          rowSelection={{
            type: 'checkbox',
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