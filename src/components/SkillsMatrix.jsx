import React from 'react';
import { skillCategories } from '../data/portfolioData';
import { Layers, Server, BrainCircuit, Cpu, Terminal, Check } from 'lucide-react';

const iconMap = {
  Layers: Layers,
  Server: Server,
  BrainCircuit: BrainCircuit,
};

export default function SkillsMatrix() {
  return (
    <section id="skills" className="py-24 bg-[#050507] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Cpu className="w-3.5 h-3.5" />
              <span>//03_CAPABILITY_MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-display">
              TECHNICAL COMPETENCY AUDIT
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-md">
            Distribusi keahlian mulai dari pemodelan bisnis tingkat tinggi (BPMN), arsitektur microservices enterprise, hingga orkestrasi AI modern.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => {
            const IconComponent = iconMap[category.icon] || Terminal;
            return (
              <div
                key={idx}
                className="bg-[#0b0b10] border-2 border-zinc-800 p-6 flex flex-col justify-between hover:border-[#ccff00] transition-colors relative group"
              >
                {/* Category Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#14141e] border border-zinc-700 text-[#ccff00]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-mono-code font-bold text-base text-white uppercase">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-[#12121a] p-3.5 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-zinc-200 font-sans leading-tight">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 bg-[#1e1e2a] text-[#ccff00] border border-zinc-700 whitespace-nowrap">
                            {skill.level}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono-code text-zinc-400 mt-1">
                          › {skill.context}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
