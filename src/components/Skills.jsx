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
  ];

  return (
    <section id="skills">
      <div className="container">
        <div className="section-title">
          <h2>Skills</h2>
        </div>

        <div className="row" style={{ marginTop: '2rem' }}>
          {skills.map((skill, index) => (
            <div key={index} className="col-md-6" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 500 }}>{skill.name}</span>
                <span className="text-muted">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div className="progress" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
