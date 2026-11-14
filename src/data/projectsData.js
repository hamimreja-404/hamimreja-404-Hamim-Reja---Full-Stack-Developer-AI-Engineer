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
  { id: 'support', label: 'Software Maintenance', icon: FolderGit2 },
  { id: 'internship', label: 'Full-Stack SDE (Internship)', icon: Briefcase },
  { id: 'final-year', label: 'Edge AI & IoT', icon: GraduationCap },
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
    title: 'Digital Nimantran (Invitation Website Platform)',
    subtitle: 'Sole Founder & Full-Stack SDE: Bootstrapped, architected, and monetized an event SaaS to 4,000+ organic users and 15+ paying clients with ₹0 ad spend.',
    impactMetric: '4,000+ Users · 15+ Clients · ₹0 Ads · 500% ROI',
    year: '2026 — Present',
    coverImage: '/Projects/DigitalNimantran/1.webp',
    tech: ['Next.ts', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'Technical SEO', 'Vercel'],
    features: [
      'Animated envelope-opening video that reveals the invitation, turning a simple WhatsApp share into a memorable first impression',
      'Cinematic animated hero section featuring the bride and groom names, wedding details and event schedule',
      'Embedded Google Maps location for every ceremony, so guests can find each venue with one tap',
      'Built-in RSVP form with instant guest responses, so families can plan headcount without chasing replies',
      'Every Bengali ritual, tradition and aesthetic reflected in the design, from Gaye Holud to Bou Bhaat, in authentic Bengali and English typography',
      'One shareable link replaces card photos: send a single beautiful invitation website on WhatsApp instead of an image of a printed card',
      'Optimized videos and images that load fast and run smoothly on any phone, tablet or desktop, with no lag',
      'Fully designed, developed and managed by me, with personal support from first draft to the wedding day',
    ],
    challenge:
      'Generic invitation tools ignored Bengali ceremonies and language nuances, forcing families to rely on cluttered WhatsApp texts, photos of printed cards and manual paper RSVP lists.',
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

  // ───────────── 04 · INTERNSHIP · END-TO-END ─────────────
  {
    id: 'doctor-platform-internship',
    slug: 'doctor-consultation-platform',
    category: 'internship',
    categoryLabel: 'Full-Stack SDE (Internship)',
    shortTitle: 'Doctor Platform',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800',
    dotClass: 'bg-cyan-500',
    accentBorder: 'border-cyan-300',
    title: 'Doctor Platform (Appointment Booking, Consultation Video / Audio )',
    subtitle: 'Full-Stack SDE Intern: Architected an end-to-end medical portal featuring real-time WebSockets, WebRTC video consultations, and automated Razorpay invoicing.',
    impactMetric: 'Video / Audio Consultations · Real time Chat · 3-Step Booking · Manage Medical History ',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'WebRTC', 'Co-turn', 'Razorpay'],
    features: [
      'Mobile-first 3-step appointment booking with doctor-configurable slot durations (15/20/30 min) and a race-condition-safe schema that prevents double-booking',
      'Real-time chat that opens and closes dynamically based on appointment timings, with live online presence and typing indicators over WebSockets',
      'Peer-to-peer WebRTC audio and video consultations with STUN/TURN traversal for reliable calls across networks',
      'Digital prescriptions generated by the doctor during or after the consultation, downloadable as PDF alongside medical receipts',
      'Centralized patient history tracking, so doctors can review past visits, prescriptions and medical records in one place',
      'Complete system design owned by me, including the EER database diagram and data flow diagrams (DFD) for the booking, payment and consultation lifecycle',
      'Integrated Razorpay payments with automated fee settlement and appointment reminders for patients',
    ],
    challenge:
      'A practicing medical clinic managed appointments, patient records and payments through scattered WhatsApp messages and paper registers, causing double-booked slots, lost patient history and no reliable way to consult patients remotely.',
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
    impactMetric: 'Geofence Verified · Instant Reports · Dynamic Shifts · Live Update',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Geolocation API', 'RBAC', 'Brevo', 'Excel Export'],
    features: [
      'Multi-tenant Role-Based Access Control (RBAC) with separate Admin and Employee permissions, so each organization manages its own staff, locations and policies',
      'Geofenced punch-in and punch-out that verifies the employee\'s live GPS location against admin-configured office coordinates and radius, blocking proxy clock-ins',
      'Live attendance tracking over WebSockets, so admins see who has punched in, is on break or has checked out in real time',
      'Flexible shift management with custom grace periods, break allowances and organization-wide holiday calendars',
      'Configurable attendance policies that are enforced automatically at every punch, from late marks to half-days',
      'Complete attendance history per employee, tracking working hours and break hours across days, weeks and months',
      'One-click monthly Excel reports with working hours, breaks and attendance summaries, replacing days of manual reconciliation',
      'Secure onboarding and credential recovery through one-time magic links sent via the Brevo email API',
    ],
    challenge:
      'Multi-branch organizations struggled with proxy clock-ins (buddy punching), inconsistent shift, break and holiday rules across locations, and no live view of who was working, forcing HR teams to spend days manually reconciling monthly attendance timesheets.',
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
    impactMetric: '₹2,960 Hardware · 48.3 ms Latency · Collision Aleart' ,
    year: '2025 — 2026',
    coverImage: 'https://res.cloudinary.com/dm01lhkax/image/upload/v1770918280/Drishti_gdfyxu.jpg',
    tech: ['Kotlin', 'TensorFlow Lite', 'YOLOv11n', 'MobileFaceNet', 'Raspberry Pi Zero 2W', 'UDP Sockets', 'Sensor Fusion', 'AES-256'],
    features: [
      'Low-latency UDP telemetry and frame streaming between Raspberry Pi Zero 2W and Android phone',
      'Parallel on-device neural inference using YOLOv11n (obstacles) and MobileFaceNet (faces)',
      '48.3 ms end-to-end edge compute loop operating 100% offline without cloud dependency',
      'Priority-queued VoiceManager state machine with cooldown filters to eliminate audio alert fatigue',
      'Ultrasonic sensor fusion complementing computer vision for immediate proximity hazard detection',
    ],
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
    title: 'Prantik Educare',
    subtitle: 'Production SDE: Sustained 99.9% uptime, built responsive academic modules, and integrated end-to-end GA4/Meta event telemetry for 1,000+ daily learners.',
    impactMetric: '99.9% Uptime · <2h Issue SLA · Idea to Live in One Day',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.ts', 'Node.js', 'MongoDB', 'GA4', 'Meta Pixel', 'REST APIs', 'Technical SEO'],
    features: [
      'Complete ownership of a live EdTech platform: maintaining the codebase, fixing production issues and keeping the site available 24x7',
      'Direct client communication to gather requirements, clarify content changes and share progress, with every update tested before it goes live',
      'Content updates for courses, pages and announcements, tested across devices and deployed to production quickly',
      'New feature development on the existing codebase, from implementation and testing to release without disrupting live students',
      'Meta Pixel setup to track ad-driven visitors, enrollments and conversions, so the team can measure which ad campaigns actually work',
      'Rapid incident response with a resolution time under 2 hours for live bugs or Production Issue',
    ],
    challenge:
 'Keeping the site live 24x7, while fixing bugs quickly and shipping content updates and new features the same day, without breaking anything.',
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
    title: 'Sabar Institute',
    subtitle: 'Backend & Systems SDE: Replaced manual notification delays with an automated Brevo transactional email engine and maintained 24x7 live web portals.',
    impactMetric: 'Automated Brevo · 24x7 Live · Idea to Live in One Day',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.ts', 'Node.js', 'Express.js', 'Brevo API', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
      features: [
      'Brevo transactional email service integrated end to end, sending automated emails & manual emails',
      'New dashboard pages for easy donation tracking, giving admins a clear view of donations received without digging through records',
      'Complete new features built on both sides: backend APIs and database logic, plus the matching frontend screens',
      'Live bug fixing on the production site, with every fix tested before release',
      'Same-day updates: content changes and new features are developed, tested and deployed to production the same day',
      
    ],
    challenge:
 'Keeping the site live 24x7, while fixing bugs quickly and shipping content updates and new features the same day, without breaking anything.',
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
    id: 'ls-foundation',
    slug: 'ls-foundation',
    category: 'support',
    categoryLabel: 'Production Engineering',
    shortTitle: 'LS Foundation',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'LS Foundation',
    subtitle: 'Full-Stack SDE: Optimized Core Web Vitals, integrated conversion funnel telemetry, and shipped responsive course discovery modules.',
    impactMetric: 'Idea to live in one day · 24x7 Live',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.ts', 'React.ts', 'Node.ts', 'MongoDB', 'GA4', 'Meta Pixel', 'Tailwind CSS', 'Technical SEO'],
    features: [
      'Forgot-password flow built end to end, with frontend screens, backend APIs and secure reset emails sent through the Brevo mail service',
      'New dashboard features designed and built on both frontend and backend, tested before release so admins can use them right away',
      'Live production upkeep, keeping the site available for students and staff every day',
      'Quick bug fixing on the live site, with every fix tested before it goes out',
      'Same-day updates: content changes and new features are developed, tested and deployed to production the same day',
      'Direct communication with the client to gather requirements and confirm each change before and after release',
    ],
    challenge:
      'Keeping the site live 24x7, while fixing bugs quickly and shipping content updates and new features the same day, without breaking anything.',
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
    impactMetric: 'Idea to live in one day · 24x7 Live',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay API', 'GA4', 'Technical SEO'],
    features: [
      'Forgot-password flow built end to end, with frontend screens, backend APIs and secure reset emails so shoppers can recover their accounts on their own',
      'New features added on request across frontend and backend, tested thoroughly before going live on the marketplace',
      'Product and page content updates for the store, tested across devices and published to production quickly',
      'Same-day updates: content changes and new features are developed, tested and deployed the same day without disrupting shoppers',
      'Quick bug fixing on the live site, with every fix tested before release, including checkout and payment flows',
    ],
    challenge:
 'Keeping the site live 24x7, while fixing bugs quickly and shipping content updates and new features the same day, without breaking anything.',
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
    id: 'other-support',
    slug: 'billion-projects',
    category: 'support',
    categoryLabel: 'Production Engineering',
    shortTitle: 'Other Support Projects',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
    dotClass: 'bg-indigo-500',
    accentBorder: 'border-indigo-300',
    title: 'Other Support Projects',
    subtitle: 'Frontend & Systems SDE: Shipped interactive service architectures, conducted core framework upgrades, and maintained 95+ Core Web Vitals.',
    impactMetric: '24x7 Live · Idea to Live in One Day · Client Meetings · Owning end to end solutions',
    year: '2026 — Present',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    tech: ['Next.ts', 'React.js', 'Node.js', 'MongoDB', 'GA4', 'Meta Pixel', 'Tailwind CSS', 'Brevo', 'AWS', 'Digital Ocean', 'Writing Techinical Blogs', 'Technical SEO'],
        features: [
      'New features built on request, from understanding the client\'s requirement to delivering working frontend screens and backend APIs',
      'Direct client communication throughout each task: gathering requirements, confirming changes and sharing progress updates until release',
      'Full-stack ownership of every change, with frontend and backend work tested before it goes to production',
      'Database and storage migrations handled carefully on live systems, so existing data stays safe and the site keeps running',
      'Instant response to production issues, with live bugs diagnosed and fixed quickly and the client updated once resolved',
      'Round-the-clock upkeep of the live platform, keeping it available for users every day'
    ],
    challenge:
'Keeping a live platform available around the clock while handling client requests end to end: shipping new features across frontend and backend, migrating the database and storage safely, and fixing production issues instantly, all without disrupting the users who depend on it every day.',
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


];

export const getProjectBySlug = (slugOrId) => {
  if (!slugOrId) return null;
  return PROJECTS_DATA.find(
    (p) => p.slug === slugOrId || p.id === slugOrId
  );
};
