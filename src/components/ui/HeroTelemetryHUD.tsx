import React, { useState } from 'react';
import { Cpu, Database, Network, Copy, Check, Terminal } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

/**
 * HeroTelemetryHUD
 * High-craft editorial workbench widget showcasing real-time systems telemetry.
 * Styled in architectural obsidian with signature lime accents.
 */
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
    <div className="relative flex flex-col w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b0c10] p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-[#dfff52]/40">
      {/* Header Window Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#dfff52]">
            Systems Runtime Active
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
            ENV: PROD · UTC-5
          </span>
          <div className="flex items-center gap-1.5 pl-1">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-amber-500/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
          </div>
        </div>
      </div>

      {/* Telemetry Metric Cards */}
      <div className="space-y-2.5">
        {/* Branchbase Telemetry */}
        <div className="group flex items-center justify-between rounded-xl border border-white/5 bg-[#111218] p-3 transition-colors hover:border-[#dfff52]/30 hover:bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#dfff52]/10 text-[#dfff52]">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-[#f2efe8]">
                Branchbase TCP Proxy
              </div>
              <div className="text-[10px] text-zinc-400">
                Wire protocol :5432 ➔ .git/HEAD
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs font-bold text-[#dfff52]">&lt; 0.8ms</div>
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Latencia</div>
          </div>
        </div>

        {/* JVM-MCP Telemetry */}
        <div className="group flex items-center justify-between rounded-xl border border-white/5 bg-[#111218] p-3 transition-colors hover:border-violet-400/30 hover:bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-[#f2efe8]">
                JVM-MCP GraalVM Daemon
              </div>
              <div className="text-[10px] text-zinc-400">
                Attach API · 0 Deadlocks
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs font-bold text-violet-300">14.2ms</div>
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Startup</div>
          </div>
        </div>

        {/* A2A-Hub Telemetry */}
        <div className="group flex items-center justify-between rounded-xl border border-white/5 bg-[#111218] p-3 transition-colors hover:border-emerald-400/30 hover:bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Network className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-[#f2efe8]">
                A2A-Hub Agent Mesh
              </div>
              <div className="text-[10px] text-zinc-400">
                Loom Threads + pgvector HNSW
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs font-bold text-emerald-400">99.98%</div>
            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Confiabilidad</div>
          </div>
        </div>
      </div>

      {/* Quick Install Interactive Command Terminal */}
      <div className="mt-4 pt-3.5 border-t border-white/10">
        <div className="flex items-center justify-between gap-2 rounded-xl bg-[#060709] px-3.5 py-2.5 border border-white/10">
          <div className="flex items-center gap-2 overflow-hidden">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-[#dfff52]" />
            <code className="font-mono text-[11px] text-zinc-300 truncate">
              {installCmd}
            </code>
          </div>
          <button
            onClick={handleCopyInstall}
            className="flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1 font-mono text-[10px] text-zinc-200 transition-colors hover:bg-[#dfff52] hover:text-[#060709] shrink-0"
            title="Copiar comando de instalación"
            aria-label="Copiar comando de instalación"
          >
            {copiedCmd ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
