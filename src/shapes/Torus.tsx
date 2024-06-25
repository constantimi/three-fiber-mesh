import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { BoxGeometry } from 'three';
import * as THREE from 'three';

extend({ BoxGeometry });

type Props = {
  color: string;
  scale: number;
};

const Torus = ({ color, scale, ...props }: Props) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const sphere = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta;
      mesh.current.rotation.y += delta;
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={[scale, scale, scale]}
      {...props}
      onPointerMove={(e) => {
        if (sphere.current && mesh.current) {
          sphere.current.position.copy(mesh.current.worldToLocal(e.point));
        }
      }}
      onPointerOver={() => {
        if (sphere.current) {
          sphere.current.visible = true;
        }
      }}
      onPointerOut={() => {
        if (sphere.current) {
          sphere.current.visible = false;
        }
      }}
    >
      <torusKnotGeometry args={[0.4, 0.5, 200, 50]} />
      <meshNormalMaterial />
      <mesh raycast={() => null} ref={sphere} visible={false}>
        <sphereGeometry args={[0.2]} />
        <meshBasicMaterial color={new THREE.Color(color)} toneMapped={false} />
      </mesh>
    </mesh>
  );
};

export default Torus;
