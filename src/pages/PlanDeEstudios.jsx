import Plan from "../assets/images/plan.png";
import "../styles/plan/planDeEstudios.scss";

const PlanDeEstudios = () => {
    return (
        <main className="container-fluid plan" >
        <div>
            <h1>Frontend Cohorte 4</h1> <br></br>
            <h2>Bienvenidos Bootcampers 👋</h2>
            <p>
            Si estás leyendo esto, es porque estás a bordo en este viaje de
            aprendizaje y crecimiento profesional 🚀.
            </p>
            <p>
            En este curso, tendrás la oportunidad de adquirir las habilidades
            necesarias para crear aplicaciones web interactivas y atractivas
            utilizando HTML, CSS, JavaScript y ReactJS, una de las bibliotecas de
            JavaScript más populares en el mundo.
            </p>
        </div> <br></br>

        <div>
            <h2>Descripción del curso 👁‍🗨</h2>
            <p>
            El curso de Desarrollo Web Frontend es un programa intensivo de cuatro
            meses diseñado para brindarte una experiencia completa y exhaustiva en
            el desarrollo de aplicaciones webs. El curso se divide en dos módulos: <br></br>
            1. Módulo 1 Fundamentos Webs <br></br> 2. Módulo 2 Profundización
            </p>
            <p>
            El primer módulo, Fundamentos Web, se centra en aprender cómo
            construir páginas web responsivas utilizando HTML, CSS y JavaScript.
            Durante las 4 semanas de este módulo, aprenderás sobre HTML y CSS,
            cómo utilizarlos para crear páginas web atractivas y fáciles de usar,
            y cómo añadir interactividad y dinamismo a las páginas web utilizando
            JavaScript.
            </p>
            <p>
            El segundo módulo, Profundización en ReactJS, se centra en el
            desarrollo de aplicaciones web con ReactJS, una biblioteca de
            JavaScript de código abierto ampliamente utilizada para el desarrollo
            de aplicaciones web interactivas y escalables. Este módulo está
            diseñado para aprender los conceptos básicos e intermedio de ReactJS,
            incluyendo componentes, estados y propiedades, y cómo utilizarlos para
            crear aplicaciones web dinámicas y altamente interactivas. También
            aprenderás sobre cómo integrar ReactJS con React-Redux, un marco para
            la gestión de estados en aplicaciones ReactJS, para crear soluciones
            completas y escalables.
            </p>
        </div> <br></br>

        <div>
            <h2>Proceso de Entrenamiento 🐱‍💻</h2>
            <p>
            El proceso de entrenamiento del Bootcamp consiste en un modelo de
            formación integral 100% virtual diseñado para desarrollar las
            competencias y habilidades necesarias para emplearse en el sector de
            tecnologías, compuesta por tres ejes: <br></br>
            1. Formaciones técnicas  <br></br>
            2. Formaciones de habilidades para la vida <br></br>
            3. Formaciones de habilidades para la empleabilidad
            </p>
        </div>
        <div className="col-md-6">
            <img
            src={Plan}
            alt="Placeholder"
            className="content-image"
            style={{ width: "100%" }}
            />
        </div> <br></br>

        <div>
            <h2>RoadMap 🌐</h2>
            <p>
            El componente de Formaciones técnicas del curso de Desarrollo Web Frontend está compuesto por dos etapas o módulos. Cada módulo a su vez, está integrado por sprints que consite en un periodo de tiempo de una a dos semanas, donde se abordarán temas específicos del módulo y tendrás la oportunidad de desarrollar workshops y proyectos basados en retos reales de la industria.
            </p>
            <p>
            El curso de Desarrollo web Frontend está construida de la siguiente manera: <br></br>
            <strong>Módulo 1: </strong>Fundamentos Webs (4 semanas) 🌱 <br></br>
            <strong>Sprint 1:</strong> Lógica de programación e introducción a HTML, CSS y JavaScript (6 sesiones) <br></br>
            <strong>Sprint 2: </strong> Avanzando en JavaScript y Responsive design (6 sesiones) <br></br>
            <strong>Sprint 3: </strong>Sprint 3: Promesas y Fetch API (6 sesiones) <br></br>
            <strong>Proyecto final: </strong>Proyecto final: Construcción de un e-commerce <br></br>
            </p>
            <p>
            <strong>Módulo 2: </strong>Profundización Front-end (8 semanas) 🌳 <br></br>
            <strong>Sprint 1:</strong> JavaScript Avanzado, SASS, código limpio y Webpack & babel (9 sesiones) <br></br>
            <strong>Sprint 2: </strong> ReactJS (9 sesiones) <br></br>
            <strong>Sprint 3: </strong>Profundización de Hooks e Introducción a Redux (9 sesiones) <br></br>
            <strong>Sprint 4: </strong>Redux, Firebase y testing (9 sesiones) <br></br>
            </p>
        </div>
        <h4>DEMO DAY 🎊: Proyecto final del curso (3 semanas) 🥇</h4>
        </main>
    );
};

export default PlanDeEstudios;
