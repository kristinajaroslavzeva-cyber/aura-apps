import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export const Preloader = () => {
  const { progress } = useProgress(); // Следим за загрузкой 3D (0...100%)
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Когда загрузка дошла до 100%, ждем еще чуть-чуть (200мс) и убираем экран
    if (progress === 100) {
      setTimeout(() => setFinished(true), 500);
    }
  }, [progress]);

  // Если всё загрузилось и анимация исчезновения прошла — удаляем блок из DOM
  if (finished) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#0b1121] flex items-center justify-center transition-opacity duration-1000 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="text-center">
        {/* Пульсирующий логотип */}
        <h1 className="text-4xl font-bold text-white tracking-widest animate-pulse drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
          AURA APPS
        </h1>
        
        {/* Полоска загрузки */}
        <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-cyan-400 transition-all duration-300 ease-out shadow-[0_0_10px_#00ffff]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="mt-2 text-cyan-500/50 text-xs font-mono">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};