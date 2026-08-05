import React from 'react';

const Resume = () => {
  const experiences = [
    {
      company: "HCL Technologies",
      period: "Sep 2021 — Present",
      role: "Lead Developer (World Bank & ANZ Bank)",
      highlights: [
        "Built AI-powered Project Approval Document system using Azure OpenAI + FastAPI",
        "Developed RAG-based document review & compliance tool (DRT)",
        "Led internal developer portal using Backstage on Kubernetes"
      ],
      tech: "Azure OpenAI, Python FastAPI, .NET Core, Angular, Kubernetes"
    },
    {
      company: "GetOn Infotech Pvt. Ltd.",
      period: "2017 — 2021",
      role: "Development Head",
      highlights: [
        "Led end-to-end delivery of cloud-native applications on Azure",
        "Implemented DevOps pipelines and automation workflows"
      ],
      tech: "Azure, .NET, DevOps"
    }
  ];

  return (
    <section id="resume">
      <div className="container">
        <div className="section-title">
          <h2>Experience</h2>
        </div>

        <div style={{ maxWidth: '860px', marginTop: '2rem' }}>
          {experiences.map((exp, index) => (
            <div key={index} className="resume-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h4>{exp.company}</h4>
                <span className="text-muted" style={{ fontSize: '0.9rem' }}>{exp.period}</span>
              </div>
              <div className="company" style={{ marginBottom: '0.75rem' }}>{exp.role}</div>
              
              <ul style={{ marginBottom: '0.75rem', paddingLeft: '1.1rem' }}>
                {exp.highlights.map((h, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{h}</li>
                ))}
              </ul>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <strong>Tech:</strong> {exp.tech}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
