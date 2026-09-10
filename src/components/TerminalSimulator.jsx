import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, workExperience, skillCategories } from '../data/portfolioData';
import { Terminal as TermIcon, CornerDownLeft, Trash2, Download } from 'lucide-react';
import { SpadeCardSticker } from './GamblerStickers';

export default function TerminalSimulator() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { id: 1, type: 'system', text: '╔══════════════════════════════════════════════════════════════════╗' },
    { id: 2, type: 'system', text: '║  AMISIROO v3.5.0 (x86_64-hermes-system) • PRODUCTION ACTIVE      ║' },
    { id: 3, type: 'system', text: '║  SYSTEM ANALYST • AI MANAGEMENT SYSTEMS • AI AUTOMATION SPECIALIST  ║' },
    { id: 4, type: 'system', text: '╚══════════════════════════════════════════════════════════════════╝' },
    { id: 5, type: 'system', text: 'Type "help" to inspect commands, or press [Tab] / click quick chips below.' }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [typingId, setTypingId] = useState(null);
  const [displayedTextMap, setDisplayedTextMap] = useState({});

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
  }, [history, displayedTextMap]);

  const availableCommands = [
    'help', 'bio', 'skills', 'exp', 'bpmn', 'cv', 'neofetch', 'contact', 'hire', 'clear'
  ];

  const streamOutput = (fullText, targetId) => {
    setIsTyping(true);
    setTypingId(targetId);
    let currentLen = 0;
    const totalLen = fullText.length;
    const step = totalLen > 300 ? 5 : totalLen > 100 ? 3 : 1;
    const speed = totalLen > 300 ? 12 : 16;

    const timer = setInterval(() => {
      currentLen += step;
      if (currentLen >= totalLen) {
        clearInterval(timer);
        setDisplayedTextMap(prev => ({ ...prev, [targetId]: fullText }));
        setIsTyping(false);
        setTypingId(null);
      } else {
        setDisplayedTextMap(prev => ({ ...prev, [targetId]: fullText.slice(0, currentLen) }));
      }
    }, speed);
  };

  const formatExperienceOutput = () => {
    const divider = '─'.repeat(64);
    return workExperience.map((exp, i) => {
      const highlightsFormatted = exp.highlights
        .map(h => `    • ${h}`)
        .join('\n');
      const tagsFormatted = exp.tags.map(t => `#${t}`).join('  ');

      return `[0${i + 1}] ${exp.company.toUpperCase()}
    ROLE     : ${exp.role}
    DIVISION : ${exp.division}
    PERIOD   : ${exp.period} [${exp.badge}]
    TYPE     : ${exp.type}
${divider}
    SUMMARY:
    ${exp.description}

    CORE DELIVERABLES:
${highlightsFormatted}

    STACK:
    ${tagsFormatted}`;
    }).join(`\n\n${'═'.repeat(64)}\n\n`);
  };

  const handleCommand = (cmdStr) => {
    if (isTyping) return;
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    setCmdHistory(prev => [...prev, cmdStr]);
    setHistoryIdx(-1);

    const inputEntryId = Date.now();
    const outputEntryId = inputEntryId + 1;

    let outputText = '';
    let isError = false;

    switch (cleanCmd) {
      case 'help':
        outputText = `AVAILABLE COMMANDS IN AMISIROO.SYS:
  • bio        : Ringkasan profil & latar belakang akademik STI ITB
  • exp        : Riwayat pengalaman terstruktur (PT Agansa, Padepokan 79, Foom)
  • skills     : Audit lengkap matriks kompetensi teknis & framework
  • bpmn       : Detail pemodelan 30+ BPMN Camunda & ANTLR v4 static mapping
  • cv         : Unduh resume resmi PDF (CV - Muhammad Reza Nur Fauzi.pdf)
  • neofetch   : System specs, kernel version, and tech stack telemetry
  • contact    : Endpoint komunikasi (Email & WhatsApp direct 08988090008)
  • hire       : Jalur kolaborasi / project inquiry
  • clear      : Bersihkan buffer layar terminal`;
        break;

      case 'bio':
        outputText = `IDENTIFIER  : ${personalInfo.name}
ROLE        : System Analyst & AI Automation Specialist
PASSION     : Applied AI to Enterprise Systems, AIMS, Multi-Agent Orchestration
ALUMNI      : ${personalInfo.education.institution} (${personalInfo.education.degree})
PERIOD      : ${personalInfo.education.period}
LOCATION    : ${personalInfo.location} (${personalInfo.timezone})
CURRENT     : PT. Agansa Primatama (OSM Dept — IT Technical & System Integration)
FOCUS       : System Analysis, AI Management Systems (AIMS), AI Automation & Agentic Workflows, BPMN 2.0, AS-IS / TO-BE Gap Analysis.`;
        break;

      case 'exp':
        outputText = formatExperienceOutput();
        break;

      case 'skills':
        outputText = skillCategories.map(c => `// ${c.title.toUpperCase()}\n` + c.skills.map(s => `  • ${s.name.padEnd(32)} [${s.level}] -> ${s.context}`).join('\n')).join('\n\n');
        break;

      case 'bpmn':
        outputText = `CAMUNDA BPMN 2.0 & ANTLR v4 STATIC CODE ANALYSIS:
  • Modeled 30+ production BPMN diagrams in Camunda Modeler for loan origination workflows.
  • Mapped application logic & microservices communication using ANTLR v4 function call graphs.
  • Mapped asynchronous inter-service Kafka topic event streams.
  • Conducted AS-IS / TO-BE Gap Analysis and identified technical migration dependencies.
  • Documented database persistence patterns and query access for SQL Server.`;
        break;

      case 'cv':
      case 'download-cv':
        outputText = `[!] Initiating official resume download...\nFile: CV_Muhammad_Reza_Nur_Fauzi.pdf (Updated & Verified)\nURL : /CV_Muhammad_Reza_Nur_Fauzi.pdf`;
        // Trigger browser download
        const link = document.createElement('a');
        link.href = '/CV_Muhammad_Reza_Nur_Fauzi.pdf';
        link.download = 'CV_Muhammad_Reza_Nur_Fauzi.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case 'neofetch':
        outputText = `       __             amisiroo@hermes-os
      /  \\            -------------
     / /\\ \\           OS: AMISIROO.SYS Enterprise x86_64
    / /  \\ \\          Host: Institut Teknologi Bandung (STI 2019-2025)
   /_/    \\_\\         Role: System Analyst & AI Automation Specialist (Applied AI to Enterprise Systems, AIMS, Multi-Agent Orchestration)
                      Active: PT. Agansa Primatama (Divisi OSM)
                      Kernel: 6.8.0-spring-boot-camunda-aims-agentic
                      Shell: zsh 5.9 (ai-automation-interactive)
                      Stack: BPMN 2.0, AIMS, Multi-Agent LLM, Java 17, Spring Boot, Kafka, Salesforce, PHP`;
        break;

      case 'contact':
        outputText = `COMMUNICATION CHANNELS:
  • EMAIL    : ${personalInfo.email}
  • WHATSAPP : ${personalInfo.phone} (${personalInfo.waLink})
  • LOCATION : ${personalInfo.location}
  • STATUS   : Available for System Analyst & Engineering Collaboration`;
        break;

      case 'hire':
        outputText = `[!] Dispatching direct communication channel...\nDirect WhatsApp: ${personalInfo.waLink}`;
        break;

      case 'clear':
        setHistory([]);
        setDisplayedTextMap({});
        setInputVal('');
        return;

      default:
        isError = true;
        outputText = `zsh: command not found: "${cmdStr}". Type "help" to inspect list of valid commands.`;
        break;
    }

    const newHistory = [
      ...history,
      { id: inputEntryId, type: 'input', text: `amisiroo@sys-matrix:~$ ${cmdStr}` },
      { id: outputEntryId, type: isError ? 'error' : 'output', text: outputText, isStreaming: true }
    ];

    setHistory(newHistory);
    setInputVal('');

    streamOutput(outputText, outputEntryId);
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

  const quickChips = ['help', 'bio', 'skills', 'exp', 'bpmn', 'cv', 'neofetch', 'contact', 'clear'];

  return (
    <section id="terminal" className="py-24 bg-transparent relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <TermIcon className="w-3.5 h-3.5" />
              <span>//05_CLI_SHELL_SIMULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display">
              INTERACTIVE AMISIROO TERMINAL
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400 mt-2">
              Interface shell developer dengan simulasi komputasi karakter per karakter (*typewriter stream*), autocompletion [Tab], dan history [↑/↓].
            </p>
          </div>
          <div className="hidden lg:block shrink-0 pb-1">
            <SpadeCardSticker size={52} rotation="-8deg" />
          </div>


        </div>

        {/* Terminal Window Box (FIXED HEIGHT 480px to prevent layout shift) */}
        <div className="bg-[#09090f] border-2 border-white shadow-[8px_8px_0px_#ccff00] h-[620px] sm:h-[680px] flex flex-col justify-between">
          {/* Top Titlebar */}
          <div className="bg-[#12121c] border-b-2 border-zinc-800 px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/40" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/40" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/40" />
              <span className="text-xs font-mono-code font-bold text-zinc-300 ml-2 flex items-center gap-2">
                <span>amisiroo@sys-matrix: ~/sys_analyst (zsh)</span>
                {isTyping && (
                  <span className="text-[10px] text-[#ccff00] font-mono-code animate-pulse">
                    [COMPUTING_STREAM...]
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setHistory([]); setDisplayedTextMap({}); }}
                className="text-zinc-400 hover:text-[#ccff00] transition-colors p-1"
                title="Clear buffer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Command Chips Toolbar */}
          <div className="px-4 py-2 bg-[#0c0c14] border-b border-zinc-800 flex flex-wrap gap-2 items-center text-xs font-mono-code shrink-0">
            <span className="text-zinc-500 font-bold text-[10px]">QUICK_RUN:</span>
            {quickChips.map((chip) => (
              <button
                key={chip}
                disabled={isTyping}
                onClick={() => handleCommand(chip)}
                className="px-2.5 py-0.5 bg-[#161622] hover:bg-[#ccff00] hover:text-black text-zinc-300 border border-zinc-700 hover:border-white transition-all font-semibold disabled:opacity-50"
              >
                ${chip}
              </button>
            ))}
          </div>

          {/* Terminal Output Log Buffer (FIXED SCROLL CONTAINER) */}
          <div
            ref={scrollContainerRef}
            className="p-4 sm:p-6 font-mono-code text-xs sm:text-sm flex-1 overflow-y-auto space-y-3 bg-[#06060a] selection:bg-[#ccff00] selection:text-black"
          >
            {history.map((item) => {
              const currentContent = item.isStreaming 
                ? (displayedTextMap[item.id] !== undefined ? displayedTextMap[item.id] : '') 
                : item.text;
              const isCurrentlyStreaming = typingId === item.id;

              return (
                <div key={item.id} className="leading-relaxed">
                  {item.type === 'system' && (
                    <div className="text-zinc-500 font-mono-code">{item.text}</div>
                  )}
                  {item.type === 'input' && (
                    <div className="text-[#ccff00] font-bold">{item.text}</div>
                  )}
                  {item.type === 'output' && (
                    <pre className="text-zinc-200 whitespace-pre-wrap leading-relaxed font-mono-code bg-[#0e0e16] p-4 border-l-2 border-[#ccff00] my-1 shadow-inner">
                      {currentContent}
                      {isCurrentlyStreaming && <span className="inline-block w-2 h-4 bg-[#ccff00] ml-1 animate-pulse align-middle" />}
                    </pre>
                  )}
                  {item.type === 'error' && (
                    <div className="text-red-400 font-bold bg-red-950/30 p-2.5 border-l-2 border-red-500">
                      {currentContent}
                      {isCurrentlyStreaming && <span className="inline-block w-2 h-4 bg-red-400 ml-1 animate-pulse align-middle" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Input Prompt */}
          <div className="bg-[#0e0e18] border-t-2 border-zinc-800 px-4 py-3 flex items-center gap-3 font-mono-code shrink-0">
            <span className="text-[#ccff00] font-extrabold text-sm sm:text-base">amisiroo@sys-matrix:~$</span>
            <input
              type="text"
              value={inputVal}
              disabled={isTyping}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isTyping ? "Streaming computation output..." : "type a command (e.g. bio, skills, exp, bpmn, cv)..."}
              className="flex-1 bg-transparent text-white focus:outline-none text-xs sm:text-sm placeholder:text-zinc-600 font-mono-code disabled:opacity-60"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              disabled={isTyping}
              className="px-3 py-1.5 bg-[#ccff00] text-black font-extrabold hover:bg-white transition-colors flex items-center gap-1 text-xs border border-white disabled:opacity-50"
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
