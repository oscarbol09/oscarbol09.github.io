import React, { useState } from 'react';
import { Copy, Check, Send, MessageSquare, Clock, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon } from '../ui/GithubIcon';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const ContactSection: React.FC = () => {
  const { playSuccess } = useSoundEffects();
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const email = 'omaderabolano@correo.unicordoba.edu.co';

  const handleCopyEmail = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    playSuccess();

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981'],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();

    const mailSubject = encodeURIComponent(subject || `Contacto de ${name || 'Ingeniería'}`);
    const mailBody = encodeURIComponent(`Hola Oscar,\n\n${message}\n\nAtentamente,\n${name}`);
    window.location.href = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section id="contacto" className="relative w-full py-20 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
          <MessageSquare className="h-4 w-4" />
          <span>Canales de Contacto Directo</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Iniciemos una Conversación
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400">
          ¿Interesado en colaborar en sistemas backend en Go, arquitecturas RAG o proyectos de ingeniería de software? Escríbeme directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Fast Access & Info */}
        <div className="lg:col-span-5 space-y-6">
          <BentoCard className="p-6">
            <div className="space-y-4">
              <Badge variant="emerald" pulse>Disponible para Nuevos Proyectos</Badge>

              <h3 className="font-display text-xl font-bold text-white">
                Correo Electrónico
              </h3>

              <div className="rounded-xl border border-white/10 bg-[#040406] p-4 font-mono text-xs text-zinc-300 break-all flex items-center justify-between gap-3">
                <span>{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-colors"
                  title="Copiar email"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {copied && (
                <p className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  ¡Copiado al portapapeles con éxito!
                </p>
              )}
            </div>

            <div className="mt-6 border-t border-white/5 pt-4 space-y-3">
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Tiempo de respuesta habitual: &lt; 24 horas</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                <MapPin className="h-4 w-4 text-violet-400 shrink-0" />
                <span>Zona Horaria: UTC-5 (Colombia) — Remoto Global</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                <GithubIcon className="h-4 w-4 text-white shrink-0" />
                <a
                  href="https://github.com/oscarbol09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:underline"
                >
                  github.com/oscarbol09
                </a>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Right Card: Message Composer Form */}
        <div className="lg:col-span-7">
          <BentoCard className="p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Enviar Mensaje Directo
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Completa el formulario para abrir tu cliente de correo con el asunto y contexto preconfigurados.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-zinc-400 mb-1.5">
                    Tu Nombre o Empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Andrés Gómez / Startup"
                    className="w-full rounded-xl border border-white/10 bg-[#040406] px-4 py-2.5 font-mono text-xs sm:text-sm text-white placeholder:text-zinc-600 outline-none focus:border-cyan-400/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-zinc-400 mb-1.5">
                    Asunto del Proyecto
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ej. Arquitectura RAG / Backend Go"
                    className="w-full rounded-xl border border-white/10 bg-[#040406] px-4 py-2.5 font-mono text-xs sm:text-sm text-white placeholder:text-zinc-600 outline-none focus:border-cyan-400/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-zinc-400 mb-1.5">
                  Detalles del Mensaje
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntame sobre el problema técnico, escala esperada o tecnologías involucradas..."
                  className="w-full rounded-xl border border-white/10 bg-[#040406] p-4 font-mono text-xs sm:text-sm text-white placeholder:text-zinc-600 outline-none focus:border-cyan-400/50 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-6 py-3 font-mono text-xs sm:text-sm font-semibold text-cyan-300 backdrop-blur-md transition-all hover:border-cyan-300 hover:bg-cyan-500/30 hover:shadow-glow-cyan active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  <span>Enviar Mensaje</span>
                </button>
              </div>
            </form>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};
