import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="bg-[#030305] border-t-2 border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono-code text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-black border border-[#ccff00] flex items-center justify-center text-[#ccff00] font-black">
            R
          </div>
          <div>
            <span className="text-zinc-300 font-bold">{personalInfo.name}</span>
            <span className="mx-2">•</span>
            <span>BANDUNG, ID</span>
          </div>
        </div>

        <div className="text-center sm:text-right">
          <div>BUILT WITH REACT • VITE • TAILWIND CSS • BRUTALIST UI</div>
          <div className="text-[10px] text-zinc-600 mt-1">
            DEPLOYED ON VERCEL & SYNCED TO GITHUB
          </div>
        </div>
      </div>
    </footer>
  );
}
