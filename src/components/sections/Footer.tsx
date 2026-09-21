import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const { playClick } = useSoundEffects();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-CO', {
          timeZone: 'America/Bogota',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#040406]/95 py-12 px-6 sm:px-8 lg:px-16 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Identity & Telemetry */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] text-black font-extrabold">
              ✓
            </span>
            <span>Oscar Darío Madera (@oscarbol09)</span>
          </div>
          <p className="text-xs text-zinc-500 font-mono">
            AI Systems & Backend Software Craftsman • Colombia (UTC-5: {currentTime || '12:00:00'})
          </p>
        </div>

        {/* Center Tech Stack Badge */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Vite • React 19 • Motion.dev • Tailwind CSS</span>
        </div>

        {/* Right Actions: GitHub & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/oscarbol09"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-white/30 hover:text-white"
            title="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 active:scale-95"
            title="Volver arriba"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
