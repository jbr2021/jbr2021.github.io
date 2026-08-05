import React from 'react';

const ProjectModal = ({ project, company, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal fade show d-block bg-dark bg-opacity-75 backdrop-blur z-index-modal" tabIndex="-1" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content glass-card border-0 shadow-2xl rounded-4 overflow-hidden">
          {/* Header */}
          <div className="modal-header border-bottom p-4 d-flex justify-content-between align-items-start">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill small fw-semibold">
                  {project.badge || 'Project Architecture'}
                </span>
                {project.client && (
                  <span className="badge bg-body-tertiary text-body-secondary border rounded-pill x-small">
                    <i className="bi bi-building me-1"></i> {project.client}
                  </span>
                )}
              </div>
              <h3 className="h4 fw-extrabold mb-0">{project.title}</h3>
              <div className="small text-muted mt-1">{company}</div>
            </div>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4">
            <h4 className="h6 fw-bold text-primary mb-2">Project Overview</h4>
            <p className="body-text text-body-secondary style-leading mb-4">
              {project.summary}
            </p>

            <h4 className="h6 fw-bold text-primary mb-2">Technology &amp; Architectural Stack</h4>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="badge bg-body-tertiary text-body border rounded-3 px-3 py-2 small fw-semibold">
                  <i className="bi bi-cpu me-1.5 text-cyan"></i>
                  {tech}
                </span>
              ))}
            </div>

            <div className="p-3 rounded-3 bg-body-tertiary border">
              <div className="fw-bold small text-body mb-1">
                <i className="bi bi-shield-check text-success me-1"></i> Architecture Highlights &amp; Impact
              </div>
              <ul className="x-small text-muted mb-0 ps-3 style-leading">
                <li>Production-grade enterprise integration designed for high reliability &amp; security.</li>
                <li>Async pipeline orchestration with cloud serverless &amp; vector search indices.</li>
                <li>Modular codebase structured for seamless scale &amp; compliance maintenance.</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer border-top p-3 bg-body-tertiary d-flex justify-content-between">
            <span className="x-small text-muted font-monospace">ID: {project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-spec</span>
            <button className="btn btn-sm btn-primary rounded-pill px-4" onClick={onClose}>
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
