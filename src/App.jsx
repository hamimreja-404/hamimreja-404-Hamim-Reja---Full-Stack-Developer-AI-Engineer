// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   Github, Linkedin, Mail, ExternalLink, Code2, 
//   TerminalSquare, Database, Cpu, MonitorSmartphone, Server,
//   Globe, Cloud, BrainCircuit, Box, ChevronDown, CheckCircle2,
//   ChevronLeft, ChevronRight, FolderGit2
// } from 'lucide-react';

// // --- Global Styles & Keyframes ---
// const GlobalStyles = () => (
//   <style>{`
//     html { scroll-behavior: smooth; }
//     body { background-color: #020617; margin: 0; overflow-x: hidden; }
    
//     .hide-scrollbar::-webkit-scrollbar { display: none; }
//     .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
//     /* Global Animated Tech Grid Background */
//     @keyframes gridMove {
//       0% { transform: translateY(0); }
//       100% { transform: translateY(50px); }
//     }
//     .bg-tech-grid {
//       background-image: 
//         linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px),
//         linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
//       background-size: 50px 50px;
//       animation: gridMove 3s linear infinite;
//     }

//     @keyframes gradient-xy {
//       0%, 100% { background-position: 0% 50%; }
//       50% { background-position: 100% 50%; }
//     }
//     .animate-gradient-xy {
//       background-size: 400% 400%;
//       animation: gradient-xy 15s ease infinite;
//     }

//     .glass-panel {
//       background: rgba(15, 23, 42, 0.7);
//       backdrop-filter: blur(16px);
//       -webkit-backdrop-filter: blur(16px);
//       border: 1px solid rgba(34, 211, 238, 0.15);
//       box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
//     }
    
//     .glow-text {
//       text-shadow: 0 0 25px rgba(34, 211, 238, 0.5);
//     }
//   `}</style>
// );

// // --- Custom Hooks ---
// const useIntersectionObserver = (options) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const elementRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setIsVisible(true);
//         observer.unobserve(entry.target);
//       }
//     }, options);

//     const currentElement = elementRef.current;
//     if (currentElement) observer.observe(currentElement);

//     return () => { if (currentElement) observer.unobserve(currentElement); };
//   }, [options]);

//   return [elementRef, isVisible];
// };

// // --- Components ---

