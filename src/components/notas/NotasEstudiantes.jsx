import { useState } from "react";
import "./styleNotas.scss";
import { Button, Card, Modal, Progress, Select, Space, Table, Tooltip } from 'antd';
import userProfile from "../../assets/images/profile-img.jpg";
import { useSelector } from "react-redux";

const NotasEstudiantes = () => {
  const [selectedValue, setSelectedValue] = useState("Sprints");
  let nota2 = 9*10;
  let nota1 = 7*10;

  const handleChange = (value) => {
    setSelectedValue(value); 
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const promedioNotas = (nota1 + nota2) / 2;

  const calificaciones  = useSelector((store) => store.estudiantesReducer.estudiantes)

  return (
    <main className="notas">

      <aside className="notas__cards">
        <article className="notas__cards-header">
          <Select defaultValue="Módulo" style={{ width: 150}}> 
            <option value="1">Fundamentos</option>
            <option value="2">Profundización</option>
          </Select>
          <Select
          defaultValue="Tipo actividad"
          style={{
            width: 150,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'Sprints',
              label: 'Sprints',
            },
            {
              value: 'Workshops',
              label: 'Workshops',
            },
          ]}
          />
          
        </article>
        <div className="notas__barra">
          <p>2 {selectedValue} completados de 4</p>
          <Tooltip title={`2 ${selectedValue} completados de 4`}>
          <Progress
            percent={50}
            success={{
              percent: 50,
            }}
          />
          </Tooltip>
        </div>

        <Space className="container" direction="vertical" size={16}>
          <Card title="Sprint 2 - aerolíneas" style={{ width: '100%' }} extra={<p>Completado</p>}>
            <p>Fecha de entrega: Abril 23, 2023</p>
            <Button type="primary" onClick={showModal}>
              Feedback
            </Button>
            <Progress type="circle" percent={nota2} size={70} className="porcentaje"/>
            <Modal title="Retroalimentación Sprint 2" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Fecha de publicación: Abril 25, 2023</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae augue felis. Curabitur scelerisque lacus sit amet dignissim condimentum. Vivamus eu rhoncus metus. Mauris tempor suscipit hendrerit. Donec ornare enim non luctus finibus. Pellentesque risus purus, placerat sit amet faucibus non, tristique at lectus. Quisque sed odio dapibus, sagittis metus vestibulum, porttitor lorem.</p>
            <div>
              <img src={userProfile} alt="Foto Formador"/>
              <p>Escrito por: Formador</p>
            </div>
            </Modal>
          </Card>

          <Card title="Sprint 1 - E-commerce" style={{ width: '100%' }} extra={<p>Completado</p>}>
          <p>Fecha de entrega: Abril 23, 2023</p>
            <Button type="primary" onClick={showModal}>
              Feedback
            </Button>
            <Progress type="circle" percent={nota1} size={70} className="porcentaje"/>
          </Card>
        </Space>
      </aside>

      <aside className="notas__porcentajes">
        <section className="notas__actual">
        <Card title="Última calificación" style={{ width: '100%' }}>
        <Tooltip title="Sprint 2 - aerolíneas">
          <Progress type="circle" percent={nota2} className="porcentaje2"/>
            <p>Sprint 2 - aerolíneas</p>
        </Tooltip>
        </Card>
        </section>

        <section className="notas__promedio">
        <Card title="Nota promedio">
          <Tooltip title={`2 ${selectedValue} completados de 4`}>
          <Progress
            percent={promedioNotas}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            type="circle"
            className="porcentaje2"
          />
          </Tooltip>
        </Card>
        </section>
      </aside>
    </main>
  );
};

export default NotasEstudiantes;
