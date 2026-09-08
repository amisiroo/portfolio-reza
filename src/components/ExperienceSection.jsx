import React, { useState } from 'react';
import { workExperience } from '../data/portfolioData';
import { Briefcase, Building2, CheckCircle2, ChevronRight, Calendar, Layers } from 'lucide-react';

export default function ExperienceSection() {
  const [selectedId, setSelectedId] = useState(workExperience[1].id);
  const activeExp = workExperience.find(item => item.id === selectedId) || workExperience[0];

  return (
    <section id="experience" className="py-24 bg-[#08080c] border-t-2 border-b-2 border-[#1c1c24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Briefcase className="w-3.5 h-3.5" />
              <span>//02_PRODUCTION_RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-display">
              WORK HISTORY & ENTERPRISE DRILLS
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-md">
            Rekam jejak eksekusi arsitektur dan integrasi sistem pada sektor fintech BUMN, korporat manajemen strategis, dan platform digital.
          </p>
        </div>

        {/* Experience Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Company Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            {workExperience.map((exp) => {
              const isActive = exp.id === selectedId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedId(exp.id)}
                  className={`w-full text-left p-4 border-2 transition-all font-mono-code ${
                    isActive
                      ? 'bg-[#12121c] border-[#ccff00] shadow-[4px_4px_0px_#ccff00] translate-x-1'
                      : 'bg-[#0b0b10] border-zinc-800 hover:border-zinc-600 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                      {exp.badge}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90 text-[#ccff00]' : 'text-zinc-600'}`} />
                  </div>
                  <div className="text-base font-bold text-white mt-1 font-sans">
                    {exp.company}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {exp.role}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Display */}
          <div className="lg:col-span-8 bg-[#0d0d14] border-2 border-white p-6 sm:p-8 shadow-[6px_6px_0px_#ccff00]">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800 pb-6 mb-6">
              <div>
                <div className="text-xs font-mono-code text-[#ccff00] font-bold uppercase tracking-widest">
                  {activeExp.division}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                  {activeExp.role}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 mt-2">
                  <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-zinc-300 font-bold">{activeExp.company}</span>
                  <span>•</span>
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{activeExp.period}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 text-xs font-mono-code font-bold bg-[#ccff00] text-black border border-white">
                  {activeExp.type}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans mb-6">
              {activeExp.description}
            </p>

            {/* Key Deliverables */}
            <div className="space-y-3 mb-8">
              <h4 className="text-xs font-mono-code uppercase tracking-widest text-[#ccff00] font-bold">
                // SPECIFIC DELIVERABLES & TECHNICAL DRILLS:
              </h4>
              <div className="space-y-2.5">
                {activeExp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#13131b] p-3 border-l-2 border-[#ccff00] text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div>
              <div className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2">
                TECH_STACK_APPLIED:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeExp.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono-code px-2.5 py-1 bg-[#1a1a24] text-zinc-200 border border-zinc-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
