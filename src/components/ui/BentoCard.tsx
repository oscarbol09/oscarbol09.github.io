import React, { useRef } from 'react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
  spotlightColor?: string;
  onClick?: () => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  spotlight = true,
  spotlightColor = 'rgba(6, 182, 212, 0.12)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#09090e]/80 p-6 backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-300 hover:border-white/20 hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* Subtle Inner Top Highlight Edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Dynamic Cursor Spotlight via CSS variables (Zero React Re-renders on mousemove) */}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Subtle Ambient Hover Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
