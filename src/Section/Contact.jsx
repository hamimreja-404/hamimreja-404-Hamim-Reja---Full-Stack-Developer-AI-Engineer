import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  Check,
  Clock,
  Code2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Server,
  Sparkles,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://hamim-reja-full-stack-developer-ai.onrender.com/api';
const EMAIL_ADDRESS = 'hamim.reja.mail@gmail.com';
const GITHUB_URL = 'https://github.com/hamimreja-404';
const LINKEDIN_URL = 'https://www.linkedin.com/in/hamim-reja-a2ba42279/';

const INQUIRY_INTENTS = [
  { id: 'sde', label: 'Full-Time SDE', icon: Code2, subject: 'Full-Time SDE Opportunity' },
  { id: 'backend', label: 'Backend / Systems', icon: Server, subject: 'Backend & Systems Architecture' },
  { id: 'startup', label: 'Startup / SaaS', icon: Briefcase, subject: 'Startup / SaaS Collaboration' },
  { id: 'chat', label: 'General Connect', icon: MessageSquare, subject: 'Engineering Connect' },
];

const NAV_LINKS = [
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState(INQUIRY_INTENTS[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.error) setStatus((prev) => ({ ...prev, error: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please fill in your name, email, and message.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch(`${API_URL.replace(/\/$/, '')}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.company ? `[${formData.company.trim()}] ${formData.message.trim()}` : formData.message.trim(),
          subject: `[${selectedIntent.subject}] From ${formData.name.trim()}`,
          isService: false,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        throw new Error(data.error || 'Server responded with an error.');
      }
    } catch (err) {
      console.warn('Backend submission failed, falling back to direct options:', err);
      setStatus({
        loading: false,
        success: false,
        error: 'Unable to reach the message server right now. You can launch Gmail or your mail app directly below.',
      });
    }
  };

  const buildPrefilledMail = () => {
    const subject = `[${selectedIntent.subject}] ${formData.name ? `From ${formData.name}` : 'Connecting via Portfolio'}`;
    const lines = [
      'Hi Hamim,',
      '',
      `Topic: ${selectedIntent.label}`,
      formData.name ? `Name: ${formData.name}` : null,
      formData.company ? `Company / Role: ${formData.company}` : null,
      formData.email ? `Email: ${formData.email}` : null,
      '',
      formData.message.trim()
        ? formData.message.trim()
        : `I explored your portfolio and would like to discuss a ${selectedIntent.label.toLowerCase()} opportunity.`,
      '',
      'Best regards,',
      formData.name || '',
    ].filter(Boolean);

    const encSubject = encodeURIComponent(subject);
    const encBody = encodeURIComponent(lines.join('\n'));

    return {
      gmailUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${encSubject}&body=${encBody}`,
      mailtoUrl: `mailto:${EMAIL_ADDRESS}?subject=${encSubject}&body=${encBody}`,
    };
  };

  const { gmailUrl, mailtoUrl } = buildPrefilledMail();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      aria-label="Software Engineering Hiring and Direct Contact"
      itemScope
      itemType="https://schema.org/ContactPoint"
      className="relative z-20 overflow-hidden border-t border-slate-200/90 bg-[#f8fafc] px-4 pt-20 pb-12 sm:px-6 lg:px-8 lg:pt-24 dark:border-slate-800/80 dark:bg-slate-950"
    >
      <meta itemProp="contactType" content="Software Engineering Recruiting and Inquiries" />
      <meta itemProp="email" content={EMAIL_ADDRESS} />
      <meta itemProp="availableLanguage" content="English, Hindi, Bengali" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* ==================== LEFT: VALUE PROPOSITION & DIRECT CHANNELS ==================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-50/90 px-3.5 py-1.5 dark:border-emerald-800 dark:bg-emerald-950/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Open to Full-Time SDE &amp; Systems Roles
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Let&apos;s Build Something{' '}
                <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-sky-400 dark:to-indigo-400">
                  High-Impact.
                </span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Looking for an engineer who can architect distributed backends, ship production Next.js apps, and solve difficult edge cases under pressure? Drop a note here or reach out directly—I typically reply within a few hours.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-5 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 dark:border-slate-800 dark:bg-slate-900/90">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Direct Email
                  </p>
                  <p className="mt-0.5 truncate text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {EMAIL_ADDRESS}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                      copied
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50/70 hover:text-cyan-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-cyan-500'
                    }`}
                  >
                    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                  >
                    <Mail className="size-3.5" />
                    <span>Gmail</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Channels Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white/95 p-4 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 dark:border-slate-800 dark:bg-slate-900/90"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] dark:bg-[#0A66C2]/20 dark:text-cyan-400">
                    <Linkedin className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">LinkedIn</p>
                    <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">Verified Profile</p>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0A66C2]" />
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white/95 p-4 transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-600 hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 dark:border-slate-800 dark:bg-slate-900/90"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white">
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

            {/* Quick Metadata */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3.5 py-1.5 dark:border-slate-800 dark:bg-slate-900/80">
                <MapPin className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                Kolkata, India · IST (UTC+5:30)
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3.5 py-1.5 dark:border-slate-800 dark:bg-slate-900/80">
                <Clock className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                Response time: &lt; 4 hours
              </span>
            </div>
          </div>

          {/* ==================== RIGHT: INTERACTIVE DIRECT CONTACT FORM ==================== */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/95">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950/70 dark:text-cyan-300">
                    <Sparkles className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Send a Message</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Directly into my inbox</p>
                  </div>
                </div>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-mono text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Quick Reply
                </span>
              </div>

              {/* Inquiry Topic Pills */}
              <div className="mt-5">
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Inquiry Topic
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {INQUIRY_INTENTS.map((intent) => {
                    const Icon = intent.icon;
                    const isSelected = selectedIntent.id === intent.id;

                    return (
                      <button
                        key={intent.id}
                        type="button"
                        onClick={() => setSelectedIntent(intent)}
                        className={`flex flex-col items-start gap-1 rounded-xl border p-2.5 text-left transition-all ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-50/80 text-cyan-950 dark:border-cyan-400 dark:bg-cyan-950/60 dark:text-cyan-200'
                            : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300 hover:bg-slate-100/70 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300'
                        }`}
                      >
                        <Icon className={`size-4 ${isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                        <span className="text-xs font-semibold leading-tight">{intent.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Company / Organization <span className="text-slate-500 dark:text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Acme Inc. / Hiring Team"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:focus:border-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {formData.message.length} chars
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={`Tell me about the ${selectedIntent.label.toLowerCase()} role, timeline, or product requirements...`}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:focus:border-cyan-400"
                  />
                </div>

                {/* Status Feedback Banners */}
                <AnimatePresence>
                  {status.success && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-200 flex items-center gap-2.5"
                    >
                      <Check className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>Thank you! Your message has been recorded. I will get back to you shortly.</span>
                    </motion.div>
                  )}

                  {status.error && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-rose-300 bg-rose-50 p-3.5 text-xs text-rose-800 dark:border-rose-900 dark:bg-rose-950/70 dark:text-rose-200 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="size-4 shrink-0 text-rose-600 dark:text-rose-400" />
                        <span>{status.error}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <a
                          href={gmailUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-rose-900 underline hover:no-underline dark:text-rose-100"
                        >
                          Send via Gmail instead <ArrowUpRight className="size-3" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status.loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-cyan-700 disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 cursor-pointer"
                  >
                    {status.loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ==================== COMPACT ARCHITECTURAL FOOTER ==================== */}
        <footer className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-slate-200/90 pt-8 sm:flex-row dark:border-slate-800">
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Hamim Reja <span className="font-mono text-xs font-normal text-slate-500 dark:text-slate-400">· Full-Stack SDE &amp; Systems</span>
            </p>
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Kolkata, India · © {new Date().getFullYear()} · All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-400">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </nav>


        </footer>
      </div>
    </section>
  );
}
