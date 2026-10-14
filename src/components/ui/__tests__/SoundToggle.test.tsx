import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { SoundToggle } from '../SoundToggle';

describe('Component: SoundToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render with sound enabled by default (option to mute)', () => {
    render(<SoundToggle />);
    const button = screen.getByRole('button', { name: /silenciar efectos de sonido/i });
    expect(button).toBeInTheDocument();
  });

  it('should toggle mute state and update aria-label when clicked', () => {
    render(<SoundToggle />);
    const button = screen.getByRole('button', { name: /silenciar efectos de sonido/i });

    // Click: active -> muted
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /activar efectos de sonido/i })).toBeInTheDocument();
    expect(localStorage.getItem('portfolio_sound_muted')).toBe('true');

    // Click again: muted -> active
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /silenciar efectos de sonido/i })).toBeInTheDocument();
    expect(localStorage.getItem('portfolio_sound_muted')).toBe('false');
  });
});
