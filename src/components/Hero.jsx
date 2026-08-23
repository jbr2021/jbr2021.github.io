import React, { useState, useEffect } from 'react';
import RAGResourceSetupDiagram from './RAGResourceSetupDiagram';
import { getExperienceYearsLabel } from '../utils/experience';

const DEFAULT_TECH_PILLS = [
  { name: 'Azure OpenAI (gpt-5)', icon: 'bi-cpu text-cyan' },
  { name: 'Agentic AI', icon: 'bi-diagram-3 text-cyan' },
  { name: 'AI Agents', icon: 'bi-robot text-cyan' },
  { name: 'RAG & Vector Search', icon: 'bi-search text-cyan' },
  { name: 'Python FastAPI', icon: 'bi-code-slash text-cyan' },
  { name: 'Backstage IDP', icon: 'bi-boxes text-cyan' },
  { name: 'Google Cloud Certified', icon: 'bi-patch-check-fill text-primary' },
  { name: 'MongoDB SI Associate', icon: 'bi-database-fill-check text-success' }
];

const getTechIcon = (name) => {
  const lower = (name || '').toLowerCase();
  if (lower.includes('mongodb')) return 'bi-database-fill-check text-success';
  if (lower.includes('google') || lower.includes('cloud certified')) return 'bi-patch-check-fill text-primary';
  if (lower.includes('backstage')) return 'bi-boxes text-cyan';
  if (lower.includes('fastapi') || lower.includes('python')) return 'bi-code-slash text-cyan';
  if (lower.includes('rag') || lower.includes('search')) return 'bi-search text-cyan';
  if (lower.includes('agentic')) return 'bi-diagram-3 text-cyan';
  if (lower.includes('agent') || lower.includes('openai') || lower.includes('ai')) return 'bi-cpu text-cyan';
  return 'bi-cpu text-cyan';
};

