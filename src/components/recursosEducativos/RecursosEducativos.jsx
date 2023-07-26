import RecursosEducativosDesktop from "./RecursosEducativosDesktop";
import RecursosEducativosMobile from "./RecursosEducativosMobile";
import { useState, useEffect } from "react";

const RecursosEducativos = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 769);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 769);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop ? <RecursosEducativosDesktop /> : <RecursosEducativosMobile />;
};

export default RecursosEducativos;
