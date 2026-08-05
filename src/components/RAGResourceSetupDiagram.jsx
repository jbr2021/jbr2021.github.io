import React, { useState, useEffect } from 'react';

const RAGResourceSetupDiagram = () => {
  const [activeResource, setActiveResource] = useState(0);

  const resources = [
    {
      id: 1,
      title: 'Azure API Gateway & FastAPI',
      type: 'Ingress & Microservice',
      icon: 'bi-router-fill',
      color: 'text-primary',
      status: 'Provisioned',
      tech: 'Python FastAPI • Azure API Mgmt',
      desc: 'Secured entry point handling OAuth2, rate limits & payload routing'
    },
    {
      id: 2,
      title: 'Azure Blob Storage & Databricks',
      type: 'Storage & ELT Pipeline',
      icon: 'bi-folder-symlink-fill',
      color: 'text-warning',
      status: 'Active Storage',
      tech: 'Azure Blob • PySpark Databricks',
      desc: 'Raw PDF/Word storage & distributed document extraction'
    },
    {
      id: 3,
      title: 'Azure AI Search & OpenSearch',
      type: 'Vector Index Store',
      icon: 'bi-database-fill-check',
      color: 'text-cyan',
      status: 'HNSW Index Ready',
      tech: 'Azure Search Index • HNSW Vector',
      desc: '1536-dim vector store & hybrid semantic keyword index'
    },
    {
      id: 4,
      title: 'Azure OpenAI Service (gpt-5)',
      type: 'AI Model Deployment',
      icon: 'bi-cpu-fill',
      color: 'text-purple',
      status: 'Endpoints Live',
      tech: 'GPT-5 Managed Resource • VNet',
      desc: 'Enterprise deployment in private VNet with zero data retention'
    },
    {
      id: 5,
      title: 'Azure Service Bus & Functions',
      type: 'Async Queue & Serverless',
      icon: 'bi-lightning-charge-fill',
      color: 'text-success',
      status: 'Timer Triggered',
      tech: 'Azure Functions • C# / Python',
      desc: 'Background queue processing & automated report compilation'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveResource((prev) => (prev + 1) % resources.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const current = resources[activeResource];

  return (
    <div 
      className="rag-resource-card card border-0 glass-card p-3.5 p-md-4 rounded-4 shadow-lg text-start"
      style={{ height: '420px', minHeight: '420px', maxHeight: '420px', overflow: 'hidden' }}
    >
      {/* Fixed Header */}
      <div className="d-flex align-items-center justify-content-between mb-2.5 pb-2 border-bottom px-1" style={{ height: '36px' }}>
        <div className="d-flex align-items-center gap-2">
          <span className="pulse-dot"></span>
          <span className="fw-bold x-small text-body font-monospace text-uppercase">Azure RAG Cloud Topology</span>
        </div>
        <span className="badge bg-success-subtle text-success border border-success-subtle x-small flex-shrink-0">
          <i className="bi bi-shield-check me-1"></i> Infrastructure
        </span>
      </div>

      {/* Fixed Grid List of Resources */}
      <div className="resources-list d-flex flex-column gap-1.5 mb-2.5 px-1" style={{ height: '270px' }}>
        {resources.map((res, idx) => {
          const isActive = idx === activeResource;
          return (
            <div
              key={res.id}
              className={`resource-item px-3 py-2 rounded-3 border transition-all cursor-pointer ${
                isActive
                  ? 'border-cyan bg-cyan-glow'
                  : 'bg-body-tertiary border-secondary text-body-secondary opacity-80'
              }`}
              style={{ height: '50px', overflow: 'hidden' }}
              onClick={() => setActiveResource(idx)}
            >
              <div className="d-flex align-items-center justify-content-between gap-2 h-100">
                <div className="d-flex align-items-center gap-2.5 flex-grow-1 min-width-0 me-2">
                  <div className={`icon-box rounded-2 p-1 bg-body d-flex align-items-center justify-content-center flex-shrink-0 ${res.color}`} style={{ width: '28px', height: '28px' }}>
                    <i className={`bi ${res.icon} x-small`}></i>
                  </div>
                  <div className="flex-grow-1 min-width-0">
                    <div className="fw-bold x-small text-body text-truncate">{res.title}</div>
                    <div className="x-small text-body-secondary text-truncate" style={{ fontSize: '0.72rem' }}>{res.type}</div>
                  </div>
                </div>

                <span className={`badge ${isActive ? 'bg-primary text-white' : 'bg-body-secondary text-body-secondary'} x-small font-monospace flex-shrink-0 ms-auto`}>
                  {res.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fixed Detail Display Area at Bottom */}
      <div className="resource-detail-box p-2.5 px-3 rounded-3 bg-body-tertiary border text-body-secondary style-leading" style={{ height: '65px', overflow: 'hidden' }}>
        <div className="d-flex justify-content-between align-items-center mb-0.5">
          <strong className="x-small text-body font-monospace text-truncate me-2">{current.tech}</strong>
          <span className="x-small text-cyan font-monospace flex-shrink-0">0{current.id}/05</span>
        </div>
        <div className="x-small text-truncate style-leading pe-1" style={{ fontSize: '0.75rem' }}>
          {current.desc}
        </div>
      </div>
    </div>
  );
};

export default RAGResourceSetupDiagram;
