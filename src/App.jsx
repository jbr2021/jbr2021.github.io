import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Footer from './components/Footer';
import AIBackground from './components/AIBackground';
import MobileNav from './components/MobileNav';

function App() {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  // Close mobile nav when clicking nav links
  const handleNavClick = () => {
    setMobileNavActive(false);
  };

  // Handle scroll spy for active nav links (optional enhancement)
  useEffect(() => {
    const handleScroll = () => {
      // Can add scroll spy logic here if needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* AI Engineering Background - Core Feature */}
      <AIBackground />

      {/* Mobile Nav Toggle Button */}
      <MobileNav 
        isActive={mobileNavActive} 
        onToggle={() => setMobileNavActive(!mobileNavActive)} 
      />

      {/* Sidebar Header */}
      <Header onNavClick={handleNavClick} />

      {/* Hero Section */}
      <Hero />

      <main id="main">
        {/* About Section */}
        <About />

        {/* Resume Section */}
        <Resume />

        {/* Skills Section */}
        <Skills />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <a 
        href="#hero" 
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}

export default App;
