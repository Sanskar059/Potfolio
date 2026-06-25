import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Magnetic from './Magnetic';

interface HeroProps {
  setView: (view: 'home' | 'projects' | 'project-demo' | 'contact-form') => void;
}

export default function Hero({ setView }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    const totalFrames = 150;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/Hero/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = () => {
        // Decode image asynchronously to prevent thread blocking during scroll animation
        if (img.decode) {
          img.decode()
            .then(() => {
              loadedCount++;
              if (loadedCount === totalFrames) {
                setImagesLoaded(true);
              }
            })
            .catch(() => {
              loadedCount++;
              if (loadedCount === totalFrames) {
                setImagesLoaded(true);
              }
            });
        } else {
          loadedCount++;
          if (loadedCount === totalFrames) {
            setImagesLoaded(true);
          }
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Track global window scroll position
  const { scrollY } = useScroll();

  // Map absolute scroll pixels (0 to 600px) to layout progress (0 to 1)
  const progressVal = useTransform(scrollY, [0, 600], [0, 1]);

  // Math-based responsive interpolation for CSS properties
  const width = useTransform(progressVal, (t) => {
    if (isMobile) {
      return `${90 + t * 10}vw`;
    }
    return `calc(400px + ${t} * (100vw - 400px))`;
  });

  const height = useTransform(progressVal, (t) => {
    if (isMobile) {
      return `${300 + t * (window.innerHeight - 300)}px`;
    }
    return `calc(400px + ${t} * (100vh - 400px))`;
  });

  const right = useTransform(progressVal, (t) => {
    if (isMobile) {
      return `${5 * (1 - t)}vw`;
    }
    return `calc(10vw * ${1 - t})`;
  });

  const top = useTransform(progressVal, (t) => {
    if (isMobile) {
      return `${55 - t * 55}%`;
    }
    return `${50 - t * 50}%`;
  });

  const y = useTransform(progressVal, (t) => {
    return `${-50 + t * 50}%`;
  });

  const borderRadius = useTransform(progressVal, (t) => {
    return `${24 * (1 - t)}px`;
  });

  const opacity = useTransform(progressVal, (t) => {
    if (isMobile) {
      return 0.25 - t * 0.15; // lower opacity on mobile so text stands out clearly
    }
    return 0.9 - t * 0.6;
  });

  // Map scroll (0 to 800px) to play the 150 frame sequence
  const frameIndexVal = useTransform(scrollY, [0, 800], [0, 149]);

  // Optimized Render: Only clear and draw on existing canvas bounds
  const renderCanvas = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    // Do NOT resize canvas.width/height on scroll to prevent GPU rendering lag
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'low'; // Bilinear is hardware accelerated, high quality was causing scroll lag

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Draw current frame on scroll
  useMotionValueEvent(frameIndexVal, 'change', (latest) => {
    const frameIndex = Math.min(149, Math.floor(latest));
    renderCanvas(frameIndex);
  });

  // Handle canvas sizing and window resizing (once on resize/load, NOT on scroll)
  useEffect(() => {
    let lastWidth = 0;
    let lastHeight = 0;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;

        // Ignore minor height changes (like mobile browser address bar toggling) to avoid canvas resize lags on mobile scroll
        const widthChanged = currentWidth !== lastWidth;
        const heightChanged = Math.abs(currentHeight - lastHeight) > 100;

        if (lastWidth !== 0 && !widthChanged && !heightChanged) {
          return;
        }

        lastWidth = currentWidth;
        lastHeight = currentHeight;

        // Cap canvas internal resolution to max 1600px width to avoid GPU/fill-rate lag on high-res displays
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const maxResolutionWidth = 1600;

        if (currentWidth > maxResolutionWidth) {
          const scale = maxResolutionWidth / currentWidth;
          canvas.width = maxResolutionWidth;
          canvas.height = Math.round(currentHeight * scale);
        } else {
          canvas.width = Math.round(currentWidth * dpr);
          canvas.height = Math.round(currentHeight * dpr);
        }

        const currentProgress = frameIndexVal.get();
        const frameIndex = Math.min(149, Math.floor(currentProgress));
        renderCanvas(frameIndex);
      }
    };

    if (imagesLoaded && images.length > 0) {
      handleResize();
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, images]);

  const headlineWords = ['Sanskar', 'Singh',];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0] as const,
      },
    },
  };

  // Fade out Hero text on scroll (0 to 400px) — slides DOWN to stay clear of navbar
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, 40]);

  return (
    <section className="relative h-[180vh] w-full z-0 bg-transparent" id="home">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pt-28 pb-20 md:pt-36 md:pb-24">

        {/* Canvas container (fixed viewport background) */}
        <motion.div
          style={{
            position: 'fixed',
            width,
            height,
            right,
            top,
            y,
            borderRadius,
            opacity,
            zIndex: 0,
            willChange: 'width, height, top, right, transform',
          }}
          className="overflow-hidden bg-surface-container-low border border-white/5 shadow-2xl pointer-events-none max-sm:-mt-20"
        >
          <canvas ref={canvasRef} className="w-full h-full object-cover block" />

          {/* Dotted Grid Overlay to mask low-res upscaling and add high-tech aesthetics */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(192, 193, 255, 0.22) 1.2px, transparent 1.2px)',
              backgroundSize: '6px 6px'
            }}
          />

          {!imagesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
              <span className="text-label-sm font-label-sm uppercase tracking-widest text-primary animate-pulse">
                Loading Sequences...
              </span>
            </div>
          )}
        </motion.div>

        {/* Hero content layer */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-20 items-center relative z-10 pointer-events-none mt-20 sm:mt-32 lg:mt-96">
          <motion.div style={{ opacity: textOpacity, y: textY }} className="pointer-events-auto">

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-label-sm font-label-sm uppercase text-primary">
                Available for work
              </span>
            </div>

            {/* Staggered Headline */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-8 tracking-tighter text-on-surface"
            >
              {headlineWords.map((word, idx) => (
                <span key={idx} className="word-reveal inline-block overflow-hidden mr-3 align-top">
                  <motion.span
                    variants={wordVariants}
                    className={`inline-block ${word === 'inevitable.' ? 'text-primary italic' : ''}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
            <p className="text-label-sm font-label-sm uppercase tracking-widest text-primary mb-5">
              Full Stack Developer
            </p>
            <div className="w-16 h-px bg-primary/30 mb-6" />

            {/* Description */}
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mb-12">
              From database schema to pixel-perfect UI —
              <span className="text-on-surface font-medium">
                {' '}building products end to end with care and velocity.
              </span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Magnetic range={0.2}>
                <button
                  onClick={() => setView('contact-form')}
                  className="bg-gradient-to-r from-primary to-secondary text-on-secondary-fixed px-10 py-4 rounded-full font-label-sm uppercase tracking-widest shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:shadow-[0_0_30px_rgba(192,193,255,0.6)] transition-shadow duration-300 cursor-pointer"
                >
                  Let's Talk
                </button>
              </Magnetic>
              <Magnetic range={0.2}>
                <button
                  onClick={() => setView('projects')}
                  className="border border-white/10 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] text-on-surface px-10 py-4 rounded-full font-label-sm uppercase tracking-widest transition-all cursor-pointer"
                >
                  View Projects
                </button>
              </Magnetic>
            </div>
          </motion.div>

          {/* Placeholder for layout alignment on desktop */}
          <div className="w-full aspect-square max-w-[400px] mx-auto opacity-0 pointer-events-none hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
