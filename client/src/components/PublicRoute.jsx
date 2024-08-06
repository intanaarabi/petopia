// BackgroundWrapper.js

import { Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";

const PublicRoute = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadStarsPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullscreen: false,
      background: {
        color: {
          value: "#8980FF",
        },
      },
      particles: {
          shape: {
            type: "circle", // starting from v2, this require the square shape script
          },
          number: {
              value: 100, // number of particles
          },
        },
      preset: "stars",
    }),
    [],
  );

  if (init) {
    return (
      <div className="overflow-hidden">
        <Outlet/>
        <Particles
          id="tsparticles"
          options={options}
        />
      </div>
    );
  }

  return <></>;
};

export default PublicRoute;

