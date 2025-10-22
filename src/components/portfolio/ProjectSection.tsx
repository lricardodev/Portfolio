// components/portfolio/ProjectSection.tsx
import { ProjectCard } from "./ProjectCard";
import { motion, Variants } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    icon: "🚀",
    title: "Algoritmo de Eratóstenes",
    description:
      "Una implementación visual e interactiva del famoso algoritmo para encontrar números primos, construido con React y TypeScript.",
    tags: ["JavaScript", "Algoritmos", "React", "Vite"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/400/250",
  },
  {
    icon: "💼",
    title: "E-commerce Platform",
    description:
      "Plataforma completa de comercio electrónico con carrito de compras, pagos integrados y panel de administración.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/400/250",
  },
  {
    icon: "📱",
    title: "Task Management App",
    description:
      "Aplicación móvil para gestión de tareas con sincronización en tiempo real y notificaciones push.",
    tags: ["React Native", "Firebase", "Redux", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/400/250",
  },
  {
    icon: "🎨",
    title: "Design System",
    description:
      "Sistema de diseño completo con componentes reutilizables, documentación interactiva y herramientas de desarrollo.",
    tags: ["Storybook", "Figma", "React", "CSS-in-JS"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/400/250",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const sectionVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.8, rotateX: -15 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.8,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.7, rotateY: -20 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

export const ProjectSection = () => {
  return (
    <motion.section
      id="projects"
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Encabezado de la sección */}
      <motion.div variants={sectionVariants} className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Code className="w-8 h-8 text-kick-green" />
          <h2 className="text-4xl md:text-5xl font-bold green-gradient-text">
            Proyectos Destacados
          </h2>
          <ExternalLink className="w-8 h-8 text-kick-green-dark" />
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Una selección de mis proyectos más recientes que demuestran mi
          experiencia en desarrollo web moderno.
        </p>
      </motion.div>

      {/* Grid de proyectos */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.title}
            variants={cardVariants}
            custom={index}
          >
            <ProjectCard {...project} index={index} />
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action */}
      <motion.div variants={sectionVariants} className="text-center pt-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <a
            href="#"
            className="inline-flex items-center space-x-2 text-kick-green dark:text-kick-green-light hover:text-kick-green-dark dark:hover:text-kick-green-accent transition-colors duration-300 font-semibold"
          >
            <span>Ver todos los proyectos</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
