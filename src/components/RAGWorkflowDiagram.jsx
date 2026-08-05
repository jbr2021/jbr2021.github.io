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
      title: '4. Context & LLM Synthesis',
      icon: 'bi-robot',
      color: 'text-purple',
      badge: 'Azure OpenAI gpt-5',
      desc: 'Prompt synthesis with retrieved chunk citations',
      detail: 'GPT-5 model receives prompt augmented with retrieved document context & strict system guardrails.'
    },
    {
      id: 5,
      title: '5. Structured AI Output',
      icon: 'bi-file-earmark-check-fill',
      color: 'text-success',
      badge: 'Aspose Output',
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
      className="rag-diagram-wrapper card border-0 glass-card p-2.5 p-sm-3 rounded-4 shadow-lg text-start w-100"
      style={{ height: '420px', minHeight: '420px', maxHeight: '420px', overflow: 'hidden' }}
    >
      {/* Reduced Padding Header */}
      <div className="d-flex align-items-center justify-content-between mb-2 pb-1.5 border-bottom px-1" style={{ height: '34px' }}>
        <div className="d-flex align-items-center gap-1.5 min-width-0">
          <span className="pulse-dot flex-shrink-0"></span>
          <span className="fw-bold text-body font-monospace text-uppercase text-truncate" style={{ fontSize: '0.72rem' }}>RAG Execution Flow</span>
        </div>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle flex-shrink-0 text-nowrap" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
          Runtime Sequence
        </span>
      </div>

      {/* Reduced Outer Padding Grid List */}
      <div className="rag-steps-container d-flex flex-column gap-1.5 mb-2" style={{ height: '275px' }}>
        {ragSteps.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <div
              key={step.id}
              className={`rag-step-item px-2.5 py-1.5 rounded-3 border transition-all cursor-pointer ${
                isActive
                  ? 'border-cyan bg-cyan-glow'
                  : 'bg-body-tertiary border-secondary text-body-secondary opacity-85'
              }`}
              style={{ height: '50px', overflow: 'hidden' }}
              onClick={() => setActiveStep(idx)}
            >
              <div className="d-flex align-items-center justify-content-between gap-2 h-100">
                {/* Left Title & Icon */}
                <div className="d-flex align-items-center gap-2 flex-grow-1 min-width-0">
                  <div className={`step-icon-box rounded-2 p-1 bg-body d-flex align-items-center justify-content-center flex-shrink-0 ${step.color}`} style={{ width: '26px', height: '28px' }}>
                    <i className={`bi ${step.icon} x-small`}></i>
                  </div>
                  <div className="flex-grow-1 min-width-0">
                    <div className="fw-bold text-body text-truncate" style={{ fontSize: '0.76rem', lineHeight: '1.2' }}>{step.title}</div>
                    <div className="text-body-secondary text-truncate" style={{ fontSize: '0.68rem', lineHeight: '1.2' }}>{step.desc}</div>
                  </div>
                </div>

                {/* Right Properly Aligned Tag */}
                <span 
                  className={`badge flex-shrink-0 text-nowrap align-self-center ${isActive ? 'bg-primary text-white' : 'bg-body-secondary text-body-secondary'} font-monospace`}
                  style={{ fontSize: '0.68rem', padding: '4px 8px', letterSpacing: '0.02em' }}
                >
                  {step.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Display Area at Bottom */}
      <div className="rag-footer p-2 px-2.5 rounded-3 bg-body-tertiary border text-body-secondary style-leading" style={{ height: '65px', overflow: 'hidden' }}>
        <div className="d-flex justify-content-between align-items-center mb-0.5">
          <strong className="text-body font-monospace text-truncate me-2" style={{ fontSize: '0.74rem' }}>{currentStep.badge}</strong>
          <span className="text-success font-monospace flex-shrink-0 text-nowrap" style={{ fontSize: '0.7rem' }}>
            <i className="bi bi-check-circle-fill me-1"></i> Latency: 120ms
          </span>
        </div>
        <div className="text-truncate style-leading" style={{ fontSize: '0.72rem' }}>
          {currentStep.detail}
        </div>
      </div>
    </div>
  );
};

export default RAGWorkflowDiagram;
