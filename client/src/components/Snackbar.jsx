import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { hideSnackbar } from '../redux/features/snackbar/snackbarSlice';
import { SnackbarType } from '../enums';
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { MdOutlineWarning } from "react-icons/md";

const Snackbar = ({ id, message, type, duration = 3000 }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideSnackbar(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [dispatch, id, duration]);

  const typeClasses = {
    [SnackbarType.SUCCESS]: 'text-teal-500',
    [SnackbarType.ERROR]: 'text-red-500',
    [SnackbarType.INFO]: 'text-accent-primary',
    [SnackbarType.WARNING]: 'text-amber-500'
  };

const typeIcon = {
    [SnackbarType.SUCCESS]: <FaCheckCircle className="text-teal-500" />,
    [SnackbarType.ERROR]: <MdCancel  className="text-red-500"/>    ,
    [SnackbarType.INFO]: <MdInfo  className="text-accent-primary"/>    ,
    [SnackbarType.WARNING]: <MdOutlineWarning className='text-amber-500' />
}

  return (
    <div className={`${typeClasses[type]} card min-w-80 flex flex-col px-4 py-3 relative`} role="alert">
        <div className="font-bold flex flex-row items-center gap-2"> 
        {typeIcon[type]}{type.charAt(0).toUpperCase() + type.slice(1)}</div>
        <span className="pl-6 text-typography-primary text-[14px] font-medium">{message}</span>
    </div>
  );
};

Snackbar.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(SnackbarType)).isRequired,
  duration: PropTypes.number,
};



export default Snackbar;
