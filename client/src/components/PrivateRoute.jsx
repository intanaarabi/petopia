import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Sidenav from './Sidenav';

const PrivateRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    isAuthenticated ? (
        <div>
        <Sidenav/>
        <Outlet />
      </div>) : <Navigate to='/login'/>
  )
};

export default PrivateRoutes;