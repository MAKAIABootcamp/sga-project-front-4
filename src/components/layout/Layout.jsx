import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Aside from "../aside/Aside";
import { useNavigate } from "react-router";

const Layout = () => {
  const [hamburguerMenu, setHamburguerMenu] = useState(true);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setHamburguerMenu(!hamburguerMenu);
  };
  return (
    <>
      <Header handleMenuToggle={handleMenuToggle} />
      <Aside hamburguerMenu={hamburguerMenu}/>
      <Outlet />
    </>
  );
};

export default Layout;
