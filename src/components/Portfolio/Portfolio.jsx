"use client";

import React from 'react';
import { Mail, Phone, MapPin, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from './Header';

const AvatarFallback = ({ children }) => (
  <div className="flex items-center justify-center w-full h-full bg-zinc-800 rounded-2xl text-4xl">
    {children}
  </div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-zinc-800 text-zinc-300 ${className}`}>
    {children}
  </span>
);

export default function PortfolioFusionado() {
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToSet = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(themeToSet);
  }, []);

  React.useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.classList.contains('dark');
      setIsDark(currentTheme);
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    { icon: "🚀", title: "Algoritmo de Eratóstenes", description: "Implementación del algoritmo para encontrar números primos.", tags: ["JavaScript", "Algoritmos"] },
    { icon: "⚡", title: "Próximamente", description: "Nuevos proyectos en desarrollo.", tags: ["React", "TypeScript"] },
    { icon: "💡", title: "Experimentos", description: "Pruebas de código y experimentos.", tags: ["Node.js", "APIs"] }
  ];

  const skills = {
    "Frontend": ["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"],
    "Backend": ["Node.js", "Express", "Python", "REST APIs"],
    "Tools": ["Git", "VS Code", "Postman", "Docker"]
  };

  return (
    <div
      className="min-h-screen text-foreground transition-colors duration-300 relative"
      style={{
        backgroundImage: `url('/${isDark ? 'imagen2.jpg' : 'white2.jpg'}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        transition: "background-image 0.3s ease-in-out"
      }}
    >
      <div className={`absolute inset-0 ${isDark ? 'bg-black/30' : 'bg-white/20'}`}></div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="lg:col-span-4">
              <Card className="sticky top-8 border-border mt-12 glass-card-dark silver-blue-glow">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="relative inline-flex w-48 h-48">
                      <AvatarFallback>👨‍💻</AvatarFallback>
                    </div>
                  </div>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 dark-blue-gradient-text dark:silver-blue-gradient-text">RichardDev</h1>
                    <Badge>Web Developer</Badge>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><Mail className="w-5 h-5 text-primary" /></div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">EMAIL</p>
                        <p className="text-sm">richard@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><Phone className="w-5 h-5 text-primary" /></div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">TELÉFONO</p>
                        <p className="text-sm">+1 (213) 352-2795</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><MapPin className="w-5 h-5 text-primary" /></div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase">UBICACIÓN</p>
                        <p className="text-sm">Sacramento, USA</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button variant="ghost" size="icon"><Github className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon"><Linkedin className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon"><Twitter className="w-5 h-5" /></Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-8">
              <Header />

              <section id="about" className="my-12">
                <h2 className="text-4xl font-bold mb-4 dark-blue-gradient-text dark:silver-blue-gradient-text">Sobre Mí</h2>
                <div className="h-1 w-12 bg-primary rounded mb-8"></div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Soy un Director Creativo y Diseñador UI/UX de Sydney, Australia. Disfruto convirtiendo problemas complejos en diseños simples, hermosos e intuitivos.</p>
                  <p>Mi trabajo es construir tu sitio web para que sea funcional y fácil de usar, pero al mismo tiempo atractivo.</p>
                </div>
              </section>

              <section id="projects" className="mb-12">
                <h2 className="text-3xl font-bold mb-8 dark-blue-gradient-text dark:silver-blue-gradient-text">Proyectos Destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <Card key={index} className="glass-card-dark hover:border-primary transition-all cursor-pointer hover:backdrop-blur-md">
                      <CardContent className="p-6">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{project.icon} {project.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section id="skills" className="mb-12">
                <h2 className="text-3xl font-bold mb-8 dark-blue-gradient-text dark:silver-blue-gradient-text">Tecnologías y Habilidades</h2>
                <Card className="glass-card-dark">
                  <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(skills).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="text-xl font-semibold mb-4 text-primary">{category}</h3>
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
      </div>
    </div>
  );
}