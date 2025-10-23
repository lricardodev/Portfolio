"use client";

import { useEffect, useRef, useState } from 'react';

// Tipos para Vanta.js
interface VantaEffect {
  destroy: () => void;
  resize: () => void;
}

interface VantaWavesConfig {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  scale: number;
  scaleMobile: number;
  color: number;
  color2: number;
  shininess: number;
  waveHeight: number;
  waveSpeed: number;
  zoom: number;
}

interface VantaParticlesConfig {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  scale: number;
  scaleMobile: number;
  color: number;
  color2: number;
  size: number;
  spacing: number;
}

interface VantaNetConfig {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  scale: number;
  scaleMobile: number;
  color: number;
  color2: number;
  backgroundColor: number;
  points: number;
  maxDistance: number;
  spacing: number;
  showDots: boolean;
}

type VantaEffectType = 'waves' | 'dots' | 'net' | 'clouds' | 'birds';

interface VantaBackgroundProps {
  effect?: VantaEffectType;
  className?: string;
  children?: React.ReactNode;
}

export const VantaBackground: React.FC<VantaBackgroundProps> = ({
  effect = 'waves',
  className = '',
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<VantaEffect | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadVantaEffect = async () => {
      if (!containerRef.current) return;

      // Limpiar efecto anterior
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }

      try {
        let vantaEffect: VantaEffect;

        switch (effect) {
          case 'waves':
            const vantaWaves = await import('vanta/dist/vanta.waves.min');
            vantaEffect = (vantaWaves as any).default({
              el: containerRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x05fd9b, // Tu color verde principal
              color2: 0x04c77a, // Tu color verde oscuro
              shininess: 50.00,
              waveHeight: 20.00,
              waveSpeed: 0.75,
              zoom: 0.75
            } as VantaWavesConfig);
            break;

          case 'dots':
            const vantaDots = await import('vanta/dist/vanta.dots.min');
            vantaEffect = (vantaDots as any).default({
              el: containerRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x05fd9b,
              color2: 0x4dffb8,
              size: 1.50,
              spacing: 50.00
            } as VantaParticlesConfig);
            break;

          case 'net':
            const vantaNet = await import('vanta/dist/vanta.net.min');
            vantaEffect = (vantaNet as any).default({
              el: containerRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x05fd9b,
              color2: 0x04c77a,
              backgroundColor: 0x0a0f0d,
              points: 12.00,
              maxDistance: 25.00,
              spacing: 20.00,
              showDots: true
            } as VantaNetConfig);
            break;

          case 'clouds':
            const vantaClouds = await import('vanta/dist/vanta.clouds.min');
            vantaEffect = (vantaClouds as any).default({
              el: containerRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x05fd9b,
              color2: 0x4dffb8,
              skyColor: 0x0a0f0d,
              cloudColor: 0x05fd9b,
              cloudShadowColor: 0x04c77a,
              sunColor: 0x4dffb8,
              sunGlareColor: 0x05fd9b,
              sunlightColor: 0x05fd9b,
              speed: 0.5
            });
            break;

          case 'birds':
            const vantaBirds = await import('vanta/dist/vanta.birds.min');
            vantaEffect = (vantaBirds as any).default({
              el: containerRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color1: 0x05fd9b,
              color2: 0x4dffb8,
              colorMode: 'lerp',
              birdSize: 0.60,
              wingSpan: 20.00,
              speedLimit: 3.00,
              separation: 20.00,
              alignment: 5.00,
              cohesion: 5.00,
              quantity: 3.00
            });
            break;

          default:
            throw new Error(`Efecto no soportado: ${effect}`);
        }

        vantaRef.current = vantaEffect;
        setIsLoaded(true);

        // Manejar resize
        const handleResize = () => {
          if (vantaRef.current && 'resize' in vantaRef.current) {
            vantaRef.current.resize();
          }
        };

        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
        };

      } catch (error) {
        console.error('Error cargando efecto Vanta:', error);
        setIsLoaded(true); // Mostrar contenido aunque falle el efecto
      }
    };

    loadVantaEffect();

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, [effect]);

  return (
    <div 
      ref={containerRef}
      className={`vanta-background ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    >
      {children}
    </div>
  );
};

// Componente para cambiar efectos dinámicamente
export const VantaEffectSelector: React.FC<{
  currentEffect: VantaEffectType;
  onEffectChange: (effect: VantaEffectType) => void;
  className?: string;
}> = ({ currentEffect, onEffectChange, className = '' }) => {
  const effects: { type: VantaEffectType; name: string; description: string }[] = [
    { type: 'waves', name: 'Ondas', description: 'Ondas fluidas en movimiento' },
    { type: 'dots', name: 'Puntos', description: 'Puntos flotantes' },
    { type: 'net', name: 'Red', description: 'Red de conexiones digitales' },
    { type: 'clouds', name: 'Nubes', description: 'Nubes dinámicas' },
    { type: 'birds', name: 'Aves', description: 'Aves volando en formación' }
  ];

  return (
    <div className={`vanta-selector ${className}`}>
      <div className="flex flex-wrap gap-2 p-4">
        {effects.map(({ type, name, description }) => (
          <button
            key={type}
            onClick={() => onEffectChange(type)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${currentEffect === type 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
              }
            `}
            title={description}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
