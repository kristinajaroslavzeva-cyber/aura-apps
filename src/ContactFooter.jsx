import React, { useRef } from 'react';

// Компонент светящейся кнопки (тот же принцип, что у карточек)
const GlowingButton = ({ href, color, label, icon }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty('--mouse-x', `${x}px`);
    btnRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      className="group relative w-full md:w-auto overflow-hidden rounded-xl bg-white/5 px-8 py-4 transition-all duration-300 hover:scale-105 hover:bg-white/10"
    >
      {/* Свечение фона */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${color}20, transparent 60%)`
        }}
      />
      
      {/* Свечение рамки */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${color}60, transparent 40%)`,
          maskImage: 'linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)',
          maskClip: 'content-box, border-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }}
      />
      
      {/* Текст кнопки */}
      <div className="relative flex items-center justify-center gap-3 font-bold text-white group-hover:text-cyan-200 transition-colors">
        <span>{label}</span>
      </div>
    </a>
  );
};

export const ContactFooter = () => {
  return (
    <footer className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/10 mt-20 py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl font-bold text-white mb-8">
          Давайте обсудим ваш проект
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          
          <GlowingButton 
            href="https://wa.me/77053512722" 
            color="#25D366" // Зеленый для WhatsApp
            label="WhatsApp" 
          />

          <GlowingButton 
            href="https://t.me/+77053512722" 
            color="#0088cc" // Синий для Telegram
            label="Telegram" 
          />

          <GlowingButton 
            href="tel:+77053512722" 
            color="#ffffff" // Белый для телефона
            label="+7 (705) 351-27-22" 
          />

        </div>

        <p className="mt-10 text-white/30 text-sm">
          © 2025 AURA APPS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};