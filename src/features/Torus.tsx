import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { TorusKnotGeometry } from 'three';
import * as THREE from 'three';

extend({ TorusKnotGeometry });

type Props = {
  scale: number;
  radius: number;
  outerDiameter: number;
  tubes: number;
  speedDeltaX: number;
  speedDeltaY: number;
  wireframe: boolean;
};

const Torus = ({
  scale,
  radius,
  outerDiameter,
  tubes,
  speedDeltaX,
  speedDeltaY,
  wireframe,
  ...props
}: Props) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * speedDeltaX;
      mesh.current.rotation.y += delta * speedDeltaY;
    }
  });

  return (
    <mesh ref={mesh} scale={[scale, scale, scale]} {...props}>
      <torusKnotGeometry args={[radius, outerDiameter, 200, 100, tubes]} />
      <meshNormalMaterial wireframe={wireframe} />
    </mesh>
  );
};

export default Torus;
