import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { BoxGeometry, Mesh } from 'three';
import * as THREE from 'three';

extend({ BoxGeometry });

type Props = {
  color: string;
  scale: number;
};

const Cube = ({ color, scale, ...props }: Props) => {
  const cubeRef = useRef<Mesh>(null);

  useFrame(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });

  return (
    <mesh ref={cubeRef} scale={[scale, scale, scale]} {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={new THREE.Color(color)} />
    </mesh>
  );
};

export default Cube;
