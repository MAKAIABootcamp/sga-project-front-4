import './StylesDetallePerfil.scss'


const DetallePerfil = () => {
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
                        <p>Kevin Anderson</p>
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
                        <p>Web Designer</p>
                    </div>
                </div>
                <div className='info'>
                    <span>País</span>
                    <div>
                        <p>Colombia</p>
                    </div>
                </div>
                <div className='info'>
                    <span>Dirección</span>
                    <div>
                        <p>Calle falsa 123</p>
                    </div>
                </div>
                <div className='info'>
                    <span>Teléfono</span>
                    <div>
                        <p>(436) 486-3538x29071</p>
                    </div>
                </div>
                <div className='info'>
                    <span>Email</span>
                    <div>
                        <p>k.anderson@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetallePerfil