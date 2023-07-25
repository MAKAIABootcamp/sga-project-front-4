import { Progress, Table, } from 'antd';
import BotonesFiltrado from '../Asistencia/BtnFintrado/BotonesFiltrado';
import { useSelector } from 'react-redux';
import { Dropdown } from 'antd';
import './StylesCalificaciones.scss'
import BtnDescarga from '../BotonDescarga/BtnDescarga';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { Button } from 'antd';

const { Search } = Input;
const Calificaiones = () => {


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inputDesabler, setInputDesabler] = useState(true);

  const arrayEstudiantes = useSelector((store) => store.estudiantesReducer.arrCohorte)
  console.log(arrayEstudiantes);

  useEffect(() => {
    const filtered = arrayEstudiantes.filter((user) => (user.name).toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUsers(filtered)
  }, [searchTerm, arrayEstudiantes]);
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
    console.log('click', e.key);
    if(e.key == 1){
      setInputDesabler(false);
    }
  };

  const CustomColumnWorshop = ({ title }) => {
    const primeraFecha = arrayEstudiantes.find((estudiante) => estudiante.calificaciones.workshop.fecha);
    const fechaEncontrada = primeraFecha && primeraFecha.calificaciones.workshop.fecha;
    return (
      <div className='fecha'>
        <div className='workshop'>
          {title}
          <input className='valorNota' disabled = {inputDesabler} defaultValue={arrayEstudiantes[0]?.calificaciones?.workshop?.porcentaje} />
        </div>
        {
          fechaEncontrada && <span className='fechaEncontrada'>{fechaEncontrada}</span>
        }
      </div>
    )
  }

  const CustomColumnSprint = ({ title }) => {
    const primeraFecha = arrayEstudiantes.find((estudiante) => estudiante.calificaciones.sprint.fecha);
    const fechaEncontrada = primeraFecha && primeraFecha.calificaciones.sprint.fecha;
    return (
      <div className='fecha'>
        <div className='workshop'>
          {title}
          <input className='valorNota' disabled = {inputDesabler} defaultValue={arrayEstudiantes[0]?.calificaciones?.sprint?.porcentaje} />
        </div>
        {
          fechaEncontrada && <span className='fechaEncontrada'>{fechaEncontrada}</span>
        }
      </div>
    )
  }


  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => 
      <>
        <img className='imagenPerfil' src={record.photo} alt={text} />
        <span>{text}     {record.lastname}</span>
      </>,
    },
    {
      title: <CustomColumnWorshop title={'Workshop'} />,
      dataIndex: 'calificaciones',
      key: 'calificaciones',
      render: (cal) => <input className='inputNota' type="text" defaultValue={cal.workshop.nota} disabled = {inputDesabler} />
    },
    {
      title: <CustomColumnSprint title={'Sprint'} />,
      dataIndex: 'calificaciones',
      key: 'calificaciones',
      render: (cal) => <input className='inputNota' type='text' defaultValue={cal.sprint.nota} disabled = {inputDesabler}/>
    },
    {
      title: 'Progreso',
      dataIndex: 'calificaciones',
      key: 'calificaciones',
      render: (_, record) => (

        <Progress percent={(
          (parseFloat(record.calificaciones.workshop.nota) * parseFloat(record.calificaciones.workshop.porcentaje) + parseFloat(record.calificaciones.sprint.nota) * parseFloat(record.calificaciones.sprint.porcentaje) ) / 100) } />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Dropdown
        menu={{
          items,
          onClick: onMenuClick,
        }}
        placement="top"
      >
        <Button>...</Button>
      </Dropdown>
      ),
    },
  ];

  const onSearch = (value) => console.log(value);


  return (
    <div className='calificaciones'>
      <div className='calificaciones__header'>
        <div className='cantidadParticipantes'>
          <p>Participantes</p>
          <span className='numberParticipantes'>({arrayEstudiantes?.length})</span>
        </div>
        <div className='nameModulo'>
          <p>{arrayEstudiantes[0]?.modulo}</p>
        </div>
        <div>
          <BtnDescarga arrayEstudiantes={arrayEstudiantes ? arrayEstudiantes : ''} nombreArchivo={'notas.xlsx'} />
        </div>
      </div>
      <div className='barraBusqueda'>
        <Search placeholder="Buscar participante" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onSearch={onSearch} enterButton />
      </div>
      <BotonesFiltrado />
      <Table className='calificaciones__table' columns={columns} dataSource={filteredUsers} />
    </div>
  )
}

export default Calificaiones