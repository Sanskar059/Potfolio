"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Project, projectsData } from "@/data/projects";
import { CometCard } from "@/components/ui/comet-card";
import { cn } from "@/lib/utils";

interface AllProjectsViewProps {
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

export default function AllProjectsView({ onBack, onSelectProject }: AllProjectsViewProps) {
  const [filter, setFilter] = useState<"all" | "frontend" | "fullstack" | "ai">("all");

  const filteredProjects = projectsData.filter(
    (p) => filter === "all" || p.category === filter
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="w-full bg-[#13131b] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background radial sways */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-on-surface-variant hover:text-white mb-10 transition-colors font-semibold uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Heading */}
        <div className="mb-16">
          <span className="text-label-sm font-label-sm uppercase text-primary mb-4 block tracking-widest">
            Portfolio
          </span>
          <h2 className="text-display-lg-mobile md:text-headline-lg font-bold text-white tracking-tighter">
            All Projects
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-16">
          {(["all", "frontend", "fullstack", "ai"] as const).map((cat) => {
            const label =
              cat === "all"
                ? "All"
                : cat === "frontend"
                ? "Frontend"
                : cat === "fullstack"
                ? "Full Stack"
                : "AI / ML";
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full border text-xs font-bold uppercase tracking-widest transition-all",
                  isActive
                    ? "bg-primary border-primary text-black shadow-[0_0_15px_rgba(192,193,255,0.4)]"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-on-surface-variant hover:text-white"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          key={filter} // Forces remount animation on filter change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-12"
        >
          {filteredProjects.map((project, idx) => (
            <motion.div key={project.id} variants={cardVariants} className="w-full">
              <CometCard className="w-full h-full">
                <div className={cn(
                  "w-full bg-[#161622]/90 border border-white/10 rounded-2xl flex flex-col md:flex-row backdrop-blur-md preserve-3d group text-left overflow-hidden min-h-[400px]",
                  idx % 2 === 1 && "md:flex-row-reverse"
                )}>
                  {/* Image Side */}
                  <div 
                    onClick={() => onSelectProject(project)}
                    className="w-full md:w-1/2 min-h-[250px] md:min-h-auto relative overflow-hidden bg-white/5 cursor-pointer group/img"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Subtle gradients to blend the image border */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-t from-[#161622] via-transparent to-transparent md:bg-gradient-to-r transition-opacity duration-300 group-hover/img:opacity-80",
                      idx % 2 === 1 ? "md:from-[#161622]/60 md:to-transparent" : "md:from-transparent md:to-[#161622]/60"
                    )} />
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      {/* Header tags */}
                      <div className="flex gap-2 mb-4">
                        <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded text-[9px] font-bold uppercase tracking-wider">
                          {project.categoryLabel}
                        </span>
                        <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-on-surface-variant rounded text-[9px] font-bold uppercase tracking-wider">
                          {project.role}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-body-md">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Metrics row */}
                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mb-6">
                        <div>
                          <div className="text-base font-bold text-white">
                            {project.metrics.val1}
                          </div>
                          <div className="text-[10px] uppercase opacity-40 font-semibold tracking-wider">
                            {project.metrics.label1}
                          </div>
                        </div>
                        <div>
                          <div className="text-base font-bold text-white">
                            {project.metrics.val2}
                          </div>
                          <div className="text-[10px] uppercase opacity-40 font-semibold tracking-wider">
                            {project.metrics.label2}
                          </div>
                        </div>
                      </div>

                      {/* Bottom buttons */}
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => onSelectProject(project)}
                          className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-widest group/btn hover:gap-3 transition-all"
                        >
                          Explore Demo
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-on-surface-variant hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg
                            role="img"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CometCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
