import React, { useState, useEffect, useRef } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Mail,
  CheckCircle,
  Calendar,
  Users,
  Rocket,
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  Smartphone,
  ArrowRight,
  ExternalLink,
  Cpu,
  Eye,
  Zap,
  Layers,
  ShoppingBag,
} from "lucide-react";
import { useTheme } from "../components/ThemeContext";

import { useNavigate, Link } from "react-router-dom";
import SEO from "../components/SEO";


// --- CONFIGURATION ---
const websiteConfig = {
  profile: {
    name: "Hamim Reja",
    role: "Full-Stack Developer & ECE Engineer",
    email: "hamim.reja.mail@gmail.com",
    location: "Kolkata, India",
    photo: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918643/HamimReja_vmphrh.jpg",
    socials: {
      github: "https://github.com/hamimreja-404",
      linkedin: "https://linkedin.com/in/hamim-reja-a2ba42279",
      twitter: "#",
    },
  },
  designSystem: {
    colorPalette: {
      lightMode: {
        primary: "#0EA5E9", // Sky Blue
        secondary: "#8B5CF6", // Violet
        background: "#FFFFFF",
        surface: "#F8FAFC",
        textPrimary: "#0F172A",
        textSecondary: "#64748B",
        border: "#E2E8F0",
        accentGreen: "#10B981",
        accentAmber: "#F59E0B",
      },
      darkMode: {
        primary: "#38BDF8",
        secondary: "#A78BFA",
        background: "#0F172A",
        surface: "#1E293B",
        textPrimary: "#F1F5F9",
        textSecondary: "#94A3B8",
        border: "#334155",
        accentGreen: "#22C55E",
        accentAmber: "#FBBf24",
      },
    },
  },
  navbar: {
    items: [
      { label: "Home", link: "#home" },
      { label: "About", link: "#about" },
      { label: "Portfolio", link: "#portfolio" },
      { label: "Services", link: "#services" },
      { label: "Products", link: "#products" },
      { label: "Contact", link: "#contact" },
    ],
  },
  homepage: {
    hero: {
      greeting: "Hello, I'm Hamim 👋",
      headline: "Bridging Software & Hardware",
      subheadline:
        "I build scalable Full-Stack Web Applications and intelligent Edge AI systems. Merging the power of MERN stack with embedded engineering.",
      ctas: [
        { label: "View Portfolio", link: "/portfolio", primary: true },
        { label: "Explore Products", link: "/products", primary: false },
      ],
    },
    stats: [
      { number: 15, label: "Projects Built", icon: "rocket", suffix: "+" },
      { number: 3, label: "Years Coding", icon: "code-2", suffix: "+" },
      { number: 10, label: "Tech Stack Tools", icon: "layers", suffix: "+" },
      { number: 100, label: "Commits/Month", icon: "github", suffix: "+" },
    ],
    projects: [
      {
        title: "AI Smart Glasses",
        description:
          "Assistive wearable device for the visually impaired using YOLOv10 & OpenCV on Raspberry Pi Zero 2W. Features real-time obstacle detection and face recognition.",
        tags: ["Python", "YOLOv10", "OpenCV", "Edge AI"],
        image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918280/Drishti_gdfyxu.jpg",
        githubLink: "https://github.com/hamimreja-404/Final-Year-Project",
        demoLink: false,
      },
      {
        title: "MediQ Healthcare Platform",
        description:
          "Comprehensive doctor-patient ecosystem with complex MongoDB aggregation for scheduling, filtering, and JWT-secured appointment booking.",
        tags: ["MERN Stack", "Redux", "JWT", "Rest API"],
            image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918294/MediQ_s77erp.png",
        githubLink: false,
        demoLink: false,
      },
      {
        title: "EduTrack SaaS for Tuition Centers",
        description:
          "Our platform makes exams fully digital, students access forms, admit cards, and results online, while teachers share updates instantly, no paperwork needed.",
        tags: ["React", "Node.js", "Tailwind", "RBAC"],
        image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918293/Tuition_etgspm.png",
        githubLink: "https://github.com/hamimreja-404/Tuition_Frontend",
        demoLink: "https://tuition-frontend-three.vercel.app/",
      },
      {
        title: "FPGA UART Protocol",
        description:
          "Designed a UART transmitter and receiver with configurable baud rates using Verilog, verified via Xilinx Vivado simulations.",
        tags: ["Verilog", "FPGA", "Xilinx", "Hardware"],
        image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918298/UART_cyx5fi.png",
        githubLink:"https://github.com/hamimreja-404/UART",
        demoLink: false,
      },
    ],
    products: [
      {
        title: "EduTrack SaaS for Tuition Centers",
        description:
          "Our platform makes exams fully digital, students access forms, admit cards, and results online, while teachers share updates instantly, no paperwork needed.",
        price: "SaaS",
        features: [
          "Payment Tracking",
          "Dashboard Analytics",
          " Online Exam Forms",
          "Admit Card Generation",
          "Marksheets Access",
        ],
        buttonLabel: "Explore EduTrack",
        link: "/products",
      },
      {
        title: "MediQ",
        description:
          "Comprehensive doctor-patient ecosystem with complex MongoDB aggregation for scheduling, filtering, and JWT-secured appointment booking.",
        price: "SaaS",
        features: [
          "Book Appointments",
          "Advanced Doctor Filtering",
          "Real-time Slot Availability",
          "Role-based Access Control (Admin/Doctor/Patient)",
          "Appointment History Tracking",
          "Automated Email & SMS Notifications",
        ],
        buttonLabel: "Comming Soon",
        link: "/products",
      },
    ],
    services: [
      {
        title: "Full-Stack Development",
        desc: "Building end-to-end web applications using the MERN stack (MongoDB, Express, React, Node.js).",
        icon: "layout",
      },
      {
        title: "Edge AI & Computer Vision",
        desc: "Deploying lightweight AI models (YOLO) on resource-constrained hardware like Raspberry Pi.",
        icon: "eye",
      },
      {
        title: "Embedded Systems",
        desc: "Designing digital systems with Verilog, FPGA interfacing, and microcontroller programming.",
        icon: "cpu",
      },
      {
        title: "API Architecture",
        desc: "Creating secure, scalable RESTful APIs with complex aggregation pipelines and authentication.",
        icon: "server",
      },
    ],
    techStack: [
      { name: "React", icon: "code-2" },
      { name: "Node.js", icon: "server" },
      { name: "MongoDB", icon: "database" },
      { name: "Python", icon: "code-2" },
      { name: "Verilog", icon: "cpu" },
      { name: "AWS", icon: "globe" },
    ],
  },
};

