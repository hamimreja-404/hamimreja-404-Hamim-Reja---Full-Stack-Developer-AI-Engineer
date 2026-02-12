import React, { useState, useEffect } from "react";
import {
  Code2,
  Cpu,
  Globe,
  Github,
  ExternalLink,
  Layers,
  Zap,
  Eye,
  Database,
  Server,
  Wifi,
  Volume2,
  ArrowRight,
  Maximize2,
  AlertTriangle,
  Download,
  Smartphone,
  Monitor,
} from "lucide-react";
import { useTheme } from "../components/ThemeContext";
import SEO from "../components/SEO";
// --- DATA: PROJECTS ---
const projectsData = [
  {
    id: 1,
    title: "AI Smart Glasses for Visually Impaired",
    category: "AI/Vision",
    image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918280/Drishti_gdfyxu.jpg",
    tech: ["Python", "YOLOv10", "OpenCV", "Raspberry Pi Zero 2W"],
    challenge:
      "Visually impaired individuals face constant safety risks from unrecognized obstacles in dynamic environments. Existing solutions are often bulky or lack real-time processing.",
    solution:
      "Developed a lightweight wearable using a Raspberry Pi Zero 2W. Optimized YOLOv10 algorithms for edge computing to detect obstacles in real-time (30ms latency) and used OpenCV for face recognition, providing audio feedback via text-to-speech.",
    links: { demo: false, code: "https://github.com/hamimreja-404/Final-Year-Project" },
  },
  {
    id: 2,
    title: "MediQ - Healthcare Ecosystem",
    category: "Full Stack",
    image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918294/MediQ_s77erp.png",
    tech: ["React", "Node.js", "MongoDB Aggregations", "JWT", "Redux"],
    challenge:
      "For many people, getting medical care isn’t easy. It means waiting in packed clinics, searching endlessly for the right specialist, and juggling repeated phone calls just to confirm an appointment. What should be simple often turns stressful and exhausting.",
    solution:
      "MediQ puts you back in control. We let you find verified doctors and book instantly without making a call. Best of all, our live tracking means you know exactly when your turn is up—so you wait in comfort, not a plastic chair. It’s simple, organized healthcare that respects your schedule.",
    links: { demo: false, code: false },
  },
  {
    id: 3,
    title: "EduTrack SaaS for Tuition Centers",
    category: "Full Stack",
    image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918293/Tuition_etgspm.png",
    tech: ["MERN Stack", "Tailwind CSS", "Recharts", "Express Middleware"],
    challenge:
      "Before EduTrack SaaS, exam season was a logistical nightmare. Students stood in long queues just to grab a form or check a notice board, risking missed deadlines and lost paperwork. Teachers were buried under manual data entry, struggling to distribute marksheets and announcements effectively. It was slow, error-prone, and frustrating for everyone involved.",
    solution:
      "Our platform digitizes the entire exam lifecycle. Students can now fill forms, download admit cards, and access their marksheets instantly from home—no queues required. Teachers can post upcoming exams, notices, and results in seconds, ensuring everyone stays informed and organized without the paperwork chaos.",
    links: { demo: "https://tuition-frontend-three.vercel.app/", code: "https://github.com/hamimreja-404/Tuition_Frontend" },
  },
  {
    id: 4,
    title: "FPGA UART Protocol Design",
    category: "Hardware/IoT",
    image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918298/UART_cyx5fi.png",

    tech: ["Verilog", "Xilinx Vivado", "Digital Logic", "FPGA"],
    challenge:
      "Standard communication modules were too resource-heavy for a specific low-power embedded application.",
    solution:
      "Designed a custom lightweight UART transmitter and receiver in Verilog. Implemented configurable baud rates and verified signal integrity through extensive testbench simulations in Xilinx Vivado.",
    links: { demo: false, code: "https://github.com/hamimreja-404/UART" },
  },
  {
    id: 5,
    title: "Attendify - Smart Attendance App",
    category: "Mobile/Desktop",
    image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918293/Attendify_d9yb8w.png",
    tech: ["React Native", "TensorFlow Lite", "Face API", "Firebase"],
    challenge:
      "Small offices and clinics often rely on manual registers or expensive biometric hardware, leading to time theft and high setup costs.",
    solution:
      "Created a mobile-first attendance system using on-device face recognition. It offers geo-fencing for verified check-ins and generates automated monthly PDF reports for HR, eliminating hardware costs.",
    links: { demo: false, code: "https://github.com/hamimreja-404/Attendify", download: "/downloads/attendify.apk" },
  },
  {
    id: 6,
    title: "Automated Random Generator",
    category: "Mobile/Desktop",
    image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918294/Random_jtk0vn.png",
    tech: ["Python", "Tkinter", "NumPy", "PyInstaller"],
    challenge:
      "Researchers and teachers needed a reliable, bias-free tool to generate random datasets or pick lottery winners offline without internet dependency.",
    solution:
      "Developed a standalone desktop application with a clean GUI. Features include customizable number ranges, exclusion logic, distinct seed generation for reproducibility, and one-click CSV export.",
    links: {
      demo: false,
      code: "https://github.com/hamimreja-404/Random-Generator",
      download: "/downloads/random-gen-setup.exe",
    },
  },
];

