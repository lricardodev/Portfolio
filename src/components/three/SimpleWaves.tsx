"use client";

import { useEffect, useState, memo } from 'react';
import { motion, useTime, useTransform, MotionValue } from 'framer-motion';

// --- Parámetros de las Olas (ajusta aquí) ---
const WAVE_COUNT = 15;   // Número de líneas
const SEGMENTS = 100;    // Puntos por línea (más es más suave, pero más lento)
const BASE_OPACITY = 0.2; // Opacidad máxima
const STROKE_WIDTH = 1.0;  // Grosor de la línea
// ---

interface SimpleWavesFramerProps {
  color?: string;
}

interface WavePathProps {
  time: MotionValue<number>;
  index: number;
  width: number;
  height: number;
  color: string;
}

/**
 * Función que genera el string del path SVG para una onda
 * --- MODIFICADA ---
 */
const createWavePath = (
  timeValue: number, 
  index: number, 
  width: number, 
  height: number
) => {
  // 1. Aumentamos el multiplicador para MÁS VELOCIDAD
  // Original: 0.0002
  const time = timeValue * 0.0006; 

  // 2. Definir parámetros únicos
  const baseY = height / 2.2 + index * 20 - (WAVE_COUNT * 10);
  
  // 3. Aumentamos la amplitud para ONDAS MÁS GRANDES
  // Original: 30 + (index * 3)
  const amplitude = 50 + (index * 4); 
  
  const frequency = 0.005 - (index * 0.0002);
  const offset = index * 0.5;

  let path = `M 0 ${baseY}`;

  for (let i = 0; i <= SEGMENTS; i++) {
    const x = (i / SEGMENTS) * width;

    // 4. Lógica de ondas (sin cambios)
    const wave1 = Math.sin((x * frequency) + time + offset) * amplitude;
    const wave2 = Math.sin((x * frequency * 0.6) + time * 0.8 - offset) * (amplitude * 0.3);
    
    const y = baseY + wave1 + wave2;

    path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  return path;
};

/**
 * Componente de Onda Individual
 * (Sin cambios)
 */
const WavePath: React.FC<WavePathProps> = ({ time, index, width, height, color }) => {
  
  const d = useTransform(
    time,
    (latestTime) => createWavePath(latestTime, index, width, height)
  );

  const opacity = Math.max(0.01, (BASE_OPACITY - (index / WAVE_COUNT) * (BASE_OPACITY - 0.01)));

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={STROKE_WIDTH}
      opacity={opacity}
    />
  );
};

const MemoizedWavePath = memo(WavePath);

/**
 * Componente Principal
 * --- CORREGIDO (props) ---
 */
// Original: React.FC<WavePathProps>
export const SimpleWaves: React.FC<SimpleWavesFramerProps> = ({
  color = '#FFFFFF'
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const time = useTime(); 

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions(); 
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;

  if (width === 0 || height === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <g>
          {[...Array(WAVE_COUNT)].map((_, i) => (
            <MemoizedWavePath
              key={i}
              index={i}
              time={time}
              width={width}
              height={height}
              color={color}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};