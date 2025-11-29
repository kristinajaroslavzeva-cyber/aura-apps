import React, { useState, useEffect } from 'react';

export const Typewriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay); // delay - скорость печати

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className="inline-block">
      {currentText}
      {/* Мигающая палочка курсора */}
      <span className="animate-pulse text-cyan-400 ml-1">|</span>
    </span>
  );
};