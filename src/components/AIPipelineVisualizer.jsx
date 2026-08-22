import React, { useState } from 'react';

const AIPipelineVisualizer = () => {
  const [activePipeline, setActivePipeline] = useState('reviewAgent');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([
    'AI agent workspace initialized. Azure OpenAI connected.',
    'Azure AI Search index ready for grounded retrieval.',
    'Review and supplier support workflows are standing by.'
  ]);
  const [activeStep, setActiveStep] = useState(0);

  const pipelines = {
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

  const handleRunPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    const curr = pipelines[activePipeline];

    let step = 0;
    setLogs((prev) => [...prev, `\n>>> Executing [${curr.title}]...`]);

    const interval = setInterval(() => {
      if (step < curr.steps.length) {
        const stepData = curr.steps[step];
        setActiveStep(step);
        setLogs((prev) => [
          ...prev,
          `[STEP ${step + 1}/${curr.steps.length}] ${stepData.label}: ${stepData.desc}`
        ]);
        step++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setLogs((prev) => [
          ...prev,
          `✔ Execution completed successfully! Status: 200 OK • Latency: 142ms`
        ]);
      }
    }, 900);
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
                {Object.keys(pipelines).map((key) => (
                  <button
                    key={key}
                    className={`pipeline-tab-btn text-start p-3 rounded-3 border transition-all ${
                      activePipeline === key ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActivePipeline(key);
                      setActiveStep(0);
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-body">{pipelines[key].shortTitle}</span>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                        {pipelines[key].category}
                      </span>
                    </div>
                    <small className="text-body-secondary d-block">{pipelines[key].tech}</small>
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
                      <span>Simulate {pipelines[activePipeline].shortTitle} Workflow</span>
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
                  {pipelines[activePipeline].steps.map((s, idx) => (
                    <div key={idx} className="col-6 col-md-3">
                      <div
                        className={`step-box p-2 rounded text-center border transition-all ${
                          idx === activeStep && isRunning
                            ? 'border-cyan bg-cyan-glow text-white'
                            : idx <= activeStep
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
                    {pipelines[activePipeline].title}
                  </span>
                  <span className="badge bg-success-subtle text-success">
                    <span className="pulse-dot-sm me-1"></span> Live
                  </span>
                </div>
                <div className="console-body" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                  {logs.slice(-8).map((log, i) => (
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
