"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { useThreeBackground } from "@/components/three/ThreeBackgroundProvider";

// ========== CONSTANTS ==========
const NAV_ITEMS = [
  { name: "About Me", sectionId: "about" },
  { name: "Projects", sectionId: "projects" },
  { name: "Skills", sectionId: "skills" },
  { name: "Contact", sectionId: "contact" },
] as const;

const EFFECTS = [
  { type: "particles", name: "Particles", emoji: "✨" },
  { type: "geometries", name: "Geometries", emoji: "🔷" },
  { type: "waves", name: "Waves", emoji: "🌊" },
] as const;

const ANIMATION_VARIANTS = {
  header: {
    initial: { y: -150, opacity: 0, scale: 0.8 },
    animate: { y: 0, opacity: 1, scale: 1 },
    transition: { duration: 1.2, type: "spring", stiffness: 60, damping: 15 },
  },
  navItem: (index: number) => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.1 },
  }),
  mobileMenu: {
    initial: { opacity: 0, height: 0, scale: 0.9, y: -20 },
    animate: { opacity: 1, height: "auto", scale: 1, y: 0 },
    exit: { opacity: 0, height: 0, scale: 0.9, y: -20 },
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
} as const;

// ========== TYPES ==========
type EffectType = (typeof EFFECTS)[number]["type"];

// ========== CUSTOM HOOKS ==========
const useScrollDetection = (threshold = 10) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};

const useTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newTheme);
      return newTheme;
    });
  }, []);

  return { isDark, toggleTheme };
};

// ========== SUB-COMPONENTS ==========
interface NavListProps {
  isMobile?: boolean;
  onItemClick: (sectionId: string) => void;
}

const NavList = memo(({ isMobile = false, onItemClick }: NavListProps) => (
  <ul
    className={cn("flex space-x-1", isMobile && "flex-col space-y-2 space-x-0")}
  >
    {NAV_ITEMS.map((item, index) => (
      <motion.li
        key={item.sectionId}
        className={isMobile ? "w-full" : ""}
        {...ANIMATION_VARIANTS.navItem(index)}
      >
        <Button
          variant="ghost"
          onClick={() => onItemClick(item.sectionId)}
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
));

NavList.displayName = "NavList";

interface EffectsSelectorProps {
  currentType: EffectType;
  onCycle: () => void;
}

const EffectsSelector = memo(
  ({ currentType, onCycle }: EffectsSelectorProps) => {
    const currentEffect = EFFECTS.find((effect) => effect.type === currentType);

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
          onClick={onCycle}
          className="hover-neon-subtle relative group"
          aria-label={`Change 3D effect (current: ${currentEffect?.name})`}
        >
          <Sparkles className="h-[1.2rem] w-[1.2rem]" />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
            {currentEffect?.name}
          </div>
        </Button>
      </motion.div>
    );
  }
);

EffectsSelector.displayName = "EffectsSelector";

interface ThemeToggleProps {
  delay?: number;
  onClick: () => void;
}

const ThemeToggle = memo(({ delay = 1.5, onClick }: ThemeToggleProps) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay, duration: 1, type: "spring" }}
    whileHover={{ scale: 1.2, rotate: 10 }}
    whileTap={{ scale: 0.9 }}
  >
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="hover-neon-subtle"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  </motion.div>
));

ThemeToggle.displayName = "ThemeToggle";

const Logo = memo(() => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay: 0.5, duration: 1.5, type: "spring", stiffness: 100 }}
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
));

Logo.displayName = "Logo";

interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuToggle = memo(({ isOpen, onClick }: MenuToggleProps) => (
  <motion.div
    initial={{ scale: 0, rotate: 90 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay: 2, duration: 1, type: "spring" }}
    whileHover={{ scale: 1.1, rotate: -5 }}
  >
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="hover-neon-subtle"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
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
));

MenuToggle.displayName = "MenuToggle";

// ========== MAIN COMPONENT ==========
export function Header() {
  const isScrolled = useScrollDetection();
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentType, setCurrentType } = useThreeBackground();

  const cycleToNextEffect = useCallback(() => {
    const currentIndex = EFFECTS.findIndex(
      (effect) => effect.type === currentType
    );
    const nextIndex = (currentIndex + 1) % EFFECTS.length;
    setCurrentType(EFFECTS[nextIndex].type as EffectType);
  }, [currentType, setCurrentType]);

  const handleSectionClick = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      {...ANIMATION_VARIANTS.header}
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
              <Logo />

              {/* Desktop Navigation */}
              <motion.div
                className="hidden md:flex md:items-center md:space-x-4"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1.2, type: "spring" }}
              >
                <nav>
                  <NavList onItemClick={handleSectionClick} />
                </nav>
                <EffectsSelector
                  currentType={currentType as EffectType}
                  onCycle={cycleToNextEffect}
                />
                <ThemeToggle onClick={toggleTheme} />
              </motion.div>

              {/* Mobile Controls */}
              <motion.div
                className="flex items-center space-x-2 md:hidden"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 1, type: "spring" }}
              >
                <ThemeToggle delay={1.6} onClick={toggleTheme} />
                <EffectsSelector
                  currentType={currentType as EffectType}
                  onCycle={cycleToNextEffect}
                />
                <MenuToggle
                  isOpen={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                />
              </motion.div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.nav
                  {...ANIMATION_VARIANTS.mobileMenu}
                  className="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
                >
                  <NavList isMobile onItemClick={handleSectionClick} />
                </motion.nav>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </motion.header>
  );
}
