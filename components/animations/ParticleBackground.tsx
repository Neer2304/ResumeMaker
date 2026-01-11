"use client";

import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  mode: "light" | "dark";
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(25, Math.floor(window.innerWidth / 50)); // Reduced particles

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1 + 0.5, // Smaller particles
          speedX: (Math.random() - 0.5) * 0.2, // Slower movement
          speedY: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear with slight fade for trail effect
      ctx.fillStyle = mode === "light" ? 'rgba(248, 250, 252, 0.05)' : 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Draw particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        if (mode === "light") {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.1)');
        } else {
          gradient.addColorStop(0, 'rgba(96, 165, 250, 0.4)');
          gradient.addColorStop(1, 'rgba(52, 211, 153, 0.1)');
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections (only for close particles)
        particles.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) { // Reduced connection distance
            ctx.beginPath();
            ctx.strokeStyle = mode === "light" 
              ? 'rgba(59, 130, 246, 0.1)' 
              : 'rgba(96, 165, 250, 0.1)';
            ctx.lineWidth = 0.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: mode === "dark" ? 0.6 : 0.3,
        transition: 'opacity 0.5s ease'
      }}
    />
  );
};

export default ParticleBackground;