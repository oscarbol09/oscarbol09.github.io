import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProfilePhilosophySection } from '../ProfilePhilosophySection';

describe('Component: ProfilePhilosophySection', () => {
  it('should render section title and personal statement', () => {
    render(<ProfilePhilosophySection />);

    expect(screen.getByText(/INGENIERÍA RIGUROSA, MODULARIDAD PROFUNDA/i)).toBeInTheDocument();
    expect(screen.getByText(/Oscar Darío Madera/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Universidad de Córdoba/i).length).toBeGreaterThanOrEqual(1);
  });

  it('should render core engineering principles', () => {
    render(<ProfilePhilosophySection />);

    expect(screen.getByText(/TDD & Verificación Continua/i)).toBeInTheDocument();
    expect(screen.getByText(/Concurrencia Estructurada/i)).toBeInTheDocument();
    expect(screen.getByText(/Integridad ACID & Protocolos de Red/i)).toBeInTheDocument();
  });

  it('should render experience timeline entries', () => {
    render(<ProfilePhilosophySection />);

    expect(screen.getByText(/EXPERIENCIA & HITOS/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Systems Architect & Open Source Contributor/i)).toBeInTheDocument();
    expect(screen.getByText(/Desarrollador de Software Full-Stack/i)).toBeInTheDocument();
  });
});
