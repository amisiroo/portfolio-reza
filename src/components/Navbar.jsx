import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Send, Menu, X } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NAVBAR_H = 70; // px — matches fixed header height
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - NAVBAR_H;
      smoothScrollTo(targetY, 450);
    }
    setIsOpen(false);
  };

  const navLinks = [
    { label: '//PROFILE', href: '#profile' },
    { label: '//EXPERIENCE', href: '#experience' },
    { label: '//SKILLS', href: '#skills' },
    { label: '//SIMULATOR', href: '#architecture' },
    { label: '//TERMINAL', href: '#terminal' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
      scrolled
        ? 'bg-[#050507]/95 backdrop-blur-md border-b border-zinc-800 py-2.5 shadow-xl'
        : 'bg-[#050507]/80 backdrop-blur-sm border-b border-zinc-900 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Far Left: Brand */}
        <div className="flex items-center">
          <a href="#profile" onClick={(e) => scrollToSection(e, '#profile')} className="flex items-center gap-1 group">
            <div className="w-7 h-7 bg-black border border-[#ccff00] flex items-center justify-center font-mono-code font-black text-sm text-[#ccff00] shadow-[2px_2px_0px_#ccff00] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-transform">
              A
            </div>
            <span className="font-mono-code font-bold text-sm text-white tracking-wider ml-1">
              misiroo
            </span>
          </a>
        </div>

        {/* Center: Compact Navigation */}
        <nav className="hidden md:flex items-center gap-5 font-mono-code text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-zinc-400 hover:text-[#ccff00] transition-colors py-1 hover:border-b-2 hover:border-[#ccff00]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Far Right: DISPATCH CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="flex items-center gap-1.5 text-xs font-mono-code font-bold bg-[#ccff00] text-black border border-white px-3.5 py-1.5 shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#ffffff] hover:translate-y-[-1px] transition-all duration-200 ease-out active:scale-[0.98]"
          >
            <span>DISPATCH</span>
            <Send className="w-3 h-3 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-zinc-300 hover:text-[#ccff00] border border-zinc-800 bg-[#0c0c12] transition-all duration-200 ease-out active:scale-[0.98]"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0f] border-b-2 border-[#ccff00] px-6 py-4 space-y-3 font-mono-code text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block text-zinc-300 hover:text-[#ccff00] py-1 border-b border-zinc-800/80 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="text-center text-xs font-bold bg-[#ccff00] text-black py-2 transition-all duration-200 ease-out active:scale-[0.98]"
            >
              DISPATCH // CONTACT
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
