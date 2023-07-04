import './StylesDetallePerfil.scss'

const ActualizarDatos = () => {
  return (
    <div className='detalle'>
      <div>
        <h4>Imagen de perfil</h4>
        <div>
          <img src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/profile-img.jpg" alt="" />
          <div>
            <input type="file" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActualizarDatos