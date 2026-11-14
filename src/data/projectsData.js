import {
  Briefcase,
  FolderGit2,
  GraduationCap,
  Layers,
  Users,
} from 'lucide-react';

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'startup', label: 'Startup', icon: Users },
  { id: 'support', label: 'At Office (Maintenance)', icon: FolderGit2 },
  { id: 'internship', label: 'During Internship', icon: Briefcase },
  { id: 'final-year', label: 'Final Year Project', icon: GraduationCap },
];

export const PROJECTS_DATA = [
  // ───────────── 01 · STARTUP / FLAGSHIP ─────────────
  {
    id: 'wedding-invites-startup',
    slug: 'digital-nimantran',
    category: 'startup',
    categoryLabel: 'Startup',
    shortTitle: 'Wedding Invites',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
    dotClass: 'bg-emerald-500',
    accentBorder: 'border-emerald-300',
    title: 'Digital Nimantran — Bengali-First Invitation SaaS',
    subtitle: 'A SaaS product I own with: 4k+ organic views, 15+ paying clients, 4.9 ratings and 500% ROI with zero paid advertising.',
    impactMetric: '4k+ Views · 15+ Clients · 0 Ads · 500% ROI',
    year: '2026 — Present',
    coverImage: '/Projects/DigitalNimantran/1.webp',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Technical SEO', 'Vercel'],
    challenge:
      'Bengali wedding rituals and language were missing from existing digital invitation websites, so families had no online option that felt like their own ceremony.',
    solution:
      'Built and launched an invitation platform with Bengali-first templates that carry the rituals, with RSVP collection and image and video support, all tuned for speed and organic search.',
    highlights: [
      'Grew to 4,000+ views in 3–4 months with no paid ads, purely through SEO',
      '15+ real clients onboarded, with RSVP tracking for guests',
      '6+ templates with images and videos, optimised for fast loading',
      'Owned the product end to end: problem discovery, build, launch, growth and client support',
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
    categoryLabel: 'At Office (Maintenance)',
    shortTitle: 'Prantik Educare',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'Prantik Educare — EdTech Production Maintenance & Analytics',
    subtitle: 'Full frontend maintenance, UI/UX overhauls, GA4/Meta Pixel integration, cloud data operations, and 24x7 live uptime.',
    impactMetric: '1,000+ Visitors · 24x7 Live · <2h Issue SLA',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'GA4', 'Meta Pixel', 'Technical SEO', 'Cloud Operations'],
    challenge:
      'A growing EdTech platform with 1,000+ active visitors required continuous content updates, UI/UX issue resolution, reliable cloud data management, and sub-2-hour turnaround on production tickets.',
    solution:
      'Manage full frontend content updates and architect new responsive course sections, resolve UI/UX issues, integrate GA4 and Meta Pixel analytics into admin dashboards, manage cloud data operations, and maintain 24x7 zero-downtime availability.',
    highlights: [
      'Manage full frontend content updates and build responsive new course and exam sections',
      'Integrated GA4 and Meta Pixel tracking across backend and dashboard to capture behavioral conversion data',
      'Manage cloud data operations and resolve production defects within a strict 1–2 hour SLA',
      'Keep the platform live 24x7 for 1,000+ active visitors, upgrading tech versions and dependencies as needed',
      'Consult with client management on weekly progress reports and coordinate with SEO teams for keyword visibility',
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
    categoryLabel: 'At Office (Maintenance)',
    shortTitle: 'Sabar Institute',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'Sabar Institute — Web Operations & Automated Mailing',
    subtitle: 'Live portal upkeep, automated transactional email pipelines via Brevo, UI bug fixes, and continuous technical SEO.',
    impactMetric: '1,000+ Visitors · Brevo Mailing · 24x7 Live',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    tech: ['React.js', 'Node.js', 'Brevo', 'MongoDB', 'REST APIs', 'Technical SEO', 'Production Support'],
    challenge:
      'The institute required dependable student notifications, automated transactional communications, swift resolution of live frontend bugs, and continuous search engine discoverability.',
    solution:
      'Engineered automated mailing workflows powered by Brevo, maintained frontend portals with fast bug resolution, updated dependencies, and conducted weekly sprint alignments with the client.',
    highlights: [
      'Engineered transactional email systems with Brevo for automated admissions, notices, and payment receipts',
      'Managed ongoing frontend content revisions, layout fixes, and mobile responsiveness tuning',
      'Monitored live traffic (1,000+ users), maintaining 24x7 uptime and resolving production issues within 1–2 hours',
      'Coordinated with SEO specialists to boost organic ranking across core academic queries',
      'Provided weekly client progress consultations and updated technical stack versions as needed',
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
    categoryLabel: 'At Office (Maintenance)',
    shortTitle: 'LS Institute',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'LS Institute — Academic Platform Maintenance & UI Enhancements',
    subtitle: 'Full-stack production maintenance, GA4 analytics, UI/UX problem resolution, and on-page SEO integration.',
    impactMetric: '1,000+ Users · <2h Issue SLA · GA4',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'GA4', 'Meta Pixel', 'Tailwind CSS', 'SEO'],
    challenge:
      'High student traffic required steady production uptime, timely content releases, accurate tracking of conversion funnels, and prompt resolution of layout or functionality errors.',
    solution:
      'Handled routine frontend maintenance and responsive layout updates, integrated GA4 and Meta Pixel tracking into the admin dashboard, and fixed production issues within 1–2 hours.',
    highlights: [
      'Maintained frontend interfaces, introduced fresh course modules, and refined UI/UX consistency',
      'Configured GA4 and Meta Pixel tracking to give management visibility into student sign-up funnels',
      'Kept the platform live 24x7 for 1,000+ visitors, maintaining an under 2-hour issue resolution SLA',
      'Updated software packages and library versions periodically to ensure security and speed',
      'Collaborated on weekly sprint calls with clients and implemented technical SEO improvements',
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
    categoryLabel: 'At Office (Maintenance)',
    shortTitle: 'NGO Mart',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'NGO Mart — Social Commerce Platform Maintenance',
    subtitle: 'Live e-commerce upkeep, catalog and content management, technical SEO optimization, and 24x7 availability.',
    impactMetric: '1,000+ Visitors · 24x7 Live · Commerce Support',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=1200&auto=format&fit=crop&q=80',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Razorpay', 'GA4', 'Technical SEO', 'Cloud Operations'],
    challenge:
      'A marketplace supporting social impact causes required zero-downtime operation, continuous product catalog updates, frictionless donation/checkout pipelines, and reliable bug fixing.',
    solution:
      'Maintained full web operations, updated listings and multimedia content, verified payment flows, updated software versions, and optimized pages with the SEO team.',
    highlights: [
      'Ensured 24x7 platform availability and transactional reliability for social commerce purchases and donations',
      'Executed regular frontend content updates, UI improvements, and new product category rollouts',
      'Monitored and resolved production defects within 1–2 hours to prevent user drop-off',
      'Teamed up with technical SEO partners to optimize product schema, meta tags, and site speed',
      'Delivered weekly sprint updates to client management on platform performance and enhancements',
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
    categoryLabel: 'At Office (Maintenance)',
    shortTitle: 'Billion Projects',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'Billion Projects — Feature Engineering & Web Maintenance',
    subtitle: 'Shipping new pages and interactive features, managing technical stack upgrades, and keeping the platform live 24x7.',
    impactMetric: 'New Features · 1,000+ Visitors · 24x7 Live',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'GA4', 'Meta Pixel', 'Tailwind CSS', 'Technical SEO'],
    challenge:
      'A corporate web platform required frequent rollout of new service pages, interactive features, analytics maintenance, and dependable technical support under strict client deadlines.',
    solution:
      'Designed and shipped custom new landing pages and interactive modules, upgraded framework and library versions, resolved production defects within 1–2 hours, and conducted weekly client consultations.',
    highlights: [
      'Built and shipped brand new responsive service pages, showcase sections, and interactive UI components',
      'Maintained 24x7 uptime for 1,000+ visitors, addressing bug reports and performance issues within 1–2 hours',
      'Upgraded framework and dependency versions to maintain top security standards and fast load times',
      'Integrated GA4 and Meta Pixel analytics to monitor visitor engagement and campaign conversion',
      'Held weekly consultation meetings with the client to review metrics, progress, and upcoming deliverables',
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
    categoryLabel: 'Final Year Project',
    shortTitle: 'Drishti AI Glasses',
    badgeClass: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/70 dark:text-violet-300 dark:border-violet-800',
    dotClass: 'bg-violet-500',
    accentBorder: 'border-violet-300',
    title: 'Drishti — Smart AI Glasses for the Visually Impaired',
    subtitle: 'A sub-₹3,000, fully offline wearable that detects obstacles and recognises faces in under 50 ms, where existing devices cost lakhs.',
    impactMetric: '₹2,960 Build · 48 ms Latency · Offline',
    year: '2025 — 2026',
    coverImage: 'https://res.cloudinary.com/dm01lhkax/image/upload/v1770918280/Drishti_gdfyxu.jpg',
    tech: ['Kotlin', 'TensorFlow Lite', 'YOLOv11n', 'MobileFaceNet', 'Raspberry Pi Zero 2W', 'UDP', 'Sensor Fusion'],
    challenge:
      '18.8M visually impaired Indians are stuck between white canes that only detect obstacles at ground level and imported AI devices that cost lakhs, need constant internet and upload private video to the cloud.',
    solution:
      'Moved the intelligence onto the phone the family already owns. A ₹2,960 Raspberry Pi Zero 2W glasses node streams camera frames and ultrasonic distance over UDP, and the phone runs YOLOv11n and MobileFaceNet on-device, then speaks only what matters.',
    highlights: [
      'Problem: AI assistive devices cost lakhs. Fix: a clip-on node built for ₹2,960 that uses the phone the user already has as the AI engine.',
      'Problem: cloud apps fail without internet and upload private video. Fix: fully offline edge inference, with face data stored in an AES-256 encrypted local database.',
      'Problem: AI on a Pi Zero is too slow for real-time safety. Fix: split architecture (Pi streams, phone computes), NMS-free YOLOv11n with GPU acceleration, end-to-end latency of 48.3 ms against a 100 ms safety limit.',
      'Problem: constant narration overwhelms users. Fix: a VoiceManager state machine with priority levels, 3-second de-duplication and per-object cooldowns, so only the relevant alert is spoken.',
      'Problem: one sensor is unreliable. Fix: fused ultrasonic and camera depth, with a sensor-driven emergency alert at under 30 cm that bypasses the vision pipeline.',
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
    categoryLabel: 'During Internship',
    shortTitle: 'Doctor Platform',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800',
    dotClass: 'bg-cyan-500',
    accentBorder: 'border-cyan-300',
    title: 'Doctor Consultation Platform',
    subtitle: 'Live with a real doctor: book in 3 steps, consult online or in clinic, with chat, video calls and prescriptions.',
    impactMetric: 'Live · Real Doctor · 3-Step Booking',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'WebSockets', 'WebRTC', 'TURN Server', 'Razorpay', 'Figma'],
    challenge:
      'A practising doctor was managing appointments, payments and follow-ups by hand, and patients had no easy way to book a slot or consult remotely.',
    solution:
      'Designed the whole system myself: ER diagram, data flow diagram, state machine and Figma UI. The result is a mobile-first booking flow, online and in-clinic consultations, payments and digital prescriptions.',
    highlights: [
      'Owned architecture end to end: ER diagram, data flow, state machine and UI design',
      'Mobile-first booking in just 3 steps, with doctor-defined slot durations (15/20/30 min)',
      'WebSocket chat plus WebRTC audio and video calls, with a TURN server so calls work across different networks',
      'Razorpay payments, digital prescriptions, patient medical history, monthly revenue view and booking controls',
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
      note: 'Built during my internship for a real client. Architecture walkthrough available during interviews.',
    },
  },
  {
    id: 'attendsync-internship',
    slug: 'attendsync',
    category: 'internship',
    categoryLabel: 'During Internship',
    shortTitle: 'AttendSync',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800',
    dotClass: 'bg-cyan-500',
    accentBorder: 'border-cyan-300',
    title: 'AttendSync — Attendance Management Platform',
    subtitle: 'Admin and employee dashboards with geo-verified punch in/out, flexible shifts and Excel reports.',
    impactMetric: 'Role-Based · Geo-Verified · Excel Reports',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'RBAC', 'Geolocation', 'Brevo', 'Excel Export'],
    challenge:
      'Organisations with multiple offices, shifts and holiday rules needed a trustworthy way to record attendance and working hours without manual registers.',
    solution:
      'Built a role-based web platform where admins configure locations, shifts, breaks, grace periods and holidays, and employees punch in and out from their live location, verified against the assigned office.',
    highlights: [
      'Admins create employees and office locations, and define shifts, break hours, grace in/out and holidays, assignable by department or location',
      'Employees log in with a Brevo-emailed temporary password and punch in/out only when verified at the office location',
      'Daily working hours, break hours and full attendance history for every employee',
      'Admin view of all employee records with Excel export',
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
