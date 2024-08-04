import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Sidenav from './Sidenav';
import { selectCurrentToken, selectIsLoading } from '../redux/features/auth/authSlice';
import { getPageTitle } from '../utils/pageTitle';
import { FaUser } from "react-icons/fa";

const PrivateRoutes = () => {
    const token = useSelector(selectCurrentToken);
    const isLoading = useSelector(selectIsLoading);

    const location = useLocation()

    if (isLoading) {
        return <div>Loading...</div>;  // Display a loading spinner or similar
    }

    return (
            token ? (
            <div className='flex flex-row'>
            <Sidenav/>
            <div className="flex-grow flex flex-col gap-6 p-8">
              <div className='flex flex-row items-center'>
                  <div className='flex flex-col'>
                    <div className='text-xs'>Breadcrumb</div>
                    <div className='header'>{getPageTitle(location.pathname)}</div>
                  </div>
                  <div className='flex-grow'></div>
                  <div className='bg-white rounded-3xl items-center flex flex-row gap-4 px-4 py-2'>
                    <p className='text-sm'>Welcome, <span className='font-bold'>Intan!</span></p>
                    <div className='rounded-full w-[28px] h-[28px] bg-accent-primary flex justify-center items-center'>
                        <FaUser className='text-button-primary '/>

                    </div>
                  </div>
                </div>
              <Outlet />
            </div>
        </div>) : <Navigate to='/login' state={{from: location}} replace />
    )
};

export default PrivateRoutes;