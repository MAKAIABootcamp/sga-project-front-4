import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/aside/Aside.scss"

const Aside = ({ hamburguerMenu, handleToStudents, handleToCronograma, handleToPerfil }) => {
  const navigate = useNavigate();

 

  return (
    <>
      {hamburguerMenu && (
        <aside id="sidebar" className={`sidebar ${hamburguerMenu ? "menu-open" : ""}`}>
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <a className="nav-link collapsed" onClick={handleToStudents}>
                <i className="bi bi-grid"></i>
                <span>Estudiantes</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" onClick={handleToCronograma}>
                <i className="bi bi-grid"></i>
                <span>Cronograma</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link collapsed" onClick={handleToPerfil}>
                <i className="bi bi-grid"></i>
                <span>Perfil</span>
              </a>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
};

export default Aside;
