import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, Float, PerspectiveCamera, OrbitControls, Sparkles, useCursor, useTexture } from '@react-three/drei';

// --- КОМПОНЕНТ ТЕЛЕФОНА ---
function Phone({ position, rotation, scale = 1, frontImg, backImg, link }) {
  const [hovered, setHover] = useState(false);
  const [frontTexture, backTexture] = useTexture([frontImg, backImg]);
  useCursor(hovered);
  
  const phoneGroupRef = useRef();

  const handleClick = () => {
    if (link) window.open(link, '_blank'); 
  };

  useFrame((state, delta) => {
    if (!phoneGroupRef.current) return;

    // Плавная анимация (LERP)
    // 1. Z-позиция (вылет вперед)
    const targetZ = hovered ? 0.5 : 0; // Двигаем внутри группы локально
    phoneGroupRef.current.position.z = THREE.MathUtils.lerp(phoneGroupRef.current.position.z, targetZ, 0.1);

    // 2. Масштаб
    const targetScale = hovered ? 1.4 : 1;
    const currentScale = THREE.MathUtils.lerp(phoneGroupRef.current.scale.x, targetScale, 0.1);
    phoneGroupRef.current.scale.setScalar(currentScale);

    // 3. Поворот к зрителю
    // Если навели - сбрасываем вращение в 0. Если нет - возвращаем исходное
    // Важно: мы вращаем внутреннюю группу, а не внешнюю, чтобы избежать конфликтов
    if (hovered) {
        phoneGroupRef.current.rotation.x = THREE.MathUtils.lerp(phoneGroupRef.current.rotation.x, -rotation[0], 0.1);
        phoneGroupRef.current.rotation.y = THREE.MathUtils.lerp(phoneGroupRef.current.rotation.y, -rotation[1], 0.1);
        phoneGroupRef.current.rotation.z = THREE.MathUtils.lerp(phoneGroupRef.current.rotation.z, -rotation[2], 0.1);
    } else {
        phoneGroupRef.current.rotation.x = THREE.MathUtils.lerp(phoneGroupRef.current.rotation.x, 0, 0.1);
        phoneGroupRef.current.rotation.y = THREE.MathUtils.lerp(phoneGroupRef.current.rotation.y, 0, 0.1);
        phoneGroupRef.current.rotation.z = THREE.MathUtils.lerp(phoneGroupRef.current.rotation.z, 0, 0.1);
    }
  });

  return (
    <Float 
      speed={hovered ? 0 : 2} 
      rotationIntensity={hovered ? 0 : 0.5} 
      floatIntensity={hovered ? 0 : 0.5}
    >
      {/* ХИТБОКС (HITBOX) - Главный секрет от дерганья.
         Это невидимая коробка, которая стоит на месте.
         Мышка реагирует на неё, а не на прыгающий телефон.
      */}
      <group 
        position={position} 
        rotation={rotation} 
        scale={scale}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => setHover(false)}
        onClick={handleClick}
      >
        {/* Невидимый куб для захвата мышки (чуть больше телефона) */}
        <mesh visible={false}>
            <boxGeometry args={[1.5, 3, 0.5]} />
        </mesh>

        {/* Настоящий телефон (Внутри группы, он двигается сам по себе) */}
        <group ref={phoneGroupRef}>
            {/* КОРПУС */}
            <RoundedBox args={[1.2, 2.4, 0.12]} radius={0.15} smoothness={4}>
            <meshPhysicalMaterial color="#0f172a" metalness={0.9} roughness={0.4} clearcoat={1} />
            </RoundedBox>

            {/* ЭКРАНЫ */}
            <mesh position={[0, 0, 0.065]}>
            <planeGeometry args={[1.1, 2.3]} />
            <meshBasicMaterial map={frontTexture} toneMapped={false} />
            </mesh>

            <mesh position={[0, 0, -0.065]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.1, 2.3]} />
            <meshBasicMaterial map={backTexture} toneMapped={false} />
            </mesh>
        </group>
      </group>
    </Float>
  );
}

// Платформу удалили совсем!

// --- СЦЕНА ---
export const Scene3D = () => {
  return (
    <Canvas className="w-full h-full" dpr={[1, 2]} gl={{ alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={50} />
      
      {/* Искры для атмосферы */}
      <Sparkles count={50} scale={8} size={4} speed={0.4} opacity={0.5} color="#00ffff" />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
      <Environment preset="city" />

      <group rotation={[0.1, -0.3, 0]} scale={0.95}>
        <Phone 
          position={[0, 0, 1]} 
          rotation={[0, -0.2, 0]} 
          scale={1.1} 
          frontImg="/1.jpg" backImg="/1b.jpg" link="https://google.com"
        />
        <Phone 
          position={[-2, -0.5, 0]} 
          rotation={[0.1, 0.3, -0.1]} 
          frontImg="/2.jpg" backImg="/2b.jpg" link="https://google.com"
        />
        <Phone 
          position={[2, -0.3, 0.5]} 
          rotation={[-0.1, -0.4, 0.1]} 
          frontImg="/3.jpg" backImg="/3b.jpg" link="https://google.com"
        />
        {/* Платформы больше нет */}
      </group>
      
      {/* minPolarAngle и maxPolarAngle = Math.PI / 2 
         Это ЗАПРЕЩАЕТ смотреть сверху или снизу. Только по горизонту.
      */}
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        minPolarAngle={Math.PI / 2 - 0.1} 
        maxPolarAngle={Math.PI / 2 + 0.1}
      />
    </Canvas>
  );
};