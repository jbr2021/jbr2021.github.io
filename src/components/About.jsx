import React from 'react';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">About</h2>

        <div className="grid">
          <div className="profile">
            <img 
              src="/assets/img/Jaibir-Singh-07.jpg" 
              alt="Jaibir Singh" 
            />
          </div>

          <div>
            <p className="bio">
              Greetings!<br /><br />
              Technical Architect with <strong>14+ years</strong> of experience delivering web, mobile, and business intelligence solutions. 
              Proficient in Python, Generative AI, .NET Core, Angular, React.js, ASP.NET MVC, Android Studio, and SQL/NoSQL databases 
              (MS SQL, MySQL, PostgreSQL, MongoDB, Azure CosmosDB). Expertise in Azure cloud services (Web Apps, Functions, Service Bus, 
              AI Search, SQL, API Gateway, VM Automation, Blob Storage, SendGrid), DevOps practices, Docker and Kubernetes. 
              Also certified as a Google Cloud Professional Cloud Developer.
            </p>

            <div className="details">
              <div><strong>Profession:</strong> Technical Architect</div>
              <div><strong>Website:</strong> jbr2021.github.io</div>
              <div><strong>Phone:</strong> +91-9999XXXXXX</div>
              <div><strong>City:</strong> Ghaziabad, Uttar Pradesh, India</div>
              <div><strong>Birthday:</strong> 23rd December, 1987</div>
              <div><strong>Age:</strong> 38</div>
              <div><strong>Email:</strong> contact2jaibir@gmail.com</div>
              <div><strong>Freelance:</strong> Not Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
