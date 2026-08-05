import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title">
          <h2>About</h2>
          <p>
            Greetings!<br />
            Technical Architect with 14+ years of experience delivering web, mobile, and business intelligence solutions. 
            Proficient in Python, Generative AI, .NET Core, Angular, React.js, ASP.NET MVC, Android Studio, and SQL/NoSQL databases 
            (MS SQL, MySQL, PostgreSQL, MongoDB, Azure CosmosDB). Expertise in Azure cloud services (Web Apps, Functions, Service Bus, 
            AI Search, SQL, API Gateway, VM Automation, Blob Storage, SendGrid), DevOps practices, Docker and Kubernetes. 
            Also certified as a Google Cloud Professional Cloud Developer.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-4" data-aos="fade-right">
            <img 
              src="/assets/img/Jaibir-Singh-03.jpg" 
              className="img-fluid" 
              alt="Jaibir Singh" 
            />
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
            <h3>Technical Architect</h3>
            <p className="fst-italic">
              Being in an esteemed organization as valuable service provider and devote all my efforts and knowledge 
              for the organization and learn all new things to implement in the organization for the sake of its growth.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-chevron-right"></i> 
                    <strong>Profession:</strong> <span>Technical Architect</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i> 
                    <strong>Website:</strong> <span>jbr2021.github.io</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i> 
                    <strong>Phone:</strong> <span>+91-9999XXXXXX</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i> 
                    <strong>City:</strong> <span>Ghaziabad, Uttar Pradesh, India</span>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li>
                    <i className="bi bi-chevron-right"></i> 
                    <strong>Birthday:</strong> <span>23rd December, 1987</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i> 
                    <strong>Age:</strong> <span>38</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i> 
                    <strong>Email:</strong> <span>contact2jaibir@gmail.com</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i> 
                    <strong>Freelance:</strong> <span>Not Available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
