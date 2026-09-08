import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Terminal, Send, Menu, X, FileText } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: '//01_PROFILE', href: '#profile' },
    { label: '//02_EXPERIENCE', href: '#experience' },
    { label: '//03_SKILLS_MATRIX', href: '#skills' },
    { label: '//04_ARCHITECTURE', href: '#architecture' },
    { label: '//05_CLI_SHELL', href: '#terminal' },
    { label: '//06_ACHIEVEMENTS', href: '#achievements' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050507]/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-black border-2 border-[#ccff00] flex items-center justify-center font-mono-code font-black text-lg text-[#ccff00] shadow-[2px_2px_0px_#ccff00] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
            R
          </div>
          <div>
            <div className="font-mono-code font-bold text-sm text-white tracking-wider flex items-center gap-2">
              <span>REZA_SYSTEM_OS</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
            </div>
            <div className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-widest">
              ITB STI • SYS_INTEGRATION
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 font-mono-code text-xs text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#ccff00] transition-colors py-1 hover:border-b-2 hover:border-[#ccff00]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={personalInfo.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono-code font-bold bg-[#181822] text-zinc-200 border border-zinc-700 px-3 py-1.5 hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
          >
            <span>WHATSAPP</span>
          </a>
          <a
            href="#contact"
            className="flex items-center gap-1.5 text-xs font-mono-code font-bold bg-[#ccff00] text-black border-2 border-white px-3.5 py-1.5 shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#ffffff] hover:translate-y-[-1px] transition-all"
          >
            <span>DISPATCH // CONTACT</span>
            <Send className="w-3.5 h-3.5" />
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
