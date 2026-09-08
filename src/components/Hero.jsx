import React from 'react';
import { personalInfo, heroStats } from '../data/portfolioData';
import { Terminal, ArrowDownRight } from 'lucide-react';
import { SpadeCardSticker, DicePairSticker } from './GamblerStickers';

export default function Hero() {
  return (
    <section id="profile" className="relative pt-28 pb-20 overflow-hidden border-b-2 border-[#1c1c24] bg-cyber-grid">
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

          {/* Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6 font-mono-code pt-3">
            <div className="inline-flex items-center gap-2 bg-[#101018] border border-[#ccff00]/40 px-3 py-1 text-xs text-zinc-200 shadow-[0_0_15px_rgba(204,255,0,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
              <span className="text-[#ccff00] font-extrabold">ACTIVE:</span>
              <span>PT. AGANSA PRIMATAMA (OSM DEPT)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#14141e] border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
              <span className="text-[#ccff00] font-bold">ALUMNI:</span>
              <span>ITB (S1 STI 2019 – 2025)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#14141e] border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
              <span className="text-[#ccff00] font-bold">PASSION:</span>
              <span>SYSTEM ANALYST • AI ENTHUSIAST</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl">
            <div className="text-xs sm:text-sm font-mono-code tracking-widest text-[#ccff00] uppercase flex items-center gap-2 font-bold">
              <span className="inline-block w-8 h-[2px] bg-[#ccff00]"></span>
              <span>SYSTEM ANALYSIS • BACKEND ENGINEERING • AI ENTHUSIAST</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[0.95]">
              MUHAMMAD REZA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#e6ff80] to-[#a3e635] drop-shadow-[0_0_25px_rgba(204,255,0,0.15)]">
                NUR FAUZI
              </span>
            </h1>

            {/* AI Amplifier & Impact Philosophy Paragraph (Fused Option A & C) */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-3xl font-sans leading-relaxed pt-2">
              ai itu alat paling gila buat percepat hidup dan kerjaan kalo paham cara pakenya, tapi bisa jadi bumerang konyol kalo dipasrahin gitu aja tanpa mikir. buat saya, ai itu murni amplifier: ngebantu banget buat automasi dan beresin hal teknis sampe 10x lebih cepet, tapi kalo logika dasarnya aja udah salah arah, ai cuma bakal mempercepat kita nabrak tembok dan bikin kerusakannya 10x lebih berantakan. tetep kritis, tetep waras, jangan mau disetir.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4 font-mono-code">
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
              <span>WHATSAPP ({personalInfo.phone})</span>
            </a>

            {/* Left-side Dice Sticker in open CTA row */}
            <div className="hidden sm:inline-block ml-2">
              <DicePairSticker size={48} rotation="10deg" />
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
