import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = ({ isAutentication }) => {
  return <div>{isAutentication ? <Navigate to="/dashboard" /> : <Outlet />}</div>;
};

export default PublicRouter;