"use client";

import { useRef, useEffect, useState } from 'react';
import { useVantaEffect } from './useVantaEffect';

export const VantaTest: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentEffect, setCurrentEffect] = useState<'waves' | 'dots' | 'net'>('waves');
  
  const { isLoaded, error } = useVantaEffect({
    effect: currentEffect,
    containerRef,
    isDark: false,
    customColors: {
      primary: '#05FD9B',
      secondary: '#04C77A',
      background: '#F9FAFB'
    }
  });

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Vanta Background */}
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

      {/* Contenido */}
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Test de Vanta.js
        </h1>
        
        {/* Controles */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setCurrentEffect('waves')}
            className={`px-4 py-2 rounded ${
              currentEffect === 'waves' 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-gray-800'
            }`}
          >
            Waves
          </button>
          <button
            onClick={() => setCurrentEffect('dots')}
            className={`px-4 py-2 rounded ${
              currentEffect === 'dots' 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-gray-800'
            }`}
          >
            Dots
          </button>
          <button
            onClick={() => setCurrentEffect('net')}
            className={`px-4 py-2 rounded ${
              currentEffect === 'net' 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-gray-800'
            }`}
          >
            Net
          </button>
        </div>

        {/* Estado */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-8">
          <p className="text-gray-800">
            <strong>Estado:</strong> {isLoaded ? '✅ Cargado' : '⏳ Cargando...'}
          </p>
          {error && (
            <p className="text-red-600 mt-2">
              <strong>Error:</strong> {error}
            </p>
          )}
          <p className="text-gray-600 mt-2">
            <strong>Efecto actual:</strong> {currentEffect}
          </p>
        </div>

        {/* Contenido de prueba */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Card {item}
              </h3>
              <p className="text-gray-600">
                Este es un contenido de prueba para verificar que el fondo de Vanta se vea correctamente detrás de los elementos.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
