import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Sidenav from './Sidenav';
import { selectIsAuthorized, selectIsLoading } from '../redux/features/auth/authSlice';
import { getPageTitle } from '../utils/pageTitle';
import { FaUser } from "react-icons/fa";
import { selectCurrentUser } from '../redux/features/user/userSlice';
import { selectCurrentPetMetadata } from '../redux/features/pets/currentPetSlice';
import { useMemo } from 'react';

const PrivateRoutes = () => {
    const isAuthorized = useSelector(selectIsAuthorized);
    const isLoading = useSelector(selectIsLoading);
    const user = useSelector(selectCurrentUser)
    const pet = useSelector(selectCurrentPetMetadata)
    const location = useLocation()

    const pageTitle = useMemo(() => getPageTitle(location.pathname, pet), [location.pathname, pet]);

    if (isLoading) {
        return <div>Loading...</div>;  
    }

    return (
      isAuthorized ? (
            <div className='h-full flex flex-row'>
            <Sidenav/>
            <div className="flex-grow flex flex-col gap-6 p-8">
              <div className='flex flex-row items-center'>
                  <div className='flex flex-col'>
                    <div className='text-xs'>Breadcrumb</div>
                    <div className='header'>{pageTitle}</div>
                  </div>
                  <div className='flex-grow'></div>
                  <div className='bg-white rounded-3xl items-center flex flex-row gap-4 px-4 py-2'>
                    <p className='text-sm'>Welcome, <span className='inline font-bold'>{user.name}!</span></p>
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