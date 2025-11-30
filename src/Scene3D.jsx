import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, Float, PerspectiveCamera, Sparkles, useTexture, useVideoTexture } from '@react-three/drei';

// --- КОМПОНЕНТ ТЕЛЕФОНА ---
function Phone({ position, rotation, scale = 1, frontImg, backImg, link }) {
  const groupRef = useRef();
  
  // Загружаем текстуры
  // Если backImg нет, используем frontImg, чтобы не было ошибки
  const [frontTexture, backTexture] = useTexture([frontImg, backImg || frontImg]);

  const handleClick = () => {
    if (link) window.open(link, '_blank'); 
  };

  useFrame((state) => {
    if (!groupRef.current) return;

    // ПАРАЛЛАКС (Плавное вращение за мышкой)
    const targetRotX = rotation[0] + (state.mouse.y * 0.2); 
    const targetRotY = rotation[1] + (state.mouse.x * 0.3); 

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
    
    // Чуть наклоняем корпус вбок
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, rotation[2] + (state.mouse.x * 0.05), 0.1);
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.2} 
      floatIntensity={0.5} 
      floatingRange={[-0.1, 0.1]}
    >
      <group 
        ref={groupRef}
        position={position} 
        rotation={rotation} 
        scale={scale}
        onClick={handleClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        {/* КОРПУС */}
        <RoundedBox args={[1.2, 2.4, 0.12]} radius={0.15} smoothness={4}>
           <meshPhysicalMaterial color="#0f172a" metalness={0.9} roughness={0.4} clearcoat={1} />
        </RoundedBox>

        {/* ЭКРАН ПЕРЕДНИЙ */}
        <mesh position={[0, 0, 0.065]}>
           <planeGeometry args={[1.1, 2.3]} />
           <meshBasicMaterial map={frontTexture} toneMapped={false} />
        </mesh>

        {/* ЭКРАН ЗАДНИЙ */}
        <mesh position={[0, 0, -0.065]} rotation={[0, Math.PI, 0]}>
           <planeGeometry args={[1.1, 2.3]} />
           <meshBasicMaterial map={backTexture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

// --- ГРУППА ТЕЛЕФОНОВ ---
function ResponsiveGroup() {
  const isMobile = window.innerWidth < 768;
  const scale = isMobile ? 1.0 : 0.9;

  return (
    <group 
      rotation={[0.1, -0.3, 0]} 
      scale={scale} 
      position={[0, 0.9, 0]} 
    >
      
      {/* ИСПРАВЛЕНИЕ: ВЕЗДЕ УКАЗАНЫ СУЩЕСТВУЮЩИЕ ФАЙЛЫ (1.jpg, 2.jpg, 3.jpg) */}
      
      {/* ЦЕНТР */}
      <Phone 
        position={[0, 0, 1]} rotation={[0, -0.2, 0]} scale={1.1} 
        frontImg="/1.jpg" backImg="/1.jpg" // Ставим 1.jpg и сзади тоже
        link="https://www.rustore.ru/catalog/app/com.natalchart.natalchartapp" 
      />
      
      {/* ЛЕВЫЙ */}
      <Phone 
        position={[-2, -0.5, 0]} rotation={[0.1, 0.3, -0.1]} 
        frontImg="/2.jpg" backImg="/2.jpg" // Ставим 2.jpg и сзади тоже
        link="https://www.rustore.ru/catalog/app/com.name.petmemo" 
      />
      
      {/* ПРАВЫЙ */}
      <Phone 
        position={[2, -0.3, 0.5]} rotation={[-0.1, -0.4, 0.1]} 
        frontImg="/3.jpg" backImg="/3.jpg" // Ставим 3.jpg и сзади тоже
        link="https://www.rustore.ru/catalog/app/com.user.hero" 
      />
      
    </group>
  );
}

// --- СЦЕНА ---
const Scene3D = () => {
  return (
    <Canvas 
      className="w-full h-full" 
      dpr={[1, 1.5]} 
      gl={{ antialias: true, alpha: true, powerPreference: "default" }}
    >
      <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={50} />
      <Sparkles count={50} scale={8} size={4} speed={0.4} opacity={0.5} color="#00ffff" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
      <Environment preset="city" />

      <ResponsiveGroup />
      
    </Canvas>
  );
};

export default Scene3D;