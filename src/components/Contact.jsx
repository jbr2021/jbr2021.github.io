import React, { useState } from 'react';

const Contact = ({ profile }) => {
  const personal = profile?.personal || {};
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email || 'contact2jaibir@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone || '+91-9999XXXXXX');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="contact-section py-5">
      <div className="container">
        {/* Glass Section Header */}
        <div className="text-center mb-5">
          <div className="section-header card border-0 glass-card p-4 rounded-4 shadow-sm mx-auto" style={{ maxWidth: '680px' }}>
            <div className="badge-pill mb-2">Let's Connect</div>
            <h2 className="section-title text-body">Get In Touch</h2>
            <p className="section-subtitle text-body-secondary mb-0">
              Open for collaboration on AI engineering, cloud microservices, and technical architecture.
            </p>
          </div>
        </div>

        {/* Centered Premium Contact Card */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 glass-card p-4 p-md-5 rounded-4 shadow-lg text-start">
              <h3 className="h5 fw-bold mb-4 text-body d-flex align-items-center gap-2">
                <i className="bi bi-chat-dots-fill text-primary"></i>
                Direct Channels &amp; Profiles
              </h3>

              <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
                {/* Email Channel */}
                <div className="col">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary border h-100">
                    <div className="icon-box bg-primary-subtle text-primary rounded-circle p-2.5 flex-shrink-0">
                      <i className="bi bi-envelope-fill fs-5"></i>
                    </div>
                    <div className="flex-grow-1 min-width-0">
                      <div className="x-small text-muted">Email Address</div>
                      <a href={`mailto:${personal.email}`} className="fw-semibold text-body text-decoration-none small text-truncate d-block">
                        {personal.email || "contact2jaibir@gmail.com"}
                      </a>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1 x-small flex-shrink-0 ms-auto"
                      onClick={handleCopyEmail}
                      title="Copy Email to Clipboard"
                    >
                      {copiedEmail ? <i className="bi bi-check2 text-success"> Copied</i> : <i className="bi bi-clipboard"> Copy</i>}
                    </button>
                  </div>
                </div>

                {/* Location Channel */}
                <div className="col">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary border h-100">
                    <div className="icon-box bg-cyan-subtle text-cyan rounded-circle p-2.5 flex-shrink-0">
                      <i className="bi bi-geo-alt-fill fs-5"></i>
                    </div>
                    <div className="flex-grow-1 min-width-0">
                      <div className="x-small text-muted">Location</div>
                      <div className="fw-semibold small text-body text-truncate">{personal.location || "Ghaziabad, Uttar Pradesh, India"}</div>
                    </div>
                  </div>
                </div>

                {/* GitHub Channel */}
                <div className="col">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary border h-100">
                    <div className="icon-box bg-secondary-subtle text-body rounded-circle p-2.5 flex-shrink-0">
                      <i className="bi bi-github fs-5"></i>
                    </div>
                    <div className="flex-grow-1 min-width-0">
                      <div className="x-small text-muted">GitHub Profile</div>
                      <a href={personal.social?.github || "https://github.com/jbr2021"} target="_blank" rel="noreferrer" className="fw-semibold small text-decoration-none text-truncate d-block">
                        github.com/jbr2021
                      </a>
                    </div>
                  </div>
                </div>

                {/* LinkedIn Channel */}
                <div className="col">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary border h-100">
                    <div className="icon-box bg-info-subtle text-info rounded-circle p-2.5 flex-shrink-0">
                      <i className="bi bi-linkedin fs-5"></i>
                    </div>
                    <div className="flex-grow-1 min-width-0">
                      <div className="x-small text-muted">LinkedIn Network</div>
                      <a href={personal.social?.linkedin || "https://linkedin.com/in/jaibirsingh"} target="_blank" rel="noreferrer" className="fw-semibold small text-decoration-none text-truncate d-block">
                        linkedin.com/in/jaibirsingh
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action CTAs */}
              <div className="pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
                <span className="x-small text-body-secondary">
                  <i className="bi bi-clock-history me-1 text-cyan"></i> Response Time: Typically within 24 hours
                </span>

                <div className="d-flex gap-2">
                  <a href={`mailto:${personal.email}`} className="btn btn-primary rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm">
                    <i className="bi bi-envelope-paper-fill"></i>
                    <span>Send Email</span>
                  </a>

                  <a href={personal.social?.github || "https://github.com/jbr2021"} target="_blank" rel="noreferrer" className="btn btn-outline-secondary rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                    <i className="bi bi-github"></i>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
