import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactSection } from '../ContactSection';

describe('Component & A11y: ContactSection Form', () => {
  it('should provide accessible form controls with proper label association and required fields', () => {
    render(<ContactSection />);

    const nameInput = screen.getByLabelText(/Tu Nombre o Empresa/i);
    const subjectInput = screen.getByLabelText(/Asunto del Proyecto/i);
    const messageInput = screen.getByLabelText(/Detalles del Mensaje/i);

    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toBeRequired();
    expect(nameInput).toHaveAttribute('id', 'contact-name');

    expect(subjectInput).toBeInTheDocument();
    expect(subjectInput).toBeRequired();
    expect(subjectInput).toHaveAttribute('id', 'contact-subject');

    expect(messageInput).toBeInTheDocument();
    expect(messageInput).toBeRequired();
    expect(messageInput).toHaveAttribute('id', 'contact-message');
  });

  it('should construct mailto URL with encoded parameters on form submission', () => {
    const originalLocation = window.location;
    // Mocking window.location in jsdom
    delete (window as unknown as { location?: unknown }).location;
    (window as unknown as { location: unknown }).location = { ...originalLocation, href: '' };

    render(<ContactSection />);

    const nameInput = screen.getByLabelText(/Tu Nombre o Empresa/i);
    const subjectInput = screen.getByLabelText(/Asunto del Proyecto/i);
    const messageInput = screen.getByLabelText(/Detalles del Mensaje/i);
    const submitBtn = screen.getByRole('button', { name: /enviar mensaje/i });

    fireEvent.change(nameInput, { target: { value: 'Tech Lead Corp' } });
    fireEvent.change(subjectInput, { target: { value: 'Desarrollo en Go' } });
    fireEvent.change(messageInput, { target: { value: 'Necesitamos arquitectura de proxy TCP' } });

    fireEvent.click(submitBtn);

    expect(window.location.href).toContain('mailto:dario.oviedo2022@gmail.com');
    expect(window.location.href).toContain('subject=Desarrollo%20en%20Go');
    expect(window.location.href).toContain('Necesitamos%20arquitectura');

    (window as unknown as { location: unknown }).location = originalLocation;
  });

  it('should copy email to clipboard and trigger feedback', async () => {
    render(<ContactSection />);
    const copyEmailBtn = screen.getByTitle(/copiar email/i);

    fireEvent.click(copyEmailBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('dario.oviedo2022@gmail.com');
  });
});
