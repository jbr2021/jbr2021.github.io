import React, { useState, useEffect } from 'react';

const RAGWorkflowDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);

  const ragSteps = [
    {
      id: 1,
      title: '1. Agent Request Intake',
      icon: 'bi-chat-left-quote-fill',
      color: 'text-primary',
      badge: 'FastAPI Input',
      desc: 'Capturing the user query, identity, and conversation context',
      detail: 'FastAPI validates the request and provides the AI Agent with the query and approved session context.'
    },
    {
      id: 2,
      title: '2. Agent Intent Routing',
      icon: 'bi-diagram-3-fill',
      color: 'text-info',
      badge: 'LangGraph State',
      desc: 'Selecting the next tool or retrieval path through agent state',
      detail: 'A LangGraph/StateGraph node evaluates intent, maintains state, and routes the request through the Agentic workflow.'
    },
    {
      id: 3,
      title: '3. Grounded RAG Retrieval',
      icon: 'bi-database-fill-gear',
      color: 'text-cyan',
      badge: 'Azure AI Search',
      desc: 'Agent invokes hybrid search for supporting evidence',
      detail: 'The retrieval tool searches approved content with vector and keyword ranking to return relevant, traceable context.'
    },
    {
      id: 4,
      title: '4. Agent Reasoning & Tools',
      icon: 'bi-robot',
      color: 'text-purple',
      badge: 'Azure OpenAI',
      desc: 'Reasoning over evidence and deciding whether another tool call is needed',
      detail: 'Azure OpenAI synthesizes grounded context; the AI Agent can loop through tools until it has a complete response.'
    },
    {
      id: 5,
      title: '5. Grounded Agent Response',
      icon: 'bi-file-earmark-check-fill',
      color: 'text-success',
      badge: 'Cited AI Output',
      desc: 'Returning an actionable response with retrieved evidence',
      detail: 'The workflow delivers a concise, policy-aware answer with source context and any approved next-step actions.'
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
      style={{ height: '425px', minHeight: '425px', maxHeight: '425px', overflow: 'hidden' }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-2 pb-1.5 border-bottom px-1" style={{ height: '34px' }}>
        <div className="d-flex align-items-center gap-2 min-width-0">
          <span className="pulse-dot flex-shrink-0 me-1"></span>
          <span className="fw-bold text-body font-monospace text-uppercase text-truncate" style={{ fontSize: '0.72rem' }}>Agentic AI RAG Execution Flow</span>
        </div>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle flex-shrink-0 text-nowrap" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
          Agentic Runtime
        </span>
      </div>

      {/* Grid List with 6px vertical space between items */}
      <div className="rag-steps-container d-flex flex-column mb-2 px-1" style={{ height: '280px' }}>
        {ragSteps.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <div
              key={step.id}
              className={`rag-step-item px-2.5 py-1 rounded-3 border transition-all cursor-pointer ${
                isActive
                  ? 'border-cyan bg-cyan-glow'
                  : 'bg-body-tertiary border-secondary text-body-secondary opacity-85'
              }`}
              style={{ height: '48px', marginBottom: '6px', overflow: 'hidden' }}
              onClick={() => setActiveStep(idx)}
            >
              <div className="row align-items-center flex-nowrap g-2 h-100 px-1">
                {/* Left Title & Icon Column */}
                <div className="col min-width-0">
                  <div className="d-flex align-items-center gap-2">
                    <div className={`step-icon-box rounded-2 p-1 bg-body d-flex align-items-center justify-content-center flex-shrink-0 ${step.color}`} style={{ width: '26px', height: '26px' }}>
                      <i className={`bi ${step.icon} x-small`}></i>
                    </div>
                    <div className="min-width-0">
                      <div className="fw-bold text-body text-truncate" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>
                        {step.title}
                        <span 
                    className={`badge font-monospace text-nowrap d-inline-block text-center ${
                      isActive ? 'bg-primary text-white shadow-sm' : 'bg-body-secondary text-body-secondary'
                    }`}
                    style={{ width: '115px', marginLeft: '10px', fontSize: '0.66rem', padding: '4px 4px', letterSpacing: '0.01em' }}
                  >
                    {step.badge}
                  </span>
                      </div>
                      <div className="text-body-secondary text-truncate" style={{ fontSize: '0.67rem', lineHeight: '1.2' }}>{step.desc}</div>
                    </div>
                  </div>
                </div>

                {/* Right Fixed-Width Single-Line Badge Column */}
                {/* <div className="col-auto text-end ps-0 flex-shrink-0">
                  
                </div> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Display Area at Bottom */}
      <div className="rag-footer p-2 px-2.5 rounded-3 bg-body-tertiary border text-body-secondary style-leading" style={{ height: '75px', overflow: 'hidden' }}>
        <div className="d-flex justify-content-between align-items-center mb-0.5">
          <strong className="text-body font-monospace me-2" style={{ fontSize: '0.74rem' }}>{currentStep.badge}</strong>
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
