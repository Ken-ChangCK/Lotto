'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { ReactNode } from 'react';

interface SceneProps {
  children?: ReactNode;
}

export default function Scene({ children }: SceneProps) {
  return (
    <Canvas
      shadows
      camera={{
        position: [0, 5, 10],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* 环境光 - 提供基础照明 */}
      <ambientLight intensity={0.5} />

      {/* 方向光 - 主光源，产生阴影 */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* 补光 - 从侧面补充光线 */}
      <pointLight position={[-5, 5, -5]} intensity={0.3} />

      {/* 背景色 */}
      <color attach="background" args={['#F5F0E8']} />

      {/* 环境贴图 - 提供反射效果 */}
      <Environment preset="sunset" />

      {/* 轨道控制器 - 允许用户旋转查看场景 */}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />

      {/* 子组件 */}
      {children}
    </Canvas>
  );
}
