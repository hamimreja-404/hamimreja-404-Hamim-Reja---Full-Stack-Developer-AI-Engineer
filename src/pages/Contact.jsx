
import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Send,
  Calendar,
  Clock,
  Github,
  Linkedin,
  Instagram,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Loader,
  X
} from "lucide-react";

// --- RESTORE THE REAL THEME IMPORT ---
// Make sure this path is correct for your project structure
import { useTheme } from "../components/ThemeContext"; 
import SEO from "../components/SEO";
export default function ContactPage() {
  // Now this uses the real hook from your Context, so toggleTheme will work
  const { isDark, themeColors: colors, toggleTheme } = useTheme(); 
  
  const [time, setTime] = useState(new Date());
  
  // Form States
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Project Inquiry", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
   const API_URL = import.meta.env.VITE_API_URL;
  // Real-time Clock for IST
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSent(false);

    try {
      // NOTE: Ensure your backend is running on port 5000 or update this URL
      const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setIsSent(true);
        setShowToast(true);
        setFormData({ name: "", email: "", subject: "Project Inquiry", message: "" });
        
        // Hide success state and toast after delay
        setTimeout(() => {
          setIsSent(false);
          setShowToast(false);
        }, 5000);
      } else {
        setIsSubmitting(false);
        console.error("Submission failed:", data);
        // Optional: Show an error toast here
      }
    } catch (error) {
      console.error("Network error:", error);
      setIsSubmitting(false);
      // Optional: Show an error toast here
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
      title="Contact Me" 
      description="Get in touch with Hamim Reja. Available for freelance projects, full-time roles, and technical consultation."
      url="/contact"
    />
      <div className="container mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-opacity-10 mb-6" 
                style={{ backgroundColor: `${colors.primary}15` }}>
              <MessageSquare size={16} style={{ color: colors.primary }} />
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: colors.primary }}>Contact</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
             Let's Start a Conversation
           </h1>
           <p className="max-w-2xl mx-auto text-lg" style={{ color: colors.textSecondary }}>
             Whether you have a project in mind, a job opportunity, or just want to chat about tech, I'm always open to connecting.
           </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* --- LEFT COLUMN: INFO & STATUS --- */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Status Card */}
            <div className="p-6 rounded-2xl border relative overflow-hidden"
                 style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                     <span className="relative flex h-3 w-3">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                     </span>
                     <span className="font-bold text-sm text-emerald-500">Available for Work</span>
                  </div>
                  <div className="text-xs font-mono px-2 py-1 rounded border" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                     IST (UTC+05:30)
                  </div>
               </div>
               
               <div className="text-4xl font-bold font-mono mb-2" style={{ color: colors.textPrimary }}>
                  {formatTime(time)}
               </div>
               <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>My local time in Kolkata, India.</p>

               <div className="flex items-center gap-2 text-sm font-medium p-3 rounded-lg bg-opacity-50"
                    style={{ backgroundColor: colors.background }}>
                  <Clock size={16} style={{ color: colors.primary }} />
                  <span>Typical response time: <span style={{ color: colors.textPrimary }}>Within 24 Hours</span></span>
               </div>
            </div>

            {/* Direct Contact Info */}
            <div className="space-y-6">
               <a href="mailto:hamim.reja.mail@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-xl border transition-all hover:translate-x-2"
                  style={{ borderColor: colors.border, backgroundColor: 'transparent' }}>
                  <div className="p-3 rounded-full bg-sky-500/10 text-sky-500">
                     <Mail size={20} />
                  </div>
                  <div>
                     <div className="text-xs font-bold uppercase tracking-wider opacity-60">Email</div>
                     <div className="font-medium text-lg">hamim.reja.mail@gmail.com</div>
                  </div>
               </a>

               <div className="flex items-center gap-4 p-4 rounded-xl border"
                    style={{ borderColor: colors.border, backgroundColor: 'transparent' }}>
                  <div className="p-3 rounded-full bg-violet-500/10 text-violet-500">
                     <MapPin size={20} />
                  </div>
                  <div>
                     <div className="text-xs font-bold uppercase tracking-wider opacity-60">Location</div>
                     <div className="font-medium text-lg">Kolkata, West Bengal, India</div>
                  </div>
               </div>
            </div>

            {/* Calendar Booking */}
            {/* <div className="p-8 rounded-2xl text-white relative overflow-hidden shadow-lg"
                 style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
               <div className="relative z-10">
                  <Calendar size={32} className="mb-4 text-white/80" />
                  <h3 className="text-2xl font-bold mb-2">Book a Consultation</h3>
                  <p className="text-white/80 mb-6 text-sm">Pick a time that works for you directly from my calendar.</p>
                  <button className="px-6 py-2 bg-white text-sky-600 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                     Schedule Call <ArrowRight size={16} />
                  </button>
               </div>

               <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
               <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
            </div> */}

             {/* Social Links */}
             <div className="flex gap-4 justify-center md:justify-start">
               {[
                 { icon: Github, link: "https://github.com/hamimreja-404" },
                 { icon: Linkedin, link: "https://linkedin.com/in/hamim-reja-a2ba42279" },
                 { icon: Instagram, link: "https://www.instagram.com/hamim__reja/" }
               ].map((social, idx) => (
                 <a key={idx} href={social.link} 
                    className="p-3 rounded-full border hover:scale-110 transition-transform"
                    style={{ borderColor: colors.border, color: colors.textSecondary, backgroundColor: colors.surface }}>
                    <social.icon size={20} />
                 </a>
               ))}
            </div>

          </div>

          {/* --- RIGHT COLUMN: CONTACT FORM --- */}
          <div className="lg:col-span-7">
             <div className="p-8 md:p-10 rounded-3xl border shadow-xl relative"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-bold opacity-80 ml-1">Your Name</label>
                         <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Hamim Reja" 
                            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent transition-all"
                            style={{ borderColor: colors.border }}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold opacity-80 ml-1">Your Email</label>
                         <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="hamim@gmail.com" 
                            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent transition-all"
                            style={{ borderColor: colors.border }}
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-bold opacity-80 ml-1">Subject</label>
                      <select 
                         value={formData.subject}
                         onChange={(e) => setFormData({...formData, subject: e.target.value})}
                         className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent transition-all appearance-none"
                         style={{ borderColor: colors.border }}
                      >
                         <option className="text-black">Project Inquiry</option>
                         <option className="text-black">Job Opportunity</option>
                         <option className="text-black">Consultation Request</option>
                         <option className="text-black">Just saying Hi!</option>
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-bold opacity-80 ml-1">Message</label>
                      <textarea 
                         rows="6" 
                         required
                         value={formData.message}
                         onChange={(e) => setFormData({...formData, message: e.target.value})}
                         placeholder="Tell me a bit about your project, timeline, and budget..." 
                         className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:outline-none bg-transparent transition-all resize-none"
                         style={{ borderColor: colors.border }}
                      ></textarea>
                   </div>

                   <button 
                      type="submit" 
                      disabled={isSubmitting || isSent}
                      className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ 
                         background: isSent 
                            ? colors.success 
                            : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` 
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