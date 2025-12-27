"use client";

import { useState } from "react";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useRef } from "react";

interface GashaponBallProps {
  position?: [number, number, number];
  color?: string;
  onClick?: () => void;
}

export default function GashaponBall({
  position = [0, 3, 0],
  color = "#ff6b6b",
  onClick,
}: GashaponBallProps) {
  const [isHovered, setIsHovered] = useState(false);
  const rigidBodyRef = useRef<RigidBodyApi>(null);

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="ball"
      restitution={0.6}
      friction={0.5}
    >
      <group>
        {/* 外部透明壳 */}
        <mesh
          castShadow
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
          onClick={onClick}
        >
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.4}
            metalness={0.1}
            roughness={0.1}
            transmission={0.8}
            thickness={0.3}
            emissive={isHovered ? "#ffffff" : "#000000"}
            emissiveIntensity={isHovered ? 0.3 : 0}
          />
        </mesh>

        {/* 内部颜色核心 */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </RigidBody>
  );
}
