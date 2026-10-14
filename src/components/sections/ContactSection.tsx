import React, { useState } from 'react';
import { Copy, Check, Send, MessageSquare, Clock, MapPin, AlertCircle } from 'lucide-react';
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
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});

  const email = 'dario.oviedo2022@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      playSuccess();
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('[ContactSection] Clipboard write failed:', err);
    }
  };

  const validateForm = (): boolean => {
    const errs: { name?: string; message?: string } = {};
    if (!name.trim()) {
      errs.name = 'Por favor ingresa tu nombre o el de tu empresa.';
    }
    if (!message.trim()) {
      errs.message = 'Por favor describe brevemente tu consulta o requerimiento.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400 font-sans">
          ¿Interesado en colaborar en sistemas backend en Go, arquitecturas de IA o proyectos de alta concurrencia? Escríbeme directamente.
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
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-300 active:scale-95"
                  title="Copiar email"
                  aria-label="Copiar correo al portapapeles"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {copied && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 font-mono text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>¡Email copiado al portapapeles!</span>
                </div>
              )}

              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Respondo habitualmente en menos de 24 horas. Abierto a posiciones de Staff/Senior Backend, arquitectura distribuida y colaboraciones de código abierto.
              </p>
            </div>
          </BentoCard>

          <BentoCard className="p-6">
            <div className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white">
                Coordenadas & Disponibilidad
              </h3>

              <div className="space-y-3 font-mono text-xs text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>Montería, Colombia (Zona Horaria UTC-5)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-violet-400 shrink-0" />
                  <span>Modalidad Remota / Híbrida Global</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 flex items-center gap-3">
                <a
                  href="https://github.com/oscarbol09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs font-semibold text-zinc-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/oscarbol09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 font-mono text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/20"
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Right Card: Quick Mail Composer Form */}
        <div className="lg:col-span-7">
          <BentoCard className="p-6 sm:p-8">
            <form onSubmit={handleSendMessage} className="space-y-5" noValidate>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Envía un Mensaje Directo
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-sans">
                  El formulario abrirá tu cliente de correo nativo con los parámetros pre-configurados.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block font-mono text-xs font-medium text-zinc-300">
                    Tu Nombre o Empresa <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Ej. Alexander Hamilton / Tech Lead"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`w-full rounded-xl border ${
                      errors.name ? 'border-red-500/60 bg-red-500/[0.03]' : 'border-white/10 bg-[#040406]'
                    } px-4 py-2.5 font-sans text-sm text-white placeholder-zinc-500 transition-colors focus:border-cyan-400 focus:outline-none`}
                  />
                  {errors.name && (
                    <div id="contact-name-error" className="flex items-center gap-1 font-mono text-xs text-red-400 mt-1" role="alert">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block font-mono text-xs font-medium text-zinc-300">
                    Asunto del Proyecto
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={100}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ej. Arquitectura Backend Go / RAG"
                    className="w-full rounded-xl border border-white/10 bg-[#040406] px-4 py-2.5 font-sans text-sm text-white placeholder-zinc-500 transition-colors focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block font-mono text-xs font-medium text-zinc-300">
                  Detalles del Mensaje <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={1000}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="Cuéntame sobre el desafío de ingeniería, stack técnico, objetivos o cronograma..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`w-full rounded-xl border ${
                    errors.message ? 'border-red-500/60 bg-red-500/[0.03]' : 'border-white/10 bg-[#040406]'
                  } p-4 font-sans text-sm text-white placeholder-zinc-500 transition-colors focus:border-cyan-400 focus:outline-none resize-none`}
                />
                {errors.message && (
                  <div id="contact-message-error" className="flex items-center gap-1 font-mono text-xs text-red-400 mt-1" role="alert">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-[11px] text-zinc-500">
                  * Campos requeridos para componer el email.
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-500/20 px-6 py-3 font-mono text-xs font-bold text-cyan-300 backdrop-blur-md transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-500/30 active:scale-95"
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
