import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Trash2 } from 'lucide-react';
import { TERMINAL_COMMANDS, INITIAL_TERMINAL_HISTORY, TerminalOutput } from '../../data/terminalCommands';
import { useSoundEffects } from '../../hooks/useSoundEffects';

const QUICK_COMMANDS = ['help', 'projects', 'run branchbase', 'run edurag', 'skills', 'standards', 'contact'];

export const TerminalSection: React.FC = () => {
  const [history, setHistory] = useState<TerminalOutput[]>(INITIAL_TERMINAL_HISTORY);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1);
  const [pastInputs, setPastInputs] = useState<string[]>([]);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { playTerminalKey, playSuccess, playClick } = useSoundEffects();

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    playSuccess();
    setPastInputs(prev => [trimmed, ...prev]);
    setCmdHistoryIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const commandEntry = TERMINAL_COMMANDS[trimmed];

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

    setHistory(prev => [
      ...prev,
      {
        command: trimmed,
        output: outputResult,
        isError,
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playTerminalKey();

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
    <section id="terminal" className="relative w-full py-20 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <TerminalIcon className="h-4 w-4" />
          <span>Vibecoder Terminal Playground</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Inspección Interactiva de Sistemas
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-zinc-400">
          Ejecuta comandos en tiempo real para simular proxies, consultar pipelines de datos o inspeccionar la arquitectura de repositorios.
        </p>
      </div>

      {/* Terminal Window Box */}
      <div className="relative rounded-2xl border border-white/15 bg-[#07070a]/95 shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0d0d14]/80 px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 border border-red-400/40" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
            <span className="ml-3 font-mono text-xs text-zinc-400 font-medium">
              oscar@madera-terminal:~ (zsh / go1.22)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setHistory([]);
              }}
              title="Limpiar terminal"
              className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 hover:bg-white/10 hover:text-zinc-300 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Click Commands Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 bg-[#090910] px-4 py-2 text-xs font-mono">
          <span className="text-zinc-500 select-none flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            Sugerencias:
          </span>
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleQuickCmdClick(cmd)}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-zinc-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen / Logs Output */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="min-h-[300px] max-h-[460px] overflow-y-auto p-5 font-mono text-xs sm:text-sm leading-relaxed text-zinc-300 space-y-4 cursor-text"
        >
          {history.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-emerald-400 font-bold">oscar@portfolio</span>
                <span className="text-zinc-500">:</span>
                <span className="text-violet-400">~</span>
                <span className="text-zinc-400">$</span>
                <span className="text-zinc-100 font-semibold">{item.command}</span>
              </div>

              <div className={`pl-4 border-l-2 ${item.isError ? 'border-red-500/50 text-red-300' : 'border-cyan-500/30 text-zinc-300'}`}>
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
          <div className="flex items-center gap-2 pt-1 text-cyan-400">
            <span className="text-emerald-400 font-bold">oscar@portfolio</span>
            <span className="text-zinc-500">:</span>
            <span className="text-violet-400">~</span>
            <span className="text-zinc-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Escribe "help" o haz clic en los comandos sugeridos...'
              className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none font-mono text-xs sm:text-sm caret-cyan-400"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              aria-label="Ejecutar comando"
              className="text-zinc-500 hover:text-cyan-400 transition-colors p-1"
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
