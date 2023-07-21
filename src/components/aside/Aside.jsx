import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/aside/Aside.scss";

const Aside = ({ hamburguerMenu }) => {
  const navigate = useNavigate();
  const AsideList = [
    {
      name: "Estudiantes",
      url: "/estudiantes",
    },
    {
      name: "Cronograma",
      url: "/cronograma",
    },
    {
      name: "Asistencia",
      url: "",
    },
    {
      name: "Recursos educativos",
      url: "/recursos",
    },
    {
      name: "Notas",
      url: "/notas",
    },
    {
      name: "Seguimiento académico",
      url: "",
    },
    {
      name: "Plan de estudios",
      url: "/plan",
    },
    {
      name: "Registro admin",
      url: "/registro-administradores",
    },
    {
      name: "Recursos Formador",
      url: "/cursos-disponibles-recursos-educativos",
    },
    {
      name: "Cronograma Estudiante",
      url: "/calendario",
    },
    {
      name: "Perfil",
      url: "/perfil",
    },
  ];

  const handleMenuItemClick = (url) => {
    navigate(url);
  };

  return (
    <>
      {hamburguerMenu && (
        <aside
          id="sidebar"
          className={`sidebar ${hamburguerMenu ? "menu-open" : ""}`}
        >
          <ul className="sidebar-nav" id="sidebar-nav">
            {AsideList.map((item, index) => (
              <li className="nav-item" key={item.name}>
                <a
                  className="nav-link collapsed"
                  onClick={() => handleMenuItemClick(item.url)}
                >
                  <i className="bi bi-grid"></i>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
};

export default Aside;
