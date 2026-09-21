import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'blue' | 'violet' | 'emerald' | 'amber' | 'neutral';
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  pulse = false,
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/25',
    violet: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    neutral: 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/20',
  };

  const pulseStyles = {
    cyan: 'bg-cyan-400',
    blue: 'bg-blue-400',
    violet: 'bg-violet-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    neutral: 'bg-zinc-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-tight backdrop-blur-md transition-colors ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${pulseStyles[variant]}`} />
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${pulseStyles[variant]}`} />
        </span>
      )}
      {children}
    </span>
  );
};
