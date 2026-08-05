import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '2.5rem 0', 
      borderTop: '1px solid var(--border)',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        Built with React + Vite • Deployed on GitHub Pages
      </div>
    </footer>
  );
};

export default Footer;
