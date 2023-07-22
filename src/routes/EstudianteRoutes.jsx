import { userTypes } from '../services/data';
import { Outlet } from 'react-router-dom';
import RutaNoPermitida from '../components/RutaNoPermitida/RutaNoPermitida';

const EstudiantesRoute = ({ userType }) => {
    return <div>{userType === userTypes.ESTUDIANTE ? <Outlet /> : <RutaNoPermitida />}</div>;
}

export default EstudiantesRoute;