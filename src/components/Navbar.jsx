import React, { useEffect, useState } from 'react';
import JBRLogo from './JBRLogo';

const Navbar = ({ theme, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId = null;
    let ticking = false;
    let lastScrolledState = window.scrollY > 30;

    setScrolled(lastScrolledState);

    const updateScrolledState = () => {
      ticking = false;
      const nextScrolledState = window.scrollY > 30;

      if (nextScrolledState !== lastScrolledState) {
        lastScrolledState = nextScrolledState;
        setScrolled(nextScrolledState);
      }
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      rafId = window.requestAnimationFrame(updateScrolledState);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // Account for fixed navbar (~110px) + hero-content margin + extra breathing room
      const y = el.getBoundingClientRect().top + window.scrollY - 135;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className={`navbar-header fixed-top transition-all ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="navbar navbar-expand-lg py-2">
        <div className="container">
          {/* Brand Logo */}
          <a href="#hero" className="navbar-brand d-flex align-items-center me-4" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
            <JBRLogo width={145} height={38} />
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
                <a className="nav-link" href="#education" onClick={(e) => { e.preventDefault(); scrollTo('education'); }}>Education</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Right Action Controls */}
          <div className="d-flex align-items-center gap-2">
            {/* Theme Toggle Button */}
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

            {/* CTA Button */}
            <a
              href="#contact"
              className="btn btn-sm btn-outline-primary rounded-pill d-none d-sm-inline-flex align-items-center gap-1 px-3"
              onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            >
              <i className="bi bi-send"></i> Get In Touch
            </a>

            {/* Mobile Drawer Toggle */}
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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-menu-drawer d-lg-none p-3 shadow-lg border-bottom animate-fade-in">
          <div className="d-flex flex-column gap-2">
            <a className="mobile-nav-link" href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
            <a className="mobile-nav-link" href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }}>Experience</a>
            <a className="mobile-nav-link" href="#ai-pipeline" onClick={(e) => { e.preventDefault(); scrollTo('ai-pipeline'); }}>AI Architecture</a>
            <a className="mobile-nav-link" href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
            <a className="mobile-nav-link" href="#education" onClick={(e) => { e.preventDefault(); scrollTo('education'); }}>Education</a>
            <a className="mobile-nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
            <a className="mobile-nav-link" href="./Jaibir-Singh-Resume.pdf" download onClick={() => setMobileOpen(false)}>
              <i className="bi bi-download me-2"></i>Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
