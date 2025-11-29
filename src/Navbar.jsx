import React from 'react';
import { AuraLogo } from './AuraLogo';

export const Navbar = ({ onOpenModal }) => {
  // Функция для плавного скролла
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-6 text-xs uppercase tracking-widest text-cyan-100/80 font-medium z-50 relative">
      
      {/* ЛОГОТИП (Замена гамбургеру) */}
      <div 
        className="cursor-pointer hover:text-white transition-colors flex items-center gap-3 text-sm tracking-[0.2em] font-semibold" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Клик возвращает наверх
      >
        AURA APPS
      </div>

      {/* Меню */}
      <div className="hidden md:flex gap-12">
        <button onClick={() => scrollTo('services')} className="hover:text-cyan-400 transition-colors">
          Что мы можем предложить
        </button>
    
        <button onClick={() => scrollTo('contact')} className="hover:text-cyan-400 transition-colors">
          Контакты
        </button>
      </div>

      {/* Кнопка "Оставить заявку" в меню (опционально) */}
      <button 
        onClick={onOpenModal}
        className="hidden md:block border border-cyan-500/50 px-6 py-2 rounded-full text-cyan-300 hover:bg-cyan-500/10 transition-all"
      >
        Оставить заявку
      </button>

    </nav>
  );
};