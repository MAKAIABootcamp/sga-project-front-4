import React, { useState } from "react";
import LogoBootcamp from "../../assets/images/LogoBootcamp.png";
import userProfile from "../../assets/images/profile-img.jpg";
import { BsList } from "react-icons/bs";
import "../../styles/header/Header.scss";
import { BsBoxArrowRight } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router";
const Header = () => {
  const [hamburguerMenu, setHamburguerMenu] = useState(false);
  const [listProfileOpen, setListProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setHamburguerMenu(!hamburguerMenu);
  };

  const handleListProfile = () => {
    setListProfileOpen(!listProfileOpen);
  };

  const handleToPerfil = () => {
    navigate("/perfil")
  }
  const handleToCronograma = () => {
    navigate("/cronograma")
  }
  const handleToStudents = () => {
    navigate("/estudiantes")
  }
  const handleToAsistencia = () => {
    navigate("/asistencia")
  }
  return (
    <>
      <header
        id="header"
        className={`header fixed-top d-flex align-items-center ${
            hamburguerMenu ? "menu-open" : ""
        }`}
      >
        <div className="d-flex align-items-center justify-content-between">
          <figure className="logo d-flex align-items-center">
            <img src={LogoBootcamp} alt="Logo" />
            <span className="d-none d-lg-block">SGA</span>
            <i
              className="bi bi-list toggle-sidebar-btn"
              onClick={handleMenuToggle}
            >
              <BsList />
            </i>
          </figure>
        </div>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                data-bs-toggle="dropdown"
                onClick={handleListProfile}
              >
                <img
                  src={userProfile}
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  K. Anderson
                </span>
              </a>
              {listProfileOpen && (
                <ul
                  className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show ${
                    listProfileOpen ? "menu-open" : ""
                  }`}
                  data-popper-placement="bottom-end"
                  style={{
                    position: "absolute",
                    inset: "0px 0px auto auto",
                    margin: "0px",
                    transform: "translate3d(-16px, 38px, 0px)",
                  }}
                >
                  <li className="dropdown-header">
                    <h6>Kevin Anderson</h6>
                    <span>Administrador</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      style={{cursor: 'pointer'}}
                      onClick={handleToPerfil}
                    >
                      <i className="bi bi-person"></i>
                     <BsPerson/> <span>Mi perfil</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <BsBoxArrowRight/> <span>Cerrar sesión</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
      {hamburguerMenu && (
        <aside
          id="sidebar"
          className={`sidebar ${hamburguerMenu ? "menu-open" : ""}`}
        >
          <ul class="sidebar-nav" id="sidebar-nav">
            <li class="nav-item">
              <a class="nav-link collapsed">
                <i class="bi bi-grid"></i>
                <span onClick={handleToStudents}>Estudiantes</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link collapsed">
                <i class="bi bi-grid"></i>
                <span onClick={handleToCronograma}>Cronograma</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link collapsed">
                <i class="bi bi-grid"></i>
                <span onClick={handleToPerfil}>Perfil</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link collapsed">
                <i class="bi bi-grid"></i>
                <span onClick={handleToAsistencia}>Asistencia</span>
              </a>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
};

export default Header;
