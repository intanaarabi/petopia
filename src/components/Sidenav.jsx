import { Outlet, NavLink } from 'react-router-dom';
import links from '../config/links';

const Sidenav = () => {
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
            <div className="flex-grow p-8">
                {/* Add breadcrumb here */}
                <div className='text-xs'>Breadcrumb</div>
                <Outlet />
            </div>
        </div>

        </>
    )
}


export default Sidenav
