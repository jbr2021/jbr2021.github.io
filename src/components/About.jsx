import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
        </div>

        <div className="row" style={{ marginTop: '2rem' }}>
          <div className="col-lg-4">
            <div className="card" style={{ textAlign: 'center' }}>
              <img 
                src="/assets/img/Jaibir-Singh-07.jpg" 
                alt="Jaibir Singh" 
                style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '9999px', 
                  objectFit: 'cover',
                  margin: '0 auto 1.5rem',
                  border: '4px solid var(--border)'
                }} 
              />
              <h3 style={{ marginBottom: '0.5rem' }}>Jaibir Singh</h3>
              <p className="text-muted" style={{ marginBottom: '1rem' }}>Technical Architect &amp; AI Engineer</p>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card">
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                Technical Architect with <strong>14+ years</strong> of experience delivering web, mobile, and business intelligence solutions.
                Expert in building production-grade AI systems using <strong>Python, FastAPI, Azure OpenAI, RAG, and Multi-Agent architectures</strong>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                <div>
                  <div><strong>Current Focus</strong></div>
                  <div className="text-muted">Generative AI • Agentic Systems • Azure AI</div>
                </div>
                <div>
                  <div><strong>Certifications</strong></div>
                  <div className="text-muted">Google Cloud Professional Cloud Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
