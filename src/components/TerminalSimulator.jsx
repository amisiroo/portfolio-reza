import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, workExperience, skillCategories } from '../data/portfolioData';
import { Terminal as TermIcon, CornerDownLeft, Maximize2, Minimize2, Trash2 } from 'lucide-react';

export default function TerminalSimulator() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'REZA_OS v2.4 (x86_64-hermes-enterprise)' },
    { type: 'system', text: 'Type "help" to view available commands or click one of the quick chips below to inspect system state.' }
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    const newHist = [...history, { type: 'input', text: `$ ${cmdStr}` }];

    switch (cleanCmd) {
      case 'help':
        newHist.push({
          type: 'output',
          text: `AVAILABLE COMMANDS IN REZA_OS:
  • bio       : Ringkasan profil dan latar belakang akademik ITB STI
  • exp       : Riwayat enterprise drills & system integration
  • skills    : Audit matriks kompetensi teknis & framework
  • bpmn      : Info pemodelan Camunda BPMN & arsitektur LOS
  • contact   : Endpoint komunikasi, WhatsApp, dan email
  • hire      : Kirim penawaran kerja sama / project inquiry
  • clear     : Bersihkan buffer terminal`
        });
        break;

      case 'bio':
        newHist.push({
          type: 'output',
          text: `NAME       : ${personalInfo.name}
TITLE      : ${personalInfo.title}
ALUMNI     : ${personalInfo.education.institution} - ${personalInfo.education.degree}
LOCATION   : ${personalInfo.location} (${personalInfo.timezone})
FOCUS      : End-to-end IT System Integration, Camunda BPMN 2.0, Java Spring Boot, and Agentic AI Architecture.`
        });
        break;

      case 'exp':
        newHist.push({
          type: 'output',
          text: workExperience.map(e => `[${e.badge}] ${e.company} - ${e.role} (${e.period})
  → ${e.description}`).join('\n\n')
        });
        break;

      case 'skills':
        newHist.push({
          type: 'output',
          text: skillCategories.map(c => `// ${c.title.toUpperCase()}
` + c.skills.map(s => `  • ${s.name.padEnd(30)} [${s.level}] → ${s.context}`).join('\n')).join('\n\n')
        });
        break;

      case 'bpmn':
        newHist.push({
          type: 'output',
          text: `CAMUNDA BPMN 2.0 DRILL RECORD:
  • Modeled 30+ complex loan origination approval workflows at PT Pegadaian.
  • Integrated User Tasks with Vue.js frontend forms.
  • Handled Service Tasks using Spring Boot Feign Clients for automated credit scoring.
  • Implemented DMN Decision Tables for automated limit & DSR calculations.`
        });
        break;

      case 'contact':
        newHist.push({
          type: 'output',
          text: `EMAIL    : ${personalInfo.email}
PHONE    : ${personalInfo.phone}
WHATSAPP : ${personalInfo.waLink}`
        });
        break;

      case 'hire':
        newHist.push({
          type: 'output',
          text: `[!] Dispatching collaboration channel... Open WhatsApp: ${personalInfo.waLink}`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHist.push({
          type: 'error',
          text: `zsh: command not found: "${cmdStr}". Type "help" to inspect list of valid commands.`
        });
        break;
    }

    setHistory(newHist);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const quickChips = ['help', 'bio', 'skills', 'exp', 'bpmn', 'contact', 'hire', 'clear'];

  return (
    <section id="terminal" className="py-24 bg-[#050507] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <TermIcon className="w-3.5 h-3.5" />
              <span>//04_CLI_SHELL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-display">
              INTERACTIVE REZA_OS TERMINAL
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-md">
            Eksplorasi profil, keahlian teknis, dan dependensi sistem melalui interface terminal langsung.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="bg-[#0a0a0f] border-2 border-white shadow-[6px_6px_0px_#ccff00]">
          {/* Terminal Titlebar */}
          <div className="bg-[#14141d] border-b-2 border-zinc-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="text-xs font-mono-code font-bold text-zinc-300 ml-2">
                reza@macbook-pro: ~/sys_integration (zsh)
              </span>
            </div>
            <button
              onClick={() => setHistory([])}
              className="text-zinc-500 hover:text-[#ccff00] transition-colors"
              title="Clear terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick chips */}
          <div className="px-4 py-2 bg-[#0d0d14] border-b border-zinc-800 flex flex-wrap gap-2 items-center text-xs font-mono-code">
            <span className="text-zinc-500">QUICK_RUN:</span>
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleCommand(chip)}
                className="px-2 py-0.5 bg-[#171722] hover:bg-[#ccff00] hover:text-black text-zinc-300 border border-zinc-700 transition-colors"
              >
                ${chip}
              </button>
            ))}
          </div>

          {/* Terminal Buffer */}
          <div className="p-4 sm:p-6 font-mono-code text-xs sm:text-sm h-80 overflow-y-auto space-y-3 selection:bg-[#ccff00] selection:text-black">
            {history.map((item, i) => (
              <div key={i}>
                {item.type === 'system' && (
                  <div className="text-zinc-500 leading-relaxed font-mono-code">{item.text}</div>
                )}
                {item.type === 'input' && (
                  <div className="text-[#ccff00] font-bold">{item.text}</div>
                )}
                {item.type === 'output' && (
                  <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed font-mono-code bg-[#101018] p-3 border-l-2 border-zinc-700">
                    {item.text}
                  </pre>
                )}
                {item.type === 'error' && (
                  <div className="text-red-400 font-bold">{item.text}</div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input Line */}
          <div className="bg-[#0e0e16] border-t-2 border-zinc-800 px-4 py-3 flex items-center gap-3 font-mono-code">
            <span className="text-[#ccff00] font-bold">reza@os:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. bio, skills, exp, bpmn)..."
              className="flex-1 bg-transparent text-white focus:outline-none text-xs sm:text-sm placeholder:text-zinc-600 font-mono-code"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1 bg-[#ccff00] text-black hover:bg-white transition-colors"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
