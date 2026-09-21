import React, { useEffect, useRef } from 'react';

export const LiquidCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const render = () => {
      time += 0.003;
      // Smooth lerp for mouse movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Deep Obsidian base
      ctx.fillStyle = '#040406';
      ctx.fillRect(0, 0, width, height);

      // Gradient 1: Organic Cyan / Teal Glow (top left area, reacts gently to mouse)
      const grad1X = width * 0.35 + Math.sin(time * 0.8) * 120 + (mouseX - width / 2) * 0.04;
      const grad1Y = height * 0.25 + Math.cos(time * 0.7) * 90 + (mouseY - height / 2) * 0.04;
      const grad1 = ctx.createRadialGradient(
        grad1X,
        grad1Y,
        20,
        grad1X,
        grad1Y,
        Math.max(width * 0.45, 380)
      );
      grad1.addColorStop(0, 'rgba(6, 182, 212, 0.12)'); // Cyan glow
      grad1.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
      grad1.addColorStop(1, 'rgba(4, 4, 6, 0)');

      // Gradient 2: Organic Electric Violet / Indigo Glow (center right)
      const grad2X = width * 0.75 + Math.cos(time * 0.6) * 140 - (mouseX - width / 2) * 0.03;
      const grad2Y = height * 0.6 + Math.sin(time * 0.9) * 110 - (mouseY - height / 2) * 0.03;
      const grad2 = ctx.createRadialGradient(
        grad2X,
        grad2Y,
        30,
        grad2X,
        grad2Y,
        Math.max(width * 0.5, 420)
      );
      grad2.addColorStop(0, 'rgba(139, 92, 246, 0.09)'); // Violet glow
      grad2.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
      grad2.addColorStop(1, 'rgba(4, 4, 6, 0)');

      // Gradient 3: Subtle Emerald / Cyan Accent (bottom center)
      const grad3X = width * 0.4 + Math.sin(time * 0.5) * 100;
      const grad3Y = height * 0.85 + Math.cos(time * 0.6) * 80;
      const grad3 = ctx.createRadialGradient(
        grad3X,
        grad3Y,
        20,
        grad3X,
        grad3Y,
        Math.max(width * 0.4, 350)
      );
      grad3.addColorStop(0, 'rgba(16, 185, 129, 0.06)'); // Emerald
      grad3.addColorStop(1, 'rgba(4, 4, 6, 0)');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // Subtle fine grid overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
