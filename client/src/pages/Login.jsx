import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/auth/authThunk';
import { selectLoginError } from '../redux/features/auth/authSlice';

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './Register';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const loginError = useSelector(selectLoginError);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
      dispatch(login(data)).then((result) => {
        if (login.fulfilled.match(result)) {
          navigate('/');
        }
      });
    };
  
    return(
    <div className=" flex flex-row">
        <div className='bg-background-primary flex-grow justify-center items-center flex flex-col'>
          <div className='flex flex-col gap-2'>
            <p className='text-4xl text-accent-primary font-bold'>Welcome back</p>
            <p className='text-md text-typography-secondary'>Enter your email and password to sign in</p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-4 gap-4 text-typography-secondary'>
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
                <button type="submit" className='mt-4 bg-accent-primary text-white rounded-lg p-2 font-bold hover:opacity-80'>Sign In</button>
                {loginError && <div className='input-error text-center'>{loginError}</div>}
                <p className='text-center mt-2 text-sm'>Don&apos;t have an account?
                  <NavLink className='text-accent-primary font-bold' to='/register'> Sign up</NavLink>
                </p>
            </form>
          </div>
          
        </div>
        <div className='w-[45%] min-h-screen flex flex-row gap-4 items-center justify-center'>
          <img src='./logo-white.svg' className='w-20 mt-2'></img>
          <p className='text-[72px] text-white font-bold tracking-wide'>petopia</p>
        </div>
      
    </div>
    )
}

export default Login