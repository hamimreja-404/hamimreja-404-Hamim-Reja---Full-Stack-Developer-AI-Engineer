import React, { useState, useEffect } from "react";
import {
  Code2,
  Cpu,
  Search,
  CheckCircle,
  BookOpen,
  Hammer,
  GraduationCap,
  Award,
  Heart,
  Lightbulb,
  Briefcase,
  Zap,
  Globe,
  Camera,
  Coffee,
  User,
  Users,
  Mountain,
  Gamepad2,
  Music,
} from "lucide-react";
import { useTheme } from "../components/ThemeContext";
import SEO from "../components/SEO";
export default function AboutPage() {
  const { isDark, themeColors: colors, toggleTheme } = useTheme();

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
      className="min-h-screen font-sans transition-colors duration-300 pt-12 pb-20"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
        fontFamily: "'Inter', sans-serif",
      }}
    >
    <SEO 
        title="About Me" 
        description="Learn about Hamim Reja's journey from Electronics Engineering to Full-Stack Development."
        url="/about"
      />
      <div className="container mx-auto px-6">
        {/* --- HERO HEADER --- */}
        <section className="mb-20 max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-opacity-10 mb-6"
            style={{ backgroundColor: `${colors.primary}15` }}
          >
            <div
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: colors.primary }}
            ></div>
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: colors.primary }}
            >
              My Journey
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-8 leading-tight">
            Not Just an Engineer by Degree,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-violet-500">
              But by Passion.
            </span>
          </h1>
        </section>

        {/* --- VISUAL STORYTELLING (ZIG-ZAG) --- */}
        <section className="mb-32 space-y-24">
          {/* Block 1: The Spark (Hardware) */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1631378297854-185cff6b0986?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJkdWlub3xlbnwwfHwwfHx8MA%3D%3D"
                  alt="Electronics Workbench"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div
                className="p-3 rounded-xl inline-block"
                style={{ backgroundColor: `${colors.secondary}15` }}
              >
                <Cpu size={32} style={{ color: colors.secondary }} />
              </div>
              <h2 className="text-3xl font-bold font-heading">
                The Hardware Foundation
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                My journey didn't start with code editors; it started with
                breadboards and soldering irons. Fascinated by how silicon chips
                could "think," I pursued{" "}
                <strong style={{ color: colors.textPrimary }}>
                  Electronics and Communication Engineering
                </strong>
                . Mastering{" "}
                <span style={{ color: colors.secondary }}>VLSI Design</span> and{" "}
                <span style={{ color: colors.secondary }}>FPGA</span>{" "}
                architecture gave me a deep understanding of the physical layer
                that powers our digital world.
              </p>
            </div>
          </div>

          {/* Block 2: The Shift (Software) */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div
                className="p-3 rounded-xl inline-block"
                style={{ backgroundColor: `${colors.primary}15` }}
              >
                <Code2 size={32} style={{ color: colors.primary }} />
              </div>
              <h2 className="text-3xl font-bold font-heading">
                Discovering the Soul
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                I soon realized that while hardware is the body, software is the
                soul. I wanted to build complete, interactive systems. I dove
                headfirst into the world of Full-Stack Development, mastering
                the{" "}
                <strong style={{ color: colors.primary }}>MERN Stack</strong>.
                This shift allowed me to turn static circuits into dynamic,
                user-centric applications.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwY29kaW5nfGVufDB8fDB8fHww"
                  alt="Coding Setup"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Block 3: The Integration (Hybrid) */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1597862624146-142dbb8acfab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnBnYXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Advanced Robotics"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div
                className="p-3 rounded-xl inline-block"
                style={{ backgroundColor: `${colors.primary}15` }}
              >
                <Globe size={32} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold font-heading">
                The Hybrid Engineer
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                Today, I stand at the intersection. Whether it's designing a
                high-performance UART protocol in Verilog or architecting a
                scalable SaaS platform, I bring a holistic perspective. I bridge
                the gap between silicon and cloud, ensuring that every line of
                code respects the hardware it runs on.
              </p>
            </div>
          </div>
        </section>

        {/* --- METHODOLOGY SECTION --- */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">
              How I Solve Problems
            </h2>
            <p
              className="max-w-2xl mx-auto"
              style={{ color: colors.textSecondary }}
            >
              My engineering process is rooted in pragmatism and thorough
              research.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-sky-500 to-violet-500 opacity-30 -z-10"></div>

            {[
              {
                step: "01",
                title: "Identify",
                desc: "I observe real-world friction points in daily life—be it for a small business or a student.",
                icon: Search,
              },
              {
                step: "02",
                title: "Feasibility",
                desc: "I analyze the constraints. Can this be solved with tech? Is it scalable? Is it cost-effective?",
                icon: CheckCircle,
              },
              {
                step: "03",
                title: "Research",
                desc: "Deep dive into existing solutions, architectural patterns, and selecting the right tech stack.",
                icon: BookOpen,
              },
              {
                step: "04",
                title: "Implement",
                desc: "Building the solution with clean code, followed by rigorous testing and deployment.",
                icon: Hammer,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl border bg-opacity-50 backdrop-blur-sm group hover:-translate-y-2 transition-transform duration-300"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg transition-transform group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  }}
                >
                  <item.icon size={24} />
                </div>
                <div
                  className="text-4xl font-bold opacity-10 absolute top-4 right-4"
                  style={{ color: colors.textPrimary }}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 font-heading">
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: colors.textSecondary }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SKILLS & EXPERTISE --- */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Software Stack */}
            <div
              className="p-8 rounded-3xl border relative overflow-hidden group"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Globe size={150} />
              </div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <Code2 size={28} className="text-sky-500" />
                <h3 className="text-2xl font-bold font-heading">
                  Software Engineering
                </h3>
              </div>
              <div className="space-y-6 relative z-10">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-70">
                    MERN Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React.js",
                      "Node.js",
                      "Express",
                      "MongoDB",
                      "Redux",
                      "Next.js",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-md text-sm font-medium border transition-colors hover:border-sky-400 hover:text-sky-500 cursor-default"
                        style={{
                          borderColor: colors.border,
                          backgroundColor: colors.background,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-70">
                    Computer Vision & AI
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Python",
                      "YOLOv10",
                      "OpenCV",
                      "TensorFlow",
                      "Face Recognition",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-md text-sm font-medium border transition-colors hover:border-sky-400 hover:text-sky-500 cursor-default"
                        style={{
                          borderColor: colors.border,
                          backgroundColor: colors.background,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hardware Stack */}
            <div
              className="p-8 rounded-3xl border relative overflow-hidden group"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <Cpu size={150} />
              </div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <Cpu size={28} className="text-violet-500" />
                <h3 className="text-2xl font-bold font-heading">
                  Hardware Design
                </h3>
              </div>
              <div className="space-y-6 relative z-10">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-70">
                    Digital Systems
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Verilog HDL",
                      "FPGA (Spartan-3E)",
                      "RTL Design",
                      "Xilinx Vivado",
                      "Digital Logic",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-md text-sm font-medium border transition-colors hover:border-violet-400 hover:text-violet-500 cursor-default"
                        style={{
                          borderColor: colors.border,
                          backgroundColor: colors.background,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-70">
                    Embedded Systems
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Raspberry Pi",
                      "Arduino",
                      "UART/SPI Protocols",
                      "Sensors Interfacing",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-md text-sm font-medium border transition-colors hover:border-violet-400 hover:text-violet-500 cursor-default"
                        style={{
                          borderColor: colors.border,
                          backgroundColor: colors.background,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PERSONAL TOUCH / MISSION --- */}
        <section className="mb-24 rounded-3xl relative overflow-hidden text-white shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
              alt="Community Collaboration"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-slate-900/90"></div>
          </div>

          <div className="relative z-10 p-10 md:p-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex p-3 rounded-full bg-white/10 mb-6 backdrop-blur-sm">
              <Heart className="text-rose-400" size={24} fill="currentColor" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Empowering Local Heroes
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed italic mb-8">
              "I love to help small business owners, startups, clinics, and
              educational institutes establish their online presence. Solving
              their day-to-day problems gives my code purpose."
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left mt-12">
              <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <Lightbulb className="text-yellow-400 mb-2" size={20} />
                <h4 className="font-bold mb-1">Creative Builder</h4>
                <p className="text-sm text-slate-400">
                  If the tool doesn't exist, I build it.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <Briefcase className="text-green-400 mb-2" size={20} />
                <h4 className="font-bold mb-1">Business Centric</h4>
                <p className="text-sm text-slate-400">
                  Technology that simplifies business.
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                <Zap className="text-orange-400 mb-2" size={20} />
                <h4 className="font-bold mb-1">Impact First</h4>
                <p className="text-sm text-slate-400">
                  Success = Real problems solved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- EDUCATION & CERTIFICATIONS --- */}
        <section className="grid md:grid-cols-2 gap-12 mb-24">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={24} style={{ color: colors.primary }} />
              <h3 className="text-2xl font-bold font-heading">Education</h3>
            </div>
            <div
              className="border-l-2 ml-3 space-y-8 pl-8 relative"
              style={{ borderColor: colors.border }}
            >
              {/* Item 1 */}
              <div className="relative">
                <div
                  className="absolute -left-[39px] bg-white dark:bg-slate-900 p-1 rounded-full border-2"
                  style={{ borderColor: colors.primary }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                </div>
                <span className="text-sm font-mono opacity-60">
                  2022 - 2026 (Expected)
                </span>
                <h4 className="text-xl font-bold mt-1">B.Tech in ECE</h4>
                <p
                  className="font-medium mb-2"
                  style={{ color: colors.secondary }}
                >
                  Aliah University, Kolkata
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: colors.textSecondary }}
                >
                  CGPA: 7.68. Focused on Digital Systems, VLSI Design, and
                  Embedded Systems.
                </p>
              </div>
              {/* Item 2 */}
              <div className="relative">
                <div
                  className="absolute -left-[39px] bg-white dark:bg-slate-900 p-1 rounded-full border-2"
                  style={{ borderColor: colors.border }}
                >
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                </div>
                <span className="text-sm font-mono opacity-60">
                  2020 - 2022
                </span>
                <h4 className="text-xl font-bold mt-1">
                  Higher Secondary (Science)
                </h4>
                <p
                  className="font-medium mb-2"
                  style={{ color: colors.secondary }}
                >
                  Target Point (R) School
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: colors.textSecondary }}
                >
                  Achieved 89% marks with a focus on Physics, Mathematics, and
                  Computer Science.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award size={24} style={{ color: colors.secondary }} />
              <h3 className="text-2xl font-bold font-heading">
                Certifications & Internships
              </h3>
            </div>
            <div className="space-y-4">
              <div
                className="p-5 rounded-xl border flex gap-4 items-start transition-all hover:shadow-md"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <div className="mt-1 min-w-[40px] h-[40px] rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                  IR
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    Signal & Telecommunication Intern
                  </h4>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    Indian Railways (Sealdah Division)
                  </p>
                  <p className="text-xs opacity-70">
                    Analyzed Electronic Interlocking & MSDAC systems.
                  </p>
                </div>
              </div>

              <div
                className="p-5 rounded-xl border flex gap-4 items-start transition-all hover:shadow-md"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <div className="mt-1 min-w-[40px] h-[40px] rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">
                  eSim
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    Circuit Simulation Certification
                  </h4>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: colors.textSecondary }}
                  >
                    eSim
                  </p>
                  <p className="text-xs opacity-70">
                    Designed and simulated 3-input NAND gate using TTL logic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- NEW INTERACTIVE SECTION: Beyond the Terminal --- */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Camera size={24} style={{ color: colors.primary }} />
            <h3 className="text-2xl font-bold font-heading">
              Beyond the Terminal
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[400px]">
            {[
              {
                title: "Photography",
                icon: Camera,
                img: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918292/Photography_amozqh.jpg",
              },
              {
                title: "Me",
                icon: User,
                img: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918923/Gemini_Generated_Image_93jxie93jxie93jx_yksujc.png",
              },
              {
                title: "Friends",
                icon: Users,
                img: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918287/Friends_peihlh.jpg",
              },
              {
                title: "Trip",
                icon: Mountain,
                img: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918298/Trip_l8lxnd.jpg",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative w-full h-72 md:h-auto md:flex-1 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 md:hover:flex-[3] group"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 md:bg-black/40 md:group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-2 text-white transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform">
                    <item.icon size={20} />
                    <span className="font-bold text-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity delay-100 duration-300">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
