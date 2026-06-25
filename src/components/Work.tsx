import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={`w-full h-full ${className}`}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

import { type Project, projectsData } from '@/data/projects';

interface WorkProps {
  setView: (view: 'home' | 'projects' | 'project-demo' | 'contact-form') => void;
  setSelectedProject: (project: Project) => void;
}

export default function Work({ setView, setSelectedProject }: WorkProps) {
  const mocklingoProject = projectsData.find(p => p.id === 'mocklingo')!;
  const allumniProject = projectsData.find(p => p.id === 'allumni')!;
  const agenticProject = projectsData.find(p => p.id === 'agentic_orchestration')!;

  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMoveImage = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  return (
    <section className="w-full bg-background/65 backdrop-blur-md border-t border-white/5 relative z-10" id="work">
      <div className="py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={revealVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-20"
      >
        <div>
          <span className="text-label-sm font-label-sm uppercase text-primary mb-4 block tracking-widest">
            Case Studies
          </span>
          <h2 className="text-headline-lg font-headline-lg">Selected Work</h2>
        </div>
        <div>
          <Magnetic range={0.15}>
            <button 
              onClick={() => setView('projects')}
              className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-full font-label-sm uppercase tracking-widest text-xs transition-all cursor-pointer"
            >
              See all projects
            </button>
          </Magnetic>
        </div>
      </motion.div>

      <div className="space-y-40">
        {/* Project 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={revealVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          <div>
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded text-[10px] font-bold uppercase tracking-wider">
                Product Design
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-wider">
                Frontend Lead
              </span>
            </div>
            <h3 className="text-headline-md font-bold mb-6">Mocklingo</h3>
            <p className="text-on-surface-variant mb-8 text-body-lg">
              An AI-driven language interview platform designed to simulate real-world pressure. Built with React and Whisper AI, featuring real-time speech-to-text feedback loops.
            </p>
            <div className="flex gap-10 mb-10">
              <div>
                <div className="text-headline-md font-bold">150+</div>
                <div className="text-label-sm uppercase opacity-50">Active Users</div>
              </div>
              <div>
                <div className="text-headline-md font-bold">2.4s</div>
                <div className="text-label-sm uppercase opacity-50">Latency</div>
              </div>
            </div>
            <Magnetic range={0.15}>
              <button 
                onClick={() => {
                  setSelectedProject(mocklingoProject);
                  setView('project-demo');
                }}
                className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-label-sm transition-all duration-300 hover:gap-4 cursor-pointer"
              >
                View Project 
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </Magnetic>
          </div>
          <div className="relative aspect-video">
            <TiltCard>
              <div 
                className="p-2 h-full bg-surface-container-low glass-card rounded-xl flex flex-col hover:border-primary/40 hover:shadow-[0_0_20px_rgba(192,193,255,0.2)] transition-all duration-300 relative overflow-hidden group cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseMove={handleMouseMoveImage}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  setSelectedProject(mocklingoProject);
                  setView('project-demo');
                }}
              >
                <img
                  src="/Mock/Screenshot%202026-06-23%20173522.png"
                  alt="Mocklingo Project Screenshot"
                  className="w-full h-full object-cover rounded-lg"
                />

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute pointer-events-none bg-primary text-black px-4 py-2 rounded-full font-label-sm uppercase tracking-widest text-[10px] shadow-[0_0_15px_rgba(192,193,255,0.4)] z-50 flex items-center gap-1 font-bold"
                      style={{
                        left: mousePos.x,
                        top: mousePos.y,
                        x: "-50%",
                        y: "-50%",
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                      View Project
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TiltCard>
          </div>
        </motion.div>

        {/* Project 2 (Reversed) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={revealVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-40"
        >
          <div className="relative aspect-video order-2 lg:order-1">
            <TiltCard>
              <div 
                className="p-2 h-full bg-surface-container-low glass-card rounded-xl flex flex-col hover:border-secondary/40 hover:shadow-[0_0_20px_rgba(76,215,246,0.2)] transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedProject(allumniProject);
                  setView('project-demo');
                }}
              >
                <img
                  src={allumniProject.image}
                  alt={allumniProject.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </TiltCard>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary rounded text-[10px] font-bold uppercase tracking-wider">
                {allumniProject.categoryLabel}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-wider">
                {allumniProject.role}
              </span>
            </div>
            <h3 className="text-headline-md font-bold mb-6">{allumniProject.title}</h3>
            <p className="text-on-surface-variant mb-8 text-body-lg">
              {allumniProject.description}
            </p>
            <div className="flex gap-10 mb-10">
              <div>
                <div className="text-headline-md font-bold">{allumniProject.metrics.val1}</div>
                <div className="text-label-sm uppercase opacity-50">{allumniProject.metrics.label1}</div>
              </div>
              <div>
                <div className="text-headline-md font-bold">{allumniProject.metrics.val2}</div>
                <div className="text-label-sm uppercase opacity-50">{allumniProject.metrics.label2}</div>
              </div>
            </div>
            <Magnetic range={0.15}>
              <button 
                onClick={() => {
                  setSelectedProject(allumniProject);
                  setView('project-demo');
                }}
                className="group flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-label-sm transition-all duration-300 hover:gap-4 cursor-pointer"
              >
                View Details 
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </Magnetic>
          </div>
        </motion.div>

        {/* Project 3 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={revealVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-40"
        >
          <div>
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 bg-tertiary/10 border border-tertiary/20 text-tertiary rounded text-[10px] font-bold uppercase tracking-wider">
                {agenticProject.categoryLabel}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-wider">
                {agenticProject.role}
              </span>
            </div>
            <h3 className="text-headline-md font-bold mb-6">{agenticProject.title}</h3>
            <p className="text-on-surface-variant mb-8 text-body-lg">
              {agenticProject.description}
            </p>
            <div className="flex gap-10 mb-10">
              <div>
                <div className="text-headline-md font-bold">{agenticProject.metrics.val1}</div>
                <div className="text-label-sm uppercase opacity-50">{agenticProject.metrics.label1}</div>
              </div>
              <div>
                <div className="text-headline-md font-bold">{agenticProject.metrics.val2}</div>
                <div className="text-label-sm uppercase opacity-50">{agenticProject.metrics.label2}</div>
              </div>
            </div>
            <Magnetic range={0.15}>
              <button 
                onClick={() => {
                  setSelectedProject(agenticProject);
                  setView('project-demo');
                }}
                className="group flex items-center gap-2 text-tertiary font-bold uppercase tracking-widest text-label-sm transition-all duration-300 hover:gap-4 cursor-pointer"
              >
                View Project 
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </Magnetic>
          </div>
          <div className="relative aspect-video">
            <TiltCard>
              <div 
                className="p-2 h-full bg-surface-container-low glass-card rounded-xl flex flex-col hover:border-tertiary/40 hover:shadow-[0_0_20px_rgba(206,189,255,0.2)] transition-all duration-300 relative overflow-hidden group cursor-pointer"
                onClick={() => {
                  setSelectedProject(agenticProject);
                  setView('project-demo');
                }}
              >
                <img
                  src={agenticProject.image}
                  alt={agenticProject.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </TiltCard>
          </div>
        </motion.div>

        {/* See More Projects */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="text-center mt-20"
        >
          <Magnetic range={0.2}>
            <button 
              onClick={() => setView('projects')}
              className="px-8 py-3 border border-white/10 rounded-full text-label-sm uppercase tracking-widest hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer"
            >
              See More Projects
            </button>
          </Magnetic>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
