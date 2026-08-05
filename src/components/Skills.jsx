import React from 'react';

const Skills = () => {
  const skills = [
    { name: "Python", level: 90 },
    { name: "Generative AI / LLMs", level: 90 },
    { name: "Azure AI & OpenAI", level: 90 },
    { name: "FastAPI & Backend", level: 88 },
    { name: "RAG & Vector Systems", level: 85 },
    { name: "Multi-Agent Systems", level: 82 },
    { name: "React / Modern Frontend", level: 80 },
    { name: "DevOps & Kubernetes", level: 75 },
    { name: "Angular 12.1.4", level: 90 },
    { name: ".NET Core", level: 90 },
    { name: "ASP.NET MVC", level: 90 },
    { name: "MS SQL Server", level: 90 },
    { name: "MongoDB", level: 90 },
    { name: "HTML / CSS / JavaScript", level: 90 },
  ];

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill">
              <div className="skill-header">
                <span>{skill.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="fill" 
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
