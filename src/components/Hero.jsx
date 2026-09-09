import React from 'react';
import { personalInfo, heroStats } from '../data/portfolioData';
import { Terminal, ArrowDownRight, FileText, Download } from 'lucide-react';
import { SpadeCardSticker, DicePairSticker } from './GamblerStickers';

export default function Hero() {
  return (
    <section id="profile" className="relative pt-28 pb-20 scroll-mt-24">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-[#ccff00]/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Floating Ace of Spades (Right Side - Bos favorite!) */}
      <div className="hidden xl:block absolute top-28 right-16 z-20 pointer-events-auto">
        <SpadeCardSticker size={88} rotation="-7deg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="border-l-2 border-zinc-800/80 pl-4 sm:pl-8 py-2 relative">

          {/* Top Corner HUD Marker */}
          <div className="absolute -top-3 -left-3 font-mono-code text-[10px] text-[#ccff00] bg-black px-1.5 py-0.5 border border-zinc-800">
            [SYS_INTEGRATION]
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl">
            <div className="text-xs sm:text-sm font-mono-code tracking-widest text-[#ccff00] uppercase flex items-center gap-2 font-bold">
              <span className="inline-block w-8 h-[2px] bg-[#ccff00]"></span>
              <span>SYSTEM ANALYSIS • AI MANAGEMENT SYSTEMS • AI AUTOMATION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[0.95]">
              MUHAMMAD REZA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#e6ff80] to-[#a3e635] drop-shadow-[0_0_25px_rgba(204,255,0,0.15)]">
                NUR FAUZI
              </span>
            </h1>
            <div className="mt-2 inline-flex items-center gap-2 font-mono-code text-xs bg-[#101018] border border-[#ccff00]/50 px-3 py-1 text-[#ccff00] tracking-widest">
              <span className="opacity-60">@</span>
              <span className="font-bold">amisiroo</span>
            </div>

            {/* Elevator Pitch — AI Human Amplification Philosophy */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-3xl font-sans leading-relaxed pt-2">
              AI bukan diciptakan untuk menggantikan manusia, melainkan menjadi katalisator bagi manusia untuk melipatgandakan potensi dan kapabilitasnya melampaui batas yang sebelumnya dianggap mustahil. Berfokus pada <strong>System Analysis</strong>, <strong>AI Management Systems (AIMS)</strong>, dan <strong>AI Automation</strong>, saya merancang arsitektur sistem yang mengintegrasikan kecerdasan buatan ke dalam alur kerja enterprise—menciptakan ekosistem yang adaptif, terotomatisasi, dan memberdayakan manusia untuk mengeksekusi strategi serta inovasi pada skala yang jauh lebih tinggi.
            </p>
          </div>

          {/* Action CTAs including Download CV */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5 font-mono-code">
            <a
              href="/CV_Muhammad_Reza_Nur_Fauzi.pdf"
              download="CV_Muhammad_Reza_Nur_Fauzi.pdf"
              className="flex items-center gap-2 bg-[#ccff00] text-black font-black text-xs sm:text-sm px-5 py-3.5 border-2 border-white shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            <a
              href="#architecture"
              className="flex items-center gap-2 bg-[#12121c] text-white font-bold text-xs sm:text-sm px-5 py-3.5 border-2 border-zinc-700 hover:border-[#ccff00] shadow-[4px_4px_0px_#000000] hover:translate-y-[-1px] transition-all"
            >
              <span>INSPECT SIMULATOR</span>
              <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <a
              href="#terminal"
              className="flex items-center gap-2 bg-[#101018] text-zinc-100 hover:text-white font-bold text-xs sm:text-sm px-5 py-3.5 border border-zinc-700 hover:border-[#ccff00] shadow-[3px_3px_0px_#000000] hover:translate-y-[-1px] transition-all group"
            >
              <Terminal className="w-4 h-4 text-[#ccff00]" />
              <span>AMISIROO.OS CLI</span>
            </a>

            <a
              href={personalInfo.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0c0c12] text-zinc-300 hover:text-[#ccff00] font-bold text-xs sm:text-sm px-4 py-3.5 border border-zinc-800 hover:border-zinc-600 transition-all"
            >
              <span>WHATSAPP</span>
            </a>

            {/* Left-side Dice Sticker */}
            <div className="hidden sm:inline-block ml-1">
              <DicePairSticker size={46} rotation="10deg" />
            </div>
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
