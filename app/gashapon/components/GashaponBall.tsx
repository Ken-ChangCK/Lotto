'use client';

import { useRef } from 'react';
import { Mesh } from 'three';

// 顏色配置 - 基於 default.png
export const BALL_COLORS = [
  '#8B3FDB', // 紫色
  '#E8934E', // 橙色
  '#D6579B', // 粉色
  '#F0BD4A', // 黃色
  '#4A9FE8', // 藍色
  '#D65959', // 紅色
];

interface GashaponBallProps {
  position: [number, number, number];
  color: string;
}

export default function GashaponBall({ position, color }: GashaponBallProps) {
  const meshRef = useRef<Mesh>(null);

  return (
    <group position={position}>
      {/* 下半球 - 白色部分 */}
      <mesh castShadow receiveShadow>
        {/*
          sphereGeometry 參數:
          - radius: 0.5
          - widthSegments: 32
          - heightSegments: 32
          - phiStart: 0
          - phiLength: Math.PI * 2 (完整圓周)
          - thetaStart: 0
          - thetaLength: Math.PI / 2 (下半球)
        */}
        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.4}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* 上半球 - 彩色部分 */}
      <mesh castShadow receiveShadow>
        {/*
          thetaStart: Math.PI / 2 (從中間開始)
          thetaLength: Math.PI / 2 (上半球)
        */}
        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* 中間分隔線 - 深色邊框 */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/*
          torusGeometry 參數:
          - radius: 0.5 (與球體半徑相同)
          - tube: 0.025 (分隔線寬度)
          - radialSegments: 16
          - tubularSegments: 100
        */}
        <torusGeometry args={[0.5, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#2C2C2C"
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* 金色光暈效果 - 模擬金色陰影 */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={0.8}
        distance={2.5}
        color="#FFD700"
        decay={2}
      />

      {/* 額外的環境光暈 - 增強金色效果 */}
      <pointLight
        position={[0, 0.3, 0]}
        intensity={0.3}
        distance={1.5}
        color="#FFA500"
        decay={2}
      />
    </group>
  );
}