// // 0. Global Canvas Mouse Trail & Click Effect
// const MouseEffect = () => {
//   const canvasRef = useRef(null);
  
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;
//     let particles = [];
//     let mouse = { x: -100, y: -100 };

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     class Particle {
//       constructor(x, y, isBurst = false) {
//         this.x = x;
//         this.y = y;
//         this.size = isBurst ? Math.random() * 5 + 2 : Math.random() * 3 + 1;
//         this.speedX = isBurst ? (Math.random() * 12 - 6) : (Math.random() * 2 - 1);
//         this.speedY = isBurst ? (Math.random() * 12 - 6) : (Math.random() * 2 - 1);
//         this.life = 1;
//         this.decay = isBurst ? Math.random() * 0.02 + 0.02 : Math.random() * 0.05 + 0.02;
//         this.color = `hsla(190, 100%, 50%, `; // Cyan base
//       }
//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;
//         this.life -= this.decay;
//         this.size *= 0.95;
//       }
//       draw() {
//         ctx.fillStyle = this.color + this.life + ')';
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
        
//         if (this.life > 0.5) {
//             ctx.shadowBlur = 10;
//             ctx.shadowColor = 'cyan';
//         } else {
//             ctx.shadowBlur = 0;
//         }
//       }
//     }

//     const handleMouseMove = (e) => {
//       mouse.x = e.clientX;
//       mouse.y = e.clientY;
//       for (let i = 0; i < 2; i++) {
//         particles.push(new Particle(mouse.x, mouse.y));
//       }
//     };

//     const handleMouseDown = (e) => {
//       for (let i = 0; i < 40; i++) {
//         particles.push(new Particle(e.clientX, e.clientY, true));
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mousedown', handleMouseDown);

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < particles.length; i++) {
//         particles[i].update();
//         particles[i].draw();
//         if (particles[i].life <= 0 || particles[i].size <= 0.2) {
//           particles.splice(i, 1);
//           i--;
//         }
//       }
//       animationFrameId = requestAnimationFrame(animate);
//     };
//     animate();

//     return () => {
//       window.removeEventListener('resize', resize);
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mousedown', handleMouseDown);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 mix-blend-screen opacity-70" />;
// };

// // 1. Hero Section
// const Hero = () => {
//   return (
//     <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
//       <div className="absolute inset-0 bg-tech-grid opacity-30"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950/80 to-slate-950"></div>
      
//       <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 flex flex-col items-center text-center gap-8 max-w-screen-2xl mx-auto">
//         <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/50 rounded-full bg-cyan-900/20 text-cyan-400 font-mono text-sm shadow-[0_0_20px_rgba(34,211,238,0.2)]">
//           <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
//           SYSTEM.INITIALIZED
//         </div>
        
//         <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.9]">
//           HAMIM <br />
//           <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-500 to-indigo-600 glow-text">
//             REJA
//           </span>
//         </h1>
        
//         <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        
//         <p className="text-xl md:text-3xl text-slate-400 font-light max-w-3xl leading-relaxed">
//           Full Stack, AI & DevOps Software Engineer bridging high-level architectures with LLM capabilities & Edge AI hardware.
//         </p>
        
//         <div className="flex flex-wrap justify-center gap-4 pt-4 font-mono">
//           {['MERN Stack', 'Next.js', 'Agentic AI', 'AWS/DevOps'].map(tag => (
//             <span key={tag} className="px-4 py-2 bg-slate-900/80 border border-slate-700 text-slate-300 text-sm rounded-lg flex items-center gap-2 shadow-lg backdrop-blur-sm">
//               <CheckCircle2 size={16} className="text-emerald-500" /> {tag}
//             </span>
//           ))}
//         </div>

//         <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
//           <button onClick={() => document.getElementById('projects').scrollIntoView()} className="group relative px-10 py-5 bg-cyan-500 text-slate-950 font-bold uppercase tracking-widest overflow-hidden rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all">
//             <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
//             <span className="relative flex items-center gap-3">Explore Work <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" /></span>
//           </button>
//           <div className="flex gap-4">
//             <a href="https://github.com/hamimreja-404" target="_blank" rel="noreferrer" className="p-4 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 rounded-xl transition-all shadow-lg"><Github size={24} /></a>
//             <a href="https://linkedin.com/in/hamim-reja-a2ba42279" target="_blank" rel="noreferrer" className="p-4 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 rounded-xl transition-all shadow-lg"><Linkedin size={24} /></a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // 2. Full Width Tech Stack Gravity Playground
// const PhysicsPlayground = () => {
//   const containerRef = useRef(null);
//   const elementsRef = useRef([]);
//   const requestRef = useRef(null);
//   const isDraggingRef = useRef(false);
//   const activeNodeRef = useRef(null);
//   const [renderTrigger, setRenderTrigger] = useState(0);
  
//   const techItems = [
//     { id: 1, name: 'Next.js', color: '#ffffff', icon: <TerminalSquare /> },
//     { id: 2, name: 'React', color: '#61DAFB', icon: <Code2 /> },
//     { id: 3, name: 'TypeScript', color: '#3178C6', icon: <Code2 /> },
//     { id: 4, name: 'Node.js', color: '#339933', icon: <Server /> },
//     { id: 5, name: 'MongoDB', color: '#47A248', icon: <Database /> },
//     { id: 6, name: 'Redis', color: '#DC382D', icon: <Database /> },
//     { id: 7, name: 'Tailwind', color: '#06B6D4', icon: <MonitorSmartphone /> },
//     { id: 8, name: 'Docker', color: '#2496ED', icon: <Box /> },
//     { id: 9, name: 'AWS', color: '#FF9900', icon: <Cloud /> },
//     { id: 10, name: 'YOLOv10', color: '#00FFFF', icon: <BrainCircuit /> },
//     { id: 11, name: 'LangChain', color: '#ffffff', icon: <BrainCircuit /> },
//     { id: 12, name: 'Verilog', color: '#2B4A82', icon: <Cpu /> },
//     { id: 13, name: 'Python', color: '#3776AB', icon: <TerminalSquare /> },
//     { id: 14, name: 'Linux', color: '#FCC624', icon: <TerminalSquare /> }
//   ];

//   const initPhysics = () => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
    
//     elementsRef.current = techItems.map((item) => ({
//       ...item,
//       x: Math.random() * (rect.width - 120) + 60,
//       y: Math.random() * (rect.height / 2),
//       vx: (Math.random() - 0.5) * 15,
//       vy: 0,
//       radius: 60, 
//       isDragging: false
//     }));
//   };

//   const updatePhysics = () => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const gravity = 0.4;
//     const friction = 0.98;
//     const bounce = 0.6;

//     elementsRef.current.forEach((el, i) => {
//       if (el.isDragging) return;
//       el.vy += gravity;
//       el.vx *= friction;
//       el.vy *= friction;
//       el.x += el.vx;
//       el.y += el.vy;

//       if (el.y + el.radius > rect.height) { el.y = rect.height - el.radius; el.vy *= -bounce; el.vx *= 0.9; }
//       if (el.y - el.radius < 0) { el.y = el.radius; el.vy *= -bounce; }
//       if (el.x + el.radius > rect.width) { el.x = rect.width - el.radius; el.vx *= -bounce; }
//       if (el.x - el.radius < 0) { el.x = el.radius; el.vx *= -bounce; }

//       for (let j = i + 1; j < elementsRef.current.length; j++) {
//         const other = elementsRef.current[j];
//         if (other.isDragging) continue;
//         const dx = other.x - el.x;
//         const dy = other.y - el.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         const minDist = el.radius + other.radius;
//         if (dist < minDist) {
//           const overlap = minDist - dist;
//           const nx = dx / dist;
//           const ny = dy / dist;
//           el.x -= nx * overlap * 0.5;
//           el.y -= ny * overlap * 0.5;
//           other.x += nx * overlap * 0.5;
//           other.y += ny * overlap * 0.5;
//           const dvx = el.vx - other.vx;
//           const dvy = el.vy - other.vy;
//           el.vx -= dvx * 0.5;
//           el.vy -= dvy * 0.5;
//           other.vx += dvx * 0.5;
//           other.vy += dvy * 0.5;
//         }
//       }
//     });
//     setRenderTrigger(prev => prev + 1);
//     requestRef.current = requestAnimationFrame(updatePhysics);
//   };

//   useEffect(() => {
//     initPhysics();
//     window.addEventListener('resize', initPhysics);
//     requestRef.current = requestAnimationFrame(updatePhysics);
//     return () => {
//       cancelAnimationFrame(requestRef.current);
//       window.removeEventListener('resize', initPhysics);
//     };
//   }, []);

//   const handlePointerDown = (e, index) => {
//     e.target.setPointerCapture(e.pointerId);
//     isDraggingRef.current = true;
//     activeNodeRef.current = { index, lastX: e.clientX, lastY: e.clientY };
//     elementsRef.current[index].isDragging = true;
//     elementsRef.current[index].vx = 0;
//     elementsRef.current[index].vy = 0;
//   };

//   const handlePointerMove = (e) => {
//     if (!isDraggingRef.current || !activeNodeRef.current) return;
//     const { index, lastX, lastY } = activeNodeRef.current;
//     const rect = containerRef.current.getBoundingClientRect();
//     const el = elementsRef.current[index];
//     el.vx = e.clientX - lastX;
//     el.vy = e.clientY - lastY;
//     el.x = e.clientX - rect.left;
//     el.y = e.clientY - rect.top;
//     activeNodeRef.current.lastX = e.clientX;
//     activeNodeRef.current.lastY = e.clientY;
//   };

//   const handlePointerUp = () => {
//     if (activeNodeRef.current) {
//       const { index } = activeNodeRef.current;
//       elementsRef.current[index].isDragging = false;
//       elementsRef.current[index].vx *= 1.5;
//       elementsRef.current[index].vy *= 1.5;
//     }
//     isDraggingRef.current = false;
//     activeNodeRef.current = null;
//   };

//   return (
//     <section className="bg-[#050B14] pt-24 pb-12 border-y border-cyan-900/30 relative z-20">
      
//       {/* Centered & Stylized Heading */}
//       <div className="w-full px-8 mb-16 flex flex-col items-center justify-center text-center relative z-10">
//         <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
//           Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 glow-text">Stack</span>
//         </h2>
//         <div className="inline-flex items-center gap-3 bg-cyan-950/40 border border-cyan-500/30 px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)]">
//           <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
//           <p className="text-cyan-300 font-mono text-sm tracking-widest uppercase font-semibold">
//             Interactive Physics Engine • Drag & Drop Enabled
//           </p>
//         </div>
//       </div>
      
//       <div 
//         ref={containerRef}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//         onPointerLeave={handlePointerUp}
//         className="relative w-full h-[600px] bg-slate-950/60 overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] cursor-crosshair touch-none border-y border-slate-800/80 backdrop-blur-sm"
//       >
//         {/* Background Decorative Element */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-slate-800/10 pointer-events-none select-none">
//           TECH
//         </div>

//         {elementsRef.current.map((el, i) => (
//           <div
//             key={el.id}
//             onPointerDown={(e) => handlePointerDown(e, i)}
//             className="absolute w-[120px] h-[120px] -ml-[60px] -mt-[60px] flex flex-col items-center justify-center rounded-[28px] glass-panel hover:bg-slate-800 shadow-2xl cursor-grab active:cursor-grabbing select-none transition-colors border border-slate-700 hover:border-cyan-500"
//             style={{
//               transform: `translate(${el.x}px, ${el.y}px)`,
//               boxShadow: `0 20px 40px -10px ${el.color}30, inset 0 1px 1px rgba(255,255,255,0.1)`
//             }}
//           >
//             <div style={{ color: el.color }} className="mb-3">
//               {React.cloneElement(el.icon, { size: 36 })}
//             </div>
//             <span className="text-sm font-bold text-slate-200 tracking-wide">{el.name}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// // 3. 3D Book-Flip Horizontal Scroll Projects
// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const containerRef = useRef(null);

//   // Resume Data Hardcoded
//   const staticProjects = [
//     {
//       id: 'static-1',
//       name: "EduTech: Digitalization Platform",
//       problem: "Educational institutions struggle with manual workflows for Admit Card generation, fee payments, and exam creation, leading to massive inefficiencies.",
//       solution: "Engineered a comprehensive SaaS platform with AWS S3 secure cloud storage, automated CI/CD pipelines, and an AI-Powered Mock Test Generator that creates personalized questions.",
//       techStack: ["Next.js", "TypeScript", "AWS", "GitHub Actions", "Tailwind CSS"],
//       html_url: "#",
//       demo_link: "#"
//     },
//     {
//       id: 'static-2',
//       name: "MediQ: Healthcare Ecosystem",
//       problem: "Patients face difficulties finding appropriate doctors and obtaining intelligent preliminary symptom analysis before booking.",
//       solution: "Built a bridging platform optimizing queries with Redis and MongoDB Aggregation. Integrated MediQGPT using LangChain and Vector DBs to retrieve medical context as an Agentic AI assistant.",
//       techStack: ["MERN Stack", "Redis", "Vector DB", "LangChain", "Docker"],
//       html_url: "#",
//       demo_link: "#"
//     },
//     {
//       id: 'static-3',
//       name: "AI Smart Glasses",
//       problem: "Visually impaired individuals lack real-time, low-latency environmental perception for safe navigation and obstacle avoidance.",
//       solution: "Developed an assistive wearable using Ultralytics YOLOv10 and OpenCV DNN for facial recognition. Optimized processing for resource-constrained Edge AI (Pi Zero 2W) achieving ~50ms latency.",
//       techStack: ["YOLOv10", "OpenCV", "Python", "Bash", "Raspberry Pi"],
//       html_url: "#",
//       demo_link: "#"
//     }
//   ];

//   useEffect(() => {
//     const fetchGithub = async () => {
//       try {
//         const repoRes = await fetch('https://api.github.com/users/hamimreja-404/repos?sort=updated&per_page=10');
//         const reposData = await repoRes.json();
        
//         let fetchedDetails = [];
//         if (Array.isArray(reposData)) {
//           const targetRepos = reposData.filter(r => !r.fork).slice(0, 3);
          
//           fetchedDetails = await Promise.all(targetRepos.map(async (repo) => {
//             let problem = repo.description || "No description provided in GitHub repository.";
//             let solution = "Explore the GitHub repository for full source code and implementation details.";
//             let techStack = repo.language ? [repo.language] : ["Various"];
            
//             try {
//               const readmeRes = await fetch(`https://raw.githubusercontent.com/hamimreja-404/${repo.name}/master/README.md`);
//               if (readmeRes.ok) {
//                 const readmeText = await readmeRes.text();
//                 if (readmeText.length > 50) {
//                   const lines = readmeText.split('\n').filter(l => l.trim().length > 0);
//                   const firstParagraph = lines.find(l => !l.startsWith('#') && !l.startsWith('!'));
//                   if (firstParagraph) problem = firstParagraph.substring(0, 200) + '...';
//                 }
//               }
//             } catch (e) {} // Fallback gracefully

//             return {
//               id: repo.id,
//               name: repo.name.replace(/-/g, ' ').toUpperCase(),
//               problem,
//               solution,
//               techStack,
//               html_url: repo.html_url,
//               demo_link: repo.homepage || repo.html_url
//             };
//           }));
//         }

//         // Add the special "Github More" slide at the end
//         setProjects([...staticProjects, ...fetchedDetails, { id: 'github-more', isMore: true }]);
//       } catch (error) {
//         console.error("Github Fetch Error", error);
//         setProjects([...staticProjects, { id: 'github-more', isMore: true }]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchGithub();
//   }, []);

//   // Map vertical scroll to active project index
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current || projects.length === 0) return;
      
