export default function Footer() {
  return (
    <footer className="w-full bg-background/65 backdrop-blur-md relative z-10 border-t border-white/5">
      <div className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="font-headline-md text-headline-md text-on-surface font-bold tracking-tighter">
            SANSKAR.
          </span>
          <p className="text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant">
            © 2024 PORTFOLIO — FRONTEND DEVELOPER
          </p>
          <div className="flex gap-6">
            <span className="text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant">
              Built with React &amp; Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
