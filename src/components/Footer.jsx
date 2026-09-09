import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
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
              <div className="text-zinc-200 font-bold tracking-wider">amisiroo</div>
              <div className="text-[10px] text-zinc-500">
                SYSTEM ANALYST • BACKEND ENGINEER • AI ENTHUSIAST (STI ITB)
              </div>
            </div>
          </div>

          {/* Center Info */}
          <div className="text-center md:text-right space-y-1">
            <div className="flex items-center justify-center md:justify-end gap-2 text-[11px] text-zinc-300">
              <span>DEPLOYED ON VERCEL • SYNCED WITH GITHUB</span>
            </div>
            <div className="text-[10px] text-zinc-600">
              REACT 18 • VITE 5 • TAILWIND CSS • NEO-BRUTALIST ARCHITECTURE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
