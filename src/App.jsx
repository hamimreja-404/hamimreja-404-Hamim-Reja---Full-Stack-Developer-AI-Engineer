import React, { useState,useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar_1";
import Footer from "./components/Footer_1";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import PortfolioPage from "./pages/Portfolio";
import ContactPage from "./pages/Contact";
import { websiteConfig } from "./data/ConfigData";
import ServicesPage from "./pages/Service";
import ProductsPage from "./pages/SaaS";
import { ThemeContext } from "./components/ThemeContext";
import Dashboard from "./pages/Dashboard";
function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const pin = import.meta.env.VITE_ADMIN_PASSWORD;
  console.log("API URL:", API_URL); // Debugging line to check the API URL
  console.log("Admin Password:", pin); // Debugging line to check the admin password
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Change URL if your backend is deployed elsewhere
        const response = await fetch(`${API_URL}/track-visitor`, {
          method: "POST", // The backend specifically expects a POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}), // Sending empty body is fine
        });

        const data = await response.json();
        
      } catch (error) {
        console.error("Tracking failed:", error);
      }
    };

    trackVisitor();
  }, []); 
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const lightColors = websiteConfig.designSystem.colorPalette.lightMode;
  const darkColors = websiteConfig.designSystem.colorPalette.darkMode;


  // App.jsx - Modify the return statement
return (
<HelmetProvider>  

  <Router>
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        themeColors: isDark ? darkColors : lightColors,
      }}
    >
      <ScrollToTop />
      {/* ADD THIS WRAPPER DIV with a background style */}
      <div 
        className="flex flex-col min-h-screen transition-colors duration-300" 
        style={{ backgroundColor: isDark ? darkColors.background : lightColors.background }}
      >
        <Navbar 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          themeColors={isDark ? darkColors : lightColors} 
        />
        <main className="flex-1 mt-10">
          <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/ZGFzaGJvYXJk" element={<Dashboard />} />
              </Routes>
          </AnimatePresence>
        </main>
        <Footer isDark={isDark} themeColors={isDark ? darkColors : lightColors} />
      </div>
    </ThemeContext.Provider>
  </Router>

  </HelmetProvider>
);
}

export default App;
