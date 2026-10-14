import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BentoCard } from '../BentoCard';

describe('Component: BentoCard', () => {
  it('should render children correctly', () => {
    render(
      <BentoCard>
        <span data-testid="bento-child">Contenido de Prueba</span>
      </BentoCard>
    );
    expect(screen.getByTestId('bento-child')).toBeInTheDocument();
  });

  it('should attach additional className passed via props', () => {
    const { container } = render(
      <BentoCard className="custom-test-class">
        <div>Contenido</div>
      </BentoCard>
    );
    expect(container.firstChild).toHaveClass('custom-test-class');
  });

  it('should invoke onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <BentoCard onClick={handleClick}>
        <div>Click Me</div>
      </BentoCard>
    );
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should set CSS custom properties on mousemove without crashing', () => {
    const { container } = render(
      <BentoCard spotlight spotlightColor="rgba(6, 182, 212, 0.12)">
        <div>Spotlight Content</div>
      </BentoCard>
    );
    const card = container.firstChild as HTMLElement;
    fireEvent.mouseMove(card, { clientX: 120, clientY: 80 });
    expect(card).toBeInTheDocument();
  });
});
