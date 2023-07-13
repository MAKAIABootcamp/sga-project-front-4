import React from 'react'
import { Select } from "antd";
import { useState } from "react";
import { Breadcrumb } from "antd";
import './stylesButtonsFiltro.scss'

const ButtonsFiltro = () => {
    const [entrenamiento, setEntrenamiento] = useState('');
    const [modulo, setModulo] = useState('');
    const [cohorte, setCohorte] = useState('');
  
      const handleChangeEntrenamiento = (value) => {
          console.log(`selected ${value}`);
          setEntrenamiento(value);
        };
        const handleChangeModulo = (value) => {
          console.log(`selected ${value}`);
          setModulo(value);
        };
        const handleChangeCohorte = (value) => {
          console.log(`selected ${value}`);
          setCohorte(value);
        };
  return (
    <div>
    <div className="filters">
            <Select
              defaultValue="Entrenamiento"
              style={{
                width: 200,
              }}
              onChange={handleChangeEntrenamiento}
              options={[
                {
                  label: "Entrenamiento",
                  options: [
                    {
                      label: "Frontend",
                      value: "Frontend",
                    },
                    {
                      label: "Backend",
                      value: "Backend",
                    },
                    {
                      label: "Análisis de Datos",
                      value: "Análisis de Datos",
                    },
                  ],
                },
              ]}
            />
            <Select
              defaultValue="Modulo"
              style={{
                width: 200,
              }}
              onChange={handleChangeModulo}
              options={[
                {
                  label: "Modulo",
                  options: [
                    {
                      label: "Fundamentos",
                      value: "Fundamentos",
                    },
                    {
                      label: "Profundización",
                      value: "Profundización",
                    },
                  ],
                },
              ]}
            />
            <Select
              defaultValue="Cohorte"
              style={{
                width: 200,
              }}
              onChange={handleChangeCohorte}
              options={[
                {
                  label: "Cohorte",
                  options: [
                    {
                      label: "Front 1",
                      value: "Front 1",
                    },
                    {
                      label: "Front 2",
                      value: "Front 2",
                    },
                  ],
                },
              ]}
            />
            
          </div>
          <Breadcrumb className="asistencia__vistaFiltros"
            items={[
              {
                title: <a href="">{entrenamiento}</a>,
              },
              {
                title: <a href="">{modulo}</a>,
              },
              {
                title: <a href="">{cohorte}</a>,
              },
            ]}
          />
</div>
)
}

export default ButtonsFiltro