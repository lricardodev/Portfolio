import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, Variants } from "framer-motion";
import { Code2, Database, Palette, Wrench, LucideIcon } from "lucide-react";

interface Skill {
  name: string;
  experience: string;
  level: number;
}

type SkillCategory = "Frontend" | "Backend" | "Herramientas" | "Cloud & DevOps";

const SKILLS: Record<SkillCategory, Skill[]> = {
  Frontend: [
    {
      name: "React",
      experience: "Creación de UIs interactivas y SPAs.",
      level: 95,
    },
    {
      name: "TypeScript",
      experience: "Tipado estático para proyectos robustos.",
      level: 90,
    },
    {
      name: "Next.js",
      experience: "Framework React para aplicaciones full-stack.",
      level: 85,
    },
    {
      name: "Tailwind CSS",
      experience: "Framework CSS para diseño rápido y consistente.",
      level: 95,
    },
    {
      name: "Framer Motion",
      experience: "Animaciones fluidas y transiciones.",
      level: 80,
    },
    {
      name: "Vue.js",
      experience: "Framework progresivo para interfaces de usuario.",
      level: 75,
    },
  ],
  Backend: [
    {
      name: "Node.js",
      experience: "APIs RESTful y servicios backend.",
      level: 90,
    },
    {
      name: "Express.js",
      experience: "Framework web minimalista para Node.js.",
      level: 85,
    },
    {
      name: "MongoDB",
      experience: "Base de datos NoSQL para aplicaciones escalables.",
      level: 80,
    },
    {
      name: "PostgreSQL",
      experience: "Base de datos relacional robusta.",
      level: 75,
    },
    {
      name: "GraphQL",
      experience: "Query language para APIs eficientes.",
      level: 70,
    },
    {
      name: "Docker",
      experience: "Contenerización de aplicaciones.",
      level: 75,
    },
  ],
  Herramientas: [
    {
      name: "Git",
      experience: "Control de versiones y colaboración.",
      level: 95,
    },
    {
      name: "Figma",
      experience: "Diseño de interfaces y prototipado.",
      level: 80,
    },
    {
      name: "VS Code",
      experience: "Editor de código con extensiones personalizadas.",
      level: 95,
    },
    {
      name: "Webpack",
      experience: "Bundler de módulos para JavaScript.",
      level: 70,
    },
    {
      name: "Jest",
      experience: "Framework de testing para JavaScript.",
      level: 75,
    },
    {
      name: "Storybook",
      experience: "Desarrollo de componentes aislados.",
      level: 70,
    },
  ],
  "Cloud & DevOps": [
    { name: "AWS", experience: "Servicios en la nube de Amazon.", level: 70 },
    {
      name: "Vercel",
      experience: "Plataforma de deployment para aplicaciones web.",
      level: 85,
    },
    {
      name: "Netlify",
      experience: "Hosting y CI/CD para sitios estáticos.",
      level: 80,
    },
    {
      name: "GitHub Actions",
      experience: "Automatización de workflows de desarrollo.",
      level: 75,
    },
    {
      name: "Linux",
      experience: "Sistema operativo para desarrollo.",
      level: 80,
    },
    { name: "Nginx", experience: "Servidor web y proxy reverso.", level: 65 },
  ],
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const categoryVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.8, rotateX: -20 },
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

const skillVariants: Variants = {
  hidden: { scale: 0, opacity: 0, rotate: -180, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.8,
    },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -360, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
      duration: 1,
    },
  },
};

const getCategoryIcon = (category: SkillCategory): LucideIcon => {
  const icons: Record<SkillCategory, LucideIcon> = {
    Frontend: Code2,
    Backend: Database,
    Herramientas: Wrench,
    "Cloud & DevOps": Palette,
  };
  return icons[category] || Code2;
};

const getSkillColor = (level: number): string => {
  if (level >= 90) return "from-green-500 to-emerald-500";
  if (level >= 80) return "from-kick-green to-kick-green-light";
  if (level >= 70) return "from-kick-green-dark to-kick-green-accent";
  return "from-gray-500 to-slate-500";
};

export const SkillsSection = () => {
  return (
    <motion.section
      id="skills"
      className="space-y-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section heading*/}
      <motion.div variants={categoryVariants} className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Code2 className="w-8 h-8 text-kick-green" />
          <h2 className="text-4xl md:text-5xl font-bold green-gradient-text">
            Tecnologías y Habilidades
          </h2>
          <Wrench className="w-8 h-8 text-kick-green-dark" />
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Mi stack tecnológico y herramientas que utilizo para crear soluciones
          digitales innovadoras.
        </p>
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(Object.entries(SKILLS) as [SkillCategory, Skill[]][]).map(
          ([category, items]) => {
            const Icon = getCategoryIcon(category);
            return (
              <motion.div
                key={category}
                variants={categoryVariants}
                className="space-y-6"
              >
                {/* Encabezado de categoría */}
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-kick-green to-kick-green-dark"
                    variants={iconVariants}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-bold text-slate-800 dark:text-slate-200"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                  >
                    {category}
                  </motion.h3>
                </div>

                {/* Category heading */}
                <div className="grid grid-cols-2 gap-3">
                  <TooltipProvider delayDuration={100}>
                    {items.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        custom={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="group cursor-pointer">
                              <div className="relative p-3 rounded-xl glass-morphism hover-neon-subtle transition-all duration-300">
                                {/* progress bar */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 rounded-t-xl overflow-hidden">
                                  <motion.div
                                    className={`h-full bg-gradient-to-r ${getSkillColor(
                                      skill.level
                                    )}`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{
                                      duration: 1,
                                      delay: index * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                  />
                                </div>

                                {/*  Skill content */}
                                <div className="pt-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 group-hover:text-kick-green dark:group-hover:text-kick-green-light transition-colors">
                                      {skill.name}
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                      {skill.level}%
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                                    {skill.experience}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <div className="space-y-2">
                              <div className="font-semibold">{skill.name}</div>
                              <div className="text-sm">{skill.experience}</div>
                              <div className="text-xs text-slate-500">
                                Nivel de experiencia: {skill.level}%
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </TooltipProvider>
                </div>
              </motion.div>
            );
          }
        )}
      </div>
    </motion.section>
  );
};
