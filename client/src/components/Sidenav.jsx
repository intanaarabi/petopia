import { NavLink, useNavigate  } from 'react-router-dom';
import links from '../config/links';

import { IoLogOut } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authThunk';
import { useMemo, useState } from 'react';

const Sidenav = ({isOpen, onClose}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
      dispatch(logout())
      navigate('/login')
    }
    
    const sideNavClass = useMemo(()=> {
      return isOpen ? 'block' : 'hidden'
    }, [isOpen])

    return (
      <aside className='
      sm:sticky sm:top-0 sm:h-screen sm:block sm:min-w-[250px] justify-center'>
        <div className={`${sideNavClass} sm:hidden`}>
          <div onClick={onClose} className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </div>
        <div className={`${sideNavClass} sm:block`}>
          <div className="fixed inset-0 flex flex-col h-full bg-white w-52 z-50">
            <div className="text-typography-primary font-bold text-2xl pl-10 py-6 border-b border-background-primary mb-8">
                PETOPIA
            </div>
            <div className="flex flex-col gap-6 pl-10 text-typography-secondary font-light text-sm">
              {
                links.filter((link)=>link.sidenav).map((link,index)=> (
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
            <div className='flex-grow'></div>
            <button onClick={logoutUser} className="text-typography-secondary font-light mb-8 group flex flex-row items-center pl-10 gap-2">
              <IoLogOut className={` group-hover:text-button-accent transition-all duration-200 text-xl`} />
              <span className={`group-hover:text-typography-primary group-hover:font-bold  transition-all duration-200 text-sm `}>Log Out</span>
            </button>
            </div>
        </div>

      </aside>

    )
}


export default Sidenav
