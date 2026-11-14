import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Layout, Server, BrainCircuit, CloudCog, Cpu, Briefcase, Sparkles,
  Layers, Webhook, Bot, ScanFace, Workflow, Gauge,
  CircuitBoard, Cable, Radio, PenTool, ImagePlus, Users, Headphones,
  Lightbulb, Building2, PhoneCall, Plug, Video, ShieldCheck, Upload, Search, Goal
} from 'lucide-react';

// Needs these lucide-react imports:
// import { Layout, Server, BrainCircuit, CloudCog, Cpu, Briefcase, Layers, Webhook, Bot, ScanFace,
//   ScanSearch, Workflow, Gauge, CircuitBoard, Cable, Radio, PenTool, ImagePlus, Users, Headphones,
//   Lightbulb, Building2, PhoneCall, Plug, Video, ShieldCheck, Upload, MapPin, Search, Rocket } from 'lucide-react';

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    num: '01',
    title: 'Frontend & UI Engineering',
    // subtitle: 'Interactive interfaces, maps, design systems & smooth motion',
    icon: Layout,
    dot: 'bg-sky-500',
    accent: 'text-sky-600 bg-sky-50 border-sky-200',
    tileHover: 'hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700',
    skills: [
      { name: 'Next.js', logo: `${DEV}/nextjs/nextjs-original.svg` },
      { name: 'React.js', logo: `${DEV}/react/react-original.svg` },
      { name: 'TypeScript', logo: `${DEV}/typescript/typescript-original.svg` },
      { name: 'JavaScript (ES6+)', logo: `${DEV}/javascript/javascript-original.svg` },
      { name: 'Tailwind CSS', logo: `${DEV}/tailwindcss/tailwindcss-original.svg` },
      { name: 'Redux', logo: `${DEV}/redux/redux-original.svg` },
      { name: 'Framer Motion', logo: 'https://cdn.simpleicons.org/framer' },
      { name: 'HTML5 & CSS3', logo: `${DEV}/html5/html5-original.svg` },
      { name: 'Leaflet Maps', logo: 'https://cdn.simpleicons.org/leaflet' },
      { name: 'WebRTC (Client)', logo: 'https://cdn.simpleicons.org/webrtc' },
    ],
  },
  {
    id: 'backend',
    num: '02',
    title: 'Backend & Databases',
    // subtitle: 'Real-time APIs, secure auth, file handling & full-stack architectures',
    icon: Server,
    dot: 'bg-emerald-500',
    accent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    tileHover: 'hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700',
    skills: [
      { name: 'Node.js', logo: `${DEV}/nodejs/nodejs-original.svg` },
      { name: 'Express.js', logo: `${DEV}/express/express-original.svg` },
      { name: 'MongoDB', logo: `${DEV}/mongodb/mongodb-original.svg` },
      { name: 'Prisma', logo: `${DEV}/prisma/prisma-original.svg` },
      { name: 'SQL/MySQL', logo: `${DEV}/mysql/mysql-original.svg` },
      { name: 'MERN Stack', icon: Layers, iconColor: 'text-emerald-600' },
      { name: 'REST APIs', icon: Webhook, iconColor: 'text-emerald-600' },
      { name: 'WebSockets', icon: Plug, iconColor: 'text-emerald-600' },
      { name: 'WebRTC Signaling', icon: Video, iconColor: 'text-emerald-600' },
      { name: 'JWT & Auth, Middleware', logo: 'https://cdn.simpleicons.org/jsonwebtokens' },
      { name: 'RBAC', icon: ShieldCheck, iconColor: 'text-emerald-600' },
      { name: 'Multer (File Uploads)', icon: Upload, iconColor: 'text-emerald-600' },
    ],
  },
  {
    id: 'ai',
    num: '03',
    title: 'AI, Vision & Agents',
    // subtitle: 'Real-time computer vision, LLMs & multi-step AI systems',
    icon: BrainCircuit,
    dot: 'bg-cyan-500',
    accent: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    tileHover: 'hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700',
    skills: [
      { name: 'YOLOv10', logo: 'https://cdn.simpleicons.org/yolo' },
      { name: 'OpenCV', logo: `${DEV}/opencv/opencv-original.svg` },
      { name: 'TensorFlow', logo: `${DEV}/tensorflow/tensorflow-original.svg` },
      { name: 'Object Recognition', icon: Goal, iconColor: 'text-cyan-600' },
      { name: 'Face Recognition', icon: ScanFace, iconColor: 'text-cyan-600' },
      { name: 'Agentic AI Systems', icon: Bot, iconColor: 'text-cyan-600' },
    ],
  },
  {
    id: 'devops',
    num: '04',
    title: 'Cloud, DevOps & Web Vitals',
    // subtitle: 'Containerization, cloud hosting, deployments & Core Web Vitals speed',
    icon: CloudCog,
    dot: 'bg-indigo-500',
    accent: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    tileHover: 'hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700',
    skills: [
      // { name: 'Docker', logo: `${DEV}/docker/docker-original.svg` },
      // {
      //   name: 'AWS',
      //   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      // },
      { name: 'Vercel', logo: `${DEV}/vercel/vercel-original.svg` },
      { name: 'Linux', logo: 'https://cdn.simpleicons.org/linux/FCC624' },
      { name: 'Git', logo: `${DEV}/git/git-original.svg` },
      { name: 'GitHub', logo: `${DEV}/github/github-original.svg` },
      // { name: 'CI/CD Pipelines', icon: Workflow, iconColor: 'text-indigo-600' },
      { name: 'Performance', icon: Gauge, iconColor: 'text-indigo-600' },
      { name: 'SEO', icon: Search, iconColor: 'text-indigo-600' },
    ],
  },
  {
    id: 'hardware',
    num: '05',
    title: 'IoT, Embedded & Hardware',
    // subtitle: 'Edge controllers, FPGA digital design & sensor protocols',
    icon: Cpu,
    dot: 'bg-violet-500',
    accent: 'text-violet-600 bg-violet-50 border-violet-200',
    tileHover: 'hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700',
    skills: [
      { name: 'Raspberry Pi', logo: `${DEV}/raspberrypi/raspberrypi-original.svg` },
      { name: 'Arduino', logo: `${DEV}/arduino/arduino-original.svg` },
      { name: 'C++', logo: `${DEV}/cplusplus/cplusplus-original.svg` },
      { name: 'Verilog HDL', logo: `${DEV}/verilog/verilog-original.svg` },
      { name: 'Xilinx Vivado', logo: 'https://cdn.simpleicons.org/amd' },
      { name: 'FPGA (Spartan-3E)', icon: CircuitBoard, iconColor: 'text-violet-600' },
      { name: 'RTL Design', icon: Cpu, iconColor: 'text-violet-600' },
      { name: 'UART / SPI / I2C Protocols', icon: Cable, iconColor: 'text-violet-600' },
      { name: 'Sensors Interfacing', icon: Radio, iconColor: 'text-violet-600' },
    ],
  },
  {
    id: 'soft',
    num: '06',
    title: 'Soft Skills & Business',
    // subtitle: 'Content creation, client relationships & business growth',
    icon: Briefcase,
    dot: 'bg-amber-500',
    accent: 'text-amber-600 bg-amber-50 border-amber-200',
    tileHover: 'hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700',
    skills: [
      { name: 'Writing Blogs', icon: PenTool, iconColor: 'text-amber-600' },
      // { name: 'Editing Blog Images', icon: ImagePlus, iconColor: 'text-amber-600' },
      { name: 'Client Handling', icon: Users, iconColor: 'text-amber-600' },
      { name: 'Technical Support', icon: Headphones, iconColor: 'text-amber-600' },
      { name: 'Problem Solving', icon: Lightbulb, iconColor: 'text-amber-600' },
      { name: 'Manage Business', icon: Building2, iconColor: 'text-amber-600' },
      { name: 'Cold Calling', icon: PhoneCall, iconColor: 'text-amber-600' },
    ],
  },
];

