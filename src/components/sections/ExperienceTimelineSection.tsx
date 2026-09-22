import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, GraduationCap } from 'lucide-react';
import { CAREER_TIMELINE } from '../../data/experience';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';

export const ExperienceTimelineSection: React.FC = () => {
  return (
    <section id="trayectoria" className="relative w-full py-20 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Briefcase className="h-4 w-4" />
          <span>Trayectoria & Experiencia Profesional</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Recorrido de Ingeniería & Hitos
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400">
          Evolución técnica desde las bases fundamentales de ciencias de la computación hasta el diseño de sistemas concurrentes y productos con IA.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-white/10 ml-3 sm:ml-6 space-y-10 pl-6 sm:pl-10">
        {CAREER_TIMELINE.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Glowing Timeline Node Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-6 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-[#07070a] group-hover:border-cyan-400/80 group-hover:shadow-[0_0_12px_#06b6d4] transition-all">
              <span className={`h-2.5 w-2.5 rounded-full ${
                item.accent === 'cyan' ? 'bg-cyan-400' :
                item.accent === 'violet' ? 'bg-violet-400' :
                item.accent === 'blue' ? 'bg-blue-400' :
                'bg-emerald-400'
              }`} />
            </div>

            {/* Timeline Card */}
            <BentoCard
              spotlightColor={
                item.accent === 'cyan' ? 'rgba(6, 182, 212, 0.12)' :
                item.accent === 'violet' ? 'rgba(139, 92, 246, 0.12)' :
                item.accent === 'blue' ? 'rgba(59, 130, 246, 0.12)' :
                'rgba(16, 185, 129, 0.12)'
              }
              className="p-6 sm:p-8"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant={item.accent} pulse={idx === 0}>
                    {item.badge}
                  </Badge>
                  {idx >= 3 ? (
                    <GraduationCap className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Award className="h-4 w-4 text-cyan-400" />
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                    {item.period}
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    {item.location}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.role}
              </h3>

              <div className="font-mono text-xs font-semibold text-zinc-400 mt-1 mb-3">
                {item.organization}
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Achievements Checklist */}
              <div className="space-y-2 border-t border-white/5 pt-4 mb-4">
                {item.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                {item.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </BentoCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
