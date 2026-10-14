import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowDownToLine, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';
import { SoundToggle } from '../ui/SoundToggle';
import { LiveClock } from '../ui/LiveClock';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const NAV_SECTIONS = [
  { id: 'inicio', num: '00', label: 'Inicio' },
  { id: 'perfil', num: '01', label: 'Perfil' },
  { id: 'proyectos', num: '02', label: 'Proyectos' },
  { id: 'arquitectura', num: '03', label: 'Arquitectura' },
  { id: 'opensource', num: '04', label: 'Open Source' },
  { id: 'terminal', num: '05', label: 'Terminal' },
  { id: 'contacto', num: '06', label: 'Contacto' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { playClick, playTabSwitch } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0.1 }
    );

    NAV_SECTIONS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    playTabSwitch();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#060709]/90 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/50 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('inicio')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
              aria-label="Ir a inicio"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dfff52] font-mono text-xs font-bold text-[#060709] transition-transform duration-200 group-hover:scale-105">
                OD
              </span>
              <div className="hidden sm:flex flex-col">
                <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-[#f2efe8] group-hover:text-white transition-colors">
                  Oscar Darío Madera
                </span>
                <span className="font-mono text-[10px] text-zinc-400">
                  Systems &amp; Backend Engineer
                </span>
              </div>
            </button>

            {/* Live Clock & Location Pill */}
            <div className="hidden xl:flex items-center pl-3 border-l border-white/10">
              <LiveClock />
            </div>
          </div>

          {/* Desktop Center Navigation Pills */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-[#0b0c10]/80 p-1 backdrop-blur-md"
          >
            {NAV_SECTIONS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#060709] font-bold'
                      : 'text-zinc-400 hover:text-[#f2efe8] hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-[#dfff52]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-[#060709]' : 'text-zinc-400'}`}>
                    {link.num}
                  </span>
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct CV Download Link */}
            <a
              href="./CV_Oscar_Dario_Madera.pdf"
              download="CV_Oscar_Dario_Madera.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-200 transition-all duration-200 hover:border-[#dfff52] hover:bg-[#dfff52] hover:text-[#060709] active:scale-95"
              title="Descargar Curriculum Vitae en Formato Harvard"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">CV</span>
            </a>

            {/* Audio Haptic Toggle */}
            <SoundToggle />

            {/* GitHub Profile */}
            <a
              href="https://github.com/oscarbol09"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-all duration-200 hover:border-[#dfff52] hover:bg-[#dfff52] hover:text-[#060709]"
              title="Perfil de GitHub @oscarbol09"
              aria-label="GitHub @oscarbol09"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-200 transition-colors hover:border-[#dfff52]"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#060709]/98 border-b border-white/10 px-6 py-6 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              <div className="pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
                <LiveClock />
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Disponible
                </span>
              </div>

              {NAV_SECTIONS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 font-mono text-sm transition-colors text-left ${
                      isActive
                        ? 'bg-[#dfff52] text-[#060709] font-bold'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#060709]' : 'text-zinc-400'}>
                        {link.num}
                      </span>
                      <span>{link.label}</span>
                    </span>
                    <span className="text-xs opacity-60">→</span>
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
                <a
                  href="./CV_Oscar_Dario_Madera.pdf"
                  download="CV_Oscar_Dario_Madera.pdf"
                  className="flex items-center gap-2 font-mono text-xs text-[#dfff52] hover:underline"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  <span>Descargar CV (Harvard)</span>
                </a>

                <a
                  href="https://github.com/oscarbol09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-white"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
