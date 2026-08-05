import React from 'react';

const Navbar = ({ theme, toggleTheme }) => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
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
      </div>
    </nav>
  );
};

export default Navbar;
