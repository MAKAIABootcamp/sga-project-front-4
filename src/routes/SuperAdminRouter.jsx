import { userTypes } from '../services/data';
import { Outlet } from 'react-router-dom';
import RutaNoPermitida from '../components/RutaNoPermitida/RutaNoPermitida';

const SuperAdminRouter = ({ userType }) => {
    return <div>{userType === userTypes.SUPERADMIN ? <Outlet /> : <RutaNoPermitida />}</div>;
}

export default SuperAdminRouter;