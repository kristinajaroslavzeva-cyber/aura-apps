import React, { useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen w-full bg-[#0b1121] overflow-x-hidden font-sans">
      
      <ProjectModal isOpen={isModalOpen} onClose={closeModal} />
      <Preloader />
      
      {/* Прячем кастомный курсор на мобильных (он там не нужен и мешает) */}
      <div className="hidden md:block"><CustomCursor /></div>

      <div className="fixed inset-0 z-0 pointer-events-none">
         <ParticlesBackground />
      </div>

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-2 md:p-10 mb-10">
        
        {/* Адаптивная высота: min-h-[85vh] */}
        <GlassCard id="capabilities" className="w-full max-w-7xl min-h-[85vh] md:h-[85vh] flex flex-col relative overflow-hidden pb-10 md:pb-0">
          
          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }}>
               <DigitalAura />
            </Canvas>
          </div>

          <div className="relative z-10 w-full h-full flex flex-col">
            
            <Navbar onOpenModal={openModal} />
            
            {/* АДАПТИВНАЯ СЕТКА: На мобильном в колонку, на компе в ряд */}
            <div className="flex-1 flex flex-col md:flex-row items-center px-4 md:px-20 pt-4 md:pt-0 gap-8 md:gap-0">
              
              {/* ТЕКСТ (На мобильном он будет вторым, order-2) */}
              <div className="w-full md:w-1/2 z-20 pointer-events-none order-2 md:order-1 text-center md:text-left">
                <div className="pointer-events-auto max-w-xl mx-auto md:mx-0">
                  <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-lg leading-tight">
                    AURA APPS
                  </h1>
                  
                  <div className="text-lg md:text-2xl text-cyan-300 mb-6 font-light tracking-wide h-[50px] md:h-[60px] flex items-center justify-center md:justify-start">
                     <Typewriter text="Создание ярких цифровых впечатлений" delay={50} />
                  </div>
                  
                  <p className="text-sm md:text-base text-blue-100/80 mb-8 leading-relaxed drop-shadow-md">
                    Мы создаем мобильные приложения полного цикла. 
                    От сложной архитектуры и интеграции <span className="text-cyan-400 font-bold">ИИ</span> до публикации в сторы.
                  </p>
                  
                  <button 
                    onClick={openModal}
                    className="px-8 py-3 rounded-full border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 transition-all cursor-pointer uppercase text-xs tracking-widest font-semibold backdrop-blur-sm bg-black/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  >
                    Создать проект
                  </button>

                </div>
              </div>

              {/* 3D СЦЕНА (На мобильном первая, order-1) */}
              {/* Задали фиксированную высоту 350px для телефона */}
              <div className="w-full h-[350px] md:h-full md:w-1/2 md:absolute md:right-0 md:top-0 md:bottom-0 order-1 md:order-2 z-10">
                 <Scene3D />
              </div>

            </div>
          </div>
        </GlassCard>
      </div>

      <div id="services"><Services /></div>
      <div id="contact"><ContactFooter /></div>

    </div>
  );
}

export default App;