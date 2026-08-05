import React, { useState, useEffect } from 'react';

const RAGResourceSetupDiagram = () => {
  const [activeResource, setActiveResource] = useState(0);

  const resources = [
    {
      id: 1,
      title: 'API Gateway & FastAPI',
      type: 'Ingress & Microservice',
      icon: 'bi-router-fill',
      color: 'text-primary',
      status: 'Provisioned',
      tech: 'Python FastAPI • Azure API Mgmt',
      desc: 'Secured entry point handling OAuth2, rate limits & payload routing'
    },
    {
      id: 2,
      title: 'Blob Storage & Databricks',
      type: 'Storage & ELT Pipeline',
      icon: 'bi-folder-symlink-fill',
      color: 'text-warning',
      status: 'Active Storage',
      tech: 'Azure Blob • PySpark Databricks',
      desc: 'Raw PDF/Word storage & distributed document extraction'
    },
    {
      id: 3,
      title: 'AI Search & OpenSearch',
      type: 'Vector Index Store',
      icon: 'bi-database-fill-check',
      color: 'text-cyan',
      status: 'HNSW Index Ready',
      tech: 'Azure Search Index • HNSW Vector',
      desc: '1536-dim vector store & hybrid semantic keyword index'
    },
    {
      id: 4,
      title: 'Azure OpenAI (gpt-5)',
      type: 'AI Model Deployment',
      icon: 'bi-cpu-fill',
      color: 'text-purple',
      status: 'Endpoints Live',
      tech: 'GPT-5 Managed Resource • VNet',
      desc: 'Enterprise deployment in private VNet with zero data retention'
    },
    {
      id: 5,
      title: 'Service Bus & Functions',
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
      className="rag-resource-card card border-0 glass-card p-2.5 p-sm-3 rounded-4 shadow-lg text-start w-100"
      style={{ height: '420px', minHeight: '420px', maxHeight: '420px', overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-2 pb-1.5 border-bottom px-1" style={{ height: '34px' }}>
        <div className="d-flex align-items-center gap-2 min-width-0">
          <span className="pulse-dot flex-shrink-0 me-2"></span>
          <span className="fw-bold text-body font-monospace text-uppercase text-truncate" style={{ fontSize: '0.72rem' }}>Azure RAG Topology</span>
        </div>
        <span className="badge bg-success-subtle text-success border border-success-subtle flex-shrink-0 text-nowrap me-1" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
          <i className="bi bi-shield-check me-1"></i> Cloud Setup
        </span>
      </div>

      {/* Grid List of Resources */}
      <div className="resources-list d-flex flex-column gap-1.5 mb-2" style={{ height: '275px' }}>
        {resources.map((res, idx) => {
          const isActive = idx === activeResource;
          return (
            <div
              key={res.id}
              className={`resource-item px-2.5 py-1.5 rounded-3 border transition-all cursor-pointer ${
                isActive
                  ? 'border-cyan bg-cyan-glow'
                  : 'bg-body-tertiary border-secondary text-body-secondary opacity-85'
              }`}
              style={{ height: '50px', overflow: 'hidden' }}
              onClick={() => setActiveResource(idx)}
            >
              <div className="d-flex align-items-center justify-content-between gap-2 h-100 pe-1">
                {/* Left Title & Icon */}
                <div className="d-flex align-items-center gap-2 flex-grow-1 min-width-0 me-2">
                  <div className={`icon-box rounded-2 p-1 bg-body d-flex align-items-center justify-content-center flex-shrink-0 me-1 ${res.color}`} style={{ width: '26px', height: '28px' }}>
                    <i className={`bi ${res.icon} x-small`}></i>
                  </div>
                  <div className="flex-grow-1 min-width-0">
                    <div className="fw-bold text-body text-truncate" style={{ fontSize: '0.76rem', lineHeight: '1.2' }}>{res.title}</div>
                    <div className="text-body-secondary text-truncate" style={{ fontSize: '0.68rem', lineHeight: '1.2' }}>{res.type}</div>
                  </div>
                </div>

                {/* Right Tag with Margin From Border */}
                <span 
                  className={`badge flex-shrink-0 text-nowrap align-self-center me-1 ${isActive ? 'bg-primary text-white' : 'bg-body-secondary text-body-secondary'} font-monospace`}
                  style={{ fontSize: '0.68rem', padding: '4px 8px', letterSpacing: '0.02em' }}
                >
                  {res.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Display Area at Bottom */}
      <div className="resource-detail-box p-2 px-2.5 rounded-3 bg-body-tertiary border text-body-secondary style-leading" style={{ height: '65px', overflow: 'hidden' }}>
        <div className="d-flex justify-content-between align-items-center mb-0.5">
          <strong className="text-body font-monospace text-truncate me-2" style={{ fontSize: '0.74rem' }}>{current.tech}</strong>
          <span className="text-cyan font-monospace flex-shrink-0 text-nowrap me-1" style={{ fontSize: '0.7rem' }}>Node 0{current.id}/05</span>
        </div>
        <div className="text-truncate style-leading pe-2" style={{ fontSize: '0.72rem' }}>
          {current.desc}
        </div>
      </div>
    </div>
  );
};

export default RAGResourceSetupDiagram;
