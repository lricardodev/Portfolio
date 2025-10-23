"use client";

import { useEffect, useRef, useState } from 'react';
import { useVantaEffect, VantaEffectType } from './useVantaEffect';

interface AnimatedBackgroundProps {
  effect?: VantaEffectType;
  className?: string;
  children?: React.ReactNode;
  showSelector?: boolean;
  isDark?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  effect = 'waves',
  className = '',
  children,
  showSelector = false,
  isDark = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentEffect, setCurrentEffect] = useState<VantaEffectType>(effect);
  const [isThemeDark, setIsThemeDark] = useState(isDark);

  const { isLoaded, error } = useVantaEffect({
    effect: currentEffect,
    containerRef,
    isDark: isThemeDark,
    customColors: {
      primary: '#05FD9B',
      secondary: '#04C77A',
      background: isThemeDark ? '#0A0F0D' : '#F9FAFB'
    }
  });

  // Detectar cambios de tema
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsThemeDark(isDarkMode);
    };

    checkTheme();

    // Observer para cambios de tema
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const effects: { type: VantaEffectType; name: string; description: string; icon: string }[] = [
    { type: 'waves', name: 'Ondas', description: 'Ondas fluidas en movimiento', icon: '🌊' },
    { type: 'dots', name: 'Puntos', description: 'Puntos flotantes interactivos', icon: '✨' },
    { type: 'net', name: 'Red', description: 'Red de conexiones digitales', icon: '🔮' },
    { type: 'clouds', name: 'Nubes', description: 'Nubes dinámicas', icon: '☁️' },
    { type: 'birds', name: 'Aves', description: 'Aves volando en formación', icon: '🐦' },
    { type: 'cells', name: 'Células', description: 'Células orgánicas en movimiento', icon: '🔬' },
    { type: 'fog', name: 'Niebla', description: 'Niebla atmosférica', icon: '🌫️' },
    { type: 'globe', name: 'Globo', description: 'Globo 3D interactivo', icon: '🌍' },
    { type: 'halo', name: 'Halo', description: 'Efecto de halo luminoso', icon: '💫' },
    { type: 'rings', name: 'Anillos', description: 'Anillos concéntricos', icon: '⭕' },
    { type: 'ripple', name: 'Ondulación', description: 'Ondas de ondulación', icon: '🌊' },
    { type: 'topology', name: 'Topología', description: 'Red topológica', icon: '🕸️' },
    { type: 'trunk', name: 'Tronco', description: 'Estructura de tronco', icon: '🌳' }
  ];

  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Background con Vanta.js */}
      <div 
        ref={containerRef}
        className="vanta-background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out'
        }}
      />

      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white/5 dark:bg-black/20 z-0" />

      {/* Selector de efectos (opcional) */}
      {showSelector && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Efectos de Fondo
            </h3>
            <div className="flex flex-col gap-2">
              {effects.map(({ type, name, description, icon }) => (
                <button
                  key={type}
                  onClick={() => setCurrentEffect(type)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300
                    ${currentEffect === type 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-white/10 dark:hover:bg-black/20'
                    }
                  `}
                  title={description}
                >
                  <span>{icon}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Indicador de carga */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-500 border-t-transparent"></div>
              <span className="text-gray-700 dark:text-gray-300">Cargando efecto visual...</span>
            </div>
          </div>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="fixed top-4 left-4 z-50">
          <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-4 border border-red-500/30">
            <p className="text-red-400 text-sm">
              Error cargando efecto: {error}
            </p>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Componente para mostrar información del efecto actual
export const EffectInfo: React.FC<{ effect: VantaEffectType }> = ({ effect }) => {
  const effectInfo = {
    waves: {
      name: 'Ondas Fluidas',
      description: 'Ondas suaves que fluyen con el movimiento del mouse, creando un ambiente relajante y moderno.',
      features: ['Interactivo con mouse', 'Animación suave', 'Colores personalizables']
    },
    dots: {
      name: 'Puntos Flotantes',
      description: 'Puntos que se mueven libremente por la pantalla, creando un efecto de profundidad y dinamismo.',
      features: ['Movimiento orgánico', 'Efecto de profundidad', 'Interactivo']
    },
    net: {
      name: 'Red Digital',
      description: 'Una red de conexiones que simula un cerebro digital o red neuronal, perfecto para portafolios tech.',
      features: ['Conexiones dinámicas', 'Efecto tech', 'Puntos interactivos']
    },
    clouds: {
      name: 'Nubes Dinámicas',
      description: 'Nubes que se mueven suavemente creando un ambiente etéreo y profesional.',
      features: ['Movimiento natural', 'Efecto atmosférico', 'Profundidad visual']
    },
    birds: {
      name: 'Aves en Formación',
      description: 'Aves que vuelan en formación, creando un efecto elegante y sofisticado.',
      features: ['Movimiento coordinado', 'Efecto elegante', 'Animación fluida']
    },
    cells: {
      name: 'Células Orgánicas',
      description: 'Células que se mueven de forma orgánica, creando un efecto biológico y dinámico.',
      features: ['Movimiento orgánico', 'Efecto biológico', 'Interactivo']
    },
    fog: {
      name: 'Niebla Atmosférica',
      description: 'Niebla que se mueve suavemente, creando un ambiente misterioso y atmosférico.',
      features: ['Efecto atmosférico', 'Movimiento suave', 'Ambiente misterioso']
    },
    globe: {
      name: 'Globo 3D',
      description: 'Un globo 3D interactivo que responde al movimiento del mouse.',
      features: ['3D interactivo', 'Efecto espacial', 'Responsive']
    },
    halo: {
      name: 'Halo Luminoso',
      description: 'Un halo de luz que se mueve suavemente, creando un efecto etéreo.',
      features: ['Efecto luminoso', 'Movimiento suave', 'Ambiente etéreo']
    },
    rings: {
      name: 'Anillos Concéntricos',
      description: 'Anillos que se expanden y contraen, creando un efecto hipnótico.',
      features: ['Efecto hipnótico', 'Anillos concéntricos', 'Animación fluida']
    },
    ripple: {
      name: 'Ondas de Ondulación',
      description: 'Ondas que se propagan desde el centro, creando un efecto de ondulación.',
      features: ['Ondas propagadas', 'Efecto de ondulación', 'Interactivo']
    },
    topology: {
      name: 'Red Topológica',
      description: 'Una red topológica compleja que simula conexiones de red.',
      features: ['Red compleja', 'Efecto tech', 'Conexiones dinámicas']
    },
    trunk: {
      name: 'Estructura de Tronco',
      description: 'Una estructura que simula un tronco de árbol, creando un efecto orgánico.',
      features: ['Estructura orgánica', 'Efecto natural', 'Geometría compleja']
    }
  };

  const info = effectInfo[effect];

  return (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {info.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        {info.description}
      </p>
      <div className="space-y-2">
        {info.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
