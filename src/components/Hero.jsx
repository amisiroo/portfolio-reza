import React from 'react';
import { motion } from "framer-motion";

import { Terminal, Download } from 'lucide-react';
import { SpadeCardSticker, DicePairSticker } from './GamblerStickers';


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
export default function Hero() {
  return (
    <motion.section id="profile" className="relative pt-28 pb-20 scroll-mt-24" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
      {/* Background Ambient Glow */}

      {/* Floating Ace of Spades (Right Side - Bos favorite!) */}
      <div className="hidden xl:block absolute top-28 right-16 z-20 pointer-events-auto">
        <SpadeCardSticker size={88} rotation="-7deg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="border-l-2 border-zinc-800/80 pl-4 sm:pl-8 py-2 relative">



          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#101018] border border-[#ccff00]/50 px-3 py-1.5 font-mono-code text-xs text-[#ccff00] tracking-widest font-bold">
              <span className="opacity-60">@</span>
              <span className="mr-2">amisiroo</span>
              <span className="opacity-40">|</span>
              <span className="ml-0 sm:ml-2">SYSTEM ANALYSIS • AIMS • AI AUTOMATION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[0.95]">
              MUHAMMAD REZA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#e6ff80] to-[#a3e635] drop-shadow-[0_0_25px_rgba(204,255,0,0.15)]">
                NUR FAUZI
              </span>
            </h1>

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
              href="#terminal"
              className="flex items-center gap-2 bg-[#101018] text-zinc-100 hover:text-white font-bold text-xs sm:text-sm px-5 py-3.5 border border-zinc-700 hover:border-[#ccff00] shadow-[3px_3px_0px_#000000] hover:translate-y-[-1px] transition-all group"
            >
              <Terminal className="w-4 h-4 text-[#ccff00]" />
              <span>AMISIROO.OS CLI</span>
            </a>



            {/* Left-side Dice Sticker */}
            <div className="hidden sm:inline-block ml-1">
              <DicePairSticker size={46} rotation="10deg" />
            </div>
          </div>


        </div>
      </div>
    </motion.section>
  );
}
