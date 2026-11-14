import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Download,
  ExternalLink,
  Eye,
  Github,
  ImagePlus,
  Layers,
  Maximize2,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { getProjectBySlug, PROJECTS_DATA } from '@/data/projectsData';

const LightboxModal = ({ project, initialSlideIdx, onClose }) => {
  const slides = project.gallery || [];
  const [slideIdx, setSlideIdx] = useState(initialSlideIdx || 0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setSlideIdx((prev) => (prev - 1 + slides.length) % slides.length);
      }
      if (e.key === 'ArrowRight') {
        setSlideIdx((prev) => (prev + 1) % slides.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose]);

  const currentSlide = slides[slideIdx];

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h4 className="text-base font-bold text-white">{project.title}</h4>
            <p className="text-xs text-slate-400">
              {currentSlide?.caption || (currentSlide?.type === 'architecture' ? 'System Architecture' : 'Visual Preview')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-slate-950 p-4">
          {currentSlide?.type === 'image' ? (
            <img
              src={currentSlide.src}
              alt={currentSlide.caption || project.title}
              className="max-h-[65vh] w-auto max-w-full rounded-xl object-contain shadow-lg"
            />
          ) : (
            <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-mono text-cyan-300">
                <Cpu className="size-3.5" /> System Architecture
              </span>
              <h5 className="mt-3 text-xl font-bold">{currentSlide?.title}</h5>
              <p className="mt-1 text-sm text-slate-300">{currentSlide?.caption}</p>

              <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {currentSlide?.flow?.map((step, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <span className="font-mono text-xs font-bold text-cyan-400">0{idx + 1}</span>
                    <p className="mt-1 text-xs font-semibold text-slate-200">{step}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                {currentSlide?.metrics?.map((m) => (
                  <div key={m.label}>
                    <p className="font-mono text-[10px] uppercase text-slate-400">{m.label}</p>
                    <p className="text-sm font-bold text-white">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/30"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/30"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-slate-900/90 px-6 py-3">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlideIdx(i)}
                className={`h-2 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ProjectCaseStudy() {
  const { project_name } = useParams();
  const navigate = useNavigate();

  const project = getProjectBySlug(project_name);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Automatically scroll to the top of the case study page when navigating
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveSlideIdx(0);
  }, [project_name]);

  if (!project) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <span className="font-mono text-xs uppercase tracking-wider text-slate-400">404 // Case Study</span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Project Not Found
        </h2>
        <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-400">
          The requested case study &ldquo;{project_name}&rdquo; could not be found or has been moved.
        </p>
        <Link
          to="/#projects"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
        >
          <ArrowLeft className="size-4" /> Back to All Projects
        </Link>
      </div>
    );
  }

  // Find index for next/previous pagination
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : null;

  const slides = project.gallery || [];
  const currentSlide = slides[activeSlideIdx] || slides[0];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Subtle architectural ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 10%, rgba(6,182,212,0.12), transparent 40%), radial-gradient(circle at 88% 30%, rgba(99,102,241,0.1), transparent 45%)',
        }}
      />

      {/* Top Floating / Sticky Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link
            to="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:border-cyan-300 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-700 dark:hover:text-cyan-300"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center gap-2">
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${project.badgeClass}`}
            >
              <span className={`size-1.5 rounded-full ${project.dotClass}`} />
              {project.categoryLabel}
            </span>

            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
              >
                <span>Live Demo</span>
                <ExternalLink className="size-3" />
              </a>
            )}

            {project.links?.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <Github className="size-3.5" />
                <span className="hidden sm:inline">Source</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Case Study Content Container */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 space-y-12">
        {/* ==================== 01: HERO & METRICS HEADER ==================== */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${project.badgeClass}`}
            >
              <span className={`size-1.5 rounded-full ${project.dotClass}`} />
              {project.categoryLabel}
            </span>

            <span className="rounded-full border border-slate-200/90 bg-white px-3 py-1 font-mono text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              {project.year}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
              <Sparkles className="size-3" />
              {project.impactMetric}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {project.subtitle}
          </p>

          {/* Quick Metrics & Highlights Strip */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 border-y border-slate-200/90 dark:border-slate-800 py-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Timeline</p>
              <p className="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">{project.year}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Category</p>
              <p className="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">{project.categoryLabel}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Primary Impact</p>
              <p className="mt-1 text-sm sm:text-base font-bold text-cyan-600 dark:text-cyan-400 truncate">
                {project.impactMetric.split('·')[0] || project.impactMetric}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Stack Count</p>
              <p className="mt-1 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {project.tech.length} Core Technologies
              </p>
            </div>
          </div>
        </section>

        {/* ==================== 02: VISUAL STAGE & GALLERY ==================== */}
        {slides.length > 0 && (
          <section className="space-y-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-900 shadow-xl dark:border-slate-800">
              {currentSlide?.type === 'image' ? (
                <img
                  src={currentSlide.src}
                  alt={currentSlide.caption || project.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-10 text-white">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-300">
                      <Cpu className="size-3.5" /> Architecture Deep-Dive
                    </span>
                    <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{currentSlide.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{currentSlide.caption}</p>
                  </div>

                  <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {currentSlide.flow?.map((step, idx) => (
                      <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <span className="font-mono text-xs font-bold text-cyan-400">0{idx + 1}</span>
                        <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-100">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                    {currentSlide.metrics?.map((m) => (
                      <div key={m.label}>
                        <p className="font-mono text-[10px] uppercase text-slate-400">{m.label}</p>
                        <p className="text-sm sm:text-base font-bold text-white">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fullscreen Zoom Pill */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                title="View Fullscreen"
                className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-transform hover:scale-105"
              >
                <Maximize2 className="size-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Fullscreen</span>
              </button>

              {/* Slide Navigation Arrows */}
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveSlideIdx((prev) => (prev - 1 + slides.length) % slides.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur-md transition-transform hover:scale-105"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSlideIdx((prev) => (prev + 1) % slides.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur-md transition-transform hover:scale-105"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Selector Strip */}
            {slides.length > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{currentSlide?.caption}</p>

                <div className="flex items-center gap-2">
                  {slides.map((slide, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlideIdx(idx)}
                      className={`h-12 w-16 overflow-hidden rounded-xl border-2 transition-all ${
                        idx === activeSlideIdx
                          ? 'border-cyan-500 scale-105 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {slide.type === 'image' ? (
                        <img src={slide.src} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-900 font-mono text-[10px] font-bold text-cyan-300">
                          FLOW
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ==================== 03: DEEP-DIVE EDITORIAL BREAKDOWN ==================== */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          {/* Left Column: Problem & Engineering Solution (7 cols) */}
          <div className="space-y-8 lg:col-span-7">
            {/* The Challenge */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                01 // The Problem &amp; Challenge
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                What gap was this built to solve?
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {project.challenge}
              </p>
            </div>

            {/* The Architectural Solution */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                02 // The Engineering Solution
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                How it was architected and delivered
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {project.solution}
              </p>
            </div>

            {/* Complete Highlights List */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                03 // Technical Highlights &amp; Outcomes
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Key accomplishments &amp; design decisions
              </h2>

              <ul className="mt-5 space-y-3.5">
                {project.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Tech Stack & Action Sidebar (5 cols) */}
          <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-24">
            {/* Tech Stack Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                04 // Technologies &amp; Tools
              </span>
              <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">System Stack</h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Launch & Source Actions Card */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                05 // Project Links &amp; Deliverables
              </span>

              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-full items-center justify-between rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="size-4" />
                    <span>Open Live Demo</span>
                  </span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}

              {project.links?.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <span className="flex items-center gap-2">
                    <Github className="size-4" />
                    <span>View Source Code</span>
                  </span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}

              {project.links?.download && (
                <a
                  href={project.links.download}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-full items-center justify-between rounded-2xl border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-800 transition-all hover:bg-cyan-100 dark:border-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300"
                >
                  <span className="flex items-center gap-2">
                    <Download className="size-4" />
                    <span>{project.links.downloadLabel || 'Download Assets'}</span>
                  </span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}

              {project.links?.note && (
                <p className="pt-2 text-xs italic leading-relaxed text-slate-500 dark:text-slate-400">
                  {project.links.note}
                </p>
              )}
            </div>

            {/* Quick Contact Box */}
            <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white shadow-md">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                Questions on this architecture?
              </span>
              <h4 className="mt-1 text-lg font-bold">Discuss this system with Hamim</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Available to walk through the system design, code patterns, and production trade-offs in an interview.
              </p>
              <Link
                to="/#contact"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition-colors hover:bg-cyan-400"
              >
                <span>Initiate Contact</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== 04: PREV / NEXT CASE STUDY PAGINATION ==================== */}
        <section className="border-t border-slate-200/90 pt-8 dark:border-slate-800">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {prevProject ? (
              <Link
                to={`/${prevProject.slug || prevProject.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                    <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                    Previous Case Study
                  </span>
                  <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                    {prevProject.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{prevProject.subtitle}</p>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-slate-400 dark:border-slate-800 text-xs font-mono">
                First Project in Portfolio
              </div>
            )}

            {nextProject ? (
              <Link
                to={`/${nextProject.slug || nextProject.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 text-right shadow-2xs transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <span className="flex items-center justify-end gap-1.5 font-mono text-xs text-slate-400">
                    Next Case Study
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                    {nextProject.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{nextProject.subtitle}</p>
                </div>
              </Link>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-5 text-right text-slate-400 dark:border-slate-800 text-xs font-mono">
                Latest Project in Portfolio
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <LightboxModal
          project={project}
          initialSlideIdx={activeSlideIdx}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

