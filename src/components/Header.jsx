import React from 'react';

const Header = ({ onNavClick }) => {
  const navLinks = [
    { href: '#hero', icon: 'bi bi-home', label: 'Home' },
    { href: '#about', icon: 'bi bi-user', label: 'About' },
    { href: '#resume', icon: 'bi bi-file-blank', label: 'Resume' },
    { href: '#skills', icon: 'bi bi-server', label: 'Skills' }
  ];

  return (
    <header id="header">
      <div className="d-flex flex-column">
        <div className="profile">
          <img 
            src="/assets/img/Jaibir-Singh-07.jpg" 
            alt="Jaibir Singh" 
            className="img-fluid rounded-circle" 
          />
          <h1 className="text-light">
            <a href="#hero">Jaibir Singh</a>
          </h1>
          <div className="social-links mt-3 text-center">
            <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="google-plus"><i className="bi bi-skype"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>

        <nav id="navbar" className="nav-menu navbar">
          <ul className="list-unstyled">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href} 
                  className={`nav-link scrollto ${index === 0 ? 'active' : ''}`}
                  onClick={onNavClick}
                >
                  <i className={link.icon}></i> 
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
