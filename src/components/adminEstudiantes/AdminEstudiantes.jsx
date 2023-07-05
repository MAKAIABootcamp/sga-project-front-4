import { Card, Form, Input, Button } from "semantic-ui-react";
import Logo from '../../assets/images/logoMakaia.png'

const AdminEstudiantes = () => {

  return (
    <>
      <header>
          <figure>
            <img src={Logo} alt="" />
            <h1>SGA Makaia</h1>
          </figure>
          <Input icon='search' placeholder='Search...' />
      </header>
    </>
  );
};

export default AdminEstudiantes;
