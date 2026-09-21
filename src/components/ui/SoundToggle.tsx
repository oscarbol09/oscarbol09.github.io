import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export const SoundToggle: React.FC = () => {
  const { muted, toggleMute, playHover } = useSoundEffects();

  return (
    <button
      onClick={toggleMute}
      onMouseEnter={playHover}
      type="button"
      title={muted ? 'Activar efectos de sonido sintéticos' : 'Silenciar efectos'}
      aria-label={muted ? 'Activar efectos de sonido' : 'Silenciar efectos de sonido'}
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-md transition-all duration-200 hover:border-cyan-500/40 hover:bg-white/10 hover:text-cyan-300 active:scale-95"
    >
      {muted ? (
        <VolumeX className="h-4 w-4 transition-transform group-hover:scale-110" />
      ) : (
        <div className="flex items-center gap-0.5">
          <Volume2 className="h-4 w-4 text-cyan-400 transition-transform group-hover:scale-110" />
        </div>
      )}
    </button>
  );
};
