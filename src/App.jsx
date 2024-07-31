
import './App.css'
import Sidenav from './components/Sidenav'
import { Routes, Route } from "react-router-dom";
import links from './config/links';

function App() {

  return (
      <div className='bg-background-primary min-h-screen text-typography-primary'>
          <Routes>
            <Route path="/" element={<Sidenav/>}>
              {
                links.map((link,index)=>(
                  <Route key={index} path={link.path === "/" ? '' : link.path.slice(1)} element={<link.component/>}/>
                ))
              }
            </Route>
         </Routes>
      </div>
  )
}

export default App
