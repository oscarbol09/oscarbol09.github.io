import React, { useState } from 'react';
import { Cpu, Database, Network, Copy, Check, Terminal } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const HeroTelemetryHUD: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const { playSuccess } = useSoundEffects();

  const installCmd = 'go install github.com/oscarbol09/branchbase/cmd/branchbase@latest';

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopiedCmd(true);
      playSuccess();
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch (err) {
      console.warn('[HeroTelemetryHUD] Clipboard copy failed:', err);
    }
  };

  return (
    <div className="relative flex flex-col w-full max-w-md rounded-2xl border border-white/10 bg-[#0c0c12]/85 p-5 sm:p-6 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-500/30">
      {/* Subtle Radial Glow */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Header Status Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
            Systems Runtime Active
          </span>
        </div>
        <span className="font-mono text-[10px] text-zinc-500">
          ENV: PROD · UTC-5
        </span>
      </div>

      {/* Telemetry Metric Cards */}
      <div className="relative z-10 space-y-2.5">
        {/* Branchbase Telemetry */}
        <div className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-cyan-500/25 hover:bg-cyan-500/[0.03]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <Database className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-zinc-200">
                Branchbase TCP Proxy
              </div>
              <div className="text-[10px] text-zinc-400">
                Wire protocol :5432 ➔ .git/HEAD
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs font-bold text-cyan-400">&lt; 0.8ms</div>
            <div className="text-[9px] uppercase tracking-wider text-zinc-500">Latencia</div>
          </div>
        </div>

        {/* JVM-MCP Telemetry */}
        <div className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-violet-500/25 hover:bg-violet-500/[0.03]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
              <Cpu className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-zinc-200">
                JVM-MCP GraalVM Daemon
              </div>
              <div className="text-[10px] text-zinc-400">
                Attach API · 0 Deadlocks
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs font-bold text-violet-400">14.2ms</div>
            <div className="text-[9px] uppercase tracking-wider text-zinc-500">Startup</div>
          </div>
        </div>

        {/* A2A-Hub Telemetry */}
        <div className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-emerald-500/25 hover:bg-emerald-500/[0.03]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Network className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-zinc-200">
                A2A-Hub Agent Mesh
              </div>
              <div className="text-[10px] text-zinc-400">
                Loom Threads + pgvector HNSW
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs font-bold text-emerald-400">&lt; 18ms</div>
            <div className="text-[9px] uppercase tracking-wider text-zinc-500">Semantic Rerank</div>
          </div>
        </div>
      </div>

      {/* Quick Interactive Command Bar */}
      <div className="relative z-10 mt-4 rounded-xl border border-white/10 bg-[#07070b] p-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-hidden font-mono text-[11px] text-zinc-400">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
            <span className="truncate text-zinc-300">go install branchbase@latest</span>
          </div>
          <button
            onClick={handleCopyInstall}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-400 transition-all hover:border-cyan-400/40 hover:text-cyan-300 active:scale-95"
            title="Copiar comando de instalación"
            aria-label="Copiar comando de instalación"
          >
            {copiedCmd ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
