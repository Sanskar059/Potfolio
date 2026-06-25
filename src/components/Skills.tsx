import { motion } from 'framer-motion';
import { Layers, Database, Terminal } from 'lucide-react';
import { Project3DCard } from './ui/project-3d-card';

interface SkillsProps {
  onExplore: (category: 'frontend' | 'backend' | 'tools') => void;
}

export default function Skills({ onExplore }: SkillsProps) {
  const frontend = [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
    'Framer Motion', 'Three.js', 'Redux / Zustand'
  ];

  const backend = ['Node.js', 'PostgreSQL', 'WebSockets', 'REST / GraphQL'];

  const tools = ['Git / GitHub', 'Docker', 'Vercel', 'Figma'];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="py-32 bg-[#13131b]/65 backdrop-blur-md relative z-10 border-t border-white/5" id="skills">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-label-sm font-label-sm uppercase text-primary mb-4 block tracking-widest">
            Expertise
          </span>
          <h2 className="text-headline-lg font-headline-lg text-white">Technical Toolkit</h2>
        </motion.div>

        {/* 3D Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {/* Frontend Card */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Project3DCard
              title="Frontend"
              description="Crafting fluid, high-performance web applications with modular component architecture and rich interactive styling."
              skills={frontend}
              icon={<Layers className="w-6 h-6 text-primary" />}
              gradientFrom="from-primary/20"
              actionText="Explore Frontend"
              onActionClick={() => onExplore('frontend')}
            />
          </motion.div>

          {/* Backend Card */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Project3DCard
              title="Backend"
              description="Building secure, highly-scalable API endpoints, relational database schemas, and server-side logic architectures."
              skills={backend}
              icon={<Database className="w-6 h-6 text-secondary" />}
              gradientFrom="from-secondary/20"
              actionText="Explore Backend"
              onActionClick={() => onExplore('backend')}
            />
          </motion.div>

          {/* Tools Card */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Project3DCard
              title="Tools"
              description="Managing cloud-native continuous integration workflows, virtualized containers, and interface mockups."
              skills={tools}
              icon={<Terminal className="w-6 h-6 text-tertiary" />}
              gradientFrom="from-tertiary/20"
              actionText="Explore Tools"
              onActionClick={() => onExplore('tools')}
            />
          </motion.div>
        </motion.div>

        {/* Philosophy / Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card max-w-4xl mx-auto p-8 md:p-10 rounded-2xl border border-white/5 bg-[#151522]/50 hover:border-primary/20 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <p className="text-body-lg italic opacity-85 leading-relaxed text-center relative z-10 text-white">
            "I believe the best software isn't just functional, but emotional. Every interaction, every pixel, and every millisecond of latency contributes to the user's perception of quality."
          </p>
        </motion.div>

      </div>
    </section>
  );
}
