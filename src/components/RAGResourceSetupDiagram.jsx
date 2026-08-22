import React, { useState, useEffect } from 'react';

const RAGResourceSetupDiagram = () => {
  const [activeResource, setActiveResource] = useState(0);

  const resources = [
    {
      id: 1,
      title: 'API Gateway & FastAPI',
      type: 'Agent Request Ingress',
      icon: 'bi-router-fill',
      color: 'text-primary',
      status: 'Requests Secured',
      tech: 'Python FastAPI • Azure API Mgmt',
      desc: 'Secured entry point that authenticates requests and passes agent context into the workflow.'
    },
    {
      id: 2,
      title: 'Blob Storage & Documents',
      type: 'Grounding Knowledge Source',
      icon: 'bi-folder-symlink-fill',
      color: 'text-warning',
      status: 'Content Synced',
      tech: 'Azure Blob • Document Intelligence',
      desc: 'Stores source documents and extracts content used to ground agent responses.'
    },
    {
      id: 3,
      title: 'Azure AI Search',
      type: 'Agent Retrieval Tool',
      icon: 'bi-database-fill-check',
      color: 'text-cyan',
      status: 'Hybrid Search Ready',
      tech: 'Azure AI Search • Vector + Keyword',
      desc: 'Provides hybrid semantic retrieval that the agent invokes when evidence is needed.'
    },
    {
      id: 4,
      title: 'LangGraph AI Agent',
      type: 'Stateful Orchestrator',
      icon: 'bi-diagram-3-fill',
      color: 'text-purple',
      status: 'Agent Loop Active',
      tech: 'LangGraph • StateGraph • Python',
      desc: 'Routes intent, manages state, selects tools, and coordinates the Agentic AI RAG loop.'
    },
    {
      id: 5,
      title: 'Azure OpenAI & Actions',
      type: 'Reasoning & Response Layer',
      icon: 'bi-cpu-fill',
      color: 'text-success',
      status: 'Grounded Output',
      tech: 'Azure OpenAI • Tool Calls',
      desc: 'Reasons over retrieved evidence, invokes approved actions, and returns a cited response.'
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
      style={{ height: '425px', minHeight: '425px', maxHeight: '425px', overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-2 pb-1.5 border-bottom px-1" style={{ height: '34px' }}>
        <div className="d-flex align-items-center gap-2 min-width-0">
          <span className="pulse-dot flex-shrink-0 me-1"></span>
          <span className="fw-bold text-body font-monospace text-uppercase text-truncate" style={{ fontSize: '0.72rem' }}>Agentic AI RAG Topology</span>
        </div>
        <span className="badge bg-success-subtle text-success border border-success-subtle flex-shrink-0 text-nowrap" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
          <i className="bi bi-diagram-3-fill me-1"></i> Agentic RAG
        </span>
      </div>

      {/* Grid List with 6px vertical space between items */}
      <div className="resources-list d-flex flex-column mb-2 px-1" style={{ height: '280px' }}>
        {resources.map((res, idx) => {
          const isActive = idx === activeResource;
          return (
            <div
              key={res.id}
              className={`resource-item px-2.5 py-1 rounded-3 border transition-all cursor-pointer ${
                isActive
                  ? 'border-cyan bg-cyan-glow'
                  : 'bg-body-tertiary border-secondary text-body-secondary opacity-85'
              }`}
              style={{ height: '48px', marginBottom: '6px', overflow: 'hidden' }}
              onClick={() => setActiveResource(idx)}
            >
              <div className="row align-items-center flex-nowrap g-2 h-100 px-1">
                {/* Left Title & Icon Column */}
                <div className="col min-width-0">
                  <div className="d-flex align-items-center gap-2">
                    <div className={`icon-box rounded-2 p-1 bg-body d-flex align-items-center justify-content-center flex-shrink-0 ${res.color}`} style={{ width: '26px', height: '26px' }}>
                      <i className={`bi ${res.icon} x-small`}></i>
                    </div>
                    <div className="min-width-0">
                      <div className="fw-bold text-body text-truncate" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>{res.title}</div>
                      <div className="text-body-secondary text-truncate" style={{ fontSize: '0.67rem', lineHeight: '1.2' }}>{res.type}</div>
                    </div>
                  </div>
                </div>

                {/* Right Fixed-Width Single-Line Badge Column */}
                <div className="col-auto text-end ps-0 flex-shrink-0">
                  <span 
                    className={`badge font-monospace text-nowrap d-inline-block text-center ${
                      isActive ? 'bg-primary text-white shadow-sm' : 'bg-body-secondary text-body-secondary'
                    }`}
                    style={{ width: '120px', fontSize: '0.66rem', padding: '4px 4px', letterSpacing: '0.01em' }}
                  >
                    {res.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Display Area at Bottom */}
      <div className="resource-detail-box p-2 px-2.5 rounded-3 bg-body-tertiary border text-body-secondary style-leading" style={{ height: '65px', overflow: 'hidden' }}>
        <div className="d-flex justify-content-between align-items-center mb-0.5">
          <strong className="text-body font-monospace text-truncate me-2" style={{ fontSize: '0.74rem' }}>{current.tech}</strong>
          <span className="text-cyan font-monospace flex-shrink-0 text-nowrap" style={{ fontSize: '0.7rem' }}>Node 0{current.id}/05</span>
        </div>
        <div className="text-truncate style-leading" style={{ fontSize: '0.72rem' }}>
          {current.desc}
        </div>
      </div>
    </div>
  );
};

export default RAGResourceSetupDiagram;
