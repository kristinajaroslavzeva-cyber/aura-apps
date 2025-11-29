import React, { useState } from 'react';
import { AuraLogo } from './AuraLogo';

export const Navbar = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false); // Закрываем меню после клика
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-6 z-50 relative">
      
      {/* Логотип */}
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <AuraLogo /> 
      </div>

      {/* Меню для Компьютера (скрыто на мобильном) */}
      <div className="hidden md:flex gap-12 text-xs uppercase tracking-widest text-cyan-100/80 font-medium">
        <button onClick={() => scrollTo('services')} className="hover:text-cyan-400 transition-colors">Что мы предлагаем</button>
        <button onClick={() => scrollTo('contact')} className="hover:text-cyan-400 transition-colors">Контакты</button>
      </div>

      <div className="flex items-center gap-4">
        {/* Кнопка заявки (Видна всегда) */}
        <button 
          onClick={onOpenModal}
          className="border border-cyan-500/50 px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm text-cyan-300 hover:bg-cyan-500/10 transition-all uppercase tracking-wider"
        >
          Оставить заявку
        </button>

        {/* Кнопка ГАМБУРГЕР (Только на мобильном) */}
        <button 
          className="md:hidden text-white p-2 text-xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* ВЫПАДАЮЩЕЕ МЕНЮ (Только на мобильном) */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0f172a]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 text-center md:hidden animate-in slide-in-from-top-5 rounded-b-2xl shadow-2xl">
          <button onClick={() => scrollTo('services')} className="text-white text-sm uppercase tracking-widest py-2 border-b border-white/5">Services</button>
          <button onClick={() => scrollTo('capabilities')} className="text-white text-sm uppercase tracking-widest py-2 border-b border-white/5">Capabilities</button>
          <button onClick={() => scrollTo('contact')} className="text-white text-sm uppercase tracking-widest py-2">Contact</button>
        </div>
      )}

    </nav>
  );
};