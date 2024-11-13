import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { TorusKnotGeometry } from 'three';
import * as THREE from 'three';

// Extend the TorusKnotGeometry to be used in the JSX
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
  // Reference to the mesh object
  const mesh = useRef<THREE.Mesh>(null!);

  // Rotate the mesh on each frame
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * speedDeltaX;
      mesh.current.rotation.y += delta * speedDeltaY;
    }
  });

  return (
    <mesh ref={mesh} scale={[scale, scale, scale]} {...props}>
      {/* Create a torus knot geometry with the given parameters */}
      <torusKnotGeometry args={[radius, outerDiameter, 200, 100, tubes]} />
      {/* Apply a normal material to the mesh, with optional wireframe */}
      <meshNormalMaterial wireframe={wireframe} />
    </mesh>
  );
};

export default Torus;
