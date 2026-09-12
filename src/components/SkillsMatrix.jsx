import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';
import { Layers, Server, Database, Cpu, Terminal } from 'lucide-react';
import { WildCardSticker } from './GamblerStickers';
import AnimatedHeight from './AnimatedHeight';


const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 15 } }
};
const iconMap = {
  Layers: Layers,
  Server: Server,
  Database: Database,
};

// Map level string to badge style
function getLevelStyle(level) {
  if (level === 'Advanced / Senior') return 'bg-[#ccff00] text-black border-white';
  if (level === 'Advanced')          return 'bg-[#ccff00]/20 text-[#ccff00] border-[#ccff00]/50';
  if (level === 'Strong Mid')        return 'bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/40';
  if (level === 'Competent')         return 'bg-zinc-800 text-zinc-300 border-zinc-600';
  return                                    'bg-[#181824] text-zinc-400 border-zinc-700';
}

// score string "2.8/4.0" → progress % of 4.0
function scoreToPercent(score) {
  if (!score) return 70;
  const num = parseFloat(score);
  return Math.round((num / 4.0) * 100);
}



export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <motion.section id="skills" className="py-24 bg-transparent relative scroll-mt-24" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4 relative">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Cpu className="w-3.5 h-3.5" />
              <span>//03_CORE_COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display">
              SKILLS &amp; TECHNICAL CAPABILITIES
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-2xl mt-2">
              Matriks keahlian teknis terstruktur: analisis kebutuhan sistem, pemodelan BPMN Camunda, static code mapping ANTLR v4, arsitektur backend microservices, hingga audit database.
            </p>
          </div>

          {/* Right Header Sticker */}
          <div className="hidden lg:block shrink-0 pb-1">
            <WildCardSticker size={64} rotation="10deg" />
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

          {/* Outer container animates height exactly like ExperienceSection */}
          <AnimatedHeight>
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

            {/* Skills Grid — static, no per-card animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories[activeCategory].skills.map((skill, sIdx) => {
                const pct = scoreToPercent(skill.score);
                const isTopTier = skill.level === 'Advanced / Senior';
                const barColor = isTopTier ? '#ccff00' : skill.level === 'Advanced' ? '#a3e635' : '#6ee7b7';
                return (
                  <div
                    key={`skill-slot-${sIdx}`}
                    className="bg-[#101018] p-4 border border-zinc-800/90 hover:border-zinc-600 transition-colors hover:bg-[#13131f] group"
                  >
                    {/* Name + Level badge */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-zinc-100 font-sans leading-tight">
                        {skill.name}
                      </span>
                      <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 border shrink-0 ${getLevelStyle(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>

                    {/* Score metric */}
                    {skill.score && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] font-mono-code font-bold text-[#ccff00]">
                          {skill.score}
                        </span>
                        <span className="text-[10px] font-mono-code text-zinc-500 uppercase tracking-wider">
                          calibrated
                        </span>
                      </div>
                    )}

                    {/* Context */}
                    <div className="text-[11px] font-mono-code text-zinc-400 mt-1.5 flex items-center gap-1.5">
                      <span className="text-[#ccff00]">›</span>
                      <span>{skill.context}</span>
                    </div>

                    {/* Animated progress bar */}
                    <div className="w-full bg-zinc-800/90 border border-zinc-700/50 h-1.5 mt-3 overflow-hidden">
                      <motion.div
                        className="h-full"
                        initial={false}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                        style={{ backgroundColor: barColor }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] font-mono-code text-zinc-600">0.0</span>
                      <span className="text-[9px] font-mono-code text-zinc-500">{pct}%</span>
                      <span className="text-[9px] font-mono-code text-zinc-600">4.0</span>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          </AnimatedHeight>
        </div>
      </div>
    </motion.section>
  );
}
