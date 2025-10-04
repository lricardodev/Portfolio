"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Github, Linkedin, Sun, Moon } from 'lucide-react';

// ✨ PASO 1: Importamos los componentes de shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Tus componentes personalizados que NO necesitan ser reemplazados
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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToSet = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(themeToSet);
    if (themeToSet) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
    // shadcn/ui funciona mejor con la clase 'dark' en el <html>, pero lo dejamos aquí por simplicidad.
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4">
            {/* ✨ PASO 2: La Card ahora usa el componente de shadcn/ui */}
            <Card className="sticky top-8 border-border">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="relative inline-flex w-48 h-48">
                    <AvatarFallback>👨‍💻</AvatarFallback>
                  </div>
                </div>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Richard Hanrick</h1>
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
                  {/* ✨ PASO 3: Los Buttons ahora usan el componente de shadcn/ui */}
                  <Button variant="ghost" size="icon"><Github className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon"><Linkedin className="w-5 h-5" /></Button>
                  <Button variant="ghost" size="icon"><Twitter className="w-5 h-5" /></Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card className="flex items-center justify-between mb-8 p-2 border-border">
              <nav className="flex gap-1 flex-1">
                <Button variant="secondary">Sobre mí</Button>
                <Button variant="ghost">Proyectos</Button>
                <Button variant="ghost">Habilidades</Button>
                <Button variant="ghost">Contacto</Button>
                <Link href="/terminal" passHref>
                    <Button variant="ghost">Terminal</Button>
                </Link>
              </nav>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </Card>

            <section id="about" className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Sobre Mí</h2>
              <div className="h-1 w-12 bg-primary rounded mb-8"></div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Soy un Director Creativo y Diseñador UI/UX de Sydney, Australia. Disfruto convirtiendo problemas complejos en diseños simples, hermosos e intuitivos.</p>
                <p>Mi trabajo es construir tu sitio web para que sea funcional y fácil de usar, pero al mismo tiempo atractivo.</p>
              </div>
            </section>
            
            <section id="projects" className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Proyectos Destacados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <Card key={index} className="hover:border-primary transition-all cursor-pointer border-border">
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
                <h2 className="text-3xl font-bold mb-8">Tecnologías y Habilidades</h2>
                <Card className="border-border">
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
  );
}