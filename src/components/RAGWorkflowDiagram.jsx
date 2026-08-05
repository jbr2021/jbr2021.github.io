import React, { useState, useEffect } from 'react';

const RAGWorkflowDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);

  const ragSteps = [
    {
      id: 1,
      title: '1. User Prompt Ingestion',
      icon: 'bi-chat-left-quote-fill',
      color: 'text-primary',
      badge: 'FastAPI Input',
      desc: 'User queries document repository via API endpoint',
      detail: 'REST payload ingested into Python FastAPI router with rate-limiting & auth validation.'
    },
    {
      id: 2,
      title: '2. Chunking & Embedding',
      icon: 'bi-scissors',
      color: 'text-info',
      badge: 'text-embedding-3',
      desc: 'Sliding window chunking into 1536-dim vectors',
      detail: 'Overlapping text chunker converts PDF/Word files into 1536-dimensional dense embedding vectors.'
    },
    {
      id: 3,
      title: '3. Vector Similarity Search',
      icon: 'bi-database-fill-gear',
      color: 'text-cyan',
      badge: 'Azure AI Search',
      desc: 'Cosine distance top-K similarity retrieval',
      detail: 'Hybrid search querying Azure AI Search & OpenSearch using HNSW indexing (cos_sim >= 0.88).'
    },
    {
      id: 4,
      title: '4. Augmented Context & LLM',
      icon: 'bi-robot',
      color: 'text-purple',
      badge: 'Azure OpenAI gpt-4o',
      desc: 'Prompt synthesis with retrieved chunk citations',
      detail: 'GPT-4o model receives prompt augmented with retrieved document context & strict system guardrails.'
    },
    {
      id: 5,
      title: '5. Structured AI Generation',
      icon: 'bi-file-earmark-check-fill',
      color: 'text-success',
      badge: 'Aspose & JSON Output',
      desc: 'Structured report generation & TOC compilation',
      detail: 'Compiles response into structured 15-section Word/PDF documents with page citations.'
    }
  ];

  // Auto-advance step animation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % ragSteps.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const currentStep = ragSteps[activeStep];

  return (
    <div 
      className="rag-diagram-wrapper card border-0 glass-card p-3 rounded-4 shadow-lg text-start"
      style={{ height: '420px', minHeight: '420px', maxHeight: '420px', overflow: 'hidden' }}
    >
      {/* Fixed Header */}
      <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom" style={{ height: '36px' }}>
        <div className="d-flex align-items-center gap-2">
          <span className="pulse-dot"></span>
          <span className="fw-bold x-small text-body font-monospace text-uppercase">RAG Execution Flow</span>
        </div>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle x-small">
          Live Runtime Sequence
        </span>
      </div>

      {/* Fixed Steps List */}
      <div className="rag-steps-container d-flex flex-column gap-1.5 mb-2" style={{ height: '275px' }}>
        {ragSteps.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <div
              key={step.id}
              className={`rag-step-item p-2 rounded-3 border transition-all cursor-pointer ${
                isActive
                  ? 'border-cyan bg-cyan-glow'
                  : 'bg-body-tertiary border-secondary text-body-secondary opacity-80'
              }`}
              style={{ height: '50px', overflow: 'hidden' }}
              onClick={() => setActiveStep(idx)}
            >
              <div className="d-flex align-items-center justify-content-between h-100">
                <div className="d-flex align-items-center gap-2">
                  <div className={`step-icon-box rounded-2 p-1 bg-body d-flex align-items-center justify-content-center ${step.color}`} style={{ width: '28px', height: '28px' }}>
                    <i className={`bi ${step.icon} x-small`}></i>
                  </div>
                  <div>
                    <div className="fw-bold x-small text-body text-truncate" style={{ maxWidth: '200px' }}>{step.title}</div>
                    <div className="x-small text-body-secondary text-truncate" style={{ maxWidth: '200px', fontSize: '0.72rem' }}>{step.desc}</div>
                  </div>
                </div>

                <span className={`badge ${isActive ? 'bg-primary text-white' : 'bg-body-secondary text-body-secondary'} x-small font-monospace`}>
                  {step.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fixed Detail Display Area at Bottom */}
      <div className="rag-footer p-2 rounded-3 bg-body-tertiary border text-body-secondary style-leading" style={{ height: '65px', overflow: 'hidden' }}>
        <div className="d-flex justify-content-between align-items-center mb-0.5">
          <strong className="x-small text-body font-monospace">{currentStep.badge}</strong>
          <span className="x-small text-success font-monospace">
            <i className="bi bi-check-circle-fill me-1"></i> Latency: 120ms
          </span>
        </div>
        <div className="x-small text-truncate style-leading" style={{ fontSize: '0.75rem' }}>
          {currentStep.detail}
        </div>
      </div>
    </div>
  );
};

export default RAGWorkflowDiagram;
