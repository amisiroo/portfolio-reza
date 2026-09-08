import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { Layers, Server, Database, Cpu, Terminal, CheckCircle2, Zap } from 'lucide-react';
import { WildCardSticker, PokerChipSticker } from './GamblerStickers';

const iconMap = {
  Layers: Layers,
  Server: Server,
  Database: Database,
};

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-24 bg-[#050507] relative border-b-2 border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4 relative">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Cpu className="w-3.5 h-3.5" />
              <span>//03_CORE_COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display">
              SKILLS & TECHNICAL CAPABILITIES
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-2xl mt-2">
              Matriks keahlian teknis terstruktur: analisis kebutuhan sistem, pemodelan BPMN Camunda, static code mapping ANTLR v4, arsitektur backend microservices, hingga audit database.
            </p>
          </div>

          {/* Left/Right Floating Accent Sticker */}
          <div className="hidden lg:block absolute -top-4 right-0">
            <WildCardSticker size={64} rotation="12deg" />
          </div>
        </div>

        {/* Integrated Segmented Control Navigation */}
        <div className="bg-[#0b0b14] border-2 border-white p-6 sm:p-8 shadow-[8px_8px_0px_#ccff00]">
          {/* Segmented Control Bar */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#12121c] border border-zinc-800 mb-8">
            {skillCategories.map((cat, idx) => {
              const IconComp = iconMap[cat.icon] || Terminal;
              const isActive = activeCategory === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`flex-1 min-w-[200px] flex items-center justify-center gap-2.5 py-3 px-4 font-mono-code text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#ccff00] text-black border border-white shadow-[2px_2px_0px_#000000]'
                      : 'bg-transparent text-zinc-400 hover:text-white hover:bg-[#181826]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#ccff00]'}`} />
                  <span className="uppercase tracking-wider">{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Display */}
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code font-bold text-[#ccff00]">
                  DOMAIN #{activeCategory + 1}
                </span>
                <span className="text-zinc-600 font-mono-code">•</span>
                <h3 className="font-mono-code font-extrabold text-lg text-white uppercase">
                  {skillCategories[activeCategory].title}
                </h3>
              </div>
              <span className="text-xs font-mono-code text-zinc-400">
                {skillCategories[activeCategory].skills.length} VERIFIED COMPETENCIES
              </span>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories[activeCategory].skills.map((skill, sIdx) => {
                const isExpert = skill.level === 'Expert';
                return (
                  <div
                    key={sIdx}
                    className="bg-[#101018] p-4 border border-zinc-800/90 hover:border-zinc-600 transition-all hover:bg-[#13131f] group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-zinc-100 font-sans leading-tight">
                        {skill.name}
                      </span>
                      <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 border shrink-0 ${
                        isExpert 
                          ? 'bg-[#ccff00] text-black border-white' 
                          : 'bg-[#181824] text-[#ccff00] border-zinc-700'
                      }`}>
                        {skill.level}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono-code text-zinc-400 mt-2 flex items-center gap-1.5">
                      <span className="text-[#ccff00]">›</span>
                      <span>{skill.context}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-800/70 h-1 mt-3 overflow-hidden">
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
      </div>
    </section>
  );
}
