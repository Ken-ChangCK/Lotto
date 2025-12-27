"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GashaponMachine from "./GashaponMachine";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [3, 2.5, 5],
        fov: 50,
      }}
      shadows
      className="w-full h-full"
    >
      {/* 環境光 */}
      <ambientLight intensity={0.5} />

      {/* 方向光（模擬太陽光） */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* 點光源 */}
      <pointLight position={[-5, 5, -5]} intensity={0.5} />

      {/* 扭蛋機 */}
      <GashaponMachine />

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#e0e7ff" />
      </mesh>

      {/* 相機控制 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
