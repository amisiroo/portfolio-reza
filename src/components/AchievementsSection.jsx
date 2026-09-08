import React from 'react';
import { achievements } from '../data/portfolioData';
import { Award, Trophy, GraduationCap, CheckCircle2, Shield } from 'lucide-react';

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 bg-[#08080c] border-t-2 border-b-2 border-[#1c1c24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Award className="w-3.5 h-3.5" />
              <span>//05_CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-display">
              AWARDS & ACADEMIC CREDENTIALS
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-md">
            Pengakuan kompetisi nasional, lisensi profesional, dan rekam jejak akademik formal ITB.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0c0c14] border-2 border-zinc-800 p-6 flex flex-col justify-between hover:border-[#ccff00] transition-colors relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono-code font-bold bg-[#1a1a24] text-[#ccff00] px-2 py-0.5 border border-zinc-700">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono-code text-zinc-500 font-bold">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
                  {item.title}
                </h3>
                <div className="text-xs font-mono-code text-[#ccff00] mb-3">
                  @ {item.issuer} • {item.category}
                </div>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono-code text-zinc-500">
                <span>VERIFIED RECORD</span>
                <Shield className="w-3.5 h-3.5 text-[#ccff00]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
