import { Progress, Table, } from 'antd';
import BotonesFiltrado from '../Asistencia/BtnFintrado/BotonesFiltrado';
import { useSelector } from 'react-redux';
import { Dropdown } from 'antd';
import './StylesCalificaciones.scss'


const Calificaiones = () => {


  const arrayEstudiantes = useSelector((store) => store.estudiantesReducer.arrCohorte)

  const items = [
    {
      key: '1',
      label: 'Editar',
    },
    {
      key: '2',
      label: 'Eliminar',
    },

  ];
  const onMenuClick = (e) => {
    console.log('click', e);
  };

  const CustomColumnHeader = ({ title }) => {

    const primeraFecha = arrayEstudiantes.find((estudiante) => estudiante.calificaciones.workshop.fecha);
    const fechaEncontrada = primeraFecha && primeraFecha.calificaciones.workshop.fecha;
    return (
      <div className='fecha'>
        <span>{title}</span>
        {
          fechaEncontrada && <span>{fechaEncontrada}</span>
        }
      </div>
    )
  }

  

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <>
        <img className='imagenPerfil' src={record.photo} alt={text} />
        <span>{text}     {record.lastname}</span>
      </>,
    },
    {
      title: <CustomColumnHeader title={'Workshop'}/>,
      dataIndex: 'calificaciones',
      key: 'calificaciones',
      render: (cal) => <span>{cal.workshop.nota}%</span>
    },
    {
      title: 'Spirit',
      dataIndex: 'calificaciones',
      key: 'calificaciones',
      render: (cal) => <span>{cal.sprint.nota}%</span>
    },
    {
      title: 'Progreso',
      dataIndex: 'calificaciones',
      key: 'calificaciones',
      render: (_, record) => (
        <Progress percent={((record.calificaciones.workshop.nota + record.calificaciones.sprint.nota) / 100) * 100} />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Dropdown.Button
          menu={{
            items,
            onClick: onMenuClick,
          }}
        >
        </Dropdown.Button>
      ),
    },
  ];


  return (
    <div className='calificaciones'>
      <BotonesFiltrado />
      <Table columns={columns} dataSource={arrayEstudiantes} />
    </div>
  )
}

export default Calificaiones