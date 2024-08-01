import { Outlet, NavLink,useLocation  } from 'react-router-dom';
import links from '../config/links';
import { getPageTitle } from '../utils/pageTitle';
import { FaUser } from "react-icons/fa";

const Sidenav = () => {

    const location = useLocation();

    return (
        <>
        <div className="h-full flex flex-row">
            <div className="min-h-screen bg-white w-60">
                    <div className="text-typography-primary font-bold text-2xl pl-10 py-6 border-b border-background-primary mb-8">
                        PETOPIA
                    </div>
                    <div className="flex flex-col gap-6 pl-10 text-typography-secondary font-light text-sm">
                       {
                        links.map((link,index)=> (
                            <NavLink
                            to={link.path}
                            key={index}
                            className='group'
                          >
                            {({ isActive }) => (
                              <div className="flex-row flex items-center gap-2">
                                <link.icon className={` group-hover:text-button-accent transition-all duration-200 ${isActive ? 'text-button-accent' : ''}`} />
                                <span className={`group-hover:text-typography-primary group-hover:font-bold  transition-all duration-200 ${isActive ? 'text-typography-primary font-bold' : ''}`}>{link.name}</span>
                              </div>
                            )}
                          </NavLink>
                        ))
                       }
                    </div>
            </div>
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
        </div>

        </>
    )
}


export default Sidenav
