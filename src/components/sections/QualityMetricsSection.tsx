import React from 'react';
import { Gauge, ShieldCheck, Zap, Server, FileCode, Lock } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';

interface QualityMetric {
  title: string;
  metric: string;
  subtitle: string;
  description: string;
  badge: string;
  accent: 'lime' | 'emerald' | 'violet' | 'amber';
  icon: 'Zap' | 'ShieldCheck' | 'Server' | 'Lock' | 'Gauge' | 'FileCode';
}

const QUALITY_METRICS: QualityMetric[] = [
  {
    title: 'Clonado Ultra-Rápido de Bases de Datos',
    metric: '< 250ms',
    subtitle: 'Branchbase en PostgreSQL',
    description: 'Aprovecha CREATE DATABASE WITH TEMPLATE para instanciar réplicas de bases de datos completas en milisegundos sin congelar la aplicación.',
    badge: 'Database Benchmarks',
    accent: 'lime',
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
    title: 'Suites de Testing & Quality Gates',
    metric: '230+ Tests',
    subtitle: 'JUnit, Jest & Pytest Automatizados',
    description: 'Baterías de pruebas unitarias y de integración herméticas que validan casos límite, concurrencia y prevención estricta de regresiones en CI/CD.',
    badge: 'Testing & QA',
    accent: 'lime',
    icon: 'ShieldCheck'
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
    title: 'Latencia Inferencia Local LLM',
    metric: 'sub-800ms',
    subtitle: 'DeepSeek-R1 / Qwen 2.5 en Ollama',
    description: 'Configuración hermética de modelos locales cuantizados (GGUF Q4_K_M) que garantizan privacidad total y operación sin costos de API por token.',
    badge: 'Edge AI Performance',
    accent: 'lime',
    icon: 'Gauge'
  }
];

export const QualityMetricsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="h-4 w-4 text-[#dfff52]" />;
      case 'Server': return <Server className="h-4 w-4 text-emerald-400" />;
      case 'Lock': return <Lock className="h-4 w-4 text-violet-400" />;
      case 'ShieldCheck': return <ShieldCheck className="h-4 w-4 text-[#dfff52]" />;
      case 'Gauge': return <Gauge className="h-4 w-4 text-[#dfff52]" />;
      default: return <FileCode className="h-4 w-4 text-amber-400" />;
    }
  };

  return (
    <section id="fiabilidad" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-white/10">
      {/* Editorial Section Header */}
      <div className="flex flex-col items-start gap-3 mb-14">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold text-[#dfff52]">08</span>
          <span className="h-px w-8 bg-[#dfff52]/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Fiabilidad, Calidad &amp; Benchmarks
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f2efe8]">
          Garantías de Rendimiento &amp; Verificación
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
          Métricas auditables de throughput, latencia y robustez obtenidas en suites de prueba automatizadas y entornos reales de ejecución.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUALITY_METRICS.map((qm, idx) => (
          <BentoCard
            key={idx}
            spotlightColor="rgba(223, 255, 82, 0.12)"
            className="flex flex-col justify-between border-white/10 bg-[#0b0c10] p-6 sm:p-7 hover:border-[#dfff52]/40"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <Badge variant={qm.accent === 'lime' ? 'lime' : 'neutral'}>
                  {qm.badge}
                </Badge>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#060709]">
                  {getIcon(qm.icon)}
                </div>
              </div>

              <div className="mb-2">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-[#dfff52]">
                  {qm.metric}
                </span>
                <div className="font-mono text-xs text-zinc-400 mt-1">
                  {qm.subtitle}
                </div>
              </div>

              <h3 className="font-display text-base font-bold text-[#f2efe8] mt-3 mb-2">
                {qm.title}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {qm.description}
              </p>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
};
