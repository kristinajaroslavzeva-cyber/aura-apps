import React from 'react';

export const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`
      relative 
      backdrop-blur-3xl          /* Очень сильное размытие фона */
      bg-[#0b1121]/90            /* Почти сплошной темный цвет (90% непрозрачности) */
      border border-white/10     /* Тонкая рамка */
      shadow-[0_0_50px_rgba(0,0,0,0.5)] /* Глубокая тень */
      rounded-[30px]
      ${className}
    `}>
      {/* Верхний блик */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-30" />
      
      {children}
    </div>
  );
};