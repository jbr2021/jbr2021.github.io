import React, { useState } from 'react';
import RAGWorkflowDiagram from './RAGWorkflowDiagram';

const About = ({ profile }) => {
  const personal = profile?.personal || {};
  const summary = profile?.summary || '';
  const highlights = profile?.highlights || [];
  const [photoModal, setPhotoModal] = useState(false);

  const usePhoto = personal.usePersonalPhoto !== false;

  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        {/* Glass Section Header */}
        <div className="text-center mb-5">
          <div className="section-header card border-0 glass-card p-4 rounded-4 shadow-sm mx-auto">
            <div className="badge-pill mb-2">Architect Background</div>
            <h2 className="section-title text-body">About Me</h2>
            <p className="section-subtitle text-body-secondary mb-0">
              Bridging complex cloud infrastructure with cutting-edge artificial intelligence and enterprise engineering.
            </p>
          </div>
        </div>

        {/* Main Grid: Bio & Personal Details */}
        <div className="row g-4 align-items-center mb-5">
          {/* Photo or RAG Workflow Diagram */}
          <div className="col-lg-4 text-center">
            {usePhoto ? (
              <div className="about-photo-wrapper position-relative mx-auto" style={{ maxWidth: '300px' }}>
                <div 
                  className="photo-card card border-0 shadow-lg rounded-4 overflow-hidden cursor-pointer"
                  onClick={() => setPhotoModal(true)}
                  title="Click to expand photograph"
                >
                  <img 
                    src={personal.photos?.featured || personal.photos?.avatar || "/assets/img/Jaibir-Singh-03.jpg"} 
                    alt={personal.name || "Jaibir Singh"}
                    className="img-fluid w-100 about-img transition-all"
                    loading="lazy"
                  />
                  <div className="photo-expand-hint position-absolute top-0 end-0 m-2 badge bg-dark bg-opacity-75 text-white">
                    <i className="bi bi-arrows-angle-expand me-1"></i> Expand
                  </div>
                </div>
              </div>
            ) : (
              <div className="about-diagram-wrapper mx-auto" style={{ maxWidth: '360px' }}>
                <RAGWorkflowDiagram compact={true} />
              </div>
            )}
          </div>

          {/* Bio text */}
          <div className="col-lg-8">
            <div className="bio-content card border-0 glass-card p-4 p-md-5 rounded-4 shadow-sm">
              <h3 className="h4 fw-bold mb-3 d-flex align-items-center gap-2 text-body">
                <i className="bi bi-person-badge text-primary"></i>
                Technical Architect &amp; AI Engineering Specialist
              </h3>

              <p className="bio-text lead-sm text-body-secondary mb-4 style-leading">
                {summary}
              </p>

              {/* Key Personal Details Grid */}
              <div className="details-grid row row-cols-1 row-cols-md-2 g-3 pt-3 border-top">
                <div className="col d-flex align-items-center gap-2">
                  <i className="bi bi-briefcase text-primary fs-5"></i>
                  <div>
                    <span className="text-muted small d-block">Profession</span>
                    <strong className="small text-body">{personal.title || "Technical Architect"}</strong>
                  </div>
                </div>

                <div className="col d-flex align-items-center gap-2">
                  <i className="bi bi-globe text-primary fs-5"></i>
                  <div>
                    <span className="text-muted small d-block">Website</span>
                    <a href={`https://${personal.website}`} target="_blank" rel="noreferrer" className="small fw-bold text-decoration-none">
                      {personal.website || "jbr2021.github.io"}
                    </a>
                  </div>
                </div>

                <div className="col d-flex align-items-center gap-2">
                  <i className="bi bi-envelope text-primary fs-5"></i>
                  <div>
                    <span className="text-muted small d-block">Email</span>
                    <a href={`mailto:${personal.email}`} className="small fw-bold text-decoration-none">
                      {personal.email || "contact2jaibir@gmail.com"}
                    </a>
                  </div>
                </div>

                <div className="col d-flex align-items-center gap-2">
                  <i className="bi bi-telephone text-primary fs-5"></i>
                  <div>
                    <span className="text-muted small d-block">Phone</span>
                    <strong className="small text-body">{personal.phone || "+91-9999XXXXXX"}</strong>
                  </div>
                </div>

                <div className="col d-flex align-items-center gap-2">
                  <i className="bi bi-geo-alt text-primary fs-5"></i>
                  <div>
                    <span className="text-muted small d-block">City / Location</span>
                    <strong className="small text-body">{personal.location || "Ghaziabad, Uttar Pradesh, India"}</strong>
                  </div>
                </div>

                <div className="col d-flex align-items-center gap-2">
                  <i className="bi bi-calendar-event text-primary fs-5"></i>
                  <div>
                    <span className="text-muted small d-block">Birthday / Age</span>
                    <strong className="small text-body">{personal.birthday} ({personal.age} years)</strong>
                  </div>
                </div>

                <div className="col d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle text-primary fs-5"></i>
                  <div>
                    <span className="text-muted small d-block">Freelance</span>
                    <strong className="small text-body">{personal.freelance || "Not Available"}</strong>
                  </div>
                </div>

                <div className="col d-flex align-items-center gap-2">
                  <i className="bi bi-award text-primary fs-5"></i>
                  <div>
                    <span className="text-muted small d-block">Certification</span>
                    <strong className="small text-body">Google Cloud Professional Cloud Developer</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Cards */}
        {highlights.length > 0 && (
          <div className="highlights-section pt-3">
            <h3 className="h5 fw-bold mb-4 text-center text-body">Core Architectural Pillars</h3>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="col">
                  <div className="highlight-card card h-100 border-0 glass-card p-4 rounded-4 transition-all">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="icon-box rounded-3 bg-primary-subtle text-primary p-2.5">
                        <i className={`bi ${
                          idx === 0 ? 'bi-cpu-fill' :
                          idx === 1 ? 'bi-search' :
                          idx === 2 ? 'bi-robot' :
                          idx === 3 ? 'bi-code-slash' : 'bi-kanban'
                        } fs-4`}></i>
                      </div>
                      <h4 className="h6 fw-bold mb-0 text-body">{item.title}</h4>
                    </div>
                    <p className="small text-body-secondary mb-0 style-leading">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Photo Lightbox Modal */}
      {photoModal && usePhoto && (
        <div className="modal fade show d-block bg-dark bg-opacity-75 backdrop-blur" tabIndex="-1" onClick={() => setPhotoModal(false)}>
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-dark text-white border-secondary rounded-4 overflow-hidden">
              <div className="modal-header border-secondary py-2">
                <h5 className="modal-title h6 fw-bold">Jaibir Singh — Technical Architect</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setPhotoModal(false)}></button>
              </div>
              <div className="modal-body p-0 text-center">
                <img 
                  src={personal.photos?.featured || personal.photos?.avatar || "/assets/img/Jaibir-Singh-03.jpg"} 
                  alt="Jaibir Singh"
                  className="img-fluid max-vh-80 object-fit-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
