"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// Se añade 'Sparkles'
import { Sun, Moon, Menu, X, Sparkles } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useThreeBackground } from "@/components/three/ThreeBackgroundProvider";

const NAV_ITEMS = [
  { name: "Sobre mí", sectionId: "about" },
  { name: "Proyectos", sectionId: "projects" },
  { name: "Habilidades", sectionId: "skills" },
  { name: "Contacto", sectionId: "contact" },
];

const EFFECTS = [
  { type: "particles", emoji: "✨" },
  { type: "geometries", emoji: "🔷" },
  { type: "waves", emoji: "🌊" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 3D Effects context
  const { currentType, setCurrentType } = useThreeBackground();

  // Manejar scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para ciclar entre efectos 3D
  const cycleToNextEffect = () => {
    const currentIndex = EFFECTS.findIndex(effect => effect.type === currentType);
    const nextIndex = (currentIndex + 1) % EFFECTS.length;
    setCurrentType(EFFECTS[nextIndex].type as 'particles' | 'geometries' | 'waves');
  };

  // Inicializar tema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const themeToSet = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDark(themeToSet);
    document.documentElement.classList.toggle("dark", themeToSet);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const handleSectionClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const NavList = ({ isMobile = false }) => (
    <ul
      className={cn(
        "flex space-x-1",
        isMobile && "flex-col space-y-2 space-x-0"
      )}
    >
      {NAV_ITEMS.map((item, index) => (
        <motion.li
          key={item.name}
          className={isMobile ? "w-full" : ""}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant="ghost"
            onClick={() => handleSectionClick(item.sectionId)}
            className={cn(
              "text-slate-700 dark:text-slate-300 hover:text-kick-green dark:hover:text-kick-green-light transition-all duration-300 hover-neon-subtle",
              isMobile && "w-full justify-start text-left"
            )}
          >
            {item.name}
          </Button>
        </motion.li>
      ))}
    </ul>
  );

  // --- EffectsSelector Modificado ---
  const EffectsSelector = () => {
    const currentEffect = EFFECTS.find(effect => effect.type === currentType);
    
    return (
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.3, duration: 1, type: "spring" }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={cycleToNextEffect}
          className="hover-neon-subtle relative group"
          title={`Cambiar efecto 3D (${currentEffect?.name})`}
        >
          {/* Icono estático 'Sparkles' */}
          <Sparkles className="h-[1.2rem] w-[1.2rem]" />
          
          {/* Tooltip */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            {currentEffect?.name}
          </div>
        </Button>
      </motion.div>
    );
  };
  // --- Fin de la modificación ---

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: -150, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, type: "spring" }}
        >
          <Card
            className={cn(
              "p-4 transition-all duration-300",
              isDark ? "glass-card-dark" : "glass-card-light",
              isScrolled && "shadow-lg"
            )}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 1.5,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/" className="flex items-center space-x-2">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-kick-green to-kick-green-dark flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.span
                      className="text-white font-bold text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      R
                    </motion.span>
                  </motion.div>
                  <motion.span
                    className="text-lg font-bold green-gradient-text"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    RichardDev
                  </motion.span>
                </Link>
              </motion.div>

              {/* Navegación Desktop */}
              <motion.div
                className="hidden md:flex md:items-center md:space-x-4"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1.2, type: "spring" }}
              >
                <nav>
                  <NavList />
                </nav>

                {/* 3D Effects Selector */}
                <EffectsSelector />

                {/* Theme Toggle */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.5, duration: 1, type: "spring" }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="hover-neon-subtle"
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Controles móviles */}
              <motion.div
                className="flex items-center space-x-2 md:hidden"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 1, type: "spring" }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.6, duration: 1, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="hover-neon-subtle"
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </motion.div>

                <EffectsSelector />

                <motion.div
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 2, duration: 1, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="hover-neon-subtle"
                  >
                    <AnimatePresence mode="wait">
                      {isMobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0, scale: 0 }}
                          animate={{ rotate: 0, opacity: 1, scale: 1 }}
                          exit={{ rotate: 90, opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <X className="h-[1.2rem] w-[1.2rem]" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0, scale: 0 }}
                          animate={{ rotate: 0, opacity: 1, scale: 1 }}
                          exit={{ rotate: -90, opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Menu className="h-[1.2rem] w-[1.2rem]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Menú móvil */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.9, y: -20 }}
                  animate={{ opacity: 1, height: "auto", scale: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  className="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
                >
                  <NavList isMobile />
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </motion.header>
  );
}