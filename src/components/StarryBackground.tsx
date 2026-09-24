import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  alphaChange: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  alpha: number;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm pastel & golden firefly particles
    const colors = ['#ffeaa7', '#fab1a0', '#fd79a8', '#ffeaa7', '#dfe6e9', '#ffeaa7'];
    const particleCount = Math.min(Math.floor((width * height) / 12000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15, // slight upward drift
        alpha: Math.random() * 0.8 + 0.2,
        alphaChange: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const shootingStars: ShootingStar[] = [];
    let lastStarTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle glowing gradient overlay
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        10,
        width * 0.5,
        height * 0.4,
        Math.max(width, height) * 0.85
      );
      gradient.addColorStop(0, 'rgba(68, 30, 90, 0.45)');
      gradient.addColorStop(0.5, 'rgba(25, 18, 48, 0.65)');
      gradient.addColorStop(1, 'rgba(11, 9, 23, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating stars/fireflies
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        p.alpha += p.alphaChange;
        if (p.alpha <= 0.1 || p.alpha >= 0.95) {
          p.alphaChange = -p.alphaChange;
        }

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Handle shooting stars occasionally
      const now = Date.now();
      if (now - lastStarTime > 4000 && Math.random() < 0.04) {
        lastStarTime = now;
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          len: Math.random() * 80 + 50,
          speed: Math.random() * 6 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          alpha: 1,
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        ctx.save();
        ctx.globalAlpha = s.alpha;
        const lineGrad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        lineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        lineGrad.addColorStop(1, 'rgba(255, 215, 120, 0)');

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.015;

        if (s.alpha <= 0) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
