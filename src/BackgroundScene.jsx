import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

// Компонент вращающегося неба
const MovingStars = () => {
  const starsRef = useRef();

  useFrame(() => {
    // Вращаем звезды очень медленно вокруг своей оси
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005; // Скорость вращения
      starsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <group ref={starsRef}>
      {/* radius — радиус сферы звезд, count — количество */}
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={2} />
    </group>
  );
};

export const BackgroundScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas className="w-full h-full">
        <perspectiveCamera position={[0, 0, 10]} />
        {/* Используем наши вращающиеся звезды */}
        <MovingStars />
      </Canvas>
    </div>
  );
};