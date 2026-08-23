import React from 'react';

const EducationCertifications = ({ profile }) => {
  const education = profile?.education || [];

  const getItemIcon = (item, idx) => {
    if (item.icon) return item.icon;
    const inst = (item.institution || '').toLowerCase();
    const deg = (item.degree || '').toLowerCase();
    if (inst.includes('mongodb') || deg.includes('mongodb')) {
      return 'bi-database-fill-check text-success';
    }
    if (inst.includes('google') || deg.includes('cloud developer')) {
      return 'bi-patch-check-fill text-success';
    }
    if (item.badge === 'Certified') {
      return 'bi-patch-check-fill text-success';
    }
    return 'bi-mortarboard-fill text-primary';
  };

  return (
    <section id="education" className="education-section py-5">
      <div className="container">
        {/* Glass Section Header */}
        <div className="text-center mb-5">
          <div className="section-header card border-0 glass-card p-4 rounded-4 shadow-sm mx-auto">
            <div className="badge-pill mb-2">Academic &amp; Professional Credentials</div>
            <h2 className="section-title text-body">Education &amp; Certifications</h2>
            <p className="section-subtitle text-body-secondary mb-0">
              Formal degrees and globally recognized cloud &amp; database developer certifications.
            </p>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
          {education.map((item, idx) => {
            const iconClass = getItemIcon(item, idx);
            return (
              <div key={idx} className="col">
                <div className="edu-card card h-100 border-0 glass-card p-4 rounded-4 shadow-sm transition-all hover-lift">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="icon-badge rounded-circle bg-primary-subtle text-primary p-2.5 d-inline-flex align-items-center justify-content-center">
                      <i className={`bi ${iconClass} fs-4`}></i>
                    </div>
                    <span className="badge bg-body-tertiary text-body-secondary border rounded-pill x-small fw-semibold">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="h6 fw-extrabold mb-1 text-body">{item.degree}</h3>
                  <div className="small fw-semibold text-primary mb-2">{item.institution}</div>

                  {item.credentialId && (
                    <div className="x-small text-muted font-monospace mb-3">
                      <i className="bi bi-patch-check me-1 text-success"></i> Certification ID: {item.credentialId}
                    </div>
                  )}

                  <p className="x-small text-body-secondary mb-0 style-leading flex-grow-1">
                    {item.description}
                  </p>

                  {item.badge && (
                    <div className="mt-3 pt-2 border-top">
                      <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill x-small">
                        <i className="bi bi-shield-check me-1"></i> {item.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
