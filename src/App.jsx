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
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <AIBackground />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <Hero />
      
      <main>
        <About />
        <Resume />
        <Skills />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
