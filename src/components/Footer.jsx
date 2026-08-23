import React from 'react';
import JBRLogo from './JBRLogo';

const Footer = ({ profile }) => {
  const personal = profile?.personal || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section border-top py-5 bg-body-tertiary">
      <div className="container">
        <div className="row g-4 align-items-center">
          {/* Brand & Tagline */}
          <div className="col-md-6 text-center text-md-start">
            <div className="d-inline-block mb-2">
              <JBRLogo width={140} height={36} />
            </div>
            <p className="small text-muted mb-0 style-leading" style={{ maxWidth: '400px' }}>
              {personal.name} — Forward Deployed AI Engineer &amp; Senior Technical Specialist specializing in Generative AI, Agentic AI, AI Agents, RAG, Azure, and Python FastAPI microservices.
            </p>
          </div>

          {/* Quick Nav & Links */}
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3 mb-3 small fw-semibold">
              <a href="#about" className="text-body-secondary text-decoration-none">About</a>
              <a href="#experience" className="text-body-secondary text-decoration-none">Experience</a>
              <a href="#ai-pipeline" className="text-body-secondary text-decoration-none">AI Systems</a>
              <a href="#skills" className="text-body-secondary text-decoration-none">Skills</a>
              <a href="#contact" className="text-body-secondary text-decoration-none">Contact</a>
            </div>

            <div className="x-small text-muted">
              Built with React + Vite • Deployed on GitHub Pages<br />
              © {currentYear} {personal.name || 'Jaibir Singh'}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
