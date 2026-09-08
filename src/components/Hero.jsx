import React from 'react';
import { personalInfo, heroStats } from '../data/portfolioData';
import { Terminal, ArrowDownRight, Activity, ShieldCheck, Cpu, Code2, Layers, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="profile" className="relative pt-32 pb-24 overflow-hidden border-b-2 border-[#1c1c24] bg-cyber-grid">
      {/* Background Ambient Neon Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ccff00]/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Cyber Reticles / Corner Accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative border-l-2 border-r-2 border-zinc-800/80 px-4 sm:px-8 py-2">
          {/* Top Corner HUD Markers */}
          <div className="absolute -top-3 -left-3 font-mono-code text-[10px] text-[#ccff00] bg-black px-1 border border-zinc-800">
            [0x01_SYS_INIT]
          </div>
          <div className="absolute -top-3 -right-3 font-mono-code text-[10px] text-zinc-500 bg-black px-1 border border-zinc-800">
            LATENCY: 12ms (JKT-IAD1)
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6 font-mono-code pt-4">
            <div className="inline-flex items-center gap-2 bg-[#101018] border border-[#ccff00]/40 px-3 py-1.5 text-xs text-zinc-200 shadow-[0_0_15px_rgba(204,255,0,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
              <span className="text-[#ccff00] font-extrabold tracking-wider">STATUS:</span>
              <span>AVAILABLE FOR STRATEGIC & TECH DRILLS</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#14141e] border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300">
              <span className="text-[#ccff00] font-bold">ALUMNI:</span>
              <span>ITB (S1 STI 2019-2025)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#14141e] border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300">
              <span className="text-[#ccff00] font-bold">CORE:</span>
              <span>JAVA SPRING BOOT • BPMN 2.0 • AGENTIC AI</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-5xl">
            <div className="text-xs sm:text-sm font-mono-code tracking-widest text-[#ccff00] uppercase flex items-center gap-3 font-bold">
              <span className="inline-block w-8 h-[2px] bg-[#ccff00]"></span>
              <span>ENTERPRISE SYSTEM ARCHITECTURE & AUTONOMOUS WORKFLOW ORCHESTRATION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[0.95]">
              MUHAMMAD REZA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#e6ff80] to-[#a3e635] drop-shadow-[0_0_35px_rgba(204,255,0,0.2)]">
                NUR FAUZI
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl font-sans leading-relaxed pt-2 font-normal">
              <strong className="text-white font-bold">System Analyst & IT Technical Integration Specialist</strong> lulusan{' '}
              <strong className="text-[#ccff00] font-semibold">S1 Sistem & Teknologi Informasi ITB</strong>. Berpengalaman merancang arsitektur korporat, memodelkan 30+ alur kerja kredit BPMN Camunda di sektor fintech BUMN, integrasi Java Spring Boot OpenFeign, dan orkestrasi Agentic AI otonom.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap gap-4 font-mono-code">
            <a
              href="#architecture"
              className="flex items-center gap-2 bg-[#ccff00] text-black font-black text-sm px-7 py-4 border-2 border-white shadow-[5px_5px_0px_#ffffff] hover:shadow-[7px_7px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <span>INSPECT ARCHITECTURE FLOWS</span>
              <ArrowDownRight className="w-4 h-4 stroke-[3]" />
            </a>

            <a
              href="#terminal"
              className="flex items-center gap-2 bg-[#101018] text-zinc-100 hover:text-white font-bold text-sm px-6 py-4 border-2 border-zinc-700 hover:border-[#ccff00] shadow-[5px_5px_0px_#000000] hover:translate-y-[-2px] transition-all group"
            >
              <Terminal className="w-4 h-4 text-[#ccff00] group-hover:animate-pulse" />
              <span>LAUNCH CLI REZA_OS</span>
            </a>

            <a
              href={personalInfo.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0c0c12] text-zinc-300 hover:text-[#ccff00] font-bold text-sm px-5 py-4 border border-zinc-800 hover:border-zinc-600 transition-all"
            >
              <span>WHATSAPP CONNECT</span>
            </a>
          </div>

          {/* 4 Stats Metric Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#0b0b12] border-2 border-zinc-800/90 p-5 relative group hover:border-[#ccff00] transition-all shadow-[4px_4px_0px_#000000] hover:shadow-[4px_4px_0px_#ccff00]"
              >
                <div className="absolute top-2 right-2 text-[10px] font-mono-code text-zinc-600 group-hover:text-[#ccff00]">
                  #{idx + 1}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#ccff00] font-mono-code tracking-tight">
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
