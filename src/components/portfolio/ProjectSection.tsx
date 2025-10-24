// components/portfolio/ProjectSection.tsx
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";

// Types
interface Project {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

// Constants
const PROJECTS: Project[] = [
  {
    icon: "🚀",
    title: "Sieve of Eratosthenes Algorithm",
    description:
      "A visual and interactive implementation of the famous algorithm for finding prime numbers, built with React and TypeScript.",
    tags: ["JavaScript", "Algorithms", "React", "Vite"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/400/250",
  },
  {
    icon: "💼",
    title: "E-commerce Platform",
    description:
      "Complete e-commerce platform with shopping cart, integrated payments, and admin panel.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/400/250",
  },
  {
    icon: "📱",
    title: "Task Management App",
    description:
      "Mobile application for task management with real-time synchronization and push notifications.",
    tags: ["React Native", "Firebase", "Redux", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/400/250",
  },
  {
    icon: "🎨",
    title: "Design System",
    description:
      "Complete design system with reusable components, interactive documentation, and development tools.",
    tags: ["Storybook", "Figma", "React", "CSS-in-JS"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/api/placeholder/400/250",
  },
];

// Optimized animation variants
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  },
  section: {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  },
  card: {
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  },
} as const;

// Header component
const SectionHeader = () => (
  <motion.div
    variants={ANIMATION_VARIANTS.section}
    className="text-center space-y-3 sm:space-y-4"
  >
    <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
      <Code className="w-6 h-6 sm:w-8 sm:h-8 text-kick-green" />
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold green-gradient-text">
        Featured Projects
      </h2>
      <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8 text-kick-green-dark" />
    </div>
    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
      A selection of my most recent projects demonstrating my expertise in
      modern web development.
    </p>
  </motion.div>
);

// Project grid component
const ProjectGrid = () => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
    variants={ANIMATION_VARIANTS.container}
  >
    {PROJECTS.map((project, index) => (
      <motion.div key={project.title} variants={ANIMATION_VARIANTS.card}>
        <ProjectCard {...project} index={index} />
      </motion.div>
    ))}
  </motion.div>
);

// Call to action component
const ViewAllLink = () => (
  <motion.div
    variants={ANIMATION_VARIANTS.section}
    className="text-center pt-8"
  >
    <motion.a
      href="#"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center space-x-2 text-kick-green dark:text-kick-green-light hover:text-kick-green-dark dark:hover:text-kick-green-accent transition-colors duration-300 font-semibold"
    >
      <span>View all projects</span>
      <ExternalLink className="w-4 h-4" />
    </motion.a>
  </motion.div>
);

// Main component
export const ProjectSection = () => {
  return (
    <motion.section
      id="projects"
      className="space-y-8 sm:space-y-12 px-4 sm:px-6 lg:px-8"
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader />
      <ProjectGrid />
      <ViewAllLink />
    </motion.section>
  );
};
