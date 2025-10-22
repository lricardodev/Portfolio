// components/portfolio/HeroSection.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Youtube, Twitter } from "lucide-react";
import Image from "next/image";

// Variantes de animación para el nuevo diseño
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.8,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.8,
    },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 1,
    },
  },
};

export const HeroSection = () => (
  <motion.section
    id="about"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Main Content Container */}
    <div className="flex flex-col lg:flex-row items-center justify-evenly max-w-7xl mx-auto gap-8 lg:gap-16">
      {/* Left Content */}
      <motion.div variants={itemVariants} className="flex-1 space-y-8">
        {/* Software Developer Label */}
        <div>
          <span className="text-lg font-medium text-gray-300 tracking-wide">
            Software Developer
          </span>
        </div>

        {/* Main Title */}
        <div className="space-y-2">
          <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
            <span className="block text-white">Hello I'm</span>
            <span className="block text-kick-green">RichardDev</span>
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-lg">
          <p className="text-lg text-gray-300 leading-relaxed">
            Passionate about creating efficient and engaging digital solutions.
            Specializing in the JavaScript ecosystem, building interactive
            interfaces with React and robust services with Node.js.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-transparent border-2 border-kick-green text-kick-green hover:bg-kick-green hover:text-gray-900 px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3"
          >
            <Download className="h-5 w-5" />
            DOWNLOAD CV
          </Button>

          {/* Social Media Icons */}
          <div className="flex gap-4 items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-kick-green rounded-full flex items-center justify-center cursor-pointer hover:bg-kick-green-light transition-colors duration-300"
            >
              <Github className="h-6 w-6 text-gray-900" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-kick-green rounded-full flex items-center justify-center cursor-pointer hover:bg-kick-green-light transition-colors duration-300"
            >
              <Linkedin className="h-6 w-6 text-gray-900" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-kick-green rounded-full flex items-center justify-center cursor-pointer hover:bg-kick-green-light transition-colors duration-300"
            >
              <Youtube className="h-6 w-6 text-gray-900" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-kick-green rounded-full flex items-center justify-center cursor-pointer hover:bg-kick-green-light transition-colors duration-300"
            >
              <Twitter className="h-6 w-6 text-gray-900" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        variants={imageVariants}
        className="flex-1 flex justify-center"
      >
        <div className="relative">
          {/* Dashed Circle Outline */}
          <div className="absolute inset-0 w-80 h-80 border-2 border-dashed border-kick-green rounded-full animate-spin-slow"></div>

          {/* Profile Image */}
          <div className="relative w-72 h-72 rounded-full overflow-hidden">
            <Image
              src="/src.jpg"
              alt="profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </motion.div>
    </div>

    {/* Statistics Bar */}
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 mt-8 border-t border-slate-200 dark:border-slate-700"
    >
      <motion.div
        className="text-center space-y-2"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <motion.div
          className="text-3xl md:text-4xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.7,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
        >
          25+
        </motion.div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Tecnologías
        </div>
      </motion.div>

      <motion.div
        className="text-center space-y-2"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.6, duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <motion.div
          className="text-3xl md:text-4xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.8,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
        >
          3+
        </motion.div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Años de experiencia
        </div>
      </motion.div>

      <motion.div
        className="text-center space-y-2"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.7, duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <motion.div
          className="text-3xl md:text-4xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 1.9,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
        >
          50+
        </motion.div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Proyectos completados
        </div>
      </motion.div>

      <motion.div
        className="text-center space-y-2"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.1, y: -5 }}
      >
        <motion.div
          className="text-3xl md:text-4xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 2,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
        >
          500+
        </motion.div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Commits de código
        </div>
      </motion.div>
    </motion.div>
  </motion.section>
);