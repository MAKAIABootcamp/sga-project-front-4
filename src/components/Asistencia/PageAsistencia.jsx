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
import { useState } from "react";
import { Checkbox } from 'antd';


const today = dayjs();

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const PageAsistencia = () => {

  const [students, setStudents] = useState([
    { id: 1, name: 'Jose Sanmiguel', attendance: false },
    { id: 2, name: 'Luisa Urrego', attendance: false },
    { id: 3, name: 'Yesid Vanegas', attendance: false },
    { id: 4, name: 'John Cartagena', attendance: false },
    { id: 5, name: 'Angie Moreno', attendance: false },
    // Agrega más estudiantes según sea necesario
  ]);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
 
  return (
    <div>
      <h2>Estudiantes</h2>
      <div>
        <p>
          Total de estudiantes: <span>23</span>
        </p>
        <p>
          Total de fallas: <span>1</span>
        </p>
        <div>
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
        <div>
          <div>
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
        <div>
          <Input icon placeholder="Search...">
            <Icon name="search" />
            <input />
          </Input>
        </div>
        <div>
          <button>
            <BsDownload />
          </button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Asistencia</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                <Checkbox onChange={onChange}/>
                </td>
                <td>{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageAsistencia;
