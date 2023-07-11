import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Aside from "../aside/Aside";
import { useNavigate } from "react-router";
import "../../styles/Layout.scss"

const Layout = () => {
  const [hamburguerMenu, setHamburguerMenu] = useState(true);
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setHamburguerMenu(!hamburguerMenu);
  };
  return (
    <>
      <Header handleMenuToggle={handleMenuToggle} />
      <main className="main">
      <Aside hamburguerMenu={hamburguerMenu}/>
      <Outlet className="outlet"/>
      </main>
    </>
  );
};

export default Layout;