//       const rect = containerRef.current.getBoundingClientRect();
//       const scrolledDistance = -rect.top;
      
//       if (scrolledDistance < 0) {
//         setActiveIndex(0);
//         return;
//       }
      
//       // Calculate which "page" we are on
//       const rawProgress = scrolledDistance / window.innerHeight;
//       const newIndex = Math.max(0, Math.min(projects.length - 1, Math.round(rawProgress)));
      
//       setActiveIndex(newIndex);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll(); // Initialize
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [projects.length]);

//   // FIXED Navigation Logic: accurately calculate distance to document top
//   const navigateTo = (index) => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const containerTop = window.scrollY + rect.top; // Absolute distance from top of page
//     const targetTop = containerTop + (index * window.innerHeight);
//     window.scrollTo({ top: targetTop, behavior: 'smooth' });
//   };

//   if (loading) return <div className="h-screen bg-slate-950 flex items-center justify-center text-cyan-500 font-mono text-2xl animate-pulse">LOADING_WORKSPACE()</div>;

//   return (
//     <div 
//       id="projects" 
//       ref={containerRef} 
//       className="relative w-full bg-slate-950"
//       style={{ height: `${projects.length * 100}vh` }} // Make container massive to allow scrolling
//     >
//       {/* Sticky Full-Screen Container */}
//       <div className="sticky top-0 h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950 perspective-[2500px]">
        
//         {/* Navigation Arrows */}
//         <button 
//           onClick={() => navigateTo(activeIndex - 1)}
//           disabled={activeIndex === 0}
//           className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-slate-900/80 border border-slate-700 text-white backdrop-blur-md transition-all hover:bg-cyan-600 hover:scale-110 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:scale-100 disabled:cursor-not-allowed`}
//         >
//           <ChevronLeft size={32} />
//         </button>
//         <button 
//           onClick={() => navigateTo(activeIndex + 1)}
//           disabled={activeIndex === projects.length - 1}
//           className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-slate-900/80 border border-slate-700 text-white backdrop-blur-md transition-all hover:bg-cyan-600 hover:scale-110 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:scale-100 disabled:cursor-not-allowed`}
//         >
//           <ChevronRight size={32} />
//         </button>

//         {/* Dynamic Project Pages */}
//         {projects.map((project, idx) => {
//           let transformStyle = '';
//           let opacity = 0;
//           let zIndex = 0;

//           // 3D Book Page Flip Logic
//           if (idx === activeIndex) {
//             // Current Page - Front and Center
//             transformStyle = 'rotateY(0deg) translateX(0) scale(1)';
//             opacity = 1;
//             zIndex = 20;
//           } else if (idx < activeIndex) {
//             // Past Pages - Flipped away to the left like a book page
//             transformStyle = 'rotateY(-60deg) translateX(-100%) scale(0.8)';
//             opacity = 0;
//             zIndex = 10;
//           } else {
//             // Future Pages - Waiting on the right
//             transformStyle = 'rotateY(60deg) translateX(100%) scale(0.8)';
//             opacity = 0;
//             zIndex = 10;
//           }

