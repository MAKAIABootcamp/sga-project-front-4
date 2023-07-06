import {
  Input,
  Header,
  Image,
  Button,
  Select,
  Table,
  Checkbox,
  Modal,
} from "semantic-ui-react";
import Logo from "../../assets/images/logoMakaia.png";
import "./adminEstudiantes.scss";
import { useState } from "react";
import NuevoEstudiante from "../nuevoEstudiante/NuevoEstudiante";

const AdminEstudiantes = () => {
  const cohorte = [
    { key: 1, text: "1", value: 1 },
    { key: 2, text: "2", value: 2 },
    { key: 3, text: "3", value: 3 },
  ];

  const entrenamiento = [
    { key: 1, text: "Front-end", value: 1 },
    { key: 2, text: "Back-end", value: 2 },
    { key: 3, text: "Data analytics", value: 3 },
  ];

  const [open, setOpen] = useState(false)

  return (
    <>
      <Header className="header">
        <img src={Logo} alt="" />
        <h1>SGA Makaia</h1>
        <Input
          icon="search"
          size="small"
          placeholder="Search..."
          margin="10px"
        />
        Pintar Layout
        <Image
          circular
          src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
        />{" "}
        Patrick
      </Header>

      <aside className="sidebar">Pintar sidebar</aside>

      <section className="buttons">
        <div>
          <Select options={cohorte} placeholder="Cohorte" color="green" />
          <Select options={entrenamiento} placeholder="entrenamiento" />
          {/* <Button icon="search" color="green" /> */}
        </div>
        <div>
          <Button icon="download" color="green" />
          <Button positive>Cargar archivo</Button>
          <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="large"
            dimmer= 'inverted'
            trigger={<Button color="blue">Agregar estudiante</Button>}
          >
            <Modal.Content>
            <NuevoEstudiante />
            </Modal.Content>
          </Modal>
        </div>
      </section>

      <section className="table">
        <Table basic="very" celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>Tipo de documento</Table.HeaderCell>
              <Table.HeaderCell># documento</Table.HeaderCell>
              <Table.HeaderCell>Entrenamiento</Table.HeaderCell>
              <Table.HeaderCell>Cohorte</Table.HeaderCell>
              <Table.HeaderCell>Estado</Table.HeaderCell>
              <Table.HeaderCell>Acciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    Lena
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>Lena@gmail.com</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell collapsing>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    Matthew
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>Matthew@gmail.com</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell collapsing>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    Lindsay
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>Lindsay@correo.com</Table.Cell>
            </Table.Row>

            <Table.Row>
            <Table.Cell collapsing>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>
                <Header as="h4" image>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/small/mark.png"
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    Mark
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>Mark@corre.com</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </section>
    </>
  );
};

export default AdminEstudiantes;
