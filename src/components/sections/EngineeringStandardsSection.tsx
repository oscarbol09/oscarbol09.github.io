import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import { ENGINEERING_PILLARS } from '../../data/standards';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';

export const EngineeringStandardsSection: React.FC = () => {
  return (
    <section id="filosofia" className="relative w-full py-20 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Shield className="h-4 w-4" />
          <span>Filosofía de Desarrollo & Calidad</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Estándares de Artesanía de Software
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400">
          Principios estrictos para erradicar el código genérico inflado, garantizar autoría intelectual y mantener integridad en sistemas críticos.
        </p>
      </div>

      {/* Grid of Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ENGINEERING_PILLARS.map((pillar, idx) => (
          <BentoCard
            key={idx}
            spotlightColor={
              pillar.accent === 'cyan' ? 'rgba(6, 182, 212, 0.12)' :
              pillar.accent === 'violet' ? 'rgba(139, 92, 246, 0.12)' :
              pillar.accent === 'emerald' ? 'rgba(16, 185, 129, 0.12)' :
              'rgba(59, 130, 246, 0.12)'
            }
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant={pillar.accent} pulse>
                  {pillar.badge}
                </Badge>
                <span className="font-mono text-xs text-zinc-500">
                  Principio #{idx + 1}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-1">
                {pillar.title}
              </h3>

              <div className="font-mono text-xs font-semibold text-cyan-300/90 mb-3">
                "{pillar.tagline}"
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-zinc-500 border-t border-white/5 pt-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Verificado en todos los repositorios activos</span>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
};
