
import React, { useState, useEffect } from "react";
import {
  Zap,
  Lock,
  Clock,
  CheckCircle,
  TrendingUp,
  Shield,
  Users,
  FileText,
  Calendar,
  Download,
  Search,
  Layout,
  Bell,
  ArrowRight,
  Database,
  Server,
  Star,
  Rocket,
  Loader, // Added Loader
  X       // Added X for Toast close button
} from "lucide-react";

import { useTheme } from "../components/ThemeContext";
import SEO from "../components/SEO";
// --- DATA ---
const tuitionFeatures = [
  {
    icon: FileText,
    title: "Exam Management",
    desc: "Admins can post new exams, set schedules, and manage varied syllabi effortlessly.",
  },
  {
    icon: Download,
    title: "Admit Card Distribution",
    desc: "Automated generation of admit cards. Students can download them instantly before exams.",
  },
  {
    icon: TrendingUp,
    title: "Marksheet Portal",
    desc: "Secure upload of results by admins. Students access detailed marksheets with one click.",
  },
  {
    icon: Users,
    title: "Student Dashboard",
    desc: "A personal space for students to fill exam forms, track attendance, and view history.",
  },
];

const roadmapData = [
  {
    date: "Q3 2025",
    title: "Tuition System Beta",
    desc: "Core features: Exam posting and Student dashboard.",
    status: "completed",
  },
  {
    date: "Q4 2025",
    title: "Tuition System V1.0",
    desc: "Added Admit Card automation and Marksheet generation.",
    status: "completed",
  },
  {
    date: "Q1 2026",
    title: "MediQ Architecture",
    desc: "Database schema design and Security protocols implementation.",
    status: "in-progress",
  },
  {
    date: "Q3 2026(Expected)",
    title: "MediQ Public Launch",
    desc: "Full release with Doctor Onboarding and Patient Booking.",
    status: "upcoming",
  },
];

// --- COMPONENTS ---

