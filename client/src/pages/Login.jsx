import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/auth/authThunk';
import { selectLoginError } from '../redux/features/auth/authSlice';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    <div className="bg-background-primary min-h-full">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button type="submit">Login</button>
            {loginError && <div>{loginError}</div>}
        </form>
    </div>
    )
}

export default Login