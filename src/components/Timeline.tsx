import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CometCard } from '@/components/ui/comet-card';
import { Rocket, Terminal, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Magnetic from './Magnetic';

interface TimelineProps {
  openResume: () => void;
}

export default function Timeline({ openResume }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 60%']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const milestones = [
    {
      year: '2026',
      title: 'AI Product Builder',
      description:
        'Creating intelligent products that combine AI, automation, and real-time collaboration to solve practical problems at scale.',
      position: 'right',
      topPercent: 20,
      icon: <Rocket className="w-6 h-6 text-primary" />
    },
    {
      year: '2025',
      title: 'Full-Stack Developer',
      description:
        'Building end-to-end web applications with React, Node.js, MongoDB, Socket.IO, and cloud infrastructure while exploring AI integrations.',
      position: 'left',
      topPercent: 50,
      icon: <Terminal className="w-6 h-6 text-primary" />
    },
    {
      year: '2023',
      title: 'Coding Journey Begins',
      description:
        'Started learning programming fundamentals, problem solving, web development, and turning ideas into working software projects.',
      position: 'right',
      topPercent: 80,
      icon: <Globe className="w-6 h-6 text-primary" />
    }
  ];

  // SVG curved path (Bezier curve)
  // viewBox width is 100, height is 1000.
  // The path starts at x=50, y=0 and sways left/right through the dots at y=200, y=500, y=800.
  const pathD = "M 50,0 C 30,50 30,150 50,200 C 70,275 70,425 50,500 C 30,575 30,725 50,800 C 70,850 70,950 50,1000";

  return (
    <section ref={containerRef} id="career" className="w-full bg-background/65 backdrop-blur-md border-t border-white/5 relative z-10 overflow-hidden">
      <div className="py-32 px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto">
        <div className="flex flex-row justify-between items-center mb-28 border-b border-white/5 pb-6">
          <h2 className="text-headline-lg font-headline-lg text-white">Career Path</h2>
          <Magnetic range={0.25}>
            <button
              onClick={openResume}
              className="px-6 py-2 border border-white/10 hover:border-white/20 text-white rounded-full font-label-sm uppercase tracking-widest text-xs hover:bg-white/5 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            >
              Me
            </button>
          </Magnetic>
        </div>

        {/* Timeline container */}
        <div className="relative w-full h-[900px] md:h-[1100px]">
          {/* Responsive SVG Curved Path */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-16 md:w-[300px] -translate-x-1/2 z-0 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary, #c0c1ff)" />
                  <stop offset="50%" stopColor="var(--color-tertiary, #cebdff)" />
                  <stop offset="100%" stopColor="var(--color-secondary, #4cd7f6)" />
                </linearGradient>

                <mask id="timeline-mask">
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    style={{ pathLength: scaleY }}
                  />
                </mask>
              </defs>

              {/* Background static dashed path */}
              <path
                d={pathD}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />

              {/* Active scroll-animated glowing dashed path */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#line-gradient)"
                strokeWidth="3"
                strokeDasharray="6 6"
                mask="url(#timeline-mask)"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(192, 193, 255, 0.8))",
                }}
              />
            </svg>
          </div>

          {/* Milestones */}
          {milestones.map((item, idx) => {
            const isRight = item.position === 'right';

            return (
              <div
                key={idx}
                className="absolute left-0 right-0 -translate-y-1/2 flex items-center"
                style={{ top: `${item.topPercent}%` }}
              >
                {/* Glowing dot indicator */}
                <motion.div
                  initial={{
                    scale: 0.8,
                    backgroundColor: "rgba(19, 19, 27, 1)",
                    borderColor: "rgba(255, 255, 255, 0.1)"
                  }}
                  whileInView={{
                    scale: [0.8, 1.25, 1],
                    backgroundColor: "#ffffff",
                    borderColor: "var(--color-primary, #c0c1ff)",
                    boxShadow: "0 0 15px rgba(192, 193, 255, 0.8), 0 0 30px rgba(128, 131, 255, 0.4)",
                  }}
                  viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 -translate-x-1/2 z-20 cursor-pointer"
                />

                {/* Card Container with Scroll Reveal */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isRight ? 40 : -40,
                    y: 20
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1] as const,
                    delay: 0.1
                  }}
                  className={cn(
                    "w-[calc(100%-5rem)] md:w-[44%] z-10",
                    isRight
                      ? "ml-16 md:ml-auto md:mr-0 md:pl-16"
                      : "ml-16 md:ml-0 md:mr-auto md:pr-16"
                  )}
                >
                  <CometCard className="w-full">
                    <div className="w-full text-left rounded-2xl border border-white/8 bg-[#16161f]/90 p-6 md:p-8 backdrop-blur-md preserve-3d">
                      {/* Icon container */}
                      <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl mb-6 text-primary shadow-[0_0_15px_rgba(192,193,255,0.05)]">
                        {item.icon}
                      </div>

                      {/* Year */}
                      <span className="text-primary font-mono text-sm font-semibold mb-1 block">
                        {item.year}
                      </span>

                      {/* Title */}
                      <h4 className="text-white text-xl md:text-2xl font-bold mb-3">
                        {item.title}
                      </h4>

                      {/* Colored Divider Line */}
                      <div className="w-12 h-[2px] bg-primary mb-4 rounded-full" />

                      {/* Description */}
                      <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-body-md">
                        {item.description}
                      </p>
                    </div>
                  </CometCard>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
