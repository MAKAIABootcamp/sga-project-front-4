import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Select } from "antd";
import { Breadcrumb } from "antd";
import { Icon, Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { BsDownload } from "react-icons/bs";
import { Table } from 'antd';
import { Progress } from 'antd';
import './StylesAsistencia.scss'


const today = dayjs();

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const PageAsistencia = () => {
  const selectionType = 'checkbox';
  const columns = [
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      render: (text) =>
        <>
          <span style={{ marginRight: '8px', textTransform: 'uppercase' }}>
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
  const students = [
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
    // Agrega más estudiantes según sea necesario
  ];


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

  };

  return (
    <div className="asistencia">
      <h2>Campers</h2>
      <div className="asistencia__calendar">
        <div className="infoAsistencia">
          <div className="totalidad">
            <p>
              Total de estudiantes: <span>23</span>
            </p>
            <p>
              Total de fallas: <span>1</span>
            </p>
          </div>

          <div className="">
            <div>
              <div className="select">
                <Select
                  defaultValue="Entrenamiento"
                  style={{
                    width: 200,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      label: "Entrenamiento",
                      options: [
                        {
                          label: "Frontend",
                          value: "Frontend",
                        },
                        {
                          label: "Backend",
                          value: "Backend",
                        },
                        {
                          label: "Análisis de Datos",
                          value: "Análisis de Datos",
                        },
                      ],
                    },
                  ]}
                />
                <Select
                  defaultValue="Modulo"
                  style={{
                    width: 200,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      label: "Modulo",
                      options: [
                        {
                          label: "Fundamentos",
                          value: "Fundamentos",
                        },
                        {
                          label: "Profundización",
                          value: "Profundización",
                        },
                      ],
                    },
                  ]}
                />
                <Select
                  defaultValue="Cohorte"
                  style={{
                    width: 200,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      label: "Cohorte",
                      options: [
                        {
                          label: "Front 1",
                          value: "Front 1",
                        },
                        {
                          label: "Front 2",
                          value: "Front 2",
                        },
                      ],
                    },
                  ]}
                />
              </div>
              <Breadcrumb
                items={[
                  {
                    title: "Home",
                  },
                  {
                    title: <a href="">Application Center</a>,
                  },
                  {
                    title: <a href="">Application List</a>,
                  },
                  {
                    title: "An Application",
                  },
                ]}
              />
            </div>
            <div className="search">
              <Input icon placeholder="Search...">
                <Icon name="search" />
                <input />
              </Input>

              <button>
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

      <div>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={students}
        />
      </div>
    </div>
  );
};

export default PageAsistencia;
