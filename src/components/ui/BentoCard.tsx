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
  spotlightColor = 'rgba(223, 255, 82, 0.12)',
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
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c10] p-6 sm:p-7 transition-all duration-300 hover:border-[#dfff52]/40 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)] ${className}`}
    >
      {/* Dynamic Cursor Spotlight via CSS variables */}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
