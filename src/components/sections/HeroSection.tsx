import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Copy,
  Check,
  ArrowUpRight,
  Network,
  GitPullRequest,
  ArrowDownToLine,
} from 'lucide-react';
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
    <section
      id="inicio"
      className="relative flex min-h-[95vh] w-full flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Top Editorial Pill: Availability & Domain */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0c10] px-3.5 py-1.5 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-medium text-emerald-300">
            Disponible para Ingeniería de Sistemas, Backend &amp; Arquitectura Distribuida
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0b0c10] px-3 py-1 font-mono text-xs text-zinc-400">
          <span>🇨🇴 Montería, Colombia</span>
          <span className="text-zinc-600">·</span>
          <span>Universidad de Córdoba</span>
        </div>
      </div>

      {/* Main Split Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Bold Typographic Statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Identity Eyebrow */}
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
            <span className="text-[#dfff52] font-semibold">Oscar Darío Madera</span>
            <span className="text-zinc-600">//</span>
            <span>@oscarbol09</span>
            <span className="text-zinc-600">//</span>
            <span>Systems Craftsman</span>
          </div>

          {/* Impact Headline in Space Grotesk */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-[#f2efe8] leading-[1.02]">
            Sistemas Concurrentes,{' '}
            <span className="text-[#dfff52] inline-block">
              Infraestructura
            </span>{' '}
            &amp; Aplicaciones con IA.
          </h1>

          {/* Subtitle / Engineering Description */}
          <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-sans">
            Ingeniero de software enfocado en infraestructura de desarrollo en{' '}
            <strong className="text-white font-semibold">Go 1.22+</strong> (proxies TCP, branching dinámico de bases de datos), microservicios nativos en{' '}
            <strong className="text-white font-semibold">Java 21 / Loom</strong> con Model Context Protocol (MCP), orquestación de agentes con{' '}
            <strong className="text-white font-semibold">pgvector</strong>, y contribuciones upstream en{' '}
            <strong className="text-white font-semibold">OCA (Odoo Community Association)</strong>.
          </p>

          {/* Action CTAs Cluster */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full">
            {/* Primary Magnetic CTA */}
            <button
              onClick={() => scrollTo('proyectos')}
              className="group inline-flex items-center gap-2 rounded-xl bg-[#dfff52] px-5 py-3 font-mono text-xs sm:text-sm font-bold text-[#060709] transition-all duration-200 hover:bg-[#caff33] hover:shadow-[0_0_24px_rgba(223,255,82,0.35)] active:scale-95"
            >
              <span>Explorar Proyectos Insignia</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Secondary Architecture CTA */}
            <button
              onClick={() => scrollTo('arquitectura')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-mono text-xs sm:text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
            >
              <Network className="h-4 w-4 text-[#dfff52]" />
              <span>Arquitectura Técnica</span>
            </button>

            {/* Upstream Open Source CTA */}
            <button
              onClick={() => scrollTo('opensource')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-mono text-xs sm:text-sm font-semibold text-zinc-300 transition-all duration-200 hover:border-emerald-400/40 hover:text-emerald-300 active:scale-95"
            >
              <GitPullRequest className="h-4 w-4 text-emerald-400" />
              <span>Open Source</span>
            </button>
          </div>

          {/* Quick Copy Email & CV Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t border-white/10 w-full">
            <button
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0b0c10] px-3.5 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-[#dfff52]/40 hover:text-white"
              title="Copiar correo electrónico al portapapeles"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Correo copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#dfff52]" />
                  <span>{email}</span>
                </>
              )}
            </button>

            <a
              href="./CV_Oscar_Dario_Madera.pdf"
              download="CV_Oscar_Dario_Madera.pdf"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-[#dfff52] transition-colors"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" />
              <span>Descargar CV (Formato Harvard)</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: High-Craft Systems Workbench Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <HeroTelemetryHUD />
        </motion.div>
      </div>

      {/* Bottom Architectural Metrics Bar */}
      <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="flex flex-col">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-[#dfff52]">
            &lt; 10ms
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 mt-1">
            Latencia de Branching (Branchbase)
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-white">
            10+ PRs
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 mt-1">
            Contribuciones Merged en OCA
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-violet-300">
            Java 21 &amp; Go
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 mt-1">
            Project Loom &amp; GraalVM AOT
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
            45+ Tests
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 mt-1">
            TDD &amp; Vitest Suites Verificados
          </span>
        </div>
      </div>
    </section>
  );
};
