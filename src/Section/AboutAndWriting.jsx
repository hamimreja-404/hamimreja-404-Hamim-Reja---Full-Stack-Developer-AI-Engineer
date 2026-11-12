import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  Code2,
  GraduationCap,
  ImagePlus,
  Linkedin,
  MapPin,
  PenTool,
  Quote,
  Sparkles,
  User,
} from 'lucide-react';

const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/hamim-reja-a2ba42279/';
const LINKEDIN_POSTS_URL = 'https://www.linkedin.com/in/hamim-reja-a2ba42279/recent-activity/all/';
const PROFILE_IMAGE_URL = '/HeroSection.webp';

// Edit your college/degree details cleanly here
const CREDENTIALS_DATA = {
  degree: 'B.Tech in Electronics & Communication Engineering',
  institution: 'Engineering Undergraduate · Kolkata, India',
  timeline: '2022 — 2026',
  highlights: [
    'Final Year Hardware + AI: Autonomous Drone Navigation (YOLOv10 + Verilog)',
    'Indian Railways (Sealdah Div.) — Signal & Telecommunication Engineering Intern',
  ],
  certifications: [
    'Full-Stack MERN & Next.js Production Systems',
    'AWS Cloud, CI/CD & Technical SEO (95+ Core Web Vitals)',
    'Edge AI, OpenCV & Embedded Hardware Design',
  ],
};

// Three interactive lenses showcasing the different sides of Hamim
const ABOUT_LENSES = [
  {
    id: 'engineer',
    code: '01',
    label: 'The Engineer',
    icon: Code2,
    accentText: 'text-cyan-700',
    accentBg: 'bg-cyan-50 border-cyan-200',
    headline: 'From hardware timing diagrams to zero-downtime cloud deployments.',
    narrative:
      'Started with electronics, Verilog, and railway signaling protocols—then brought that same rigor into Full-Stack MERN, Next.js, and Agentic AI. Currently building production systems as an SDE Trainee at Martian Corporation after converting from a 3-month SDE Internship.',
    points: [
      'Ships clean REST/Node backends, scalable React/Next.js interfaces & Redis/MongoDB data layers',
      'Combines software speed with edge computing, OpenCV vision, and embedded systems fluency',
      'Obsessed with maintainable architecture, Core Web Vitals (95+), and predictable debugging',
    ],
  },
  {
    id: 'partner',
    code: '02',
    label: 'Client & Business',
    icon: Briefcase,
    accentText: 'text-emerald-700',
    accentBg: 'bg-emerald-50 border-emerald-200',
    headline: 'Built for real users, trusted by 15+ clients and 5,000+ viewers.',
    narrative:
      'Good engineering fails if nobody uses it or understands the business goal. Beyond writing code, I handle client discovery, cold outreach, requirement scoping, live technical support, and end-to-end product delivery for coaching institutes and growing businesses.',
    points: [
      'Delivered multi-tenant SaaS & coaching portals actively used by 5k+ students and 15+ clients',
      'Clear communicator across technical teams, non-technical founders, and day-to-day support',
      'Balances rapid feature iteration with SEO growth, analytics, and reliability under real traffic',
    ],
  },
  {
    id: 'writer',
    code: '03',
    label: 'Writer & Visuals',
    icon: PenTool,
    accentText: 'text-indigo-700',
    accentBg: 'bg-indigo-50 border-indigo-200',
    headline: 'Turning complex engineering & product lessons into crisp stories.',
    narrative:
      'I actively write technical blogs and LinkedIn deep-dives while designing and editing custom cover visuals, architecture diagrams, and product graphics—making dense engineering topics effortless to scan and remember.',
    points: [
      'Writes structured breakdowns on full-stack architecture, performance tuning, and Edge AI',
      'Edits bespoke blog banners, visual explainers, and clean UI mockups for stronger engagement',
      'Documents real production learnings openly on LinkedIn for developers and founders',
    ],
  },
];

