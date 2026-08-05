import React, { useState } from 'react';

const Navbar = ({ theme, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <a href="#hero" className="navbar-brand">
          Jaibir Singh <span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
          <a href="#resume" onClick={(e) => { e.preventDefault(); scrollTo('resume'); }}>Experience</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
          >
            {theme === 'dark' ? '☀︎' : '☾'}
          </button>
          
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu" style={{ 
          position: 'absolute', top: '100%', left: 0, right: 0, 
          background: 'var(--surface)', borderTop: '1px solid var(--border)', 
          padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' 
        }}>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
          <a href="#resume" onClick={(e) => { e.preventDefault(); scrollTo('resume'); }}>Experience</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
