
export const websiteConfig = {
  profile: {
    name: "Hamim Reja",
    role: "Full-Stack Developer & ECE Engineer",
    email: "hamim.reja.mail@gmail.com",
    location: "Kolkata, India",
    photo: "",
    socials: {
      github: "https://github.com/hamimreja-404",
      linkedin: "https://linkedin.com/in/hamim-reja-a2ba42279",
      twitter: "#",
    },
  },
  designSystem: {
    colorPalette: {
      lightMode: {
        primary: "#0EA5E9", // Sky Blue
        secondary: "#8B5CF6", // Violet
        background: "#FFFFFF",
        surface: "#F8FAFC",
        textPrimary: "#0F172A",
        textSecondary: "#64748B",
        border: "#E2E8F0",
        accentGreen: "#10B981",
        accentAmber: "#F59E0B",
      },
      darkMode: {
        primary: "#38BDF8",
        secondary: "#A78BFA",
        background: "#0F172A",
        surface: "#1E293B",
        textPrimary: "#F1F5F9",
        textSecondary: "#94A3B8",
        border: "#334155",
        accentGreen: "#22C55E",
        accentAmber: "#FBBf24",
      },
    },
  },
  navbar: {
    items: [
      { label: "Home", link: "home" },
      { label: "About", link: "about" },
      { label: "Portfolio", link: "portfolio" },
      { label: "Services", link: "services" },
      { label: "Products", link: "products" },
      { label: "Contact", link: "contact" },
    ],
  },
  homepage: {
    hero: {
      greeting: "Hello, I'm Hamim 👋",
      headline: "Bridging Software & Hardware",
      subheadline:
        "I build scalable Full-Stack Web Applications and intelligent Edge AI systems. Merging the power of MERN stack with embedded engineering.",
      ctas: [
        { label: "View Portfolio", link: "#portfolio", primary: true },
        { label: "Explore Products", link: "#products", primary: false },
      ],
    },
    stats: [
      { number: 15, label: "Projects Built", icon: "rocket", suffix: "+" },
      { number: 3, label: "Years Coding", icon: "code-2", suffix: "+" },
      { number: 10, label: "Tech Stack Tools", icon: "layers", suffix: "+" },
      { number: 100, label: "Commits/Month", icon: "github", suffix: "+" },
    ],
    projects: [
      {
        title: "AI Smart Glasses",
        description:
          "Assistive wearable device for the visually impaired using YOLOv10 & OpenCV on Raspberry Pi Zero 2W. Features real-time obstacle detection and face recognition.",
        tags: ["Python", "YOLOv10", "OpenCV", "Edge AI"],
        image: "https://res.cloudinary.com/dm01lhkax/image/upload/v1770918298/Drishti_ryjy3c.jpg",
      },
      {
        title: "MediQ Healthcare Platform",
        description:
          "Comprehensive doctor-patient ecosystem with complex MongoDB aggregation for scheduling, filtering, and JWT-secured appointment booking.",
        tags: ["MERN Stack", "Redux", "JWT", "Rest API"],
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "#",
      },
      {
        title: "Tuition Management System",
        description:
          "Role-Based Access Control (RBAC) platform for educational institutes. Features 3-tier hierarchy (Superadmin, Admin, Student) and fee tracking.",
        tags: ["React", "Node.js", "Tailwind", "RBAC"],
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "#",
      },
      {
        title: "FPGA UART Protocol",
        description:
          "Designed a UART transmitter and receiver with configurable baud rates using Verilog, verified via Xilinx Vivado simulations.",
        tags: ["Verilog", "FPGA", "Xilinx", "Hardware"],
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "#",
      },
    ],
    products: [
      {
        title: "EduManage Pro",
        description:
          "A white-label SaaS solution for coaching centers to manage students, fees, and attendance.",
        price: "SaaS",
        features: ["RBAC Security", "Payment Tracking", "Dashboard Analytics"],
      },
      {
        title: "VisionAssist Core",
        description:
          "Open-source object detection module optimized for low-power edge devices like Raspberry Pi.",
        price: "Open Source",
        features: ["YOLO Optimization", "Text-to-Speech", "Offline Capable"],
      },
    ],
    services: [
      {
        title: "Full-Stack Development",
        desc: "Building end-to-end web applications using the MERN stack (MongoDB, Express, React, Node.js).",
        icon: "layout",
      },
      {
        title: "Edge AI & Computer Vision",
        desc: "Deploying lightweight AI models (YOLO) on resource-constrained hardware like Raspberry Pi.",
        icon: "eye",
      },
      {
        title: "Embedded Systems",
        desc: "Designing digital systems with Verilog, FPGA interfacing, and microcontroller programming.",
        icon: "cpu",
      },
      {
        title: "API Architecture",
        desc: "Creating secure, scalable RESTful APIs with complex aggregation pipelines and authentication.",
        icon: "server",
      },
    ],
    techStack: [
      { name: "React", icon: "code-2" },
      { name: "Node.js", icon: "server" },
      { name: "MongoDB", icon: "database" },
      { name: "Python", icon: "code-2" },
      { name: "Verilog", icon: "cpu" },
      { name: "AWS", icon: "globe" },
    ],
  },
};
