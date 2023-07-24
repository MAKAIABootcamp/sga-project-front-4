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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam,
                    illum magni consequatur ab possimus non debitis iure eum
                    temporibus facere ducimus quidem neque perspiciatis, atque dolore
                    fuga inventore commodi expedita?
                </p>
            </div>
            <div className='detalle__info'>
                <h4 className='title'>Detalles del perfil</h4>
                <div className='info'>
                    <span>Nombre Completo</span>
                    <div>
                        <p>{loggedUser?.nombre}   {loggedUser?.apellido}</p>
                    </div>
                </div>
                <div className='info'>
                    <span>Compañía</span>
                    <div>
                        <p>Makaia</p>
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