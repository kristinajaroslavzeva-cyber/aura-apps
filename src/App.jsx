import React, { useState } from 'react'; // <--- ИСПРАВЛЕНИЕ 1: Добавили useState
import { Canvas } from '@react-three/fiber';
import { GlassCard } from './GlassCard';
import { Navbar } from './Navbar';
import { Scene3D } from './Scene3D';
import { ParticlesBackground } from './ParticlesBackground';
import { DigitalAura } from './DigitalAura';
import { Services } from './Services';
import { ContactFooter } from './ContactFooter';
import { CustomCursor } from './CustomCursor';
import { Preloader } from './Preloader';
import { Typewriter } from './Typewriter';
import { ProjectModal } from './ProjectModal';

function App() {
  // Состояние: открыта модалка или нет
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция открытия/закрытия
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen w-full bg-[#0b1121] overflow-x-hidden">
      
      {/* 1. САМА МОДАЛКА */}
      <ProjectModal isOpen={isModalOpen} onClose={closeModal} />
      
      <Preloader />
      <CustomCursor />

      {/* 2. ГЛАВНЫЙ ФОН (ТОЧКИ) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <ParticlesBackground />
      </div>

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4 md:p-10 mb-10">
        
        {/* ID capabilities нужен для скролла */}
        <GlassCard id="capabilities" className="w-full max-w-7xl h-[85vh] flex flex-col relative overflow-hidden">
          
          {/* 3. ОБЛАКА ВНУТРИ */}
          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }}>
               <DigitalAura />
            </Canvas>
          </div>

          {/* 4. КОНТЕНТ */}
          <div className="relative z-10 w-full h-full flex flex-col">
            
            {/* ИСПРАВЛЕНИЕ 2: Передаем функцию открытия в Navbar */}
            <Navbar onOpenModal={openModal} />
            
            <div className="flex-1 flex items-center px-4 md:px-20">
              <div className="w-full md:w-1/2 z-20 pointer-events-none">
                <div className="pointer-events-auto max-w-xl text-left">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg leading-tight">
                    AURA APPS
                  </h1>
                  
                  {/* ЭФФЕКТ ПЕЧАТИ */}
                  <p className="text-xl md:text-2xl text-cyan-300 mb-6 font-light tracking-wide h-[60px] md:h-auto">
                     <Typewriter text="Создание ярких цифровых впечатлений" delay={50} />
                  </p>
                  
                  <p className="text-sm md:text-base text-blue-100/80 mb-10 leading-relaxed max-w-md drop-shadow-md">
                    Мы создаем мобильные приложения полного цикла. 
                    От сложной архитектуры и интеграции <span className="text-cyan-400 font-bold">ИИ</span> до публикации в сторы.
                  </p>
                  
                  {/* КНОПКА START PROJECT */}
                  <button 
                    onClick={openModal}
                    className="px-8 py-3 rounded-full border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 transition-all cursor-pointer uppercase text-xs tracking-widest font-semibold backdrop-blur-sm bg-black/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  >
                    Создать проект
                  </button>

                </div>
              </div>
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 md:w-[60%] h-full">
                 <Scene3D />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Блок Services с ID для скролла */}
      <div id="services">
        <Services />
      </div>
      
      {/* Блок Contact с ID для скролла */}
      <div id="contact">
        <ContactFooter />
      </div>

    </div>
  );
}

export default App;