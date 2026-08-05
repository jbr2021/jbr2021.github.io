import React, { useState } from 'react';

const Contact = ({ profile }) => {
  const personal = profile?.personal || {};
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email || 'contact2jaibir@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section py-5">
      <div className="container">
        <div className="section-header text-center mb-5">
          <div className="badge-pill mb-2">Let's Connect</div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Interested in collaborating on AI engineering, cloud microservices, or technical architecture? Send a message below.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Left Column: Direct Contact Info */}
          <div className="col-lg-5">
            <div className="card border-0 glass-card p-4 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <h3 className="h5 fw-bold mb-4">Contact Details</h3>

                <div className="d-flex flex-column gap-3 mb-4">
                  {/* Email */}
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary">
                    <div className="icon-box bg-primary-subtle text-primary rounded-circle p-2">
                      <i className="bi bi-envelope-fill fs-5"></i>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="x-small text-muted">Email Address</div>
                      <a href={`mailto:${personal.email}`} className="fw-semibold text-body text-decoration-none small text-truncate d-block">
                        {personal.email || "contact2jaibir@gmail.com"}
                      </a>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1 x-small ms-auto"
                      onClick={handleCopyEmail}
                      title="Copy Email to Clipboard"
                    >
                      {copied ? <i className="bi bi-check2 text-success"> Copied</i> : <i className="bi bi-clipboard"> Copy</i>}
                    </button>
                  </div>

                  {/* Location */}
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary">
                    <div className="icon-box bg-cyan-subtle text-cyan rounded-circle p-2">
                      <i className="bi bi-geo-alt-fill fs-5"></i>
                    </div>
                    <div>
                      <div className="x-small text-muted">Location</div>
                      <div className="fw-semibold small">{personal.location || "Ghaziabad, Uttar Pradesh, India"}</div>
                    </div>
                  </div>

                  {/* GitHub & Links */}
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-body-tertiary">
                    <div className="icon-box bg-secondary-subtle text-body rounded-circle p-2">
                      <i className="bi bi-github fs-5"></i>
                    </div>
                    <div>
                      <div className="x-small text-muted">GitHub Repository</div>
                      <a href={personal.social?.github || "https://github.com/jbr2021"} target="_blank" rel="noreferrer" className="fw-semibold small text-decoration-none">
                        github.com/jbr2021
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Pills */}
              <div className="pt-3 border-top d-flex gap-2">
                <a href={personal.social?.github || "https://github.com/jbr2021"} target="_blank" rel="noreferrer" className="btn btn-outline-secondary rounded-circle p-2 flex-grow-1 text-center">
                  <i className="bi bi-github"></i>
                </a>
                <a href={personal.social?.linkedin || "https://linkedin.com/in/jaibirsingh"} target="_blank" rel="noreferrer" className="btn btn-outline-primary rounded-circle p-2 flex-grow-1 text-center">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href={`mailto:${personal.email}`} className="btn btn-outline-info rounded-circle p-2 flex-grow-1 text-center">
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="col-lg-7">
            <div className="card border-0 glass-card p-4 rounded-4 shadow-sm">
              <h3 className="h5 fw-bold mb-4">Send a Message</h3>

              {submitted ? (
                <div className="alert alert-success rounded-3 p-4 text-center my-4 animate-fade-in">
                  <i className="bi bi-check-circle-fill fs-1 text-success d-block mb-2"></i>
                  <h4 className="h6 fw-bold">Message Sent Successfully!</h4>
                  <p className="small text-muted mb-3">Thank you for reaching out. Jaibir will review your message shortly.</p>
                  <button className="btn btn-sm btn-outline-success rounded-pill px-4" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Your Name *</label>
                      <input
                        type="text"
                        className="form-control bg-body-tertiary rounded-3"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Your Email *</label>
                      <input
                        type="email"
                        className="form-control bg-body-tertiary rounded-3"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Subject</label>
                      <input
                        type="text"
                        className="form-control bg-body-tertiary rounded-3"
                        placeholder="AI Systems Collaboration / Inquiries"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Message *</label>
                      <textarea
                        className="form-control bg-body-tertiary rounded-3"
                        rows="4"
                        placeholder="Describe your project, team, or technical requirements..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-12 text-end">
                      <button type="submit" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2">
                        <span>Send Message</span>
                        <i className="bi bi-send-fill"></i>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
