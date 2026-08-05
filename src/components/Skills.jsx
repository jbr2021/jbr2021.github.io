import React, { useState } from 'react';

const Skills = ({ profile }) => {
  const skillCategories = profile?.skills || [];
  const [selectedCat, setSelectedCat] = useState('All');

  const categoriesList = ['All', ...skillCategories.map(c => c.category)];

  return (
    <section id="skills" className="skills-section py-5">
      <div className="container">
        {/* Glass Section Header */}
        <div className="text-center mb-5">
          <div className="section-header card border-0 glass-card p-4 rounded-4 shadow-sm mx-auto">
            <div className="badge-pill mb-2">Technical Proficiency</div>
            <h2 className="section-title text-body">Skills &amp; Technology Stack</h2>
            <p className="section-subtitle text-body-secondary mb-0">
              Comprehensive domain expertise spanning AI engineering, cloud microservices, and modern enterprise frameworks.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categoriesList.map((cat, idx) => (
            <button
              key={idx}
              className={`btn btn-sm rounded-pill px-3 py-1.5 transition-all ${
                selectedCat === cat ? 'btn-primary shadow-sm' : 'btn-outline-secondary text-body-secondary'
              }`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="row g-4">
          {skillCategories.map((catGroup, cIdx) => {
            if (selectedCat !== 'All' && selectedCat !== catGroup.category) {
              return null;
            }

            return (
              <div key={cIdx} className="col-lg-6">
                <div className="skills-group-card card border-0 glass-card p-4 rounded-4 shadow-sm h-100">
                  <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom">
                    <i className={`bi ${
                      cIdx === 0 ? 'bi-cpu-fill text-cyan' :
                      cIdx === 1 ? 'bi-cloud-check-fill text-primary' :
                      cIdx === 2 ? 'bi-window-stack text-warning' : 'bi-database-fill text-success'
                    } fs-4`}></i>
                    <h3 className="h5 fw-bold mb-0 text-body">{catGroup.category}</h3>
                  </div>

                  <div className="skills-list d-flex flex-column gap-3">
                    {catGroup.items.map((skill, sIdx) => (
                      <div key={sIdx} className="skill-item">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-semibold small text-body">{skill.name}</span>
                          <span className="x-small text-body-secondary font-monospace">{skill.level}%</span>
                        </div>
                        <div className="skill-progress-bar rounded-pill bg-body-tertiary p-0.5 border">
                          <div
                            className="skill-progress-fill rounded-pill bg-gradient-cyan transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
