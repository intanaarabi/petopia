// BackgroundWrapper.js

import { Outlet } from "react-router-dom";

const AnimatedBackground = () => {
  return (
    <div className='bg-accent-primary'>
        <Outlet/>
    </div>
  );
};

export default AnimatedBackground;
