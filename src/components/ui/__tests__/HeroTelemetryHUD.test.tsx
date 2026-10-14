import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HeroTelemetryHUD } from '../HeroTelemetryHUD';

describe('Component: HeroTelemetryHUD', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render active telemetry status and metric cards', () => {
    render(<HeroTelemetryHUD />);

    expect(screen.getByText(/Systems Runtime Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Branchbase TCP Proxy/i)).toBeInTheDocument();
    expect(screen.getByText(/JVM-MCP GraalVM Daemon/i)).toBeInTheDocument();
    expect(screen.getByText(/A2A-Hub Agent Mesh/i)).toBeInTheDocument();
    expect(screen.getByText(/< 0.8ms/i)).toBeInTheDocument();
    expect(screen.getByText(/14.2ms/i)).toBeInTheDocument();
  });

  it('should copy installation command when clicking the copy button', async () => {
    const clipboardSpy = vi.spyOn(navigator.clipboard, 'writeText');
    render(<HeroTelemetryHUD />);

    const copyBtn = screen.getByRole('button', { name: /copiar comando de instalación/i });
    expect(copyBtn).toBeInTheDocument();

    fireEvent.click(copyBtn);

    expect(clipboardSpy).toHaveBeenCalledWith(
      'go install github.com/oscarbol09/branchbase/cmd/branchbase@latest'
    );
  });
});
