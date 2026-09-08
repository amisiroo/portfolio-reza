import React from 'react';
import { personalInfo, heroStats } from '../data/portfolioData';
import { Terminal, ArrowDownRight, Briefcase, Award, Code2, Layers, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="profile" className="relative pt-28 pb-20 overflow-hidden border-b-2 border-[#1c1c24] bg-cyber-grid">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ccff00]/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="border-l-2 border-zinc-800/80 pl-4 sm:pl-8 py-2">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6 font-mono-code">
            <div className="inline-flex items-center gap-2 bg-[#101018] border border-[#ccff00]/40 px-3 py-1 text-xs text-zinc-200">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
              <span className="text-[#ccff00] font-extrabold">STATUS:</span>
              <span>AVAILABLE FOR SYSTEM ANALYST & ENGINEERING ROLES</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#14141e] border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
              <span className="text-[#ccff00] font-bold">ALUMNI:</span>
              <span>ITB (S1 STI 2019 – 2025)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#14141e] border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
              <span className="text-[#ccff00] font-bold">FOCUS:</span>
              <span>BPMN 2.0 • JAVA SPRING BOOT • API INTEGRATION</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-5xl">
            <div className="text-xs sm:text-sm font-mono-code tracking-widest text-[#ccff00] uppercase flex items-center gap-2 font-bold">
              <span className="inline-block w-8 h-[2px] bg-[#ccff00]"></span>
              <span>SYSTEM ANALYSIS • WORKFLOW ORCHESTRATION • BACKEND INTEGRATION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[0.95]">
              MUHAMMAD REZA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#e6ff80] to-[#a3e635] drop-shadow-[0_0_25px_rgba(204,255,0,0.15)]">
                NUR FAUZI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-3xl font-sans leading-relaxed pt-1">
              <strong className="text-white font-bold">System Analyst</strong> dengan latar belakang teknis software engineering di backend development, integrasi API, analisis database, pemodelan workflow BPMN, dan analisis sistem eksisting. Berpengalaman di <strong className="text-white">PT Padepokan Tujuh Sembilan</strong> (Loan Origination System Phase 2) dan <strong className="text-white">PT Foom Lab Global</strong> (Omnichannel Platform).
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 font-mono-code">
            <a
              href="#architecture"
              className="flex items-center gap-2 bg-[#ccff00] text-black font-black text-xs sm:text-sm px-6 py-3.5 border-2 border-white shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            >
              <span>INSPECT WORKFLOW SIMULATOR</span>
              <ArrowDownRight className="w-4 h-4 stroke-[3]" />
            </a>

            <a
              href="#terminal"
              className="flex items-center gap-2 bg-[#101018] text-zinc-100 hover:text-white font-bold text-xs sm:text-sm px-6 py-3.5 border-2 border-zinc-700 hover:border-[#ccff00] shadow-[4px_4px_0px_#000000] hover:translate-y-[-1px] transition-all group"
            >
              <Terminal className="w-4 h-4 text-[#ccff00] group-hover:animate-pulse" />
              <span>LAUNCH REZA.OS CLI</span>
            </a>

            <a
              href={personalInfo.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0c0c12] text-zinc-300 hover:text-[#ccff00] font-bold text-xs sm:text-sm px-5 py-3.5 border border-zinc-800 hover:border-zinc-600 transition-all"
            >
              <span>WHATSAPP CONNECT</span>
            </a>
          </div>

          {/* 4 Stats Grid */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#0b0b12] border border-zinc-800 p-4 relative group hover:border-[#ccff00] transition-all shadow-[3px_3px_0px_#000000] hover:shadow-[3px_3px_0px_#ccff00]"
              >
                <div className="text-2xl sm:text-3xl font-black text-[#ccff00] font-mono-code tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-200 mt-1 font-mono-code">
                  {stat.label}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5 leading-snug">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
