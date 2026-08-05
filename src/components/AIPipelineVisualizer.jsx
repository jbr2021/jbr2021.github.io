import React, { useState } from 'react';

const AIPipelineVisualizer = () => {
  const [activePipeline, setActivePipeline] = useState('pad');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([
    'System initialized. Azure OpenAI gpt-5 connected.',
    'Vector Index ready: 1536-dimensional embeddings loaded.',
    'Agentic Router standby.'
  ]);
  const [activeStep, setActiveStep] = useState(0);

  const pipelines = {
    pad: {
      title: 'Project Approval Document (PAD) AI Generator',
      client: 'World Bank Group',
      tech: 'Azure OpenAI gpt-5 • Python FastAPI • Aspose • MS SQL • Azure AI Search',
      steps: [
        { label: 'Prompt Ingestion', desc: 'Accepting user section prompts & historical context' },
        { label: 'Semantic Chunking & RAG', desc: 'Querying Azure Search Index & AWS OpenSearch' },
        { label: 'LLM Parallel Generation', desc: 'Synthesizing 15 structured document sections via gpt-5' },
        { label: 'Document Compilation', desc: 'Aspose library compiling TOC & exporting Word/PDF' }
      ]
    },
    drt: {
      title: 'Document Review Tool (DRT) Sensitive Word Audit',
      client: 'World Bank Group',
      tech: 'Angular • .NET Core • Azure Service Bus • Azure Functions • Azure OpenAI',
      steps: [
        { label: 'Document Upload & Parsing', desc: 'Parsing Word, PDF, PPT via Aspose pipeline' },
        { label: 'Sensitive Keyword Scan', desc: 'Regex & Semantic embedding search for compliance' },
        { label: 'AI Alternatives & Notes', desc: 'Azure OpenAI generating context-aware replacements' },
        { label: 'Tabular Audit Report', desc: 'Mapping sensitivity flags with page numbers & summary' }
      ]
    },
    agentic: {
      title: 'Multi-Agent Enterprise Architecture & Backstage IDP',
      client: 'ANZ Bank',
      tech: 'Backstage IDP • React • TypeScript • Docker • Kubernetes • Python Agents',
      steps: [
        { label: 'Intent Decomposition', desc: 'Orchestrator Agent parsing developer query' },
        { label: 'Backstage Catalog Discovery', desc: 'Querying Software Catalog microservice graph' },
        { label: 'Automated Scaffolding', desc: 'Executing Scaffolder template for K8s microservice' },
        { label: 'CI/CD Pipeline Trigger', desc: 'Validating TechDocs & pushing Docker image to K8s' }
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
            <div className="badge-pill mb-2">Interactive AI Architecture Lab</div>
            <h2 className="section-title text-body">Live AI System Workflow Visualizer</h2>
            <p className="section-subtitle text-body-secondary mb-0">
              Simulate production-grade AI pipelines engineered by Jaibir Singh for World Bank Group &amp; ANZ Bank.
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
                      <span className="fw-bold text-body">{pipelines[key].title.split(' ')[0]} {pipelines[key].title.split(' ')[1]}</span>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                        {pipelines[key].client}
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
                      <span>Simulate {pipelines[activePipeline].title.split(' ')[0]} Pipeline</span>
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
              <div className="console-window rounded-3 p-3 font-monospace text-light small shadow-sm">
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
