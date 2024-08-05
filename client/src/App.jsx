
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
import { AnimatePresence } from 'framer-motion';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch]);

  return (
      <div className='bg-background-primary text-typography-primary'>
          <AnimatePresence>
            <Routes>
              <Route element={<AnimatedBackground />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route path="/" className="bg-background-primary" element={<PrivateRoutes/>}>
                {
                    links.map((link,index)=>(
                      <Route key={index} path={link.path === "/" ? '' : link.path.slice(1)} element={link.component}/>
                    ))
                }
              </Route>
            </Routes>
         </AnimatePresence>
      </div>
  )
}

export default App
