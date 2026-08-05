import React, { useState, useEffect } from 'react';

const RAGWorkflowDiagram = ({ compact = false }) => {
  const [activeStep, setActiveStep] = useState(0);

  const ragSteps = [
    {
      id: 1,
      title: '1. User Prompt Ingestion',
      icon: 'bi-chat-left-quote-fill',
      color: 'text-primary',
      badge: 'FastAPI Input',
      desc: 'User queries document repository via API endpoint',
      detail: 'REST / WebSocket payload ingested into Python FastAPI router with rate-limiting & auth validation.'
    },
    {
      id: 2,
      title: '2. Chunking & Embedding',
      icon: 'bi-scissors',
      color: 'text-info',
      badge: 'text-embedding-3',
      desc: 'Sliding window chunking into 1536-dim vectors',
      detail: 'Overlapping text chunker converts unstructured PDF/Word documents into 1536-dimensional dense embedding vectors.'
    },
    {
      id: 3,
      title: '3. Vector Similarity Search',
      icon: 'bi-database-fill-gear',
      color: 'text-cyan',
      badge: 'Azure AI Search',
      desc: 'Cosine distance top-K similarity retrieval',
      detail: 'Hybrid search querying Azure AI Search & AWS OpenSearch using HNSW indexing (cos_sim >= 0.88).'
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

  return (
    <div className={`rag-diagram-wrapper card border-0 glass-card p-3 p-md-4 rounded-4 shadow-lg text-start ${compact ? 'compact-mode' : ''}`}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <span className="pulse-dot"></span>
          <span className="fw-bold small text-body font-monospace text-uppercase">Enterprise RAG Architecture</span>
        </div>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle x-small">
          Interactive Workflow
        </span>
      </div>

      {/* RAG Animated Flow Cards */}
      <div className="rag-steps-container d-flex flex-column gap-2 mb-3">
        {ragSteps.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <div
              key={step.id}
              className={`rag-step-item p-2.5 rounded-3 border transition-all cursor-pointer ${
                isActive
                  ? 'border-cyan bg-cyan-glow shadow-sm'
                  : 'bg-body-tertiary border-secondary text-body-secondary opacity-85'
              }`}
              onClick={() => setActiveStep(idx)}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2.5">
                  <div className={`step-icon-box rounded-2 p-1.5 bg-body d-flex align-items-center justify-content-center shadow-xs ${step.color}`}>
                    <i className={`bi ${step.icon} fs-6`}></i>
                  </div>
                  <div>
                    <div className="fw-bold x-small text-body mb-0.5">{step.title}</div>
                    <div className="x-small text-body-secondary style-leading">{step.desc}</div>
                  </div>
                </div>

                <span className={`badge ${isActive ? 'bg-primary text-white' : 'bg-body-secondary text-body-secondary'} x-small font-monospace`}>
                  {step.badge}
                </span>
              </div>

              {/* Active Step Details */}
              {isActive && (
                <div className="mt-2 pt-2 border-top border-secondary-subtle x-small text-body-secondary style-leading animate-fade-in">
                  <i className="bi bi-info-circle text-cyan me-1"></i>
                  {step.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Status Bar */}
      <div className="rag-footer p-2 rounded-3 bg-body-tertiary border d-flex align-items-center justify-content-between x-small font-monospace">
        <span className="text-muted">
          Active Node: <strong className="text-cyan">{ragSteps[activeStep].badge}</strong>
        </span>
        <span className="text-success">
          <i className="bi bi-check-circle-fill me-1"></i> Latency: 120ms
        </span>
      </div>
    </div>
  );
};

export default RAGWorkflowDiagram;
