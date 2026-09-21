import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Copy, Check, Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';
import { Project } from '../../data/projects';
import { Badge } from '../ui/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { playClick, playSuccess } = useSoundEffects();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleCopyCommand = () => {
    if (!project?.installCommand) return;
    navigator.clipboard.writeText(project.installCommand);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-[#09090e] p-6 sm:p-8 shadow-2xl backdrop-blur-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Subtle Top Glowing Line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            aria-label="Cerrar modal"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={project.badgeColor} pulse>
              {project.categoryLabel}
            </Badge>
            {project.version && (
              <Badge variant="neutral">
                {project.version}
              </Badge>
            )}
            <span className="font-mono text-xs text-zinc-500">•</span>
            <span className="font-mono text-xs text-emerald-400">{project.status}</span>
          </div>

          <h2 id="modal-project-title" className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {project.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.tagline}
          </p>

          {/* Key Metrics Bar */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-white/10 py-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{m.label}</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-cyan-300">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Overview */}
          <div className="mt-6 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              Arquitectura & Propósito
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture ASCII Diagram */}
          {project.architectureDiagram && (
            <div className="mt-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2 mb-2">
                <Terminal className="h-3.5 w-3.5 text-violet-400" />
                Flujo de Datos del Sistema
              </h3>
              <div className="rounded-xl border border-white/10 bg-[#040406] p-4 font-mono text-[11px] sm:text-xs text-cyan-300/90 overflow-x-auto whitespace-pre leading-snug">
                {project.architectureDiagram}
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2.5">
              Hitos de Implementación
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Decisions */}
          {project.technicalDecisions && project.technicalDecisions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2.5">
                Decisiones de Ingeniería Clave
              </h3>
              <div className="space-y-3">
                {project.technicalDecisions.map((td, i) => (
                  <div key={i} className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <h4 className="font-mono text-xs font-semibold text-white">{td.title}</h4>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{td.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
              Stack Tecnológico
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, i) => (
                <span key={i} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CLI Install / Clone Box */}
          {project.installCommand && (
            <div className="mt-6">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#040406] px-4 py-2.5">
                <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono text-zinc-300">
                  <span className="text-cyan-400 select-none">$</span>
                  <code>{project.installCommand}</code>
                </div>
                <button
                  onClick={handleCopyCommand}
                  className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-colors"
                  title="Copiar comando"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              Cerrar
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-mono font-medium text-white transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 active:scale-95"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              Ver Código en GitHub
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
