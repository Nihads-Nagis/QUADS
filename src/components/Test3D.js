import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Stats } from "@react-three/drei";
import { Leva, useControls } from "leva";

function RotatingBox() {
  const mesh = useRef();

  const { color, speed, wireframe } = useControls("Box", {
    color: "#ff8800",
    speed: { value: 1, min: 0, max: 10, step: 0.1 },
    wireframe: false,
  });

  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * speed;
    mesh.current.rotation.y += delta * speed * 0.6;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

export default function Test3D() {
  // Avoid SSR issues
  if (typeof window === "undefined") return null;

  return (
    <>
      <Leva collapsed={false} />
      <Canvas
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          background: "#111",
        }}
        camera={{ position: [5, 5, 5], fov: 50 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <RotatingBox />
        </Suspense>
        <OrbitControls enableDamping dampingFactor={0.1} />
        <Stats />
      </Canvas>
    </>
  );
}