// --- COMPONENT: WATER TANK SIMULATOR ---
const WaterTankProject = ({ colors }) => {
  const [waterLevel, setWaterLevel] = useState(30);
  const [isAlarm, setIsAlarm] = useState(false);

  useEffect(() => {
    setIsAlarm(waterLevel < 25 || waterLevel > 85);
  }, [waterLevel]);

  return (
    <div
      className="rounded-3xl border overflow-hidden shadow-lg transition-all hover:shadow-2xl"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
    <SEO 
        title="Projects" 
        description="Check out my latest projects: AI Smart Glasses, EduTrack SaaS, and MediQ Healthcare Platform."
        url="/portfolio"
      />
      <div className="grid lg:grid-cols-2 gap-0">
        {/* INTERACTIVE SIMULATION SIDE */}
        <div className="p-8 relative min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-b from-sky-900/10 to-blue-900/20">
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-sky-600">
            <Zap size={14} /> Interactive Demo
          </div>

          {/* Simulation Graphic */}
          <div
            className="relative w-48 h-64 border-4 rounded-xl backdrop-blur-sm z-10 flex flex-col justify-end overflow-hidden"
            style={{ borderColor: colors.textSecondary }}
          >
            {/* Sensor Graphic */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-lg flex justify-around items-center px-2 z-20">
              <div className="w-3 h-3 rounded-full bg-slate-600"></div>
              <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            </div>
            {/* Ultrasonic Waves */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-full h-full flex flex-col items-center opacity-20 pointer-events-none">
              <div className="w-0.5 h-full bg-dashed border-l border-slate-400"></div>
            </div>

            {/* Water */}
            <div
              className="w-full transition-all duration-300 relative"
              style={{
                height: `${waterLevel}%`,
                backgroundColor: isAlarm ? colors.danger : colors.primary,
                opacity: 0.8,
              }}
            >
              <div className="absolute top-0 w-full h-2 bg-white/30 animate-pulse"></div>
              {/* Bubbles */}
              <div className="absolute bottom-2 left-4 w-2 h-2 rounded-full bg-white/40 animate-bounce"></div>
              <div className="absolute bottom-6 right-8 w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-100"></div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="mt-8 w-full max-w-xs z-10">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>Fill Level</span>
              <span>{waterLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={waterLevel}
              onChange={(e) => setWaterLevel(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: colors.border }}
            />
          </div>
        </div>

        {/* INFO SIDE */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <Wifi size={24} className="text-emerald-500" />
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-500">
              IoT / Hardware
            </span>
          </div>

          <h3 className="text-3xl font-bold font-heading mb-4">
            Smart Water Tank Alarm
          </h3>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 rounded bg-slate-100 dark:bg-slate-800">
                <Cpu color="white" size={16} />
              </div>
              <div>
                <strong className="block text-sm">Logic Core</strong>
                <p className="text-sm opacity-70">
                  Arduino Nano processes distance data.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1 rounded bg-slate-100 dark:bg-slate-800">
                <Wifi color="white" size={16} />
              </div>
              <div>
                <strong className="block text-sm">Sensor Input</strong>
                <p className="text-sm opacity-70">
                  Ultrasonic Sensor (HC-SR04) measures depth.
                </p>
              </div>
            </div>
            <div
              className="flex items-start gap-3 transition-colors duration-300"
              style={{ color: isAlarm ? colors.danger : colors.textPrimary }}
            >
              <div className="mt-1 p-1 rounded bg-slate-100 dark:bg-slate-800">
                {isAlarm ? (
                  <AlertTriangle
                    color="white"
                    size={16}
                    className="animate-pulse"
                  />
                ) : (
                  <Volume2 color="white" size={16} />
                )}
              </div>
              <div>
                <strong className="block text-sm">Action Output</strong>
                <p className="text-sm opacity-70">
                  {isAlarm
                    ? "CRITICAL: Buzzer Active!"
                    : "Status: Monitoring..."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Arduino Nano", "C++", "HC-SR04", "Electronics"].map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-md text-xs font-bold border"
                style={{ borderColor: colors.border }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
          href="https://github.com/hamimreja-404/water-tank-monitoring"
            className="self-start font-bold border-b-2 hover:opacity-70 transition-opacity"
            style={{ color: colors.primary, borderColor: colors.primary }}
          >
            <p>Grab the Code</p>
          </a>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function PortfolioPage() {
  const { isDark, themeColors: colors, toggleTheme } = useTheme();
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Full Stack",
    "Hardware/IoT",
    "AI/Vision",
    "Mobile/Desktop",
  ];

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300 pt-12 pb-20"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="container mx-auto px-6">
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-opacity-10 mb-6"
            style={{ backgroundColor: `${colors.primary}15` }}
          >
            <Layers size={16} style={{ color: colors.primary }} />
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: colors.primary }}
            >
              Portfolio
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Featured Case Studies
          </h1>
          <p
            className="max-w-2xl mx-auto text-lg"
            style={{ color: colors.textSecondary }}
          >
            From soldering irons to server racks. Here is a selection of
            projects that demonstrate my ability to solve complex problems
            across the hardware-software spectrum.
          </p>
        </div>

        {/* --- FILTERS --- */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                filter === cat ? "shadow-lg scale-105" : "hover:bg-opacity-10"
              }`}
              style={{
                backgroundColor:
                  filter === cat ? colors.primary : colors.surface,
                color: filter === cat ? "#FFFFFF" : colors.textSecondary,
                border: filter === cat ? "none" : `1px solid ${colors.border}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- PROJECTS GRID --- */}
        <div className="space-y-24">
          {/* Render Standard Projects */}
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group grid lg:grid-cols-2 gap-12 items-center animate-in fade-in slide-in-from-bottom-8 duration-700"
            >
              {/* Image Side */}
              <div
                className={`relative rounded-3xl overflow-hidden shadow-2xl border ${idx % 2 === 1 ? "lg:order-2" : ""}`}
                style={{ borderColor: colors.border }}
              >
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 z-20 flex gap-4">
                  {
                    project.links.code && (

                  <a
                    href={project.links.code}
                    className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-lg"
                    title="View Code"
                  >
                    <Github size={20} />
                  </a>
                    )

                  }
                  {
                    project.links.demo && (
                  <a
                    href={project.links.demo}
                    className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-lg"
                    title="Live Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                    )
                  }
                  {project.links.download && (
                    <a
                      href={project.links.download}
                      className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-transform shadow-lg"
                      title="Download App"
                    >
                      <Download size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Side */}
              <div className={`${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-opacity-10"
                    style={{
                      backgroundColor: `${colors.primary}20`,
                      color: colors.primary,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <h2 className="text-3xl font-bold font-heading mb-6">
                  {project.title}
                </h2>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold mb-2 text-sm uppercase tracking-wide opacity-70">
                      <AlertTriangle size={16} className="text-orange-500" />{" "}
                      The Challenge
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{ color: colors.textSecondary }}
                    >
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-bold mb-2 text-sm uppercase tracking-wide opacity-70">
                      <Zap size={16} className="text-emerald-500" /> The
                      Solution
                    </h4>
                    <p
                      className="leading-relaxed"
                      style={{ color: colors.textSecondary }}
                    >
                      {project.solution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md text-sm font-medium border bg-opacity-50"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.surface,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Render Interactive Water Tank if Filter allows */}
          {(filter === "All" || filter === "Hardware/IoT") && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <WaterTankProject colors={colors} />
            </div>
          )}
        </div>

        {/* --- CALL TO ACTION --- */}
        <div
          className="mt-32 text-center p-12 rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
          style={{ borderColor: colors.border }}
        >
          <h3 className="text-2xl font-bold mb-4 text-white">
            Interested in the code?
          </h3>
          <p
            className="mb-8 max-w-xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Most of these projects are open-source. Dive into the repositories
            to see how I structure my code and handle edge cases.
          </p>
          <a
            href="https://github.com/hamimreja-404"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            }}
          >
            <Github size={20} />
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}
