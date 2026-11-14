import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  TerminalSquare,
  Database,
  Cpu,
  MonitorSmartphone,
  Server,
  Cloud,
  BrainCircuit,
  Box,
} from 'lucide-react';

const techItems = [
  { id: 1, name: 'Next.js', color: '#0f172a', icon: <TerminalSquare /> },
  { id: 2, name: 'React', color: '#0284c7', icon: <Code2 /> },
  { id: 3, name: 'TypeScript', color: '#3178C6', icon: <Code2 /> },
  { id: 4, name: 'Node.js', color: '#339933', icon: <Server /> },
  { id: 5, name: 'MongoDB', color: '#47A248', icon: <Database /> },
  { id: 7, name: 'Tailwind', color: '#06B6D4', icon: <MonitorSmartphone /> },
  { id: 8, name: 'Docker', color: '#2496ED', icon: <Box /> },
  { id: 9, name: 'AWS', color: '#FF9900', icon: <Cloud /> },
  { id: 10, name: 'YOLOv10', color: '#0891b2', icon: <BrainCircuit /> },
  { id: 12, name: 'Verilog', color: '#2B4A82', icon: <Cpu /> },
  { id: 13, name: 'Python', color: '#3776AB', icon: <TerminalSquare /> },
  { id: 14, name: 'Linux', color: '#CA8A04', icon: <TerminalSquare /> },
];

const PhysicsPlayground = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const requestRef = useRef(null);
  const isDraggingRef = useRef(false);
  const activeNodeRef = useRef(null);
  const [, setRenderTrigger] = useState(0);

  const initPhysics = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    elementsRef.current = techItems.map((item) => ({
      ...item,
      x: Math.random() * (rect.width - 120) + 60,
      y: Math.random() * (rect.height / 2),
      vx: (Math.random() - 0.5) * 15,
      vy: 0,
      radius: 60,
      isDragging: false,
    }));
  };

  const updatePhysics = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const gravity = 0.4;
    const friction = 0.98;
    const bounce = 0.6;

    elementsRef.current.forEach((el, i) => {
      if (el.isDragging) return;
      el.vy += gravity;
      el.vx *= friction;
      el.vy *= friction;
      el.x += el.vx;
      el.y += el.vy;

      if (el.y + el.radius > rect.height) {
        el.y = rect.height - el.radius;
        el.vy *= -bounce;
        el.vx *= 0.9;
      }
      if (el.y - el.radius < 0) {
        el.y = el.radius;
        el.vy *= -bounce;
      }
      if (el.x + el.radius > rect.width) {
        el.x = rect.width - el.radius;
        el.vx *= -bounce;
      }
      if (el.x - el.radius < 0) {
        el.x = el.radius;
        el.vx *= -bounce;
      }

      for (let j = i + 1; j < elementsRef.current.length; j++) {
        const other = elementsRef.current[j];
        if (other.isDragging) continue;
        const dx = other.x - el.x;
        const dy = other.y - el.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = el.radius + other.radius;
        if (dist < minDist && dist > 0) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;
          el.x -= nx * overlap * 0.5;
          el.y -= ny * overlap * 0.5;
          other.x += nx * overlap * 0.5;
          other.y += ny * overlap * 0.5;
          const dvx = el.vx - other.vx;
          const dvy = el.vy - other.vy;
          el.vx -= dvx * 0.5;
          el.vy -= dvy * 0.5;
          other.vx += dvx * 0.5;
          other.vy += dvy * 0.5;
        }
      }
    });
    setRenderTrigger((prev) => prev + 1);
    requestRef.current = requestAnimationFrame(updatePhysics);
  };

  useEffect(() => {
    initPhysics();
    window.addEventListener('resize', initPhysics);
    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', initPhysics);
    };
  }, []);

  const handlePointerDown = (e, index) => {
    e.target.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    activeNodeRef.current = { index, lastX: e.clientX, lastY: e.clientY };
    elementsRef.current[index].isDragging = true;
    elementsRef.current[index].vx = 0;
    elementsRef.current[index].vy = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !activeNodeRef.current) return;
    const { index, lastX, lastY } = activeNodeRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    const el = elementsRef.current[index];
    el.vx = e.clientX - lastX;
    el.vy = e.clientY - lastY;
    el.x = e.clientX - rect.left;
    el.y = e.clientY - rect.top;
    activeNodeRef.current.lastX = e.clientX;
    activeNodeRef.current.lastY = e.clientY;
  };

  const handlePointerUp = () => {
    if (activeNodeRef.current) {
      const { index } = activeNodeRef.current;
      elementsRef.current[index].isDragging = false;
      elementsRef.current[index].vx *= 1.5;
      elementsRef.current[index].vy *= 1.5;
    }
    isDraggingRef.current = false;
    activeNodeRef.current = null;
  };

  return (
    <section className="bg-slate-100/70 pt-24 pb-12 border-y border-slate-200/90 relative z-20">
      {/* Centered & Stylized Heading */}
      <div className="w-full px-8 mb-16 flex flex-col items-center justify-center text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight uppercase">
          Core{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 glow-text">
            Stack
          </span>
        </h2>
        <div className="inline-flex items-center gap-3 bg-cyan-50 border border-cyan-200 px-6 py-3 rounded-full backdrop-blur-md shadow-sm">
          <span className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></span>
          <p className="text-cyan-800 font-mono text-sm tracking-widest uppercase font-semibold">
            Interactive Physics Engine • Drag & Drop Enabled
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[600px] bg-slate-50/90 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.04)] cursor-crosshair touch-none border-y border-slate-200 backdrop-blur-sm"
      >
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-slate-200/50 pointer-events-none select-none">
          TECH
        </div>

        {elementsRef.current.map((el, i) => (
          <div
            key={el.id}
            onPointerDown={(e) => handlePointerDown(e, i)}
            className="absolute w-[120px] h-[120px] -ml-[60px] -mt-[60px] flex flex-col items-center justify-center rounded-[28px] glass-panel hover:bg-white shadow-xl cursor-grab active:cursor-grabbing select-none transition-colors border border-slate-200 hover:border-cyan-500"
            style={{
              transform: `translate(${el.x}px, ${el.y}px)`,
              boxShadow: `0 20px 40px -10px ${el.color}25, 0 4px 6px -1px rgba(0,0,0,0.05)`,
            }}
          >
            <div style={{ color: el.color }} className="mb-3">
              {React.cloneElement(el.icon, { size: 36 })}
            </div>
            <span className="text-sm font-bold text-slate-800 tracking-wide">{el.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhysicsPlayground;

