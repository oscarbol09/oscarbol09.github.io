import { useState, useCallback, useEffect } from 'react';
import { sound } from '../utils/sound';

export function useSoundEffects() {
  const [muted, setMuted] = useState<boolean>(sound.isMuted());

  useEffect(() => {
    // Sincronización reactiva mediante patrón Observer a través de todos los componentes
    const unsubscribe = sound.subscribe((newMuted) => {
      setMuted(newMuted);
    });
    return unsubscribe;
  }, []);

  const toggleMute = useCallback(() => {
    sound.toggleMute();
  }, []);

  const playClick = useCallback(() => {
    sound.playClick();
  }, []);

  const playHover = useCallback(() => {
    sound.playHover();
  }, []);

  const playTerminalKey = useCallback(() => {
    sound.playTerminalKey();
  }, []);

  const playSuccess = useCallback(() => {
    sound.playSuccess();
  }, []);

  const playTabSwitch = useCallback(() => {
    sound.playTabSwitch();
  }, []);

  return {
    muted,
    toggleMute,
    playClick,
    playHover,
    playTerminalKey,
    playSuccess,
    playTabSwitch,
  };
}
