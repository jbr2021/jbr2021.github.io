import React, { useState } from 'react';
import { getExperienceYearsLabel } from '../utils/experience';

const Experience = ({ profile, onSelectProject }) => {
  const experiences = profile?.experience || [];
  const experienceYears = getExperienceYearsLabel(profile?.personal?.experienceStartDate);
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = ['All', 'AI Agent', 'Agentic AI', 'Generative AI', 'Compliance AI', 'Analytics & AI', 'RAG Portal', 'Developer Portal', 'Cloud & Architecture'];

  return (
    <section id="experience" className="experience-section py-5">
      <div className="container">
        {/* Glass Section Header */}
        <div className="text-center mb-5">
          <div className="section-header card border-0 glass-card p-4 rounded-4 shadow-sm mx-auto">
            <div className="badge-pill mb-2">{experienceYears} Years Track Record</div>
            <h2 className="section-title text-body">Professional Experience</h2>
            <p className="section-subtitle text-body-secondary mb-0">
              Leading high-impact AI engineering, cloud microservices, and enterprise technical architectures.
            </p>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="filter-bar d-flex flex-wrap justify-content-center gap-2 mb-5">
          {filterOptions.map((filter, i) => (
            <button
              key={i}
              className={`btn btn-sm rounded-pill px-3 py-1.5 transition-all ${
                activeFilter === filter
                  ? 'btn-primary shadow-sm'
                  : 'btn-outline-secondary text-body-secondary'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Timeline Container */}
        <div className="timeline-container position-relative">
          <div className="timeline-line position-absolute start-0 top-0 bottom-0 ms-md-4"></div>

          {experiences.map((exp, expIdx) => {
            // Filter projects inside experience
            const filteredProjects = exp.projects.filter((p) => {
              if (activeFilter === 'All') return true;
              return p.badge === activeFilter || p.technologies?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
            });

            if (activeFilter !== 'All' && filteredProjects.length === 0 && exp.projects.length > 0) {
              return null;
            }

            return (
              <div key={expIdx} className="timeline-item mb-5 position-relative ps-4 ps-md-5">
                {/* Timeline Dot */}
                <div className="timeline-dot position-absolute start-0 top-0 rounded-circle bg-primary border border-4 border-body shadow-sm"></div>

                {/* Role Header Card */}
                <div className="card border-0 glass-card p-4 rounded-4 shadow-sm mb-4">
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                    <div>
                      <h3 className="h4 fw-extrabold mb-1 text-primary">{exp.company}</h3>
                      <div className="h6 fw-bold text-body mb-1">{exp.role}</div>
                    </div>
                    <div className="text-end">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1.5 fw-semibold mb-1 d-inline-block">
                        {exp.period}
                      </span>
                      <div className="x-small text-muted"><i className="bi bi-geo-alt-fill me-1"></i>{exp.location}</div>
                    </div>
                  </div>

                  <p className="text-body-secondary small mb-0 style-leading">{exp.description}</p>
                </div>

                {/* Projects Grid for this role */}
                {filteredProjects.length > 0 && (
                  <div className="projects-grid row row-cols-1 row-cols-lg-2 g-4">
                    {filteredProjects.map((project, pIdx) => (
                      <div key={pIdx} className="col">
                        <div 
                          className="project-card card h-100 border-0 glass-card p-4 rounded-4 shadow-sm transition-all hover-lift cursor-pointer"
                          onClick={() => onSelectProject && onSelectProject(project, exp.company)}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h4 className="h6 fw-bold text-body mb-0">{project.title}</h4>
                            {project.badge && (
                              <span className="badge bg-info-subtle text-info border border-info-subtle rounded-pill x-small">
                                {project.badge}
                              </span>
                            )}
                          </div>

                          {project.client && (
                            <div className="x-small fw-semibold text-primary mb-2">
                              <i className="bi bi-building me-1"></i> Client: {project.client}
                            </div>
                          )}

                          <p className="small text-body-secondary mb-3 flex-grow-1 style-leading">
                            {project.summary}
                          </p>

                          {/* Tech Stack Pills */}
                          <div className="tech-stack-wrapper d-flex flex-wrap gap-1.5 pt-2 border-top">
                            {project.technologies.slice(0, 5).map((tech, tIdx) => (
                              <span key={tIdx} className="badge bg-body-tertiary text-body-secondary border rounded-2 x-small fw-normal">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 5 && (
                              <span className="badge bg-body-tertiary text-muted border rounded-2 x-small">
                                +{project.technologies.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
