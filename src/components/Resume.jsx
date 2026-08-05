import React from 'react';

const Resume = () => {
  return (
    <section id="resume" className="resume">
      <div className="container">
        <div className="section-title">
          <h2>Resume</h2>
          <p>
            Expertise in requirements analysis, design, development, testing, maintenance, 
            enhancement, and production support of business applications. Skilled in architecting 
            and executing customized, data-driven solutions, hosted both on-premise and on the cloud.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Professional Experience</h3>

            <div className="resume-item">
              <h4>HCL Technologies</h4>
              <h5>Sep 2021 - Till Date</h5>
              <p><em>Sector 126, Noida, Uttar Pradesh, India</em></p>
              <ul>
                <li>
                  <strong>Lead Developer at World Bank Group</strong><br />
                  <strong>Project Approval Document (PAD)</strong>: Generate a structured 15-section approval document 
                  using AI-powered content generation. Each section is created from user prompts, automatically compiled 
                  into a single document with an indexed table of contents, and made available for download.<br />
                  <strong>Tech Stack:</strong> Azure OpenAI (gpt-4o), .NET Core, Python FastAPI, Aspose, Blob storage, 
                  NumPy, MS SQL Server, Azure Search Index, AWS Open Search.<br />
                  <strong>My Role:</strong> Full-Stack Developer - Built APIs, integrated Azure OpenAI, managed document 
                  generation, handled database operations, and delivered a complete AI-driven approval document system.
                </li>
                <li>
                  <strong>Implementation Status and Results Reports (ISR)</strong>: A system designed to monitor, track, 
                  and analyze issues across multiple international projects, enabling better management and resolution strategies.<br />
                  <strong>Tech Stack:</strong> Databricks, Blob Storage, MS SQL Server, Python FastAPI, Angular, 
                  Timer-triggered Azure Functions, Azure OpenAI GPT-4o, Aspose library.<br />
                  <strong>My Role:</strong> Full-Stack Developer - Contributed to both frontend and backend development, 
                  data processing workflows, and AI-powered analysis for issue management.
                </li>
                <li>
                  <strong>Document Review Tool (DRT)</strong>: A compliance-focused application to review uploaded documents 
                  (Word, PDF, PPT). It detects and highlights sensitive words, provides recommendations for better alternatives, 
                  adds explanatory notes, and generates a summary of sensitive words used.<br />
                  <strong>Tech Stack:</strong> Angular, .NET Core, Azure Service Bus, Azure Functions, Blob Storage, 
                  MS SQL Server (C#), Azure OpenAI GPT-4o, Aspose library.<br />
                  <strong>My Role:</strong> Backend Developer - Implemented backend services, integrated Azure OpenAI for 
                  text analysis, and developed logic for keyword detection, summarization, and reporting.
                </li>
                <li>
                  <strong>Global Mobility Portal (GMP)</strong>: A knowledge and guidance portal for employees traveling abroad.<br />
                  <strong>Tech Stack:</strong> SharePoint, Azure Search Index, Azure Functions, Blob Storage, Aspose library, .NET Core.<br />
                  <strong>My Role:</strong> Backend Developer - Worked on backend automation, Azure Search indexing, and document processing.
                </li>
                <li>
                  <strong>Lead Developer at ANZ Bank</strong><br />
                  <strong>Internal Developer Portal (Backstage)</strong>: Built a centralized developer portal using Backstage.<br />
                  <strong>Tech Stack:</strong> Backstage, React, TypeScript, Node.js, Docker, Kubernetes, CI/CD pipelines, custom plugins.<br />
                  <strong>My Role:</strong> Full-Stack Developer &amp; DevOps.
                </li>
              </ul>
            </div>

            <div className="resume-item">
              <h4>GetOn Infotech Pvt. Ltd.</h4>
              <h5>Apr 2017 - Aug 2021</h5>
              <p><em>Connaught Place, New Delhi, India</em></p>
              <ul>
                <li>Worked as a Development Head.</li>
                <li>Delivered end-to-end application solutions, covering DevOps deployments on Azure, automation workflows, 
                and business-critical systems for accounting and production, etc.</li>
              </ul>
            </div>

            <div className="resume-item">
              <h4>ABL Online</h4>
              <h5>Apr 2014 - Apr 2017</h5>
              <p><em>Connaught Place, New Delhi, India</em></p>
              <ul>
                <li>Worked as Team Lead.</li>
                <li>Worked on diverse applications tailored to business needs, including AWS Cloud solutions, emailing systems, 
                invoicing and taxation platforms, CRM, HRM, and salary distribution systems.</li>
              </ul>
            </div>

            <div className="resume-item">
              <h4>ABL Online</h4>
              <h5>June 2011 - Apr 2014</h5>
              <p><em>Connaught Place, New Delhi, India</em></p>
              <ul>
                <li>Worked as a Web Developer.</li>
                <li>Worked on various applications based on company requirements viz. Property Portal, Job Portal, CRM, HRM, Virtual Number etc.</li>
              </ul>
            </div>

            <div className="resume-item">
              <h4>IBM Daksh</h4>
              <h5>Apr 2010 - Apr 2011</h5>
              <p><em>Gurgaon, Haryana, India</em></p>
              <ul>
                <li>Worked as Customer Care Executive.</li>
                <li>Worked on health care backend MS-Dos based software.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row section-bg">
          <div className="col-lg-12" data-aos="fade-up">
            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>Professional Cloud Developer (English)</h4>
              <h5>July 2022</h5>
              <p><em>Google Cloud Platform</em></p>
              <p>
                Certified as a Google-endorsed Professional Cloud Developer, proficient in designing, building, testing, 
                deploying, and integrating scalable, secure, cloud-native applications using Google-recommended tools and best practices.
              </p>
            </div>
            <div className="resume-item">
              <h4>GNIIT (Software Engineer Course)</h4>
              <h5>2006 - 2009</h5>
              <p><em>NIIT, South Ex Campus, Delhi, India</em></p>
              <p>
                Completed all the Terms and Professional Practice successfully to obtain this prestigious recognition from NIIT.
              </p>
            </div>
            <div className="resume-item">
              <h4>BCom</h4>
              <h5>2005 - 2008</h5>
              <p><em>Delhi Open University, Delhi, India</em></p>
              <p>
                A Bachelor of Commerce, abbreviated as B.Com is an undergraduate degree in commerce and related subjects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
