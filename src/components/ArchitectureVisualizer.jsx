import React, { useState } from 'react';
import { Workflow, Play, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Database, Layers, GitFork } from 'lucide-react';

export default function ArchitectureVisualizer() {
  const [activeTab, setActiveTab] = useState('los');
  const [simStep, setSimStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const architectures = {
    los: {
      title: 'Loan Origination System (LOS) Phase 2 - Camunda BPMN Flow',
      badge: 'ENTERPRISE FINTECH',
      description: 'Orkestrasi alur persetujuan kredit mikro-servis melalui Camunda BPMN engine, Feign Client inter-service, dan evaluasi credit score.',
      steps: [
        { name: '1. Credit Application Ingestion', role: 'API Gateway / Controller', desc: 'Menerima payload pemohon, validasi skema DTO, dan inisiasi business process instance di Camunda.' },
        { name: '2. KYC & SLIK/Credit Scoring Check', role: 'Camunda Service Task (Feign Client)', desc: 'Feign Client memanggil microservice credit score eksternal & internal blacklist database.' },
        { name: '3. Rule-based Underwriting Evaluation', role: 'DMN / Business Rule Engine', desc: 'Evaluasi DMN: Limit plafon, Debt Service Ratio (DSR), dan matriks risiko otomatis.' },
        { name: '4. Multi-Level Approval Gateway', role: 'BPMN User Task & Exclusive Gateway', desc: 'Routing dinamis ke Branch Manager / Credit Committee jika plafon di atas limit standar.' },
        { name: '5. Core Banking Disbursement Trigger', role: 'Kafka Event / REST Client', desc: 'Pencairan dana ke rekening nasabah setelah seluruh status tanda tangan digital terverifikasi.' }
      ]
    },
    agentic: {
      title: 'Autonomous Multi-Agent AI Workflow Architecture',
      badge: 'NEXT-GEN AI ENGINEERING',
      description: 'Sistem orkestrasi agen otonom untuk dekomposisi task, tool-calling, inspeksi kode, dan validasi output deterministik.',
      steps: [
        { name: '1. Intent & Task Decomposition', role: 'Planner Agent (LLM Engine)', desc: 'Membedah prompt kompleks menjadi daftar subtask berurutan dengan skema I/O terdefinisi.' },
        { name: '2. Parallel Subagent Delegation', role: 'Subagent Dispatcher', desc: 'Menjalankan subproses independen secara paralel (code search, static analysis, DB queries).' },
        { name: '3. Tool-Calling & Sandbox Execution', role: 'Execution Environment (Terminal/API)', desc: 'Eksekusi real tooling: unit tests, docker runtime, database migrations.' },
        { name: '4. Deterministic Verification & QA Gate', role: 'Evaluator / Linter', desc: 'Verifikasi hasil eksekusi terhadap skema Pydantic, coverage test, dan standar arsitektur.' },
        { name: '5. Consolidated Delivery & Sync', role: 'Final Agent Synthesis', desc: 'Pengiriman artefak tervalidasi dan pembaruan persistent memory / state engine.' }
      ]
    }
  };

  const currentArch = architectures[activeTab];

  const runSimulation = () => {
    setIsRunning(true);
    setSimStep(0);
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= currentArch.steps.length) {
        clearInterval(interval);
        setIsRunning(false);
      } else {
        setSimStep(current);
      }
    }, 900);
  };

  return (
    <section id="architecture" className="py-24 bg-[#08080c] border-t-2 border-b-2 border-[#1c1c24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Workflow className="w-3.5 h-3.5" />
              <span>//04_SYSTEM_DESIGN_LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase font-display">
              ARCHITECTURE & FLOW VISUALIZER
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setActiveTab('los'); setSimStep(0); }}
              className={`text-xs font-mono-code font-bold px-4 py-2 border-2 transition-all ${
                activeTab === 'los'
                  ? 'bg-[#ccff00] text-black border-white shadow-[3px_3px_0px_#ffffff]'
                  : 'bg-[#121218] text-zinc-300 border-zinc-800 hover:border-zinc-500'
              }`}
            >
              BPMN 2.0 / CAMUNDA LOS
            </button>
            <button
              onClick={() => { setActiveTab('agentic'); setSimStep(0); }}
              className={`text-xs font-mono-code font-bold px-4 py-2 border-2 transition-all ${
                activeTab === 'agentic'
                  ? 'bg-[#ccff00] text-black border-white shadow-[3px_3px_0px_#ffffff]'
                  : 'bg-[#121218] text-zinc-300 border-zinc-800 hover:border-zinc-500'
              }`}
            >
              AGENTIC AI ARCHITECTURE
            </button>
          </div>
        </div>

        {/* Visualizer Card */}
        <div className="bg-[#0b0b12] border-2 border-white p-6 sm:p-8 shadow-[6px_6px_0px_#ccff00]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-8">
            <div>
              <span className="text-xs font-mono-code font-bold bg-[#ccff00] text-black px-2.5 py-0.5 border border-white">
                {currentArch.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-2">
                {currentArch.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono-code mt-1">
                {currentArch.description}
              </p>
            </div>
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`flex items-center gap-2 font-mono-code font-bold text-xs px-5 py-2.5 border-2 border-white shadow-[3px_3px_0px_#000000] transition-all ${
                isRunning
                  ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  : 'bg-[#ccff00] text-black hover:shadow-[4px_4px_0px_#ffffff] hover:translate-y-[-1px]'
              }`}
            >
              {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-black" />}
              <span>{isRunning ? 'PIPELINE RUNNING...' : 'TRIGGER FLOW SIMULATION'}</span>
            </button>
          </div>

          {/* Interactive Steps Visualizer */}
          <div className="space-y-4">
            {currentArch.steps.map((step, idx) => {
              const isPassed = simStep > idx;
              const isCurrent = simStep === idx && isRunning;
              return (
                <div
                  key={idx}
                  className={`p-4 border-2 transition-all font-mono-code ${
                    isCurrent
                      ? 'bg-[#181826] border-[#ccff00] shadow-[4px_4px_0px_#ccff00] translate-x-2'
                      : isPassed
                      ? 'bg-[#0f0f17] border-zinc-700 text-zinc-300'
                      : 'bg-[#0a0a0e] border-zinc-900 text-zinc-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 flex items-center justify-center font-bold text-xs border ${
                          isCurrent
                            ? 'bg-[#ccff00] text-black border-white animate-bounce'
                            : isPassed
                            ? 'bg-zinc-800 text-[#ccff00] border-zinc-700'
                            : 'bg-black text-zinc-600 border-zinc-800'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isCurrent ? 'text-[#ccff00]' : isPassed ? 'text-white' : 'text-zinc-400'}`}>
                          {step.name}
                        </div>
                        <div className="text-[11px] text-zinc-500 font-mono-code">
                          ROLE: {step.role}
                        </div>
                      </div>
                    </div>
                    <div>
                      {isCurrent && (
                        <span className="text-[10px] font-bold bg-[#ccff00] text-black px-2 py-0.5 animate-pulse">
                          EXECUTING
                        </span>
                      )}
                      {isPassed && (
                        <CheckCircle2 className="w-5 h-5 text-[#ccff00]" />
                      )}
                    </div>
                  </div>
                  <p className={`text-xs mt-2 pl-10 font-sans ${isPassed || isCurrent ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
