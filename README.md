![Logo Bootcamp MAKAIA SGA](https://github.com/MAKAIABootcamp/sga-project-front-4/assets/125513568/ed4dd3d8-1c20-401a-bdd9-bd73186be6e7)

# Sistema de Gestión de Aprendizaje (SGA)

## Autores:
1. Jhon Mario Cartagena Varon - https://github.com/mario-cartagena
2. José Humberto Sanmiguel Márquez - https://github.com/JJpepe12
3. Luisa Fernanda Urrego Ocampo - https://github.com/LuisaUrrego
4. Angie Julieth Moreno Ortega - https://github.com/AngieMorenoOrtega
5. Yesid Vanegas - https://github.com/yesid10

## Descripción:
Este proyecto es un aplicativo para monitorear el progreso de los estudiantes a través de un sistema de calificaciones. El software ofrece registros de calificaciones y el rango que cubre cada nivel de notas (bajo, medio bajo, alto y superior), seguimiento de asistencia y resultados de cada sprint y workshop, así como mostrar los perfiles cada estudiante y el cronograma de eventos.

## Las herramientas empleadas fueron:
1. Vite: entorno de desarrollo rápido para proyectos de frontend con React js.
2. React js: biblioteca de JavaScript para construir interfaces de usuario interactivas.
3. Redux y Redux toolkit: librerías para el manejo del estado de la aplicación.
4. Firebase: utilizado para la autenticación y almacenamiento de información en la base de datos Firestore.
5. React Router Dom: usado para la protección de rutas, mediante separación de rutas públicas y privadas
6. Formik y Yup: empleados para la validación de formularios y garantizar la integridad de los datos ingresados.
7. Bootstrap, Sass y AntDesign: utilizados para estilizar y mejorar el aspecto visual de la aplicación.
8. Media Queries y Material UI core: para el diseño responsive de la aplciación.
9. FullCalendar: librería para gestionar el cronograma
10. Xlmx: librerría para descargar archivos de Excel.

## Roles de Usuario - Alcance
El alcance del aplicativo se basa en las funcionalidades de cuatro roles o tipos de usuario:

1. Participante: tiene acceso solo a visualizar las calificaciones, asistencias y recursos educativos.
2. Formador: puede agregar y modificar los datos, asistencias, recursos educativos y calificaciones del usuario participante.
3. Administrador: cuenta con capacidad para visualizar, agregar, modificar y eliminar cualquier tipo de información, tanto del Participante como del Formador.
4. Superadministrador: tiene la capacidad de agregar nuevos administradores y gestionar los permisos de los demás usuarios.

### Nota
Es importante destacar que el Superadministrador es un rol con poderes amplios y debe asignarse con responsabilidad. Recomendamos limitar el número de personas con este rol y asegurar que se mantengan altos estándares de seguridad y protección de datos.

# Instalación y Uso

### 💻 Requisitos previos:

* Node js v16.14.2 o cualquier versión posterior a esta
* Firebase instalado (npm install -g firebase-tools)

Para ejecutar la aplicación, sigue estos pasos:

### ➡️ Instrucciones de instalación

1. Clona el repositorio (en consola usa el comando `git clone`, seguido del enlace copiado de github)
2. Instala las dependencias con el comando `npm install`.
3. Configura las credenciales de Firebase para la autenticación y base de datos.
4. En la consola, ejecuta la aplicación con el comando `npm run dev`. Este comando se dedebe correr cada vez que se abra el proyecto para poderlo visualizar
5. Accede a la aplicación desde el link generado (debería ser http://localhost:3000 o http://localhost:5173)

¡Listo! Ahora podrás disfrutar del aplicativo SGA de monitoreo de progreso estudiantil y gestionar los datos de manera eficiente.

## Documentación

En los siguientes documentos podrás consultar la documentación y el proceso de Design Thinking hecho para el proyecto: 

1. Plantilla de registro de proyectos: [Excel Design thinking](https://docs.google.com/spreadsheets/d/1MQfxfJk7TLrXOXbM4TJVpdCHV5XggJaQ/edit?usp=drive_link&ouid=116622975878272974715&rtpof=true&sd=true)
2. Flujo del aplicativo: [FLUJO SGA MAKAIA](https://docs.google.com/document/d/1_KDRxkwyj0XGY0mLy8PZRAYuVPL7xaSXlVXp7i5vAS4/edit?usp=sharing)
3. Prototipo: [Prototipo Canva](https://www.canva.com/design/DAFm9CM8B3U/b3mTxCHQwomgyj5S4_Vu2w/view?utm_content=DAFm9CM8B3U&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)
4. Despliegue: https://sga-makaia.web.app/

# Licencia

Este proyecto está bajo la Licencia MIT. Si deseas saber más, consulta el enlace [MIT](https://choosealicense.com/licenses/mit/) para obtener detalles
