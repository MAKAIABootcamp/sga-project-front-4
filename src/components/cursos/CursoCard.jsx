const CursoCard = ({ curso, onClick }) => {
    return (
      <div className="card">
  
        <div className="card-body">
          <h5 className="card-title">{curso.titulo}</h5>
          <p className="card-text">{curso.descripcion}</p>
          <p className="card-text">Duración: {curso.duracion}</p>
          <p className="card-text">Instructor: {curso.instructor}</p>
          <button className="btn btn-primary" onClick={onClick}>
            Agregar Archivos
          </button>
        </div>
      </div>
    );
  };
  export default CursoCard