import React from 'react';
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

// --- Main App Component ---
// Overflow hidden on parents breaks position: sticky for the inner components.
export default function App() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-900 dark:selection:text-cyan-200 relative transition-colors duration-300">
      <GlobalStyles />
      {/* <MouseEffect /> */}

      <main className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <Experience />
        <Projects />
        <AboutAndWriting />
        <Contact />
        {/* <PhysicsPlayground /> */}
      </main>

      <ScrollToTopButton />
    </div>
  );
}
