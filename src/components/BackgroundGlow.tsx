import { motion } from 'framer-motion';

export default function BackgroundGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Left Glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(192, 193, 255, 0.15) 0%, rgba(19, 19, 27, 0) 70%)'
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Top Right/Mid Glow */}
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(76, 215, 246, 0.08) 0%, rgba(19, 19, 27, 0) 70%)'
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Bottom Center Glow */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(192, 193, 255, 0.1) 0%, rgba(19, 19, 27, 0) 70%)'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />
    </div>
  );
}
