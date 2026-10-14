import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Sparkles, Network, Database, Cpu, GitPullRequest } from 'lucide-react';
import { HeroTelemetryHUD } from '../ui/HeroTelemetryHUD';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const HeroSection: React.FC = () => {
  const { playClick, playSuccess } = useSoundEffects();
  const [copied, setCopied] = useState(false);

  const email = 'dario.oviedo2022@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      playSuccess();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('[HeroSection] Clipboard write failed:', err);
    }
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
            Disponible para Ingeniería de Sistemas, Backend & Arquitectura Distribuida
          </span>
        </motion.div>
      </div>

      {/* Main Impact Hero Content */}
      <div className="my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 max-w-3xl"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3">
            <span>Oscar Darío Madera</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">@oscarbol09</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">Systems & Backend Craftsman</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            Sistemas Concurrentes,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Infraestructura & RAG
            </span>{' '}
            de Alta Precisión.
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            Ingeniero de software especializado en infraestructura de desarrollo en <strong className="text-white font-medium">Go 1.22+</strong> (proxies TCP, branching dinámico de bases de datos), servicios nativos en <strong className="text-white font-medium">Java 21 / GraalVM</strong> con Model Context Protocol (MCP), orquestación de agentes con <strong className="text-white font-medium">Loom & pgvector</strong>, y contribuciones activas en <strong className="text-white font-medium">OCA (Odoo)</strong>.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('proyectos')}
              className="group inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-5 py-3 font-mono text-xs sm:text-sm font-semibold text-cyan-300 backdrop-blur-md transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-500/25 active:scale-[0.98]"
            >
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              <span>Explorar Proyectos Insignia</span>
            </button>

            <button
              onClick={() => scrollTo('arquitectura')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-mono text-xs sm:text-sm font-semibold text-zinc-300 backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              <Network className="h-4 w-4 text-violet-400" />
              <span>Deep-Dive Arquitectura</span>
            </button>

            <button
              onClick={() => scrollTo('opensource')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs sm:text-sm font-semibold text-zinc-400 backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40 hover:text-emerald-300 active:scale-[0.98]"
            >
              <GitPullRequest className="h-4 w-4 text-emerald-400" />
              <span>Open Source</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-400 transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:text-white active:scale-[0.98]"
              title="Copiar correo al portapapeles"
              aria-label="Copiar correo al portapapeles"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">¡Email copiado!</span>
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

        {/* Right Side: Professional Live Telemetry HUD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="lg:col-span-5 flex flex-col items-center justify-center w-full"
        >
          <HeroTelemetryHUD />
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
            <div className="font-mono text-xs font-bold text-white">JVM-MCP</div>
            <div className="text-[11px] text-zinc-400">Model Context Protocol en Java 21</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 backdrop-blur-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Network className="h-4 w-4" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-white">A2A-Hub</div>
            <div className="text-[11px] text-zinc-400">Multi-Agent Mesh en Loom</div>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 backdrop-blur-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <GitPullRequest className="h-4 w-4" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-white">Open Source</div>
            <div className="text-[11px] text-zinc-400">OCA & Linux Upstream PRs</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
