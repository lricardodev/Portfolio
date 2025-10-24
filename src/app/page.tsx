"use client";

import { Layout } from "../components/portfolio/Layout";
import { HeroSection } from "../components/portfolio/HeroSection";
import { ProjectSection } from "../components/portfolio/ProjectSection";
import { SkillsSection } from "../components/portfolio/SkillsSection";
import { ContactSection } from "../components/portfolio/ContactSection";
import { Header } from "@/components/portfolio/Header";
import { ThreeBackgroundProvider } from "@/components/three/ThreeBackgroundProvider";

const PortfolioContent = () => {
  return (
    <main className="min-h-screen">
      <Layout>
        <Layout.Content>
          <Header />
          <HeroSection />
          <ProjectSection />
          <SkillsSection />
          <ContactSection />
        </Layout.Content>
      </Layout>
    </main>
  );
};

export default function PortfolioPage() {
  return (
    <ThreeBackgroundProvider
      defaultType="waves"
      defaultIntensity={1}
      showSelector={false}
    >
      <PortfolioContent />
    </ThreeBackgroundProvider>
  );
}
