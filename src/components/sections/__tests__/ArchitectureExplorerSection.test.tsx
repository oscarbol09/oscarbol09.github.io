import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ArchitectureExplorerSection } from '../ArchitectureExplorerSection';
import { sound } from '../../../utils/sound';

describe('Component & Integration: ArchitectureExplorerSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Branchbase as default active tab with network metrics', () => {
    render(<ArchitectureExplorerSection />);

    expect(screen.getByText(/Enrutamiento Transparente por Rama de Git/i)).toBeInTheDocument();
    expect(screen.getByText(/Latencia Proxy/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero Packet Mutation/i)).toBeInTheDocument();
  });

  it('should switch to JVM-MCP panel when tab is clicked', () => {
    const soundSpy = vi.spyOn(sound, 'playTabSwitch');
    render(<ArchitectureExplorerSection />);

    const jvmTab = screen.getByRole('button', { name: /JVM-MCP \(GraalVM Native\)/i });
    fireEvent.click(jvmTab);

    expect(soundSpy).toHaveBeenCalled();
    expect(screen.getByText(/Diagnóstico Runtime de la JVM para Modelos de IA/i)).toBeInTheDocument();
    expect(screen.getByText(/Escaneo Cíclico de Deadlocks/i)).toBeInTheDocument();
    expect(screen.getByText(/22.4 MB RSS/i)).toBeInTheDocument();
  });

  it('should switch to A2A-Hub panel when tab is clicked', () => {
    render(<ArchitectureExplorerSection />);

    const a2aTab = screen.getByRole('button', { name: /A2A-Hub \(Multi-Agent Mesh\)/i });
    fireEvent.click(a2aTab);

    expect(screen.getByText(/Orquestación Descentralizada de Agentes de IA/i)).toBeInTheDocument();
    expect(screen.getByText(/Búsqueda Semántica HNSW/i)).toBeInTheDocument();
    expect(screen.getByText(/10,000\+ Loom/i)).toBeInTheDocument();
  });
});
