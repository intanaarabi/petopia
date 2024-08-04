// BackgroundWrapper.js

import { Outlet } from "react-router-dom";

const AnimatedBackground = () => {
  return (
    <div className='bg-accent-primary min-h-screen'>
        <Outlet/>
    </div>
  );
};

export default AnimatedBackground;
