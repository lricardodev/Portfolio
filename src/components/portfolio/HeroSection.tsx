// components/portfolio/HeroSection.tsx
import { memo } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Download,
  Github,
  Linkedin,
  Youtube,
  Twitter,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";

// ========== CONSTANTS ==========
const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
] as const;

const STATISTICS = [
  { value: "25+", label: "Technologies", delay: 1.5 },
  { value: "3+", label: "Years of experience", delay: 1.6 },
  { value: "50+", label: "Projects completed", delay: 1.7 },
  { value: "500+", label: "Code commits", delay: 1.8 },
] as const;

// ========== ANIMATION VARIANTS ==========
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

const statisticVariants = {
  container: (delay: number) => ({
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { delay, duration: 0.8, type: "spring" as const },
    whileHover: { scale: 1.1, y: -5 },
  }),
  value: (delay: number) => ({
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: {
      delay: delay + 0.2,
      duration: 0.6,
      type: "spring" as const,
      stiffness: 200,
    },
  }),
};

// ========== TYPES ==========
interface SocialIconProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface StatisticCardProps {
  value: string;
  label: string;
  delay: number;
}

// ========== SUB-COMPONENTS ==========
const SocialIcon = memo(({ icon: Icon, label, href }: SocialIconProps) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-10 h-10 sm:w-12 sm:h-12 bg-kick-green rounded-full flex items-center justify-center cursor-pointer hover:bg-kick-green-light transition-colors duration-300"
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
  </motion.a>
));

SocialIcon.displayName = "SocialIcon";

const StatisticCard = memo(({ value, label, delay }: StatisticCardProps) => (
  <motion.div
    className="text-center space-y-2"
    {...statisticVariants.container(delay)}
  >
    <motion.div
      className="text-3xl md:text-4xl font-bold"
      {...statisticVariants.value(delay)}
    >
      {value}
    </motion.div>
    <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
  </motion.div>
));

StatisticCard.displayName = "StatisticCard";

const ProfileImage = memo(() => (
  <motion.div variants={imageVariants} className="flex-1 flex justify-center">
    <div className="relative">
      {/* Hexagonal Border with Gradient */}
      <div className="absolute inset-0 w-80 h-80">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient
              id="hexGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00ff00" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00ff88" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00ff00" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <motion.polygon
            points="50,5 85,25 85,75 50,95 15,75 15,25"
            fill="none"
            stroke="url(#hexGradient)"
            strokeWidth="2"
            animate={{
              strokeDasharray: ["0 100", "100 0", "0 100"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 w-80 h-80">
        {["<React/>", "JS", "TS", "CSS"].map((text, i) => (
          <motion.div
            key={i}
            className="absolute text-xs font-mono text-kick-green opacity-60"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            {text}
          </motion.div>
        ))}
      </div>

      {/* Hexagonal Profile Image */}
      <div className="relative w-64 h-64">
        <div className="w-full h-full bg-gradient-to-br from-kick-green/20 to-transparent rounded-full p-1">
          <div className="w-full h-full rounded-full overflow-hidden shadow-2xl shadow-kick-green/30">
            <Image
              src="/pofile.jpg"
              alt="RichardDev - Software Developer"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 256px, 256px"
            />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
));
ProfileImage.displayName = "ProfileImage";

const HeroContent = memo(() => (
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
        <span className="block text-kick-green">Ricardo</span>
      </h1>
    </div>

    {/* Description */}
    <div className="max-w-lg">
      <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
        Passionate about creating efficient and engaging digital solutions.
        Specializing in the JavaScript ecosystem, building interactive
        interfaces with React and robust services with Node.js.
      </p>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        size="lg"
        className="bg-transparent border-2 border-kick-green text-kick-green hover:bg-kick-green hover:text-gray-900 px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 text-sm sm:text-base"
        aria-label="Download CV"
      >
        <Download className="h-4 w-4 sm:h-5 sm:w-5" />
        DOWNLOAD CV
      </Button>

      {/* Social Media Icons */}
      <div
        className="flex gap-3 sm:gap-4 items-center justify-center sm:justify-start"
        role="list"
        aria-label="Social media links"
      >
        {SOCIAL_LINKS.map((social) => (
          <SocialIcon
            key={social.label}
            icon={social.icon}
            label={social.label}
            href={social.href}
          />
        ))}
      </div>
    </div>
  </motion.div>
));

HeroContent.displayName = "HeroContent";

const StatisticsBar = memo(() => (
  <motion.div
    variants={itemVariants}
    className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-200 dark:border-slate-700"
    role="region"
    aria-label="Statistics"
  >
    {STATISTICS.map((stat) => (
      <StatisticCard
        key={stat.label}
        value={stat.value}
        label={stat.label}
        delay={stat.delay}
      />
    ))}
  </motion.div>
));

StatisticsBar.displayName = "StatisticsBar";

// ========== MAIN COMPONENT ==========
export const HeroSection = memo(() => (
  <motion.section
    id="about"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    aria-labelledby="hero-heading"
  >
    {/* Main Content Container */}
    <div className="flex flex-col lg:flex-row items-center justify-evenly max-w-7xl mx-auto gap-6 sm:gap-8 lg:gap-16 px-4 sm:px-6 lg:px-8">
      <HeroContent />
      <ProfileImage />
    </div>

    {/* Statistics Bar */}
    <StatisticsBar />
  </motion.section>
));

HeroSection.displayName = "HeroSection";
