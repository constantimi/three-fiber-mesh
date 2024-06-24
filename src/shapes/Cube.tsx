import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { BoxGeometry, Mesh } from 'three';

extend({ BoxGeometry });

type Props = {
  color: string;
};

const Cube = ({ color }: Props) => {
  const cubeRef = useRef<Mesh>(null);

  useFrame(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
};

export default Cube;
