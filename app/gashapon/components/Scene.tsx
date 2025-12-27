"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useState } from "react";
import GashaponMachine from "./GashaponMachine";
import GashaponBall from "./GashaponBall";
import PrizeDisplay from "./PrizeDisplay";
import { usePrizeSystem } from "../hooks/usePrizeSystem";
import { Prize, RARITY_COLORS } from "../types/prize";

export default function Scene() {
  const { draw } = usePrizeSystem();
  const [balls, setBalls] = useState<
    Array<{
      id: number;
      color: string;
      position: [number, number, number];
      prize: Prize;
    }>
  >([]);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  const handleGachapon = () => {
    // 抽奖
    const prize = draw();
    if (!prize) return;

    // 根据稀有度设置颜色
    const color = RARITY_COLORS[prize.rarity];

    const newBall = {
      id: Date.now(),
      color: color,
      position: [1.75, 1.2, 0] as [number, number, number],
      prize: prize,
    };
    setBalls((prev) => [...prev, newBall]);
  };

  const handleBallClick = (id: number) => {
    // 找到被点击的球
    const ball = balls.find((b) => b.id === id);
    if (ball) {
      setSelectedPrize(ball.prize);
      // 移除这个球
      setBalls((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <>
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

      </Canvas>

      {/* UI 控制区 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
        <button
          onClick={handleGachapon}
          className="group relative px-12 py-5 bg-gradient-to-b from-red-500 to-red-700 text-white text-2xl font-black rounded-full shadow-2xl hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 border-4 border-yellow-400"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            boxShadow: '0 10px 30px rgba(220, 38, 38, 0.6), inset 0 -4px 8px rgba(0,0,0,0.3)',
          }}
        >
          <span className="relative z-10 tracking-wider">🎰 抽扭蛋 🎰</span>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-full"></div>
        </button>

        <div className="text-white/70 text-sm">
          点击扭蛋球查看奖品
        </div>
      </div>

      {/* 奖项展示弹窗 */}
      <PrizeDisplay
        prize={selectedPrize}
        onClose={() => setSelectedPrize(null)}
      />
    </>
  );
}
