import React, { useState, useEffect, useRef } from 'react';

// Static pipeline definitions (hoisted out of the component so they are not
// recreated on every render, which keeps effect deps stable).
const PIPELINES = {
  reviewAgent: {
    title: 'Review Agent',
    shortTitle: 'Review Agent',
    category: 'AI Agent',
    tech: 'Angular • Python • Azure Document Intelligence • Azure OpenAI • RAG',
    steps: [
      { label: 'Secure Upload Intake', desc: 'Accepting up to 15 documents (20 MB each), with two required Word primary documents' },
      { label: 'Document Intelligence', desc: 'Extracting content and structure from Word and PDF files for review' },
      { label: 'Rule-by-Rule Validation', desc: 'Evaluating configurable primary-document rules and streaming Pass/Fail results live' },
      { label: 'Tracked Report Output', desc: 'Generating summaries and Word tracked changes with the review report' }
    ]
  },
  supplierChatbot: {
    title: 'Supplier Chatbot',
    shortTitle: 'Supplier Chatbot',
    category: 'Agentic AI',
    tech: 'Angular • Python • LangGraph • Azure AI Search • Azure OpenAI • PostgreSQL',
    steps: [
      { label: 'Supplier Query Intake', desc: 'Receiving a question about bank supply or tender policies' },
      { label: 'LangGraph Routing', desc: 'Routing intent through the agentic workflow to the appropriate retrieval path' },
      { label: 'Grounded Policy Retrieval', desc: 'Searching SharePoint-backed Azure AI Search content for relevant guidance' },
      { label: 'Response & Follow-up', desc: 'Delivering a context-aware answer and handling the next supplier question' }
    ]
  },
  isrAgent: {
    title: 'ISR AI Agent',
    shortTitle: 'ISR AI Agent',
    category: 'AI Agent',
    tech: 'Angular • Python FastAPI • LangGraph/StateGraph • Azure OpenAI • MS SQL',
    steps: [
      { label: 'Issue Data Intake', desc: 'Collecting project issues, updates, and supporting information' },
      { label: 'StateGraph Workflow', desc: 'Moving data through a simple node-based AI agent workflow' },
      { label: 'Issue Analysis', desc: 'Identifying priority issues, patterns, and recommended resolution actions' },
      { label: 'ISR Insight Delivery', desc: 'Publishing actionable project monitoring and status insights' }
    ]
  }
};

const IDLE_LOGS = [
  'AI agent workspace initialized. Azure OpenAI connected.',
  'Azure AI Search index ready for grounded retrieval.',
  'Review and supplier support workflows are standing by.'
];

