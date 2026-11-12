import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  Check,
  Code2,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  PenTool,
  Send,
  Sparkles,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;
const EMAIL_ADDRESS = 'hamim.reja.mail@gmail.com';
const GITHUB_URL = 'https://github.com/hamimreja-404';
const LINKEDIN_URL = 'https://www.linkedin.com/in/hamim-reja-a2ba42279/';

const INQUIRY_INTENTS = [
  { id: 'sde', label: 'Full-Time SDE', icon: Code2, subjectTag: 'SDE Opportunity' },
  { id: 'freelance', label: 'Client Project', icon: Briefcase, subjectTag: 'Project Inquiry' },
  { id: 'writing', label: 'Blogs / Writing', icon: PenTool, subjectTag: 'Technical Writing' },
  { id: 'chat', label: 'Quick Chat', icon: MessageSquare, subjectTag: 'Quick Connect' },
];

const SECTION_LINKS = [
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'About & Blogs', href: '#about-writing' },
];

const Contact = () => {
  const [visitorCount, setVisitorCount] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState(INQUIRY_INTENTS[0]);
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [briefNote, setBriefNote] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!API_URL) return;
        const response = await fetch(`${API_URL}/stats`);
        if (response.ok) {
          const data = await response.json();
          setVisitorCount(data.totalVisits);
        }
      } catch (error) {
        console.error('Error fetching visitor stats:', error);
        setVisitorCount(273);
      }
    };

    fetchStats();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buildEmailPayload = () => {
    const subject = `[${selectedIntent.subjectTag}] ${senderName ? `From ${senderName}` : 'Connecting via Portfolio'}`;
    const bodyLines = [
      `Hi Hamim,`,
      '',
      `Inquiry Type: ${selectedIntent.label}`,
      senderName ? `Name: ${senderName}` : null,
      senderOrg ? `Company / Role: ${senderOrg}` : null,
      '',
      briefNote.trim()
        ? briefNote.trim()
        : `I came across your portfolio and would love to discuss a ${selectedIntent.label.toLowerCase()} opportunity.`,
      '',
      'Best regards,',
      senderName || '',
    ].filter((line) => line !== null);

    return {
      subject: encodeURIComponent(subject),
      body: encodeURIComponent(bodyLines.join('\n')),
    };
  };

  const { subject, body } = buildEmailPayload();
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${subject}&body=${body}`;
  const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;

  return (
    <section
      id="contact"
      className="relative z-20 overflow-hidden border-t border-slate-200 bg-slate-50 px-4 pt-24 pb-10 sm:px-6 lg:px-8 lg:pt-28 dark:border-slate-800 dark:bg-slate-950"
    >
      {/* Ambient architectural background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 20%, rgba(6,182,212,0.09), transparent 42%), radial-gradient(circle at 88% 30%, rgba(99,102,241,0.08), transparent 45%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* ==================== LEFT: CTA & DIRECT CHANNELS ==================== */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1.5 shadow-2xs dark:border-emerald-800 dark:bg-emerald-950/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-medium text-emerald-800 dark:text-emerald-300">
                06 // Open for SDE Roles &amp; Select Client Work
              </span>
            </div>

            <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Let&apos;s Build Something{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-sky-400 dark:to-indigo-400">
                Unignorable.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Looking for an engineer who can architect production MERN/Next.js apps, debug edge cases fast, and talk
              directly with users? Send a note—I usually reply within a few hours.
            </p>

            {/* Direct Email Card + Copy Button */}
            <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs sm:p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Direct Inbox</p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-white sm:text-base">{EMAIL_ADDRESS}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                      copied
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50/60 hover:text-cyan-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-cyan-500'
                    }`}
                  >
                    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                  >
                    <Mail className="size-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Cards + Location + Live Profile Views */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-[#0A66C2]/40 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] dark:bg-[#0A66C2]/20 dark:text-cyan-400">
                    <Linkedin className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">LinkedIn</p>
                    <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">Blogs &amp; Career Updates</p>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0A66C2]" />
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white">
                    <Github className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">GitHub</p>
                    <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">@hamimreja-404</p>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-900 dark:group-hover:text-white" />
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-2xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <MapPin className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Kolkata, India · IST (UTC+5:30)</span>
              </div>

              <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Profile Views
                </span>
                <span className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
                <span className="font-mono text-sm font-bold text-cyan-700 dark:text-cyan-400">
                  {visitorCount !== null ? visitorCount + 500 : '2576'}
                </span>
              </div>
            </div>
          </div>

          {/* ==================== RIGHT: INTERACTIVE QUICK BRIEF COMPOSER ==================== */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-xl sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-indigo-500/15 blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-300">
                    <Sparkles className="size-3.5" /> Quick Brief Composer
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">Zero friction · Instant launch</span>
                </div>

                <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Tell me what you&apos;re building or hiring for
                </h3>

                {/* Intent Selector */}
                <div className="mt-5">
                  <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    1. Select Topic
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {INQUIRY_INTENTS.map((intent) => {
                      const Icon = intent.icon;
                      const isActive = selectedIntent.id === intent.id;

                      return (
                        <button
                          key={intent.id}
                          type="button"
                          onClick={() => setSelectedIntent(intent)}
                          className={`relative flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-colors sm:text-sm ${
                            isActive
                              ? 'border-cyan-400/50 text-white'
                              : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] hover:text-white'
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="contactIntentHighlight"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600/35 to-indigo-600/35"
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-2">
                            <Icon className={`size-4 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                            <span>{intent.label}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="mt-5 space-y-3.5">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Ananya / Hiring Manager"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                        Company / Role
                      </label>
                      <input
                        type="text"
                        value={senderOrg}
                        onChange={(e) => setSenderOrg(e.target.value)}
                        placeholder="e.g. Acme Tech / Founder"
                        className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Quick Note
                    </label>
                    <textarea
                      rows={4}
                      value={briefNote}
                      onChange={(e) => setBriefNote(e.target.value)}
                      placeholder={`Share role details, timeline, or project idea for ${selectedIntent.label}...`}
                      className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.05] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Launch Buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-md transition-all hover:-translate-y-0.5 hover:from-cyan-400 hover:to-sky-400"
                  >
                    <Send className="size-4" />
                    <span>Launch in Gmail</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
                  >
                    <Mail className="size-4 text-cyan-300" />
                    <span>Default Mail App</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== INTEGRATED ARCHITECTURAL FOOTER ==================== */}
        <footer className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-slate-200/90 pt-8 md:flex-row dark:border-slate-800">
          <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
            <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Hamim Reja <span className="font-mono text-xs font-normal text-slate-400">· Full Stack &amp; Edge AI</span>
            </p>
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Engineered in Kolkata, India · © {new Date().getFullYear()}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-400">
            {SECTION_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-cyan-700 dark:hover:text-cyan-400">
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50/70 hover:text-cyan-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-500 dark:hover:bg-slate-800 dark:hover:text-cyan-300"
          >
            <span>Go to Top</span>
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
