import React, { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Sparkles, Trash2 } from 'lucide-react';
import { TERMINAL_COMMANDS, INITIAL_TERMINAL_HISTORY, TerminalOutput } from '../../data/terminalCommands';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const QUICK_COMMANDS = ['help', 'projects', 'branchbase', 'jvm-mcp', 'a2a', 'opensource', 'benchmarks', 'skills', 'contact', 'clear'];

export const TerminalSection: React.FC = () => {
  const [history, setHistory] = useState<TerminalOutput[]>(INITIAL_TERMINAL_HISTORY);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1);
  const [pastInputs, setPastInputs] = useState<string[]>([]);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const lastAudioKeyRef = useRef<number>(0);

  const { playTerminalKey, playSuccess, playClick } = useSoundEffects();

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    playSuccess();
    setPastInputs(prev => [trimmed, ...prev.filter(p => p !== trimmed).slice(0, 49)]);
    setCmdHistoryIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    // Mitigación estricta de Prototype Pollution DoS: valida pertenencia propia
    const commandEntry = Object.hasOwn(TERMINAL_COMMANDS, trimmed)
      ? TERMINAL_COMMANDS[trimmed]
      : undefined;

    let outputResult: string | string[];
    let isError = false;

    if (commandEntry) {
      if (typeof commandEntry === 'function') {
        outputResult = commandEntry([]);
      } else {
        outputResult = commandEntry;
      }
    } else {
      isError = true;
      outputResult = `Comando no reconocido: "${trimmed}". Escribe "help" para ver los comandos disponibles.`;
    }

    // Mantener buffer acotado a los últimos 50 registros para prevenir agotamiento de memoria
    setHistory(prev => [
      ...prev.slice(-49),
      {
        command: trimmed,
        output: outputResult,
        isError,
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const now = performance.now();
    if (now - lastAudioKeyRef.current > 60) {
      playTerminalKey();
      lastAudioKeyRef.current = now;
    }

    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastInputs.length > 0) {
        const nextIndex = Math.min(cmdHistoryIndex + 1, pastInputs.length - 1);
        setCmdHistoryIndex(nextIndex);
        setInputVal(pastInputs[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistoryIndex > 0) {
        const prevIndex = cmdHistoryIndex - 1;
        setCmdHistoryIndex(prevIndex);
        setInputVal(pastInputs[prevIndex]);
      } else if (cmdHistoryIndex === 0) {
        setCmdHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const handleQuickCmdClick = (cmd: string) => {
    playClick();
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <section id="terminal" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-white/10">
      {/* Editorial Section Header */}
      <div className="flex flex-col items-start gap-3 mb-12">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold text-[#dfff52]">05</span>
          <span className="h-px w-8 bg-[#dfff52]/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Systems Diagnostic Terminal / Interactive CLI
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f2efe8]">
          Inspección Interactiva de Sistemas
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
          Ejecuta comandos en tiempo real para simular proxies TCP, consultar topologías de datos o inspeccionar diagnósticos de runtime de la JVM.
        </p>
      </div>

      {/* Terminal Window Box */}
      <div className="relative rounded-2xl border border-white/10 bg-[#090a0e] shadow-2xl overflow-hidden">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#060709] px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 border border-red-400/40" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
            <span className="ml-3 font-mono text-xs text-zinc-400 font-medium">
              oscar@madera-systems:~ (zsh · go1.22 · java21)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setHistory([]);
              }}
              title="Limpiar terminal"
              aria-label="Limpiar terminal"
              className="flex h-6 w-6 items-center justify-center rounded text-zinc-400 hover:bg-white/10 hover:text-[#dfff52] transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Click Commands Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 bg-[#0b0c10] px-4 py-2.5 text-xs font-mono">
          <span className="text-zinc-400 select-none flex items-center gap-1.5 mr-1">
            <Sparkles className="h-3.5 w-3.5 text-[#dfff52]" />
            <span>Sugerencias:</span>
          </span>
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleQuickCmdClick(cmd)}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300 transition-all hover:border-[#dfff52]/50 hover:bg-[#dfff52]/10 hover:text-[#dfff52] active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen / Logs Output */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="min-h-[320px] max-h-[480px] overflow-y-auto p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed text-zinc-300 space-y-4 cursor-text bg-[#060709]"
        >
          {history.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-[#dfff52] font-bold">oscar@portfolio</span>
                <span className="text-zinc-600">:</span>
                <span className="text-zinc-400">~</span>
                <span className="text-[#dfff52]">$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>

              <div className={`pl-4 border-l-2 ${item.isError ? 'border-red-500/50 text-red-300' : 'border-[#dfff52]/40 text-zinc-300'}`}>
                {Array.isArray(item.output) ? (
                  item.output.map((line, lIdx) => (
                    <div key={lIdx} className="whitespace-pre-wrap font-mono">
                      {line}
                    </div>
                  ))
                ) : (
                  <div className="whitespace-pre-wrap font-mono">{item.output}</div>
                )}
              </div>
            </div>
          ))}

          {/* Interactive Input Prompt Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[#dfff52] font-bold">oscar@portfolio</span>
            <span className="text-zinc-600">:</span>
            <span className="text-zinc-400">~</span>
            <span className="text-[#dfff52]">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Escribe "help" o haz clic en los comandos sugeridos...'
              maxLength={120}
              className="flex-1 bg-transparent text-white placeholder:text-zinc-600 outline-none font-mono text-xs sm:text-sm caret-[#dfff52]"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              aria-label="Ejecutar comando"
              className="text-zinc-400 hover:text-[#dfff52] transition-colors p-1"
            >
              <CornerDownLeft className="h-3.5 w-3.5" />
            </button>
          </div>

          <div ref={terminalBottomRef} />
        </div>
      </div>
    </section>
  );
};
