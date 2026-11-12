import React from 'react';

const GlobalStyles = () => (
  <style>{`
    html { scroll-behavior: smooth; }
    body { background-color: #f8fafc; color: #1e293b; margin: 0; overflow-x: hidden; }
    html.dark body { background-color: #020617; color: #f1f5f9; }
    
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    /* Global Animated Tech Grid Background - Lighter shades */
    @keyframes gridMove {
      0% { transform: translateY(0); }
      100% { transform: translateY(50px); }
    }
    .bg-tech-grid {
      background-image: 
        linear-gradient(to right, rgba(14, 165, 233, 0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(14, 165, 233, 0.06) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: gridMove 3s linear infinite;
    }

    /* Animated Gradient Background */
    @keyframes gradient-xy {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .animate-gradient-xy {
      background-size: 400% 400%;
      animation: gradient-xy 15s ease infinite;
    }

    /* Floating Animation */
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.02);
    }
    
    .glow-text {
      text-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
    }
  `}</style>
);

export default GlobalStyles;

