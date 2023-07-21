import { Space, Table, } from 'antd';
import BotonesFiltrado from '../Asistencia/BtnFintrado/BotonesFiltrado';
import { useSelector } from 'react-redux';



const Calificaiones = () => {

 
  const arrayEstudiantes = useSelector((store) => store.estudiantesReducer.arrCohorte)
  console.log('array de filtrado desde calificaciones',arrayEstudiantes);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Workshop',
      dataIndex: 'calificaciones',
      key: 'calificaciones',
      // render: (cal) => <span>{}</span>
    },
    {
      title: 'Spirit',
      dataIndex: 'calificaciones',
      key: 'calificaciones',
      // render: (cal) => <span>{cal.sprint.nota}%</span>
    },
    {
      title: 'Progreso',
      dataIndex: '',
      key: 'calificaciones',
      // render: (cal) => <span>{cal.sprint.nota}%</span>
    },
    {
      title: 'Action',
      key: 'action',
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //     <a>Delete</a>
      //   </Space>
      // ),
    },
  ];


  return (
    <div>
      <BotonesFiltrado />
      <Table columns={columns}  />
    </div>
  )
}

export default Calificaiones