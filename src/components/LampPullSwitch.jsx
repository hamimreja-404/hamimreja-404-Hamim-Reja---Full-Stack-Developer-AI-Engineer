import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';

const BASE_CORD_HEIGHT = 76;

const LampPullSwitch = () => {
  const { isDark, toggleTheme } = useTheme();
  const bulbAnchorRef = useRef(null);
  const didDragRef = useRef(false);

  // Pull-rope stretch motion values
  const pullY = useMotionValue(0);
  const smoothPullY = useSpring(pullY, { stiffness: 420, damping: 22 });
  const ropeScaleY = useTransform(smoothPullY, [0, 42], [1, 1.65]);

  const getBulbCenter = () => {
    if (!bulbAnchorRef.current) {
      return { x: window.innerWidth - 52, y: 108 };
    }
    const rect = bulbAnchorRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const triggerWithTug = () => {
    const origin = getBulbCenter();
    // Brief visual tug animation on click
    pullY.set(20);
    setTimeout(() => pullY.set(0), 150);
    toggleTheme(origin);
  };

  const handleDragStart = () => {
    didDragRef.current = false;
  };

  const handleDrag = (_, info) => {
    if (Math.abs(info.offset.y) > 4) {
      didDragRef.current = true;
    }
    pullY.set(Math.max(0, info.offset.y));
  };

  const handleDragEnd = (_, info) => {
    const pulledEnough = info.offset.y >= 16;
    pullY.set(0);
    if (pulledEnough) {
      toggleTheme(getBulbCenter());
    }
    setTimeout(() => {
      didDragRef.current = false;
    }, 80);
  };

  const handleClick = () => {
    if (didDragRef.current) return;
    triggerWithTug();
  };

  return (
    <div className="absolute right-4 top-0 z-40 flex flex-col items-center select-none sm:right-8 lg:right-12">
      {/* Ceiling Brass/Slate Canopy Anchor */}
      <div className="h-2.5 w-14 rounded-b-lg border-x border-b border-slate-400/60 bg-gradient-to-b from-slate-700 to-slate-900 shadow-sm dark:border-slate-600/70 dark:from-slate-600 dark:to-slate-800" />

      {/* Gently swaying pendant + pull-rope assembly */}
      <motion.div
        animate={{ rotate: [0, 1.3, 0, -1.3, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
        className="relative flex items-start gap-2.5"
      >
        {/* Main Lamp Cord + Glass Edison Bulb */}
        <div className="flex flex-col items-center">
          {/* Braided ceiling cord */}
          <div className="h-14 w-[2.5px] bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 dark:from-slate-500 dark:via-slate-400 dark:to-slate-600 sm:h-16" />

          {/* Clickable Bulb Button */}
          <button
            ref={bulbAnchorRef}
            type="button"
            onClick={handleClick}
            aria-label={isDark ? 'Pull lamp to turn light mode on' : 'Pull lamp to turn dark mode on'}
            title={isDark ? 'Lights Off (Dark) — Click or pull rope for Light Mode' : 'Lights On (Light) — Click or pull rope for Dark Mode'}
            className="group relative -mt-0.5 flex flex-col items-center cursor-pointer focus:outline-none"
          >
            {/* Warm / Cool Aura Glow behind bulb */}
            <span
              className={`pointer-events-none absolute top-4 h-20 w-20 rounded-full blur-2xl transition-all duration-500 ${
                isDark
                  ? 'scale-75 bg-cyan-500/15 opacity-70 group-hover:opacity-100'
                  : 'scale-110 bg-amber-300/65 opacity-95 group-hover:scale-125'
              }`}
            />

            {/* Vintage Lamp Socket + Glass Bulb SVG */}
            <svg
              viewBox="0 0 64 92"
              className="relative z-10 h-16 w-12 drop-shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-[76px] sm:w-14"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="bulbWarmGlow" cx="50%" cy="48%" r="55%">
                  <stop offset="0%" stopColor="#fef9c3" stopOpacity="1" />
                  <stop offset="45%" stopColor="#fde047" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.28" />
                </radialGradient>
                <radialGradient id="bulbDarkGlass" cx="42%" cy="38%" r="60%">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.65" />
                  <stop offset="65%" stopColor="#0f172a" stopOpacity="0.82" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0.92" />
                </radialGradient>
                <linearGradient id="socketBrass" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="35%" stopColor="#94a3b8" />
                  <stop offset="70%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* Top grommet ring */}
              <circle cx="32" cy="5" r="3.5" fill="none" stroke="#475569" strokeWidth="2.2" />

              {/* Socket neck & collar */}
              <rect x="23" y="8" width="18" height="12" rx="3" fill="url(#socketBrass)" stroke="#334155" strokeWidth="1" />
              <line x1="23" y1="12" x2="41" y2="12" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.55" />
              <line x1="23" y1="16" x2="41" y2="16" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.55" />
              <rect x="21" y="19" width="22" height="5" rx="2" fill="#1e293b" />

              {/* Teardrop / Edison glass envelope */}
              <path
                d="M22 24 C20 31, 11 38, 11 53 C11 66.5, 20.5 78, 32 78 C43.5 78, 53 66.5, 53 53 C53 38, 44 31, 42 24 Z"
                fill={isDark ? 'url(#bulbDarkGlass)' : 'url(#bulbWarmGlow)'}
                stroke={isDark ? '#475569' : '#f59e0b'}
                strokeWidth="1.6"
              />

              {/* Filament stems & glowing coil */}
              <path
                d="M27 25 L28 45 M37 25 L36 45"
                stroke={isDark ? '#64748b' : '#b45309'}
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <path
                d="M28 45 Q30 39 32 45 Q34 51 36 45"
                fill="none"
                stroke={isDark ? '#38bdf8' : '#ffffff'}
                strokeOpacity={isDark ? '0.45' : '0.95'}
                strokeWidth={isDark ? '1.6' : '2.4'}
                strokeLinecap="round"
              />

              {/* Subtle glass specular highlight */}
              <path
                d="M17 48 C17 41, 21 36, 23 32"
                fill="none"
                stroke="#ffffff"
                strokeOpacity={isDark ? '0.24' : '0.7'}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Interactive Knotted Pull Rope (drag down OR click to pull) */}
        <div className="relative flex flex-col items-center pt-1">
          {/* Stretchy Rope Cord */}
          <motion.div
            style={{
              height: BASE_CORD_HEIGHT,
              scaleY: ropeScaleY,
              transformOrigin: 'top center',
            }}
            className="w-[2px] rounded-full bg-gradient-to-b from-slate-500 via-amber-700/80 to-amber-800 dark:from-slate-400 dark:via-cyan-500/60 dark:to-cyan-400"
          />

          {/* Draggable / Clickable Rope Tassel Knob */}
          <motion.button
            type="button"
            drag="y"
            dragConstraints={{ top: 0, bottom: 42 }}
            dragElastic={0.35}
            dragSnapToOrigin
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.96 }}
            aria-label={isDark ? 'Pull rope for Light Mode' : 'Pull rope for Dark Mode'}
            className="group relative -mt-0.5 flex cursor-grab flex-col items-center active:cursor-grabbing focus:outline-none"
          >
            {/* Brass crimp + Wooden/Ceramic pull bead */}
            <span className="h-2 w-2 rounded-t-sm bg-slate-500 dark:bg-slate-400" />
            <span
              className={`flex h-6 w-4 items-center justify-center rounded-full border shadow-md transition-colors ${
                isDark
                  ? 'border-cyan-400/60 bg-slate-800 text-cyan-300 shadow-cyan-500/20'
                  : 'border-amber-400/80 bg-amber-100 text-amber-800 shadow-amber-500/25'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </span>

            {/* Crisp micro label next to/below knob */}
            <span className="mt-1.5 rounded-full border border-slate-200/90 bg-white/90 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-slate-600 shadow-2xs backdrop-blur-sm transition-colors group-hover:border-cyan-400 group-hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-300 dark:group-hover:border-cyan-500 dark:group-hover:text-cyan-300">
              {isDark ? 'Pull · On' : 'Pull · Off'}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LampPullSwitch;

