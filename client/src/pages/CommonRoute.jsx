import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Snackbar from '../components/Snackbar';


const CommonRoute = () => {
const snackbars = useSelector((state) => state.snackbar.snackbars);

  return (
    <div className='relative'>
      <Outlet /> 
      <div className='absolute bottom-0 right-0 my-6 justify-center flex items-center gap-2 flex-col'>
        {snackbars.map((snackbar) => (
                <Snackbar
                key={snackbar.id}
                id={snackbar.id}
                message={snackbar.message}
                type={snackbar.type}
                duration={3000} 
                />
            ))}
      </div>
    
    </div>
  );
};

export default CommonRoute;
