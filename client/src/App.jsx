
import './App.css'
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/features/auth/authThunk';

import links from './config/links';
import Login from './pages/Login';
import PrivateRoutes from './components/PrivateRoute';
import AnimatedBackground from './components/AnimatedBackground';
import Register from './pages/Register';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
      <div className='bg-background-primary min-h-screen text-typography-primary'>
          <Routes>
            <Route path="/" element={<AnimatedBackground />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route element={<PrivateRoutes/>}>
              {
                  links.map((link,index)=>(
                    <Route key={index} path={link.path === "/" ? '' : link.path.slice(1)} element={link.component}/>
                  ))
              }
            </Route>
         </Routes>
      </div>
  )
}

export default App
