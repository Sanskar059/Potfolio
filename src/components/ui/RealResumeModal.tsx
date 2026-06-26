"use client";
import { motion } from "framer-motion";
import { X, Download, FileText } from "lucide-react";

interface RealResumeModalProps {
  onClose: () => void;
}

export default function RealResumeModal({ onClose }: RealResumeModalProps) {
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
        className="relative w-full max-w-5xl h-[90vh] bg-[#0c0c10]/95 border border-white/5 rounded-3xl flex flex-col z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
      >
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
            <span className="text-lg font-bold tracking-wider text-white">My Resume</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/Sanskar-resume.pdf"
              download="Sanskar_Singh_Resume.pdf"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded-full font-semibold uppercase tracking-wider text-[10px] transition-all cursor-pointer shadow-[0_0_10px_rgba(192,193,255,0.3)] font-label-sm"
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

        {/* Main Content Area */}
        <div className="flex-1 w-full p-4 md:p-6 relative z-10 flex flex-col">
          <div className="flex-1 w-full relative overflow-hidden rounded-2xl bg-[#161622]/40 border border-white/5 flex items-center justify-center">
            {/* Desktop PDF Viewer */}
            <iframe
              src="/Sanskar-resume.pdf"
              className="hidden md:block w-full h-full border-none rounded-xl"
              title="Sanskar Singh Resume PDF"
            />
            
            {/* Mobile Fallback View */}
            <div className="md:hidden flex flex-col items-center justify-center p-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <FileText className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Sanskar's Resume</h4>
                <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed font-body-md">
                  Interactive preview is optimized for desktop screen widths. Tap below to download or view the PDF directly.
                </p>
              </div>
              <a
                href="/Sanskar-resume.pdf"
                download="Sanskar_Singh_Resume.pdf"
                className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-on-primary px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-[0_0_15px_rgba(192,193,255,0.4)]"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
