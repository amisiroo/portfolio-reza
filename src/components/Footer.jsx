import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-transparent py-12 relative font-mono-code">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black border-2 border-[#ccff00] flex items-center justify-center text-[#ccff00] font-black text-sm shadow-[2px_2px_0px_#ccff00]">
              A
            </div>
            <div>
              <div className="text-zinc-200 font-bold tracking-wider">AMISIROO // SYS.ARCH</div>
              <div className="text-[10px] text-zinc-500">
                SYSTEM ANALYST • BACKEND ENGINEER • AI ENTHUSIAST (STI ITB)
              </div>
            </div>
          </div>

          {/* Center Info */}
          <div className="text-center md:text-right space-y-1">
            <div className="flex items-center justify-center md:justify-end gap-2 text-[11px] text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
              <span>DEPLOYED ON VERCEL • SYNCED WITH GITHUB</span>
            </div>
            <div className="text-[10px] text-zinc-600">
              REACT 18 • VITE 5 • TAILWIND CSS • NEO-BRUTALIST ARCHITECTURE
            </div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-[#0e0e16] border border-zinc-800 hover:border-[#ccff00] hover:text-[#ccff00] text-zinc-400 transition-colors"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
