import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { Layers, Server, BrainCircuit, Cpu, Terminal, CheckCircle, Zap } from 'lucide-react';

const iconMap = {
  Layers: Layers,
  Server: Server,
  BrainCircuit: BrainCircuit,
};

export default function SkillsMatrix() {
  const [filter, setFilter] = useState('ALL');

  const filteredCategories = filter === 'ALL' 
    ? skillCategories 
    : skillCategories.filter(c => c.title.toUpperCase().includes(filter));

  return (
    <section id="skills" className="py-24 bg-[#050507] relative border-b-2 border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Cpu className="w-3.5 h-3.5" />
              <span>//03_CAPABILITY_MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display">
              TECHNICAL COMPETENCY AUDIT
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-2xl mt-2">
              Distribusi keahlian mulai dari pemodelan bisnis tingkat tinggi (BPMN), arsitektur microservices enterprise, hingga orkestrasi AI modern.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono-code text-xs">
            {['ALL', 'ANALYSIS', 'BACKEND', 'AI'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 border-2 font-bold transition-all ${
                  filter === tab
                    ? 'bg-[#ccff00] text-black border-white shadow-[3px_3px_0px_#ffffff]'
                    : 'bg-[#101018] text-zinc-400 border-zinc-800 hover:border-zinc-500'
                }`}
              >
                {tab === 'ALL' ? 'VIEW ALL DOMAINS' : `FILTER: ${tab}`}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, idx) => {
            const IconComponent = iconMap[category.icon] || Terminal;
            return (
              <div
                key={idx}
                className="bg-[#0b0b12] border-2 border-zinc-800/90 p-6 flex flex-col justify-between hover:border-[#ccff00] transition-all relative group shadow-[5px_5px_0px_#000000] hover:shadow-[5px_5px_0px_#ccff00]"
              >
                <div>
                  {/* Category Title */}
                  <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#141420] border border-zinc-700 text-[#ccff00]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-mono-code font-bold text-base text-white uppercase">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3.5">
                    {category.skills.map((skill, sIdx) => {
                      const isExpert = skill.level === 'Expert';
                      return (
                        <div
                          key={sIdx}
                          className="bg-[#101018] p-3.5 border border-zinc-800/90 hover:border-zinc-600 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-zinc-100 font-sans leading-tight">
                              {skill.name}
                            </span>
                            <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 border ${
                              isExpert 
                                ? 'bg-[#ccff00] text-black border-white' 
                                : 'bg-[#181824] text-[#ccff00] border-zinc-700'
                            }`}>
                              {skill.level}
                            </span>
                          </div>

                          <div className="text-[11px] font-mono-code text-zinc-400 mt-1.5 flex items-center gap-1">
                            <span className="text-zinc-600">›</span>
                            <span>{skill.context}</span>
                          </div>

                          {/* Mini Progress Bar */}
                          <div className="w-full bg-zinc-800/70 h-1 mt-2.5 rounded-none overflow-hidden">
                            <div 
                              className={`h-full ${isExpert ? 'bg-[#ccff00]' : 'bg-[#a3e635]'}`}
                              style={{ width: isExpert ? '95%' : skill.level === 'Advanced' ? '85%' : '75%' }}
                            />
                          </div>
                        </div>
                      );
                    })}
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
