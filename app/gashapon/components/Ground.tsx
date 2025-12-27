'use client';

export default function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      {/* 圆形平台 */}
      <circleGeometry args={[8, 64]} />
      <meshStandardMaterial
        color="#E8DCC8"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}
