import { Outlet, Link } from 'react-router-dom';
import links from '../config/links';

const Sidenav = () => {
    return (
        <>
        <div className="h-full flex flex-row">
            <div className="min-h-screen bg-white w-60">
                    <div className="text-typography-primary font-bold text-2xl pl-10 py-6 border-b border-background-primary mb-8">
                        PETOPIA
                    </div>
                    <div className="flex flex-col gap-6 pl-10 text-typography-secondary font-light">
                       {
                        links.map((link,index)=> (
                            <Link to={link.path} key={index}>
                                <div className="flex-row flex items-center gap-2">
                                    <link.icon />
                                    <span>{link.name}</span>
                                </div>
                          </Link>
                        ))
                       }
                    </div>
            </div>
            <div className="flex-grow p-8">
                <Outlet />

            </div>
        </div>

        </>
    )
}


export default Sidenav
