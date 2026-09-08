import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, workExperience, skillCategories } from '../data/portfolioData';
import { Terminal as TermIcon, CornerDownLeft, Maximize2, Minimize2, Trash2, Cpu, Activity, Sparkles, Layers } from 'lucide-react';

export default function TerminalSimulator() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: '╔══════════════════════════════════════════════════════════════════╗' },
    { type: 'system', text: '║  REZA_OS v3.2.0 (x86_64-hermes-enterprise) • PRODUCTION ACTIVE   ║' },
    { type: 'system', text: '╚══════════════════════════════════════════════════════════════════╝' },
    { type: 'system', text: 'Type "help" to inspect commands, or use [Tab] for autocomplete / click quick chips below.' }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  const scrollContainerRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history, isMatrixMode]);

  const availableCommands = [
    'help', 'bio', 'skills', 'exp', 'bpmn', 'arch', 'specs', 'neofetch', 'matrix', 'contact', 'hire', 'clear'
  ];

  const handleCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    setCmdHistory(prev => [...prev, cmdStr]);
    setHistoryIdx(-1);

    const newHist = [...history, { type: 'input', text: `reza@os:~$ ${cmdStr}` }];

    switch (cleanCmd) {
      case 'help':
        newHist.push({
          type: 'output',
          text: `AVAILABLE REZA_OS COMMANDS:
  • bio        : Ringkasan profil & latar belakang akademik STI ITB
  • exp        : Riwayat enterprise drills di PT Agansa & Pegadaian
  • skills     : Audit lengkap matriks kompetensi teknis & framework
  • bpmn       : Detail alur Camunda BPMN 2.0 & Loan Origination System
  • arch       : Arsitektur microservices, Feign Client, dan Outbox pattern
  • neofetch   : System specs, kernel version, and tech stack telemetry
  • matrix     : Toggle hacker green matrix stream mode
  • contact    : Endpoint komunikasi (Email, WhatsApp, LinkedIn)
  • hire       : Dispatch jalur kolaborasi kerja sama / project inquiry
  • clear      : Bersihkan buffer layar terminal`
        });
        break;

      case 'bio':
        newHist.push({
          type: 'output',
          text: `IDENTIFIER  : ${personalInfo.name}
ROLE        : ${personalInfo.title}
ALUMNI      : ${personalInfo.education.institution} (${personalInfo.education.degree})
LOCATION    : ${personalInfo.location} (${personalInfo.timezone})
CORE DOMAIN : IT System Integration, Camunda BPMN 2.0 Process Orchestration, Java Spring Boot OpenFeign, and Autonomous Agentic AI Workflows.`
        });
        break;

      case 'exp':
        newHist.push({
          type: 'output',
          text: workExperience.map(e => `[${e.badge}] ${e.company} — ${e.role} (${e.period})\n  → Division: ${e.division}\n  → Highlights: ${e.highlights.join(' | ')}`).join('\n\n')
        });
        break;

      case 'skills':
        newHist.push({
          type: 'output',
          text: skillCategories.map(c => `// ${c.title.toUpperCase()}\n` + c.skills.map(s => `  • ${s.name.padEnd(32)} [${s.level}] -> ${s.context}`).join('\n')).join('\n\n')
        });
        break;

      case 'bpmn':
        newHist.push({
          type: 'output',
          text: `CAMUNDA BPMN 2.0 & LOS PHASE 2 DRILL:
  • Modeled 30+ production BPMN diagrams in Camunda Modeler for loan origination approval pipelines.
  • Orchestrated microservices inter-communication using Spring Cloud OpenFeign.
  • Engineered automated DMN decision tables for credit risk calculation (Debt Service Ratio & Tiering).
  • Implemented asynchronous Service Tasks and dynamic User Task assignment gateways.`
        });
        break;

      case 'arch':
        newHist.push({
          type: 'output',
          text: `SYSTEM ARCHITECTURE PARADIGM:
  [API Gateway] ──> [Camunda Engine] ──> [Feign Client Microservice]
         │                 │                           │
         ▼                 ▼                           ▼
  [DTO Validation]   [DMN Table Engine]        [Transactional Outbox / Kafka]`
        });
        break;

      case 'neofetch':
        newHist.push({
          type: 'output',
          text: `       __             reza@hermes-os
      /  \\            -------------
     / /\\ \\           OS: REZA_OS Enterprise x86_64
    / /  \\ \\          Host: Institut Teknologi Bandung (STI Alum)
   /_/    \\_\\         Kernel: 6.8.0-spring-boot-camunda
                      Uptime: 2019 - 2026 (Active Execution)
                      Shell: zsh 5.9 (agentic-interactive)
                      Stack: Java 17, Spring Boot, BPMN 2.0, React, Vite
                      RAM: 32GB DDR5 / Infinite Problem-Solving Capacity`
        });
        break;

      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        newHist.push({
          type: 'system',
          text: isMatrixMode ? '[!] Exiting Matrix Mode...' : '[!] Matrix Digital Rain Mode Activated. Press "matrix" again to revert.'
        });
        break;

      case 'contact':
        newHist.push({
          type: 'output',
          text: `COMMUNICATION CHANNELS:
  • EMAIL    : ${personalInfo.email}
  • WHATSAPP : ${personalInfo.phone} (${personalInfo.waLink})
  • STATUS   : Available for Enterprise Consultation & Full-time Roles`
        });
        break;

      case 'hire':
        newHist.push({
          type: 'output',
          text: `[!] Dispatching direct communication channel...\nDirect WhatsApp Link: ${personalInfo.waLink}`
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = availableCommands.find(c => c.startsWith(inputVal.trim().toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const quickChips = ['help', 'bio', 'skills', 'exp', 'bpmn', 'arch', 'neofetch', 'contact', 'matrix', 'clear'];

  return (
    <section id="terminal" className="py-24 bg-[#050507] relative border-b-2 border-[#1c1c24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <TermIcon className="w-3.5 h-3.5" />
              <span>//05_CLI_SHELL_SIMULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display">
              INTERACTIVE REZA_OS TERMINAL
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-md">
            Interface shell developer interaktif. Dilengkapi autocompletion [Tab], history navigasi [↑/↓], dan command query sistem penuh.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="bg-[#09090f] border-2 border-white shadow-[8px_8px_0px_#ccff00]">
          {/* Terminal Titlebar */}
          <div className="bg-[#12121c] border-b-2 border-zinc-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/40" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/40" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/40" />
              <span className="text-xs font-mono-code font-bold text-zinc-300 ml-2 flex items-center gap-2">
                <span>reza@macbook-pro: ~/sys_integration (zsh)</span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">• UTF-8 • 80x24</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHistory([])}
                className="text-zinc-400 hover:text-[#ccff00] transition-colors p-1"
                title="Clear buffer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Command Chips Toolbar */}
          <div className="px-4 py-2 bg-[#0c0c14] border-b border-zinc-800 flex flex-wrap gap-2 items-center text-xs font-mono-code">
            <span className="text-zinc-500 font-bold text-[10px]">QUICK_DISPATCH:</span>
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleCommand(chip)}
                className="px-2.5 py-0.5 bg-[#161622] hover:bg-[#ccff00] hover:text-black text-zinc-300 border border-zinc-700 hover:border-white transition-all font-semibold"
              >
                ${chip}
              </button>
            ))}
          </div>

          {/* Terminal Output Log Buffer */}
          <div
            ref={scrollContainerRef}
            className={`p-4 sm:p-6 font-mono-code text-xs sm:text-sm h-88 max-h-96 overflow-y-auto space-y-3 selection:bg-[#ccff00] selection:text-black ${
              isMatrixMode ? 'bg-[#020d04] text-[#00ff66]' : 'bg-[#06060a]'
            }`}
          >
            {history.map((item, i) => (
              <div key={i} className="leading-relaxed">
                {item.type === 'system' && (
                  <div className="text-zinc-500 font-mono-code">{item.text}</div>
                )}
                {item.type === 'input' && (
                  <div className="text-[#ccff00] font-bold">{item.text}</div>
                )}
                {item.type === 'output' && (
                  <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed font-mono-code bg-[#0e0e16] p-3.5 border-l-2 border-[#ccff00] my-1 shadow-inner">
                    {item.text}
                  </pre>
                )}
                {item.type === 'error' && (
                  <div className="text-red-400 font-bold bg-red-950/30 p-2 border-l-2 border-red-500">{item.text}</div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Input Prompt */}
          <div className="bg-[#0e0e18] border-t-2 border-zinc-800 px-4 py-3.5 flex items-center gap-3 font-mono-code">
            <span className="text-[#ccff00] font-extrabold text-sm sm:text-base">reza@os:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. bio, skills, exp, bpmn, neofetch)..."
              className="flex-1 bg-transparent text-white focus:outline-none text-xs sm:text-sm placeholder:text-zinc-600 font-mono-code"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="px-3 py-1.5 bg-[#ccff00] text-black font-extrabold hover:bg-white transition-colors flex items-center gap-1 text-xs border border-white"
            >
              <span>RUN</span>
              <CornerDownLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
