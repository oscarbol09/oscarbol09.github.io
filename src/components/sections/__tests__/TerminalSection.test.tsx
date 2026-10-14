import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TerminalSection } from '../TerminalSection';

describe('Component: TerminalSection Integration', () => {
  it('should render title and initial whoami history', () => {
    render(<TerminalSection />);
    expect(screen.getByText(/Inspección Interactiva de Sistemas/i)).toBeInTheDocument();
    expect(screen.getByText('whoami')).toBeInTheDocument();
    expect(screen.getByText(/Oscar Darío Madera/i)).toBeInTheDocument();
  });

  it('should execute a known command and display its output', () => {
    render(<TerminalSection />);
    const input = screen.getByPlaceholderText(/Escribe "help"/i);

    fireEvent.change(input, { target: { value: 'projects' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getAllByText('projects').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/PROYECTOS DESTACADOS:/i)).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should display error message for unrecognized commands and block prototype pollution safely', () => {
    render(<TerminalSection />);
    const input = screen.getByPlaceholderText(/Escribe "help"/i);

    // Test prototype property attempt (CVE / DoS mitigation)
    fireEvent.change(input, { target: { value: '__proto__' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText(/Comando no reconocido: "__proto__"/i)).toBeInTheDocument();
  });

  it('should clear terminal history when "clear" command is submitted', () => {
    render(<TerminalSection />);
    const input = screen.getByPlaceholderText(/Escribe "help"/i);

    // Run clear
    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.queryByText('whoami')).not.toBeInTheDocument();
    expect(screen.queryByText(/Oscar Darío Madera/i)).not.toBeInTheDocument();
  });

  it('should execute command when clicking a suggestion pill', () => {
    render(<TerminalSection />);
    const suggestionBtn = screen.getByRole('button', { name: 'skills' });
    fireEvent.click(suggestionBtn);

    expect(screen.getAllByText('skills').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/CORE SKILLS & TECH STACK:/i)).toBeInTheDocument();
  });

  it('should navigate command history with ArrowUp and ArrowDown keys', () => {
    render(<TerminalSection />);
    const input = screen.getByPlaceholderText(/Escribe "help"/i);

    // Send cmd 1
    fireEvent.change(input, { target: { value: 'about' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // Send cmd 2
    fireEvent.change(input, { target: { value: 'contact' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // ArrowUp -> should populate last input 'contact'
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('contact');

    // ArrowUp again -> should populate 'about'
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('about');

    // ArrowDown -> should return to 'contact'
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('contact');

    // ArrowDown again -> should clear input
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('');
  });
});
