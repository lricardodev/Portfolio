"use client";

type BackgroundType = 'particles' | 'geometries' | 'flowfield' | 'waves';
import { SimpleParticles } from './SimpleParticles';
import { SimpleGeometries } from './SimpleGeometries';
import { SimpleWaves } from './SimpleWaves';

interface SimpleThreeBackgroundProps {
  type: BackgroundType;
  color?: string;
  secondaryColor?: string;
  intensity?: number;
}

export const SimpleThreeBackground: React.FC<SimpleThreeBackgroundProps> = ({
  type,
  color = '#FFFFFF',
  secondaryColor = '#FFFFFF',
  intensity = 1
}) => {
  switch (type) {
    case 'particles':
      return (
        <SimpleParticles
          color={color}
          secondaryColor={secondaryColor}
          intensity={intensity}
        />
      );
    case 'geometries':
      return (
        <SimpleGeometries
          color={color}
          secondaryColor={secondaryColor}
          intensity={intensity}
        />
      );
    case 'waves':
      return (
        <SimpleWaves
          color={color}
          secondaryColor={secondaryColor}
          intensity={intensity}
        />
      );
    default:
      return (
        <SimpleParticles
          color={color}
          secondaryColor={secondaryColor}
          intensity={intensity}
        />
      );
  }
};
