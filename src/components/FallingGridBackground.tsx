'use client';

import { useEffect, useRef } from 'react';

export default function FallingGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animationFrameId: number;

    const squares: { x: number; y: number; speed: number; flicker: number }[] = [];
    const spacing = 32;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      squares.length = 0;

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          squares.push({
            x,
            y,
            speed: Math.random() * 0.7 + 0.5,
            flicker: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 255, 255, 0.15)';

      for (const square of squares) {
        const alpha = 0.2 + 0.5 * Math.abs(Math.sin(time / 300 + square.flicker));
        ctx.fillStyle = `rgba(0,255,255,${alpha.toFixed(2)})`;

        ctx.shadowColor = 'rgba(0,255,255,0.4)';
        ctx.shadowBlur = 4;

        ctx.fillRect(square.x, square.y, 2, 2);

        square.y += square.speed;
        if (square.y > canvas.height) square.y = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    resizeCanvas();
    animationFrameId = requestAnimationFrame(draw);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none', opacity: 0.3 }}
    />
  );
}