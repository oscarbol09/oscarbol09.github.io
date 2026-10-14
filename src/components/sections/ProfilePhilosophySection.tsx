import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  CheckCircle2,
  Cpu,
  Database,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { CAREER_TIMELINE } from '../../data/experience';

export const ProfilePhilosophySection: React.FC = () => {
  return (
    <section
      id="perfil"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-white/10"
    >
      <div id="trayectoria" className="sr-only">
        Trayectoria Profesional
      </div>

      {/* Editorial Section Header */}
      <div className="flex flex-col gap-3 mb-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold text-[#dfff52]">01</span>
          <span className="h-px w-8 bg-[#dfff52]/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Perfil &amp; Filosofía de Ingeniería
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#f2efe8]">
          INGENIERÍA RIGUROSA, MODULARIDAD PROFUNDA.
        </h2>
        <p className="max-w-2xl text-base text-zinc-400 font-sans leading-relaxed">
          Diseño sistemas de extremo a extremo: desde proxies TCP y protocolos a nivel de red hasta microservicios corporativos y orquestación de agentes con IA.
        </p>
      </div>

      {/* 2-Column Split: Bio & Principles on Left / Experience Timeline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Personal Statement & Core Principles */}
        <div className="lg:col-span-5 space-y-8">
          {/* Bio Lead Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0c10] p-6 sm:p-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f2efe8] mb-4">
              Sobre mí
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
              Soy <strong className="text-white font-semibold">Oscar Darío Madera</strong>, Licenciado en Informática por la <strong className="text-white font-semibold">Universidad de Córdoba</strong>.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Mi trabajo combina la precisión de los lenguajes fuertemente tipados (<strong className="text-zinc-200">Go 1.22+ y Java 21</strong>) con bases de datos relacionales (<strong className="text-zinc-200">PostgreSQL y SQL Server</strong>) y la arquitectura de agentes inteligentes. No implemento código a ciegas: cada línea responde a un contrato estable, pruebas automatizadas deterministas y límites de módulo claros.
            </p>

            {/* Academic Credential Pill */}
            <div className="pt-4 border-t border-white/10 flex items-start gap-3 text-xs font-mono text-zinc-300">
              <GraduationCap className="h-5 w-5 text-[#dfff52] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">Universidad de Córdoba</div>
                <div className="text-zinc-400">Licenciatura en Informática · Montería, Colombia</div>
              </div>
            </div>
          </div>

          {/* Core Engineering Pillars */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0c10] p-6 sm:p-8">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#dfff52] mb-5">
              Pilares de Ingeniería (ECC Standard)
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-[#dfff52] shrink-0 mt-1" />
                <div>
                  <div className="font-mono text-xs font-bold text-white">
                    TDD &amp; Verificación Continua
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Ciclo Red-Green-Refactor estricto con más del 80% de cobertura y cero pruebas tautológicas.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Cpu className="h-4 w-4 text-[#dfff52] shrink-0 mt-1" />
                <div>
                  <div className="font-mono text-xs font-bold text-white">
                    Concurrencia Estructurada
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Context propagation y control de fugas de goroutines en Go; Project Loom y Virtual Threads en Java 21.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Database className="h-4 w-4 text-[#dfff52] shrink-0 mt-1" />
                <div>
                  <div className="font-mono text-xs font-bold text-white">
                    Integridad ACID &amp; Protocolos de Red
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Cero I/O en transacciones activas de base de datos, proxies TCP de baja latencia y consultas optimizadas.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Experience & Career Milestones */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f2efe8]">
              EXPERIENCIA &amp; HITOS
            </h3>
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              2023 — 2026
            </span>
          </div>

          <div className="divide-y divide-white/10">
            {CAREER_TIMELINE.map((item, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-[2.5rem_1fr] gap-4 sm:gap-6"
              >
                <span className="font-mono text-lg font-bold text-[#dfff52] pt-0.5">
                  {idx + 1}
                </span>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <div>
                      <h4 className="font-display text-lg sm:text-xl font-bold text-[#f2efe8]">
                        {item.role}
                      </h4>
                      <p className="font-mono text-xs text-zinc-400 mt-0.5">
                        {item.organization} · {item.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#dfff52] bg-white/5 px-2.5 py-1 rounded-full border border-white/5 shrink-0 self-start sm:self-auto">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed mt-3 mb-4">
                    {item.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="space-y-1.5 mb-5">
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#dfff52] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[11px] text-zinc-300 bg-white/5 border border-white/5 rounded-md px-2 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#dfff52] hover:underline"
            >
              <span>Ver proyectos de ingeniería seleccionados</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
