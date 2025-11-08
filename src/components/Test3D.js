// src/components/Test3D.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

export default function Test3D() {
  return (
    <Canvas style={{ height: 400, width: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box>
        <meshStandardMaterial color="red" />
      </Box>
      <OrbitControls />
    </Canvas>
  );
}