//           // Render "More on GitHub" slide
//           if (project.isMore) {
//             return (
//               <div 
//                 key="github-more"
//                 className="absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
//                 style={{ transform: transformStyle, opacity, zIndex }}
//               >
//                 <FolderGit2 size={120} className="text-cyan-500 mb-8 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]" />
//                 <h3 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight text-center">
//                   More on <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">GitHub</span>
//                 </h3>
//                 <p className="text-xl text-slate-400 mb-12 max-w-2xl text-center">
//                   Explore my complete repository history, open-source contributions, and ongoing experimental projects.
//                 </p>
//                 <a 
//                   href="https://github.com/hamimreja-404" 
//                   target="_blank" 
//                   rel="noreferrer"
//                   className="px-12 py-6 bg-white text-slate-950 font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3"
//                 >
//                   View Full Profile <ExternalLink size={24} />
//                 </a>
//               </div>
//             );
//           }

//           // Render Normal Project Slide
//           return (
//             <div 
//               key={project.id}
//               className="absolute inset-0 w-full h-full flex items-center justify-center p-8 md:p-16 lg:p-24 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
//               style={{ transform: transformStyle, opacity, zIndex }}
//             >
//               {/* Giant Glowing Watermark / Project Number */}
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[30rem] font-black text-cyan-500/5 select-none pointer-events-none z-0 glow-text">
//                 0{idx + 1}
//               </div>

//               {/* Top Right Counter */}
//               <div className="absolute top-8 right-12 text-2xl font-mono text-cyan-500 font-bold tracking-widest z-30">
//                 {String(idx + 1).padStart(2, '0')} <span className="text-slate-600">/ {String(projects.length - 1).padStart(2, '0')}</span>
//               </div>

//               <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
                
//                 {/* Left Content: Text Details */}
//                 <div className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-8">
//                   <div>
//                     <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
//                       {project.name}
//                     </h3>
//                     <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-indigo-600 rounded"></div>
//                   </div>

//                   <div className="space-y-6">
//                     <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-rose-500 hover:border-l-rose-400 transition-colors">
//                       <h4 className="text-rose-400 font-bold mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
//                         <Globe size={18} /> Problem Statement
//                       </h4>
//                       <p className="text-slate-300 leading-relaxed text-lg">{project.problem}</p>
//                     </div>

//                     <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-emerald-500 hover:border-l-emerald-400 transition-colors">
//                       <h4 className="text-emerald-400 font-bold mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
//                         <Code2 size={18} /> Solution Engineered
//                       </h4>
//                       <p className="text-slate-300 leading-relaxed text-lg">{project.solution}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Content: Tech Stack & Links */}
//                 <div className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-8">
//                   <div className="glass-panel p-10 rounded-[2rem] h-full flex flex-col shadow-2xl relative overflow-hidden">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                    
//                     <h4 className="text-white font-bold mb-8 text-2xl tracking-tight">Technology Stack</h4>
//                     <div className="flex flex-wrap gap-3 mb-12 relative z-10">
//                       {project.techStack.map(tech => (
//                         <span key={tech} className="px-5 py-2 bg-slate-900/80 border border-slate-700/80 text-cyan-300 rounded-xl text-sm font-mono shadow-inner backdrop-blur-sm">
//                           {tech}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="mt-auto flex flex-col gap-4 relative z-10">
//                       <a href={project.demo_link} target="_blank" rel="noreferrer" className="w-full py-5 bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold uppercase tracking-wider text-center rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
//                         Live Demo <ExternalLink size={20} />
//                       </a>
//                       <a href={project.html_url} target="_blank" rel="noreferrer" className="w-full py-5 border border-slate-600 hover:border-slate-400 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-center rounded-xl transition-all flex items-center justify-center gap-3">
//                         Source Code <Github size={20} />
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // 4. Experience Section
// const Experience = () => {
//   const experiences = [
//     { 
//       period: "Dec 2025 - Feb 2026", 
//       role: "Full-Stack Developer Intern", 
//       company: "Starium Infotech", 
//       type: "Remote",
//       points: [
//         "Developed and deployed scalable MERN web applications, delivering features ahead of schedule.",
//         "Optimized frontend architectures achieving 95+ PageSpeed Insights scores for Core Web Vitals.",
//         "Implemented robust SEO strategies, significantly improving organic search ranking.",
//         "Contributed to CI/CD DevOps pipelines for streamlined deployment and cloud documentation."
//       ]
//     },
//     { 
//       period: "Jun 2025 - Aug 2025", 
//       role: "Signal & Telecommunication Intern", 
//       company: "Indian Railways (Sealdah Div.)", 
//       type: "Kolkata, India",
//       points: [
//         "Analyzed mission-critical Electronic Interlocking and fault-detection systems within communication networks.",
//         "Gained exposure to high-reliability system design and real-time hardware-software monitoring.",
//         "Troubleshooted signaling protocols and observed MSDAC operations in real-world scenarios."
//       ]
//     }
//   ];

//   const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

//   return (
//     <section ref={ref} className="py-32 bg-[#020617] px-6 border-t border-slate-900 relative z-20">
//       <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none"></div>
      
//       <div className="max-w-5xl mx-auto relative z-10">
//         <h2 className={`text-4xl md:text-6xl font-black text-white mb-20 text-center transition-all duration-1000 transform uppercase tracking-tight ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//           Professional <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 glow-text">Experience</span>
//         </h2>
        
//         <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-transparent">
//           {experiences.map((exp, i) => (
//             <div key={i} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group transition-all duration-1000 delay-${i*200} transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
//               {/* Timeline Node */}
//               <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#020617] bg-cyan-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-10">
//                 <div className="w-4 h-4 bg-white rounded-full"></div>
//               </div>
              
//               {/* Content Card */}
//               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] glass-panel p-10 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl hover:-translate-y-2">
//                 <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-6 gap-4">
//                   <h3 className="font-bold text-white text-3xl leading-tight">{exp.role}</h3>
//                   <span className="px-4 py-2 bg-cyan-950/50 text-cyan-400 border border-cyan-900/50 rounded-lg text-sm font-mono whitespace-nowrap shadow-inner">
//                     {exp.period}
//                   </span>
//                 </div>
//                 <div className="text-emerald-400 font-semibold mb-8 flex items-center gap-2 text-lg border-b border-slate-800 pb-4">
//                   <span className="text-slate-400 font-normal">at</span> {exp.company} <span className="text-slate-500 text-sm ml-2 bg-slate-900 px-3 py-1 rounded-full">({exp.type})</span>
//                 </div>
//                 <ul className="space-y-4">
//                   {exp.points.map((pt, idx) => (
//                     <li key={idx} className="text-slate-300 leading-relaxed flex items-start gap-4 text-base">
//                       <span className="text-cyan-500 mt-1">▹</span> {pt}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // 5. Contact Section
// const Contact = () => {
//   const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

//   return (
//     <section id="contact" ref={ref} className="py-40 bg-slate-950 px-6 relative overflow-hidden border-t border-slate-900 z-20">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-r from-cyan-900/20 to-indigo-900/20 blur-[120px] pointer-events-none rounded-full"></div>
      
