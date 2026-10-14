import React from 'react';
import { Cpu, Terminal, Database, Layout, Activity, Cloud, ShieldCheck } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/skills';
import { BentoCard } from '../ui/BentoCard';

export const TechRadarSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="h-4 w-4 text-[#dfff52]" />;
      case 'Cpu': return <Cpu className="h-4 w-4 text-violet-400" />;
      case 'Database': return <Database className="h-4 w-4 text-emerald-400" />;
      case 'Layout': return <Layout className="h-4 w-4 text-blue-400" />;
      case 'Cloud': return <Cloud className="h-4 w-4 text-[#dfff52]" />;
      case 'ShieldCheck': return <ShieldCheck className="h-4 w-4 text-emerald-400" />;
      default: return <Activity className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <section id="stack" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-white/10">
      {/* Editorial Section Header */}
      <div className="flex flex-col items-start gap-3 mb-14">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold text-[#dfff52]">07</span>
          <span className="h-px w-8 bg-[#dfff52]/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Matriz de Tecnologías &amp; Dominio
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f2efe8]">
          Stack Tecnológico &amp; Criterio
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
          Herramientas elegidas por su robustez, concurrencia y capacidad para resolver problemas de escala sin generar deuda técnica.
        </p>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <BentoCard
            key={idx}
            spotlightColor="rgba(223, 255, 82, 0.12)"
            className="flex flex-col justify-between border-white/10 bg-[#0b0c10] p-6 sm:p-7 hover:border-[#dfff52]/40"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#060709]">
                    {getIcon(cat.icon)}
                  </div>
                  <h3 className="font-display text-base font-bold text-[#f2efe8]">
                    {cat.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                {cat.description}
              </p>

              {/* Skills List in Category */}
              <div className="space-y-2 border-t border-white/10 pt-3">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="rounded-xl border border-white/5 bg-[#060709] p-2.5 transition-colors hover:border-white/15">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#f2efe8]">
                        {skill.name}
                      </span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                        skill.level === 'Experto'
                          ? 'border-[#dfff52]/30 bg-[#dfff52]/10 text-[#dfff52] font-semibold'
                          : 'border-white/10 bg-white/5 text-zinc-400'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                    {skill.context && (
                      <div className="mt-1 font-mono text-[10px] text-zinc-500 truncate">
                        {skill.context}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
};
