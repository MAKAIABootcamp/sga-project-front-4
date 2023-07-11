import { Space, Table, } from 'antd';


const Calificaiones = () => {

    

    const columns = [
        {
          title: 'Name',
          dataIndex: 'nombre',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Workshop',
          dataIndex: 'calificaciones',
          key: 'calificaciones',
          render: (cal) => <span>{cal.workshop.nota}%</span>
        },
        {
            title: 'Spirit',
            dataIndex: 'calificaciones',
            key: 'calificaciones',
            render: (cal) => <span>{cal.sprint.nota}%</span>
          },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];

    const students = [
        {
          id: 1,
          foto: 'https://randomuser.me/api/portraits/men/1.jpg',
          nombre: 'John Doe',
          calificaciones: {
            workshop: {
              fecha: '2023-07-01',
              nota: 85
            },
            sprint: {
              fecha: '2023-06-25',
              nota: 90
            }
          }
        },
        {
          id: 2,
          foto: 'https://randomuser.me/api/portraits/men/2.jpg',
          nombre: 'Jane Smith',
          calificaciones: {
            workshop: {
              fecha: '2023-07-02',
              nota: 92
            },
            sprint: {
              fecha: '2023-06-26',
              nota: 87
            }
          }
        },
        {
          id: 3,
          foto: 'https://randomuser.me/api/portraits/men/3.jpg',
          nombre: 'Mark Johnson',
          calificaciones: {
            workshop: {
              fecha: '2023-07-03',
              nota: 80
            },
            sprint: {
              fecha: '2023-06-27',
              nota: 85
            }
          }
        },
        {
          id: 4,
          foto: 'https://randomuser.me/api/portraits/men/4.jpg',
          nombre: 'Emily Davis',
          calificaciones: {
            workshop: {
              fecha: '2023-07-04',
              nota: 88
            },
            sprint: {
              fecha: '2023-06-28',
              nota: 92
            }
          }
        },
        {
          id: 5,
          foto: 'https://randomuser.me/api/portraits/men/5.jpg',
          nombre: 'Michael Wilson',
          calificaciones: {
            workshop: {
              fecha: '2023-07-05',
              nota: 90
            },
            sprint: {
              fecha: '2023-06-29',
              nota: 86
            }
          }
        },
        {
          id: 6,
          foto: 'https://randomuser.me/api/portraits/men/6.jpg',
          nombre: 'Sophia Thompson',
          calificaciones: {
            workshop: {
              fecha: '2023-07-06',
              nota: 95
            },
            sprint: {
              fecha: '2023-06-30',
              nota: 88
            }
          }
        },
        {
          id: 7,
          foto: 'https://randomuser.me/api/portraits/men/7.jpg',
          nombre: 'Oliver Garcia',
          calificaciones: {
            workshop: {
              fecha: '2023-07-07',
              nota: 82
            },
            sprint: {
              fecha: '2023-07-01',
              nota: 90
            }
          }
        }
      ];
      

    return (
        <div>
            <Table columns={columns} dataSource={students} />
        </div>
    )
}

export default Calificaiones