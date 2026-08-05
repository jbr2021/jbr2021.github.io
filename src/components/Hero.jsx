import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  
  const items = [
    "Technical Architect",
    "AI Engineer",
    "Generative AI Specialist",
    "Azure + Python Expert"
  ];

  useEffect(() => {
    let i = 0;
    let j = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const current = items[i];
      
      if (!isDeleting) {
        setTypedText(current.substring(0, j + 1));
        j++;
        
        if (j === current.length) {
          isDeleting = true;
          timeout = setTimeout(type, 1600);
        } else {
          timeout = setTimeout(type, 85);
        }
      } else {
        setTypedText(current.substring(0, j - 1));
        j--;
        
        if (j === 0) {
          isDeleting = false;
          i = (i + 1) % items.length;
          timeout = setTimeout(type, 450);
        } else {
          timeout = setTimeout(type, 38);
        }
      }
    };

    timeout = setTimeout(type, 900);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="hero">
      <div className="container">
        <div className="hero-content">
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '4px 14px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              AI Engineer • 14+ Years
            </span>
          </div>

          <h1>
            Hi, I’m <span style={{color: 'var(--primary)'}}>Jaibir Singh</span>
          </h1>
          
          <div className="subtitle">
            I architect and build <strong>production-grade AI systems</strong> — 
            from RAG pipelines to Multi-Agent platforms.
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <a 
              href="#about" 
              style={{
                background: 'var(--primary)', 
                color: 'white', 
                padding: '14px 32px', 
                borderRadius: '9999px', 
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Get to know me <i className="bi bi-arrow-right"></i>
            </a>
            <a 
              href="#resume" 
              style={{
                color: 'var(--text)',
                padding: '14px 28px', 
                borderRadius: '9999px', 
                textDecoration: 'none',
                fontWeight: 600,
                border: '1px solid var(--border)'
              }}
            >
              View Experience
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
