import React from 'react';
import { Gauge, CheckCircle, ShieldCheck, Zap, Server, FileCode, Lock } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';

interface QualityMetric {
  title: string;
  metric: string;
  subtitle: string;
  description: string;
  badge: string;
  accent: 'cyan' | 'emerald' | 'violet' | 'amber';
  icon: 'Zap' | 'ShieldCheck' | 'Server' | 'Lock' | 'Gauge' | 'FileCode';
}

const QUALITY_METRICS: QualityMetric[] = [
  {
    title: 'Clonado Ultra-Rápido de Bases de Datos',
    metric: '< 250ms',
    subtitle: 'Branchbase en PostgreSQL',
    description: 'Aprovecha CREATE DATABASE WITH TEMPLATE para instanciar réplicas de bases de datos completas en milisegundos sin congelar la aplicación.',
    badge: 'Database Benchmarks',
    accent: 'cyan',
    icon: 'Zap'
  },
  {
    title: 'Sobrecarga de Proxy TCP Despreciable',
    metric: '< 1.2ms',
    subtitle: 'Goroutines Concurrentes en Go',
    description: 'Enrutamiento de paquetes TCP mediante canales no bloqueantes en Go 1.22+, manteniendo un overhead imperceptible para el cliente.',
    badge: 'Network Latency',
    accent: 'emerald',
    icon: 'Server'
  },
  {
    title: 'Aislamiento Multi-Tenant Estricto',
    metric: '100% RLS',
    subtitle: 'Supabase en EduRag',
    description: 'Políticas de Row Level Security a nivel de motor PostgreSQL que verifican automáticamente owner_id y chatbot_id en cada transacción.',
    badge: 'Security Guarantee',
    accent: 'violet',
    icon: 'Lock'
  },
  {
    title: 'Verificación Anti-Alucinación DOI',
    metric: '99.8%',
    subtitle: 'Filtro CrossRef en ThesisForge',
    description: 'Cada cita y referencia académica generada es contrastada contra el índice central de CrossRef y Semantic Scholar antes de exportar a APA 7ª.',
    badge: 'Integrity Verification',
    accent: 'amber',
    icon: 'ShieldCheck'
  },
  {
    title: 'Uso de Memoria en Streaming de Audio',
    metric: '< 180 MB',
    subtitle: 'FFmpeg Demuxer en AudioBard',
    description: 'Concatenación de capítulos en streaming O(1) de memoria RAM, evitando desbordamientos incluso en libros de más de 800 páginas.',
    badge: 'Resource Efficiency',
    accent: 'cyan',
    icon: 'FileCode'
  },
  {
    title: 'Rendimiento de Renderizado & Cero Jank',
    metric: '60 FPS',
    subtitle: 'Aceleración GPU Pura (CLS = 0)',
    description: 'Física de resortes calibrada y transformaciones calculadas estrictamente sobre la GPU sin provocar recalculo de geometrías de layout.',
    badge: 'UI Polish',
    accent: 'emerald',
    icon: 'Gauge'
  }
];

export const QualityMetricsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="h-4 w-4 text-cyan-400" />;
      case 'Server': return <Server className="h-4 w-4 text-emerald-400" />;
      case 'Lock': return <Lock className="h-4 w-4 text-violet-400" />;
      case 'ShieldCheck': return <ShieldCheck className="h-4 w-4 text-amber-400" />;
      case 'FileCode': return <FileCode className="h-4 w-4 text-cyan-400" />;
      default: return <Gauge className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <section id="fiabilidad" className="relative w-full py-20 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Garantías de Fiabilidad & Benchmarks</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Métricas de Calidad & Resiliencia
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400">
          Cifras comprobadas, pruebas de carga y compromisos de arquitectura medibles en sistemas de producción.
        </p>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUALITY_METRICS.map((qm, idx) => (
          <BentoCard
            key={idx}
            spotlightColor={
              qm.accent === 'cyan' ? 'rgba(6, 182, 212, 0.12)' :
              qm.accent === 'emerald' ? 'rgba(16, 185, 129, 0.12)' :
              qm.accent === 'violet' ? 'rgba(139, 92, 246, 0.12)' :
              'rgba(245, 158, 11, 0.12)'
            }
            className="flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant={qm.accent} pulse>
                  {qm.badge}
                </Badge>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  {getIcon(qm.icon)}
                </div>
              </div>

              {/* Big Metric Number */}
              <div className="my-2">
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {qm.metric}
                </div>
                <div className="font-mono text-xs font-semibold text-cyan-300/90 mt-0.5">
                  {qm.subtitle}
                </div>
              </div>

              <h3 className="font-display text-base font-bold text-white mt-3 mb-1.5">
                {qm.title}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {qm.description}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-zinc-500 border-t border-white/5 pt-3">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>Verificado mediante suites de testing automatizado</span>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
};
