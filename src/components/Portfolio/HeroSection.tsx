// components/portfolio/HeroSection.tsx
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Sparkles } from 'lucide-react';

// Variantes de animación mejoradas - Más exageradas y lentas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.8,
      duration: 1.5
    }
  }
};

const itemVariants = {
  hidden: { y: 100, opacity: 0, scale: 0.8, rotateX: -20 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 12,
      duration: 2
    }
  }
};

const titleVariants = {
  hidden: { y: 150, opacity: 0, scale: 0.5, rotateY: -30 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 10,
      duration: 2.5
    }
  }
};

const sparkleVariants = {
  hidden: { scale: 0, rotate: -360, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: 1,
      duration: 2,
      type: 'spring',
      stiffness: 100
    }
  }
};

const statsVariants = {
  hidden: { y: 80, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 12,
      duration: 1.8
    }
  }
};

export const HeroSection = () => (
  <motion.section
    id="about"
    className="min-h-[80vh] flex flex-col justify-center space-y-8 relative"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Elementos decorativos */}
    <div className="absolute top-10 right-10 opacity-20">
      <motion.div
        variants={sparkleVariants}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.5, rotate: 180 }}
      >
        <Sparkles className="w-8 h-8 text-blue-500" />
      </motion.div>
    </div>

    {/* Elementos decorativos adicionales */}
    <motion.div 
      className="absolute top-20 left-10 opacity-10"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 2, duration: 2, type: 'spring' }}
    >
      <Sparkles className="w-6 h-6 text-purple-500" />
    </motion.div>

    <motion.div 
      className="absolute bottom-20 right-20 opacity-15"
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 3, duration: 2, type: 'spring' }}
    >
      <Sparkles className="w-4 h-4 text-blue-400" />
    </motion.div>

    {/* Título principal */}
    <motion.div variants={titleVariants} className="space-y-4">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
        <span className="block text-slate-900 dark:text-slate-100">
          Creador de
        </span>
        <span className="block hero-title gradient-text-animated">
          Experiencias Digitales
        </span>
      </h1>
    </motion.div>

    {/* Subtítulo con animación de escritura */}
    <motion.div variants={itemVariants} className="space-y-2">
      <div className="text-2xl md:text-3xl lg:text-4xl text-slate-600 dark:text-slate-300">
        <span className="block mb-2">Soy un </span>
        <TypeAnimation
          sequence={[
            'Desarrollador Web.', 2000,
            'Creador de Soluciones.', 2000,
            'Apasionado por React.', 2000,
            'Especialista en UX/UI.', 2000,
          ]}
          wrapper="span"
          speed={50}
          className="text-blue-600 dark:text-blue-400 font-semibold"
          repeat={Infinity}
        />
      </div>
    </motion.div>

    {/* Descripción */}
    <motion.div variants={itemVariants} className="max-w-3xl">
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
        Transformo ideas en productos funcionales y escalables, buscando siempre aprender y aplicar las mejores prácticas y las últimas tecnologías del ecosistema JavaScript.
      </p>
    </motion.div>

    {/* Botones de acción */}
    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
      <Button 
        size="lg" 
        className="btn-primary-gradient hover-lift text-lg px-8 py-6"
      >
        <Download className="mr-3 h-5 w-5" />
        Descargar CV
      </Button>
      
      <Button 
        variant="outline" 
        size="lg" 
        className="btn-neon-outline hover-lift text-lg px-8 py-6"
      >
        Ver Proyectos
        <ArrowRight className="ml-3 h-5 w-5" />
      </Button>
    </motion.div>

    {/* Indicadores de scroll */}
    <motion.div 
      variants={itemVariants}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-3 bg-blue-500 rounded-full mt-2"
        />
      </motion.div>
    </motion.div>

    {/* Estadísticas rápidas */}
    <motion.div 
      variants={statsVariants}
      className="grid grid-cols-3 gap-8 pt-16 border-t border-slate-200 dark:border-slate-700"
    >
      <motion.div 
        className="text-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 4, duration: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <motion.div 
          className="text-3xl font-bold text-blue-600 dark:text-blue-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 4.5, duration: 1, type: 'spring', stiffness: 200 }}
        >
          3+
        </motion.div>
        <div className="text-sm text-slate-600 dark:text-slate-300">Años de experiencia</div>
      </motion.div>
      
      <motion.div 
        className="text-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 4.2, duration: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <motion.div 
          className="text-3xl font-bold text-purple-600 dark:text-purple-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 4.7, duration: 1, type: 'spring', stiffness: 200 }}
        >
          50+
        </motion.div>
        <div className="text-sm text-slate-600 dark:text-slate-300">Proyectos completados</div>
      </motion.div>
      
      <motion.div 
        className="text-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 4.4, duration: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <motion.div 
          className="text-3xl font-bold text-blue-600 dark:text-blue-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 4.9, duration: 1, type: 'spring', stiffness: 200 }}
        >
          100%
        </motion.div>
        <div className="text-sm text-slate-600 dark:text-slate-300">Satisfacción del cliente</div>
      </motion.div>
    </motion.div>
  </motion.section>
);