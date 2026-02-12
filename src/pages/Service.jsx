import React, { useState, useEffect } from "react";
import {
  Code2,
  Cpu,
  Globe,
  Zap,
  CheckCircle,
  Clock,
  MessageSquare,
  Shield,
  ArrowRight,
  HelpCircle,
  Send,
  User,
  Mail,
  Briefcase,
  IndianRupee,
  Star,
  Quote,
  Loader, // Added missing import
  X       // Added missing import
} from "lucide-react";
import { useTheme } from "../components/ThemeContext";
import SEO from "../components/SEO";
// --- ICONS WRAPPER ---
// Defined before usage or hoisted, but safe to keep here or bottom.
function EyeIcon(props) {

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// --- DATA ---
const servicesData = [
  {
    id: 1,
    title: "Full-Stack Development",
    description:
      "Scalable web applications built with the MERN stack. From database design to responsive front-end interfaces.",
    icon: Globe,
    features: [
      "SaaS Platforms",
      "Custom Dashboards",
      "API Integration",
      "Secure Auth Systems",
    ],
  },
  {
    id: 2,
    title: "Hardware & IoT Prototyping",
    description:
      "Bridging the physical and digital worlds. I build smart devices using Arduino, Raspberry Pi, and FPGA.",
    icon: Cpu,
    features: [
      "Circuit Design",
      "Sensor Integration",
      "Embedded C/C++",
      "Real-time Data Sync",
    ],
  },
  {
    id: 3,
    title: "AI & Computer Vision",
    description:
      "Intelligent solutions that see and understand. Deploying lightweight models on edge devices.",
    icon: EyeIcon,
    features: [
      "Object Detection (YOLO)",
      "Face Recognition",
      "Edge AI Optimization",
      "Automated Reporting",
    ],
  },
  {
    id: 4,
    title: "Technical Consultation",
    description:
      "Unsure where to start? I help plan the architecture, select the right tech stack, and assess feasibility.",
    icon: MessageSquare,
    features: [
      "Architecture Planning",
      "Code Reviews",
      "Feasibility Studies",
      "MVP Strategy",
    ],
  },
];

const pricingData = [
  {
    title: "MVP / Prototype",
    price: "Starts at ₹999",
    desc: "Perfect for startups or students needing a proof-of-concept.",
    features: [
      "Core Functionality Implemented",
      "Single Page Web App",
      "1 Month Support",
      "Source Code Included",
    ],
    recommended: false,
  },
  {
    title: "Professional Solution",
    price: "Starts at ₹4999",
    desc: "Production-ready web apps or functional hardware prototypes.",
    features: [
      "Advanced Features & Security",
      "Responsive & Polished UI",
      "Database Optimization",
      "3 Months Support",
      "Deployment Setup",
    ],
    recommended: true,
  },
  {
    title: "Custom / Enterprise",
    price: "Custom Quote",
    desc: "Complex systems requiring bespoke hardware-software integration.",
    features: [
      "Full-Scale Architecture",
      "High Performance & Scalability",
      "Dedicated Project Manager",
      "Long-term Maintenance",
      "On-premise Deployment",
    ],
    recommended: false,
  },
];

const processData = [
  {
    step: "01",
    title: "Discovery",
    desc: "We discuss your idea, requirements, and constraints to define the scope.",
  },
  {
    step: "02",
    title: "Strategy & Design",
    desc: "I create a roadmap, wireframes, or circuit schematics for your approval.",
  },
  {
    step: "03",
    title: "Development",
    desc: "I build the solution using agile sprints, keeping you updated weekly.",
  },
  {
    step: "04",
    title: "Launch & Support",
    desc: "Deployment, final testing, and handover with documentation.",
  },
];

const faqData = [
  {
    q: "Do you provide source code?",
    a: "Yes, absolutely. Once the project is paid for, you own 100% of the source code and intellectual property.",
  },
  {
    q: "Can you combine hardware and software?",
    a: "Yes! That is my specialty. I can build a custom device (like a sensor node) and a web dashboard to display its data.",
  },
  {
    q: "What is your typical timeline?",
    a: "Simple MVPs take 1-2 weeks. Complex full-stack applications typically take 4-6 weeks depending on the features.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes, all professional packages come with a support period to fix bugs and ensure stability.",
  },
];

const testimonials = [
  {
    name: "A. Maitra",
    role: "Assistant Teacher, MARHS School",
    text: "This beautifully designed website features intuitive navigation, professional aesthetics, and mobile responsiveness. Information is well-organized and easily accessible, with fast loading times. A skillfully crafted digital platform that excellently represents the school.",
  },
  {
    name: "Md Minnatullah",
    role: "Bank Director, MDCCB Bank",
    text: "Attendify streamlines attendance management through phone camera technology and cloud synchronization, providing administrators real-time visibility. Its low-light functionality ensures reliable performance in any environment. An efficient solution that enhances institutional accuracy and oversight.",
  },
];

// --- MAIN COMPONENT ---
export default function ServicesPage() {
  const { isDark, themeColors: colors, toggleTheme } = useTheme();
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  // FIXED: Added budgetRange to initial state
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    isService: true, 
    subject: "Full-Stack Development", // Matched to first option
    budgetRange: "999 - 4,999",        // Matched to first option
    message: "" 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showToast, setShowToast] = useState(false);
const API_URL = import.meta.env.VITE_API_URL;
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Real-time Clock for IST
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    // Map the local state "subject" to the backend field "serviceType"
    const payload = {
      ...formData,
      serviceType: formData.subject, // Backend expects serviceType
      isService: true                // Explicitly set to true for this page
    };

    const response = await fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Send the updated payload
    });

    const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setIsSent(true);
        setShowToast(true);
        // Reset form
        setFormData({ 
            name: "", 
            email: "", 
            isService: true,
            subject: "Full-Stack Development", 
            budgetRange: "999 - 4,999",
            message: "" 
        });
        
        // Hide success state and toast after delay
        setTimeout(() => {
          setIsSent(false);
          setShowToast(false);
        }, 5000);
      } else {
        setIsSubmitting(false);
        console.error("Submission failed:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
      setIsSubmitting(false);
    }
  };

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
      title="Services" 
      description="Expert Full-Stack Development, Edge AI, and Hardware Prototyping services by Hamim Reja."
      url="/services"
    />
      <div className="container mx-auto px-6">
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-opacity-10 mb-6"
            style={{ backgroundColor: `${colors.primary}15` }}
          >
            <Zap size={16} style={{ color: colors.primary }} />
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: colors.primary }}
            >
              My Services
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Engineering Your Vision
          </h1>
          <p
            className="max-w-2xl mx-auto text-lg"
            style={{ color: colors.textSecondary }}
          >
            Whether you need a robust SaaS platform, a custom hardware
            prototype, or an AI integration, I provide end-to-end engineering
            solutions tailored to your needs.
          </p>
        </div>

        {/* --- SERVICE OFFERINGS --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-2xl border transition-all hover:shadow-xl group"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-sky-500 group-hover:text-white"
                style={{
                  backgroundColor: `${colors.primary}15`,
                  color: colors.primary,
                }}
              >
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">
                {service.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-6 h-20"
                style={{ color: colors.textSecondary }}
              >
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs font-medium opacity-80"
                  >
                    <CheckCircle size={14} className="text-emerald-500" />{" "}
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- PROCESS TIMELINE --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">How I Work</h2>
            <p style={{ color: colors.textSecondary }}>
              From the first coffee chat to the final deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector Line */}
            <div
              className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed z-0 opacity-30"
              style={{ borderColor: colors.primary }}
            ></div>

            {processData.map((item, idx) => (
              <div key={idx} className="relative z-10 text-center">
                <div
                  className="w-16 h-16 mx-auto rounded-full border-4 flex items-center justify-center text-xl font-bold mb-6 bg-white dark:bg-slate-900"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p
                  className="text-sm px-4"
                  style={{ color: colors.textSecondary }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- PRICING --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Transparent Pricing
            </h2>
            <p style={{ color: colors.textSecondary }}>
              Choose a package that fits your project stage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {pricingData.map((plan, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-2xl border ${plan.recommended ? "shadow-2xl scale-105 z-10" : "shadow-sm"}`}
                style={{
                  backgroundColor: plan.recommended
                    ? colors.surface
                    : colors.background,
                  borderColor: plan.recommended
                    ? colors.primary
                    : colors.border,
                }}
              >
                {plan.recommended && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg"
                    style={{
                      background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <div
                  className="text-3xl font-bold font-heading mb-4"
                  style={{ color: colors.primary }}
                >
                  {plan.price}
                </div>
                <p
                  className="text-sm mb-8 h-10"
                  style={{ color: colors.textSecondary }}
                >
                  {plan.desc}
                </p>

                <button
                  className={`w-full py-3 rounded-lg font-bold mb-8 transition-transform hover:-translate-y-1 ${plan.recommended ? "text-white" : "border-2"}`}
                  style={
                    plan.recommended
                      ? {
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        }
                      : {
                          borderColor: colors.border,
                          color: colors.textPrimary,
                        }
                  }
                >
                  {plan.price.includes("Quote")
                    ? "Request Quote"
                    : "Choose Plan"}
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="mt-0.5 p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                        <CheckCircle size={12} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* --- TESTIMONIALS --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Client Stories
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border relative"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Quote
                  size={40}
                  className="absolute top-6 right-6 opacity-10"
                />
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="currentColor" />
                  ))}
                </div>
                <p
                  className="text-lg italic mb-6 leading-relaxed"
                  style={{ color: colors.textSecondary }}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center font-bold text-slate-600">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm opacity-60">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- FAQ & CONTACT GRID --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* FAQ Section */}
          <div>
            <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-2">
              <HelpCircle className="text-sky-500" /> Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqData.map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold focus:outline-none"
                  >
                    {item.q}
                    <ArrowRight
                      size={18}
                      className={`transition-transform duration-300 ${activeAccordion === idx ? "rotate-90 text-sky-500" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${activeAccordion === idx ? "max-h-40 p-5 pt-0" : "max-h-0"}`}
                  >
                    <p style={{ color: colors.textSecondary }}>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="p-8 rounded-3xl shadow-xl border relative overflow-hidden"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>

            <h3 className="text-2xl font-bold font-heading mb-6">
              Start a Project
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">Name</label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-3 opacity-40"
                    />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Hamim Reja"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">Email</label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-3 opacity-40"
                    />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="hamim@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">
                    Service Type
                  </label>
                  <div className="relative">
                    <Briefcase
                      size={18}
                      className="absolute left-3 top-3 opacity-40"
                    />
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent appearance-none"
                      style={{ borderColor: colors.border }}
                    >
                      <option>Full-Stack Development</option>
                      <option>Hardware/IoT Prototype</option>
                      <option>AI Solution</option>
                      <option>Consultation</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">
                    Budget Range
                  </label>
                  <div className="relative">
                    <IndianRupee 
                      size={18}
                      className="absolute left-3 top-3 opacity-40"
                    />
                    {/* FIXED: Corrected Syntax for Select Input */}
                    <select
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent appearance-none"
                      style={{ borderColor: colors.border }}
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({...formData, budgetRange: e.target.value})}
                    >
                      <option>999 - 4,999</option>
                      <option>4,999 - 9,999</option>
                      <option>10k+</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70">Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell me about your project..."
                  className="w-full p-4 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent"
                  style={{ borderColor: colors.border }}
                ></textarea>
              </div>

              {/* FIXED: Changed type="button" to type="submit" */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-bold text-white shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                }}
              >
              {isSubmitting ? (
                  <><Loader className="animate-spin" size={20} /> Processing...</>
              ) : isSent ? (
                  <><CheckCircle size={20} /> Message Sent!</>
              ) : (
                  <><Send size={20} /> Send Message</>
              )}
                
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- SUCCESS TOAST NOTIFICATION --- */}
      {showToast && (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 animate-[slideIn_0.3s_ease-out]">
            <div className="flex items-start gap-4 p-5 rounded-xl shadow-2xl border backdrop-blur-md"
                  style={{ 
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)', 
                      borderColor: colors.success,
                      borderLeftWidth: '6px'
                  }}>
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <CheckCircle size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-lg" style={{ color: colors.textPrimary }}>Thank You!</h4>
                    <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                        I'll get back to you soon.
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