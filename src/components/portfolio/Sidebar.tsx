// components/portfolio/Sidebar.tsx
import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Mapeo de iconos para simplicidad
const icons = { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download };

// Variantes de animación mejoradas para Framer Motion - Más exageradas y lentas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.3, 
      delayChildren: 0.5,
      duration: 1.2
    },
  },
};

const itemVariants = {
  hidden: { y: 80, opacity: 0, scale: 0.8, rotateX: -15 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    transition: { 
      type: 'spring', 
      stiffness: 60,
      damping: 15,
      duration: 1.5
    } 
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -360, opacity: 0 },
  visible: { 
    scale: 1, 
    rotate: 0,
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100,
      damping: 12,
      duration: 1.8
    } 
  },
};

const avatarVariants = {
  hidden: { scale: 0, rotate: -180, opacity: 0 },
  visible: { 
    scale: 1, 
    rotate: 0,
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 80,
      damping: 10,
      duration: 2
    } 
  },
};

export const Sidebar = ({ name, title, bio, contactInfo, socialLinks }) => (
  <motion.div
    className="flex flex-col h-full space-y-8"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Avatar y nombre */}
    <motion.div variants={itemVariants} className="text-center space-y-4">
      <div className="relative inline-block">
        <motion.div 
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 hero-avatar"
          variants={avatarVariants}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
            <motion.span 
              className="text-2xl font-bold blue-purple-gradient-text"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 2.5, duration: 1, type: 'spring', stiffness: 200 }}
            >
              {name.charAt(0)}
            </motion.span>
          </div>
        </motion.div>
      </div>
      <div>
        <motion.h1 
          variants={itemVariants} 
          className="text-3xl font-bold hero-name-gradient blue-purple-gradient-text"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5, type: 'spring', stiffness: 100 }}
        >
          {name}
        </motion.h1>
        <motion.h2 
          variants={itemVariants} 
          className="text-lg text-blue-600 dark:text-blue-400 font-medium mt-1"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2, type: 'spring', stiffness: 80 }}
        >
          {title}
        </motion.h2>
      </div>
    </motion.div>

    {/* Bio */}
    <motion.div variants={itemVariants} className="space-y-3">
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed text-center">
        {bio}
      </p>
    </motion.div>

    {/* Información de Contacto */}
    <motion.div variants={itemVariants} className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
        Contacto
      </h3>
      <div className="space-y-3">
        {contactInfo.map(({ icon, text }) => {
          const Icon = icons[icon];
          return (
            <motion.div 
              key={text} 
              className="flex items-center text-sm group"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div variants={iconVariants}>
                <Icon className="w-4 h-4 mr-3 text-blue-500 dark:text-blue-400 group-hover:text-purple-500 transition-colors" />
              </motion.div>
              <span className="text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                {text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>

    {/* Botón de descarga CV */}
    <motion.div variants={itemVariants}>
      <Button 
        className="w-full btn-primary-gradient hover-lift"
        size="sm"
      >
        <Download className="w-4 h-4 mr-2" />
        Descargar CV
      </Button>
    </motion.div>

    {/* Botones Sociales */}
    <motion.div variants={itemVariants} className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
        Redes Sociales
      </h3>
      <div className="flex justify-center space-x-3">
        {socialLinks.map(({ href, icon, label }, index) => {
          const Icon = icons[icon];
          return (
            <motion.div
              key={label}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                delay: 2.5 + (index * 0.2), 
                duration: 1.5, 
                type: 'spring', 
                stiffness: 150 
              }}
              whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                asChild 
                variant="ghost" 
                size="icon" 
                className="w-10 h-10 rounded-full hover-neon-subtle transition-all duration-300"
              >
                <a 
                  href={href} 
                  aria-label={label} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <motion.div
                    initial={{ rotate: -360 }}
                    animate={{ rotate: 0 }}
                    transition={{ delay: 3 + (index * 0.2), duration: 1 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                </a>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </motion.div>
);