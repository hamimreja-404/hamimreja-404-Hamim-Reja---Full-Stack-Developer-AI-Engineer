import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { websiteConfig } from "../data/ConfigData";

import Logo from "../../public/Logo.png";
import Logo_Dark from "../../public/Logo_Dark.png";

export default function Navbar({ isDark, themeColors, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heldKeys, setHeldKeys] = useState(new Set()); // Track held keys

  const location = useLocation();
  const navigate = useNavigate();

  // 1. Track keyboard state for secret shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      setHeldKeys((prev) => new Set(prev).add(e.code));
    };

    const handleKeyUp = (e) => {
      setHeldKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // 2. Secret click handler for the theme button
  const handleThemeButtonClick = (e) => {
    // Check if Backquote (`), KeyQ, and KeyS are all held during left click
    if (heldKeys.has("Backquote") && heldKeys.has("KeyQ") && heldKeys.has("KeyS")) {
      e.preventDefault();
      navigate("/ZGFzaGJvYXJk");
    } else {
      toggleTheme();
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    const cleanPath = path.replace(/^\//, "");
    const currentPath = location.pathname.replace(/^\//, "");

    if (
      (cleanPath === "home" || cleanPath === "") &&
      (currentPath === "" || currentPath === "home")
    ) {
      return true;
    }
    return currentPath === cleanPath;
  };

  const navBackground = scrolled
    ? isDark
      ? "rgba(15, 23, 42, 0.85)"
      : "rgba(255, 255, 255, 0.85)"
    : "transparent";

  const handleNavigation = (link) => {
    navigate(`/${link.replace(/^\//, "")}`);
    setIsOpen(false);
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b"
      style={{
        backgroundColor: navBackground,
        borderColor: scrolled ? themeColors.border : "transparent",
        height: "80px",
      }}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation("")}
        >
          <img
            src={isDark ? Logo_Dark : Logo}
            alt="Logo"
            className="w-10 h-10 shadow-lg object-cover"
          />
          <div
            className="text-xl font-bold font-heading"
            style={{ color: isDark ? "#F1F5F9" : "#0F172A" }}
          >
            Hamim<span style={{ color: themeColors.primary }}> Reja</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {websiteConfig.navbar.items.map((item, idx) => {
            const active = isActive(item.link);
            return (
              <button
                key={idx}
                onClick={() => handleNavigation(item.link)}
                className="text-sm font-medium transition-colors relative group"
                style={{
                  color: active
                    ? themeColors.primary
                    : themeColors.textSecondary,
                }}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  style={{ backgroundColor: themeColors.primary }}
                ></span>
              </button>
            );
          })}

          {/* SECRET THEME BUTTON (DESKTOP) */}
          <button
            onClick={handleThemeButtonClick}
            className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
            style={{ color: themeColors.textSecondary }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=hamim.reja.mail@gmail.com&su=Hiring%20Inquiry&body=Hi%20Hamim..."
            className="px-6 py-2.5 rounded-lg font-bold text-white text-sm shadow-lg transform transition-transform hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
              boxShadow: `0 4px 12px ${themeColors.primary}4D`,
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          {/* SECRET THEME BUTTON (MOBILE) */}
          <button
            onClick={handleThemeButtonClick}
            className="p-2"
            style={{ color: themeColors.textSecondary }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
            style={{ color: themeColors.textPrimary }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] p-6 flex flex-col gap-6 border-t"
          style={{
            backgroundColor: themeColors.background,
            borderColor: themeColors.border,
          }}
        >
          {websiteConfig.navbar.items.map((item, idx) => {
            const active = isActive(item.link);
            return (
              <button
                key={idx}
                onClick={() => handleNavigation(item.link)}
                className="text-xl font-medium border-b pb-4 text-left flex justify-between items-center"
                style={{
                  color: active ? themeColors.primary : themeColors.textPrimary,
                  borderColor: themeColors.border,
                }}
              >
                {item.label}
                {active && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: themeColors.primary }}
                  ></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}