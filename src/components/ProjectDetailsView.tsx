"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectDetailsViewProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetailsView({ project, onBack }: ProjectDetailsViewProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  // Extract folder path based on project's configured image path
  const getProjectDir = () => {
    if (project.image) {
      const lastSlashIdx = project.image.lastIndexOf("/");
      if (lastSlashIdx !== -1) {
        return project.image.substring(0, lastSlashIdx);
      }
    }
    return `/${project.id}`;
  };

  const projectDir = getProjectDir();
  const videoSrc = `${projectDir}/video.mp4`;
  const imageSrc = project.image || `${projectDir}/image.png`;

  return (
    <div className="w-full bg-[#13131b] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-left">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-on-surface-variant hover:text-white mb-10 transition-colors font-semibold uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        {/* Header Tags & Metadata */}
        <div className="flex gap-2 mb-4">
          <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded text-[10px] font-bold uppercase tracking-wider">
            {project.categoryLabel}
          </span>
          <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-wider">
            {project.role}
          </span>
        </div>

        {/* Project Name */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          {project.title}
        </h2>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
          <div>
            <div className="text-[10px] uppercase opacity-40 font-semibold tracking-wider mb-1">
              Role
            </div>
            <div className="text-base font-bold text-white">{project.role}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase opacity-40 font-semibold tracking-wider mb-1">
              {project.metrics.label1}
            </div>
            <div className="text-base font-bold text-white">{project.metrics.val1}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase opacity-40 font-semibold tracking-wider mb-1">
              {project.metrics.label2}
            </div>
            <div className="text-base font-bold text-white">{project.metrics.val2}</div>
          </div>
          <div className="flex gap-4 items-center">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-full hover:bg-white/10 transition-colors"
              title="GitHub"
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
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-primary text-black rounded-full hover:bg-primary/95 hover:shadow-[0_0_15px_rgba(192,193,255,0.4)] transition-all"
              title="Live Link"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Project Media Showcase */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6">Project Media</h3>
          <ProjectMediaHover imageSrc={imageSrc} videoSrc={videoSrc} title={project.title} />
        </div>

        {/* Written Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Tech Stack */}
          <div>
            <h4 className="text-label-sm font-label-sm uppercase text-primary mb-6 tracking-widest">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/95"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="md:col-span-2">
            <h4 className="text-label-sm font-label-sm uppercase text-primary mb-6 tracking-widest">
              Detailed Case Study
            </h4>
            <p className="text-on-surface-variant leading-relaxed mb-6 font-body-md text-sm md:text-base">
              {project.detailedOverview}
            </p>
            <p className="text-on-surface-variant leading-relaxed font-body-md text-sm md:text-base">
              This solution involved strict performance benchmarks, specifically centering on microsecond updates, minimal React renders, hardware-accelerated transitions, and absolute interface accessibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   HOVER MEDIA CONTROLLER
   ========================================================================== */
interface ProjectMediaHoverProps {
  imageSrc: string;
  videoSrc: string;
  title: string;
}

function ProjectMediaHover({ imageSrc, videoSrc, title }: ProjectMediaHoverProps) {
  const [videoExists, setVideoExists] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoExists && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Video play failed:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/10 group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mesh overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 z-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(192, 193, 255, 0.15) 1.2px, transparent 1.2px)',
          backgroundSize: '8px 8px'
        }}
      />

      {/* Image element (Always displayed as background / fallback) */}
      <img
        src={imageSrc}
        alt={title}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out z-0",
          isHovered && videoExists ? "opacity-0 scale-105" : "opacity-100 scale-100"
        )}
        onError={(e) => {
          // Fallback if image doesn't exist yet
          e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";
        }}
      />

      {/* Video element */}
      {videoExists && (
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out z-10 pointer-events-none",
            isHovered ? "opacity-100" : "opacity-0"
          )}
          onError={() => {
            // Hide video if file is missing (404)
            setVideoExists(false);
          }}
        />
      )}

      {/* Hover prompt overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 pointer-events-none">
        <span className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold tracking-wider text-white uppercase shadow-lg animate-fade-in">
          {videoExists ? "Hover to Play Demo Video" : "Project Showcase"}
        </span>
      </div>
    </div>
  );
}
