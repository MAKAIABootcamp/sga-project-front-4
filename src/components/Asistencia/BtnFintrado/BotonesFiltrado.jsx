import { Select } from "antd";
import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import './StylesBotonoes.scss'
import { useDispatch, useSelector } from "react-redux";
import { filterCohorte, getStudents } from "../../../redux/actions/estudiantesActions";


const BotonesFiltrado = () => {

  const [entrenamiento, setEntrenamiento] = useState('');
  const [modulo, setModulo] = useState('');
  const [cohorteSelect, setCohorteSelect] = useState('');
  const [studentsLoaded, setStudentsLoaded] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const arrayEstudiantes = useSelector((store) => store.estudiantesReducer.estudiantes)
  const dispatch = useDispatch();
  const listStudents = () => {
      dispatch(getStudents('estudiantes'));
  }

  useEffect(() => {
    if(!studentsLoaded){
      listStudents();
      setStudentsLoaded(true);
    }
    setStudentsList(arrayEstudiantes);
  }, [arrayEstudiantes])

  console.log('Estuiantes desde botones de filtrado', studentsList); 

  const handleChangeEntrenamiento = (value) => {
    console.log(`selected ${value}`);
    setEntrenamiento(value);
  };
  const handleChangeModulo = (value) => {
    console.log(`selected ${value}`);
    setModulo(value);
  };
  const handleChangeCohorte = (value) => {
    console.log(`selected ${value}`);
    const numero = parseInt(value.split(' ')[1]);
    setCohorteSelect(numero);
  };

  // const arrfiltroEntrenamiento = studentsList.filter(cohorte => cohorte.tipo_entrenamiento === entrenamiento);
  // console.log('filtro en entrenamiento', arrfiltroEntrenamiento);
  // const arrFiltroModulo = arrfiltroEntrenamiento.filter(cohorte => cohorte.modulo === modulo)
  // console.log('filtro de modulo',arrFiltroModulo);
  // const arrFiltroCohorte = arrFiltroModulo.filter(curso => curso.cohorte === cohorteSelect)
  // console.log('Array de filtro de cohorte',arrFiltroCohorte);
  // // dispatch(filterCohorte(arrFiltroCohorte))
  
  return (
    <div>
      <div className="select">
        <Select
          defaultValue="Entrenamiento"
          style={{
            width: 200,
          }}
          onChange={handleChangeEntrenamiento}
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
          onChange={handleChangeModulo}
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
          onChange={handleChangeCohorte}
          options={[
            {
              label: "Cohorte",
              options: [
                {
                  label: `${entrenamiento} 1`,
                  value: `${entrenamiento} 1`,
                },
                {
                  label: `${entrenamiento} 2`,
                  value: `${entrenamiento} 2`,
                },
                {
                  label: `${entrenamiento} 3`,
                  value: `${entrenamiento} 3`,
                }
              ],
            },
          ]}
        />

      </div>
      <Breadcrumb className="asistencia__vistaFiltros"
        items={[
          {
            title: <span>{entrenamiento}</span>,
          },
          {
            title: <span>{modulo}</span>,
          },
          {
            title: <span>{cohorteSelect}</span>,
          },
        ]}
      />
    </div>
  )
}

export default BotonesFiltrado