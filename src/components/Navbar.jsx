import React, { useState, useEffect } from 'react';
import JBRLogo from './JBRLogo';

const Navbar = ({ theme, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className={`navbar-header fixed-top transition-all ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg py-2">
        <div className="container">
          {/* Logo */}
          <a href="#hero" className="navbar-brand d-flex align-items-center me-4" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
            <JBRLogo width={150} height={40} />
          </a>

          {/* Desktop Nav Links */}
          <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-1 gap-xl-3">
              <li className="nav-item">
                <a className="nav-link" href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }}>Experience</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#ai-pipeline" onClick={(e) => { e.preventDefault(); scrollTo('ai-pipeline'); }}>AI Architecture</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#backstage" onClick={(e) => { e.preventDefault(); scrollTo('backstage'); }}>Platform Mesh</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#education" onClick={(e) => { e.preventDefault(); scrollTo('education'); }}>Education</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Right Action Buttons */}
          <div className="d-flex align-items-center gap-2">
            <button 
              className="theme-toggle-btn rounded-circle d-flex align-items-center justify-content-center" 
              onClick={toggleTheme}
              aria-label="Toggle dark/light mode"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <i className="bi bi-sun-fill text-warning"></i>
              ) : (
                <i className="bi bi-moon-stars-fill text-primary"></i>
              )}
            </button>

            <a 
              href="#contact" 
              className="btn btn-sm btn-outline-primary rounded-pill d-none d-sm-inline-flex align-items-center gap-1 px-3"
              onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            >
              <i className="bi bi-send"></i> Get In Touch
            </a>

            {/* Mobile Menu Toggle Button */}
            <button 
              className="mobile-toggle-btn d-lg-none rounded-3 border-0 bg-transparent p-2" 
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              <i className={`bi ${mobileOpen ? 'bi-x-lg' : 'bi-list'} fs-3 text-body`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="mobile-menu-drawer d-lg-none p-3 shadow-lg border-bottom animate-fade-in">
          <div className="d-flex flex-column gap-2">
            <a className="mobile-nav-link" href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
            <a className="mobile-nav-link" href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }}>Experience</a>
            <a className="mobile-nav-link" href="#ai-pipeline" onClick={(e) => { e.preventDefault(); scrollTo('ai-pipeline'); }}>AI Architecture</a>
            <a className="mobile-nav-link" href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
            <a className="mobile-nav-link" href="#backstage" onClick={(e) => { e.preventDefault(); scrollTo('backstage'); }}>Platform Mesh</a>
            <a className="mobile-nav-link" href="#education" onClick={(e) => { e.preventDefault(); scrollTo('education'); }}>Education</a>
            <a className="mobile-nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
