import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Network, GitBranch, ShieldCheck, Zap, Radio } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const ArchitectureShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'branchbase' | 'edurag'>('branchbase');
  const { playTabSwitch } = useSoundEffects();

  const handleTabChange = (tab: 'branchbase' | 'edurag') => {
    playTabSwitch();
    setActiveTab(tab);
  };

  return (
    <section id="arquitectura" className="relative w-full py-20 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-10">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <Network className="h-4 w-4" />
          <span>Deep-Dive de Arquitectura</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Ingeniería de Sistemas & Concurrencia
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400">
          Explora la topología interna, enrutamiento de red y estrategias de almacenamiento detrás de mis soluciones más complejas.
        </p>

        {/* Tab Toggle */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#07070a] p-1.5 backdrop-blur-xl">
          <button
            onClick={() => handleTabChange('branchbase')}
            className={`relative rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${
              activeTab === 'branchbase' ? 'text-cyan-300' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {activeTab === 'branchbase' && (
              <motion.div
                layoutId="active-arch-pill"
                className="absolute inset-0 rounded-xl bg-cyan-500/15 border border-cyan-500/30"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <GitBranch className="h-3.5 w-3.5" />
              Branchbase (Go TCP Proxy)
            </span>
          </button>

          <button
            onClick={() => handleTabChange('edurag')}
            className={`relative rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${
              activeTab === 'edurag' ? 'text-violet-300' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {activeTab === 'edurag' && (
              <motion.div
                layoutId="active-arch-pill"
                className="absolute inset-0 rounded-xl bg-violet-500/15 border border-violet-500/30"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Radio className="h-3.5 w-3.5" />
              EduRag (SSE Streaming SaaS)
            </span>
          </button>
        </div>
      </div>

      {/* Architecture Showcase Panels */}
      {activeTab === 'branchbase' ? (
        <BentoCard className="border-cyan-500/20 bg-[#07070a]/90 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="cyan" pulse>Proxy TCP en Go 1.22+</Badge>
                  <span className="font-mono text-xs text-zinc-400">Zero Data Drift</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Enrutamiento Transparente por Rama de Git
                </h3>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  Cuando cambias de rama en Git (<code className="font-mono text-cyan-300">git checkout feat/auth</code>), tu aplicación sigue conectada a <code className="font-mono text-zinc-200">localhost:5432</code>. El proxy intercepta los paquetes de handshake, inspecciona el HEAD de Git y redirige el tráfico a la base de datos clonada de esa característica.
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 shrink-0 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white">Clonado Rápido PostgreSQL</h4>
                    <p className="text-xs text-zinc-400">Uso de <code className="text-cyan-300">CREATE DATABASE WITH TEMPLATE</code> para réplicas instantáneas en &lt; 250ms.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-1" />
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white">Conexiones de Control Aisladas</h4>
                    <p className="text-xs text-zinc-400">Pool de mantenimiento administrativo independiente para evitar locks durante la replicación.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Diagram Visual Box */}
            <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#040406] p-6 font-mono text-xs text-cyan-300/90 overflow-x-auto flex flex-col justify-center">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-zinc-500 border-b border-white/10 pb-2">
                  <span>FLUJO DE CONEXIÓN DE RED (TCP PROTOCOL)</span>
                  <span className="text-emerald-400 font-bold">LATENCIA &lt; 1.2ms</span>
                </div>

                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-zinc-200">
                  <span className="text-cyan-400 font-bold">[1] Tu Aplicación</span> ➔ Conexión estándar TCP a <span className="text-white font-bold">localhost:5432</span>
                </div>

                <div className="flex justify-center my-1 text-cyan-400">
                  <span>│ (Proxy Interceptor en Go)</span>
                </div>

                <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/30 text-cyan-200">
                  <span className="text-white font-bold">[2] Branchbase Proxy Daemon</span>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    • Lee <code className="text-cyan-300">.git/HEAD</code> o <code className="text-cyan-300">worktree commondir</code><br/>
                    • Detecta rama activa: <span className="text-emerald-400">refs/heads/feature/payments</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-[11px]">
                    <div className="text-zinc-400 font-bold">Rama 'main'</div>
                    <div className="text-zinc-500 mt-1">DB: db_main (Inalterada)</div>
                  </div>
                  <div className="rounded-lg border border-cyan-500/40 bg-cyan-500/15 p-3 text-[11px] text-cyan-300">
                    <div className="font-bold">Rama 'feature/payments'</div>
                    <div className="text-cyan-200 mt-1">DB: db_feature_payments (Clonada)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>
      ) : (
        <BentoCard className="border-violet-500/20 bg-[#07070a]/90 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="violet" pulse>Next.js 16 + React 19</Badge>
                  <span className="font-mono text-xs text-zinc-400">SaaS Multi-Tenant</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  RAG Léxico con Streaming SSE & STEM LaTeX
                </h3>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  EduRag ingesta documentos curriculares (PDF/DOCX/MD) y construye un ranking léxico en PostgreSQL sin requerir bases de datos vectoriales de pago. Los estudiantes interactúan con streaming SSE en tiempo real y renderizado matemático directo.
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-violet-400 mt-1" />
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white">Aislamiento RLS en Supabase</h4>
                    <p className="text-xs text-zinc-400">Validación estricta de tenant por cada consulta SQL con cifrado Fernet AES-128 para API keys BYOK.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 shrink-0 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white">Costo Operativo de $0/mes</h4>
                    <p className="text-xs text-zinc-400">Arquitectura eficiente que maximiza tiers gratuitos y modelos de código abierto en OpenRouter.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Diagram Visual Box */}
            <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#040406] p-6 font-mono text-xs text-violet-300/90 overflow-x-auto flex flex-col justify-center">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-zinc-500 border-b border-white/10 pb-2">
                  <span>PIPELINE RAG MULTI-TENANT</span>
                  <span className="text-emerald-400 font-bold">BYOK ARCHITECTURE</span>
                </div>

                <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-zinc-200">
                  <span className="text-violet-400 font-bold">[1] Ingesta Docente:</span> PDF/DOCX ➔ Chunking léxico (1500 chars + 200 overlap)
                </div>

                <div className="flex justify-center my-1 text-violet-400">
                  <span>│</span>
                </div>

                <div className="bg-violet-500/10 p-3 rounded-lg border border-violet-500/30 text-violet-200">
                  <span className="text-white font-bold">[2] Context Builder & Supabase RLS</span>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    • Filtra fragmentos por <code className="text-violet-300">chatbot_id</code> y ranking de solapamiento<br/>
                    • Control de presupuesto de contexto (límite 60k chars)
                  </div>
                </div>

                <div className="flex justify-center my-1 text-violet-400">
                  <span>│ (SSE Stream)</span>
                </div>

                <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30 text-emerald-200">
                  <span className="font-bold">[3] Interfaz Estudiante React 19:</span>
                  <div className="text-[11px] text-zinc-300 mt-1">
                    • Decodificación token a token<br/>
                    • Renderizado de KaTeX inline <code className="text-cyan-300">\(\int x dx\)</code> y citas verificadas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>
      )}
    </section>
  );
};
