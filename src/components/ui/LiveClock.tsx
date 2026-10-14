import React, { useState, useEffect } from 'react';

/**
 * LiveClock
 * Displays real-time local time in Montería, Colombia (UTC-5),
 * showing authentic availability for remote engineering teams worldwide.
 */
export const LiveClock: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('es-CO', {
          timeZone: 'America/Bogota',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr('UTC-5');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 select-none ${className}`}
      title="Hora local en Montería, Colombia (America/Bogota, UTC-5)"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span>Montería, CO</span>
      <span className="text-zinc-600">·</span>
      <span className="text-zinc-200 font-medium">{timeStr}</span>
    </div>
  );
};
