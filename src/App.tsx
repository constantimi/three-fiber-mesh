import React from 'react';
import { Bvh, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import Cube from './shapes/Cube';
import Torus from './shapes/Torus';
import { SHAPES } from './types/enum';

const App = () => {
  const {
    enabled,
    ambient_light,
    directional_light,
    ambient_light_intensity,
    directional_light_intensity,
    color,
    select,
    background_color,
    rotate_speed,
  } = useControls({
    enabled: true,
    select: { options: Object.values(SHAPES) },
    color: '#5A7CF9',
    background_color: '#202025',
    rotate_speed: {
      value: 6,
      min: 0,
      max: 100,
      step: 1,
    },
    ambient_light: true,
    ambient_light_intensity: 0.2,
    directional_light: true,
    directional_light_intensity: 1.8,
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

  const renderShape = () => {
    switch (select) {
      case SHAPES.CUBE:
        return <Cube color={color} />;
      case SHAPES.TORUS:
        return <Torus color={color} />;
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
        <Bvh firstHitOnly enabled={enabled}>
          {renderShape()}
        </Bvh>
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
