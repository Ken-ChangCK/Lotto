"use client";

import { useRef } from "react";
import { Mesh } from "three";

export default function GashaponMachine() {
  const machineRef = useRef<Mesh>(null);

  return (
    <group position={[0, 0, 0]}>
      {/* 底座 */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.5, 0.6, 32]} />
        <meshStandardMaterial
          color="#dc2626"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* 底座装饰环 */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[1.15, 1.15, 0.1, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 中间主体（存放扭蛋的部分） */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 1.2, 32]} />
        <meshStandardMaterial
          color="#dc2626"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* 玻璃球形罩 */}
      <mesh position={[0, 2.3, 0]} castShadow ref={machineRef}>
        <sphereGeometry args={[1.1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          metalness={0.1}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* 玻璃罩顶部金属环 */}
      <mesh position={[0, 3.3, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 出口通道 */}
      <mesh position={[1.3, 0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 16]} />
        <meshStandardMaterial
          color="#dc2626"
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* 出口开口 */}
      <mesh position={[1.75, 0.8, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 16]} />
        <meshStandardMaterial color="#991b1b" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* 转盘（装饰用） */}
      <mesh position={[1.1, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 转盘手柄 */}
      <mesh position={[1.35, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
