import React from 'react';
import { Cpu, Terminal, Database, Layout, Activity, Code2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/skills';
import { BentoCard } from '../ui/BentoCard';

export const TechRadarSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="h-4 w-4 text-cyan-400" />;
      case 'Cpu': return <Cpu className="h-4 w-4 text-violet-400" />;
      case 'Database': return <Database className="h-4 w-4 text-emerald-400" />;
      case 'Layout': return <Layout className="h-4 w-4 text-blue-400" />;
      default: return <Activity className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <section id="stack" className="relative w-full py-20 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Code2 className="h-4 w-4" />
          <span>Matriz de Tecnologías & Dominio</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Stack Tecnológico & Criterio
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400">
          Herramientas elegidas por su robustez, concurrencia y capacidad para resolver problemas de escala sin generar deuda técnica.
        </p>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <BentoCard
            key={idx}
            spotlightColor={
              cat.badgeAccent === 'cyan' ? 'rgba(6, 182, 212, 0.12)' :
              cat.badgeAccent === 'violet' ? 'rgba(139, 92, 246, 0.12)' :
              cat.badgeAccent === 'emerald' ? 'rgba(16, 185, 129, 0.12)' :
              cat.badgeAccent === 'amber' ? 'rgba(245, 158, 11, 0.12)' :
              'rgba(59, 130, 246, 0.12)'
            }
            className="flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    {getIcon(cat.icon)}
                  </div>
                  <h3 className="font-display text-base font-bold text-white">
                    {cat.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                {cat.description}
              </p>

              {/* Skills List in Category */}
              <div className="space-y-2.5 border-t border-white/5 pt-3">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 transition-colors hover:border-white/15">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {skill.name}
                      </span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                        skill.level === 'Experto'
                          ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                          : 'border-white/10 bg-white/5 text-zinc-400'
                      }`}>
                        {skill.level}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400 leading-snug">
                      {skill.context}
                    </p>
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