const TOTAL_SKILLS = SKILL_CATEGORIES.reduce((sum, cat) => sum + cat.skills.length, 0);

const SkillTile = ({ skill, tileHover }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const Icon = skill.icon || Sparkles;

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-slate-200/85 bg-slate-50/75 px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:bg-slate-800/90 ${tileHover}`}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/90 bg-white transition-transform duration-200 group-hover:scale-105 dark:border-slate-700 dark:bg-white/95">
        {skill.logo && !imgFailed ? (
          <img
            src={skill.logo}
            alt={skill.name}
            width="20"
            height="20"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="size-5 object-contain"
          />
        ) : (
          <Icon className={`size-4.5 w-[18px] h-[18px] ${skill.iconColor || 'text-slate-600'}`} />
        )}
      </div>

      <span className="text-[13.5px] sm:text-sm font-medium text-slate-800 group-hover:text-slate-950 dark:text-slate-200 dark:group-hover:text-white leading-snug">
        {skill.name}
      </span>
    </div>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);

    if (sectionRef.current) {
      const targetY = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      if (Math.abs(window.scrollY - targetY) > 20) {
        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });
      }
    }
  };

  const visibleCategories =
    activeCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-label="Software Engineering Technical Skills and Core Competencies"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative bg-slate-50 py-20 sm:py-24 lg:py-28 border-t border-slate-200/80 text-slate-900 dark:bg-slate-950 dark:border-slate-800/80 dark:text-slate-100"
    >
      <meta itemProp="name" content="Software Engineering Technical Skills and Tech Stack" />
      <meta itemProp="description" content="Technical proficiencies in Next.js, React, Node.js, TypeScript, Distributed Backends, WebRTC, Databases, and Cloud Architecture." />
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Hand Side: My Skills & Interactive Category Index */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-medium tracking-wide text-cyan-700 dark:border-slate-800 dark:bg-slate-900 dark:text-cyan-300">
              Tech Stack &amp; Capabilities
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                My Skills
              </h2>
              <p className="text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Full-stack engineer building real-time, secure and scalable products: WebSocket/WebRTC backends, role-based APIs and fast Next.js frontends, deployed end to end.
              </p>
            </div>

            {/* Quick metrics bar */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/90">
                <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{SKILL_CATEGORIES.length}</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Skill Categories</p>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/90">
                <p className="text-2xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400">{TOTAL_SKILLS}+</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Tools &amp; Strengths</p>
              </div>
            </div>

            {/* Interactive Category Selector */}
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 space-y-1 dark:border-slate-800 dark:bg-slate-900/90">
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-all ${activeCategory === 'all'
                    ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950'
                    : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`size-2 rounded-full ${activeCategory === 'all' ? 'bg-cyan-400 dark:bg-slate-950' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                  />
                  <span>All Categories</span>
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-mono ${activeCategory === 'all'
                      ? 'bg-white/15 text-white dark:bg-slate-950/20 dark:text-slate-950'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                >
                  {TOTAL_SKILLS}
                </span>
              </button>

              {SKILL_CATEGORIES.map((category) => {
                const isSelected = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategorySelect(category.id)}
                    className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-all ${isSelected
                        ? 'bg-cyan-50 text-cyan-950 border border-cyan-200/90 dark:bg-cyan-950/60 dark:text-cyan-200 dark:border-cyan-800'
                        : 'text-slate-700 border border-transparent hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800/80'
                      }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className={`size-2 shrink-0 rounded-full ${category.dot}`} />
                      <span className="truncate">{category.title}</span>
                    </span>
                    <span
                      className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-mono ${isSelected
                          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/70 dark:text-cyan-200'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                    >
                      {String(category.skills.length).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Hand Side: Grouped by Category with Logos */}
          <div className="lg:col-span-7 space-y-5">
            <AnimatePresence mode="popLayout">
              {visibleCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <motion.div
                    layout
                    key={category.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-6 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 dark:border-slate-800 dark:bg-slate-900/85"
                  >
                    <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`flex size-11 shrink-0 items-center justify-center rounded-2xl border ${category.accent}`}
                        >
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[18px] mt-1 font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              {category.num}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                              {category.title}
                            </h3>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">{category.subtitle}</p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-mono font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {String(category.skills.length).padStart(2, '0')} items
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {category.skills.map((skill) => (
                        <SkillTile key={skill.name} skill={skill} tileHover={category.tileHover} />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
