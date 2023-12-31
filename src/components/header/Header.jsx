import  { useState } from "react";
import LogoBootcamp from "../../assets/images/LogoBootcamp.png";
// import userProfile from "../../assets/images/profile-img.jpg";
import { BsList } from "react-icons/bs";
import "../../styles/header/Header.scss";
import { BsBoxArrowRight } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useSelector } from "react-redux";

const Header = ({ handleMenuToggle }) => {
  const [listProfileOpen, setListProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleListProfile = () => {
    setListProfileOpen(!listProfileOpen);
  };

  const handleToPerfil = () => {
    navigate("/perfil")
  }
  const { user: loggedUser } = useSelector((store) => store.userReducer);
  // console.log(loggedUser);
  return (
    <>
      <header className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <figure className="logo d-flex align-items-center m-0">
            <img src={LogoBootcamp} alt="Logo" />
            <span className="d-none d-lg-block">SGA</span>
            <i className="bi bi-list toggle-sidebar-btn" onClick={handleMenuToggle}>
              <BsList />
            </i>
          </figure>
        </div>
        <nav className="header-nav ms-auto ">
          <ul className="d-flex align-items-center m-0">
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                data-bs-toggle="dropdown"
                onClick={handleListProfile}
              >
                <img src={loggedUser?.foto} alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">{loggedUser?.nombre}</span>
              </a>
              {listProfileOpen && (
                <ul
                  className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show ${listProfileOpen ? "menu-open" : ""
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
                    <h6>{loggedUser?.nombre}</h6>
                    <span>{loggedUser?.rol}</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      style={{ cursor: 'pointer' }}
                      onClick={handleToPerfil}
                    >
                      <i className="bi bi-person"></i>
                      <BsPerson /> <span>Mi perfil</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      onClick={() => signOut(auth)}
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <BsBoxArrowRight /> <span>Cerrar sesión</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
