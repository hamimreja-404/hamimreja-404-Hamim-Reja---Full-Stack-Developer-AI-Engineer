import React, { useEffect, useRef } from 'react';

const MouseEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor(x, y, isBurst = false) {
        this.x = x;
        this.y = y;
        this.size = isBurst ? Math.random() * 5 + 2 : Math.random() * 3 + 1;
        this.speedX = isBurst ? Math.random() * 12 - 6 : Math.random() * 2 - 1;
        this.speedY = isBurst ? Math.random() * 12 - 6 : Math.random() * 2 - 1;
        this.life = 1;
        this.decay = isBurst ? Math.random() * 0.02 + 0.02 : Math.random() * 0.05 + 0.02;
        this.color = `hsla(192, 90%, 45%, `; // Cyan base visible on light backgrounds
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.95;
      }
      draw() {
        ctx.fillStyle = this.color + this.life + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (this.life > 0.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(6, 182, 212, 0.5)';
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    const handleMouseDown = (e) => {
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle(e.clientX, e.clientY, true));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0 || particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 opacity-60" />;
};

export default MouseEffect;

