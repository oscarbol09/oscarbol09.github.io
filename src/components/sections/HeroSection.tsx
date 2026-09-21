import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Copy, Check, Sparkles, Layers, Database, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const HeroSection: React.FC = () => {
  const { playClick, playSuccess } = useSoundEffects();
  const [copied, setCopied] = useState(false);

  const email = 'omaderabolano@correo.unicordoba.edu.co';

  const handleCopyEmail = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    playSuccess();

    // Trigger subtle celebratory confetti burst
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 35,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981'],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const scrollTo = (id: string) => {
    playClick();
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative flex min-h-[92vh] w-full flex-col justify-between pt-28 pb-12 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Top Telemetry Badge */}
      <div className="flex items-center justify-start">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-xs font-medium text-emerald-300">
            Disponible para Ingeniería de Alto Impacto & Sistemas
          </span>
        </motion.div>
      </div>

      {/* Main Impact Hero Content */}
      <div className="my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3">
            <span>Oscar Darío Madera</span>
            <span>//</span>
            <span className="text-zinc-400">@oscarbol09</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            Sistemas Concurrentes,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Arquitecturas RAG
            </span>{' '}
            & Alta Artesanía.
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed">
            Construyo infraestructura de desarrollo en <strong className="text-white font-medium">Go</strong> (proxies TCP, branching de bases de datos), pipelines <strong className="text-white font-medium">RAG híbridos</strong> en Python, aplicaciones multi-tenant en <strong className="text-white font-medium">Next.js 16</strong> y visión artificial con <strong className="text-white font-medium">cero código cosmético</strong>.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('proyectos')}
              className="group inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-5 py-3 font-mono text-xs sm:text-sm font-semibold text-cyan-300 backdrop-blur-md transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-500/25 hover:shadow-glow-cyan active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              <span>Explorar Proyectos Insignia</span>
            </button>

            <button
              onClick={() => scrollTo('terminal')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-mono text-xs sm:text-sm font-semibold text-zinc-300 backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              <Terminal className="h-4 w-4 text-violet-400" />
              <span>Abrir Terminal CLI</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-400 transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:text-white active:scale-[0.98]"
              title="Copiar correo al portapapeles"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300">¡Email copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-zinc-500" />
                  <span>Copiar Email</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Telemetry & Quick Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-t border-white/10 pt-6"
      >
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 backdrop-blur-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-white">Branchbase</div>
            <div className="text-[11px] text-zinc-400">Git DB Branching en Go</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 backdrop-blur-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-white">EduRag & Thesis</div>
            <div className="text-[11px] text-zinc-400">RAG Híbrido & Multi-Tenant</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 backdrop-blur-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-white">AudioBard</div>
            <div className="text-[11px] text-zinc-400">TTS Multi-Voz con LLMs</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 backdrop-blur-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-white">Memoria Obsidian</div>
            <div className="text-[11px] text-zinc-400">Arquitectura Simbiótica</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
