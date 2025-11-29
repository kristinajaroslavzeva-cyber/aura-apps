import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      className="absolute inset-0 z-0"
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false }, // Чтобы не перекрывал весь сайт, а сидел в блоке
        background: {
          color: { value: "transparent" }, // Прозрачный, чтобы видеть наш синий фон
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // "repulse" = убегать от мышки
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.2, // Прозрачность линий
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 1, // Медленное движение
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 80, // Количество точек
          },
          opacity: { value: 0.3 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
};