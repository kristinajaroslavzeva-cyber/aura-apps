import React, { useState } from 'react';

export const ProjectModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    contact: '', 
    type: 'Mobile App',
    budget: 'Not sure',
    description: ''
  });

  // Функция для генерации текста заявки
  const getMessage = () => {
    return `👋 Привет! Новая заявка с сайта AURA:%0A
👤 *Имя:* ${formData.name}%0A
📞 *Контакт:* ${formData.contact}%0A
📱 *Проект:* ${formData.type}%0A
💰 *Бюджет:* ${formData.budget}%0A
📝 *Детали:* ${formData.description}`;
  };

  // --- ОТПРАВКА В WHATSAPP ---
  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const text = getMessage();
    window.open(`https://wa.me/77053512722?text=${text}`, '_blank');
    onClose();
  };

  // --- ОТПРАВКА В TELEGRAM ---
  const sendToTelegram = (e) => {
    e.preventDefault();
    
    // Трюк: Копируем текст в буфер обмена, так как Telegram не поддерживает авто-вставку
    const rawText = getMessage().replace(/%0A/g, '\n'); // Убираем коды переноса для буфера
    navigator.clipboard.writeText(rawText).then(() => {
      alert("Текст заявки скопирован! Вставьте его в чат (Ctrl+V).");
      window.open('https://t.me/+77053512722', '_blank');
    });
    
    onClose();
  };

  // --- ОТПРАВКА НА ПОЧТУ ---
  const sendToEmail = (e) => {
    e.preventDefault();
    const body = getMessage().replace(/%0A/g, '%0D%0A'); // Коды переноса для почты
    // ВСТАВЬ СЮДА СВОЮ ПОЧТУ ВМЕСТО example@gmail.com
    window.open(`mailto:molchan130786@gmail.com?subject=Заявка на разработку&body=${body}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Окно формы */}
      <div className="relative w-full max-w-lg bg-[#0f172a] border border-cyan-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(34,211,238,0.2)] animate-in fade-in zoom-in duration-300">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer z-50">✕</button>

        <h2 className="text-3xl font-bold text-white mb-2">Начать проект</h2>
        <p className="text-cyan-100/60 mb-6 text-sm">
          Заполните форму и выберите удобный способ связи.
        </p>

        <form className="space-y-4">
          
          <div>
            <label className="block text-xs text-cyan-300 mb-1 ml-2">Имя</label>
            <input 
              type="text" required placeholder="Ваше имя"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all"
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs text-cyan-300 mb-1 ml-2">Телефон / Email</label>
            <input 
              type="text" required placeholder="+7... или mail@..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all"
              value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-cyan-300 mb-1 ml-2">Тип</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all [&>option]:bg-[#0f172a]"
                value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option>Mobile App</option>
                <option>Web Site</option>
                <option>AI Integration</option>
                <option>Design</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-cyan-300 mb-1 ml-2">Бюджет</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all [&>option]:bg-[#0f172a]"
                value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}
              >
                <option>Не знаю</option>
                <option>$1k - $3k</option>
                <option>$3k - $8k</option>
                <option>$8k+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-cyan-300 mb-1 ml-2">О проекте</label>
            <textarea 
              rows="3" placeholder="Краткое описание задачи..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all resize-none"
              value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* КНОПКИ ОТПРАВКИ */}
          <div className="pt-4 grid grid-cols-1 gap-3">
            <span className="text-center text-xs text-white/30 uppercase tracking-widest">Отправить через:</span>
            
            <div className="grid grid-cols-3 gap-3">
              {/* WhatsApp */}
              <button onClick={sendToWhatsApp} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 hover:bg-[#25D366]/40 transition-all group">
                 <span className="text-xl mb-1 group-hover:scale-110 transition-transform">💬</span>
                 <span className="text-[10px] font-bold text-[#25D366] uppercase">WhatsApp</span>
              </button>

              {/* Telegram */}
              <button onClick={sendToTelegram} className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#0088cc]/20 border border-[#0088cc]/50 hover:bg-[#0088cc]/40 transition-all group">
                 <span className="text-xl mb-1 group-hover:scale-110 transition-transform">✈️</span>
                 <span className="text-[10px] font-bold text-[#0088cc] uppercase">Telegram</span>
              </button>

              {/* Email */}
              <button onClick={sendToEmail} className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all group">
                 <span className="text-xl mb-1 group-hover:scale-110 transition-transform">📧</span>
                 <span className="text-[10px] font-bold text-white uppercase">Email</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};