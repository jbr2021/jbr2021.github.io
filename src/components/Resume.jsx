import React from 'react';

const Resume = () => {
  return (
    <section id="resume">
      <div className="container">
        <h2 className="section-title">Experience</h2>

        <div className="resume-item">
          <h3>HCL Technologies</h3>
          <div className="meta">Sep 2021 — Present • Sector 126, Noida, Uttar Pradesh, India</div>

          <ul>
            <li>
              <strong>Lead Developer at World Bank Group</strong><br />
              <strong>Project Approval Document (PAD)</strong>: Generate a structured 15-section approval document using AI-powered content generation. 
              Each section is created from user prompts, automatically compiled into a single document with an indexed table of contents, and made available for download.<br />
              <span className="tech">Tech: Azure OpenAI (gpt-4o), .NET Core, Python FastAPI, Aspose, Blob storage, NumPy, MS SQL Server, Azure Search Index, AWS Open Search</span>
            </li>
            <li>
              <strong>Implementation Status and Results Reports (ISR)</strong>: A system designed to monitor, track, and analyze issues across multiple international projects, enabling better management and resolution strategies.<br />
              <span className="tech">Tech: Databricks, Blob Storage, MS SQL Server, Python FastAPI, Angular, Timer-triggered Azure Functions, Azure OpenAI GPT-4o, Aspose library</span>
            </li>
            <li>
              <strong>Document Review Tool (DRT)</strong>: A compliance-focused application to review uploaded documents (Word, PDF, PPT). It detects and highlights sensitive words, provides recommendations for better alternatives, adds explanatory notes, and generates a summary of sensitive words used. It also presents a tabular report of sensitive keywords with corresponding page numbers.<br />
              <span className="tech">Tech: Angular, .NET Core, Azure Service Bus, Azure Functions, Blob Storage, MS SQL Server (C#), Azure OpenAI GPT-4o, Aspose library</span>
            </li>
            <li>
              <strong>Global Mobility Portal (GMP)</strong>: A knowledge and guidance portal for employees traveling abroad, providing detailed information about processes, education, workspace setup, and key contacts.<br />
              <span className="tech">Tech: SharePoint (folders &amp; collections), Azure Search Index, Azure Functions, Blob Storage, Aspose library, .NET Core</span>
            </li>
            <li>
              <strong>Lead Developer at ANZ Bank</strong><br />
              <strong>Internal Developer Portal (Backstage)</strong>: Built a centralized developer portal using Backstage to unify service discovery, documentation, and infrastructure tools, improving developer productivity and onboarding.<br />
              <span className="tech">Tech: Backstage (Software Catalog, Scaffolder, TechDocs), React, TypeScript, Node.js, Docker, Kubernetes, CI/CD pipelines, custom plugins</span>
            </li>
          </ul>
        </div>

        <div className="resume-item">
          <h3>GetOn Infotech Pvt. Ltd.</h3>
          <div className="meta">Apr 2017 — Aug 2021 • Connaught Place, New Delhi, India</div>
          <ul>
            <li>Worked as a Development Head.</li>
            <li>Delivered end-to-end application solutions, covering DevOps deployments on Azure, automation workflows, and business-critical systems for accounting and production, etc.</li>
          </ul>
        </div>

        <div className="resume-item">
          <h3>ABL Online</h3>
          <div className="meta">Apr 2014 — Apr 2017 • Connaught Place, New Delhi, India</div>
          <ul>
            <li>Worked as Team Lead.</li>
            <li>Worked on diverse applications tailored to business needs, including AWS Cloud solutions, emailing systems, invoicing and taxation platforms, CRM, HRM, and salary distribution systems.</li>
          </ul>
        </div>

        <div className="resume-item">
          <h3>ABL Online</h3>
          <div className="meta">June 2011 — Apr 2014 • Connaught Place, New Delhi, India</div>
          <ul>
            <li>Worked as a Web Developer.</li>
            <li>Worked on various applications based on company requirements viz. Property Portal, Job Portal, CRM, HRM, Virtual Number etc.</li>
          </ul>
        </div>

        <div className="resume-item">
          <h3>IBM Daksh</h3>
          <div className="meta">Apr 2010 — Apr 2011 • Gurgaon, Haryana, India</div>
          <ul>
            <li>Worked as Customer Care Executive.</li>
            <li>Worked on health care backhand MS-Dos based software.</li>
          </ul>
        </div>

        <h2 className="section-title" style={{ marginTop: '3rem' }}>Education &amp; Certification</h2>

        <div className="resume-item">
          <h3>Professional Cloud Developer (English)</h3>
          <div className="meta">Issued 1 Aug 2022 • Google Cloud Platform • Certification ID: aeaduY</div>
          <p>Certified as a Google-endorsed Professional Cloud Developer, proficient in designing, building, testing, deploying, and integrating scalable, secure, cloud-native applications using Google-recommended tools and best practices.</p>
        </div>

        <div className="resume-item">
          <h3>MongoDB SI Associate Certification Program</h3>
          <div className="meta">Issued 26 June, 2022 • MongoDB</div>
          <p>Completed the MongoDB SI Associate Certification Program, validating core competence in MongoDB data modeling, querying, indexing, aggregation framework, and developer best practices for enterprise applications.</p>
        </div>

        <div className="resume-item">
          <h3>GNIIT (Software Engineer Course)</h3>
          <div className="meta">2006 — 2009 • NIIT, South Ex Campus, Delhi, India</div>
          <p>Complete all the Terms and Professional Practice successfully to obtain this prestigious recognition from NIIT. Connect with a global network of accomplished NIIT Alumni. Widely recognized and valued as GNIIT - Software Engineering.</p>
        </div>

        <div className="resume-item">
          <h3>BCom</h3>
          <div className="meta">2005 — 2008 • Delhi Open University, Delhi, India</div>
          <p>A Bachelor of Commerce, abbreviated as B.Com is an undergraduate degree in commerce and related subjects. The course is designed to provide students with a wide range of managerial skills and understanding in streams like finance, accounting, taxation and management.</p>
        </div>
      </div>
    </section>
  );
};

export default Resume;
