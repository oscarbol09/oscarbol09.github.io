import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OpenSourceWallSection } from '../OpenSourceWallSection';

describe('Component: OpenSourceWallSection', () => {
  it('should render section title and description', () => {
    render(<OpenSourceWallSection />);

    expect(screen.getByText(/Aportes Comunitarios & Software Libre/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Source Ecosystem Contributions/i)).toBeInTheDocument();
  });

  it('should render all open source contributions cards', () => {
    render(<OpenSourceWallSection />);

    expect(screen.getAllByText(/OCA \(Odoo Community Association\)/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/Fix: Auditlog Rule Traceability for Archived Records/i)).toBeInTheDocument();
    expect(screen.getByText(/Feat: Compensación REAGP y Cálculo en CuotaDeducible/i)).toBeInTheDocument();
    expect(screen.getByText(/Core: SDK Java para el Protocolo Agent-to-Agent/i)).toBeInTheDocument();
  });

  it('should have secure external links with rel="noopener noreferrer"', () => {
    render(<OpenSourceWallSection />);

    const externalLinks = screen.getAllByRole('link');
    expect(externalLinks.length).toBeGreaterThan(0);

    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
