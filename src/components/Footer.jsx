import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        Built with React + Vite • Deployed on GitHub Pages<br />
        © {new Date().getFullYear()} Jaibir Singh — Technical Architect &amp; AI Engineer
      </div>
    </footer>
  );
};

export default Footer;
