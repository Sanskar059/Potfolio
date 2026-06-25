import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="w-full bg-background relative z-10" id="about">
      <div className="py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-20"
      >
        <motion.div variants={itemVariants}>
          <blockquote className="text-headline-lg font-display-lg-mobile md:text-[64px] font-bold leading-tight tracking-tighter text-white">
            I translate <span className="text-primary italic">complex problems</span> into simple, elegant digital systems.
          </blockquote>
        </motion.div>
        
        <div className="space-y-12">
          <motion.div variants={itemVariants} className="space-y-6 text-body-lg text-on-surface-variant">
            <p>
              I'm Sanskar Singh, a Frontend Engineer obsessed with the intersection of design and engineering. My journey began with a curiosity for how the web works, which evolved into a career building high-impact products.
            </p>
            <p>
              I focus on building performant, accessible, and beautiful interfaces. Whether it's a 2D spatial audio chat application or a large-scale analytics platform, I bring a detail-oriented approach to every codebase.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <h5 className="text-label-sm font-label-sm uppercase text-primary tracking-widest">
              Milestones
            </h5>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <span className="text-primary font-bold">01</span>
                <div>
                  <h6 className="font-bold mb-1">Frontend Engineer at TechFlow</h6>
                  <p className="text-on-surface-variant text-body-md">
                    Leading the migration of a legacy dashboard to a modern Next.js architecture.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="text-primary font-bold">02</span>
                <div>
                  <h6 className="font-bold mb-1">Fullstack Developer (Freelance)</h6>
                  <p className="text-on-surface-variant text-body-md">
                    Shipped 10+ custom solutions for early-stage startups and creative agencies.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
