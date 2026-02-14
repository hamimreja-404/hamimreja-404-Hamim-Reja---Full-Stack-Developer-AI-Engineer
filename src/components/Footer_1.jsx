
import React, { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail, Globe, Smartphone, Users ,Instagram} from "lucide-react";

// Mocking the config data since the external file is not available in this context
// You can replace these with your actual imports later if needed
const API_URL = import.meta.env.VITE_API_URL;

const websiteConfig = {
  profile: {
    email: "hamim.reja.mail@gmail.com",
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      instagram: "https://www.instagram.com/hamim__reja/"
    }
  }
};

export default function Footer({ isDark, themeColors }) {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Fetch visitor stats using the API_URL
    const fetchStats = async () => {
      try {
        if (!API_URL) return;
        
        const response = await fetch(`${API_URL}/stats`);
        if (response.ok) {
          const data = await response.json();
          
          const count = data.totalVisits;
          setVisitorCount(count);
        }
      } catch (error) {
        console.error("Error fetching visitor stats:", error);
        setVisitorCount(273);
      }
    };

    fetchStats();
  }, []);

  return (
    <footer
      className="pt-16 pb-8 px-6 border-t"
      style={{
        backgroundColor: isDark ? "#020617" : "#0F172A",
        borderColor: themeColors?.border || "#1e293b", // Added fallback safely
      }}
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                H
              </div>
              <div className="text-2xl font-bold text-white font-heading">
                Hamim.Reja
              </div>
            </div>

            <p className="text-slate-400 max-w-xs mb-6 leading-relaxed">
              Bridging the gap between complex hardware systems and elegant
              software solutions. Based in Kolkata, India.
            </p>
            <div className="flex gap-4">
              <a
                href={websiteConfig.profile.socials.github}
                className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                <Github size={20} />
              </a>
              <a
                href={websiteConfig.profile.socials.linkedin}
                className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={websiteConfig.profile.socials.instagram}
                className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Portfolio", "Services", "Products"].map(
                (link, i) => (
                  <li key={i}>
                    <a
                      href={`${link.toLowerCase()}`}
                      className="text-slate-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 opacity-0 hover:opacity-100 transition-opacity"></span>
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Mail size={16} className="text-sky-400 mt-1 shrink-0" />
                <span>{websiteConfig.profile.email}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Globe size={16} className="text-sky-400" />
                <span>Kolkata, West Bengal</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Smartphone size={16} className="text-sky-400" />
                <span>+91 9434405501</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm order-3 md:order-1">
            © {new Date().getFullYear()} Hamim Reja. All rights reserved.
          </p>

          {/* Visitor Counter Badge */}
          <div className="order-1 md:order-2 flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-1.5 border border-slate-700/50 backdrop-blur-sm hover:border-sky-500/30 transition-colors">
            <Users size={14} className="text-sky-400" />
            <span className="text-slate-400 text-xs font-medium">
              Total Visitors:{" "}
              <span className="text-white font-mono font-bold ml-1">
                {visitorCount.toLocaleString()}
              </span>
            </span>
          </div>

          <div className="flex gap-8 order-2 md:order-3">
            <a href="#" className="text-slate-500 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}