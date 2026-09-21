import React from 'react';
import { LiquidCanvasBackground } from './components/background/LiquidCanvasBackground';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { TerminalSection } from './components/sections/TerminalSection';
import { BentoProjectsSection } from './components/sections/BentoProjectsSection';
import { ArchitectureShowcaseSection } from './components/sections/ArchitectureShowcaseSection';
import { TechRadarSection } from './components/sections/TechRadarSection';
import { EngineeringStandardsSection } from './components/sections/EngineeringStandardsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#040406] text-zinc-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 60 FPS Organic Fluid Canvas Background */}
      <LiquidCanvasBackground />

      {/* Floating Navigation Pill */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col items-center justify-start w-full">
        <HeroSection />
        <TerminalSection />
        <BentoProjectsSection />
        <ArchitectureShowcaseSection />
        <TechRadarSection />
        <EngineeringStandardsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
