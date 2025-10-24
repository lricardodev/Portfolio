import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Code2, Database, Palette, Wrench, LucideIcon } from "lucide-react";
import { memo } from "react";

// Types
interface Skill {
  name: string;
  experience: string;
  level: number;
}

type SkillCategory = "Frontend" | "Backend" | "Tools" | "Cloud & DevOps";

interface SkillCardProps extends Skill {
  index: number;
}

interface CategorySectionProps {
  category: SkillCategory;
  skills: Skill[];
}

// Constants
const SKILLS: Record<SkillCategory, Skill[]> = {
  Frontend: [
    {
      name: "React",
      experience: "Creating interactive UIs and SPAs.",
      level: 95,
    },
    {
      name: "TypeScript",
      experience: "Static typing for robust projects.",
      level: 90,
    },
    {
      name: "Next.js",
      experience: "React framework for full-stack applications.",
      level: 85,
    },
    {
      name: "Tailwind CSS",
      experience: "CSS framework for fast and consistent design.",
      level: 95,
    },
    {
      name: "Framer Motion",
      experience: "Fluid animations and transitions.",
      level: 80,
    },
    {
      name: "Vue.js",
      experience: "Progressive framework for user interfaces.",
      level: 75,
    },
  ],
  Backend: [
    {
      name: "Node.js",
      experience: "RESTful APIs and backend services.",
      level: 90,
    },
    {
      name: "Express.js",
      experience: "Minimalist web framework for Node.js.",
      level: 85,
    },
    {
      name: "MongoDB",
      experience: "NoSQL database for scalable applications.",
      level: 80,
    },
    {
      name: "PostgreSQL",
      experience: "Robust relational database.",
      level: 75,
    },
    {
      name: "GraphQL",
      experience: "Query language for efficient APIs.",
      level: 70,
    },
    { name: "Docker", experience: "Application containerization.", level: 75 },
  ],
  Tools: [
    {
      name: "Git",
      experience: "Version control and collaboration.",
      level: 95,
    },
    {
      name: "Figma",
      experience: "Interface design and prototyping.",
      level: 80,
    },
    {
      name: "VS Code",
      experience: "Code editor with custom extensions.",
      level: 95,
    },
    {
      name: "Webpack",
      experience: "Module bundler for JavaScript.",
      level: 70,
    },
    {
      name: "Jest",
      experience: "Testing framework for JavaScript.",
      level: 75,
    },
    {
      name: "Storybook",
      experience: "Isolated component development.",
      level: 70,
    },
  ],
  "Cloud & DevOps": [
    { name: "AWS", experience: "Amazon cloud services.", level: 70 },
    {
      name: "Vercel",
      experience: "Deployment platform for web applications.",
      level: 85,
    },
    {
      name: "Netlify",
      experience: "Hosting and CI/CD for static sites.",
      level: 80,
    },
    {
      name: "GitHub Actions",
      experience: "Automating development workflows.",
      level: 75,
    },
    {
      name: "Linux",
      experience: "Operating system for development.",
      level: 80,
    },
    { name: "Nginx", experience: "Web server and reverse proxy.", level: 65 },
  ],
};

const CATEGORY_ICONS: Record<SkillCategory, LucideIcon> = {
  Frontend: Code2,
  Backend: Database,
  Tools: Wrench,
  "Cloud & DevOps": Palette,
};

// Optimized animation variants
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  },
  category: {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
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
  skill: {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  },
  icon: {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    },
  },
} as const;

// Utilities
const getSkillColor = (level: number): string => {
  if (level >= 90) return "from-green-500 to-emerald-500";
  if (level >= 80) return "from-kick-green to-kick-green-light";
  if (level >= 70) return "from-kick-green-dark to-kick-green-accent";
  return "from-gray-500 to-slate-500";
};

// Section header component
const SectionHeader = memo(() => (
  <motion.div
    variants={ANIMATION_VARIANTS.category}
    className="text-center space-y-3 sm:space-y-4"
  >
    <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
      <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-kick-green" />
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold green-gradient-text">
        Technologies and Skills
      </h2>
      <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-kick-green-dark" />
    </div>
    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
      My technology stack and tools I use to create innovative digital
      solutions.
    </p>
  </motion.div>
));

SectionHeader.displayName = "SectionHeader";

// Progress bar component
const ProgressBar = memo(
  ({ level, index }: { level: number; index: number }) => (
    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 rounded-t-xl overflow-hidden">
      <motion.div
        className={`h-full bg-gradient-to-r ${getSkillColor(level)}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1, delay: index * 0.1 }}
        viewport={{ once: true }}
      />
    </div>
  )
);

ProgressBar.displayName = "ProgressBar";

// Skill card component
const SkillCard = memo(({ name, experience, level, index }: SkillCardProps) => (
  <motion.div
    variants={ANIMATION_VARIANTS.skill}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="group cursor-pointer">
          <div className="relative p-3 rounded-xl glass-morphism hover-neon-subtle transition-all duration-300">
            <ProgressBar level={level} index={index} />

            <div className="pt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 group-hover:text-kick-green dark:group-hover:text-kick-green-light transition-colors">
                  {name}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {level}%
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                {experience}
              </p>
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-2">
          <div className="font-semibold">{name}</div>
          <div className="text-sm">{experience}</div>
          <div className="text-xs text-slate-500">
            Experience level: {level}%
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  </motion.div>
));

SkillCard.displayName = "SkillCard";

// Category header component
const CategoryHeader = memo(
  ({ category, Icon }: { category: SkillCategory; Icon: LucideIcon }) => (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <motion.div
        className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-kick-green to-kick-green-dark"
        variants={ANIMATION_VARIANTS.icon}
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </motion.div>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
        {category}
      </h3>
    </div>
  )
);

CategoryHeader.displayName = "CategoryHeader";

// Category section component
const CategorySection = memo(({ category, skills }: CategorySectionProps) => {
  const Icon = CATEGORY_ICONS[category];

  return (
    <motion.div variants={ANIMATION_VARIANTS.category} className="space-y-4 sm:space-y-6">
      <CategoryHeader category={category} Icon={Icon} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <TooltipProvider delayDuration={100}>
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} index={index} />
          ))}
        </TooltipProvider>
      </div>
    </motion.div>
  );
});

CategorySection.displayName = "CategorySection";

// Main component
export const SkillsSection = () => {
  const skillEntries = Object.entries(SKILLS) as [SkillCategory, Skill[]][];

  return (
    <motion.section
      id="skills"
      className="space-y-8 sm:space-y-12 px-4 sm:px-6 lg:px-8"
      variants={ANIMATION_VARIANTS.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {skillEntries.map(([category, skills]) => (
          <CategorySection key={category} category={category} skills={skills} />
        ))}
      </div>
    </motion.section>
  );
};
