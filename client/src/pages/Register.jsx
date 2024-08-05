import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/features/auth/authThunk';
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom';
import { setUserProfile } from '../redux/features/user/userThunk';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
      dispatch(registerUser(data)).then((result) => {
        if (registerUser.fulfilled.match(result)) {
          navigate('/');
        }
        dispatch(setUserProfile())
      });
    };
  
    return(
      <div className="h-full flex flex-row">
        <motion.div 
           initial={{ x: '-100vw' }}
           animate={{ x: 0 }}
           transition={{ type: "spring", bounce: 0.25 }}
            className='z-10 w-[45%] flex flex-row gap-4 items-center justify-center'>
          <img src='./logo-white.svg' className='w-20 mt-2'></img>
          <p className='text-[72px] text-white font-bold tracking-wide'>petopia</p>
        </motion.div>
        <motion.div
            initial={{ x: '-45vw' }}
            animate={{ x: 0 }}
            transition={{ type: "spring", bounce: 0.25 }}
          className='z-10 bg-background-primary flex-grow min-h-screen justify-center items-center flex flex-col'>
          <motion.div
              initial={{ x: '100vw' }}
              animate={{ x: 0 }}
              transition={{ type: "spring", bounce: 0.25 }}
              className='flex flex-col gap-2'>
            <p className='text-4xl text-accent-primary font-bold'>Create an account</p>
            <p className='text-md text-typography-secondary'>Enter your details for registration</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-4 gap-4 text-typography-secondary'>
                 <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="label-primary font-bold">Name</label>
                    <input 
                    id='name'
                    type='name'
                    placeholder='Your full name'
                    {...register('name', {required: 'Name is required'})}
                    className={`w-full input ${errors.password ? 'border-red-500' : '' }`}
                    />
                    {errors.name && <span className='input-error'>{errors.name.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="label-primary font-bold">Email</label>
                    <input 
                    id='email'
                    type='email'
                    placeholder='Your email address'
                    {...register('email', {required: 'Email is required'})}
                    className={`w-full input ${errors.password ? 'border-red-500' : '' }`}
                    />
                    {errors.email && <span className='input-error'>{errors.email.message}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="label-primary font-bold">Password</label>
                    <input 
                    id='password'
                    type='password'
                    placeholder='Your password'
                    {...register('password', {required: 'Password is required'})}
                    className={`w-full input ${errors.password ? 'border-red-500' : '' }`}
                    />
                    {errors.password && <span className='input-error'>{errors.password.message}</span>}
                    </div>
                <button type="submit" className='mt-4 bg-accent-primary text-white rounded-lg p-2 font-bold hover:opacity-80'>Sign Up</button>
                <p className='text-center mt-2 text-sm'>Already have an account?
                  <NavLink className='text-accent-primary font-bold' to='/login'> Sign In</NavLink>
                </p>
            </form>
          </motion.div>
          
        </motion.div>

      
    </div>
    )
}

export default Register