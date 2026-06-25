import React from 'react';
import Magnetic from './Magnetic';

interface NavigationProps {
  setView: (view: 'home' | 'projects' | 'project-demo' | 'contact-form') => void;
  currentView: 'home' | 'projects' | 'project-demo' | 'contact-form';
  openResume: () => void;
}

export default function Navigation({ setView, currentView, openResume }: NavigationProps) {
  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#career' }, // Scroll to career path
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (currentView !== 'home') {
      setView('home');
      // Wait for home page to render before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (currentView !== 'home') {
      setView('home');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop w-full">
        <span 
          onClick={handleLogoClick}
          className="font-headline-md text-headline-md font-bold text-on-surface tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
        >
          SANSKAR
        </span>
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              className="text-on-surface-variant hover:text-white transition-colors duration-300 font-body-md text-body-md cursor-pointer"
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <Magnetic range={0.25}>
          <button 
            onClick={openResume}
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm uppercase tracking-widest hover:shadow-[0_0_15px_rgba(192,193,255,0.5)] transition-all duration-300 cursor-pointer"
          >
            Resume
          </button>
        </Magnetic>
      </div>
    </nav>
  );
}
