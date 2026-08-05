import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Footer from './components/Footer';
import AIBackground from './components/AIBackground';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* Subtle AI Background Animation */}
      <AIBackground />

      {/* Modern Top Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero */}
      <Hero />

      <main>
        <About />
        <Resume />
        <Skills />
      </main>

      <Footer />

      {/* Back to top */}
      <a href="#hero" className="back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </>
  );
}

export default App;
