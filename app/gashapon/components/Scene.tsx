"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useState } from "react";
import GashaponMachine from "./GashaponMachine";
import GashaponBall from "./GashaponBall";

export default function Scene() {
  const [balls, setBalls] = useState<
    Array<{ id: number; color: string; position: [number, number, number] }>
  >([]);

  const handleGachapon = () => {
    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newBall = {
      id: Date.now(),
      color: randomColor,
      position: [1.75, 1.2, 0] as [number, number, number],
    };
    setBalls((prev) => [...prev, newBall]);
  };

  const handleBallClick = (id: number) => {
    console.log("Ball clicked:", id);
    // 后续可以添加开蛋动画
  };

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

      {/* 物理世界 */}
      <Physics gravity={[0, -9.8, 0]}>
        {/* 扭蛋機 */}
        <GashaponMachine />

        {/* 扭蛋球 */}
        {balls.map((ball) => (
          <GashaponBall
            key={ball.id}
            position={ball.position}
            color={ball.color}
            onClick={() => handleBallClick(ball.id)}
          />
        ))}

        {/* 地面碰撞體 */}
        <RigidBody type="fixed" colliders="cuboid">
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#e0e7ff" />
          </mesh>
        </RigidBody>
      </Physics>

      {/* 相機控制 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
      />

      {/* UI 按钮 */}
      <Html position={[0, 4, 0]} center>
        <button
          onClick={handleGachapon}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
        >
          抽扭蛋
        </button>
      </Html>
    </Canvas>
  );
}
