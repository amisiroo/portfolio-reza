import React from 'react';
import { personalInfo, heroStats } from '../data/portfolioData';
import { Terminal, ArrowDownRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="profile" className="relative pt-32 pb-20 overflow-hidden border-b-2 border-[#1a1a24]">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14141d_1px,transparent_1px),linear-gradient(to_bottom,#14141d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6 font-mono-code">
          <div className="inline-flex items-center gap-2 bg-[#121218] border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
            <span className="text-[#ccff00] font-bold">SYSTEM_READY:</span>
            <span>AVAILABLE FOR ENTERPRISE DRILLS</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#181820] border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
            <span className="text-[#ccff00]">ALUMNI:</span> ITB (S1 STI 2019-2025)
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#181820] border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
            <span className="text-[#ccff00]">FOCUS:</span> JAVA MICROSERVICES & BPMN 2.0
          </div>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-5xl">
          <div className="text-xs sm:text-sm font-mono-code tracking-widest text-[#ccff00] uppercase flex items-center gap-2">
            <span className="inline-block w-8 h-[2px] bg-[#ccff00]"></span>
            <span>SYSTEM ARCHITECTURE • PROCESS ORCHESTRATION • AUTONOMOUS AGENTS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[0.95]">
            MUHAMMAD REZA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#e2ff66] to-[#a3e635]">
              NUR FAUZI
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl font-sans leading-relaxed pt-2">
            <strong className="text-white">System Analyst & IT Technical Integration Specialist</strong> dengan latar belakang akademik{' '}
            <strong className="text-[#ccff00]">S1 Sistem & Teknologi Informasi ITB</strong>. Berpengalaman mengarsiteki sistem korporat, pemodelan 30+ alur kerja kredit BPMN Camunda, integrasi Java Spring Boot OpenFeign, dan orkestrasi workflow Agentic AI modern.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap gap-4 font-mono-code">
          <a
            href="#architecture"
            className="flex items-center gap-2 bg-[#ccff00] text-black font-extrabold text-sm px-6 py-3.5 border-2 border-white shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] hover:translate-y-[-2px] transition-all"
          >
            <span>INSPECT ARCHITECTURE FLOWS</span>
            <ArrowDownRight className="w-4 h-4 stroke-[3]" />
          </a>

          <a
            href="#terminal"
            className="flex items-center gap-2 bg-[#121218] text-zinc-200 hover:text-white font-bold text-sm px-6 py-3.5 border border-zinc-700 hover:border-[#ccff00] shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] transition-all"
          >
            <Terminal className="w-4 h-4 text-[#ccff00]" />
            <span>LAUNCH CLI REZA_OS</span>
          </a>

          <a
            href={personalInfo.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0d0d12] text-zinc-300 hover:text-[#ccff00] font-bold text-sm px-5 py-3.5 border border-zinc-800 hover:border-zinc-600 transition-all"
          >
            <span>WHATSAPP CONNECT</span>
          </a>
        </div>

        {/* Stats Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {heroStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0c0c11] border-2 border-zinc-800 p-4 relative group hover:border-[#ccff00] transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-black text-[#ccff00] font-mono-code">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-200 mt-1 font-mono-code">
                {stat.label}
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