// --- ICON MAPPING ---
const IconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  "check-circle": CheckCircle,
  calendar: Calendar,
  users: Users,
  rocket: Rocket,
  layout: Layout,
  smartphone: Smartphone,
  server: Server,
  globe: Globe,
  database: Database,
  "code-2": Code2,
  cpu: Cpu,
  eye: Eye,
  layers: Layers,
  zap: Zap,
};

const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) observer.unobserve(countRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    let animationFrame;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return { count, countRef };
};

// --- ISOLATED COMPONENTS ---

const StatItem = ({ item, themeColors }) => {
  const { count, countRef } = useCounter(item.number);
  const Icon = IconMap[item.icon];

  return (
    <div ref={countRef} className="text-center p-6 group">
      <div
        className="inline-flex p-4 rounded-2xl mb-4 transition-transform group-hover:scale-110 duration-300"
        style={{ backgroundColor: `${themeColors.surface}` }}
      >
        {Icon && <Icon size={32} color={themeColors.primary} />}
      </div>
      <div
        className="text-4xl font-bold mb-2 font-heading"
        style={{ color: themeColors.textPrimary }}
      >
        {count}
        {item.suffix}
      </div>
      <div
        className="text-sm font-medium uppercase tracking-wider"
        style={{ color: themeColors.textSecondary }}
      >
        {item.label}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function HomePage() {
  const { isDark, themeColors, toggleTheme } = useTheme();
  const navigate = useNavigate();
  // Inject Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textPrimary,
        fontFamily: "'Inter', sans-serif",
      }}
    >
    <SEO 
        title="Home" 
        description="Welcome to the portfolio of Hamim Reja. Explore projects in MERN Stack, Edge AI, and Embedded Systems."
      />
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-32 pb-20 px-6 min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Blobs */}
        <div
          className="absolute top-[20%] right-[-10%] w-96 h-96 rounded-full blur-[100px] opacity-20 animate-pulse"
          style={{ backgroundColor: themeColors.primary }}
        ></div>
        <div
          className="absolute bottom-[10%] left-[-10%] w-80 h-80 rounded-full blur-[100px] opacity-20 animate-pulse delay-700"
          style={{ backgroundColor: themeColors.secondary }}
        ></div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium animate-fade-in-up"
              style={{
                borderColor: themeColors.primary,
                color: themeColors.primary,
                backgroundColor: `${themeColors.primary}10`,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Available for Hire
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight animate-fade-in-up delay-100">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-violet-500">
                Hamim Reja
              </span>
              <br />
              <span
                style={{ color: themeColors.textPrimary, fontSize: "0.8em" }}
              >
                Full-Stack & ECE
              </span>
            </h1>

            <p
              className="text-lg md:text-xl max-w-xl animate-fade-in-up delay-200 leading-relaxed"
              style={{ color: themeColors.textSecondary }}
            >
              {websiteConfig.homepage.hero.subheadline}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 animate-fade-in-up delay-300">
              {websiteConfig.homepage.hero.ctas.map((cta, idx) => (
                <Link
                  key={idx}
                  to={cta.link}
                  className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-1 ${cta.primary ? "shadow-lg hover:shadow-xl" : "border-2"}`}
                  style={
                    cta.primary
                      ? {
                          background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
                          color: "#ffffff",
                          boxShadow: `0 4px 15px ${themeColors.primary}4D`,
                        }
                      : {
                          borderColor: themeColors.border,
                          color: themeColors.textPrimary,
                        }
                  }
                  onMouseEnter={
                    !cta.primary
                      ? (e) => {
                          e.target.style.borderColor = themeColors.primary;
                          e.target.style.color = themeColors.primary;
                        }
                      : null
                  }
                  onMouseLeave={
                    !cta.primary
                      ? (e) => {
                          e.target.style.borderColor = themeColors.border;
                          e.target.style.color = themeColors.textPrimary;
                        }
                      : null
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-6 animate-fade-in-up delay-500">
              <span
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: themeColors.textSecondary }}
              >
                Expertise:
              </span>
              <div className="flex gap-4 opacity-70">
                <Code2 size={24} />
                <Cpu size={24} />
                <Database size={24} />
                <Eye size={24} />
              </div>
            </div>
          </div>

          {/* Visual Element - Code Block */}
          <div className="hidden lg:block relative animate-float">
            <div
              className="rounded-2xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 border relative z-20 backdrop-blur-sm"
              style={{
                backgroundColor: isDark
                  ? "rgba(30, 41, 59, 0.9)"
                  : "rgba(255, 255, 255, 0.9)",
                borderColor: themeColors.border,
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs font-mono opacity-50">profile.ts</div>
              </div>

              <div className="font-mono text-sm space-y-3 leading-relaxed">
                <div style={{ color: themeColors.secondary }}>
                  const{" "}
                  <span style={{ color: themeColors.primary }}>engineer</span> ={" "}
                  {"{"}
                </div>
                <div className="pl-6">
                  <span style={{ color: themeColors.textPrimary }}>name:</span>{" "}
                  <span style={{ color: themeColors.accentGreen }}>
                    'Hamim Reja'
                  </span>
                  ,
                </div>
                <div className="pl-6">
                  <span style={{ color: themeColors.textPrimary }}>role:</span>{" "}
                  <span style={{ color: themeColors.accentAmber }}>
                    'Full-Stack Developer'
                  </span>
                  ,
                </div>
                <div className="pl-6">
                  <span style={{ color: themeColors.textPrimary }}>
                    skills:
                  </span>{" "}
                  [
                </div>
                <div className="pl-12">
                  <span style={{ color: themeColors.accentAmber }}>
                    'MERN Stack'
                  </span>
                  ,
                  <span style={{ color: themeColors.accentAmber }}>
                    'YOLOv10'
                  </span>
                  ,
                  <span style={{ color: themeColors.accentAmber }}>
                    'Verilog'
                  </span>
                </div>
                <div className="pl-6">],</div>
                <div className="pl-6">
                  <span style={{ color: themeColors.textPrimary }}>
                    hardware:
                  </span>{" "}
                  <span style={{ color: themeColors.secondary }}>true</span>, //
                  FPGA & RPi
                </div>
                <div className="pl-6">
                  <span style={{ color: themeColors.textPrimary }}>
                    location:
                  </span>{" "}
                  <span style={{ color: themeColors.accentGreen }}>
                    'Kolkata, India'
                  </span>
                </div>
                <div style={{ color: themeColors.secondary }}>{"}"};</div>
              </div>
            </div>

            {/* Floating Icons behind code block */}
            <div className="absolute -top-6 -right-6 p-4 rounded-2xl shadow-lg animate-bounce duration-3000 bg-white dark:bg-slate-800 z-10">
              <Cpu size={32} color={themeColors.secondary} />
            </div>
            <div className="absolute -bottom-8 -left-8 p-4 rounded-2xl shadow-lg animate-bounce duration-4000 delay-1000 bg-white dark:bg-slate-800 z-30">
              <Layers size={32} color={themeColors.primary} />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 border-y"
        style={{
          backgroundColor: themeColors.surface,
          borderColor: themeColors.border,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            {/* Profile Photo */}
            <div className="relative group order-2 md:order-1 animate-fade-in-up">
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-violet-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/5] border-2 shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01]"
                style={{ borderColor: themeColors.border }}
              >
                <img
                  src={websiteConfig.profile.photo}
                  alt={websiteConfig.profile.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium flex items-center gap-2">
                    <Globe size={16} className="text-sky-400" /> Based in
                    Kolkata, India
                  </p>
                </div>
              </div>
            </div>

            {/* Bio Text */}
            <div className="order-1 md:order-2">
              <h2
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: themeColors.primary }}
              >
                About Me
              </h2>
              <h3
                className="text-3xl md:text-4xl font-bold font-heading mb-6"
                style={{ color: themeColors.textPrimary }}
              >
                Engineering Solutions from Silicon to Cloud
              </h3>
              <div
                className="space-y-4 text-lg leading-relaxed"
                style={{ color: themeColors.textSecondary }}
              >
                <p>
                  I am an Electronics and Communication Engineering
                  undergraduate at{" "}
                  <b style={{ color: themeColors.textPrimary }}>
                    Aliah University
                  </b>{" "}
                  with a unique dual-focus.
                </p>
                <p>
                  My journey began with a curiosity for how things work at the
                  hardware level, leading me to master{" "}
                  <span style={{ color: themeColors.secondary }}>
                    FPGA & Verilog
                  </span>
                  . However, I soon realized the power of software to bring
                  these systems to life, which drove me to become proficient in
                  the{" "}
                  <span style={{ color: themeColors.primary }}>MERN Stack</span>
                  .
                </p>
                <p>
                  Today, I bridge the gap between low-level hardware design and
                  high-level software ecosystems, building intelligent Edge AI
                  systems and scalable web platforms that solve real-world
                  problems.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/contact"
                  className="font-semibold border-b-2 hover:border-transparent transition-colors"
                  style={{
                    color: themeColors.primary,
                    borderColor: themeColors.primary,
                  }}
                >
                  Get in Touch
                </Link>
                <Link
                  to="/portfolio"
                  className="font-semibold transition-colors hover:text-sky-500"
                  style={{ color: themeColors.textPrimary }}
                >
                  See My Work
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {websiteConfig.homepage.stats.map((stat, idx) => (
              <StatItem key={idx} item={stat} themeColors={themeColors} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: themeColors.primary }}
            >
              What I Do
            </h2>
            <h3 className="text-4xl font-bold font-heading">
              Services & Expertise
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {websiteConfig.homepage.services.map((service, idx) => {
              const ServiceIcon = IconMap[service.icon];
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                  style={{
                    backgroundColor: themeColors.surface,
                    borderColor: themeColors.border,
                  }}
                >
                  <div
                    className="mb-6 p-4 rounded-xl inline-block transition-colors group-hover:bg-white dark:group-hover:bg-slate-800 shadow-sm"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.03)",
                    }}
                  >
                    <ServiceIcon size={32} color={themeColors.primary} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 font-heading">
                    {service.title}
                  </h4>
                  <p
                    style={{ color: themeColors.textSecondary }}
                    className="text-sm leading-relaxed"
                  >
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="py-24 px-6 relative overflow-hidden"
        style={{ backgroundColor: themeColors.surface }}
      >
        {/* Decorative BG */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent opacity-50"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: themeColors.primary }}
              >
                Portfolio
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                Featured Projects
              </h3>
              <p style={{ color: themeColors.textSecondary }}>
                A mix of complex web platforms, hardware interfaces, and AI
                prototypes.
              </p>
            </div>
            <a
              href={websiteConfig.profile.socials.github}
              className="flex items-center gap-2 font-semibold hover:underline"
              style={{ color: themeColors.primary }}
            >
              View GitHub <ArrowRight size={20} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {websiteConfig.homepage.projects.map((project, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  backgroundColor: themeColors.background,
                  borderColor: themeColors.border,
                }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {
                      project.githubLink && (
                    <Link
                      to={project.githubLink}
                      className="p-3 bg-white rounded-full text-gray-900 hover:bg-sky-500 hover:text-white transition-colors transform hover:scale-110"
                    >
                      <Github size={22} />
                    </Link>
                      )
                    }
                    {project.demoLink && (
                      <Link
                      to={project.demoLink}
                      className="p-3 bg-white rounded-full text-gray-900 hover:bg-sky-500 hover:text-white transition-colors transform hover:scale-110"
                      >
                        <ExternalLink size={22} />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="p-8">
                  <h3
                    className="text-2xl font-bold mb-3 font-heading"
                    style={{ color: themeColors.textPrimary }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="mb-6 leading-relaxed text-sm"
                    style={{ color: themeColors.textSecondary }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${themeColors.primary}10`,
                          color: themeColors.primary,
                          border: `1px solid ${themeColors.primary}20`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-3"
              style={{ color: themeColors.primary }}
            >
              Innovation
            </h2>
            <h3 className="text-4xl font-bold font-heading mb-6">
              SaaS & Products
            </h3>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: themeColors.textSecondary }}
            >
              Ready-to-deploy software solutions and open-source modules I've
              engineered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {websiteConfig.homepage.products.map((product, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-2xl border overflow-hidden hover:shadow-xl transition-shadow"
                style={{
                  backgroundColor: themeColors.surface,
                  borderColor: themeColors.border,
                }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <ShoppingBag size={100} />
                </div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <h4 className="text-2xl font-bold font-heading">
                    {product.title}
                  </h4>
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                    {product.price}
                  </span>
                </div>
                <p
                  className="mb-6 leading-relaxed relative z-10"
                  style={{ color: themeColors.textSecondary }}
                >
                  {product.description}
                </p>
                <ul className="space-y-2 mb-8 relative z-10">
                  {product.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm font-medium"
                      style={{ color: themeColors.textPrimary }}
                    >
                      <CheckCircle size={16} className="text-green-500" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-lg font-bold border-2 transition-colors relative z-10"
                  style={{
                    borderColor: themeColors.primary,
                    color: themeColors.primary,
                  }}
                  onClick={() => navigate(`${product.link}`)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = themeColors.primary;
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = themeColors.primary;
                  }}
                >
                  {product.buttonLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-6">
        <div
          className="container mx-auto rounded-3xl p-12 md:p-24 text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
          }}
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading relative z-10">
            Have an Idea? Let's Build It.
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto relative z-10">
            Whether it's a SaaS platform, a hardware prototype, or an AI
            integration, I'm ready to help you engineer the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${websiteConfig.profile.email}&su=Project%20Inquiry&body=Hi%20Hamim,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%20Please%20let%20me%20know%20a%20good%20time%20to%20connect.%0A%0AThanks.`}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg bg-white text-lg font-bold shadow-xl transition-transform hover:scale-105"
              style={{ color: themeColors.primary }}
            >
              <Mail size={20} />
              Send Email
            </a>
            <a
              href={websiteConfig.profile.socials.linkedin}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg border-2 border-white/30 text-white text-lg font-bold hover:bg-white/10 transition-colors"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
