import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

interface ContactProps {
  setView: (view: 'home' | 'projects' | 'project-demo' | 'contact-form') => void;
}

export default function Contact({ setView }: ContactProps) {
  const socials = [
    { name: 'LinkedIn', href: '#' },
    { name: 'X / Twitter', href: '#' },
    { name: 'Dribbble', href: '#' },
    { name: 'Instagram', href: '#' }
  ];

  return (
    <section className="py-32 md:py-48 bg-background/65 backdrop-blur-md border-t border-white/5 relative overflow-hidden z-10" id="contact">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-label-sm font-label-sm uppercase text-primary mb-8 block tracking-widest"
        >
          Get in touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-display-lg-mobile md:text-[80px] font-bold mb-16 tracking-tighter leading-none"
        >
          Let's build something <br className="hidden md:block" />{' '}
          <span className="text-primary italic">worth using.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20"
        >
          <Magnetic range={0.25}>
            <button
              onClick={() => setView('contact-form')}
              className="w-full md:w-auto bg-white text-background px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] transition-all duration-300 text-center block cursor-pointer"
            >
              Email Me
            </button>
          </Magnetic>

          <Magnetic range={0.25}>
            <a
              className="w-full md:w-auto border border-white/10 px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] text-on-surface transition-all duration-300 text-center block cursor-pointer"
              href="https://github.com/Sanskar059"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Profile
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center gap-8 items-center border-t border-white/5 pt-12 flex-wrap"
        >
          {socials.map((social) => (
            <Magnetic key={social.name} range={0.15}>
              <a
                className="text-on-surface-variant hover:text-primary transition-colors font-label-sm uppercase tracking-widest block py-2"
                href={social.href}
              >
                {social.name}
              </a>
            </Magnetic>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
