import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';
import { SoundToggle } from '../ui/SoundToggle';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const NAV_LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'terminal', label: 'Terminal CLI' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'arquitectura', label: 'Arquitectura' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'fiabilidad', label: 'Fiabilidad' },
  { id: 'stack', label: 'Stack' },
  { id: 'filosofia', label: 'Filosofía' },
  { id: 'contacto', label: 'Contacto' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { playClick, playTabSwitch } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <nav
          aria-label="Navegación principal"
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 rounded-full border border-white/10 px-3 py-1.5 backdrop-blur-2xl transition-all duration-300 ${
            isScrolled ? 'bg-[#07070a]/90 shadow-2xl shadow-black/80' : 'bg-[#07070a]/70'
          }`}
        >
          {/* Logo / Brand Indicator */}
          <button
            onClick={() => scrollTo('inicio')}
            className="flex items-center gap-2 rounded-full pl-2 pr-3 py-1 font-mono text-xs font-bold text-white transition-opacity hover:opacity-80"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-[10px] text-white">
              &gt;_
            </span>
            <span className="hidden md:inline tracking-tight">Oscar Madera</span>
          </button>

          {/* Desktop Nav Links with active layoutId indicator */}
          <div className="hidden lg:flex items-center gap-1 rounded-full bg-white/[0.03] p-1 border border-white/5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
                    isActive ? 'text-cyan-300' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-cyan-500/15 border border-cyan-500/30"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Actions: Sound, GitHub & Contact */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <SoundToggle />

            <a
              href="https://github.com/oscarbol09"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              title="Perfil de GitHub @oscarbol09"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <button
              onClick={() => scrollTo('contacto')}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-cyan-300 backdrop-blur-md transition-all hover:border-cyan-400/60 hover:bg-cyan-500/20 active:scale-95"
            >
              <Sparkles className="h-3 w-3" />
              <span>Contactar</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Abrir menú"
              className="flex lg:hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col bg-[#07070a]/95 pt-24 px-6 backdrop-blur-3xl lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`flex items-center justify-between rounded-xl border border-white/5 p-4 text-left font-display text-base font-medium transition-all ${
                  activeSection === link.id
                    ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                    : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-zinc-500">#0{NAV_LINKS.indexOf(link) + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
