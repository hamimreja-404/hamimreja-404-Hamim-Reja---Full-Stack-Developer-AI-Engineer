import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import GlobalStyles from '@/components/GlobalStyles';
import MouseEffect from '@/components/MouseEffect';
import HeroSection from '@/Section/HeroSection';
import SkillsSection from '@/Section/SkillsSection';
import PhysicsPlayground from '@/Section/PhysicsPlayground';
import Projects from '@/Section/Projects';
import Experience from '@/Section/Experience';
import AboutAndWriting from '@/Section/AboutAndWriting';
import Contact from '@/Section/Contact';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ProjectCaseStudy from '@/pages/ProjectCaseStudy';

function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Delay slightly to let target component render if navigating from another page
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <SkillsSection />
      <Experience />
      <Projects />
      <AboutAndWriting />
      <Contact />
      {/* <PhysicsPlayground /> */}
    </main>
  );
}

// --- Main App Component ---
// Overflow hidden on parents breaks position: sticky for the inner components.
export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-200 relative transition-colors duration-300">
        <GlobalStyles />
        {/* <MouseEffect /> */}
        <ScrollToHashElement />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:project_name" element={<ProjectCaseStudy />} />
          <Route path="/project/:project_name" element={<ProjectCaseStudy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}
