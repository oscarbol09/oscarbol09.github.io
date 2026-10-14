import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, GitBranch, Cpu, Database, Zap, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

type ArchitectureSystem = 'branchbase' | 'jvm-mcp' | 'a2a-hub';

interface SystemConfig {
  id: ArchitectureSystem;
  title: string;
  badge: string;
  badgeColor: 'lime' | 'violet' | 'emerald' | 'cyan';
  headline: string;
  subheadline: string;
  description: string;
  invariants: { title: string; desc: string; icon: React.ReactNode }[];
  metrics: { label: string; value: string }[];
  steps: { label: string; detail: string; accentColor: string }[];
  diagramCode: string;
}

const SYSTEMS: Record<ArchitectureSystem, SystemConfig> = {
  branchbase: {
    id: 'branchbase',
    title: 'Branchbase (Go TCP Proxy)',
    badge: 'Go 1.22+ · TCP Wire Proxy',
    badgeColor: 'lime',
    headline: 'Enrutamiento Transparente por Rama de Git',
    subheadline: 'Zero Schema Drift · Copy-on-Write Databases',
    description: 'Cuando cambias de rama en Git (git checkout feat/auth), tu aplicación sigue conectada a localhost:5432. El proxy intercepta los paquetes de handshake, inspecciona el HEAD de Git y redirige el tráfico a la base de datos clonada de esa característica sin mutar paquetes.',
    invariants: [
      {
        title: 'Clonado Rápido PostgreSQL',
        desc: 'Uso de CREATE DATABASE WITH TEMPLATE para réplicas instantáneas en < 240ms.',
        icon: <Zap className="h-4 w-4 text-[#dfff52]" />
      },
      {
        title: 'Conexiones de Control Aisladas',
        desc: 'Pool administrativo independiente para evitar locks durante la replicación transaccional.',
        icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />
      },
      {
        title: 'Zero Packet Mutation',
        desc: 'Inspección de wire protocol en fase de handshake; una vez establecida la sesión, el socket hace splice directo a velocidad nativa.',
        icon: <Database className="h-4 w-4 text-[#dfff52]" />
      }
    ],
    metrics: [
      { label: 'Latencia Proxy', value: '< 0.8ms' },
      { label: 'Tiempo Clonado DB', value: '< 240ms' },
      { label: 'Motores Soportados', value: 'PG / MySQL / SQLite' }
    ],
    steps: [
      { label: '1. App Cliente', detail: 'Conecta a localhost:5432 como si fuera una base normal.', accentColor: 'text-[#dfff52]' },
      { label: '2. Branchbase Proxy', detail: 'Lee .git/HEAD en memoria y detecta la rama activa.', accentColor: 'text-white' },
      { label: '3. DB Multiplexer', detail: 'Conmuta el socket TCP a la base de datos de esa rama.', accentColor: 'text-emerald-400' }
    ],
    diagramCode: `[ App Client (localhost:5432) ]
               │ (Standard TCP Handshake)
               ▼
   [ Branchbase TCP Proxy (Go 1.22+) ] ── Reads .git/HEAD
               │
    ┌──────────┴──────────┐
    ▼                     ▼
[ db_main ]        [ db_feat_auth_v2 ]
(Git: main)        (Git: feat/auth-v2)`
  },
  'jvm-mcp': {
    id: 'jvm-mcp',
    title: 'JVM-MCP (GraalVM Native Daemon)',
    badge: 'Java 21 · GraalVM Native · MCP',
    badgeColor: 'violet',
    headline: 'Diagnóstico Runtime de la JVM para Modelos de IA',
    subheadline: 'Zero-Intrusion · Attach API · Deadlock Scanner',
    description: 'Servidor Model Context Protocol nativo en Java 21 compilado con GraalVM Native Image. Se conecta a cualquier proceso JVM local mediante JDK Attach API sin necesidad de agentes previos (-javaagent) ni reinicios de servidor, exponiendo diagnósticos en tiempo real a Cursor y Claude Desktop.',
    invariants: [
      {
        title: 'Conexión Zero-Intrusión',
        desc: 'Uso de VirtualMachine.attach(pid) y VirtualMachine.loadAgentLibrary para inyectar diagnósticos en caliente.',
        icon: <Zap className="h-4 w-4 text-violet-400" />
      },
      {
        title: 'Escaneo Cíclico de Deadlocks',
        desc: 'Inspección de ThreadMXBean.findDeadlockedThreads() con grafo de dependencias de hilos y bloqueos monitoreados.',
        icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />
      },
      {
        title: 'Auditoría de Connection Pools',
        desc: 'Mapeo de métricas activas/idle de HikariCP y Tomcat JDBC con detección de fugas de conexión (leaks).',
        icon: <Cpu className="h-4 w-4 text-[#dfff52]" />
      }
    ],
    metrics: [
      { label: 'Tiempo de Arranque', value: '14.2ms' },
      { label: 'Consumo de Memoria', value: '22.4 MB RSS' },
      { label: 'Protocolo', value: 'MCP (JSON-RPC stdio)' }
    ],
    steps: [
      { label: '1. IDE / Asistente IA', detail: 'Cursor o Claude Desktop envía solicitud MCP stdio.', accentColor: 'text-violet-400' },
      { label: '2. jvm-mcp Daemon', detail: 'Binario GraalVM ejecuta Attach API sobre el PID objetivo.', accentColor: 'text-white' },
      { label: '3. Extracción de MBeans', detail: 'Recupera telemetría de GC, Heap y Deadlocks en < 15ms.', accentColor: 'text-emerald-400' }
    ],
    diagramCode: `[ Cursor / Claude Desktop ]
               │ (stdio JSON-RPC)
               ▼
   [ jvm-mcp (GraalVM Native Binary) ]
               │ (JDK Attach API - Zero Restart)
               ▼
   [ JVM Proceso Objetivo (Spring Boot) ]
    ├─ ThreadMXBean (Deadlocks: 0)
    ├─ HikariCP Pool (Active: 10/10)
    └─ MemoryPoolMXBean (Heap: 128MB)`
  },
  'a2a-hub': {
    id: 'a2a-hub',
    title: 'A2A-Hub (Multi-Agent Vector Broker)',
    badge: 'Java 21 Loom · Spring Boot · pgvector',
    badgeColor: 'emerald',
    headline: 'Orquestación Descentralizada de Agentes de IA',
    subheadline: 'Virtual Threads · HNSW Semantic Discovery · P2P',
    description: 'Broker y catálogo descentralizado basado en el protocolo Agent2Agent (A2A). Permite a agentes autónomos registrar sus capacidades en un índice vectorial pgvector HNSW y descubrir pares colaborativos mediante embeddings en tiempo real, soportando alta concurrencia gracias a los Virtual Threads de Java 21.',
    invariants: [
      {
        title: 'Concurrencia con Virtual Threads',
        desc: 'Project Loom permite sostener miles de sesiones de agentes concurrentes sin degradar la memoria del hilo OS.',
        icon: <Zap className="h-4 w-4 text-emerald-400" />
      },
      {
        title: 'Búsqueda Semántica HNSW',
        desc: 'Consultas de similitud de coseno en sub-20ms sobre pgvector para emparejar tareas con habilidades de agentes.',
        icon: <Database className="h-4 w-4 text-[#dfff52]" />
      },
      {
        title: 'Verificación Criptográfica A2A',
        desc: 'Validación de firmas y esquemas JSON-RPC para evitar ataques de inyección y aislamiento anti-SSRF.',
        icon: <ShieldCheck className="h-4 w-4 text-violet-400" />
      }
    ],
    metrics: [
      { label: 'Hilos Concurrentes', value: '10,000+ Loom' },
      { label: 'Descubrimiento Semántico', value: '< 18ms' },
      { label: 'Estándar', value: 'Open A2A Protocol' }
    ],
    steps: [
      { label: '1. Agente emisor', detail: 'Envía requerimiento de tarea en lenguaje natural o contrato.', accentColor: 'text-emerald-400' },
      { label: '2. A2A Vector Broker', detail: 'Genera embedding y consulta pgvector HNSW en < 18ms.', accentColor: 'text-white' },
      { label: '3. Peer Routing', detail: 'Establece canal directo P2P con el agente más calificado.', accentColor: 'text-[#dfff52]' }
    ],
    diagramCode: `[ Agente Emisor (Planner / Task Owner) ]
               │ (A2A Task Request)
               ▼
     [ A2A-Hub Broker (Java 21 Loom) ]
               │ (pgvector HNSW Embedding Match)
               ▼
   [ Agente Especialista Seleccionado ]
    ├─ Valida capacidades criptográficas
    ├─ Ejecuta subtarea distribuida
    └─ Retorna resultado mediante SSE Stream`
  }
};

