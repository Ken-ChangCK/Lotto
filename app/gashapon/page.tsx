'use client';

import { useMemo } from 'react';
import Scene from './components/Scene';
import Ground from './components/Ground';
import GashaponBall, { BALL_COLORS } from './components/GashaponBall';

// 檢查兩個位置之間的距離
function checkDistance(
  pos1: [number, number, number],
  pos2: [number, number, number]
): number {
  const dx = pos1[0] - pos2[0];
  const dy = pos1[1] - pos2[1];
  const dz = pos1[2] - pos2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// 生成隨機位置的扭蛋球配置
function generateBallPositions(count: number) {
  const balls: Array<{ position: [number, number, number]; color: string }> = [];
  const radius = 3; // 分佈半徑
  const ballRadius = 0.5; // 球體半徑
  const minDistance = ballRadius * 2.2; // 最小距離（球體直徑 + 間距）
  const maxAttempts = 50; // 每個球的最大嘗試次數

  for (let i = 0; i < count; i++) {
    let validPosition = false;
    let attempts = 0;
    let x = 0, z = 0;

    // 嘗試找到一個不重疊的位置
    while (!validPosition && attempts < maxAttempts) {
      // 隨機角度
      const angle = Math.random() * Math.PI * 2;
      // 隨機距離（0 到 radius）
      const distance = Math.random() * radius;

      // 計算 x, z 座標（圓形分佈）
      x = Math.cos(angle) * distance;
      z = Math.sin(angle) * distance;

      // y 座標固定在地面上（球體半徑為 0.5）
      const y = 0.5;

      const newPosition: [number, number, number] = [x, y, z];

      // 檢查是否與已有球體重疊
      validPosition = balls.every(ball =>
        checkDistance(ball.position, newPosition) >= minDistance
      );

      attempts++;
    }

    // 如果找到有效位置，添加球體
    if (validPosition || balls.length === 0) {
      const y = 0.5;
      const color = BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)];

      balls.push({
        position: [x, y, z],
        color,
      });
    }
  }

  return balls;
}

export default function GashaponPage() {
  // 使用 useMemo 確保球的位置在組件重新渲染時保持不變
  const balls = useMemo(() => generateBallPositions(15), []);

  return (
    <div className="w-screen h-screen">
      <Scene>
        <Ground />

        {/* 渲染所有扭蛋球 */}
        {balls.map((ball, index) => (
          <GashaponBall
            key={index}
            position={ball.position}
            color={ball.color}
          />
        ))}
      </Scene>
    </div>
  );
}
