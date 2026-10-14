import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectDetailModal } from '../ProjectDetailModal';
import { PROJECTS } from '../../../data/projects';

describe('Component: ProjectDetailModal', () => {
  const sampleProject = PROJECTS[0];

  it('should render nothing when project is null', () => {
    const { container } = render(<ProjectDetailModal project={null} onClose={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render project details, title and metrics when project is provided', () => {
    render(<ProjectDetailModal project={sampleProject} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: sampleProject.title })).toBeInTheDocument();
    expect(screen.getByText(sampleProject.tagline)).toBeInTheDocument();
  });

  it('should lock document body overflow on open and restore on unmount', () => {
    const { unmount } = render(<ProjectDetailModal project={sampleProject} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('should trigger onClose when clicking the close button', () => {
    const handleClose = vi.fn();
    render(<ProjectDetailModal project={sampleProject} onClose={handleClose} />);

    const closeBtn = screen.getByRole('button', { name: /cerrar modal/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should trigger onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<ProjectDetailModal project={sampleProject} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should copy installCommand to clipboard when clicked', async () => {
    render(<ProjectDetailModal project={sampleProject} onClose={vi.fn()} />);

    if (sampleProject.installCommand) {
      const copyBtn = screen.getByTitle(/copiar comando/i);
      fireEvent.click(copyBtn);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleProject.installCommand);
    }
  });
});
