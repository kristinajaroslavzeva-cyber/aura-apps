import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Environment, Float, PerspectiveCamera, OrbitControls, Sparkles, useCursor, useTexture, useVideoTexture } from '@react-three/drei';

// --- КОМПОНЕНТ ТЕЛЕФОНА (Без изменений) ---
function Phone({ position, rotation, scale = 1, frontImg, frontVideo, backImg, link }) {
  const [hovered, setHover] = useState(false);
  const phoneGroupRef = useRef();
  
  useCursor(hovered);

  const [backTexture] = useTexture([backImg]);
  
  const texture = frontVideo 
    ? useVideoTexture(frontVideo, { muted: true, loop: true, start: true, playsInline: true })
    : useTexture(frontImg);

  const handleClick = () => {
    if (link) window.open(link, '_blank'); 
  };

  useFrame((state, delta) => {
    if (!phoneGroupRef.current) return;

    // Вылет вперед при наведении (на ПК)
    const targetZ = hovered ? 0.5 : 0;
    phoneGroupRef.current.position.z = THREE.MathUtils.lerp(phoneGroupRef.current.position.z, targetZ, 0.1);

    // Увеличение при наведении
    const targetScale = hovered ? 1.3 : 1; // Чуть уменьшил увеличение, чтобы не вылезало
    const currentScale = THREE.MathUtils.lerp(phoneGroupRef.current.scale.x, targetScale, 0.1);
    phoneGroupRef.current.scale.setScalar(currentScale);

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
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group 
        position={position} rotation={rotation} scale={scale}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => setHover(false)}
        onClick={handleClick}
      >
        <mesh visible={false}><boxGeometry args={[1.5, 3, 0.5]} /></mesh>
        <group ref={phoneGroupRef}>
            <RoundedBox args={[1.2, 2.4, 0.12]} radius={0.15} smoothness={4}>
               <meshPhysicalMaterial color="#0f172a" metalness={0.9} roughness={0.4} clearcoat={1} />
            </RoundedBox>
            <mesh position={[0, 0, 0.065]}>
               <planeGeometry args={[1.1, 2.3]} />
               <meshBasicMaterial map={texture} toneMapped={false} />
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

// --- УМНАЯ ГРУППА (ИСПРАВЛЕНО) ---
function ResponsiveGroup() {
  const { size } = useThree();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // ПРОВЕРЯЕМ ШИРИНУ ВСЕГО ЭКРАНА (window.innerWidth), а не только холста
    // 768px - это стандартная граница между планшетом и телефоном
    
    if (window.innerWidth < 768) {
      // МОБИЛЬНЫЙ ВИД:
      // Делаем телефоны поменьше, чтобы влезли в верхний блок
      setScale(0.6); 
    } else {
      // КОМПЬЮТЕРНЫЙ ВИД:
      // Делаем КРУПНО (даже чуть больше, чем 100%, для эффекта)
      setScale(0.85); 
    }
  }, [size.width]); // Пересчитываем, если меняем размер окна

  return (
    <group rotation={[0.1, -0.3, 0]} scale={scale}>
      {/* Центр */}
      <Phone position={[0, 0, 1]} rotation={[0, -0.2, 0]} scale={1.1} frontImg="/1.jpg" backImg="/1b.jpg" link="//www.rustore.ru/catalog/app/com.natalchart.natalchartapp" />
      {/* Левый */}
      <Phone position={[-2, -0.5, 0]} rotation={[0.1, 0.3, -0.1]} frontImg="/2.jpg" backImg="/2b.jpg" link="www.rustore.ru/catalog/app/com.name.petmemo" />
      {/* Правый */}
      <Phone position={[2, -0.3, 0.5]} rotation={[-0.1, -0.4, 0.1]} frontImg="/3.jpg" backImg="/3b.jpg" link="//www.rustore.ru/catalog/app/com.natalchart.natalchartapp" />
    </group>
  );
}

// --- СЦЕНА ---
export const Scene3D = () => {
  return (
    <Canvas className="w-full h-full" dpr={[1, 2]} gl={{ alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={50} />
      <Sparkles count={50} scale={8} size={4} speed={0.4} opacity={0.5} color="#00ffff" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
      <Environment preset="city" />

      {/* Используем исправленную группу */}
      <ResponsiveGroup />
      
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        minPolarAngle={Math.PI / 2 - 0.1} 
        maxPolarAngle={Math.PI / 2 + 0.1}
        enableDamping={true}
      />
    </Canvas>
  );
};