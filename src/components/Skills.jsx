import React from 'react';

const Skills = () => {
  const leftSkills = [
    { name: 'Python', value: 90 },
    { name: 'Gen AI', value: 90 },
    { name: 'Azure Services (Web Apps, Functions, Service Bus, Storage, Search, AI, SQL, Cosmos DB, AD)', value: 90 },
    { name: 'Angular 12.1.4', value: 90 },
    { name: 'ReactJS V17', value: 90 },
    { name: 'DevOps', value: 70 },
    { name: 'HTML', value: 90 },
    { name: 'CSS', value: 90 },
    { name: 'JavaScript', value: 90 },
    { name: 'JQuery', value: 90 }
  ];

  const rightSkills = [
    { name: '.Net Core', value: 90 },
    { name: 'ASP.Net MVC', value: 90 },
    { name: 'ADO.Net', value: 90 },
    { name: 'Dapper', value: 90 },
    { name: 'Linq', value: 90 },
    { name: 'MS SQL Server', value: 90 },
    { name: 'MongoDB', value: 90 },
    { name: 'RedIs Server', value: 90 },
    { name: 'Android Studio', value: 70 },
    { name: 'Ajax', value: 90 }
  ];

  const renderSkill = (skill, index) => (
    <div className="progress" key={index}>
      <span className="skill">
        {skill.name}
        <i className="val">{skill.value}%</i>
      </span>
      <div className="progress-bar-wrap">
        <div 
          className="progress-bar" 
          role="progressbar" 
          aria-valuenow={skill.value} 
          aria-valuemin="0" 
          aria-valuemax="100"
          style={{ width: `${skill.value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-title">
          <h2>Skills</h2>
          <p>
            Skilled in architecting and executing customized, data-driven solutions, hosted both on-premise and on the cloud. 
            Expertise in requirements analysis, design, development, testing, maintenance, enhancement, and production support of business applications.
          </p>
        </div>

        <div className="row skills-content">
          <div className="col-lg-6" data-aos="fade-up">
            {leftSkills.map((skill, index) => renderSkill(skill, index))}
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            {rightSkills.map((skill, index) => renderSkill(skill, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
