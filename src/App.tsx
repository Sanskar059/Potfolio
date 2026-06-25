import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import BackgroundGlow from './components/BackgroundGlow';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Extensions
import AllProjectsView from './components/AllProjectsView';
import ProjectDetailsView from './components/ProjectDetailsView';
import ContactFormView from './components/ContactFormView';
import ResumeModal from './components/ui/ResumeModal';
import ExploreModal from './components/ui/ExploreModal';
import type { Project } from './data/projects';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'project-demo' | 'contact-form'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeModal, setActiveModal] = useState<'resume' | 'frontend-skills' | 'backend-skills' | 'tools-skills' | null>(null);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-on-primary">
      <CustomCursor />
      <BackgroundGlow />
      
      {/* Global Navigation */}
      <Navigation 
        setView={setCurrentView} 
        currentView={currentView}
        openResume={() => setActiveModal('resume')}
      />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero setView={setCurrentView} />
              <Marquee />
              <Work setView={setCurrentView} setSelectedProject={setSelectedProject} />
              <Skills onExplore={(cat) => setActiveModal(`${cat}-skills` as any)} />
              <Timeline openResume={() => setActiveModal('resume')} />
              <Contact setView={setCurrentView} />
            </motion.div>
          )}

          {currentView === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <AllProjectsView
                onBack={() => setCurrentView('home')}
                onSelectProject={(project) => {
                  setSelectedProject(project);
                  setCurrentView('project-demo');
                }}
              />
            </motion.div>
          )}

          {currentView === 'project-demo' && selectedProject && (
            <motion.div
              key={`demo-${selectedProject.id}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProjectDetailsView
                project={selectedProject}
                onBack={() => setCurrentView('projects')}
              />
            </motion.div>
          )}

          {currentView === 'contact-form' && (
            <motion.div
              key="contact-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ContactFormView onBack={() => setCurrentView('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Modal Overlays */}
      <AnimatePresence>
        {activeModal === 'resume' && (
          <ResumeModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal && activeModal !== 'resume' && (
          <ExploreModal
            category={activeModal.replace('-skills', '') as any}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
