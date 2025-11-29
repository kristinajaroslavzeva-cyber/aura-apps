import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef}
      // ВАЖНО: z-[9999999] - очень большое число, чтобы быть выше всех окон
      className="fixed top-0 left-0 pointer-events-none z-[9999999] -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform' }}
    >
      {/* 1. ЯДРО (Центр) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-[4px]" />
      
      {/* 2. ОРЕОЛ (Вокруг) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-cyan-400 opacity-40 blur-[20px]" />
      
      {/* 3. БОЛЬШОЙ СВЕТ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-500 opacity-10 blur-[60px]" />
    </div>
  );
};