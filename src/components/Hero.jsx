import React from 'react';

const Hero = () => {
  return (
    <section id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="badge">AI Engineer • 14+ Years</div>

          <h1>
            Hi, I’m <span>Jaibir Singh</span>
          </h1>

          <div className="subtitle">
            Technical Architect with deep expertise in building production-grade 
            AI systems — Generative AI, RAG, Multi-Agent architectures, Azure, and Python.
          </div>

          <div className="cta-group">
            <a href="#about" className="btn btn-primary">
              Get to know me →
            </a>
            <a href="#resume" className="btn btn-outline">
              View Experience
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