//       <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
//         <div className="inline-block px-4 py-2 border border-cyan-500/30 rounded-full bg-cyan-900/20 text-cyan-400 text-sm font-mono mb-8 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
//           <span className="animate-pulse inline-block mr-2 text-cyan-300">●</span> INITIATE_CONNECTION
//         </div>
//         <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
//           Let's Build <br/>
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 glow-text">The Future.</span>
//         </h2>
//         <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
//           My inbox is currently open for new opportunities. Whether you have a question, a project proposal, or just want to discuss tech architecture, I'll get back to you.
//         </p>
        
//         <div className="flex justify-center mb-16">
//           <a href="mailto:hamim.reja.mail@gmail.com" className="group relative px-12 py-6 bg-white text-slate-950 font-black uppercase tracking-widest overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] transition-all hover:scale-105">
//             <span className="relative z-10 flex items-center gap-4 text-lg">
//               <Mail size={24} /> Say Hello
//             </span>
//           </a>
//         </div>

//         <div className="flex justify-center gap-10 border-t border-slate-800/50 pt-16">
//           <a href="https://github.com/hamimreja-404" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-3 font-mono text-lg hover:scale-110 transform duration-300">
//             <Github size={24} /> GitHub
//           </a>
//           <a href="https://linkedin.com/in/hamim-reja-a2ba42279" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-3 font-mono text-lg hover:scale-110 transform duration-300">
//             <Linkedin size={24} /> LinkedIn
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// // --- Main App Component ---
// // FIXED: Removed `overflow-x-hidden` from the main relative wrapper. 
// // Overflow hidden on parents breaks position: sticky for the inner components.
// export default function App() {
//   return (
//     <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative">
//       <GlobalStyles />
//       <MouseEffect />
      
//       <main className="relative z-10">
//         <Hero />
//         <PhysicsPlayground />
//         <Projects />
//         <Experience />
//         <Contact />
//       </main>
      
//       <footer className="py-8 bg-[#020617] text-center text-slate-600 font-mono text-sm tracking-widest uppercase relative z-20 border-t border-slate-900">
//         <p>Engineered by Hamim Reja © {new Date().getFullYear()}</p>
//       </footer>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Code2, 
  TerminalSquare, Database, Cpu, MonitorSmartphone, Server,
  Globe, Cloud, BrainCircuit, Box, ChevronDown, CheckCircle2,
  ChevronLeft, ChevronRight, FolderGit2
} from 'lucide-react';

// --- Global Styles & Keyframes ---
const GlobalStyles = () => (
  <style>{`
    html { scroll-behavior: smooth; }
    body { background-color: #020617; margin: 0; overflow-x: hidden; }
    
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    /* Global Animated Tech Grid Background */
    @keyframes gridMove {
      0% { transform: translateY(0); }
      100% { transform: translateY(50px); }
    }
    .bg-tech-grid {
      background-image: 
        linear-gradient(to right, rgba(34, 211, 238, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
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
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(34, 211, 238, 0.15);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }
    
    .glow-text {
      text-shadow: 0 0 25px rgba(34, 211, 238, 0.5);
    }
  `}</style>
);

// --- Custom Hooks ---
const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => { if (currentElement) observer.unobserve(currentElement); };
  }, [options]);

  return [elementRef, isVisible];
};

// --- Components ---

// 0. Global Canvas Mouse Trail & Click Effect
const MouseEffect = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor(x, y, isBurst = false) {
        this.x = x;
        this.y = y;
        this.size = isBurst ? Math.random() * 5 + 2 : Math.random() * 3 + 1;
        this.speedX = isBurst ? (Math.random() * 12 - 6) : (Math.random() * 2 - 1);
        this.speedY = isBurst ? (Math.random() * 12 - 6) : (Math.random() * 2 - 1);
        this.life = 1;
        this.decay = isBurst ? Math.random() * 0.02 + 0.02 : Math.random() * 0.05 + 0.02;
        this.color = `hsla(190, 100%, 50%, `; // Cyan base
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.95;
      }
      draw() {
        ctx.fillStyle = this.color + this.life + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        if (this.life > 0.5) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'cyan';
        } else {
            ctx.shadowBlur = 0;
        }
      }
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    const handleMouseDown = (e) => {
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle(e.clientX, e.clientY, true));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0 || particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 mix-blend-screen opacity-70" />;
};

// 1. Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-24 md:pt-0">
      
      {/* Animated Color Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-slate-950 to-cyan-900/40 animate-gradient-xy"></div>
      
      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 mix-blend-screen"></div>
      
      {/* Radial vignette to keep the edges dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#020617_100%)]"></div>

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-16 max-w-screen-2xl mx-auto">
        
        {/* Left Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/50 rounded-full bg-cyan-900/30 text-cyan-400 font-mono text-sm shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            SYSTEM.INITIALIZED
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
            HAMIM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-500 to-indigo-500 glow-text">
              REJA
            </span>
          </h1>
          
          <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent md:from-cyan-400 via-cyan-400 to-transparent"></div>
          
          <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed drop-shadow-lg">
            Full Stack, AI & DevOps Software Engineer bridging high-level architectures with LLM capabilities & Edge AI hardware.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2 font-mono">
            {['MERN Stack', 'Next.js', 'Agentic AI', 'AWS/DevOps'].map(tag => (
              <span key={tag} className="px-4 py-2 bg-slate-900/60 border border-slate-700/80 text-slate-200 text-sm rounded-xl flex items-center gap-2 shadow-lg backdrop-blur-md transition-colors hover:border-cyan-500/50">
                <CheckCircle2 size={16} className="text-emerald-400" /> {tag}
              </span>
            ))}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 w-full md:w-auto">
            <button onClick={() => document.getElementById('projects').scrollIntoView()} className="group relative w-full sm:w-auto px-10 py-5 bg-cyan-500 text-slate-950 font-bold uppercase tracking-widest overflow-hidden rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all">
              <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative flex items-center justify-center gap-3">Explore Work <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" /></span>
            </button>
            <div className="flex gap-4">
              <a href="https://github.com/hamimreja-404" target="_blank" rel="noreferrer" className="p-4 bg-slate-900/80 border border-slate-700 hover:text-cyan-400 hover:border-cyan-500/50 rounded-xl transition-all shadow-lg backdrop-blur-md"><Github size={24} /></a>
              <a href="https://linkedin.com/in/hamim-reja-a2ba42279" target="_blank" rel="noreferrer" className="p-4 bg-slate-900/80 border border-slate-700 hover:text-cyan-400 hover:border-cyan-500/50 rounded-xl transition-all shadow-lg backdrop-blur-md"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>

        {/* Right Photo/Image Content */}
        <div className="flex-1 flex justify-center md:justify-end relative w-full mb-12 md:mb-0">
          {/* Glowing Aura behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[450px] md:h-[450px] bg-cyan-500/30 blur-[100px] rounded-full pointer-events-none z-0"></div>
          
          <div className="relative w-64 h-64 md:w-96 md:h-96 animate-float z-10">
            {/* Outer Rotating Orbits */}
            <div className="absolute inset-[-20px] md:inset-[-30px] rounded-full border-[1px] border-dashed border-cyan-500/40 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-[-40px] md:inset-[-60px] rounded-full border-[1px] border-slate-600/50 animate-[spin_30s_linear_infinite_reverse]"></div>
            
            {/* Profile Image Container */}
            <div className="w-full h-full rounded-full p-2 bg-slate-900/40 backdrop-blur-lg border border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.3)] overflow-hidden relative group">
              <img 
                src="https://res.cloudinary.com/dm01lhkax/image/upload/v1775542354/Hamim_cohnwf.jpg" 
                alt="Hamim Reja" 
                className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              {/* Inner subtle glow ring */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] pointer-events-none"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// 2. Full Width Tech Stack Gravity Playground
