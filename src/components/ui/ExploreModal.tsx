"use client";
import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

interface SkillDetail {
  name: string;
  description: string;
  level: "Expert" | "Advanced" | "Intermediate";
  pct: number;
}

interface ExploreModalProps {
  category: "frontend" | "backend" | "tools";
  onClose: () => void;
}

export default function ExploreModal({ category, onClose }: ExploreModalProps) {
  const data: Record<string, { title: string; subtitle: string; skills: SkillDetail[] }> = {
    frontend: {
      title: "Frontend Development",
      subtitle: "Crafting interactive interfaces, fluid animations, and robust clients.",
      skills: [
        { name: "React & Next.js", description: "Expert in Virtual DOM, Server Components, SSR/SSG architectures, and custom hooks.", level: "Expert", pct: 95 },
        { name: "TypeScript", description: "Advanced type safety, generics, utility types, and compiler optimizations.", level: "Advanced", pct: 88 },
        { name: "Tailwind CSS", description: "Utility-first layouts, responsive grids, custom configuration, and design systems.", level: "Expert", pct: 95 },
        { name: "Framer Motion", description: "Perpetual micro-animations, scroll-linked path indicators, and layout transitions.", level: "Expert", pct: 90 },
        { name: "Three.js / WebGL", description: "3D scene composition, hardware-accelerated rendering, shaders, and cameras.", level: "Intermediate", pct: 65 },
        { name: "State Management", description: "Zustand, Redux Toolkit, and Context API for global reactive stores.", level: "Advanced", pct: 85 },
        { name: "Core Web (HTML5/CSS3/JS)", description: "Semantic markup, modern layout models (Flexbox, Grid), and raw DOM scripting.", level: "Expert", pct: 98 }
      ]
    },
    backend: {
      title: "Backend Architecture",
      subtitle: "Building scalable servers, efficient database schemas, and robust APIs.",
      skills: [
        { name: "Node.js & Express.js", description: "Asynchronous runtime programming, middleware routing, and REST service builds.", level: "Advanced", pct: 88 },
        { name: "PostgreSQL & SQL", description: "Relational modeling, constraint keys, indexing, and query optimizations.", level: "Advanced", pct: 84 },
        { name: "Supabase & Firebase", description: "Rapid authentication flows, real-time database sync, and storage Buckets.", level: "Advanced", pct: 90 },
        { name: "GraphQL & REST Design", description: "API design principles, payload schemas, query resolvers, and pagination models.", level: "Advanced", pct: 86 },
        { name: "WebSockets & Socket.io", description: "Bi-directional real-time communication for messaging and collaboration.", level: "Advanced", pct: 82 },
        { name: "P2P WebRTC", description: "Interactive peer connection rooms, ICE networking, and browser media management.", level: "Intermediate", pct: 60 }
      ]
    },
    tools: {
      title: "DevOps & Tooling",
      subtitle: "Streamlining workflow integration, staging pipelines, and visual collaboration.",
      skills: [
        { name: "Git & GitHub", description: "Branching models, conflict resolution, Pull Requests, and automated CI actions.", level: "Expert", pct: 92 },
        { name: "Docker", description: "Containerized environments for consistent local dev testing and cloud alignment.", level: "Intermediate", pct: 70 },
        { name: "Cloud Deployment (Vercel/Netlify)", description: "Production bundling, edge networking, analytics checking, and custom DNS settings.", level: "Expert", pct: 94 },
        { name: "Figma", description: "Mockup reviews, design components mapping, layouts exporting, and style systems extraction.", level: "Advanced", pct: 85 },
        { name: "API Testing (Postman/Jest)", description: "Endpoint verification, unit checking, integration tests, and automated validation.", level: "Advanced", pct: 80 }
      ]
    }
  };

  const selected = data[category];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#161622]/90 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col z-10 overflow-hidden"
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(192, 193, 255, 0.15) 1.2px, transparent 1.2px)',
            backgroundSize: '8px 8px'
          }}
        />

        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{selected.title}</h3>
            <p className="text-on-surface-variant text-sm">{selected.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-6 relative z-10" />

        {/* Skills list (scrollable) */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 relative z-10 custom-scrollbar">
          {selected.skills.map((skill, idx) => (
            <div
              key={idx}
              className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <h4 className="font-bold text-white">{skill.name}</h4>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 border border-primary/25 text-primary rounded">
                  {skill.level}
                </span>
              </div>
              <p className="text-on-surface-variant text-sm mb-3 leading-relaxed">
                {skill.description}
              </p>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.pct}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
