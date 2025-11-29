import React, { useRef } from 'react';

const skills = [
  {
    title: "AI & Computer Vision",
    icon: "🧠",
    description: "Разработка интеллектуальных систем. Мы внедряем LLM-модели для живого общения (как человек), используем компьютерное зрение для распознавания объектов по фото и анализируем сложные наборы данных.",
    projects: [
      { name: "Mental Coach (AI Chat)", url: "" },
      { name: "Animal Map (Vision)", url: "" },
      { name: "Natal Chart (Analysis)", url: "https://www.rustore.ru/catalog/app/com.natalchart.natalchartapp" }
    ]
  },
  {
    title: "Geolocation & Maps",
    icon: "🌍",
    description: "Работа с картографическими сервисами и GPS. Реализуем поиск объектов в заданном радиусе, трекинг перемещений и интерактивные карты с кастомными метками.",
    projects: [
      { name: "Animal Map (Radius Search)", url: "" },
      { name: "PetMemo (Tracking)", url: "https://www.rustore.ru/catalog/app/com.name.petmemo" }
    ]
  },
  {
    title: "High-Load Backend & Security",
    icon: "🛡️",
    description: "Проектирование сложной архитектуры. Безопасная авторизация, защита персональных данных (GDPR/152-ФЗ), модерация контента и надежные базы данных для хранения истории пользователей.",
    projects: [
      { name: "PetMemo (Full Cycle)", url: "https://www.rustore.ru/catalog/app/com.name.petmemo" },
      { name: "Mental Coach (Secure DB)", url: "" }
    ]
  },
  {
    title: "UI/UX & Gamification",
    icon: "✨",
    description: "Создание вовлекающих интерфейсов. Работа со сложной графикой, ассетами и анимациями. Внедрение игровых механик для удержания пользователей в приложении.",
    projects: [
      { name: "H2O Heroes (Game)", url: "https://www.rustore.ru/catalog/app/com.user.hero" },
      { name: "Natal Chart (Visuals)", url: "https://www.rustore.ru/catalog/app/com.natalchart.natalchartapp" }
    ]
  }
];

const GlowingCard = ({ skill }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] flex flex-col h-full"
    >
      {/* Эффекты свечения */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 0.2), transparent 40%)` }}
      />
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(34, 211, 238, 1), transparent 40%)`,
          maskImage: 'linear-gradient(#fff, #fff), linear-gradient(#fff, #fff)',
          maskClip: 'content-box, border-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '2px'
        }}
      />

      {/* Контент */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 origin-left">
          {skill.icon}
        </div>
        
        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-4">
          {skill.title}
        </h3>
        
        <p className="text-blue-100/70 group-hover:text-white transition-colors mb-8 leading-relaxed text-sm md:text-base">
          {skill.description}
        </p>
        
        {/* Список проектов (прижат к низу) */}
        <div className="mt-auto flex flex-wrap gap-2">
          {skill.projects.map((proj, idx) => (
            proj.url ? (
              // Если ссылка ЕСТЬ - делаем кнопку-ссылку
              <a 
                key={idx}
                href={proj.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[10px] md:text-xs text-cyan-300 font-mono tracking-wide hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white transition-all cursor-pointer flex items-center gap-1"
              >
                {proj.name} ↗
              </a>
            ) : (
              // Если ссылки НЕТ - просто красивый бейдж
              <span 
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] md:text-xs text-white/40 font-mono tracking-wide cursor-default"
              >
                {proj.name}
              </span>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export const Services = () => {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-20 drop-shadow-lg tracking-tight">
        Технологии и Экспертиза
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <GlowingCard key={index} skill={skill} />
        ))}
      </div>
    </section>
  );
};