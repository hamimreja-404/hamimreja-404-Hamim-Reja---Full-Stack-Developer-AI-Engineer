import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import GlobalStyles from '@/components/GlobalStyles';
import HeroSection from '@/Section/HeroSection';
import FloatingNavbar from '@/components/FloatingNavbar';
import ScrollToTopButton from '@/components/ScrollToTopButton';

// Lazy-load below-the-fold sections for maximum initial page load speed
const SkillsSection = lazy(() => import('@/Section/SkillsSection'));
const Experience = lazy(() => import('@/Section/Experience'));
const Projects = lazy(() => import('@/Section/Projects'));
const Contact = lazy(() => import('@/Section/Contact'));

function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
}

function SectionFallback() {
  return <div className="min-h-[240px] w-full" aria-hidden="true" />;
}

function HomePage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <SkillsSection />
        <Experience />
        <Projects />
        <Contact />
      </Suspense>
    </main>
  );
}

// --- Main App Component ---
export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-200 relative transition-colors duration-300">
        <GlobalStyles />
        <ScrollToHashElement />
        <FloatingNavbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}
