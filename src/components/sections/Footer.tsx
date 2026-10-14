import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const { playClick } = useSoundEffects();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const updateTime = () => {
      if (document.hidden) return;
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
    interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#060709] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Identity & Telemetry */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div className="flex items-center gap-2 font-mono text-xs text-[#f2efe8] font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#dfff52] text-[10px] text-[#060709] font-black">
              OD
            </span>
            <span>Oscar Darío Madera (@oscarbol09)</span>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            Systems &amp; Backend Software Craftsman • Montería, Colombia (UTC-5: {currentTime || '12:00:00'})
          </p>
        </div>

        {/* Center Tech Stack Badge */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-white/[0.03] border border-white/10 px-3.5 py-1.5 rounded-full">
          <span className="h-1.5 w-1.5 rounded-full bg-[#dfff52]" />
          <span>Vite 6 · React 19 · Motion · Tailwind CSS · Vitest (TDD 100%)</span>
        </div>

        {/* Right Actions: GitHub & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/oscarbol09"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-[#dfff52] hover:bg-[#dfff52] hover:text-[#060709]"
            title="GitHub"
            aria-label="GitHub @oscarbol09"
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all hover:border-[#dfff52] hover:bg-[#dfff52] hover:text-[#060709] active:scale-95"
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
