import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  CheckCircle2,
  ExternalLink,
  Github,
  Activity,
  Terminal,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  SlidersHorizontal,
  AlertCircle,
  Wrench,
} from 'lucide-react';
import { PROJECT_CATEGORIES, PROJECTS_DATA } from '@/data/projectsData';

const AUTO_CYCLE_MS = 6000;

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' | 'grid'

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const safeIndex = Math.min(activeIndex, Math.max(0, filteredProjects.length - 1));
  const activeProject = filteredProjects[safeIndex] || filteredProjects[0];

  // Auto cycle active project when not hovering (in interactive mode)
  useEffect(() => {
    if (viewMode !== 'interactive' || isHovered || filteredProjects.length <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
    }, AUTO_CYCLE_MS);

    return () => clearInterval(timer);
  }, [viewMode, isHovered, filteredProjects.length]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setActiveIndex(0);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section 
      id="projects" 
      aria-label="Engineered Software Projects and Production Systems"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative bg-slate-50/50 py-20 sm:py-24 lg:py-28 border-t border-slate-200/80 text-slate-900 dark:bg-slate-950 dark:border-slate-800/80 dark:text-slate-100"
    >
      <meta itemProp="name" content="Production Software Engineering Projects" />
      <meta itemProp="description" content="High-impact software engineering projects, distributed backend architectures, and real-time platforms engineered by Hamim Reja." />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Unified with Hero and Skills styling) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-medium tracking-wide text-cyan-700 dark:border-slate-800 dark:bg-slate-900 dark:text-cyan-300">
              <Terminal className="size-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Production Systems &amp; Engineering</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured <span className="text-cyan-600 dark:text-cyan-400">Projects</span>
            </h2>

            <p className="max-w-2xl text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Internal client dashboards, production platforms, and edge systems. 
              Real-world engineering challenges solved through scalable architecture and resilient feature delivery.
            </p>
          </div>

          {/* View Mode Toggle: Interactive Spec Console vs Uniform Grid */}
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-xl p-1 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'interactive'
                    ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <SlidersHorizontal className="size-3.5" />
                <span>Interactive View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="size-3.5" />
                <span>All Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 pb-2 mb-8">
          {PROJECT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? PROJECTS_DATA.length
                : PROJECTS_DATA.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 ring-2 ring-slate-900/10 dark:ring-cyan-400/30'
                    : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="size-4" />
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white dark:bg-slate-950/20 dark:text-slate-950'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* MODE 1: CYLINDRICAL EXPANDING ACCORDION + CONTEXT + 2-COLUMN FEATURES + BOTTOM TECH */}
        {viewMode === 'interactive' && (
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="space-y-6"
          >
            {/* Desktop Kinetic Cylindrical Slices (Collapsed: Category Only; Expanded: Name & Category) */}
            <div className="hidden md:flex gap-3 h-[270px]">
              {filteredProjects.map((project, idx) => {
                const isActive = idx === safeIndex;

                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    style={{ flexGrow: isActive ? 3.6 : 0.6 }}
                    className={`relative h-full min-w-[56px] lg:min-w-[64px] cursor-pointer overflow-hidden rounded-3xl border transition-[flex-grow,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? 'border-cyan-500 bg-white dark:bg-slate-900 ring-2 ring-cyan-500/20'
                        : 'border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/60 hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 hover:bg-white dark:hover:bg-slate-900'
                    }`}
                  >
                    {/* COLLAPSED STATE: Only Category + Index + Dot */}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-between py-6 transition-opacity duration-300 ${
                        isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                      }`}
                    >
                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      {/* Rotated Vertical Category Label */}
                      <span className="whitespace-nowrap -rotate-90 text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 select-none">
                        {project.categoryLabel}
                      </span>

                      <span className={`size-2.5 rounded-full ${project.dotClass}`} />
                    </div>

                    {/* EXPANDED STATE: Shows Name & Category */}
                    <div
                      className={`absolute inset-0 p-6 flex flex-col justify-between transition-all duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {/* Top: Category Pill + Year */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${project.badgeClass}`}>
                          <span className={`size-1.5 rounded-full ${project.dotClass}`}></span>
                          {project.categoryLabel}
                        </span>
                        <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                          {project.year}
                        </span>
                      </div>

                      {/* Center: Large Project Name & Metric */}
                      <div className="space-y-2">
                        {/* <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block">
                          Project 0{idx + 1}
                        </span> */}
                        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                          {project.shortTitle}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                          {project.impactMetric}
                        </p>
                      </div>

                      {/* Bottom Active Progress Line */}
                      <div className="relative pt-2">
                        <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <motion.div
                            key={`prog-${project.id}-${safeIndex}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: AUTO_CYCLE_MS / 1000, ease: 'linear' }}
                            style={{ transformOrigin: 'left' }}
                            className="h-full bg-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Cylindrical Strip (< md): Horizontal scroll */}
            <div className="flex md:hidden gap-2.5 overflow-x-auto pb-2">
              {filteredProjects.map((project, idx) => {
                const isActive = idx === safeIndex;

                return (
                  <button
                    key={`mob-${project.id}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`shrink-0 rounded-2xl border px-4 py-3 text-left transition-all ${
                      isActive
                        ? 'border-cyan-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white ring-2 ring-cyan-500/20'
                        : 'border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400">
                        0{idx + 1}
                      </span>
                      <span className={`size-1.5 rounded-full ${project.dotClass}`} />
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                        {project.categoryLabel}
                      </span>
                    </div>
                    {isActive && (
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
                        {project.shortTitle}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* THE CARD SECTION: CONTEXT HOOK + 2-COLUMN FEATURES + BOTTOM TECH STACK */}
            {activeProject && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/95 p-6 sm:p-8 space-y-6"
                >
                  {/* Top Bar of the Card: Title, Impact Metric & Action Links */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`size-2 rounded-full ${activeProject.dotClass}`} />
                        <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                          {activeProject.categoryLabel}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {activeProject.title}
                      </h3>
                    </div>

                    {/* Action Links & Project Switcher Buttons */}
                    <div className="flex items-center gap-3 shrink-0">
                      {activeProject.links?.live || activeProject.links?.demo ? (
                        <a
                          href={activeProject.links.live || activeProject.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-700 hover:bg-cyan-600 text-white transition-colors cursor-pointer"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="size-3.5" />
                        </a>
                      ) : activeProject.links?.code && (
                        <a
                          href={activeProject.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 transition-colors cursor-pointer"
                        >
                          <span>GitHub Source</span>
                          <Github className="size-3.5" />
                        </a>
                      )}

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handlePrev}
                          title="Previous Project"
                          className="size-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          title="Next Project"
                          className="size-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Context & Client Problem Box (Gives instant meaning to the reviewer) */}
                  <div className="rounded-2xl border border-slate-200/85 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 p-4 sm:p-5">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-8 space-y-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <AlertCircle className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                          Problem
                        </span>
                        <p className="text-xs sm:text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">
                          {activeProject.challenge}
                        </p>
                      </div>

                      <div className="md:col-span-4 md:border-l md:border-slate-200 dark:md:border-slate-700/80 md:pl-4 space-y-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <Activity className="size-3.5 text-emerald-500" />
                          Measurable Outcome
                        </span>
                        <p className="text-xs sm:text-[13px] font-semibold text-slate-900 dark:text-white leading-snug">
                          {activeProject.impactMetric}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2-COLUMN FEATURES SECTION (5-6 Features in 2 balanced columns) */}
                  <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-cyan-600 dark:text-cyan-400">
                          <Cpu className="size-4" />
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          Key Engineered Features
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 rounded-full font-semibold">
                        {activeProject.features?.length || 6} System Features
                      </span>
                    </div>

                    {/* 2 Columns of Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 pt-1">
                      {activeProject.features?.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-snug">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM: TECHNOLOGY STACK */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-2 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <Layers className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>Technology Stack:</span>
                      </div>
                      {activeProject.tech?.map((t) => (
                        <span
                          key={t}
                          className="rounded-xl border border-slate-200/90 bg-white px-3 py-1 text-xs font-mono font-medium text-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                      System 0{safeIndex + 1} of 0{filteredProjects.length}
                    </span>
                  </div>

                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )}

        {/* MODE 2: UNIFORM FIXED-HEIGHT CARDS (CONTEXT + FEATURES + BOTTOM TECH) */}
        {viewMode === 'grid' && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => {
                const liveLink = project.links?.live || project.links?.demo;
                const codeLink = project.links?.code;

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="group relative flex flex-col justify-between h-[510px] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/95 p-5 sm:p-6 hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 transition-all duration-200 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Top: Category & Name */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${project.badgeClass}`}>
                          <span className={`size-1.5 rounded-full ${project.dotClass}`}></span>
                          {project.categoryLabel}
                        </span>
                        <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1" title={project.title}>
                        {project.title}
                      </h3>

                      {/* Brief Problem Context */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    {/* Middle: Features (Top 4 in grid) */}
                    <div className="my-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/50 p-3.5 border border-slate-200/70 dark:border-slate-800/80">
                      <div className="flex items-center gap-1.5 mb-2 text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                        <Cpu className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>Key Engineered Features</span>
                      </div>
                      <ul className="space-y-1.5">
                        {project.features?.slice(0, 4).map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                            <CheckCircle2 className="size-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom: Tech Stack & Action Link */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.tech?.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech?.length > 5 && (
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400 dark:text-slate-500">
                            +{project.tech.length - 5}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        {liveLink ? (
                          <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer"
                          >
                            <span>Live System</span>
                            <ExternalLink className="size-3.5" />
                          </a>
                        ) : codeLink ? (
                          <a
                            href={codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 transition-colors cursor-pointer"
                          >
                            <span>GitHub Source</span>
                            <Github className="size-3.5" />
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100/90 dark:bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-200/70 dark:border-slate-700/60 truncate">
                            <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                            <span className="truncate">Production Platform</span>
                          </div>
                        )}

                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                          SDE Verified
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Projects;
