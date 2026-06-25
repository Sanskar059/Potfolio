"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-4xl h-[85vh] bg-[#13131b]/95 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col z-10 shadow-2xl overflow-hidden"
      >
        {/* Subtle grid decoration */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(192, 193, 255, 0.15) 1.2px, transparent 1.2px)',
            backgroundSize: '8px 8px'
          }}
        />

        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Sanskar Singh</h3>
              <p className="text-xs text-on-surface-variant">Resume Preview</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button (Large Desktop) */}
            <a
              href="/Sanskar-resume.pdf"
              download="Sanskar_Singh_Resume.pdf"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-black px-5 py-2.5 rounded-full font-label-sm uppercase tracking-widest text-xs font-bold hover:shadow-[0_0_15px_rgba(192,193,255,0.4)] transition-shadow duration-300 cursor-pointer"
            >
              <Download className="w-4 h-4 text-black" />
              Download PDF
            </a>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Bar for Mobile */}
        <div className="md:hidden flex flex-col gap-3 mb-6 relative z-10">
          <a
            href="/Sanskar-resume.pdf"
            download="Sanskar_Singh_Resume.pdf"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-black py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Download className="w-4 h-4 text-black" />
            Download Resume PDF
          </a>
          <a
            href="/Sanskar-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-white/10 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            Open in New Tab
          </a>
        </div>

        {/* Content Section (iframe or Mobile Fallback) */}
        <div className="flex-1 bg-black/40 border border-white/5 rounded-xl overflow-hidden relative z-10">
          {isMobile ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <FileText className="w-16 h-16 text-primary/45 mb-4 animate-pulse" />
              <h4 className="text-white font-bold mb-2">Mobile PDF Viewer</h4>
              <p className="text-on-surface-variant text-sm max-w-sm mb-6 leading-relaxed">
                Mobile browsers often block in-page PDF embeds. Click the buttons above to open the resume directly in a new window or save it to your device.
              </p>
            </div>
          ) : (
            <iframe
              src="/Sanskar-resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
              title="Sanskar Singh Resume"
              className="w-full h-full border-0"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
