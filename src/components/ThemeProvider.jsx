import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
});

const STORAGE_KEY = 'hamim-portfolio-theme';

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage quota / privacy mode errors
    }
  }, []);

  const toggleTheme = useCallback(
    (origin) => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      const prefersReducedMotion =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const x = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth - 48 : 0);
      const y = origin?.y ?? 76;

      const applyDomTheme = () => {
        const root = document.documentElement;
        if (nextTheme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        flushSync(() => {
          setTheme(nextTheme);
        });
      };

      // Native View Transitions API: circular fluid reveal expanding from the top-right bulb
      if (typeof document !== 'undefined' && document.startViewTransition && !prefersReducedMotion) {
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
          applyDomTheme();
        });

        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
              },
              {
                duration: 760,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          })
          .catch(() => {
            // Safely ignore canceled transitions on rapid clicks
          });
        return;
      }

      // Smooth ripple fallback for browsers without startViewTransition
      if (typeof document !== 'undefined' && !prefersReducedMotion) {
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.inset = '0';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        ripple.style.background =
          nextTheme === 'dark'
            ? 'radial-gradient(circle at top right, rgba(2,6,23,0.92), rgba(15,23,42,0.85))'
            : 'radial-gradient(circle at top right, rgba(254,249,195,0.85), rgba(248,250,252,0.92))';
        document.body.appendChild(ripple);

        const anim = ripple.animate(
          [
            { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 0.95 },
            { clipPath: `circle(${endRadius}px at ${x}px ${y}px)`, opacity: 0 },
          ],
          { duration: 680, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
        anim.onfinish = () => ripple.remove();
      }

      setTheme(nextTheme);
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