// Replace `linkedinUrl` and `coverImage` with exact post URLs & your edited blog visuals anytime
const BLOG_POSTS = [
  {
    id: 'saas-5k-scale',
    index: '01',
    tag: 'Production Systems',
    readTime: '4 min read',
    publishedOn: 'LinkedIn Article',
    title: 'Scaling Coaching & Business Portals to 5,000+ Real Users Without Over-Engineering',
    excerpt:
      'Lessons from replacing paper admit cards and messy spreadsheets across 15+ clients using Next.js, RBAC APIs, AWS S3, and automated GitHub Actions pipelines.',
    takeaways: [
      'Designing 3-tier Role-Based Access Control (Superadmin / Admin / Student) cleanly',
      'Cutting PDF & asset delivery latency with S3 pre-signed URLs',
      'Why clear onboarding and support matter as much as clean schema design',
    ],
    visualStyle: 'Edited Cover · System Flow',
    coverImage: 'https://res.cloudinary.com/dm01lhkax/image/upload/v1770918293/Tuition_etgspm.png',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    linkedinUrl: LINKEDIN_POSTS_URL,
  },
  {
    id: 'vitals-seo-playbook',
    index: '02',
    tag: 'Web Performance & SEO',
    readTime: '5 min read',
    publishedOn: 'LinkedIn Post',
    title: 'How I Hit 95+ Core Web Vitals & Technical SEO Scores on Production React Apps',
    excerpt:
      'A visual breakdown of code-splitting, LCP image pipelines, semantic metadata, and eliminating layout shift across real client sites.',
    takeaways: [
      'Auditing hydration bottlenecks and heavy third-party bundles in React/Next.js',
      'Structuring crawlable sitemaps, OpenGraph tags & fast Hero LCP media',
      'Measuring real ranking lifts alongside PageSpeed Insights benchmarks',
    ],
    visualStyle: 'Edited Visual · Speed Audit',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    linkedinUrl: LINKEDIN_POSTS_URL,
  },
  {
    id: 'edge-ai-verilog',
    index: '03',
    tag: 'Edge AI & Hardware',
    readTime: '6 min read',
    publishedOn: 'LinkedIn Deep-Dive',
    title: 'Bridging YOLOv10 Vision with Verilog Hardware for Autonomous Drone Navigation',
    excerpt:
      'Why combining lightweight on-board computer vision with deterministic FPGA/Verilog state logic makes GPS-denied drone flight safer and faster.',
    takeaways: [
      'Quantizing object detection models to sustain real-time edge inference',
      'Handling ultra-low-latency telemetry handoffs between vision & control logic',
      'Translating railway safety & interlocking mindset into autonomous failsafes',
    ],
    visualStyle: 'Custom Diagram · Edge AI',
    coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&auto=format&fit=crop&q=80',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    linkedinUrl: LINKEDIN_POSTS_URL,
  },
  {
    id: 'client-handling-cold-outreach',
    index: '04',
    tag: 'Freelance & Growth',
    readTime: '3 min read',
    publishedOn: 'LinkedIn Note',
    title: 'From Cold Call to Long-Term Client: Engineering Trust Beyond Just Writing Code',
    excerpt:
      'What handling 15+ real clients taught me about clear pricing, fast support loops, visual communication, and shipping solutions businesses actually renew.',
    takeaways: [
      'Turning vague business pain points into concrete 2-week MVP milestones',
      'Using custom edited graphics & live staging previews to win stakeholder buy-in',
      'Building repeat referrals through responsive post-launch support',
    ],
    visualStyle: 'Editorial Graphic · Client Playbook',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    linkedinUrl: LINKEDIN_POSTS_URL,
  },
];

// Compact client trust/outcome cards (swap quotes with exact client testimonials anytime)
const CLIENT_OUTCOMES = [
  {
    id: 'out-1',
    metric: '15+ Clients',
    scope: 'SaaS & Business Delivery',
    quote:
      'Replaced our manual admit card and student records process with a fast automated portal that parents and staff picked up in a day.',
    author: 'Coaching Institute Director',
    context: 'EduTrack Multi-Tenant Portal',
  },
  {
    id: 'out-2',
    metric: '95+ Vitals',
    scope: 'Speed, SEO & Conversion',
    quote:
      'Clean UI, quick turnaround, and clear communication from first call to deployment—our organic visibility and page speed jumped right after launch.',
    author: 'E-Commerce & Web Client',
    context: 'Full-Stack Web & Technical SEO',
  },
  {
    id: 'out-3',
    metric: 'SDE Conversion',
    scope: 'Engineering Execution',
    quote:
      'Consistent sprint ownership, fast debugging under pressure, and structured REST + frontend delivery—converted from SDE Intern to SDE Trainee.',
    author: 'Engineering Delivery Track',
    context: 'Martian Corporation · Production Sprints',
  },
];

