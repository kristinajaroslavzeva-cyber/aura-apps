import React from 'react';
import { motion } from 'framer-motion';

export const AuraLogo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      
      {/* Контейнер для иконки (чтобы всё было по центру) */}
      <div className="relative flex items-center justify-center w-6 h-6">
        
        {/* 1. ПУЛЬСИРУЮЩАЯ ВОЛНА (Сзади) */}
        {/* Она расширяется от 100% до 250% и исчезает, как круги на воде */}
        <motion.div
          className="absolute w-3 h-3 bg-cyan-500 rounded-full"
          animate={{
            scale: [1, 10],       // Растет в 2.5 раза
            opacity: [0.7, 0],     // И плавно исчезает
          }}
          transition={{
            duration: 1.5,         // Скорость одной волны
            repeat: Infinity,      // Бесконечно
            ease: "easeOut",
          }}
        />

        {/* 2. ЯРКАЯ ТОЧКА (Спереди) */}
        {/* Статичное ядро, чтобы логотип всегда был четким и ярким */}
        <div className="relative w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_#00ffff]" />
      
      </div>

      {/* Текст логотипа */}
      {/* Добавил эффект: при наведении текст тоже слегка светится */}
      <span className="text-sm tracking-[0.2em] font-semibold text-white transition-all group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">
        AURA APPS
      </span>
    </div>
  );
};