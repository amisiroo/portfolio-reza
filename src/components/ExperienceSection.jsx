import React, { useState } from 'react';
import { workExperience } from '../data/portfolioData';
import { Briefcase, Building2, CheckCircle2, ChevronRight, Calendar, Layers, Activity } from 'lucide-react';
import { PokerChipSticker, KingSpadeCardSticker } from './GamblerStickers';
import AnimatedHeight from './AnimatedHeight';

export default function ExperienceSection() {
  const [selectedId, setSelectedId] = useState(workExperience[0].id);
  const activeExp = workExperience.find(item => item.id === selectedId) || workExperience[0];

  return (
    <section id="experience" className="py-24 bg-transparent relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4 relative">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Briefcase className="w-3.5 h-3.5" />
              <span>//02_WORK_EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display">
              PROFESSIONAL EXPERIENCE
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-2xl mt-2">
              Rekam jejak pengalaman kerja nyata dalam analisis sistem, perancangan diagram BPMN, integrasi microservices Java Spring Boot, dan software engineering.
            </p>
          </div>

          {/* Right Header Sticker: Poker Chip */}
          <div className="hidden lg:block absolute -top-4 right-0">
            <PokerChipSticker size={58} rotation="-10deg" />
          </div>
        </div>

        {/* Experience Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Company Selector Sidebar (Left Side) */}
          <div className="lg:col-span-4 space-y-3 relative">
            <div className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>SELECT EXPERIENCE RECORD:</span>
            </div>

            {workExperience.map((exp) => {
              const isActive = exp.id === selectedId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={`w-full text-left p-4 sm:p-5 border-2 transition-all duration-200 ease-out font-mono-code active:scale-[0.98] relative ${
                    isActive
                      ? 'bg-[#12121c] border-[#ccff00] shadow-[5px_5px_0px_#ccff00] translate-x-1'
                      : 'bg-[#0a0a0f] border-zinc-800/90 hover:border-zinc-600 text-zinc-400'
                  }`}
                >
                  {/* Active state: neon left-edge anchor bar */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-[#ccff00]" aria-hidden="true" />
                  )}
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${isActive ? 'text-[#ccff00]' : 'text-zinc-500'}`}>
                      {isActive && <span className="inline-block w-1.5 h-1.5 bg-[#ccff00] mr-1.5" aria-hidden="true" />}
                      {exp.badge}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'rotate-90 text-[#ccff00]' : 'text-zinc-600'}`} />
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white mt-1.5 font-sans">
                    {exp.company}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {exp.role.split('—')[0].trim()}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#ccff00]" />
                    <span>{exp.period}</span>
                  </div>
                </button>
              );
            })}

            {/* Left Sidebar Bottom Accent: King of Spades Card */}
            <div className="hidden sm:flex justify-start pt-4 pl-2">
              <KingSpadeCardSticker size={64} rotation="8deg" />
            </div>
          </div>

          {/* Active Detail Display Card (Right Side) — animated on change */}
          <div className="lg:col-span-8">
            <AnimatedHeight>
              <div
                key={activeExp.id}
                className="exp-detail-card bg-[#0c0c14] border-2 border-white p-6 sm:p-8 shadow-[8px_8px_0px_#ccff00] relative"
              >
              {/* exp-card-inner: staggered fade-in after card emerges */}
              <div className="exp-card-inner">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-zinc-800 pb-6 mb-6">
                  <div>
                    <div className="text-xs font-mono-code text-[#ccff00] font-bold uppercase tracking-widest flex items-center gap-2">
                      <span>{activeExp.division}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1.5">
                      {activeExp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono-code text-zinc-400 mt-2.5">
                      <Building2 className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span className="text-zinc-200 font-bold">{activeExp.company}</span>
                      <span className="text-zinc-600">•</span>
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{activeExp.period}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1.5 text-xs font-mono-code font-extrabold bg-[#ccff00] text-black border border-white shadow-[2px_2px_0px_#000000]">
                      {activeExp.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base text-zinc-200 leading-relaxed font-sans mb-8">
                  {activeExp.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-3.5 mb-8">
                  <h4 className="text-xs font-mono-code uppercase tracking-widest text-[#ccff00] font-bold flex items-center gap-2">
                    <span>// RESPONSIBILITIES &amp; DELIVERABLES (CV VERIFIED):</span>
                  </h4>
                  <div className="space-y-2.5">
                    {activeExp.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3 bg-[#11111a] p-3.5 border-l-2 border-[#ccff00] text-sm text-zinc-200 font-sans transition-all duration-200 ease-out">
                        <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div>
                  <div className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2.5">
                    TECH_STACK_APPLIED:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono-code px-3 py-1 bg-[#161622] text-[#ccff00] border border-zinc-700 hover:border-[#ccff00] transition-all duration-200 ease-out"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedHeight>
          </div>
        </div>
      </div>
    </section>
  );
}
