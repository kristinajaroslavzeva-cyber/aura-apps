import React from 'react';
import { motion } from 'framer-motion';

export const AuraLogo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center w-6 h-6">
        <motion.div
          className="absolute w-3 h-3 bg-cyan-500 rounded-full"
          animate={{
            scale: [1, 2.5],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <div className="relative w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_#00ffff]" />
      </div>

      <span className="text-sm tracking-[0.2em] font-semibold text-white transition-all group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">
        AURA APPS
      </span>
    </div>
  );
};