const AboutAndWriting = () => {
  const [activeLensId, setActiveLensId] = useState(ABOUT_LENSES[0].id);
  const [activePostIdx, setActivePostIdx] = useState(0);
  const [isWritingHovered, setIsWritingHovered] = useState(false);

  const activeLens = ABOUT_LENSES.find((item) => item.id === activeLensId) || ABOUT_LENSES[0];
  const activePost = BLOG_POSTS[activePostIdx] || BLOG_POSTS[0];

  // Subtle auto-cycle across blog articles (pauses cleanly on hover)
  useEffect(() => {
    if (isWritingHovered) return undefined;
    const timer = setInterval(() => {
      setActivePostIdx((prev) => (prev + 1) % BLOG_POSTS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isWritingHovered]);

  return (
    <section
      id="about-writing"
      className="relative z-20 border-t border-slate-200 bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32 dark:border-slate-800 dark:bg-slate-950/90"
    >
      {/* Subtle architectural background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(6,182,212,0.08), transparent 40%), radial-gradient(circle at 85% 75%, rgba(99,102,241,0.07), transparent 45%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-20">
        {/* ==================== PART 1: ABOUT ME + INTERACTIVE LENS ==================== */}
        <div>
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                <User className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">05 // About &amp; Philosophy</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Behind the Code.
              </h2>
            </div>

            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-cyan-700 dark:border-slate-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            >
              <Linkedin className="size-4 text-cyan-300 dark:text-slate-950" />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Identity Dossier Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-950 p-6 text-white shadow-lg sm:p-7 dark:border-slate-800 dark:bg-slate-900/95">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-slate-800 shadow-md">
                      <img
                        src={PROFILE_IMAGE_URL}
                        alt="Hamim Reja"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-300">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        SDE Trainee @ Martian Corp
                      </span>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Hamim Reja</h3>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-300">
                        <MapPin className="size-3.5 text-cyan-400" />
                        Kolkata, India · Open to Impactful Teams
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="mt-6 grid grid-cols-3 gap-2.5">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Clients</p>
                      <p className="mt-1 text-lg font-bold text-cyan-300">15+</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Viewers</p>
                      <p className="mt-1 text-lg font-bold text-emerald-300">5k+</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Experience</p>
                      <p className="mt-1 text-lg font-bold text-white">11+ Mos</p>
                    </div>
                  </div>

                  {/* Education & Hardware Roots Card */}
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-cyan-300">
                        <GraduationCap className="size-3.5" /> Education
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">{CREDENTIALS_DATA.timeline}</span>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold text-white">{CREDENTIALS_DATA.degree}</p>
                    <p className="text-xs text-slate-400">{CREDENTIALS_DATA.institution}</p>
                  </div>
                </div>

                {/* Bottom Certifications / Milestones */}
                <div className="relative z-10 mt-5 border-t border-white/10 pt-4">
                  <p className="mb-2.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    <Award className="size-3.5 text-amber-300" /> Verified Focus Areas
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {CREDENTIALS_DATA.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive 3-Lens Story Panel (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-slate-50/75 p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900/75">
                <div>
                  {/* Lens Switcher Pills */}
                  <div className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xs dark:border-slate-800 dark:bg-slate-950/70">
                    {ABOUT_LENSES.map((lens) => {
                      const Icon = lens.icon;
                      const isSelected = lens.id === activeLens.id;

                      return (
                        <button
                          key={lens.id}
                          type="button"
                          onClick={() => setActiveLensId(lens.id)}
                          className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                            isSelected
                              ? 'text-white dark:text-slate-950'
                              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                          }`}
                        >
                          {isSelected && (
                            <motion.span
                              layoutId="aboutLensPill"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              className="absolute inset-0 rounded-xl bg-slate-900 shadow-xs dark:bg-cyan-400"
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-1.5">
                            <Icon className={`size-3.5 ${isSelected ? 'text-cyan-400 dark:text-slate-950' : 'text-slate-400'}`} />
                            <span className="font-mono text-[11px] opacity-75">{lens.code}</span>
                            <span>{lens.label}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Animated Story Body */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLens.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24 }}
                      className="mt-7"
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${activeLens.accentBg} ${activeLens.accentText}`}
                      >
                        Perspective // {activeLens.label}
                      </span>

                      <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        {activeLens.headline}
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                        {activeLens.narrative}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {activeLens.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 text-sm text-slate-700 shadow-2xs dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300"
                          >
                            <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${activeLens.accentText}`} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom hardware/internship highlight strip */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <span className="font-mono">
                    Railway Signaling Roots → Full-Stack SDE &amp; Client Execution
                  </span>
                  <a
                    href={LINKEDIN_PROFILE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-cyan-700 hover:text-cyan-800 hover:underline dark:text-cyan-400 dark:hover:text-cyan-300"
                  >
                    Full Story on LinkedIn
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== PART 2: BLOGS, WRITING & LINKEDIN SPOTLIGHT ==================== */}
        <div
          onMouseEnter={() => setIsWritingHovered(true)}
          onMouseLeave={() => setIsWritingHovered(false)}
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 dark:border-indigo-800 dark:bg-indigo-950/60">
                <BookOpen className="size-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-mono text-xs font-medium text-indigo-800 dark:text-indigo-200">
                  Blogs, Technical Writing &amp; Edited Visuals
                </span>
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Notes from Production.
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                Engineering breakdowns, UI/system visuals I designed, and real client playbooks—click any article to
                preview its key takeaways or read it directly on LinkedIn.
              </p>
            </div>

            <a
              href={LINKEDIN_POSTS_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-2xs transition-all hover:border-cyan-300 hover:bg-cyan-50/50 hover:text-cyan-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-500 dark:hover:bg-slate-800"
            >
              <Linkedin className="size-4 text-[#0A66C2] dark:text-cyan-400" />
              <span>All Posts on LinkedIn</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Featured Editorial Card with Visual + Takeaways (7 cols) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePost.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Edited Visual / Blog Banner */}
                  <div className="relative h-60 overflow-hidden bg-slate-900 sm:h-72">
                    <img
                      src={activePost.coverImage}
                      alt={activePost.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

                    <div className="absolute left-5 right-5 top-5 flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur-md ${activePost.badgeClass}`}
                      >
                        {activePost.tag}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/65 px-3 py-1 font-mono text-[11px] text-slate-100 backdrop-blur-md">
                        <ImagePlus className="size-3 text-cyan-300" />
                        {activePost.visualStyle}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="mb-2 flex items-center gap-3 font-mono text-xs text-slate-300">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5 text-cyan-400" />
                          {activePost.readTime}
                        </span>
                        <span>·</span>
                        <span>{activePost.publishedOn}</span>
                      </div>
                      <h4 className="text-xl font-bold leading-snug text-white sm:text-2xl">{activePost.title}</h4>
                    </div>
                  </div>

                  {/* Article Summary + Key Takeaways + Direct LinkedIn Redirect */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">{activePost.excerpt}</p>

                      <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                        <p className="mb-2.5 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <Sparkles className="size-3.5 text-cyan-600 dark:text-cyan-400" /> Inside This Article
                        </p>
                        <ul className="space-y-2">
                          {activePost.takeaways.map((point) => (
                            <li key={point} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 sm:text-sm">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                      <span className="font-mono text-xs text-slate-400">
                        Article {activePost.index} of 0{BLOG_POSTS.length}
                      </span>

                      <a
                        href={activePost.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#0A66C2] dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                      >
                        <Linkedin className="size-4" />
                        <span>Read Full Post on LinkedIn</span>
                        <ArrowUpRight className="size-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Interactive Article Index Stack (5 cols) */}
            <div className="flex flex-col justify-between gap-3 lg:col-span-5">
              {BLOG_POSTS.map((post, idx) => {
                const isSelected = idx === activePostIdx;

                return (
                  <div
                    key={post.id}
                    onClick={() => setActivePostIdx(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActivePostIdx(idx);
                      }
                    }}
                    className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-4 transition-all sm:p-5 ${
                      isSelected
                        ? 'border-cyan-300 bg-cyan-50/45 shadow-sm dark:border-cyan-500/70 dark:bg-cyan-950/35'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-400">{post.index}</span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${post.badgeClass}`}
                          >
                            {post.tag}
                          </span>
                          <span className="font-mono text-[11px] text-slate-400">{post.readTime}</span>
                        </div>

                        <h5
                          className={`mt-2 text-sm font-bold leading-snug sm:text-base ${
                            isSelected
                              ? 'text-slate-950 dark:text-white'
                              : 'text-slate-800 group-hover:text-slate-950 dark:text-slate-200 dark:group-hover:text-white'
                          }`}
                        >
                          {post.title}
                        </h5>
                      </div>

                      <a
                        href={post.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Open post on LinkedIn"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          isSelected
                            ? 'border-cyan-200 bg-white text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white dark:border-cyan-700 dark:bg-slate-900 dark:text-cyan-300'
                            : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    </div>

                    {/* Subtle progress bar on active card while cycling */}
                    {isSelected && !isWritingHovered && (
                      <motion.div
                        key={`blog-progress-${post.id}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 5.5, ease: 'linear' }}
                        style={{ transformOrigin: 'left center' }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== PART 3: CLIENT IMPACT & TRUST ROW ==================== */}
        <div className="border-t border-slate-200/80 pt-14 dark:border-slate-800">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Quote className="size-4 text-cyan-600 dark:text-cyan-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Verified Client &amp; Engineering Outcomes
              </span>
            </div>
            <span className="font-mono text-xs text-slate-400">Real Delivery · Support · Conversion</span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CLIENT_OUTCOMES.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/65 p-5 transition-all hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-cyan-700 dark:hover:bg-slate-900"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1 font-mono text-xs font-bold text-cyan-800 dark:border-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300">
                      {item.metric}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">{item.scope}</span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">&ldquo;{item.quote}&rdquo;</p>
                </div>

                <div className="mt-5 border-t border-slate-200/70 pt-3 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{item.author}</p>
                  <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{item.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAndWriting;

