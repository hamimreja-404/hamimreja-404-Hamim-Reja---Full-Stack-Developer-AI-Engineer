import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Clock, MapPin, CheckCircle2 } from 'lucide-react';

const EXPERIENCES = [
  {
    id: 'martian-trainee',
    year: '2026',
    yearSuffix: '26',
    period: 'Oct 2026 - Present',
    start: [2026, 10],
    end: null,
    isCurrent: true,
    role: 'SDE Trainee',
    company: 'Martian Corporation',
    type: 'Traineeship',
    mode: 'On-site',
    accentDot: 'bg-cyan-500 ring-cyan-500/25',
    accentGradient: 'from-slate-900 via-cyan-700 to-cyan-500',
    accentBar: 'bg-cyan-500',
    accentBadge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    accentIcon: 'text-cyan-600',
    activeBorder: 'border-cyan-300/90 shadow-md',
    tags: ['Next.js',
      'React.js',
      'Node.js',
      'MongoDB',
      'Razorpay',
      'Brevo',
      'Google Analytics',
      'Vercel',
      'SEO',
      'Production Support',],
    points: [
      'Own end-to-end development and maintenance of 5+ production web apps serving 1,000s of daily users, keeping them live 24x7.',
      'Ship new features and fix production bugs from client requirements, with weekly progress reports and direct client communication.',
      'Integrated Razorpay payments, Brevo email services, Google Analytics and Meta Pixel across live projects.',
      'Drive genuine client leads by writing technical blogs and managing LinkedIn, Google and Medium profiles.',
    ],
  },
  {
    id: 'martian-intern',
    year: '2026',
    yearSuffix: '26',
    period: 'Jul 2026 - Sep 2026',
    start: [2026, 7],
    end: [2026, 9],
    role: 'SDE Intern',
    company: 'Martian Corporation',
    duration: '3 Months',
    type: 'Internship',
    mode: "On-site",
    accentDot: 'bg-sky-500 ring-sky-500/25',
    accentGradient: 'from-slate-900 via-sky-700 to-sky-500',
    accentBar: 'bg-sky-500',
    accentBadge: 'bg-sky-50 text-sky-700 border-sky-200',
    accentIcon: 'text-sky-600',
    activeBorder: 'border-sky-300/90 shadow-md',
    tags: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'WebSockets',
      'WebRTC',
      'STUN / TURN Server',
      'Razorpay',
      'Brevo',
      'RBAC',
      'EER / DFD',
      'Geolocation',
      'Excel Export',
      'System Design',
      'Figma',],
    points: [
      'Built AttendSync, an attendance platform with Admin and Employee dashboards, owned end to end from design to production.',
      'Admins manage employees, locations, shifts, holidays and Excel reports. Employees punch in/out via live location.',
      'Architected and shipped a live doctor consultation platform, from EER diagram and Data Flow diagram to Figma UI, with a mobile-first 3-step booking flow.',
      'Added Razorpay payments, custom slot durations and doctor revenue and booking controls.',
      'Implemented WebSocket chat and WebRTC audio/video calls with a STUN / TURN server, plus digital prescriptions and patient history.',
    ],
  },
  {
    id: 'starium',
    year: '2025',
    yearSuffix: '25',
    shortLabel: 'Starium',
    period: 'Sep 2025 - Nov 2025',
    start: [2025, 9],
    end: [2025, 11],
    role: 'Full-Stack Intern',
    company: 'Starium Infotech',
    type: 'Remote',
    mode: 'Remote',
    duration: '2 Months',
    accentDot: 'bg-indigo-500 ring-indigo-500/25',
    accentGradient: 'from-slate-900 via-indigo-700 to-indigo-500',
    accentBar: 'bg-indigo-500',
    accentBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentIcon: 'text-indigo-600',
    activeBorder: 'border-indigo-300/90 shadow-md',
    tags: ['React.js',
      'Tailwind CSS',
      'Figma to Code',
      'REST APIs',
      'Performance Optimization',
      'E-commerce',],
    points: [
      'Converted Figma designs into pixel-accurate, responsive React interfaces for an e-commerce website.',
      'Built reusable product cards and a product detail page, with backend integration for product data.',
      'Optimized performance with image optimization and lazy loading, achieving very low load times, and delivered under mentor code reviews.',
    ],
  },
  {
    id: 'indian-railways',
    year: '2025',
    yearSuffix: '25',
    shortLabel: 'Railways',
    period: 'Jun - Jul 2025',
    start: [2025, 6],
    end: [2025, 7],
    role: 'Signal & Telecom Intern',
    duration: '1 Month',
    company: 'Indian Railways (Sealdah Div.)',
    mode: 'On-Site',
    accentDot: 'bg-emerald-500 ring-emerald-500/25',
    accentGradient: 'from-slate-900 via-emerald-700 to-emerald-500',
    accentBar: 'bg-emerald-500',
    accentBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentIcon: 'text-emerald-600',
    activeBorder: 'border-emerald-300/90 shadow-md',
    tags: ['Railway Signalling',
  'Telecommunication',
  'Indian Railways',
  'Systems Analysis', 'MSDAC'],
    points: [
'Studied railway signalling systems at Sealdah Division, Indian Railways, covering signal types, their aspects and how each operates in train movement.',
  'Analysed relay-based interlocking and signalling mechanisms and how they work in practice, under the guidance of Signal & Telecommunication engineers.',
    ],
  },
];

