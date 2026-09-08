import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Send, Menu, X } from 'lucide-react';
import { SpadeEmblemSticker, DicePairSticker } from './GamblerStickers';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        {/* Far Left: Spade Sticker + Brand Logo */}
        <div className="flex items-center gap-3">
          {/* Ujung Kiri: Spade Emblem Sticker */}
          <div className="hidden sm:block">
            <SpadeEmblemSticker size={28} rotation="-10deg" />
          </div>

          <a href="#profile" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-black border border-[#ccff00] flex items-center justify-center font-mono-code font-black text-sm text-[#ccff00] shadow-[2px_2px_0px_#ccff00] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-transform">
              R
            </div>
            <div className="font-mono-code font-bold text-xs sm:text-sm text-white tracking-wider flex items-center gap-1.5">
              <span>REZA.OS</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
            </div>
          </a>
        </div>

        {/* Center: Compact Navigation */}
        <nav className="hidden md:flex items-center gap-5 font-mono-code text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-zinc-400 hover:text-[#ccff00] transition-colors py-1 hover:border-b-2 hover:border-[#ccff00]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Far Right: WhatsApp Link, DISPATCH CTA + Dice Sticker */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={personalInfo.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono-code text-zinc-400 hover:text-[#ccff00] px-2 py-1 transition-colors"
          >
            WA: 08988090008
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-mono-code font-bold bg-[#ccff00] text-black border border-white px-3.5 py-1.5 shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#ffffff] hover:translate-y-[-1px] transition-all"
          >
            <span>DISPATCH</span>
            <Send className="w-3 h-3 stroke-[2.5]" />
          </a>

          {/* Ujung Kanan: Dice Sticker */}
          <div className="hidden sm:block pl-1">
            <DicePairSticker size={26} rotation="12deg" />
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-zinc-300 hover:text-[#ccff00] border border-zinc-800 bg-[#0c0c12]"
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
              onClick={() => setIsOpen(false)}
              className="block text-zinc-300 hover:text-[#ccff00] py-1 border-b border-zinc-800/80"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={personalInfo.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs font-bold bg-[#14141e] text-zinc-200 border border-zinc-700 py-2"
            >
              WHATSAPP (08988090008)
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-center text-xs font-bold bg-[#ccff00] text-black py-2"
            >
              DISPATCH // CONTACT
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
