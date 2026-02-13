import React, { useState, useEffect } from "react";
import {
  Home,
  ArrowLeft,
  Search,
  Ghost,
  Zap,
  AlertCircle,
  FileQuestion,
  Compass,
} from "lucide-react";
import { useTheme } from "../components/ThemeContext";
import SEO from "./SEO";

export default function NotFoundPage() {
  const { isDark, themeColors: colors, toggleTheme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Theme configuration consistent with your Services page

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: themeColors.background,
        color: themeColors.textPrimary,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <SEO
        title="Page Not Found | Hamim Reja"
        description="The page you're looking for doesn't exist or has been moved. Explore Hamim Reja's portfolio, services, and latest projects."
        url="/404"
      />

      {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Blobs */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ backgroundColor: themeColors.primary }}
        ></div>
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{ backgroundColor: themeColors.secondary }}
        ></div>

        {/* Floating Icons Parallax */}
        <div
          className="absolute top-1/4 left-1/4 transition-transform duration-75"
          style={{
            transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)`,
          }}
        >
          <FileQuestion size={48} className="opacity-10" />
        </div>
        <div
          className="absolute bottom-1/4 right-1/4 transition-transform duration-75"
          style={{
            transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
          }}
        >
          <Compass size={64} className="opacity-10 animate-spin-slow" />
        </div>
      </div>

      {/* --- MAIN CONTENT CARD --- */}
      <div
        className="relative z-10 max-w-2xl w-full text-center p-12 rounded-[2.5rem] border backdrop-blur-xl shadow-2xl transition-all duration-500"
        style={{
          backgroundColor: isDark
            ? "rgba(30, 41, 59, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
          borderColor: themeColors.border,
        }}
      >
        {/* 404 Text with Glitch/Glow Effect */}
        <div className="relative mb-8">
          <h1
            className="text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter select-none animate-pulse-gentle"
            style={{
              background: `linear-gradient(to bottom, ${themeColors.primary}, ${themeColors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(14, 165, 233, 0.3))",
            }}
          >
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <Ghost size={80} className="text-white/20 animate-bounce-slow" />
          </div>
        </div>

        <div className="space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-opacity-10 mb-2"
            style={{ backgroundColor: `${themeColors.primary}20` }}
          >
            <AlertCircle size={18} style={{ color: themeColors.primary }} />
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: themeColors.primary }}
            >
              Page Not Found
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            You've ventured into the void.
          </h2>

          <p
            className="text-lg max-w-md mx-auto"
            style={{ color: themeColors.textSecondary }}
          >
            The page you're looking for has been moved, deleted, or never
            existed in this dimension.
          </p>

          {/* --- ACTIONS --- */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold border-2 transition-all hover:scale-105 active:scale-95"
              style={{
                borderColor: themeColors.border,
                color: themeColors.textPrimary,
              }}
            >
              <ArrowLeft
                size={20}
                className="transition-transform group-hover:-translate-x-1"
              />
              Go Back
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white shadow-lg shadow-sky-500/20 transition-all hover:scale-105 hover:shadow-sky-500/40 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
              }}
            >
              <Home size={20} />
              Return Home
            </button>
          </div>
        </div>

        {/* --- THEME TOGGLE (Quick Preview) --- */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="mt-12 text-xs font-medium opacity-40 hover:opacity-100 transition-opacity"
        >
          Switch to {isDark ? "Light" : "Dark"} Mode Preview
        </button>
      </div>

      {/* --- FOOTER DECORATION --- */}
      <div className="fixed bottom-8 flex items-center gap-2 text-xs font-mono opacity-30">
        <Zap size={14} />
        <span>System Status: Operational</span>
        <span className="mx-2">|</span>
        <span>Error_Code: 0x404_VOID</span>
      </div>

      {/* --- CUSTOM ANIMATIONS --- */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-10%); }
          50% { transform: translateY(10%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