const Hero = ({ profile }) => {
  const personal = profile?.personal || {};
  const experienceYears = getExperienceYearsLabel(personal.experienceStartDate);
  const [showPhoto, setShowPhoto] = useState(true);

  // Sync state with profile.json flag when loaded
  useEffect(() => {
    if (personal.usePersonalPhoto !== undefined) {
      setShowPhoto(personal.usePersonalPhoto);
    }
  }, [personal.usePersonalPhoto]);

  const pills = personal.techPills || DEFAULT_TECH_PILLS;

  return (
    <section id="hero" className="hero-section d-lg-flex align-items-lg-center position-relative min-vh-lg-100">
      <div className="container">
        <div className="row align-items-lg-center g-4 g-lg-5">
          {/* Main Hero Glass Panel Container */}
          <div className="col-lg-7">
            <div className="hero-content card border-0 glass-card p-4 p-md-5 rounded-4 shadow-lg position-relative">
              {/* Badge */}
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill badge-ai-status mb-3 shadow-sm align-self-start">
                <span className="pulse-dot"></span>
                <span className="small fw-bold tracking-wide text-uppercase">
                  Forward Deployed AI Engineer &amp; Senior Technical Specialist • {experienceYears} Years
                </span>
              </div>

              <h1 className="hero-title display-3 fw-extrabold mb-3 text-body">
                Hi, I'm <span className="gradient-text">{personal.name || 'Jaibir Singh'}</span>
              </h1>

              <p className="hero-subtitle lead mb-4 text-body-secondary style-leading">
                {personal.tagline || 
                  "Senior Technical Specialist with deep expertise in building production-grade AI systems — Generative AI, Agentic AI, AI Agents, RAG, Azure, and Python."
                }
              </p>

              {/* Tech Stack Pills */}
              <div className="hero-tech-pills d-flex flex-wrap gap-2 mb-4">
                {pills.map((tech, i) => {
                  const name = typeof tech === 'string' ? tech : tech.name;
                  const icon = typeof tech === 'object' && tech.icon ? tech.icon : getTechIcon(name);
                  return (
                    <span key={i} className="tech-pill px-2.5 py-1 rounded-3 small border d-inline-flex align-items-center">
                      <i className={`bi ${icon} me-1.5`}></i>
                      <span>{name}</span>
                    </span>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="hero-cta d-flex flex-wrap align-items-center gap-3">
                <a href="#experience" className="btn btn-outline-primary btn-lg rounded-pill px-4 py-2.5 d-inline-flex align-items-center gap-2">
                  <i className="bi bi-briefcase"></i>
                  <span>Explore Experience</span>
                  {/* <i className="bi bi-arrow-right"></i> */}
                </a>

                <a href="#ai-pipeline" className="btn btn-outline-primary btn-lg rounded-pill px-4 py-2.5 d-inline-flex align-items-center gap-2">
                  <i className="bi bi-diagram-3"></i>
                  <span>AI Architecture Lab</span>
                </a>

                <a href="./Jaibir-Singh-Resume.pdf" download className="btn btn-outline-primary btn-lg rounded-pill px-4 py-2.5 d-inline-flex align-items-center gap-2">
                  <i className="bi bi-file-earmark-arrow-down-fill"></i>
                  <span>Download Resume</span>
                </a>

                <a href="#" onClick={() => setShowPhoto(!showPhoto)} className="btn btn-outline-primary btn-lg rounded-pill px-4 py-2.5 d-inline-flex align-items-center gap-2">
                  <i className={`bi ${showPhoto ? 'bi-diagram-3-fill text-cyan' : 'bi-person-square text-primary'}`}></i>
                  <span>{showPhoto ? 'View Agentic RAG Flow' : 'View Personal Photo'}</span>
                </a>                
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Switcher (Photo vs Azure RAG Cloud Topology Diagram) */}
          <div className="col-lg-5 text-center">
            {showPhoto ? (
              <div className="hero-profile-wrapper position-relative mx-auto" style={{ maxWidth: '400px' }}>
                {/* Outer Ambient Glow Ring */}
                <div className="profile-glow-ring position-absolute top-50 start-50 translate-middle w-100 h-100 rounded-circle opacity-75 blur-3xl"></div>
                
                <div className="profile-card-inner card border-0 rounded-4 overflow-hidden shadow-2xl glass-card position-relative p-3">
                  <div className="position-relative overflow-hidden rounded-3 mb-3">
                    <img 
                      src={personal.photos?.avatar || "/assets/img/Jaibir-Singh-07.jpg"} 
                      alt={personal.name || "Jaibir Singh"}
                      className="img-fluid w-100 profile-avatar-img transition-transform duration-500"
                      loading="eager"
                    />
                    <div className="profile-overlay-badge position-absolute bottom-0 start-0 end-0 p-2 text-start bg-gradient-dark text-white">
                      <div className="fw-bold small">{personal.title || "Senior Technical Specialist & Forward Deployed AI Engineer"}</div>
                      <div className="x-small opacity-75"><i className="bi bi-geo-alt-fill me-1"></i>{personal.location || "Noida / Delhi NCR, India"}</div>
                    </div>
                  </div>

                  {/* Micro Stats inside Card */}
                  <div className="row g-2 text-center pt-1">
                    <div className="col-4">
                      <div className="p-2 rounded-3 bg-body-tertiary border">
                        <div className="fw-extrabold text-cyan">{experienceYears}</div>
                        <div className="x-small text-muted">Years Exp</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-2 rounded-3 bg-body-tertiary border">
                        <div className="fw-extrabold text-primary">Agentic AI</div>
                        <div className="x-small text-muted">RAG &amp; AI Agents</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-2 rounded-3 bg-body-tertiary border">
                        <div className="fw-extrabold text-success">Certified</div>
                        <div className="x-small text-muted">GCP &amp; MongoDB</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hero-diagram-wrapper position-relative mx-auto px-1" style={{ maxWidth: '410px' }}>
                <RAGResourceSetupDiagram />
              </div>
            )}

            {/* Visual Mode Toggle */}
            {/* <button
              className="btn btn-outline-secondary rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 mt-4"
              onClick={() => setShowPhoto(!showPhoto)}
              title="Toggle visual mode between Personal Photo and Agentic AI RAG Topology Diagram"
            >
              <i className={`bi ${showPhoto ? 'bi-diagram-3-fill text-cyan' : 'bi-person-square text-primary'}`}></i>
              <span>{showPhoto ? 'View Agentic RAG Flow' : 'View Personal Photo'}</span>
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
