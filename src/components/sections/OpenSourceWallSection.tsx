import React from 'react';
import { motion } from 'motion/react';
import { GitPullRequest, ExternalLink, ShieldCheck, GitMerge } from 'lucide-react';
import { OPEN_SOURCE_CONTRIBUTIONS, OpenSourceContribution } from '../../data/openSource';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const OpenSourceWallSection: React.FC = () => {
  const { playHover } = useSoundEffects();

  return (
    <section id="opensource" className="relative w-full py-20 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400">
          <GitPullRequest className="h-4 w-4" />
          <span>Open Source Ecosystem Contributions</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Aportes Comunitarios & Software Libre
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400 font-sans">
          Pull Requests aprobados y correcciones críticas en la Odoo Community Association (OCA), la suite oficial del protocolo Agent-to-Agent y sistemas operativos Linux.
        </p>
      </div>

      {/* Contributions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OPEN_SOURCE_CONTRIBUTIONS.map((item: OpenSourceContribution, idx: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            onMouseEnter={playHover}
          >
            <BentoCard className="h-full flex flex-col justify-between border-white/10 bg-[#09090f]/90 p-6 transition-all duration-200 hover:border-emerald-500/30">
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                    <GitMerge className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate font-semibold text-zinc-300">{item.org}</span>
                  </div>
                  <Badge variant={item.badgeColor}>
                    {item.type}
                  </Badge>
                </div>

                <h3 className="font-display text-lg font-bold text-white tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3">
                  {item.description}
                </p>

                <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5 mb-4">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Impacto de Ingeniería:</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    {item.impact}
                  </p>
                </div>
              </div>

              {/* Technologies & Metrics */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3 mb-4">
                  {item.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="text-[9px] font-mono text-zinc-500 uppercase">{m.label}</div>
                      <div className="text-[11px] font-mono font-bold text-zinc-200 truncate">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Upstream Links */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>{item.repo}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  {item.pullRequestUrl && (
                    <a
                      href={item.pullRequestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>Ver PR / Issue</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </BentoCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