const AIPipelineVisualizer = () => {
  const [activePipeline, setActivePipeline] = useState('reviewAgent');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState(IDLE_LOGS);
  // Single source of truth for the current step index:
  // 0..(total-1) while running; equals `total` once the run has completed.
  const [activeStep, setActiveStep] = useState(0);
  const consoleBodyRef = useRef(null);

  const curr = PIPELINES[activePipeline];
  const total = curr.steps.length;

  // Keep the console pinned to the newest line as logs stream in.
  useEffect(() => {
    const el = consoleBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  // Advance the simulation one step at a time. A self-cleaning setTimeout
  // chain (instead of a raw setInterval) guarantees the timer can never leak
  // or fire against a stale pipeline, and `activeStep` is bounded by `total`.
  useEffect(() => {
    if (!isRunning) return;

    // All steps processed -> finish the run.
    if (activeStep >= total) {
      setIsRunning(false);
      setLogs((prev) => [
        ...prev,
        '✔ Execution completed successfully! Status: 200 OK • Latency: 142ms'
      ]);
      return;
    }

    const stepData = curr.steps[activeStep];
    const timer = setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[STEP ${activeStep + 1}/${total}] ${stepData.label}: ${stepData.desc}`
      ]);
      setActiveStep((s) => s + 1);
    }, 900);

    return () => clearTimeout(timer);
  }, [isRunning, activeStep, activePipeline, curr, total]);

  const handleSelectPipeline = (key) => {
    if (isRunning || key === activePipeline) return; // no switching mid-run
    setActivePipeline(key);
    setActiveStep(0);
    setLogs(IDLE_LOGS);
  };

  const handleRunPipeline = () => {
    if (isRunning) return;
    setActiveStep(0);
    setIsRunning(true);
    // Reset the console so every run starts cleanly from STEP 1/N.
    setLogs([`>>> Executing [${curr.title}]...`]);
  };

  return (
    <section id="ai-pipeline" className="pipeline-section py-5">
      <div className="container">
        {/* Glass Section Header */}
        <div className="text-center mb-5">
          <div className="section-header card border-0 glass-card p-4 rounded-4 shadow-sm mx-auto">
            <div className="badge-pill mb-2">Interactive AI Agent Lab</div>
            <h2 className="section-title text-body">Live AI Agent Workflow Visualizer</h2>
            <p className="section-subtitle text-body-secondary mb-0">
              Simulate production-grade AI Agent and Agentic AI workflows for document validation, supplier support, and project insights.
            </p>
          </div>
        </div>

        <div className="pipeline-card card border-0 glass-card p-4 rounded-4 shadow-sm">
          <div className="row g-4 align-items-center">
            {/* Left Selector & Control */}
            <div className="col-lg-5">
              <div className="pipeline-tabs d-flex flex-column gap-2 mb-4">
                {Object.keys(PIPELINES).map((key) => (
                  <button
                    key={key}
                    className={`pipeline-tab-btn text-start p-3 rounded-3 border transition-all ${
                      activePipeline === key ? 'active' : ''
                    }`}
                    onClick={() => handleSelectPipeline(key)}
                    disabled={isRunning}
                    aria-disabled={isRunning}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-body">{PIPELINES[key].shortTitle}</span>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                        {PIPELINES[key].category}
                      </span>
                    </div>
                    <small className="text-body-secondary d-block">{PIPELINES[key].tech}</small>
                  </button>
                ))}
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg rounded-pill d-flex align-items-center justify-content-center gap-2"
                  onClick={handleRunPipeline}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                      <span>Processing AI Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-play-circle-fill"></i>
                      <span>Simulate {curr.shortTitle} Workflow</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Stepper & Live Console */}
            <div className="col-lg-7">
              {/* Stepper progress */}
              <div className="pipeline-steps-horizontal mb-4">
                <div className="row g-2">
                  {curr.steps.map((s, idx) => (
                    <div key={idx} className="col-6 col-md-3">
                      <div
                        className={`step-box p-2 rounded text-center border transition-all ${
                          isRunning && idx === activeStep
                            ? 'border-cyan bg-cyan-glow text-white'
                            : idx < activeStep
                            ? 'border-primary bg-primary-subtle text-body'
                            : 'border-secondary text-body-secondary'
                        }`}
                      >
                        <div className="step-num fw-bold">0{idx + 1}</div>
                        <div className="step-label text-truncate small">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Console log display */}
              <div className="console-window rounded-3 p-3 font-monospace small shadow-sm">
                <div className="console-header d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary">
                  <span className="text-cyan">
                    <i className="bi bi-terminal me-2"></i>
                    {curr.title}
                  </span>
                  <span className="badge bg-success-subtle text-success">
                    <span className="pulse-dot-sm me-1"></span> Live
                  </span>
                </div>
                <div ref={consoleBodyRef} className="console-body" style={{ height: '180px', overflowY: 'auto' }}>
                  {logs.map((log, i) => (
                    <div key={i} className="console-line my-1">
                      {log.startsWith('>>>') ? (
                        <span className="text-warning font-weight-bold">{log}</span>
                      ) : log.includes('STEP') ? (
                        <span className="text-info">{log}</span>
                      ) : log.includes('✔') ? (
                        <span className="text-success font-weight-bold">{log}</span>
                      ) : (
                        <span className="text-muted">{log}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPipelineVisualizer;
