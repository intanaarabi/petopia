
import './App.css'
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './redux/features/auth/authThunk';

import links from './config/links';
import Login from './pages/Login';
import PrivateRoutes from './components/PrivateRoute';
import Register from './pages/Register';
import { AnimatePresence } from 'framer-motion';
import PublicRoute from './components/PublicRoute';
import CommonRoute from './pages/CommonRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch]);

  return (
      <div className='bg-background-primary text-typography-primary min-h-screen'>
          <AnimatePresence>
            <Routes>
            <Route path="/" element={<CommonRoute />}>
                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/" element={<PrivateRoutes />}>
                  {links.map((link, index) => (
                    <Route key={index} path={link.path === "/" ? '' : link.path.slice(1)} element={link.component} />
                  ))}
                </Route>
              </Route>
            </Routes>
         </AnimatePresence>        
      </div>
  )
}

export default App
