"use client";

import React, { useState, useEffect, useMemo, memo } from 'react';
import { Mail, Phone, MapPin, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { BadgeProps, ContactPill, Project, Skills, SocialLink } from '@/types';
import Loader from '@/helpers/loader';
import { Header } from './Header';

import './Portfolio.scss';

// Memoized Components
const Badge = memo<BadgeProps>(({ children, className = "" }) => (
  <span className={`skill-badge inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-zinc-800 text-zinc-300 ${className}`}>
    {children}
  </span>
));
Badge.displayName = 'Badge';

const Divider = memo(() => <div className="w-20 h-px bg-primary"></div>);
Divider.displayName = 'Divider';

const ContactPillItem = memo<ContactPill>(({ icon: Icon, text, animation }) => (
  <div className={`glass-morphism hover-lift flex items-center gap-2 px-6 py-3 rounded-full ${animation}`}>
    <Icon className="w-4 h-4 text-primary" />
    <span className="text-sm">{text}</span>
  </div>
));
ContactPillItem.displayName = 'ContactPillItem';

const SocialButton = memo<SocialLink>(({ icon: Icon, label }) => (
  <Button
    variant="ghost"
    size="icon"
    className="hover-glow rounded-full hover:bg-primary/20 animate-bounce-in"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </Button>
));
SocialButton.displayName = 'SocialButton';

const ProjectCard = memo<{ project: Project; index: number }>(({ project, index }) => (
  <Card className="project-card glass-morphism-colored hover:border-primary cursor-pointer shadow-2xl animate-slide-in-up">
    <CardContent className="p-6">
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2 sparkle-effect">
          {project.icon} {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </div>
    </CardContent>
  </Card>
));
ProjectCard.displayName = 'ProjectCard';

// Constants
const CONTACT_INFO: ContactPill[] = [
  { icon: Mail, text: "lricardodev@gmail.com", animation: "animate-slide-in-left" },
  { icon: Phone, text: "+52 (56) 1928-3816", animation: "animate-slide-in-up" },
  { icon: MapPin, text: "CMDX, México", animation: "animate-slide-in-right" }
];

const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, label: "GitHub" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Twitter, label: "Twitter" }
];

const PROJECTS: Project[] = [
  {
    icon: "🚀",
    title: "Algoritmo de Eratóstenes",
    description: "Implementación del algoritmo para encontrar números primos.",
    tags: ["JavaScript", "Algoritmos"]
  },
  {
    icon: "⚡",
    title: "Próximamente",
    description: "Nuevos proyectos en desarrollo.",
    tags: ["React", "TypeScript"]
  },
  {
    icon: "💡",
    title: "Experimentos",
    description: "Pruebas de código y experimentos.",
    tags: ["Node.js", "APIs"]
  }
];

const SKILLS: Skills = {
  "Frontend": ["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"],
  "Backend": ["Node.js", "Express", "Python", "REST APIs"],
  "Tools": ["Git", "VS Code", "Postman", "Docker"]
};

// Custom Hooks
const useTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

const useScrollReveal = (isLoading: boolean) => {
  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();

  }, [isLoading]);
};

export default function PortfolioFusionado() {
  const [isLoading, setIsLoading] = useState(true);
  const isDark = useTheme();
  useScrollReveal(isLoading);

  useEffect(() => {
    const img = new Image();
    img.src = isDark ? '/darkImage.jpg' : '/whiteImage.jpg';
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false);
  }, [isDark]);

  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url('/${isDark ? 'darkImage.jpg' : 'whiteImage.jpg'}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    transition: "background-image 0.3s ease-in-out"
  }), [isDark]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen text-foreground transition-colors duration-300 relative animate-fade-in" style={backgroundStyle}>
      <div className={`absolute inset-0 ${isDark ? 'bg-black/70' : 'bg-white/40'}`} />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8">
          <div className="max-w-6xl w-full">
            <div className="text-center space-y-8">

              <div className="flex justify-between items-center mb-12">
                <Divider />
                <Divider />
              </div>

              <div className="relative">
                <h1 className="hero-title text-7xl md:text-9xl font-bold tracking-tight opacity-60 select-none animate-slide-in-up">
                  PORTFOLIO
                </h1>
              </div>

              <div className="mt-32 md:mt-40 space-y-4 animate-slide-in-up">
                <h2 className="gradient-text-animated relative z-10 text-5xl md:text-7xl font-bold">
                  RichardDev
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide animate-slide-in-up">
                  Web Developer
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 my-12">
                {CONTACT_INFO.map((contact) => (
                  <ContactPillItem key={contact.text} {...contact} />
                ))}
              </div>

              <div className="flex justify-center gap-4 my-12">
                <Button size="lg" className="btn-hover-effect px-8 py-6 text-lg rounded-full bg-primary hover:bg-primary/90 animate-bounce-in">
                  <Mail className="w-5 h-5 mr-2" />
                  Contáctame
                </Button>
                <Button size="lg" variant="outline" className="btn-hover-effect px-8 py-6 text-lg rounded-full border-2 hover:bg-primary/10 animate-bounce-in">
                  Descargar CV
                </Button>
              </div>

              <div className="flex justify-center gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <SocialButton key={social.label} {...social} />
                ))}
              </div>

              <div className="flex justify-between items-center mb-12">
                <Divider />
                <Divider />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <Header />

          <section id="about" className="mb-12 scroll-reveal">
            <h2 className="gradient-text-animated text-4xl font-bold mb-4">Sobre Mí</h2>
            <div className="h-1 w-12 bg-primary rounded mb-8 animate-shimmer" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="animate-slide-in-left">
                I'm a web developer passionate about creating efficient and engaging digital solutions.
                With a strong focus on the JavaScript ecosystem,
                I specialize in building interactive user interfaces with React and robust backend services with Node.js.
              </p>
              <p className="animate-slide-in-right">
                My goal is to transform ideas into functional and scalable products,
                always seeking to learn and apply best practices and the latest technologies.
                I'm always looking for new challenges to continue growing as a professional.
              </p>
            </div>
          </section>

          <section id="projects" className="mb-12 scroll-reveal">
            <h2 className="gradient-text-animated text-3xl font-bold mb-8">Proyectos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
              ))}
            </div>
          </section>

          <section id="skills" className="mb-12 scroll-reveal">
            <h2 className="gradient-text-animated text-3xl font-bold mb-8">Tecnologías y Habilidades</h2>
            <Card className="glass-morphism-colored particle-effect">
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(SKILLS).map(([category, items], index) => (
                  <div key={category} className={`animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`}>
                    <h3 className="text-xl font-semibold mb-4 text-primary neon-text">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map(skill => <Badge key={skill}>{skill}</Badge>)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}