export default function ProductsPage() {
  const { isDark, themeColors: colors, toggleTheme } = useTheme();
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false); // Toast state
  const [statusMessage, setStatusMessage] = useState(""); // Used for error/success text
  const API_URL = import.meta.env.VITE_API_URL;
  const handleJoinWaitlist = async (e) => {
    e.preventDefault(); 

    if (!number) return;

    setIsLoading(true);
    setStatusMessage("");
    setShowToast(false);

    try {
      const response = await fetch(`${API_URL}/early-access`, { // Ensure full URL if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: number }),
      });
      
      const data = await response.json(); // Parse JSON response

      if (data.success) { // Check for success flag from backend
        setStatusMessage("Thanks for joining! We'll be in touch.");
        setNumber(""); 
        setShowToast(true); // Show success toast
        
        // Hide toast after 5 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 5000);

      } else {
        // Handle API error (e.g. "Email already exists")
        setStatusMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300 pt-12 pb-20 relative"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
        fontFamily: "'Inter', sans-serif",
      }}
    >
    <SEO 
      title="SaaS Products" 
      description="Explore EduTrack and MediQ - Scalable SaaS platforms for Education and Healthcare engineered by Hamim Reja."
      url="/products"
    />
      <div className="container mx-auto px-6">
        {/* --- HEADER --- */}
        <div className="text-center mb-24">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-opacity-10 mb-6"
            style={{ backgroundColor: `${colors.primary}15` }}
          >
            <Rocket size={16} style={{ color: colors.primary }} />
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: colors.primary }}
            >
              SaaS Products
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Software that Scale
          </h1>
          <p
            className="max-w-2xl mx-auto text-lg"
            style={{ color: colors.textSecondary }}
          >
            Building specialized platforms to solve critical problems in
            Education and Healthcare.
          </p>
        </div>

        {/* --- PRODUCT 1: MEDIQ (MYSTERY/COMING SOON) --- */}
        <section
          className="mb-32 relative rounded-3xl overflow-hidden border shadow-2xl"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="grid lg:grid-cols-2 gap-12 p-8 lg:p-16 relative z-10">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 flex items-center gap-1">
                  <Clock size={12} /> Coming Soon
                </span>
                <span
                  className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-sky-500/10"
                  style={{ color: colors.primary }}
                >
                  Healthcare
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                MediQ
              </h2>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-rose-500">
                    <Zap size={20} /> The Problem
                  </h3>
                  <p className="text-lg leading-relaxed opacity-80">
                    For many people, getting medical care isn’t easy. It means
                    waiting in packed clinics, searching endlessly for the right
                    specialist, and juggling repeated phone calls just to
                    confirm an appointment. What should be simple often turns
                    stressful and exhausting.
                  </p>
                </div>

                <div
                  className="p-6 rounded-xl border-l-4"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.primary,
                  }}
                >
                  <p
                    className="italic font-medium"
                    style={{ color: colors.textSecondary }}
                  >
                    "Healthcare isn’t broken — it’s disconnected."
                  </p>
                </div>
              </div>

              {/* Waitlist Form */}
              <div className="mt-4">
                <p className="font-bold mb-3">
                  Join the waitlist for early access
                </p>

                <form
                  onSubmit={handleJoinWaitlist}
                  className="flex gap-2 max-w-md"
                >
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    disabled={isLoading}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className="flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent disabled:opacity-50"
                    style={{ borderColor: colors.border }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 rounded-lg font-bold text-white transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    {isLoading ? (
                         <><Loader className="animate-spin mr-2" size={20} /> Joining...</>
                    ) : "Notify Me"}
                  </button>
                </form>

                {/* Error Message Display (Inline) */}
                {statusMessage && !showToast && (
                  <p className="mt-3 text-sm text-red-500">
                    {statusMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Mystery UI Visual */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center h-[500px]">
              {/* Blurred Content */}
              <div className="absolute inset-0 opacity-30 filter blur-sm">
                {/* Mock UI Elements */}
                <div className="p-6 grid gap-4">
                  <div className="h-12 w-full bg-slate-700 rounded-lg"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-32 bg-slate-700 rounded-lg"></div>
                    <div className="h-32 bg-slate-700 rounded-lg"></div>
                    <div className="h-32 bg-slate-700 rounded-lg"></div>
                  </div>
                  <div className="h-64 bg-slate-700 rounded-lg"></div>
                </div>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8">
                <Lock size={48} className="text-slate-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Top Secret Features
                </h3>
                <p className="text-slate-400 max-w-xs mb-8">
                  Pricing and advanced algorithms will be revealed at launch.
                </p>
                <div className="flex gap-8 text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold font-mono">04</div>
                    <div className="text-xs uppercase tracking-widest text-slate-500">
                      Months
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-mono">12</div>
                    <div className="text-xs uppercase tracking-widest text-slate-500">
                      Days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PRODUCT 2: TUITION MANAGEMENT (LIVE) --- */}
        <section className="mb-32 edutech">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-20"></div>
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl border"
                style={{ borderColor: colors.border }}
              >
                <img
                  src= "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918293/Tuition_etgspm.png"
                  alt="Dashboard Preview"
                  className="w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <div className="flex items-center ">
                    <CheckCircle className="text-emerald-400" size={20} />
                    <span className="font-bold">
                      System Status: Operational
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500">
                  Live Product
                </span>
                <span
                  className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-sky-500/10"
                  style={{ color: colors.primary }}
                >
                  EdTech
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Tuition Manager
              </h2>
              <p
                className="text-lg leading-relaxed mb-8"
                style={{ color: colors.textSecondary }}
              >
                A complete digital ecosystem for coaching centers. We replace
                manual paperwork with automated workflows, from exam creation to
                result declaration.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {tuitionFeatures.map((feat, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1">
                      <feat.icon size={24} style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{feat.title}</h4>
                      <p className="text-xs leading-relaxed opacity-70">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Tiers for Tuition Manager */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Starter",
                price: "₹999",
                sub: "/month",
                feats: [
                  "Up to 50 Students",
                  "Basic Exam Posting",
                  "Result Uploads",
                ],
              },
              {
                title: "Institute",
                price: "₹4,999",
                sub: "/month",
                rec: true,
                feats: [
                  "Up to 200 Students",
                  "Auto Admit Cards",
                  "Marksheet Generation",
                  "Email Support",
                ],
              },
              {
                title: "Network",
                price: "₹9,999",
                sub: "/month",
                feats: [
                  "Unlimited Students",
                  "White-label Domain",
                  "Priority Support",
                  "Custom API Access",
                ],
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-2xl border flex flex-col ${tier.rec ? "shadow-2xl scale-105 z-10" : ""}`}
                style={{
                  backgroundColor: tier.rec
                    ? colors.surface
                    : colors.background,
                  borderColor: tier.rec ? colors.primary : colors.border,
                }}
              >
                {tier.rec && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg"
                    style={{
                      background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    Best Value
                  </div>
                )}
                <h3 className="text-xl font-bold mb-4">{tier.title}</h3>
                <div
                  className="text-4xl font-bold mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  {tier.price}
                  <span className="text-base font-normal opacity-60">
                    {tier.sub}
                  </span>
                </div>
                <div className="flex-1 mt-8 space-y-4 mb-8">
                  {tier.feats.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle size={16} className="text-emerald-500" />
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all ${tier.rec ? "text-white shadow-lg" : "border-2"}`}
                  style={
                    tier.rec
                      ? {
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        }
                      : {
                          borderColor: colors.border,
                          color: colors.textPrimary,
                        }
                  }
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* --- ROADMAP --- */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Product Roadmap
            </h2>
            <p style={{ color: colors.textSecondary }}>
              The journey of continuous improvement.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div
                className="absolute top-0 bottom-0 left-[20px] md:left-1/2 md:-translate-x-1/2 w-0.5 border-l-2 border-dashed opacity-30"
                style={{ borderColor: colors.primary }}
              ></div>

              {roadmapData.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row gap-8 mb-12 relative ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Date Bubble (Mobile: Left, Desktop: Center) */}
                  <div
                    className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full border-4 flex items-center justify-center bg-white dark:bg-slate-900 z-10"
                    style={{
                      borderColor:
                        item.status === "completed"
                          ? colors.success || "#10B981"
                          : colors.primary,
                    }}
                  >
                    {item.status === "completed" ? (
                      <CheckCircle size={18} className="text-emerald-500" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                    )}
                  </div>

                  <div className="flex-1 pl-16 md:pl-0 md:text-right">
                    {idx % 2 !== 0 && (
                      <div className="md:pr-16">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1">
                          {item.date}
                        </span>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm opacity-80">{item.desc}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 pl-16">
                    {idx % 2 === 0 && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-1">
                          {item.date}
                        </span>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm opacity-80">{item.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      {/* --- SUCCESS TOAST NOTIFICATION --- */}
      {showToast && (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 animate-[slideIn_0.3s_ease-out]">
            <div className="flex items-start gap-4 p-5 rounded-xl shadow-2xl border backdrop-blur-md"
                  style={{ 
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)', 
                      borderColor: '#10B981', // Hardcoded emerald green or use colors.success if available
                      borderLeftWidth: '6px'
                  }}>
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-lg" style={{ color: colors.textPrimary }}>You're In!</h4>
                    <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                        {statusMessage}
                    </p>
                </div>
                <button 
                    onClick={() => setShowToast(false)} 
                    className="opacity-50 hover:opacity-100 transition-opacity ml-2">
                    <X size={18} style={{ color: colors.textSecondary }} />
                </button>
            </div>
        </div>
      )}
      
      {/* Simple Keyframe for Toast Animation */}
      <style>{`
        @keyframes slideIn {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}