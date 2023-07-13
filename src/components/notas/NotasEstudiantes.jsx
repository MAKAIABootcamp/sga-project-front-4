import { useState } from "react";
import "./styleNotas.scss";
import { Button, Card, Modal, Progress, Select, Space, Tooltip } from 'antd';
import userProfile from "../../assets/images/profile-img.jpg";

const NotasEstudiantes = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
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

  return (
    <main className="notas">
      <aside className="notas__cards">
        <article className="notas__cards-header">
          <p>2 Sprints completados de 4</p>
          <Select
          defaultValue="Sprints"
          style={{
            width: 120,
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
        <Tooltip title="2 Sprints completados de 4">
        <Progress
          percent={50}
          success={{
            percent: 50,
          }}
        />
        </Tooltip>

        <Space direction="vertical" size={16}>
          <Card title="Sprint 2 - aerolíneas" style={{ width: '100%' }} extra={<p>Completado</p>}>
            <p>Fecha de entrega: Abril 23, 2023</p>
            <Progress type="circle" percent={90} size={70} className="porcentaje"/>
            <Button type="primary" onClick={showModal}>
              Feedback
            </Button>
            <Modal title="Retroalimentación Sprint 2" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Fecha de publicación: Abril 25, 2023</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae augue felis. Curabitur scelerisque lacus sit amet dignissim condimentum. Vivamus eu rhoncus metus. Mauris tempor suscipit hendrerit. Donec ornare enim non luctus finibus. Pellentesque risus purus, placerat sit amet faucibus non, tristique at lectus. Quisque sed odio dapibus, sagittis metus vestibulum, porttitor lorem.</p>
            <div>
              <img src={userProfile} alt="" />
              <p>Escrito por: Formador</p>
            </div>
            </Modal>
          </Card>

          <Card title="Sprint 1 - E-commerce" style={{ width: '100%' }} extra={<p>Completado</p>}>
          <p>Fecha de entrega: Abril 23, 2023</p>
            <Progress type="circle" percent={70} size={70} className="porcentaje"/>
            <Button type="primary">
              Feedback
            </Button>
          </Card>
        </Space>
      </aside>

      <aside className="notas__porcentajes">
        <section className="notas__actual">
        <Card title="Última calificación" style={{ width: '100%' }}>
          <Progress type="circle" percent={90} className="porcentaje2"/>
            <p>Sprint 2 - aerolíneas</p>
        </Card>
        </section>

        <section className="notas__promedio">
        <Card title="Nota promedio" style={{ width: '100%' }}>
          <Tooltip title="2 Sprints completados de 4">
          <Progress
            percent={80}
            success={{percent: 60 }}
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
