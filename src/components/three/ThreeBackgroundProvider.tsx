"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SimpleThreeBackground } from './SimpleThreeBackground';

type BackgroundType = 'particles' | 'geometries' | 'flowfield' | 'waves';

interface ThreeBackgroundContextType {
  currentType: BackgroundType;
  setCurrentType: (type: BackgroundType) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  intensity: number;
  setIntensity: (intensity: number) => void;
  color: string;
  setColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  showSelector: boolean;
  setShowSelector: (show: boolean) => void;
}

const ThreeBackgroundContext = createContext<ThreeBackgroundContextType | undefined>(undefined);

interface ThreeBackgroundProviderProps {
  children: ReactNode;
  defaultType?: BackgroundType;
  defaultIntensity?: number;
  defaultColor?: string;
  defaultSecondaryColor?: string;
  showSelector?: boolean;
}

export const ThreeBackgroundProvider: React.FC<ThreeBackgroundProviderProps> = ({
  children,
  defaultType = 'particles',
  defaultIntensity = 1,
  defaultColor = '#FFFFFF',
  defaultSecondaryColor = '#FFFFFF',
  showSelector = true
}) => {
  const [currentType, setCurrentType] = useState<BackgroundType>(defaultType);
  const [isDark, setIsDark] = useState(false);
  const [intensity, setIntensity] = useState(defaultIntensity);
  const [color, setColor] = useState(defaultColor);
  const [secondaryColor, setSecondaryColor] = useState(defaultSecondaryColor);
  const [showSelectorState, setShowSelector] = useState(showSelector);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Observer for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Auto-adjust colors based on theme
  useEffect(() => {
    if (isDark) {
      setColor('#FFFFFF'); // White for dark mode
      setSecondaryColor('#FFFFFF'); // White for dark mode
    } else {
      setColor('#000000'); // Black for light mode
      setSecondaryColor('#000000'); // Black for light mode
    }
  }, [isDark]);

  // Performance optimization based on device
  useEffect(() => {
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isLowEndDevice || isMobile) {
      setIntensity(0.5);
    }
  }, []);

  const contextValue: ThreeBackgroundContextType = {
    currentType,
    setCurrentType,
    isDark,
    setIsDark,
    intensity,
    setIntensity,
    color,
    setColor,
    secondaryColor,
    setSecondaryColor,
    showSelector: showSelectorState,
    setShowSelector
  };

  return (
    <ThreeBackgroundContext.Provider value={contextValue}>
      <div className="relative min-h-screen">
        {/* Three.js Scene - Simple Version */}
        <SimpleThreeBackground
          type={currentType}
          color={color}
          secondaryColor={secondaryColor}
          intensity={intensity}
        />
        
        {/* Overlay for better text readability - Very subtle */}
        <div className="absolute inset-0 bg-white/5 dark:bg-black/10 z-10" />
        
        {/* Content */}
        <div className="relative z-20">
          {children}
        </div>
      </div>
    </ThreeBackgroundContext.Provider>
  );
};

export const useThreeBackground = (): ThreeBackgroundContextType => {
  const context = useContext(ThreeBackgroundContext);
  if (context === undefined) {
    throw new Error('useThreeBackground must be used within a ThreeBackgroundProvider');
  }
  return context;
};
