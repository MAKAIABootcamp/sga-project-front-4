import { useEffect, useState } from 'react';
import './StyledRutaNoPermitida.scss'

const RutaNoPermitida = () => {

  const [lFollowX, setLFollowX] = useState(0);
  const [lFollowY, setLFollowY] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const friction = 1 / 30;

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setX((prevX) => prevX + (lFollowX - x) * friction);
      setY((prevY) => prevY + (lFollowY - y) * friction);

      const translate = `translate(${x}px, ${y}px) scale(1.1)`;

      const img = document.getElementById('parallax-image');
      img.style.webkitTransform = translate;
      img.style.mozTransform = translate;
      img.style.transform = translate;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Detener la animación cuando el componente se desmonte
    return () => cancelAnimationFrame(animationFrameId);
  }, [lFollowX, lFollowY, x, y]);

  const handleMouseMove = (e) => {
    const lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
    const lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
    setLFollowX((20 * lMouseX) / 100);
    setLFollowY((10 * lMouseY) / 100);
  };

  const handleMouseLeave = () => {
    setLFollowX(0);
    setLFollowY(0);
  };

  
  return (
    <div className='bodyRutaNoPermitida'>
      <div className="page">
        <header className='headerRutaNoPermitida'>
          <div className="logo">
            <svg>
              <use xlinkHref="#logo-dailyui"></use>
            </svg>
          </div>

          <div className="search">
            <svg>
              <use xlinkHref="#ico-search"></use>
            </svg>
          </div>
        </header>
        <div className="content">
          <h1>403</h1>
          <h2>Page not found</h2>
          <p>I tried to catch some fog, but I mist</p>
        </div>
        <img  id="parallax-image" onMouseMove={handleMouseMove}
      onClick={handleMouseMove}  onMouseLeave={handleMouseLeave} className='imageRutaNoPermitida' src="http://www.supah.it/dribbble/008/008.jpg" alt="403 Error" />
      </div>
    </div>

  )
}

export default RutaNoPermitida