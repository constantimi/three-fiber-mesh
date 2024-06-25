import React, { useState } from 'react';
import { Bvh, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { folder, Leva, useControls } from 'leva';
import Cube from './shapes/Cube';
import Torus from './shapes/Torus';
import { SHAPES } from './types/enum';
import Sphere from './shapes/Sphere';

const SphereGroup = ({ spheres, setSpheres, speed, color, scale }) => {
  const radius = 1; // Major radius of the torus
  const tubeRadius = 0.1; // Minor radius of the torus
  const numSpheres = spheres.length;

  useFrame(() => {
    setSpheres((prevSpheres) => {
      const newSpheres = prevSpheres.map((sphere, i) => {
        const angle =
          ((Date.now() / 1000) * speed + (i / numSpheres) * Math.PI * 2) %
          (Math.PI * 2);
        const u = angle;
        const v = ((i * 2) / numSpheres) * Math.PI * 2;
        const x = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
        const y = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
        const z = tubeRadius * Math.sin(v);
        return { ...sphere, position: [x, y, z] };
      });
      return newSpheres;
    });
  });

  return (
    <>
      {spheres.map((sphere, i) => (
        <Sphere
          key={i}
          color={color}
          scale={scale}
          position={sphere.position}
          velocity={sphere.velocity}
        />
      ))}
    </>
  );
};

const App = () => {
  const {
    ambient_light,
    directional_light,
    ambient_light_intensity,
    directional_light_intensity,
    color,
    select,
    background_color,
    rotate_speed,
    scale,
    speed,
  } = useControls({
    select: { options: Object.values(SHAPES) },
    color: '#5A7CF9',
    background_color: '#202025',
    rotate_speed: {
      value: 6,
      min: 0,
      max: 100,
      step: 1,
    },
    scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
    lights: folder({
      ambient_light: true,
      ambient_light_intensity: 0.2,
      directional_light: true,
      directional_light_intensity: 1.8,
    }),
    speed: { value: 1, min: 0.1, max: 10, step: 0.1 },
  });

  const levaTheme = {
    colors: {
      elevation1: '#292D39',
      elevation2: '#181C20',
      elevation3: '#373C4B',
      accent1: '#0066DC',
      accent2: '#007BFF',
      accent3: '#3C93FF',
      highlight1: '#535760',
      highlight2: '#8C92A4',
      highlight3: '#FEFEFE',
    },
    sizes: {
      rootWidth: '380px',
      controlWidth: '140px',
      scrubberHeight: '10px',
      rowHeight: '30px',
      scrubberWidth: '8px',
      checkboxSize: '16px',
      joystickWidth: '100px',
      joystickHeight: '100px',
      colorPickerWidth: '160px',
      colorPickerHeight: '100px',
      monitorHeight: '60px',
      titleBarHeight: '39px',
    },
    fontSizes: {
      root: '10px',
      label: '10px',
      value: '10px',
    },
    borderWidths: {
      root: '0px',
      input: '1px',
      focus: '1px',
      hover: '1px',
      active: '1px',
      folder: '1px',
    },
  };

  const R = 1; // Major radius
  const r = 0.5; // Minor radius
  const numSpheres = 2; // Number of spheres

  const [spheres, setSpheres] = useState<
    {
      position: [number, number, number];
      velocity: [number, number, number];
    }[]
  >(
    Array.from({ length: numSpheres }).map((_, i) => {
      const u = (i / numSpheres) * Math.PI * 2;
      const v = ((i * 2) / numSpheres) * Math.PI * 2;
      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = (R + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v);
      const velocity: [number, number, number] = [0, 0, 0];
      return { position: [x, y, z], velocity };
    })
  );

  const renderShape = () => {
    switch (select) {
      case SHAPES.CUBE:
        return <Cube color={color} scale={scale} />;
      case SHAPES.TORUS:
        return <Torus color={color} scale={scale} />;
      case SHAPES.SPHERE:
        return (
          <SphereGroup
            spheres={spheres}
            setSpheres={setSpheres}
            speed={speed}
            color={color}
            scale={scale}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundColor: background_color,
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
        <Bvh firstHitOnly>{renderShape()}</Bvh>
        {ambient_light && (
          <ambientLight args={[0xffffff]} intensity={ambient_light_intensity} />
        )}
        {directional_light && (
          <directionalLight
            position={[1, 1, 1]}
            intensity={directional_light_intensity}
          />
        )}
        <OrbitControls autoRotate={true} autoRotateSpeed={rotate_speed} />
      </Canvas>
      <Leva collapsed={false} theme={levaTheme} />
    </div>
  );
};

export default App;
