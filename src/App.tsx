import React from 'react';
import { Canvas } from '@react-three/fiber';
import Cube from './Cube';
import { OrbitControls } from '@react-three/drei';

const App = () => (
  <div
    className="App"
    style={{
      height: "100vh",
      width: "100vw",
    }}
  >
    <Canvas
      camera={{
        near: 0.1,
        far: 1000,
        zoom: 2,
        position: [0, 0, 5],
      }}
    >
      <Cube />
      <ambientLight args={[0xffffff]} intensity={0.2} />
      <directionalLight position={[1, 1, 1]} intensity={0.8} />
      <OrbitControls />
    </Canvas>
  </div>
);

export default App;
