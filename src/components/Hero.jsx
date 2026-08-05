import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const typedItems = [
    'a Technical Architect',
    'a GCP Professional Cloud Developer',
    'well versed in Databases',
    'well experienced in Azure Cloud',
    'an AI Engineer',
    'a Python & FastAPI Developer'
  ];

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const current = typedItems[currentIndex];
      
      if (!isDeleting) {
        setTypedText(current.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === current.length) {
          isDeleting = true;
          timeout = setTimeout(type, 1800);
        } else {
          timeout = setTimeout(type, 85);
        }
      } else {
        setTypedText(current.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % typedItems.length;
          timeout = setTimeout(type, 450);
        } else {
          timeout = setTimeout(type, 35);
        }
      }
    };

    timeout = setTimeout(type, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
      <h1>Jaibir Singh</h1>
      <div className="hero-container">
        <p>
          I'm <span className="typed-text">{typedText}</span>
          <span className="cursor">|</span>
        </p>
      </div>
    </section>
  );
};

export default Hero;
