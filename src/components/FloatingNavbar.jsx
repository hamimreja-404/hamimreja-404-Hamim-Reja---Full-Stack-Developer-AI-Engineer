import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Code2, Menu, Sparkles, X } from 'lucide-react';

const LOGO_URL = 'Logo.webp';

const EMAIL_ADDRESS = 'hamim.reja.mail@gmail.com';
const EMAIL_SUBJECT = "Connecting with Hamim Reja — Software Engineering Opportunity";
const EMAIL_BODY = `Hi Hamim,

I came across your portfolio and would like to connect with you regarding a software engineering opportunity / project.

Looking forward to hearing from you.

Best regards,`;

const encodedSubject = encodeURIComponent(EMAIL_SUBJECT);
const encodedBody = encodeURIComponent(EMAIL_BODY);

// Direct Gmail Web Composer URL (works 100% on desktop browsers without requiring desktop Outlook/Mail app)
const CONNECT_GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${encodedSubject}&body=${encodedBody}`;

// Native mailto URL (for mobile devices and systems with configured default email client)
const CONNECT_MAILTO_URL = `mailto:${EMAIL_ADDRESS}?subject=${encodedSubject}&body=${encodedBody}`;

const NAV_ITEMS = [
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  // Monitor scroll for shadow/backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section spy on Home page
  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const sections = ['skills', 'experience', 'projects', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isHome]);

  // Handle clicking navigation links
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHome) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/${href}`);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleConnectClick = (e) => {
    setMobileMenuOpen(false);
    // On mobile devices, mailto: natively opens the device's mail app (iOS Mail, Android Gmail)
    if (typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      e.preventDefault();
      window.location.href = CONNECT_MAILTO_URL;
    }
    // On desktop, the anchor natively opens CONNECT_GMAIL_URL in a new tab via target="_blank",
    // reliably launching the Gmail web composer with recipient, subject and message pre-filled.
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-2.5 select-none focus:outline-none"
        >
          <div className="relative flex size-14 items-center justify-center rounded-xl">
            <img
              src={LOGO_URL}
              alt="Hamim Reja Logo"
              className="size-16 w-16 h-16 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors dark:text-white dark:group-hover:text-cyan-400">
              Hamim Reja
            </span>
            <span className="font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 -mt-0.5">
              <span className="size-1.5 rounded-full bg-cyan-500" />
              Full-Stack SDE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = isHome && activeSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-cyan-50 dark:bg-cyan-950/70 -z-10"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5">
          <a
            href={CONNECT_GMAIL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleConnectClick}
            aria-label="Send Email to Hamim Reja"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-cyan-700 hover:-translate-y-0.5 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            <span>Let&apos;s Connect</span>
            <ArrowRight className="size-3.5" />
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-slate-200/90 bg-white/95 backdrop-blur-md md:hidden dark:border-slate-800 dark:bg-slate-950/95"
          >
            <div className="mx-auto max-w-6xl px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = isHome && activeSection === sectionId;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-300'
                        : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="size-1.5 rounded-full bg-cyan-500" />}
                  </a>
                );
              })}

              <div className="pt-2">
                <a
                  href={CONNECT_GMAIL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleConnectClick}
                  aria-label="Send Email to Hamim Reja"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

