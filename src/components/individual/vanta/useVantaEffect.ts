"use client";

import { useEffect, useRef, useState } from 'react';

export type VantaEffectType = 'waves' | 'dots' | 'net' | 'clouds' | 'birds' | 'cells' | 'fog' | 'globe' | 'halo' | 'rings' | 'ripple' | 'topology' | 'trunk';

interface VantaEffect {
  destroy: () => void;
  resize: () => void;
}

interface UseVantaEffectOptions {
  effect: VantaEffectType;
  containerRef: React.RefObject<HTMLElement>;
  isDark?: boolean;
  customColors?: {
    primary?: string;
    secondary?: string;
    background?: string;
  };
}

export const useVantaEffect = ({
  effect,
  containerRef,
  isDark = false,
  customColors = {}
}: UseVantaEffectOptions) => {
  const vantaRef = useRef<VantaEffect | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Colores por defecto basados en tu tema
  const defaultColors = {
    primary: customColors.primary || '#05FD9B',
    secondary: customColors.secondary || '#04C77A',
    background: customColors.background || (isDark ? '#0A0F0D' : '#F9FAFB')
  };

  // Convertir hex a número para Three.js
  const hexToNumber = (hex: string) => parseInt(hex.replace('#', ''), 16);

  useEffect(() => {
    const loadVantaEffect = async () => {
      if (!containerRef.current) return;

      // Limpiar efecto anterior
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }

      setError(null);

      try {
        // Asegurar que THREE.js esté disponible
        if (typeof window !== 'undefined' && !(window as any).THREE) {
          const THREE = await import('three');
          (window as any).THREE = THREE;
        }
        let vantaEffect: VantaEffect;

        const baseConfig = {
          el: containerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
        };

        switch (effect) {
          case 'waves':
            const vantaWaves = await import('vanta/dist/vanta.waves.min');
            vantaEffect = (vantaWaves as any).default({
              ...baseConfig,
              color: hexToNumber(defaultColors.primary),
              color2: hexToNumber(defaultColors.secondary),
              shininess: 50.00,
              waveHeight: 20.00,
              waveSpeed: 0.75,
              zoom: 0.75
            });
            break;

          case 'dots':
            const vantaDots = await import('vanta/dist/vanta.dots.min');
            vantaEffect = (vantaDots as any).default({
              ...baseConfig,
              color: hexToNumber(defaultColors.primary),
              color2: hexToNumber(defaultColors.secondary),
              size: 1.50,
              spacing: 50.00
            });
            break;

          case 'net':
            const vantaNet = await import('vanta/dist/vanta.net.min');
            vantaEffect = (vantaNet as any).default({
              ...baseConfig,
              color: hexToNumber(defaultColors.primary),
              color2: hexToNumber(defaultColors.secondary),
              backgroundColor: hexToNumber(defaultColors.background),
              points: 12.00,
              maxDistance: 25.00,
              spacing: 20.00,
              showDots: true
            });
            break;

          case 'clouds':
            const vantaClouds = await import('vanta/dist/vanta.clouds.min');
            vantaEffect = (vantaClouds as any).default({
              ...baseConfig,
              color: hexToNumber(defaultColors.primary),
              color2: hexToNumber(defaultColors.secondary),
              skyColor: hexToNumber(defaultColors.background),
              cloudColor: hexToNumber(defaultColors.primary),
              cloudShadowColor: hexToNumber(defaultColors.secondary),
              sunColor: hexToNumber(defaultColors.secondary),
              sunGlareColor: hexToNumber(defaultColors.primary),
              sunlightColor: hexToNumber(defaultColors.primary),
              speed: 0.5
            });
            break;

          case 'birds':
            const vantaBirds = await import('vanta/dist/vanta.birds.min');
            vantaEffect = (vantaBirds as any).default({
              ...baseConfig,
              color1: hexToNumber(defaultColors.primary),
              color2: hexToNumber(defaultColors.secondary),
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

          case 'cells':
            const vantaCells = await import('vanta/dist/vanta.cells.min');
            vantaEffect = (vantaCells as any).default({
              ...baseConfig,
              color1: hexToNumber(defaultColors.primary),
              color2: hexToNumber(defaultColors.secondary),
              speed: 1.20,
              size: 1.50,
              spacing: 1.00
            });
            break;

          case 'fog':
            const vantaFog = await import('vanta/dist/vanta.fog.min');
            vantaEffect = (vantaFog as any).default({
              ...baseConfig,
              highlightColor: hexToNumber(defaultColors.primary),
              midtoneColor: hexToNumber(defaultColors.secondary),
              lowlightColor: hexToNumber(defaultColors.background),
              baseColor: hexToNumber(defaultColors.background),
              blurFactor: 0.50,
              speed: 1.00,
              zoom: 1.00
            });
            break;

          case 'globe':
            const vantaGlobe = await import('vanta/dist/vanta.globe.min');
            vantaEffect = (vantaGlobe as any).default({
              ...baseConfig,
              color: hexToNumber(defaultColors.primary),
              color2: hexToNumber(defaultColors.secondary),
              size: 1.00,
              backgroundColor: hexToNumber(defaultColors.background)
            });
            break;

          case 'halo':
            const vantaHalo = await import('vanta/dist/vanta.halo.min');
            vantaEffect = (vantaHalo as any).default({
              ...baseConfig,
              baseColor: hexToNumber(defaultColors.primary),
              backgroundColor: hexToNumber(defaultColors.background),
              amplitudeFactor: 1.00,
              xOffset: 0.00,
              yOffset: 0.00,
              size: 1.00
            });
            break;

          case 'rings':
            const vantaRings = await import('vanta/dist/vanta.rings.min');
            vantaEffect = (vantaRings as any).default({
              ...baseConfig,
              backgroundColor: hexToNumber(defaultColors.background),
              color: hexToNumber(defaultColors.primary),
              color2: hexToNumber(defaultColors.secondary)
            });
            break;

          case 'ripple':
            const vantaRipple = await import('vanta/dist/vanta.ripple.min');
            vantaEffect = (vantaRipple as any).default({
              ...baseConfig,
              color: hexToNumber(defaultColors.primary),
              color2: hexToNumber(defaultColors.secondary),
              backgroundColor: hexToNumber(defaultColors.background)
            });
            break;

          case 'topology':
            const vantaTopology = await import('vanta/dist/vanta.topology.min');
            vantaEffect = (vantaTopology as any).default({
              ...baseConfig,
              color: hexToNumber(defaultColors.primary),
              backgroundColor: hexToNumber(defaultColors.background)
            });
            break;

          case 'trunk':
            const vantaTrunk = await import('vanta/dist/vanta.trunk.min');
            vantaEffect = (vantaTrunk as any).default({
              ...baseConfig,
              color: hexToNumber(defaultColors.primary),
              backgroundColor: hexToNumber(defaultColors.background)
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
        setError(error instanceof Error ? error.message : 'Error desconocido');
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
  }, [effect, isDark, defaultColors.primary, defaultColors.secondary, defaultColors.background]);

  return {
    isLoaded,
    error,
    destroy: () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    }
  };
};
