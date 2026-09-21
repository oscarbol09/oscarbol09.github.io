import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers } from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';
import { PROJECTS, Project } from '../../data/projects';
import { BentoCard } from '../ui/BentoCard';
import { Parallax3DCard } from '../ui/Parallax3DCard';
import { Badge } from '../ui/Badge';
import { ProjectDetailModal } from '../modals/ProjectDetailModal';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const CATEGORIES = [
  { id: 'all', label: 'Todos los Proyectos' },
  { id: 'systems', label: 'Sistemas & Go' },
  { id: 'ai_rag', label: 'IA & RAG' },
  { id: 'desktop_tools', label: 'Desktop & Tools' },
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
    <section id="proyectos" className="relative w-full py-20 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2">
            <Layers className="h-4 w-4" />
            <span>Galería de Ingeniería de Software</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Proyectos Insignia & Sistemas
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-400">
            Arquitecturas de datos, servidores de proxy de base de datos, RAG pedagógico y pipelines multimedia con autoría intelectual total.
          </p>
        </div>

        {/* Category Filters Pill Group */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/10 bg-[#07070a] p-1.5 backdrop-blur-xl">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative rounded-xl px-3.5 py-1.5 font-mono text-xs font-medium transition-all ${
                  isActive ? 'text-cyan-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-project-filter"
                    className="absolute inset-0 rounded-xl bg-cyan-500/15 border border-cyan-500/30"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => {
          const isSpanTwo = project.featured && (idx === 0 || idx === 1);

          const CardContent = (
            <BentoCard
              spotlightColor={
                project.badgeColor === 'cyan' ? 'rgba(6, 182, 212, 0.14)' :
                project.badgeColor === 'violet' ? 'rgba(139, 92, 246, 0.14)' :
                project.badgeColor === 'emerald' ? 'rgba(16, 185, 129, 0.14)' :
                project.badgeColor === 'amber' ? 'rgba(245, 158, 11, 0.14)' :
                'rgba(59, 130, 246, 0.14)'
              }
              className={`h-full cursor-pointer flex flex-col justify-between ${
                isSpanTwo ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Card Top Area */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={project.badgeColor} pulse={project.featured}>
                      {project.categoryLabel}
                    </Badge>
                    {project.version && (
                      <span className="font-mono text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                        {project.version}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {project.status.split('/')[0]}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                  {project.tagline}
                </p>

                {/* Key Metrics Pills */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 border-t border-white/5 pt-3">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">{m.label}</span>
                        <span className="font-mono text-xs font-bold text-cyan-300">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Bottom Area */}
              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.languages.map((lang, lIdx) => (
                    <span key={lIdx} className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-300">
                      {lang}
                    </span>
                  ))}
                  {project.techStack.slice(0, 3).map((tech, tIdx) => (
                    <span key={tIdx} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
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
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <span>Ver Arquitectura & Detalles</span>
                    <Sparkles className="h-3 w-3" />
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
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </BentoCard>
          );

          return (
            <div
              key={project.id}
              onClick={() => handleOpenDetail(project)}
              className={isSpanTwo ? 'lg:col-span-2' : ''}
            >
              {project.featured ? (
                <Parallax3DCard intensity={6}>
                  {CardContent}
                </Parallax3DCard>
              ) : (
                CardContent
              )}
            </div>
          );
        })}
      </div>

      {/* Deep Dive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