const getRoleDurationMonths = (start, end, now = new Date()) => {
  const [startYear, startMonth] = start;
  const endYear = end ? end[0] : now.getFullYear();
  const endMonth = end ? end[1] : now.getMonth() + 1;
  return Math.max(1, (endYear - startYear) * 12 + (endMonth - startMonth) + 1);
};

const formatDuration = (totalMonths) => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} ${months === 1 ? 'Month' : 'Months'}`;
  }
  if (months === 0) {
    return `${years} ${years === 1 ? 'Year' : 'Years'}`;
  }
  return `${years} ${years === 1 ? 'Yr' : 'Yrs'} ${months} ${months === 1 ? 'Mo' : 'Mos'}`;
};

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);

  const totalDurationLabel = useMemo(() => {
    const now = new Date();
    const months = EXPERIENCES.reduce(
      (sum, exp) => sum + getRoleDurationMonths(exp.start, exp.end, now),
      0
    );

    return formatDuration(months);
  }, []);

  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((node, idx) => {
      if (!node || typeof IntersectionObserver === 'undefined') return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(idx);
            }
          });
        },
        { rootMargin: '-38% 0px -38% 0px', threshold: 0.05 }
      );

      observer.observe(node);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const activeExp = EXPERIENCES[activeIndex] || EXPERIENCES[0];

  return (
    <section
      id="experience"
      className="relative bg-slate-50 py-20 sm:py-24 lg:py-28 border-t border-slate-200/80 text-slate-900 dark:bg-slate-950 dark:border-slate-800/80 dark:text-slate-100"
    >
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Hand Side: Header + Total Experience + Animated Year */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-medium tracking-wide text-cyan-700 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-cyan-300">
              <Briefcase className="size-3.5 text-cyan-600 dark:text-cyan-400" />
              Career Timeline
            </div>

            <div className="space-y-2.5">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Experience
              </h2>
              <p className="text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                End-to-end ownership: system architecture, development and production maintenance for thousands of users.
              </p>
            </div>

            {/* Total Experience Row */}
            <div className="flex items-center justify-between border-y border-slate-200/80 py-3.5 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100/80 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800">
                  <Clock className="size-3.5" />
                </span>
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Total Experience
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {totalDurationLabel}
                </span>
              </div>
            </div>

            {/* Left-aligned Editorial Year Display (GreetingWord transition, no card box) */}
            <div className="pt-3 space-y-3 select-none">
              <div className="flex items-center gap-3">
                <span className={`h-0.5 w-8 rounded-full transition-colors duration-300 ${activeExp.accentBar}`} />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Milestone Year
                </span>
              </div>

              <div className="flex items-baseline leading-none text-[84px] sm:text-[108px] lg:text-[128px] font-black tracking-[-0.04em]">
                <span className="text-slate-300/90 dark:text-slate-700/80">20</span>

                <div className="inline-grid justify-items-start overflow-hidden">
                  {EXPERIENCES.map((exp) => (
                    <span
                      key={`sizer-${exp.id}`}
                      className="invisible col-start-1 row-start-1 leading-none whitespace-nowrap"
                      aria-hidden="true"
                    >
                      {exp.yearSuffix}
                    </span>
                  ))}

                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={activeExp.year}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className={`col-start-1 row-start-1 inline-block leading-none bg-gradient-to-br bg-clip-text text-transparent dark:from-white ${activeExp.accentGradient}`}
                    >
                      {activeExp.yearSuffix}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hand Side: Vertical Timeline Cards */}
          <div className="lg:col-span-7 relative pl-9 sm:pl-11 space-y-6">
            {/* Continuous Timeline Rail */}
            <div
              aria-hidden="true"
              className="absolute top-4 bottom-4 left-[15px] sm:left-[17px] w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-400/75 to-emerald-400/70"
            />

            {EXPERIENCES.map((exp, idx) => {
              const isActive = idx === activeIndex;

              return (
                <motion.article
                  key={exp.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.06, 0.2), ease: [0.22, 1, 0.36, 1] }}
                  className={`relative rounded-3xl border bg-white/95 p-6 sm:p-7 transition-all duration-300 dark:bg-slate-900/85 ${isActive
                      ? exp.activeBorder
                      : 'border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:hover:border-slate-700'
                    }`}
                >
                  {/* Timeline Milestone Node */}
                  <div className="absolute -left-[29px] sm:-left-[35px] top-7">
                    <span
                      className={`block size-4.5 w-[18px] h-[18px] rounded-full border-[3px] border-white dark:border-slate-950 shadow-sm transition-transform duration-300 ${isActive ? `scale-110 ring-4 ${exp.accentDot}` : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                    />
                  </div>

                  {/* Role & Company Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                          {exp.role}
                        </h3>
                        {exp.isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Current
                          </span>
                        ) : exp.duration ? (
                          <span className="inline-flex items-center rounded-md border border-slate-200/90 bg-slate-100/90 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {exp.duration}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm sm:text-base">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{exp.company}</span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                          <MapPin className="size-3.5 text-slate-400 dark:text-slate-500" />
                          {exp.mode}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-medium self-start ${exp.accentBadge}`}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 mb-5">
                    {exp.points.map((pt, ptIdx) => (
                      <li
                        key={ptIdx}
                        className="flex items-start gap-3 text-[14px] sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2 className={`size-4 shrink-0 mt-1 ${exp.accentIcon}`} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Key Highlights Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-slate-200/90 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