export const ArchitectureExplorerSection: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState<ArchitectureSystem>('branchbase');
  const { playTabSwitch } = useSoundEffects();

  const handleSelectSystem = (system: ArchitectureSystem) => {
    playTabSwitch();
    setActiveSystem(system);
  };

  const current = SYSTEMS[activeSystem];

  return (
    <section id="arquitectura" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-white/10">
      {/* Editorial Section Header */}
      <div className="flex flex-col items-start gap-3 mb-12">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold text-[#dfff52]">03</span>
          <span className="h-px w-8 bg-[#dfff52]/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Deep-Dive de Arquitectura &amp; Concurrencia
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f2efe8]">
          Ingeniería de Sistemas &amp; Tríada Insignia
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
          Inspección de las arquitecturas de red, proxies de bases de datos y orquestación de agentes que impulsan mis desarrollos más complejos.
        </p>

        {/* System Tab Selector */}
        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-[#0b0c10] p-1.5">
          <button
            onClick={() => handleSelectSystem('branchbase')}
            className={`relative rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all ${
              activeSystem === 'branchbase' ? 'text-[#060709] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {activeSystem === 'branchbase' && (
              <motion.div
                layoutId="active-system-pill"
                className="absolute inset-0 rounded-full bg-[#dfff52]"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <GitBranch className="h-3.5 w-3.5" />
              Branchbase (Go TCP Proxy)
            </span>
          </button>

          <button
            onClick={() => handleSelectSystem('jvm-mcp')}
            className={`relative rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all ${
              activeSystem === 'jvm-mcp' ? 'text-[#060709] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {activeSystem === 'jvm-mcp' && (
              <motion.div
                layoutId="active-system-pill"
                className="absolute inset-0 rounded-full bg-[#dfff52]"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5" />
              JVM-MCP (GraalVM Native)
            </span>
          </button>

          <button
            onClick={() => handleSelectSystem('a2a-hub')}
            className={`relative rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all ${
              activeSystem === 'a2a-hub' ? 'text-[#060709] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {activeSystem === 'a2a-hub' && (
              <motion.div
                layoutId="active-system-pill"
                className="absolute inset-0 rounded-full bg-[#dfff52]"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Network className="h-3.5 w-3.5" />
              A2A-Hub (Multi-Agent Mesh)
            </span>
          </button>
        </div>
      </div>

      {/* Main Architecture Panel */}
      <AnimatePresence>
        <motion.div
          key={activeSystem}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          <div className="rounded-2xl border border-white/10 bg-[#0b0c10] p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Technical Narrative & Invariants */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={current.badgeColor} pulse>
                      {current.badge}
                    </Badge>
                    <span className="font-mono text-xs text-zinc-400">
                      {current.subheadline}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f2efe8] tracking-tight">
                    {current.headline}
                  </h3>

                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed font-sans">
                    {current.description}
                  </p>
                </div>

                {/* Engineering Invariants List */}
                <div className="space-y-3.5 border-t border-white/10 pt-5">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Invariantes de Arquitectura &amp; Resiliencia:
                  </div>
                  {current.invariants.map((inv, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 rounded-lg bg-white/5 p-1.5 border border-white/10">
                        {inv.icon}
                      </div>
                      <div>
                        <h4 className="font-mono text-xs font-bold text-white">
                          {inv.title}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                          {inv.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                  {current.metrics.map((m, idx) => (
                    <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                      <div className="font-mono text-xs sm:text-sm font-bold text-[#dfff52]">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Flow & Topology Diagram */}
              <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-white/10 bg-[#060709] p-5 sm:p-6 font-mono text-xs overflow-x-auto">
                <div>
                  <div className="flex items-center justify-between text-zinc-400 border-b border-white/10 pb-3 mb-4">
                    <span className="uppercase tracking-wider font-semibold text-xs text-zinc-300">
                      Diagrama de Topología &amp; Tráfico
                    </span>
                    <span className="text-[#dfff52] font-bold text-[11px] bg-[#dfff52]/10 px-2 py-0.5 rounded border border-[#dfff52]/20">
                      VERIFICADO 100%
                    </span>
                  </div>

                  {/* Flow Steps */}
                  <div className="space-y-2 mb-6">
                    {current.steps.map((st, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-[#0b0c10] p-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#dfff52] mt-0.5" />
                        <div>
                          <span className={`font-bold ${st.accentColor}`}>{st.label}:</span>{' '}
                          <span className="text-zinc-300">{st.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ASCII Topology Diagram */}
                  <div className="rounded-lg border border-white/10 bg-[#090a0e] p-4 text-[#dfff52] whitespace-pre font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner">
                    {current.diagramCode}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-zinc-500 text-[11px]">
                  <span>Arquitectura de código abierto</span>
                  <a
                    href="https://github.com/oscarbol09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#dfff52] hover:underline transition-colors"
                  >
                    <span>Ver implementación en GitHub</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
