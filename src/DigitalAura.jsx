import React from 'react';
import { Cloud, Float } from '@react-three/drei';

export const DigitalAura = () => {
  return (
    <>
      {/* ВАЖНО: Облакам нужен свет, чтобы проявить цвет. 
         Без света они будут серыми или черными.
      */}
      <ambientLight intensity={0.6} /> {/* Мягкий общий свет */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />

      {/* Группа облаков, которая медленно парит вверх-вниз */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        
        {/* ОБЛАКО 1: Бирюзовое (Основное) */}
        <Cloud
          opacity={0.5}     // Прозрачность (0.5 = полупрозрачное)
          speed={0.4}       // Скорость движения частиц внутри облака
          width={10}        // Ширина облака
          depth={1.5}       // Толщина (объем)
          segments={20}     // Количество частиц (чем больше, тем гуще, но нагружает комп)
          texture="/cloud.png" // Использует стандартную текстуру дыма
          position={[-3, 0, -5]} // Сдвинуто влево и назад
          color="#00ffff"   // Бирюзовый цвет
        />

        {/* ОБЛАКО 2: Фиолетовое (Акцентное) */}
        <Cloud
          opacity={0.4}
          speed={0.3}       // Чуть медленнее
          width={10}
          depth={1.5}
          segments={20}
          position={[3, 1, -5]} // Сдвинуто вправо и чуть вверх
          color="#8a2be2"   // Фиолетовый цвет
        />
        
        {/* ОБЛАКО 3: Белое/Голубое (Для объема по центру) */}
        <Cloud
          opacity={0.2}
          speed={0.2}
          width={15}
          depth={2}
          segments={15}
          position={[0, -2, -8]} // Внизу и далеко
          color="#a5f3fc"
        />

      </Float>
    </>
  );
};