import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Terminal, Send, Menu, X, Shield, Activity, Cpu, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '//01_PROFILE', href: '#profile' },
    { label: '//02_EXPERIENCE', href: '#experience' },
    { label: '//03_SKILLS', href: '#skills' },
    { label: '//04_ARCHITECTURE', href: '#architecture' },
    { label: '//05_CLI_SHELL', href: '#terminal' },
    { label: '//06_ACHIEVEMENTS', href: '#achievements' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-[#050507]/95 backdrop-blur-md border-b-2 border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
        : 'bg-[#050507]/80 backdrop-blur-sm border-b border-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#profile" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 bg-black border-2 border-[#ccff00] flex items-center justify-center font-mono-code font-black text-lg text-[#ccff00] shadow-[2px_2px_0px_#ccff00] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
              R
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ccff00]"></span>
            </span>
          </div>
          <div>
            <div className="font-mono-code font-bold text-sm text-white tracking-wider flex items-center gap-2">
              <span className="group-hover:text-[#ccff00] transition-colors">REZA_SYSTEM_OS</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#12121a] text-[#ccff00] border border-zinc-800 font-mono-code">v3.0</span>
            </div>
            <div className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>ITB STI</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">SYS_INTEGRATION</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 font-mono-code text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-zinc-400 hover:text-[#ccff00] transition-colors py-1 relative hover:border-b-2 hover:border-[#ccff00] tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-[#0c0c12] border border-zinc-800 text-[10px] font-mono-code text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
            <span>SYSTEM: <strong>NOMINAL</strong></span>
          </div>

          <a
            href={personalInfo.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono-code font-bold bg-[#12121c] text-zinc-200 border border-zinc-700 px-3 py-1.5 hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
          >
            <span>WHATSAPP</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-mono-code font-bold bg-[#ccff00] text-black border-2 border-white px-3.5 py-1.5 shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#ffffff] hover:translate-y-[-1px] transition-all"
          >
            <span>DISPATCH // CONTACT</span>
            <Send className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-zinc-300 hover:text-[#ccff00] border border-zinc-700 bg-[#0e0e12]"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0a0a0f] border-b-2 border-[#ccff00] px-6 py-6 space-y-4 font-mono-code text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-zinc-300 hover:text-[#ccff00] py-1 border-b border-zinc-800"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={personalInfo.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs font-bold bg-[#181822] text-zinc-200 border border-zinc-700 py-2.5"
            >
              WHATSAPP DIRECT
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-center text-xs font-bold bg-[#ccff00] text-black py-2.5"
            >
              DISPATCH // CONTACT
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
