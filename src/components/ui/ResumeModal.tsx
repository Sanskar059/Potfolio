"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  X,
  Download,
  MapPin,
  Mail,
  GraduationCap,
  ChevronRight
} from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { cn } from "@/lib/utils";

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const [activeSection, setActiveSection] = useState<string>("intro");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "experience", label: "Work Experience" },
    { id: "studies", label: "Studies" },
    // { id: "skills", label: "Technical Skills" }
  ];

  // Track scroll position of modal content to update active sidebar link
  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      let currentSection = "intro";
      for (const section of sections) {
        const el = document.getElementById(`modal-${section.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          // If the element is near the top of the container
          if (rect.top - containerRect.top <= 120) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`modal-${id}`);
    if (el && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const elOffsetTop = el.offsetTop;
      container.scrollTo({
        top: elOffsetTop - 20,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-7xl h-[95vh] md:h-[92vh] bg-[#0c0c10]/95 border border-white/5 rounded-3xl flex flex-col z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.12);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
          }
        `}</style>
        {/* Subtle grid decoration */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'radial-gradient(rgba(192, 193, 255, 0.15) 1.2px, transparent 1.2px)',
            backgroundSize: '16px 16px'
          }}
        />

        {/* Floating background glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

        {/* Sticky Header Bar */}
        <div className="w-full flex justify-between items-center px-6 md:px-8 py-5 border-b border-white/5 bg-[#0c0c10]/80 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-wider text-white">Sanskar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/Sanskar-resume.pdf"
              download="Sanskar_Singh_Resume.pdf"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-full font-semibold uppercase tracking-wider text-[10px] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download Resume
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Grid: Left content, Right sidebar */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">

          {/* LEFT: Scrollable Content Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-16 scroll-smooth custom-scrollbar"
          >

            {/* 1. Introduction Section */}
            <section id="modal-intro" className="space-y-6 pt-2">
              {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Available for work
              </div> */}

              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-white">
                  Sanskar
                </h1>
                <p className="text-lg md:text-xl font-medium text-primary tracking-wider uppercase">
                  Full Stack Developer
                </p>
              </div>

              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-3xl font-body-md">
                Hi, I'm Sanskar Singh, a final-year Computer Science Engineering student at Madan Mohan Malaviya University of Technology, Gorakhpur. I build AI-powered products, full-stack web applications, and automation tools that solve real-world problems.
              </p>

              {/* Social Links Row */}
              <div className="flex flex-wrap gap-4 pt-2">

                <a
                  href="https://linkedin.com/in/sanskar-singh"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077B5]/10 border border-[#0077B5]/30 text-white/90 hover:text-white hover:bg-[#0077B5]/20 transition-all text-xs font-bold uppercase tracking-wider"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                  LinkedIn
                </a>
                <a
                  href="mailto:sanskar.singh059@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:text-white hover:bg-primary/20 transition-all text-xs font-bold uppercase tracking-wider"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>
            </section>

            <hr className="border-white/5" />

            {/* 2. Experience Section */}
            <section id="modal-experience" className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  Work Experience
                </span>
              </div>

              <div className="space-y-8">
                {/* Job 1 */}
                <div className="p-6 md:p-8 rounded-2xl bg-[#161622]/50 border border-white/5 hover:border-white/10 transition-all space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">Mocklingo</h4>
                      <p className="text-sm text-primary">Full Stack Intern</p>
                    </div>
                    <span className="self-start sm:self-auto px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-on-surface-variant font-semibold">
                      2026 - Present
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-on-surface-variant text-sm md:text-base leading-relaxed list-disc pl-5">
                    <li>Developed and maintained end-to-end blog functionality, including content management, dynamic routing, SEO optimization, and responsive UI implementation.</li>
                    <li>Enhanced platform SEO through metadata optimization, structured data implementation, and technical audits, contributing to increased organic visibility.</li>
                    <li className="hidden md:list-item">Built an admin demo page management system that enables non-technical users to create and manage website pages without developer intervention.</li>
                    <li className="hidden md:list-item">Designed and developed an ATS Resume Analyzer feature, helping users evaluate and improve resume compatibility with modern hiring systems.</li>
                    <li className="hidden md:list-item">Revamped multiple user-facing interfaces, improving usability, accessibility, and overall user experience across the platform.</li>
                  </ul>

                  {/* Mockup image */}
                  <div className="hidden md:block rounded-xl overflow-hidden border border-white/5 aspect-video w-full max-w-xl mx-auto relative group">
                    <img
                      src="/Mock/Screenshot%202026-06-23%20173522.png"
                      alt="Mocklingo UI Demo"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Job 2 */}
                <div className="p-6 md:p-8 rounded-2xl bg-[#161622]/50 border border-white/5 hover:border-white/10 transition-all space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">IEEE College Event</h4>
                      <p className="text-sm text-primary">Web Lead</p>
                    </div>
                    <span className="self-start sm:self-auto px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-on-surface-variant font-semibold">
                      2024
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-on-surface-variant text-sm md:text-base leading-relaxed list-disc pl-5">
                    <li>Architected and deployed a scalable web application supporting 1,000+ users with high-fidelity backend performance and efficient data handling.</li>
                    <li>Integrated WebSocket-based communications, reducing update latency and enabling seamless real-time interactions.</li>
                    <li className="hidden md:list-item">Created a real-time calculator platform with live leaderboards, automated score calculation, and leaderboard tracking for large-scale events.</li>
                    <li className="hidden md:list-item">Engineered a content management system for user administration, content moderation, analytics monitoring, and platform configuration.</li>
                  </ul>
                </div>

                {/* Job 3 */}
                <div className="p-6 md:p-8 rounded-2xl bg-[#161622]/50 border border-white/5 hover:border-white/10 transition-all space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">Smart India Hackathon</h4>
                      <p className="text-sm text-primary">Team Co-Lead</p>
                    </div>
                    <span className="self-start sm:self-auto px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-on-surface-variant font-semibold">
                      2024
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-on-surface-variant text-sm md:text-base leading-relaxed list-disc pl-5">
                    <li>Designed and developed Alumni Network Platform that connects students with alumni for job referrals, mentorship, and project collaboration, increasing community participation by 40%.</li>
                    <li>Implemented dynamic Gallery Manager and System for organizing and displaying institutional events and achievements, leading to a 30% increase in visitor engagement.</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-white/5" />

            {/* 3. Studies Section */}
            <section id="modal-studies" className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  Studies
                </span>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-[#161622]/50 border border-white/5 hover:border-white/10 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white leading-tight">
                      Madan Mohan Malviya University of technology
                    </h4>
                    <p className="text-sm text-on-surface-variant mt-1">
                      B.Tech in Computer Science Engineering
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-on-surface-variant font-semibold shrink-0 self-start sm:self-auto">
                  2022 - 2026
                </span>
              </div>
            </section>

            <hr className="border-white/5" />

            {/* 4. Technical Skills Section */}

          </div>

          {/* RIGHT: Sidebar Info (Fixed on desktop, stacks below on mobile) */}
          <div className="hidden md:flex w-full md:w-[380px] border-t md:border-t-0 md:border-l border-white/5 bg-[#0c0c10]/40 backdrop-blur-md p-6 md:p-8 flex-col justify-between shrink-0 overflow-y-auto custom-scrollbar">
            <div className="space-y-8">

              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-[#161622]/60 border border-white/5 text-left space-y-4 relative overflow-hidden group">
                {/* Glow behind photo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Profile Image - Large Rectangular layout */}
                <div className="w-full aspect-[3.5/6] overflow-hidden rounded-xl border border-white/10 relative z-10 shadow-lg bg-black/40 -mt-8">
                  <img
                    src="/Sanskar.jpeg"
                    alt="Sanskar Singh Portrait"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>

                <div className="relative z-10 px-1">
                  <h4 className="text-xl font-bold text-white tracking-tight">Sanskar</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5 font-medium">Full Stack Developer</p>

                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant/70 mt-3">
                    <MapPin className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                    <span>Gorakhpur/UP</span>
                  </div>
                </div>
              </div>

              {/* Languages Card */}
              <div className="p-5 rounded-2xl bg-[#161622]/40 border border-white/5 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Languages</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white">English</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white">Hindi</span>
                </div>
              </div>

              {/* On This Page Navigation Card (Desktop only) */}
              <div className="hidden md:block p-5 rounded-2xl bg-[#161622]/40 border border-white/5 space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant block">On This Page</span>
                <nav className="flex flex-col gap-2.5">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={cn(
                        "flex items-center gap-2.5 text-left text-xs font-semibold uppercase tracking-wider transition-colors py-1 cursor-pointer",
                        activeSection === sec.id
                          ? "text-primary font-bold"
                          : "text-on-surface-variant hover:text-white"
                      )}
                    >
                      <ChevronRight className={cn(
                        "w-3 h-3 transition-transform",
                        activeSection === sec.id ? "text-primary translate-x-0.5" : "text-transparent"
                      )} />
                      {sec.label}
                    </button>
                  ))}
                </nav>
              </div>

            </div>



          </div>

        </div>
      </motion.div>
    </div>
  );
}
