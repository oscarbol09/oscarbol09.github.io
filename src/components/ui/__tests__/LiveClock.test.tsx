import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LiveClock } from '../LiveClock';

describe('Component: LiveClock', () => {
  it('should render Montería, CO location and local time label', () => {
    render(<LiveClock />);

    expect(screen.getByText(/Montería, CO/i)).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { container } = render(<LiveClock className="test-clock-class" />);

    expect(container.firstChild).toHaveClass('test-clock-class');
  });
});
