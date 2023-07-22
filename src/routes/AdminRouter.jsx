import { userTypes } from '../services/data';
import { Outlet } from 'react-router-dom';
import RutaNoPermitida from '../components/RutaNoPermitida/RutaNoPermitida';

const AdminRouter = ({ userType }) => {

    return (
        <div>{userType === userTypes.ADMINISTRADOR ? <Outlet /> : <RutaNoPermitida />}</div>
    )
};

export default AdminRouter;


