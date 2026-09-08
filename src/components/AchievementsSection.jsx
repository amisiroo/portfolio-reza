import React from 'react';
import { achievements } from '../data/portfolioData';
import { Award, Trophy, GraduationCap, CheckCircle2, Shield, ExternalLink } from 'lucide-react';
import { SpilledCoffeeSticker, PokerChipSticker } from './GamblerStickers';

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 bg-[#07070b] border-t-2 border-b-2 border-[#1c1c24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with balanced side stickers in open space */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Award className="w-3.5 h-3.5" />
              <span>//06_CREDENTIALS_AND_AWARDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display">
              AWARDS & ACADEMIC CREDENTIALS
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400 mt-2">
              Pengakuan kompetisi perancangan sistem tingkat nasional, lisensi profesional, dan rekam jejak akademik formal ITB.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 shrink-0 pb-1">
            <PokerChipSticker size={52} rotation="-8deg" />
            <SpilledCoffeeSticker size={58} rotation="6deg" />
          </div>
        </div>

        {/* Grid 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0c0c14] border-2 border-zinc-800/90 p-7 flex flex-col justify-between hover:border-[#ccff00] transition-all relative group shadow-[5px_5px_0px_#000000] hover:shadow-[5px_5px_0px_#ccff00]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono-code font-extrabold bg-[#161622] text-[#ccff00] px-2.5 py-1 border border-zinc-700">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono-code text-zinc-500 font-bold">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white font-display uppercase tracking-wide leading-snug">
                  {item.title}
                </h3>

                <div className="text-xs font-mono-code text-[#ccff00] mt-1.5 mb-3.5 font-bold">
                  @ {item.issuer} • {item.category}
                </div>

                <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs font-mono-code text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>VERIFIED RECORD</span>
                </span>
                <span className="text-zinc-600 group-hover:text-[#ccff00] transition-colors">
                  [VALIDATED]
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
