import { useState, useCallback, useEffect } from 'react';
import { sound } from '../utils/sound';

export function useSoundEffects() {
  const [muted, setMuted] = useState<boolean>(true);

  useEffect(() => {
    setMuted(sound.isMuted());
  }, []);

  const toggleMute = useCallback(() => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
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
