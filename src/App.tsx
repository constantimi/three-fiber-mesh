import React from 'react';
import { Bvh, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { folder, Leva, useControls } from 'leva';
import { theme } from './constants/theme';
import Torus from './features/Torus';

const App = () => {
  const {
    orbit_rotate_speed,
    scale,
    tubes,
    outer_diameter,
    radius,
    speed_delta_x,
    speed_delta_y,
    wireframe,
  } = useControls({
    object: folder({
      wireframe: { value: false },
      scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
      radius: { value: 1, min: 0.1, max: 3, step: 0.1 },
      outer_diameter: { value: 0.3, min: 0.1, max: 1, step: 0.1 },
      tubes: { value: 97, min: 1, max: 100, step: 1 },
      speed_delta_x: { value: 0.2, min: 0, max: 100, step: 0.1 },
      speed_delta_y: { value: 0.4, min: 0, max: 100, step: 0.1 },
    }),
    orbit_rotate_speed: {
      value: 0.2,
      min: 0,
      max: 100,
      step: 0.1,
    },
  });

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundColor: '#202025',
      }}
    >
      <Canvas
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [0, 0, 5],
        }}
      >
        <Bvh firstHitOnly>
          <Torus
            scale={scale}
            radius={radius}
            outerDiameter={outer_diameter}
            tubes={tubes}
            speedDeltaX={speed_delta_x}
            speedDeltaY={speed_delta_y}
            wireframe={wireframe}
          />
        </Bvh>
        <OrbitControls autoRotate={true} autoRotateSpeed={orbit_rotate_speed} />
      </Canvas>
      <Leva collapsed={false} theme={theme} />
    </div>
  );
};

export default App;
