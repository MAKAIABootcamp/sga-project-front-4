import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Aside from "../aside/Aside";
import { useNavigate } from "react-router";

const Layout = () => {
  const [hamburguerMenu, setHamburguerMenu] = useState(false);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setHamburguerMenu(!hamburguerMenu);
  };

const handleToCronograma = () => {
    navigate("/cronograma")
  }
  const handleToStudents = () => {
    navigate("/estudiantes")
  }

  const handleToPerfil = () => {
    navigate("/perfil")
  }
  return (
    <>
      <Header handleMenuToggle={handleMenuToggle} />
      <Aside hamburguerMenu={hamburguerMenu}
        handleToStudents={handleToStudents}
        handleToCronograma={handleToCronograma}
        handleToPerfil={handleToPerfil}/>
      <Outlet />
    </>
  );
};

export default Layout;
