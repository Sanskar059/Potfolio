export default function Marquee() {
  const items = ['React', 'Next.js', 'Javascript', 'Three.js', 'Node.js', 'Docker', 'Tailwindcss', 'Typescript'];
  const repeatedItems = [...items, ...items, ...items, ...items]; // repeat to cover viewport width

  return (
    <div className="w-full bg-background/65 backdrop-blur-md border-y border-white/5 py-10 overflow-hidden relative z-10">
      <div className="flex animate-marquee whitespace-nowrap gap-12 items-center w-max">
        {repeatedItems.map((item, idx) => (
          <span key={idx} className="flex items-center gap-12">
            <span className="text-headline-md font-bold text-white/20 uppercase tracking-[0.2em]">
              {item}
            </span>
            <span className="text-headline-md font-bold text-primary uppercase tracking-[0.2em]">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
