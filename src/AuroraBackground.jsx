import React from 'react';
import { motion } from 'framer-motion';

export const AuroraBackground = () => {
  // Настройка анимации: плавное изменение прозрачности и легкое растягивание
  const breathAnimation = {
    animate: {
      opacity: [0.4, 0.6, 0.4], // То ярче, то тусклее
      scaleY: [1, 1.1, 1],      // Немного "дышит" по вертикали
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    // select-none и pointer-events-none — чтобы фон не мешал выделять текст
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* --- ГЛАВНЫЙ ШЛЕЙФ (Бирюзово-зеленый) --- */}
      <motion.div
        {...breathAnimation}
        // Мы делаем его очень широким (w-[200%]) и наклоняем (-skew-x-12)
        // Это создает эффект длинной полосы поперек экрана
        className="absolute top-[-100px] left-[-50%] w-[250%] h-[400px] bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 filter blur-[120px] opacity-50 transform -skew-x-12"
      />

      {/* --- ВТОРОЙ ШЛЕЙФ (Фиолетовый) --- */}
      <motion.div
         {...breathAnimation}
         // Добавляем задержку, чтобы они дышали не синхронно
         transition={{...breathAnimation.transition, delay: 2}}
        // Этот шлейф чуть ниже и правее
        className="absolute top-[50px] right-[-50%] w-[200%] h-[350px] bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 filter blur-[130px] opacity-40 transform -skew-x-6"
      />

      {/* --- Затемнение снизу --- */}
      {/* Это важный слой: градиент от прозрачного к цвету фона. */}
      {/* Он гарантирует, что низ экрана останется темным, как на макете. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/40 to-[#0f172a]" />
    </div>
  );
};