import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSoundEffects } from '../useSoundEffects';
import { sound } from '../../utils/sound';

describe('Hook: useSoundEffects', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with sound unmuted by default', () => {
    const { result } = renderHook(() => useSoundEffects());
    expect(result.current.muted).toBe(false);
  });

  it('should toggle mute state and synchronize across hook instances', () => {
    const { result: hook1 } = renderHook(() => useSoundEffects());
    const { result: hook2 } = renderHook(() => useSoundEffects());

    act(() => {
      hook1.current.toggleMute();
    });

    expect(hook1.current.muted).toBe(true);
    expect(hook2.current.muted).toBe(true);
    expect(localStorage.getItem('portfolio_sound_muted')).toBe('true');

    act(() => {
      hook2.current.toggleMute();
    });

    expect(hook1.current.muted).toBe(false);
    expect(hook2.current.muted).toBe(false);
    expect(localStorage.getItem('portfolio_sound_muted')).toBe('false');
  });

  it('should forward playback triggers to sound engine without errors', () => {
    const spyClick = vi.spyOn(sound, 'playClick');
    const spyTab = vi.spyOn(sound, 'playTabSwitch');
    const { result } = renderHook(() => useSoundEffects());

    act(() => {
      result.current.playClick();
      result.current.playTabSwitch();
    });

    expect(spyClick).toHaveBeenCalledTimes(1);
    expect(spyTab).toHaveBeenCalledTimes(1);
  });
});
