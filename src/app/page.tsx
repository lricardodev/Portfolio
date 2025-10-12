// app/page.tsx
"use client";

import { Layout } from "../components/portfolio/Layout";
import { Sidebar } from "../components/portfolio/Sidebar";
import { HeroSection } from "../components/portfolio/HeroSection";
import { ProjectSection } from "../components/portfolio/ProjectSection";
import { SkillsSection } from "../components/portfolio/SkillsSection";
import { Header } from "@/components/portfolio/Header";

// Datos que pasarás a los componentes
const CONTACT_INFO = [
  { icon: "Mail", text: "lricardodev@gmail.com" },
  { icon: "Phone", text: "+52 (56) 1928-3816" },
  { icon: "MapPin", text: "CMDX, México" }
];

const SOCIAL_LINKS = [
  { href: "https://github.com/richarddev", icon: "Github", label: "GitHub" },
  { href: "https://linkedin.com/in/richarddev", icon: "Linkedin", label: "LinkedIn" },
  { href: "https://twitter.com/richarddev", icon: "Twitter", label: "Twitter" }
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <Layout>
        {/* Columna Izquierda Fija */}
        <Layout.Sidebar>
          <Sidebar
            name="RichardDev"
            title="Web Developer"
            bio="Apasionado por crear soluciones digitales eficientes y atractivas. Especializado en el ecosistema JavaScript, construyendo interfaces interactivas con React y servicios robustos con Node.js."
            contactInfo={CONTACT_INFO}
            socialLinks={SOCIAL_LINKS}
          />
        </Layout.Sidebar>

        {/* Columna Derecha con Scroll */}
        <Layout.Content>
          <Header/>
          <HeroSection />
          <ProjectSection />
          <SkillsSection />
          {/* Sección de contacto futura */}
          <section id="contact" className="min-h-[50vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold blue-purple-gradient-text">
                ¿Trabajamos juntos?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                Estoy siempre interesado en nuevos proyectos y oportunidades. 
                ¡Hablemos sobre cómo puedo ayudar a hacer realidad tu visión!
              </p>
              <div className="pt-8">
                <a 
                  href="mailto:lricardodev@gmail.com"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover-lift"
                >
                  Enviar mensaje
                </a>
              </div>
            </div>
          </section>
        </Layout.Content>
      </Layout>
    </main>
  );
}