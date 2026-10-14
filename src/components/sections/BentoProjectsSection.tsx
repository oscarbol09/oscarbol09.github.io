import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';
import { PROJECTS, Project } from '../../data/projects';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { ProjectDetailModal } from '../modals/ProjectDetailModal';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const CATEGORIES = [
  { id: 'all', label: 'Todos los Proyectos' },
  { id: 'systems', label: 'Sistemas & Infra' },
  { id: 'ai_rag', label: 'IA & RAG' },
  { id: 'desktop_tools', label: 'Desktop & Tools' },
  { id: 'frontend_craft', label: 'Frontend & UI Craft' },
  { id: 'vision', label: 'Visión Artificial' },
];

export const BentoProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { playClick, playTabSwitch } = useSoundEffects();

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const handleCategoryChange = (catId: string) => {
    playTabSwitch();
    setSelectedCategory(catId);
  };

  const handleOpenDetail = (project: Project) => {
    playClick();
    setSelectedProject(project);
  };

  return (
    <section id="proyectos" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-white/10">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-base font-bold text-[#dfff52]">02</span>
            <span className="h-px w-8 bg-[#dfff52]/40" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Galería de Ingeniería &amp; Casos de Estudio
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f2efe8]">
            Proyectos Insignia &amp; Sistemas
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Arquitecturas de datos, servidores de proxy de base de datos, RAG pedagógico y pipelines multimedia con autoría intelectual total.
          </p>
        </div>

        {/* Category Filters Pill Group */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-white/10 bg-[#0b0c10] p-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition-all ${
                  isActive ? 'text-[#060709] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-project-filter"
                    className="absolute inset-0 rounded-full bg-[#dfff52]"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Case Study Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => {
          const isSpanTwo = project.featured && (idx === 0 || idx === 1);

          return (
            <BentoCard
              key={project.id}
              spotlightColor="rgba(223, 255, 82, 0.12)"
              className={`h-full cursor-pointer flex flex-col justify-between ${
                isSpanTwo ? 'lg:col-span-2' : ''
              }`}
              onClick={() => handleOpenDetail(project)}
            >
              {/* Card Top Area */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={project.featured ? 'lime' : 'neutral'} pulse={project.featured}>
                      {project.categoryLabel}
                    </Badge>
                    {project.version && (
                      <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {project.version}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {project.status.split('/')[0]}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f2efe8] group-hover:text-[#dfff52] transition-colors">
                  {project.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                  {project.tagline}
                </p>

                {/* Key Metrics Pills */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 border-t border-white/10 pt-4">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="flex flex-col bg-white/[0.02] p-2 rounded-lg border border-white/5">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                          {m.label}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#dfff52] mt-0.5">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Bottom Area */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.languages.map((lang, lIdx) => (
                    <span
                      key={lIdx}
                      className="rounded-md border border-[#dfff52]/25 bg-[#dfff52]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#dfff52]"
                    >
                      {lang}
                    </span>
                  ))}
                  {project.techStack.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(project);
                    }}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#dfff52] hover:text-[#caff33] transition-colors"
                  >
                    <span>Ver Arquitectura &amp; Detalles</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                    }}
                    title="Ver repositorio en GitHub"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-300 transition-colors hover:border-[#dfff52] hover:bg-[#dfff52] hover:text-[#060709]"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </BentoCard>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
