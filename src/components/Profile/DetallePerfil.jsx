import { useSelector } from 'react-redux';
import './StylesDetallePerfil.scss'


const DetallePerfil = () => {

    const { user: loggedUser } = useSelector((store) => store.userReducer);
  console.log(loggedUser);
    return (
        <div className="detalle">
            <div className='detalle__sobremi'>
                <h5 className='title'>Sobre mi</h5>
                <p>
                  {
                    loggedUser?.sobremi
                  }
                </p>
            </div>
            <div className='detalle__infor'>
                <h4 className='title'>Detalles del perfil</h4>
                <div className='info'>
                    <span>Nombre Completo</span>
                    <div>
                        <p>{loggedUser?.nombre}</p>
                    </div>
                </div>
                <div className='info'>
                    <span>Compañía</span>
                    <div>
                        <p>{loggedUser?.compania}</p>
                    </div>
                </div>
                <div className='info'>
                    <span>Trabajo</span>
                    <div>
                        <p>{loggedUser?.trabajo}</p>
                    </div>
                </div>
                <div className='info'>
                    <span>País</span>
                    <div>
                        <p>{loggedUser?.pais}</p>
                    </div>
                </div>
                <div className='info'>
                    <span>Dirección</span>
                    <div>
                        <p>{loggedUser?.direccion}</p>
                    </div>
                </div>
                <div className='info'>
                    <span>Teléfono</span>
                    <div>
                        <p>{loggedUser?.telefono}</p>
                    </div>
                </div>
                <div className='info'>
                    <span>Email</span>
                    <div>
                        <p>{loggedUser?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetallePerfil