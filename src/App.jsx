import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AIPipelineVisualizer from './components/AIPipelineVisualizer';
import Experience from './components/Experience';
import Skills from './components/Skills';
import EducationCertifications from './components/EducationCertifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIBackground from './components/AIBackground';
import ProjectModal from './components/ProjectModal';
import { useProfile } from './hooks/useProfile';

function App() {
  const { profile, loading, error } = useProfile();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('');

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectProject = (project, company) => {
    setSelectedProject(project);
    setSelectedCompany(company);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
        <div className="text-center">
          <div className="spinner-border text-info mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
          <div className="font-monospace small text-info">Initializing AI Portfolio Engine...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
        <div className="text-center p-4">
          <i className="bi bi-exclamation-triangle-fill text-warning fs-1 mb-2"></i>
          <h3>Failed to load profile data</h3>
          <p className="text-muted">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container overflow-hidden position-relative">
      {/* Intelligent Animated Canvas Background */}
      <AIBackground profile={profile} />

      {/* Top Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <Hero profile={profile} />

      <main className="position-relative z-index-content">
        {/* About Section */}
        <About profile={profile} />

        {/* Professional Track & Experience */}
        <Experience profile={profile} onSelectProject={handleSelectProject} />

        {/* Interactive AI Pipeline Visualizer */}
        <AIPipelineVisualizer />

        {/* Skills Section */}
        <Skills profile={profile} />

        {/* Education & Certifications */}
        <EducationCertifications profile={profile} />

        {/* Contact Section */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Modal Popup for Project Details */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          company={selectedCompany}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;
