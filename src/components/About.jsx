import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="section-title">
          <h2>About</h2>
        </div>

        <div className="row" style={{ marginTop: '2rem' }}>
          <div className="col-lg-4">
            <div className="card" style={{ textAlign: 'center' }}>
              <img 
                src="/assets/img/Jaibir-Singh-07.jpg" 
                alt="Jaibir Singh" 
                style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '9999px', 
                  objectFit: 'cover',
                  margin: '0 auto 1.5rem',
                  border: '4px solid var(--border)'
                }} 
              />
              <h3 style={{ marginBottom: '0.5rem' }}>Jaibir Singh</h3>
              <p className="text-muted" style={{ marginBottom: '1rem' }}>Technical Architect &amp; AI Engineer</p>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card">
              <p style={{ fontSize: '1.02rem', lineHeight: 1.65 }}>
                Greetings!<br />
                Technical Architect with <strong>14+ years</strong> of experience delivering web, mobile, and business intelligence solutions. 
                Proficient in Python, Generative AI, .NET Core, Angular, React.js, ASP.NET MVC, Android Studio, and SQL/NoSQL databases 
                (MS SQL, MySQL, PostgreSQL, MongoDB, Azure CosmosDB). Expertise in Azure cloud services (Web Apps, Functions, Service Bus, 
                AI Search, SQL, API Gateway, VM Automation, Blob Storage, SendGrid), DevOps practices, Docker and Kubernetes. 
                Also certified as a Google Cloud Professional Cloud Developer.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1.5rem' }}>
                <div>
                  <div><strong>Profession:</strong></div>
                  <div className="text-muted">Technical Architect</div>
                </div>
                <div>
                  <div><strong>Website:</strong></div>
                  <div className="text-muted">jbr2021.github.io</div>
                </div>
                <div>
                  <div><strong>Phone:</strong></div>
                  <div className="text-muted">+91-9999XXXXXX</div>
                </div>
                <div>
                  <div><strong>City:</strong></div>
                  <div className="text-muted">Ghaziabad, Uttar Pradesh, India</div>
                </div>
                <div>
                  <div><strong>Birthday:</strong></div>
                  <div className="text-muted">23rd December, 1987</div>
                </div>
                <div>
                  <div><strong>Age:</strong></div>
                  <div className="text-muted">38</div>
                </div>
                <div>
                  <div><strong>Email:</strong></div>
                  <div className="text-muted">contact2jaibir@gmail.com</div>
                </div>
                <div>
                  <div><strong>Freelance:</strong></div>
                  <div className="text-muted">Not Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
