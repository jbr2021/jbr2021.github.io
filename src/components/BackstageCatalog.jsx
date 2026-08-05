import React, { useState } from 'react';

const BackstageCatalog = ({ profile }) => {
  const catalog = profile?.backstageCatalog || {};
  const [activeTab, setActiveTab] = useState('components');
  const [searchTerm, setSearchTerm] = useState('');

  const components = catalog.components || [];
  const tribes = catalog.tribes || [];

  const filteredComponents = components.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tech.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="backstage" className="backstage-section py-5">
      <div className="container">
        {/* Glass Section Header */}
        <div className="text-center mb-5">
          <div className="section-header card border-0 glass-card p-4 rounded-4 shadow-sm mx-auto">
            <div className="badge-pill mb-2">Backstage IDP Platform</div>
            <h2 className="section-title text-body">Enterprise Software Catalog &amp; Service Mesh</h2>
            <p className="section-subtitle text-body-secondary mb-0">
              Demonstrating unified service discovery, cataloging, and squad architecture implemented at ANZ Bank.
            </p>
          </div>
        </div>

        <div className="catalog-card card border-0 glass-card p-4 rounded-4 shadow-sm">
          {/* Header Controls */}
          <div className="row g-3 align-items-center mb-4 pb-3 border-bottom">
            <div className="col-md-6">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'components' ? 'btn-primary' : 'btn-outline-secondary text-body-secondary'}`}
                  onClick={() => setActiveTab('components')}
                >
                  <i className="bi bi-box-seam me-1"></i> Microservice Components ({components.length})
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'tribes' ? 'btn-primary' : 'btn-outline-secondary text-body-secondary'}`}
                  onClick={() => setActiveTab('tribes')}
                >
                  <i className="bi bi-diagram-3 me-1"></i> Tribes &amp; Squad Mesh ({tribes.length})
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-body-tertiary border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-body-tertiary border-start-0 text-body"
                  placeholder="Search catalog components, owners, or tech stack..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Tab 1: Components Grid */}
          {activeTab === 'components' && (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {filteredComponents.map((comp, idx) => (
                <div key={idx} className="col">
                  <div className="component-box card h-100 border p-3 rounded-3 bg-body-tertiary transition-all">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="fw-bold text-primary font-monospace small">{comp.name}</div>
                      <span className="badge bg-success-subtle text-success border border-success-subtle x-small">
                        production
                      </span>
                    </div>

                    <p className="x-small text-body-secondary mb-2 style-leading">{comp.description}</p>

                    <div className="d-flex flex-wrap gap-2 pt-2 border-top x-small text-body-secondary">
                      <div><strong className="text-body">System:</strong> {comp.system}</div>
                      <div><strong className="text-body">Owner:</strong> {comp.owner}</div>
                      <div><strong className="text-body">Tech:</strong> {comp.tech}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Tribes Mesh */}
          {activeTab === 'tribes' && (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {tribes.map((tribe, idx) => (
                <div key={idx} className="col">
                  <div className="tribe-box card h-100 border p-3 rounded-3 bg-body-tertiary">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <i className={`bi ${tribe.type === 'Tribe' ? 'bi-shield-check text-primary' : 'bi-cpu text-cyan'} fs-5`}></i>
                      <h4 className="h6 fw-bold mb-0 text-body">{tribe.name}</h4>
                    </div>
                    <div className="d-flex justify-content-between align-items-center x-small text-body-secondary mt-2 pt-2 border-top">
                      <span>Type: <strong className="text-body">{tribe.type}</strong></span>
                      <span>Parent: <strong className="text-body">{tribe.parent}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BackstageCatalog;
