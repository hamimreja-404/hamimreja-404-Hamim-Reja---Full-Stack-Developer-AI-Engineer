import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  Eye,
  FolderGit2,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Github,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  ImagePlus,
  Layers,
  CheckCircle2,
  Cpu,
  AlertCircle,
  Wrench,
  Maximize2,
  FolderOpenDot,
  ArrowRight,
} from 'lucide-react';
import { PROJECT_CATEGORIES, PROJECTS_DATA } from '@/data/projectsData';

const AUTO_CYCLE_MS = 4500;

const SlideCanvas = ({ slide, projectTitle }) => {
  if (!slide) return null;

  if (slide.type === 'image') {
    return (
      <motion.img
        key={slide.src}
        src={slide.src}
        alt={slide.caption || projectTitle}
        initial={{ opacity: 0.35, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.25 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <motion.div
      key={slide.title}
      initial={{ opacity: 0.35 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.25 }}
      transition={{ duration: 0.28 }}
      className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-slate-50 via-white to-cyan-50/75 p-5 sm:p-7 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/60"
    >
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-mono font-semibold text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300">
          <Cpu className="size-3.5" /> System Architecture
        </span>
        <h4 className="mt-2.5 text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{slide.title}</h4>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">{slide.caption}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        {slide.flow?.map((step, sIdx) => (
          <div
            key={sIdx}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-2xs flex flex-col justify-between dark:border-slate-700 dark:bg-slate-800/90"
          >
            <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">0{sIdx + 1}</span>
            <span className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug">{step}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-slate-200/80 dark:border-slate-800 pt-3">
        {slide.metrics?.map((metric) => (
          <div key={metric.label}>
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{metric.label}</p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{metric.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const LightboxModal = ({ project, initialSlideIdx, onClose }) => {
  const [slideIdx, setSlideIdx] = useState(initialSlideIdx || 0);

  useEffect(() => {
    setSlideIdx(initialSlideIdx || 0);
  }, [project?.id, initialSlideIdx]);

  useEffect(() => {
    if (!project) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setSlideIdx((prev) => (prev + 1) % project.gallery.length);
      if (e.key === 'ArrowLeft') {
        setSlideIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;
  const slides = project.gallery || [];
  const currentSlide = slides[slideIdx] || slides[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-100 bg-white/95 backdrop-blur-md px-6 py-4 dark:border-slate-800 dark:bg-slate-900/95">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${project.badgeClass}`}>
              {project.categoryLabel}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-cyan-500 dark:hover:text-slate-950"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 aspect-[16/9] dark:border-slate-800 dark:bg-slate-950">
            <AnimatePresence mode="wait">
              <SlideCanvas slide={currentSlide} projectTitle={project.title} />
            </AnimatePresence>

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setSlideIdx((prev) => (prev - 1 + slides.length) % slides.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-md backdrop-blur-sm hover:scale-105 transition-transform"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSlideIdx((prev) => (prev + 1) % slides.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-md backdrop-blur-sm hover:scale-105 transition-transform"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm font-medium text-slate-500">{currentSlide?.caption}</p>
            {slides.length > 1 && (
              <div className="flex items-center gap-2 shrink-0">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSlideIdx(idx)}
                    className={`h-11 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                      idx === slideIdx ? 'border-cyan-500 scale-105 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {s.type === 'image' ? (
                      <img src={s.src} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-100 text-[10px] font-mono font-bold text-slate-700">
                        FLOW
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-rose-200/70 bg-rose-50/40 p-4 sm:p-5 dark:border-rose-900/60 dark:bg-rose-950/30">
              <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
                <AlertCircle className="size-4" /> Problem &amp; Context
              </h4>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{project.challenge}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/40 p-4 sm:p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
              <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                <Wrench className="size-4" /> Engineered Solution
              </h4>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{project.solution}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageSlideIdx, setStageSlideIdx] = useState(0);
  const [lightboxProject, setLightboxProject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const visibleProjects =
    activeCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((proj) => proj.category === activeCategory);

  const safeIndex = Math.min(activeIndex, Math.max(0, visibleProjects.length - 1));
  const activeProject = visibleProjects[safeIndex] || visibleProjects[0];
  const slides = activeProject?.gallery || [];
  const currentStageSlide = slides[stageSlideIdx] || slides[0];

  useEffect(() => {
    setActiveIndex(0);
    setStageSlideIdx(0);
  }, [activeCategory]);

  useEffect(() => {
    setStageSlideIdx(0);
  }, [activeProject?.id]);

  // Smooth auto-motion cycling across projects (pauses on hover or modal open)
  useEffect(() => {
    if (isHovered || lightboxProject || visibleProjects.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visibleProjects.length);
    }, AUTO_CYCLE_MS);

    return () => clearInterval(timer);
  }, [isHovered, lightboxProject, visibleProjects.length]);

  const getCategoryCount = (catId) =>
    catId === 'all' ? PROJECTS_DATA.length : PROJECTS_DATA.filter((p) => p.category === catId).length;

  return (
    <section
      id="projects"
      className="relative bg-slate-50 py-20 sm:py-24 lg:py-28 border-t border-slate-200/80 text-slate-900 dark:bg-slate-950 dark:border-slate-800/80 dark:text-slate-100"
    >
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header + Client Reach Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-medium tracking-wide text-cyan-700 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-cyan-300">
              <FolderOpenDot className="size-3.5 text-cyan-600 dark:text-cyan-400" />
              My Works
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Projects
            </h2>

            <p className="text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Production-ready products I’ve architected and shipped, solving real problems for real people.
            </p>
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-200/90 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800">
                <Eye className="size-4" />
              </span>
              <div>
                <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">5k+</p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Real Viewers</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800">
                <Users className="size-4" />
              </span>
              <div>
                <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">15+</p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Live Clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/90 p-2 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
          {PROJECT_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isSelected = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? 'text-white dark:text-slate-950'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="wowProjectFilter"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-slate-900 shadow-xs dark:bg-cyan-400"
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`size-4 ${isSelected ? 'text-cyan-400 dark:text-slate-950' : 'text-slate-400'}`} />
                  <span>{category.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[11px] font-mono leading-none ${
                      isSelected
                        ? 'bg-white/15 text-white dark:bg-slate-950/15 dark:text-slate-950'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {getCategoryCount(category.id)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="space-y-8"
        >
        {/* Desktop WOW Factor: Kinetic Flex-Expanding Accordion Strip */}
        <div className="hidden md:flex gap-3 h-[340px]">
          {visibleProjects.map((project, idx) => {
            const isActive = idx === safeIndex;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  if (isActive) {
                    setLightboxProject(project);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                style={{ flexGrow: isActive ? 3.8 : 0.6 }}
                className={`relative h-full min-w-[46px] lg:min-w-[56px] cursor-pointer overflow-hidden rounded-3xl border transition-[flex-grow,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? `${project.accentBorder} shadow-xl`
                    : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                }`}
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                    isActive ? 'scale-105' : 'scale-100 grayscale-[35%] opacity-90'
                  }`}
                />

                {/* Smooth cinematic gradient overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/15'
                      : 'bg-slate-950/55 hover:bg-slate-950/45'
                  }`}
                />

                {/* Top bar on active slice */}
                <div
                  className={`absolute top-4 left-4 right-4 flex items-center justify-between gap-2 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold shadow-xs ${project.badgeClass}`}>
                    {project.categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-xs backdrop-blur-sm">
                    {project.impactMetric}
                  </span>
                </div>

                {/* Collapsed vertical spine label */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-between py-5 transition-opacity duration-300 ${
                    isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-mono font-bold text-white backdrop-blur-xs">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <span className="whitespace-nowrap -rotate-90 text-xs font-semibold tracking-wider uppercase text-white/95">
                    {project.shortTitle}
                  </span>

                  <span className={`size-2.5 rounded-full ring-2 ring-white/50 ${project.dotClass}`} />
                </div>

                {/* Expanded bottom info on active slice */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-cyan-300">
                        {String(idx + 1).padStart(2, '0')} · {project.year}
                      </span>
                      <h3 className="mt-1 text-xl lg:text-2xl font-bold tracking-tight text-white line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-200 line-clamp-1">{project.subtitle}</p>
                    </div>

                    <Link
                      to={`/${project.slug || project.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 shadow-md transition-transform hover:scale-105"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="size-3.5 text-cyan-600" />
                    </Link>
                  </div>
                </div>

                {/* Live auto-motion progress line along bottom edge of active slice */}
                {isActive && !isHovered && !lightboxProject && visibleProjects.length > 1 && (
                  <motion.div
                    key={`progress-${project.id}-${safeIndex}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTO_CYCLE_MS / 1000, ease: 'linear' }}
                    style={{ transformOrigin: 'left center' }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Project Pill Strip (< md) */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-1">
          {visibleProjects.map((project, idx) => {
            const isActive = idx === safeIndex;

            return (
              <button
                key={`mob-${project.id}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`shrink-0 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950'
                    : 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                {String(idx + 1).padStart(2, '0')} · {project.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Synchronized Live Inspector Stage (Multiple Images + Architecture + Deep Details) */}
        {activeProject && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-7 items-start dark:border-slate-800 dark:bg-slate-900/90"
            >
              {/* Left Stage: Synchronized Multi-Image & Architecture Carousel */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 aspect-[16/10] group dark:border-slate-800 dark:bg-slate-950">
                  <AnimatePresence mode="wait">
                    <SlideCanvas slide={currentStageSlide} projectTitle={activeProject.title} />
                  </AnimatePresence>

                  {/* Fullscreen zoom trigger */}
                  <button
                    type="button"
                    onClick={() => setLightboxProject(activeProject)}
                    title="Open fullscreen gallery"
                    className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-slate-900/75 text-white backdrop-blur-sm transition-transform hover:scale-105"
                  >
                    <Maximize2 className="size-3.5" />
                  </button>

                  {slides.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setStageSlideIdx((prev) => (prev - 1 + slides.length) % slides.length)}
                        aria-label="Previous project image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm hover:scale-105 transition-transform"
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setStageSlideIdx((prev) => (prev + 1) % slides.length)}
                        aria-label="Next project image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm hover:scale-105 transition-transform"
                      >
                        <ChevronRight className="size-4" />
                      </button>

                      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-slate-900/75 px-2.5 py-1 text-[11px] font-mono text-white backdrop-blur-xs">
                        <ImagePlus className="size-3 text-cyan-300" />
                        {stageSlideIdx + 1} / {slides.length}
                      </span>
                    </>
                  )}
                </div>

                {/* Clickable Multi-View Thumbnails */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{currentStageSlide?.caption}</p>

                  {slides.length > 1 && (
                    <div className="flex items-center gap-2 shrink-0">
                      {slides.map((slide, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setStageSlideIdx(sIdx)}
                          className={`h-10 w-14 overflow-hidden rounded-lg border-2 transition-all ${
                            sIdx === stageSlideIdx
                              ? 'border-cyan-500 scale-105 shadow-2xs'
                              : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                          }`}
                        >
                          {slide.type === 'image' ? (
                            <img src={slide.src} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800 text-[9px] font-mono font-bold text-slate-700 dark:text-slate-200">
                              FLOW
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Stage: Summary with Few Points & Direct Case Study Redirect */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold ${activeProject.badgeClass}`}>
                      <span className={`size-1.5 rounded-full ${activeProject.dotClass}`} />
                      {activeProject.categoryLabel}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs font-mono font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {activeProject.impactMetric}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                    {activeProject.subtitle}
                  </p>
                </div>

                {/* Only few high-impact points on Home page */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Highlights
                    </span>
                    <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">
                      Top 3 Overview
                    </span>
                  </div>
                  <ul className="mt-2.5 space-y-2">
                    {activeProject.highlights.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="size-4 shrink-0 text-cyan-600 dark:text-cyan-400 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack (Top 5) */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeProject.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200/90 bg-slate-50 px-2.5 py-1 text-xs font-mono font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                  {activeProject.tech.length > 5 && (
                    <span className="px-2 py-1 text-xs font-mono text-slate-400">
                      +{activeProject.tech.length - 5} more
                    </span>
                  )}
                </div>

                {/* Actions: Direct Case Study Navigation + Live Links */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to={`/${activeProject.slug || activeProject.id}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:-translate-y-0.5 hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  {activeProject.links?.demo && (
                    <a
                      href={activeProject.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}

                  {activeProject.links?.code && (
                    <a
                      href={activeProject.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      <Github className="size-3.5" />
                      <span>Code</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setLightboxProject(activeProject)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <Maximize2 className="size-3.5" />
                    <span>Quick Preview</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxProject && (
          <LightboxModal
            project={lightboxProject}
            initialSlideIdx={stageSlideIdx}
            onClose={() => setLightboxProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
