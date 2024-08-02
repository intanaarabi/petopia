import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Sidenav from './Sidenav';
import { selectCurrentToken, selectIsLoading } from '../redux/features/auth/authSlice';

const PrivateRoutes = () => {
    const token = useSelector(selectCurrentToken);
    const isLoading = useSelector(selectIsLoading);

    const location = useLocation()

    if (isLoading) {
        return <div>Loading...</div>;  // Display a loading spinner or similar
    }

    return (
            token ? (
            <div>
            <Sidenav/>
            <Outlet />
        </div>) : <Navigate to='/login' state={{from: location}} replace />
    )
};

export default PrivateRoutes;