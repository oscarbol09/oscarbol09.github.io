import React from 'react';
import { ArchitecturalCanvasBackground } from './components/background/ArchitecturalCanvasBackground';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ProfilePhilosophySection } from './components/sections/ProfilePhilosophySection';
import { BentoProjectsSection } from './components/sections/BentoProjectsSection';
import { ArchitectureExplorerSection } from './components/sections/ArchitectureExplorerSection';
import { OpenSourceWallSection } from './components/sections/OpenSourceWallSection';
import { TerminalSection } from './components/sections/TerminalSection';
import { TechRadarSection } from './components/sections/TechRadarSection';
import { QualityMetricsSection } from './components/sections/QualityMetricsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#060709] text-zinc-100 selection:bg-[#dfff52] selection:text-[#060709]">
      {/* 60 FPS Architectural Background (High-craft dot matrix & fine vectors) */}
      <ArchitecturalCanvasBackground />

      {/* Editorial Fixed Navbar with Live Clock & Direct CV Download */}
      <Navbar />

      {/* Main Content Sections (High-Craft Editorial Hierarchy) */}
      <main className="relative z-10 flex flex-col items-center justify-start w-full">
        <HeroSection />
        <ProfilePhilosophySection />
        <BentoProjectsSection />
        <ArchitectureExplorerSection />
        <OpenSourceWallSection />
        <TerminalSection />
        <TechRadarSection />
        <QualityMetricsSection />
        <ContactSection />
      </main>

      {/* Technical Footer */}
      <Footer />
    </div>
  );
};

export default App;
