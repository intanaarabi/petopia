import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Sidenav from './Sidenav';
import { selectIsAuthorized, selectIsLoading } from '../redux/features/auth/authSlice';
import { getPageTitle } from '../utils/pageTitle';
import { FaUser } from "react-icons/fa";
import { selectCurrentUser } from '../redux/features/user/userSlice';
import { selectCurrentPetMetadata } from '../redux/features/pets/currentPetSlice';
import { useMemo, useState } from 'react';
import { IoIosMenu } from "react-icons/io";

const PrivateRoutes = () => {
    const isAuthorized = useSelector(selectIsAuthorized);
    const isLoading = useSelector(selectIsLoading);
    const user = useSelector(selectCurrentUser)
    const pet = useSelector(selectCurrentPetMetadata)
    const location = useLocation()

    const pageTitle = useMemo(() => getPageTitle(location.pathname, pet), [location.pathname, pet]);

    const [isSidenavOpen, setIsSidenavOpen] = useState(false);
    const closeSidenav = () => setIsSidenavOpen(false)

    const toggleSidenav = () => {
      setIsSidenavOpen(!isSidenavOpen);
    };

    if (isLoading) {
        return <div>Loading...</div>;  
    }

    return (
      isAuthorized ? (
            <div className='block flex flex-row relative '>
              <Sidenav isOpen={isSidenavOpen} onClose={closeSidenav}/>
              <div className='sm:min-h-screen sm:h-full flex-grow flex'>
                <div className="flex-grow flex flex-col gap-6 p-8 bg-background-primary ">
                  <div className='flex flex-row items-center gap-4'>
                      <button 
                        onClick={toggleSidenav}
                        className='sm:hidden block bg-white rounded-full items-center p-2'>
                          <IoIosMenu size={28}/>
                      </button>
                      <div className='flex flex-col'>
                        <div className='text-xs'>Breadcrumb</div>
                        <div className='header'>{pageTitle}</div>
                      </div>
                      <div className='flex-grow'></div>
                      <div className='flex bg-white rounded-3xl items-center  flex-row gap-4 px-4 py-2'>
                        <p className='hidden sm:block text-sm'>Welcome, <span className='inline font-bold'>{user.name}!</span></p>
                        <div className='rounded-full w-[28px] h-[28px] bg-accent-primary flex justify-center items-center'>
                            <FaUser className='text-button-primary '/>
                        </div>
                      </div>
                    </div>
                  <Outlet />
                </div>
              </div>
     
        </div>) : <Navigate to='/login' state={{from: location}} replace />
    )
};

export default PrivateRoutes;