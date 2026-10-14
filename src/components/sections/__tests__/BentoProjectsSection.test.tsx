import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BentoProjectsSection } from '../BentoProjectsSection';
import { sound } from '../../../utils/sound';

describe('Component & Integration: BentoProjectsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render section title and category filter pills', () => {
    render(<BentoProjectsSection />);

    expect(screen.getByText(/Proyectos Insignia & Sistemas/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Todos los Proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sistemas & Infra/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /IA & RAG/i })).toBeInTheDocument();
  });

  it('should filter projects when clicking a category pill', () => {
    const tabSpy = vi.spyOn(sound, 'playTabSwitch');
    render(<BentoProjectsSection />);

    const systemsBtn = screen.getByRole('button', { name: /Sistemas & Infra/i });
    fireEvent.click(systemsBtn);

    expect(tabSpy).toHaveBeenCalled();
    expect(screen.getByText('Branchbase')).toBeInTheDocument();
  });

  it('should open ProjectDetailModal when clicking "Ver Arquitectura & Detalles"', () => {
    render(<BentoProjectsSection />);

    const detailButtons = screen.getAllByText(/Ver Arquitectura & Detalles/i);
    fireEvent.click(detailButtons[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cerrar modal/i })).toBeInTheDocument();
  });

  it('should not open modal when clicking the GitHub repository link', () => {
    render(<BentoProjectsSection />);

    const githubLinks = screen.getAllByTitle(/Ver repositorio en GitHub/i);
    fireEvent.click(githubLinks[0]);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
