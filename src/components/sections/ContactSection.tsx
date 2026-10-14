import React, { useState } from 'react';
import { Copy, Check, Send, Clock, MapPin, AlertCircle, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../ui/GithubIcon';
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
    <section id="contacto" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-white/10">
      {/* Editorial Section Header */}
      <div className="flex flex-col items-start gap-3 mb-14">
        <div className="flex items-center gap-3">
          <span className="font-mono text-base font-bold text-[#dfff52]">06</span>
          <span className="h-px w-8 bg-[#dfff52]/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Canales de Contacto Directo
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f2efe8]">
          Iniciemos una Conversación
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
          ¿Interesado en colaborar en sistemas backend en Go, arquitecturas de IA o proyectos de alta concurrencia? Escríbeme directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Direct Contact Hub */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#0b0c10] p-6 sm:p-8">
            <div className="space-y-5">
              <Badge variant="lime" pulse>Disponible para Nuevos Proyectos</Badge>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f2efe8]">
                Correo Electrónico
              </h3>

              <div className="rounded-xl border border-white/10 bg-[#060709] p-4 font-mono text-xs text-zinc-200 break-all flex items-center justify-between gap-3">
                <span>{email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-[#dfff52] hover:bg-[#dfff52] hover:text-[#060709] active:scale-95"
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
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 font-mono text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Copiado al portapapeles. Listo para enviar tu correo.</span>
                </div>
              )}

              <div className="space-y-3 pt-3 border-t border-white/10 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#dfff52]" />
                  <span>Montería, Córdoba, Colombia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#dfff52]" />
                  <span>Zona Horaria: UTC-5 (America/Bogota)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0c10] p-6">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
              Redes &amp; Perfiles Profesionales
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/oscarbol09"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-[#060709] p-3 text-xs font-mono text-zinc-300 hover:border-[#dfff52]/40 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub: @oscarbol09</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-[#dfff52]" />
              </a>

              <a
                href="https://www.linkedin.com/in/oscar-madera-098555246/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-[#060709] p-3 text-xs font-mono text-zinc-300 hover:border-[#dfff52]/40 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded bg-blue-600 font-bold text-[10px] text-white">in</span>
                  <span>LinkedIn: Oscar Madera</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-[#dfff52]" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form: Accessible Message Interface */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSendMessage}
            className="rounded-2xl border border-white/10 bg-[#0b0c10] p-6 sm:p-8 space-y-5"
            noValidate
          >
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Tu Nombre o Empresa <span className="text-red-400">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                }}
                placeholder="Ej. Juan Pérez / Tech Lead Corp"
                className={`w-full rounded-xl border bg-[#060709] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors ${
                  errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#dfff52]'
                }`}
              />
              {errors.name && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-subject"
                className="block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Asunto del Proyecto <span className="text-red-400">*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej. Arquitectura Backend Go / RAG con pgvector"
                className="w-full rounded-xl border border-white/10 bg-[#060709] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-[#dfff52]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="block font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Detalles del Mensaje <span className="text-red-400">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                }}
                placeholder="Describe el reto técnico, alcance, tecnologías o cualquier pregunta inicial..."
                className={`w-full rounded-xl border bg-[#060709] px-4 py-3 font-mono text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors resize-y ${
                  errors.message ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-[#dfff52]'
                }`}
              />
              {errors.message && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{errors.message}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#dfff52] px-6 py-3.5 font-mono text-xs sm:text-sm font-bold text-[#060709] transition-all hover:bg-[#caff33] hover:shadow-[0_0_24px_rgba(223,255,82,0.35)] active:scale-[0.99]"
            >
              <Send className="h-4 w-4" />
              <span>Enviar Mensaje</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
