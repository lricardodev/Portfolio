// components/portfolio/Layout.tsx
import React from 'react';

// Tipos para los subcomponentes
type LayoutComponent = React.FC<{ children: React.ReactNode }> & {
  Sidebar: React.FC<{ children: React.ReactNode }>;
  Content: React.FC<{ children: React.ReactNode }>;
};

// Componente principal del Layout con efectos visuales mejorados
export const Layout: LayoutComponent = ({ children }) => {
  return (
    <div 
      className="min-h-screen relative overflow-hidden portfolio-background"
    >
      {/* Overlay para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-white/20 dark:bg-black/50 z-0"></div>
      
      {/* Efecto de partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="md:grid md:grid-cols-12 md:gap-8 lg:gap-12">
          {children}
        </div>
      </div>
    </div>
  );
};

// Subcomponente para la barra lateral con efectos glass morphism
const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <aside className="md:col-span-4 lg:col-span-3">
    <div className="md:sticky md:top-24 md:max-h-[calc(100vh-6rem)] md:py-8">
      <div className="glass-morphism rounded-2xl p-6 md:p-8 hover-neon-subtle transition-all duration-300">
        {children}
      </div>
    </div>
  </aside>
);

// Subcomponente para el contenido principal con mejor espaciado
const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="md:col-span-8 lg:col-span-9 py-8 md:py-16 space-y-16">
    {children}
  </main>
);

Layout.Sidebar = Sidebar;
Layout.Content = Content;