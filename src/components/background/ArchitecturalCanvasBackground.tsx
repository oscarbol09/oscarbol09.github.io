import React, { useEffect, useRef } from 'react';

/**
 * ArchitecturalCanvasBackground
 * High-performance 60 FPS technical background.
 * Uses a restrained, architectural dot matrix and subtle starfield nodes
 * with interactive parallax, inspired by modern high-craft engineering portfolios
 * (iserre.site & perejss.github.io).
 * Replaces blurry neon blobs with crisp, editorial technical elegance.
 */
export const ArchitecturalCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Architectural constellation nodes
    interface Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      alpha: number;
      pulseSpeed: number;
      phase: number;
    }

    let nodes: Node[] = [];

    const initNodes = () => {
      nodes = [];
      // Restrained count for peak performance
      const count = Math.min(Math.floor((width * height) / 18000), 75);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() > 0.85 ? 1.8 : 1.0,
          alpha: 0.15 + Math.random() * 0.45,
          pulseSpeed: 0.008 + Math.random() * 0.015,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    initNodes();

    let time = 0;

    const render = () => {
      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Deep luxury obsidian background (#060709)
      ctx.fillStyle = '#060709';
      ctx.fillRect(0, 0, width, height);

      // Subtle architectural grid lines (hairline 48px pitch)
      const gridSize = 64;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.018)';

      const startX = 0;
      const startY = 0;

      ctx.beginPath();
      for (let x = startX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = startY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Subtle localized ambient vignette around cursor (neutral warm white/lime hint)
      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 650);
      grad.addColorStop(0, 'rgba(223, 255, 82, 0.025)'); // #dfff52 subtle lime
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.008)');
      grad.addColorStop(1, 'rgba(6, 7, 9, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render architectural nodes with gentle parallax
      const parallaxFactor = 0.02;
      const offsetX = (mouseX - width / 2) * parallaxFactor;
      const offsetY = (mouseY - height / 2) * parallaxFactor;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = 0.7 + 0.3 * Math.sin(time * node.pulseSpeed * 60 + node.phase);
        const currentAlpha = node.alpha * pulse;

        const currentX = node.baseX + offsetX * (node.size * 0.8);
        const currentY = node.baseY + offsetY * (node.size * 0.8);

        // Draw node
        ctx.fillStyle = `rgba(242, 239, 232, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(currentX, currentY, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect close neighbors with hairline vectors
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const otherX = other.baseX + offsetX * (other.size * 0.8);
          const otherY = other.baseY + offsetY * (other.size * 0.8);
          const dx = currentX - otherX;
          const dy = currentY - otherY;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.07;
            ctx.strokeStyle = `rgba(223, 255, 82, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(otherX, otherY);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
