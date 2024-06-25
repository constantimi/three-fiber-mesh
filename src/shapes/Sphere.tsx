import React, { useRef } from 'react';
import { Sphere as ThreeSphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  color: string;
  scale: number;
  position?: [number, number, number];
  velocity: [number, number, number];
};

const Sphere = ({ color, scale, position = [0, 0, 0], velocity }: Props) => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.position.x += velocity[0];
      sphereRef.current.position.y += velocity[1];
      sphereRef.current.position.z += velocity[2];
    }
  });

  return (
    <ThreeSphere
      ref={sphereRef}
      args={[1, 32, 32]}
      scale={scale}
      position={position}
    >
      <meshStandardMaterial attach="material" color={new THREE.Color(color)} />
    </ThreeSphere>
  );
};

export default Sphere;
