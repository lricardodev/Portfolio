"use client";

import { useState } from 'react';
import { AnimatedBackground, EffectInfo } from './AnimatedBackground';
import { VantaEffectType } from './useVantaEffect';

export const VantaDemo: React.FC = () => {
  const [currentEffect, setCurrentEffect] = useState<VantaEffectType>('waves');
  const [showSelector, setShowSelector] = useState(true);

  const effects: VantaEffectType[] = ['waves', 'dots', 'net', 'clouds', 'birds', 'cells', 'fog', 'globe', 'halo', 'rings'];

  return (
    <AnimatedBackground 
      effect={currentEffect}
      showSelector={showSelector}
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Vanta.js
            <span className="text-green-500"> Effects</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explora diferentes efectos visuales animados para tu portfolio. 
            Cada efecto está optimizado para tu tema verde y se adapta automáticamente al modo claro/oscuro.
          </p>
        </div>

        {/* Controles */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {effects.map((effect) => (
            <button
              key={effect}
              onClick={() => setCurrentEffect(effect)}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${currentEffect === effect 
                  ? 'bg-green-500 text-white shadow-lg transform scale-105' 
                  : 'bg-white/10 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/30 backdrop-blur-sm'
                }
              `}
            >
              {effect.charAt(0).toUpperCase() + effect.slice(1)}
            </button>
          ))}
        </div>

        {/* Información del efecto actual */}
        <div className="max-w-4xl mx-auto mb-12">
          <EffectInfo effect={currentEffect} />
        </div>

        {/* Características */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-green-500 text-2xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Personalizable
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Colores adaptados a tu tema verde (#05FD9B) con soporte completo para modo claro y oscuro.
            </p>
          </div>

          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-green-500 text-2xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Optimizado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Carga dinámica de efectos, manejo eficiente de memoria y responsive design.
            </p>
          </div>

          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-green-500 text-2xl mb-4">🖱️</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Interactivo
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Efectos que responden al movimiento del mouse y touch en dispositivos móviles.
            </p>
          </div>
        </div>

        {/* Código de ejemplo */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <h3 className="text-white font-semibold mb-4">Código de ejemplo:</h3>
            <pre className="text-green-400 text-sm overflow-x-auto">
{`import { AnimatedBackground } from '@/components/background/AnimatedBackground';

export default function MyPage() {
  return (
    <AnimatedBackground effect="waves">
      <div className="container mx-auto px-4">
        {/* Tu contenido aquí */}
      </div>
    </AnimatedBackground>
  );
}`}
            </pre>
          </div>
        </div>

        {/* Toggle para selector */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowSelector(!showSelector)}
            className="px-6 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
          >
            {showSelector ? 'Ocultar' : 'Mostrar'} Selector de Efectos
          </button>
        </div>
      </div>
    </AnimatedBackground>
  );
};