const PhysicsPlayground = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const requestRef = useRef(null);
  const isDraggingRef = useRef(false);
  const activeNodeRef = useRef(null);
  const [renderTrigger, setRenderTrigger] = useState(0);
  
  const techItems = [
    { id: 1, name: 'Next.js', color: '#ffffff', icon: <TerminalSquare /> },
    { id: 2, name: 'React', color: '#61DAFB', icon: <Code2 /> },
    { id: 3, name: 'TypeScript', color: '#3178C6', icon: <Code2 /> },
    { id: 4, name: 'Node.js', color: '#339933', icon: <Server /> },
    { id: 5, name: 'MongoDB', color: '#47A248', icon: <Database /> },
    // { id: 6, name: 'Redis', color: '#DC382D', icon: <Database /> },
    { id: 7, name: 'Tailwind', color: '#06B6D4', icon: <MonitorSmartphone /> },
    { id: 8, name: 'Docker', color: '#2496ED', icon: <Box /> },
    { id: 9, name: 'AWS', color: '#FF9900', icon: <Cloud /> },
    { id: 10, name: 'YOLOv10', color: '#00FFFF', icon: <BrainCircuit /> },
    // { id: 11, name: 'LangChain', color: '#ffffff', icon: <BrainCircuit /> },
    { id: 12, name: 'Verilog', color: '#2B4A82', icon: <Cpu /> },
    { id: 13, name: 'Python', color: '#3776AB', icon: <TerminalSquare /> },
    { id: 14, name: 'Linux', color: '#FCC624', icon: <TerminalSquare /> }
  ];

  const initPhysics = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    elementsRef.current = techItems.map((item) => ({
      ...item,
      x: Math.random() * (rect.width - 120) + 60,
      y: Math.random() * (rect.height / 2),
      vx: (Math.random() - 0.5) * 15,
      vy: 0,
      radius: 60, 
      isDragging: false
    }));
  };

  const updatePhysics = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const gravity = 0.4;
    const friction = 0.98;
    const bounce = 0.6;

    elementsRef.current.forEach((el, i) => {
      if (el.isDragging) return;
      el.vy += gravity;
      el.vx *= friction;
      el.vy *= friction;
      el.x += el.vx;
      el.y += el.vy;

      if (el.y + el.radius > rect.height) { el.y = rect.height - el.radius; el.vy *= -bounce; el.vx *= 0.9; }
      if (el.y - el.radius < 0) { el.y = el.radius; el.vy *= -bounce; }
      if (el.x + el.radius > rect.width) { el.x = rect.width - el.radius; el.vx *= -bounce; }
      if (el.x - el.radius < 0) { el.x = el.radius; el.vx *= -bounce; }

      for (let j = i + 1; j < elementsRef.current.length; j++) {
        const other = elementsRef.current[j];
        if (other.isDragging) continue;
        const dx = other.x - el.x;
        const dy = other.y - el.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = el.radius + other.radius;
        if (dist < minDist) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;
          el.x -= nx * overlap * 0.5;
          el.y -= ny * overlap * 0.5;
          other.x += nx * overlap * 0.5;
          other.y += ny * overlap * 0.5;
          const dvx = el.vx - other.vx;
          const dvy = el.vy - other.vx;
          el.vx -= dvx * 0.5;
          el.vy -= dvy * 0.5;
          other.vx += dvx * 0.5;
          other.vy += dvy * 0.5;
        }
      }
    });
    setRenderTrigger(prev => prev + 1);
    requestRef.current = requestAnimationFrame(updatePhysics);
  };

  useEffect(() => {
    initPhysics();
    window.addEventListener('resize', initPhysics);
    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', initPhysics);
    };
  }, []);

  const handlePointerDown = (e, index) => {
    e.target.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    activeNodeRef.current = { index, lastX: e.clientX, lastY: e.clientY };
    elementsRef.current[index].isDragging = true;
    elementsRef.current[index].vx = 0;
    elementsRef.current[index].vy = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !activeNodeRef.current) return;
    const { index, lastX, lastY } = activeNodeRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    const el = elementsRef.current[index];
    el.vx = e.clientX - lastX;
    el.vy = e.clientY - lastY;
    el.x = e.clientX - rect.left;
    el.y = e.clientY - rect.top;
    activeNodeRef.current.lastX = e.clientX;
    activeNodeRef.current.lastY = e.clientY;
  };

  const handlePointerUp = () => {
    if (activeNodeRef.current) {
      const { index } = activeNodeRef.current;
      elementsRef.current[index].isDragging = false;
      elementsRef.current[index].vx *= 1.5;
      elementsRef.current[index].vy *= 1.5;
    }
    isDraggingRef.current = false;
    activeNodeRef.current = null;
  };

  return (
    <section className="bg-[#050B14] pt-24 pb-12 border-y border-cyan-900/30 relative z-20">
      
      {/* Centered & Stylized Heading */}
      <div className="w-full px-8 mb-16 flex flex-col items-center justify-center text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
          Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 glow-text">Stack</span>
        </h2>
        <div className="inline-flex items-center gap-3 bg-cyan-950/40 border border-cyan-500/30 px-6 py-3 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)]">
          <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
          <p className="text-cyan-300 font-mono text-sm tracking-widest uppercase font-semibold">
            Interactive Physics Engine • Drag & Drop Enabled
          </p>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[600px] bg-slate-950/60 overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] cursor-crosshair touch-none border-y border-slate-800/80 backdrop-blur-sm"
      >
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-slate-800/10 pointer-events-none select-none">
          TECH
        </div>

        {elementsRef.current.map((el, i) => (
          <div
            key={el.id}
            onPointerDown={(e) => handlePointerDown(e, i)}
            className="absolute w-[120px] h-[120px] -ml-[60px] -mt-[60px] flex flex-col items-center justify-center rounded-[28px] glass-panel hover:bg-slate-800 shadow-2xl cursor-grab active:cursor-grabbing select-none transition-colors border border-slate-700 hover:border-cyan-500"
            style={{
              transform: `translate(${el.x}px, ${el.y}px)`,
              boxShadow: `0 20px 40px -10px ${el.color}30, inset 0 1px 1px rgba(255,255,255,0.1)`
            }}
          >
            <div style={{ color: el.color }} className="mb-3">
              {React.cloneElement(el.icon, { size: 36 })}
            </div>
            <span className="text-sm font-bold text-slate-200 tracking-wide">{el.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// 3. 3D Book-Flip Horizontal Scroll Projects
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Resume Data Hardcoded
  const staticProjects = [
    {
      id: 'static-2',
      name: "MediQ: Healthcare Ecosystem",
      problem: "Patients face difficulties finding appropriate doctors and obtaining intelligent preliminary symptom analysis before booking.",
      solution: "Built a bridging platform optimizing queries with Redis and MongoDB Aggregation. Integrated MediQGPT using LangChain and Vector DBs to retrieve medical context as an Agentic AI assistant.",
      techStack: ["MERN Stack", "Redis", "Vector DB", "LangChain", "Docker"],
      html_url: "https://github.com/hamimreja-404/MediQ-Backend",
      demo_link: "https://medi-q-pink.vercel.app/"
    },
    {
      id: 'static-1',
      name: "EduTech: Digitalization Platform",
      problem: "Educational institutions struggle with manual workflows for Admit Card generation, fee payments, and exam creation, leading to massive inefficiencies.",
      solution: "Engineered a comprehensive SaaS platform with AWS S3 secure cloud storage, automated CI/CD pipelines, and an AI-Powered Mock Test Generator that creates personalized questions.",
      techStack: ["Next.js", "TypeScript", "AWS", "GitHub Actions", "Tailwind CSS"],
      html_url: "https://github.com/hamimreja-404/Tuition_Frontend",
      demo_link: "https://tuition-frontend-three.vercel.app/"
    },
    {
      id: 'static-3',
      name: "AI Smart Glasses",
      problem: "Visually impaired individuals lack real-time, low-latency environmental perception for safe navigation and obstacle avoidance.",
      solution: "Developed an assistive wearable using Ultralytics YOLOv10 and OpenCV DNN for facial recognition. Optimized processing for resource-constrained Edge AI (Pi Zero 2W) achieving ~50ms latency.",
      techStack: ["YOLOv10", "OpenCV", "Python", "Bash", "Raspberry Pi", "Android Development", "Kotlin"],
      html_url: "https://github.com/hamimreja-404/Drishti",
      demo_link: "https://github.com/hamimreja-404/Drishti"
    }
  ];

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const repoRes = await fetch('https://api.github.com/users/hamimreja-404/repos?sort=updated&per_page=10');
        const reposData = await repoRes.json();
        
        let fetchedDetails = [];
        if (Array.isArray(reposData)) {
          const targetRepos = reposData.filter(r => !r.fork).slice(0, 3);
          
          fetchedDetails = await Promise.all(targetRepos.map(async (repo) => {
            let problem = repo.description || "No description provided in GitHub repository.";
            let solution = "Explore the GitHub repository for full source code and implementation details.";
            let techStack = repo.language ? [repo.language] : ["Various"];
            
            try {
              const readmeRes = await fetch(`https://raw.githubusercontent.com/hamimreja-404/${repo.name}/master/README.md`);
              if (readmeRes.ok) {
                const readmeText = await readmeRes.text();
                if (readmeText.length > 50) {
                  const lines = readmeText.split('\n').filter(l => l.trim().length > 0);
                  const firstParagraph = lines.find(l => !l.startsWith('#') && !l.startsWith('!'));
                  if (firstParagraph) problem = firstParagraph.substring(0, 200) + '...';
                }
              }
            } catch (e) {} // Fallback gracefully

            return {
              id: repo.id,
              name: repo.name.replace(/-/g, ' ').toUpperCase(),
              problem,
              solution,
              techStack,
              html_url: repo.html_url,
              demo_link: repo.homepage || repo.html_url
            };
          }));
        }

        // Add the special "Github More" slide at the end
        setProjects([...staticProjects, ...fetchedDetails, { id: 'github-more', isMore: true }]);
      } catch (error) {
        console.error("Github Fetch Error", error);
        setProjects([...staticProjects, { id: 'github-more', isMore: true }]);
      } finally {
        setLoading(false);
      }
    };
    fetchGithub();
  }, []);

  // Map vertical scroll to active project index
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || projects.length === 0) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrolledDistance = -rect.top;
      
      if (scrolledDistance < 0) {
        setActiveIndex(0);
        return;
      }
      
      // Calculate which "page" we are on
      const rawProgress = scrolledDistance / window.innerHeight;
      const newIndex = Math.max(0, Math.min(projects.length - 1, Math.round(rawProgress)));
      
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length]);

  // FIXED Navigation Logic: accurately calculate distance to document top
  const navigateTo = (index) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top; // Absolute distance from top of page
    const targetTop = containerTop + (index * window.innerHeight);
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  if (loading) return <div className="h-screen bg-slate-950 flex items-center justify-center text-cyan-500 font-mono text-2xl animate-pulse">LOADING_WORKSPACE()</div>;

  return (
    <div 
      id="projects" 
      ref={containerRef} 
      className="relative w-full bg-slate-950"
      style={{ height: `${projects.length * 100}vh` }} // Make container massive to allow scrolling
    >
      {/* Sticky Full-Screen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-950 to-slate-950 perspective-[2500px]">
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => navigateTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-slate-900/80 border border-slate-700 text-white backdrop-blur-md transition-all hover:bg-cyan-600 hover:scale-110 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:scale-100 disabled:cursor-not-allowed`}
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={() => navigateTo(activeIndex + 1)}
          disabled={activeIndex === projects.length - 1}
          className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-slate-900/80 border border-slate-700 text-white backdrop-blur-md transition-all hover:bg-cyan-600 hover:scale-110 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:scale-100 disabled:cursor-not-allowed`}
        >
          <ChevronRight size={32} />
        </button>

        {/* Dynamic Project Pages */}
        {projects.map((project, idx) => {
          let transformStyle = '';
          let opacity = 0;
          let zIndex = 0;

          // 3D Book Page Flip Logic
          if (idx === activeIndex) {
            // Current Page - Front and Center
            transformStyle = 'rotateY(0deg) translateX(0) scale(1)';
            opacity = 1;
            zIndex = 20;
          } else if (idx < activeIndex) {
            // Past Pages - Flipped away to the left like a book page
            transformStyle = 'rotateY(-60deg) translateX(-100%) scale(0.8)';
            opacity = 0;
            zIndex = 10;
          } else {
            // Future Pages - Waiting on the right
            transformStyle = 'rotateY(60deg) translateX(100%) scale(0.8)';
            opacity = 0;
            zIndex = 10;
          }

          // Render "More on GitHub" slide
          if (project.isMore) {
            return (
              <div 
                key="github-more"
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transform: transformStyle, opacity, zIndex }}
              >
                <FolderGit2 size={120} className="text-cyan-500 mb-8 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]" />
                <h3 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight text-center">
                  More on <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">GitHub</span>
                </h3>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl text-center">
                  Explore my complete repository history, open-source contributions, and ongoing experimental projects.
                </p>
                <a 
                  href="https://github.com/hamimreja-404" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-12 py-6 bg-white text-slate-950 font-bold uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3"
                >
                  View Full Profile <ExternalLink size={24} />
                </a>
              </div>
            );
          }

          // Render Normal Project Slide
          return (
            <div 
              key={project.id}
              className="absolute inset-0 w-full h-full flex items-center justify-center p-8 md:p-16 lg:p-24 transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ transform: transformStyle, opacity, zIndex }}
            >
              {/* Giant Glowing Watermark / Project Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[30rem] font-black text-cyan-500/5 select-none pointer-events-none z-0 glow-text">
                0{idx + 1}
              </div>

              {/* Top Right Counter */}
              <div className="absolute top-8 right-12 text-2xl font-mono text-cyan-500 font-bold tracking-widest z-30">
                {String(idx + 1).padStart(2, '0')} <span className="text-slate-600">/ {String(projects.length - 1).padStart(2, '0')}</span>
              </div>

              <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
                
                {/* Left Content: Text Details */}
                <div className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                      {project.name}
                    </h3>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-indigo-600 rounded"></div>
                  </div>

                  <div className="space-y-6">
                    <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-rose-500 hover:border-l-rose-400 transition-colors">
                      <h4 className="text-rose-400 font-bold mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
                        <Globe size={18} /> Problem Statement
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-lg">{project.problem}</p>
                    </div>

                    <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-emerald-500 hover:border-l-emerald-400 transition-colors">
                      <h4 className="text-emerald-400 font-bold mb-3 uppercase tracking-wider text-sm flex items-center gap-2">
                        <Code2 size={18} /> Solution Engineered
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-lg">{project.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Right Content: Tech Stack & Links */}
                <div className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-8">
                  <div className="glass-panel p-10 rounded-[2rem] h-full flex flex-col shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                    
                    <h4 className="text-white font-bold mb-8 text-2xl tracking-tight">Technology Stack</h4>
                    <div className="flex flex-wrap gap-3 mb-12 relative z-10">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-5 py-2 bg-slate-900/80 border border-slate-700/80 text-cyan-300 rounded-xl text-sm font-mono shadow-inner backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-col gap-4 relative z-10">
                      <a href={project.demo_link} target="_blank" rel="noreferrer" className="w-full py-5 bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold uppercase tracking-wider text-center rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        Live Demo <ExternalLink size={20} />
                      </a>
                      <a href={project.html_url} target="_blank" rel="noreferrer" className="w-full py-5 border border-slate-600 hover:border-slate-400 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-center rounded-xl transition-all flex items-center justify-center gap-3">
                        Source Code <Github size={20} />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 4. Experience Section
const Experience = () => {
  const experiences = [
    { 
      period: "Dec 2025 - Feb 2026", 
      role: "Full-Stack Developer Intern", 
      company: "Starium Infotech", 
      type: "Remote",
      points: [
        "Developed and deployed scalable MERN web applications, delivering features ahead of schedule.",
        "Optimized frontend architectures achieving 95+ PageSpeed Insights scores for Core Web Vitals.",
        "Implemented robust SEO strategies, significantly improving organic search ranking.",
        "Contributed to CI/CD DevOps pipelines for streamlined deployment and cloud documentation."
      ]
    },
    { 
      period: "Jun 2025 - Aug 2025", 
      role: "Signal & Telecommunication Intern", 
      company: "Indian Railways (Sealdah Div.)", 
      type: "Kolkata, India",
      points: [
        "Analyzed mission-critical Electronic Interlocking and fault-detection systems within communication networks.",
        "Gained exposure to high-reliability system design and real-time hardware-software monitoring.",
        "Troubleshooted signaling protocols and observed MSDAC operations in real-world scenarios."
      ]
    }
  ];

  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 bg-[#020617] px-6 border-t border-slate-900 relative z-20">
      <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className={`text-4xl md:text-6xl font-black text-white mb-20 text-center transition-all duration-1000 transform uppercase tracking-tight ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Professional <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 glow-text">Experience</span>
        </h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-transparent">
          {experiences.map((exp, i) => (
            <div key={i} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group transition-all duration-1000 delay-${i*200} transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              {/* Timeline Node */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#020617] bg-cyan-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-10">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] glass-panel p-10 rounded-3xl border border-slate-800 hover:border-cyan-500/50 transition-all shadow-xl hover:-translate-y-2">
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-6 gap-4">
                  <h3 className="font-bold text-white text-3xl leading-tight">{exp.role}</h3>
                  <span className="px-4 py-2 bg-cyan-950/50 text-cyan-400 border border-cyan-900/50 rounded-lg text-sm font-mono whitespace-nowrap shadow-inner">
                    {exp.period}
                  </span>
                </div>
                <div className="text-emerald-400 font-semibold mb-8 flex items-center gap-2 text-lg border-b border-slate-800 pb-4">
                  <span className="text-slate-400 font-normal">at</span> {exp.company} <span className="text-slate-500 text-sm ml-2 bg-slate-900 px-3 py-1 rounded-full">({exp.type})</span>
                </div>
                <ul className="space-y-4">
                  {exp.points.map((pt, idx) => (
                    <li key={idx} className="text-slate-300 leading-relaxed flex items-start gap-4 text-base">
                      <span className="text-cyan-500 mt-1">▹</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Contact Section
const Contact = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const [VisitorCount, setVisitorCount] = useState(null);
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
    <section id="contact" ref={ref} className="py-40 bg-slate-950 px-6 relative overflow-hidden border-t border-slate-900 z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[500px] bg-gradient-to-r from-cyan-900/20 to-indigo-900/20 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="inline-block px-4 py-2 border border-cyan-500/30 rounded-full bg-cyan-900/20 text-cyan-400 text-sm font-mono mb-8 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <span className="animate-pulse inline-block mr-2 text-cyan-300">●</span> INITIATE_CONNECTION
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
          Let's Build <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 glow-text">The Future.</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          My inbox is currently open for new opportunities. Whether you have a question, a project proposal, or just want to discuss tech architecture, I'll get back to you.
        </p>
        
<div className="flex justify-center mb-16">
          <a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=hamim.reja.mail@gmail.com" 
            target="_blank" 
            rel="noreferrer"
            className="group relative px-12 py-6 bg-white text-slate-950 font-black uppercase tracking-widest overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-4 text-lg">
              <Mail size={24} /> Say Hello
            </span>
          </a>
        </div>

        <div className="flex justify-center gap-10 border-t border-slate-800/50 pt-16">
          <a href="https://github.com/hamimreja-404" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-3 font-mono text-lg hover:scale-110 transform duration-300">
            <Github size={24} /> GitHub
          </a>
          <a href="https://linkedin.com/in/hamim-reja-a2ba42279" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-3 font-mono text-lg hover:scale-110 transform duration-300">
            <Linkedin size={24} /> LinkedIn
          </a>
        </div>
        <div className="flex justify-center pt-16">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-slate-800/60 bg-slate-900/40 backdrop-blur-md group hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Profile Views
            </span>
            <span className="w-px h-4 bg-slate-700"></span>
            <span className="font-mono text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all">
              {VisitorCount + 500 || "2576"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App Component ---
// FIXED: Removed `overflow-x-hidden` from the main relative wrapper. 
// Overflow hidden on parents breaks position: sticky for the inner components.
export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      <GlobalStyles />
      <MouseEffect />
      
      <main className="relative z-10">
        <Hero />
        <PhysicsPlayground />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
      <footer className="py-8 bg-[#020617] text-center text-slate-600 font-mono text-sm tracking-widest uppercase relative z-20 border-t border-slate-900">
        <p>Engineered by Hamim Reja © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}