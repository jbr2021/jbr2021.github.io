import React, { useState } from 'react';

const Navbar = ({ theme, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 78;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <a href="#hero" className="navbar-brand">
          Jaibir Singh <span>.</span>
        </a>

        {/* Desktop nav */}
        <div className="nav-links">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
          <a href="#resume" onClick={(e) => { e.preventDefault(); scrollTo('resume'); }}>Experience</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <i className="bi bi-sun-fill"></i>
            ) : (
              <i className="bi bi-moon-fill"></i>
            )}
          </button>

          {/* Mobile hamburger */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <i className={`bi ${mobileOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
          <a href="#resume" onClick={(e) => { e.preventDefault(); scrollTo('resume'); }}>Experience</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
