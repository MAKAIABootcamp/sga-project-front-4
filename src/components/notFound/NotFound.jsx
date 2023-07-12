import { Button } from "semantic-ui-react";
import logo from "../../assets/images/Logo-Bootcamp.png";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', top: '90px', gap:"10px"}}>
        <img src={logo} alt='Not found' width="300"></img>
        <h1>Lo sentimos, página no encontrada.</h1>
        <Button size='huge'  style={{
        marginTop:"3%",
        color:'#FF2153',
        left: '17%',
        }} 
        onClick={handleLoginClick}>
          Ir a inicio
        </Button>
      </div>
    </>
  )
}

export default NotFound