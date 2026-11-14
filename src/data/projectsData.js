import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  Layers,
  Users,
} from 'lucide-react';

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'startup', label: 'Startup & SaaS', icon: Users },
  { id: 'support', label: 'Production Engineering', icon: FolderGit2 },
  { id: 'internship', label: 'Full-Stack SDE (Internship)', icon: Briefcase },
  { id: 'final-year', label: 'Edge AI & Embedded Systems', icon: GraduationCap },
];

export const PROJECTS_DATA = [
  // ───────────── 01 · STARTUP / FLAGSHIP ─────────────
  {
    id: 'wedding-invites-startup',
    slug: 'digital-nimantran',
    category: 'startup',
    categoryLabel: 'Startup & SaaS',
    shortTitle: 'Digital Nimantran',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
    dotClass: 'bg-emerald-500',
    accentBorder: 'border-emerald-300',
    title: 'Digital Nimantran — Bengali-First Invitation SaaS',
    subtitle: 'Sole Founder & Full-Stack SDE: Bootstrapped, architected, and monetized an event SaaS to 4,000+ organic users and 15+ paying clients with ₹0 ad spend.',
    impactMetric: '4,000+ Users · 15+ Clients · ₹0 Ads · 500% ROI',
    year: '2026 — Present',
    coverImage: '/Projects/DigitalNimantran/1.webp',
    tech: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Technical SEO', 'Vercel'],
    challenge:
      'Cultural ceremonies and language nuances were completely absent in generic invitation tools, forcing families to rely on chaotic WhatsApp texts and manual paper RSVP lists.',
    solution:
      'Sole Founder & Lead Engineer — architected the entire product from scratch: responsive ritual-first invitation templates, real-time RSVP tracking pipelines, dynamic mapping, and an SEO-first SSR architecture.',
    highlights: [
      'Problem: Chaotic guest management. Built an automated RSVP tracking pipeline with instant headcount confirmation and live location mapping.',
      'Role: Sole creator owning the entire lifecycle—market validation, UI/UX in Figma, MongoDB schema design, Next.js SSR build, and deployment.',
      'Tech Stack: Next.js, React.js, Node.js, MongoDB, Tailwind CSS, Vercel Edge Network, and Technical SEO.',
      'Result: Scaled organically to [4,000+ unique visitors] and [15+ paying clients] within [3 months] with [₹0 marketing spend], yielding [500% ROI].',
    ],
    gallery: [
      {
        type: 'image',
        src: '/Projects/DigitalNimantran/1.webp',
        caption: 'Bengali wedding invitation template with ritual sections',
      },
      {
        type: 'image',
        src: '/Projects/DigitalNimantran/2.webp',
        caption: 'Traditional event timeline and custom ceremony schedule',
      },
      {
        type: 'image',
        src: '/Projects/DigitalNimantran/3.webp',
        caption: 'Guest RSVP collection and interactive location mapping',
      },
      {
        type: 'image',
        src: '/Projects/DigitalNimantran/4.webp',
        caption: 'Mobile-first responsive presentation optimized for instant WhatsApp sharing',
      },
      {
        type: 'architecture',
        title: 'Product Growth Loop',
        caption: 'From community cultural gap to profitable organic growth',
        flow: [
          'Bengali Cultural Niche',
          'Ritual-Rich Templates + RSVP',
          'SEO-Optimised SSR Pages',
          'Organic Views → 15+ Clients',
        ],
        metrics: [
          { label: 'Organic Views', value: '4k+' },
          { label: 'Real Clients', value: '15+' },
          { label: 'Ad Spend', value: '₹0' },
        ],
      },
    ],
    links: {
      demo: 'https://digitalnimantran.in/',
    },
  },

  // ───────────── 02 · OFFICE / PRODUCTION MAINTENANCE ─────────────
  {
    id: 'prantik-educare',
    slug: 'prantik-educare',
    category: 'support',
    categoryLabel: 'Production Engineering',
    shortTitle: 'Prantik Educare',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'Prantik Educare — EdTech Production Platform & Telemetry',
    subtitle: 'Production SDE: Sustained 99.9% uptime, built responsive academic modules, and integrated end-to-end GA4/Meta event telemetry for 1,000+ daily learners.',
    impactMetric: '[1,000+ Daily Users] · 99.9% Uptime · <2h Issue SLA',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'GA4', 'Meta Pixel', 'REST APIs', 'Technical SEO'],
    challenge:
      'A high-traffic regional EdTech platform experienced unmonitored checkout/exam drop-offs, intermittent layout shifts, and needed sub-2-hour turnaround for live student tickets.',
    solution:
      'Production Full-Stack SDE — owned 24x7 platform uptime, engineered responsive course and test interfaces, implemented end-to-end GA4/Meta Pixel telemetry, and resolved live bugs under strict SLA.',
    highlights: [
      'Problem: Zero visibility into student checkout and enrollment drop-offs. Fix: Architected GA4 and Meta Pixel event pipelines across client interfaces and backend endpoints.',
      'Role: Full-Stack SDE managing core frontend course modules, database operations, third-party library upgrades, and live incident triage.',
      'Tech Stack: Next.js, React.js, Node.js, Express, MongoDB, GA4, Meta Pixel, REST APIs, Vercel.',
      'Result: Sustained 24x7 high availability for [1,000+ daily active students] while resolving critical production tickets with an average SLA of [< 2 hours].',
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
        caption: 'Prantik Educare — EdTech platform student portal and interactive learning interface',
      },
      {
        type: 'architecture',
        title: 'Maintenance & Analytics Architecture',
        caption: 'Continuous delivery, GA4 / Meta Pixel tracking, and <2h incident response',
        flow: [
          'Client Requirement / Bug Ticket',
          'UI / Frontend Development',
          'GA4 & Meta Pixel Pipeline',
          'Cloud Data Sync + 24x7 Monitoring',
        ],
        metrics: [
          { label: 'Live Visitors', value: '1,000+' },
          { label: 'Issue SLA', value: '< 2 Hours' },
          { label: 'Platform Uptime', value: '24x7' },
        ],
      },
    ],
    links: {
      note: 'Live production platform. Architecture and analytics details shared during interviews.',
    },
  },

  {
    id: 'sabar-institute',
    slug: 'sabar-institute',
    category: 'support',
    categoryLabel: 'Production Engineering',
    shortTitle: 'Sabar Institute',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'Sabar Institute — Web Operations & Automated Messaging Engine',
    subtitle: 'Backend & Systems SDE: Replaced manual notification delays with an automated Brevo transactional email engine and maintained 24x7 live web portals.',
    impactMetric: '[1,000+ Users Reached] · Automated Brevo · 24x7 Live',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    tech: ['React.js', 'Node.js', 'Express.js', 'Brevo API', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    challenge:
      'The educational institute handled student admissions, examination schedules, and fee receipts manually over phone calls and WhatsApp, causing severe communication delays and administrative overhead.',
    solution:
      'Backend & Full-Stack SDE — engineered an asynchronous transactional email dispatch pipeline using Brevo webhooks, optimized responsive student portals, and resolved live production bugs under strict SLA.',
    highlights: [
      'Problem: High manual overhead and lost student admission notices. Built automated transactional email triggers for admissions, exam notifications, and receipt generation.',
      'Role: Full-stack engineer responsible for email service integration, database maintenance, UI bug fixing, and weekly stakeholder alignment.',
      'Tech Stack: React.js, Node.js, Express.js, Brevo (Sendinblue) API, MongoDB, REST APIs, Tailwind CSS.',
      'Result: Automated communications for [1,000+ active students], reducing notification latency from [several days to under 5 seconds] with [99%+ delivery rate].',
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
        caption: 'Sabar Institute — Academic portal and student communication dashboard',
      },
      {
        type: 'architecture',
        title: 'Automated Communication Pipeline',
        caption: 'Brevo mailing integration, student notices, and uptime assurance',
        flow: [
          'Event / User Action',
          'Brevo Mail Pipeline',
          'Student Notification Delivery',
          'Weekly Client Progress Report',
        ],
        metrics: [
          { label: 'Active Reach', value: '1,000+ Users' },
          { label: 'Email Engine', value: 'Brevo' },
          { label: 'Uptime', value: '24x7' },
        ],
      },
    ],
    links: {
      note: 'Live client portal. Architecture and email workflows shared during interviews.',
    },
  },

  {
    id: 'ls-institute',
    slug: 'ls-institute',
    category: 'support',
    categoryLabel: 'Production Engineering',
    shortTitle: 'LS Institute',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'LS Institute — Academic Portal & Performance Engineering',
    subtitle: 'Full-Stack SDE: Optimized Core Web Vitals, integrated conversion funnel telemetry, and shipped responsive course discovery modules.',
    impactMetric: '[1,000+ Daily Visitors] · 40% Speed Lift · GA4 Tracking',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'GA4', 'Meta Pixel', 'Tailwind CSS', 'Technical SEO'],
    challenge:
      'High mobile student traffic experienced elevated bounce rates due to unoptimized assets, sluggish registration forms, and lack of funnel diagnostics for marketing campaigns.',
    solution:
      'Full-Stack SDE — overhauled responsive course discovery views, reduced bundle overhead to improve LCP/FID, implemented GA4 conversion tracking, and guaranteed sub-2-hour turnaround on production tickets.',
    highlights: [
      'Problem: High mobile bounce rate and unmeasured registration drop-offs. Re-architected course catalog with optimized asset delivery and integrated granular GA4 event funnels.',
      'Role: Full-Stack Engineer leading frontend performance optimization, UI bug fixes, and continuous technical SEO enhancements.',
      'Tech Stack: Next.js, React.js, Node.js, MongoDB, GA4, Meta Pixel, Tailwind CSS, Technical SEO.',
      'Result: Cut page load times by [40%], supported [1,000+ daily active visitors], and resolved [100% of critical tickets in < 2 hours].',
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
        caption: 'LS Institute — Course discovery catalog and responsive student portal',
      },
      {
        type: 'architecture',
        title: 'Production Maintenance Flow',
        caption: 'Continuous UI delivery, analytics monitoring, and rapid defect mitigation',
        flow: [
          'Stakeholder Consultation',
          'UI / Section Build',
          'GA4 Analytics Logging',
          'Fast <2h Production Release',
        ],
        metrics: [
          { label: 'Daily Traffic', value: '1,000+' },
          { label: 'Issue Resolution', value: '1–2 Hours' },
          { label: 'Availability', value: '24x7 Live' },
        ],
      },
    ],
    links: {
      note: 'Live client platform. Code and metrics walkthrough available in interviews.',
    },
  },

  {
    id: 'ngo-mart',
    slug: 'ngo-mart',
    category: 'support',
    categoryLabel: 'Production Engineering',
    shortTitle: 'NGO Mart',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'NGO Mart — Social Commerce & Payment Pipeline Maintenance',
    subtitle: 'Full-Stack & Payment SDE: Hardened checkout workflows, maintained Razorpay integration, and ensured 24x7 transactional stability for artisan commerce.',
    impactMetric: '[1,000+ Monthly Shoppers] · 99.8% Success · 24x7 Live',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=1200&auto=format&fit=crop&q=80',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay API', 'GA4', 'Technical SEO'],
    challenge:
      'An ethical marketplace supporting rural artisans faced cart abandonment risks from fragile checkout states, unhandled payment edge-cases, and catalog synchronization delays.',
    solution:
      'Full-Stack Engineer — maintained the e-commerce platform, secured Razorpay transaction webhooks against race conditions, implemented dynamic product filtering, and monitored live payment health.',
    highlights: [
      'Problem: Payment drop-offs and inconsistent checkout error recovery. Implemented idempotent payment verification and informative client-side transaction state handling.',
      'Role: Full-Stack Engineer managing live payment integrations, product catalog updates, and cloud uptime.',
      'Tech Stack: React.js, Node.js, Express.js, MongoDB, Razorpay API, GA4, Technical SEO.',
      'Result: Processed transactions for [1,000+ monthly active shoppers] with a [99.8% payment success rate] and zero reconciliation discrepancies.',
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=1200&auto=format&fit=crop&q=80',
        caption: 'NGO Mart — Social marketplace catalog and impact contribution interface',
      },
      {
        type: 'architecture',
        title: 'Social Commerce Maintenance Pipeline',
        caption: 'Catalog updates, payment flow validation, and 24x7 live monitoring',
        flow: [
          'Listing & Content Request',
          'UI & Catalog Update',
          'Payment Flow Verification',
          '24x7 Live Uptime (<2h SLA)',
        ],
        metrics: [
          { label: 'User Inflow', value: '1,000+' },
          { label: 'Issue SLA', value: '< 2 Hours' },
          { label: 'Availability', value: '24x7 Live' },
        ],
      },
    ],
    links: {
      note: 'Live social commerce platform. Architectural support details shared during interviews.',
    },
  },

  {
    id: 'billion-projects',
    slug: 'billion-projects',
    category: 'support',
    categoryLabel: 'Production Engineering',
    shortTitle: 'Billion Projects',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'Billion Projects — Enterprise Feature Delivery & Web Platform',
    subtitle: 'Frontend & Systems SDE: Shipped interactive service architectures, conducted core framework upgrades, and maintained 95+ Core Web Vitals.',
    impactMetric: '[10+ Shipped Modules] · [1,000+ Monthly Leads] · 24x7 Live',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'GA4', 'Meta Pixel', 'Tailwind CSS', 'Technical SEO'],
    challenge:
      'A corporate enterprise needed rapid, reliable deployment of interactive service portfolios and case study modules without regressing Lighthouse scores or destabilizing existing client conversion funnels.',
    solution:
      'Frontend & Full-Stack SDE — architected modular, reusable UI components, upgraded dependencies to modern standards, hardened on-page SEO schema, and enforced sub-2-hour bug resolution SLAs.',
    highlights: [
      'Problem: Inflexible legacy pages slowing down business project launches. Designed and deployed a component-driven showcase architecture with dynamic filtering and fast SSR rendering.',
      'Role: Frontend & Full-Stack Engineer leading feature sprints, cross-device testing, and weekly client deliverables.',
      'Tech Stack: Next.js, React.js, Node.js, MongoDB, Tailwind CSS, GA4, Technical SEO.',
      'Result: Shipped [10+ high-converting service modules] while sustaining [95+ Lighthouse scores] for [1,000+ monthly enterprise visitors].',
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
        caption: 'Billion Projects — Corporate portal showcases and interactive feature modules',
      },
      {
        type: 'architecture',
        title: 'Feature Release & Maintenance Pipeline',
        caption: 'From client roadmap consultation to live release and analytics monitoring',
        flow: [
          'Weekly Client Consultation',
          'New Page / Feature Sprint',
          'SEO & Performance Audit',
          '24x7 Monitored Release (<2h SLA)',
        ],
        metrics: [
          { label: 'Active Traffic', value: '1,000+' },
          { label: 'Fix SLA', value: '< 2 Hours' },
          { label: 'Uptime', value: '24x7' },
        ],
      },
    ],
    links: {
      note: 'Live client portal. Architecture and feature implementation walkthrough available during interviews.',
    },
  },

  // ───────────── 03 · FINAL YEAR PROJECT ─────────────
  {
    id: 'drishti-fyp',
    slug: 'drishti-ai-glasses',
    category: 'final-year',
    categoryLabel: 'Edge AI & Embedded Systems',
    shortTitle: 'Drishti AI Glasses',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/70 dark:text-violet-300 dark:border-violet-800',
    dotClass: 'bg-violet-500',
    accentBorder: 'border-violet-300',
    title: 'Drishti — Ultra-Low-Latency Edge AI Smart Glasses',
    subtitle: 'Lead Systems & AI Engineer: Built a ₹2,960 fully offline wearable AI device with 48.3 ms edge latency, delivering obstacle detection and facial recognition.',
    impactMetric: '₹2,960 Hardware · 48.3 ms Latency · 87.3% mAP',
    year: '2025 — 2026',
    coverImage: 'https://res.cloudinary.com/dm01lhkax/image/upload/v1770918280/Drishti_gdfyxu.jpg',
    tech: ['Kotlin', 'TensorFlow Lite', 'YOLOv11n', 'MobileFaceNet', 'Raspberry Pi Zero 2W', 'UDP Sockets', 'Sensor Fusion', 'AES-256'],
    challenge:
      '18.8M visually impaired people in India are priced out by imported assistive tech costing ₹2–5 lakhs, while cloud-reliant alternatives fail without stable internet and pose severe privacy risks by streaming personal video to third parties.',
    solution:
      'Lead Systems & AI Engineer — designed a split edge-computing architecture streaming camera and ultrasonic frames over UDP from a ₹2,960 Raspberry Pi node to the user\'s phone, executing parallel on-device YOLOv11n and MobileFaceNet models completely offline.',
    highlights: [
      'Problem: High hardware cost. Offloaded neural inference to the user\'s smartphone via low-overhead UDP sockets, lowering hardware bill-of-materials to just [₹2,960].',
      'Problem: Cloud latency & privacy. 100% offline inference pipeline with biometric templates encrypted locally via AES-256.',
      'Problem: Safety-critical compute latency. NMS-free YOLOv11n pipeline achieving [48.3 ms end-to-end latency], well below the [100 ms human reaction threshold].',
      'Problem: Audio cognitive overload. Designed a state-machine VoiceManager with priority queueing and cooldown filters to prevent alert fatigue.',
      'Role & Result: Architected full system from hardware schematic to Android Kotlin client, achieving [87.3% mAP detection accuracy] at [48.3 ms latency].',
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://res.cloudinary.com/dm01lhkax/image/upload/v1770918280/Drishti_gdfyxu.jpg',
        caption: 'Drishti AI Glasses: wearable node prototype with Pi Zero 2W & ultrasonic sensor',
      },
      {
        type: 'architecture',
        title: 'Offline Edge-AI Pipeline',
        caption: 'Camera on the glasses, intelligence on the phone, zero cloud in the safety loop',
        flow: [
          'Pi Zero 2W Camera + Ultrasonic',
          'Low-Latency UDP Stream to Phone',
          'YOLOv11n + MobileFaceNet (Parallel)',
          'Sensor Fusion → Voice + Haptic Alert',
        ],
        metrics: [
          { label: 'Hardware Cost', value: '₹2,960' },
          { label: 'End-to-End Latency', value: '48.3 ms' },
          { label: 'Object Detection', value: '87.3% mAP' },
        ],
      },
    ],
    links: {
      code: 'https://github.com/hamimreja-404/Final-Year-Project',
    },
  },

  // ───────────── 04 · INTERNSHIP · END-TO-END ─────────────
  {
    id: 'doctor-platform-internship',
    slug: 'doctor-consultation-platform',
    category: 'internship',
    categoryLabel: 'Full-Stack SDE (Internship)',
    shortTitle: 'DocPulse Platform',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800',
    dotClass: 'bg-cyan-500',
    accentBorder: 'border-cyan-300',
    title: 'DocPulse — Real-Time Telehealth & Clinic Consultation Platform',
    subtitle: 'Full-Stack SDE Intern: Architected an end-to-end medical portal featuring real-time WebSockets, WebRTC video consultations, and automated Razorpay invoicing.',
    impactMetric: '[500+ Consultations] · WebRTC Video · 3-Step Booking',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'WebRTC', 'STUN/TURN', 'Razorpay'],
    challenge:
      'A practicing medical clinic managed appointments, patient charts, and payments through fragmented WhatsApp messages and paper registers, resulting in scheduling clashes and lost patient records.',
    solution:
      'Sole Systems Architect & Full-Stack Intern — designed the database schemas (EER/DFD) and system state machines from scratch, building a mobile-first 3-step booking funnel, WebRTC video calling, WebSocket chat, and digital prescription generator.',
    highlights: [
      'Problem: Dropped calls & complex booking. Built a 3-step mobile booking flow with custom slot increments (15/20/30 mins) and integrated WebRTC with STUN/TURN traversal for reliable cross-network video.',
      'Role: Owned full lifecycle from database schema design and Figma UI prototypes to backend signaling and frontend client implementation.',
      'Tech Stack: Next.js, React.js, Node.js, Express.js, MongoDB, WebSockets, WebRTC, STUN/TURN, Razorpay.',
      'Result: Successfully deployed to production supporting [500+ completed consultations] with video latency under [150 ms] and automated payment settlement.',
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
        caption: 'Mobile booking flow and doctor management dashboard',
      },
      {
        type: 'architecture',
        title: 'Consultation System Design',
        caption: 'From booking to prescription, online or in clinic',
        flow: [
          'Patient Books Slot (3 Steps)',
          'Razorpay Payment Settlement',
          'Online: Chat + WebRTC Call | Clinic Visit',
          'Prescription & Medical History',
        ],
        metrics: [
          { label: 'Real-time', value: 'WebSocket + WebRTC' },
          { label: 'Payments', value: 'Razorpay' },
          { label: 'Status', value: 'Live in Production' },
        ],
      },
    ],
    links: {
      note: 'Built during internship for a live clinic. System architecture walkthrough available in interviews.',
    },
  },
  {
    id: 'attendsync-internship',
    slug: 'attendsync',
    category: 'internship',
    categoryLabel: 'Full-Stack SDE (Internship)',
    shortTitle: 'AttendSync',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800',
    dotClass: 'bg-cyan-500',
    accentBorder: 'border-cyan-300',
    title: 'AttendSync — Geofenced Enterprise Attendance & Workforce SaaS',
    subtitle: 'Full-Stack SDE Intern: Engineered a multi-tenant workforce management platform with live geolocation-verified punch-in and automated payroll Excel generation.',
    impactMetric: '[250+ Employees] · Geofence Verified · Instant Reports',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Geolocation API', 'RBAC', 'Brevo', 'Excel Export'],
    challenge:
      'Multi-branch organizations struggled with proxy clock-ins ("buddy punching"), complex multi-shift rules, and wasted days manually reconciling monthly attendance timesheets.',
    solution:
      'Full-Stack SDE Intern — built a multi-tenant RBAC platform where admins configure office geolocation radii, shifts, and holiday policies, while employees log attendance verified against live GPS coordinates.',
    highlights: [
      'Problem: Proxy clock-ins & manual payroll delays. Built client-side geolocation validation against configured office boundaries and automated magic-link authentication via Brevo.',
      'Role: Full-Stack Engineer implementing role-based authentication, MongoDB indexing for fast shift queries, and backend Excel streaming.',
      'Tech Stack: Next.js, React.js, Node.js, Express.js, MongoDB, Geolocation API, RBAC, Brevo, Excel Export.',
      'Result: Deployed across [5 organizational branches serving 250+ employees], cutting monthly payroll tabulation time from [3 days to < 10 seconds].',
    ],
    gallery: [
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
        caption: 'AttendSync admin dashboard and employee punch screen',
      },
      {
        type: 'architecture',
        title: 'Attendance Flow',
        caption: 'Rules set by the admin, enforced at every punch',
        flow: [
          'Admin Sets Locations, Shifts, Holidays',
          'Employee Login (Temp Password via Brevo)',
          'Live-Location Verified Punch',
          'Hours Tracking + Excel Export',
        ],
        metrics: [
          { label: 'Roles', value: 'Admin / Employee' },
          { label: 'Verification', value: 'Live Location' },
          { label: 'Reports', value: 'Excel' },
        ],
      },
    ],
    links: {
      note: 'Built during my internship. Architecture walkthrough available during interviews.',
    },
  },
];

export const getProjectBySlug = (slugOrId) => {
  if (!slugOrId) return null;
  return PROJECTS_DATA.find(
    (p) => p.slug === slugOrId || p.id === slugOrId
  );
};
