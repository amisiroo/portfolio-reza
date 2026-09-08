import React, { useState, useEffect, useRef } from 'react';
import { Workflow, Play, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Database, Layers, GitFork, Terminal, Code2, Server, Cpu, Box, FileJson } from 'lucide-react';

export default function ArchitectureVisualizer() {
  const [activeTab, setActiveTab] = useState('los');
  const [simStep, setSimStep] = useState(0);
  const [selectedStep, setSelectedStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const logBoxRef = useRef(null);
  const isInitialLogMount = useRef(true);

  const architectures = {
    los: {
      title: 'Loan Origination System (LOS) Phase 2 — Camunda BPMN 2.0 Engine',
      badge: 'ENTERPRISE FINTECH ARCHITECTURE',
      scope: 'PT Pegadaian Digital Lending Ecosystem',
      description: 'Orkestrasi alur persetujuan kredit mikro-servis enterprise melalui Camunda BPMN engine, inter-service Spring Cloud OpenFeign, dan evaluasi matriks DMN.',
      metrics: {
        throughput: '1,200 req/min',
        latency: '85ms avg',
        reliability: '99.98%'
      },
      steps: [
        {
          name: '1. Ingestion & DTO Schema Validation',
          role: 'Spring Boot API Gateway / Controller',
          protocol: 'HTTP POST /api/v2/los/applications',
          desc: 'Menerima payload pengajuan pemohon, verifikasi cryptographic signature, validasi skema DTO, dan inisiasi business process instance di Camunda Engine.',
          payload: {
            applicationId: 'LOS-2026-9042',
            applicantId: 'CUST-88491',
            loanAmount: 150000000,
            tenorMonths: 36,
            productType: 'PINJAMAN_USAHA_MIKRO',
            status: 'INITIALIZED'
          },
          techContract: '@PostMapping("/applications")\npublic ResponseEntity<LosResponse> createApplication(@Valid @RequestBody LosApplicationDto dto) {\n  ProcessInstance instance = runtimeService.startProcessInstanceByKey("Process_LOS_Phase2", dto.toVariables());\n  return ResponseEntity.accepted().body(new LosResponse(instance.getId(), "PROCESS_STARTED"));\n}'
        },
        {
          name: '2. KYC & SLIK Credit Scoring Ingestion',
          role: 'Camunda Service Task (OpenFeign Client)',
          protocol: 'FeignClient -> SLIK_OJK_SERVICE',
          desc: 'Camunda Service Task memanggil microservice credit rating OJK SLIK dan internal blacklist database secara asynchronous via OpenFeign declarative client.',
          payload: {
            applicationId: 'LOS-2026-9042',
            slikScore: 'KOL-1 (LANCAR)',
            pefindoScore: 785,
            blacklisted: false,
            estimatedMonthlyIncome: 35000000
          },
          techContract: '@FeignClient(name = "credit-scoring-service", url = "${enterprise.services.scoring.url}")\npublic interface CreditScoringClient {\n  @GetMapping("/v1/slik-check/{nik}")\n  SlikVerificationResult verifyCreditBureau(@PathVariable("nik") String nik);\n}'
        },
        {
          name: '3. Automated DMN Underwriting Engine',
          role: 'Camunda DMN (Decision Table Engine)',
          protocol: 'DMN Rule Evaluation Engine',
          desc: 'Evaluasi tabel keputusan DMN: Kalkulasi Debt Service Ratio (DSR), batas plafon maksimum, dan penetapan suku bunga risiko otomatis.',
          payload: {
            applicationId: 'LOS-2026-9042',
            calculatedDSR: '28.4% (Max allowed 40%)',
            riskCategory: 'LOW_RISK_GRADE_A',
            underwritingDecision: 'AUTOMATIC_PRE_APPROVED',
            recommendedInterestRate: '0.75% / month'
          },
          techContract: '<!-- Camunda DMN XML Rule Fragment -->\n<decisionTable id="Decision_UnderwritingMatrix" hitPolicy="FIRST">\n  <rule id="Rule_GradeA">\n    <inputEntry> <![CDATA[ dsrScore < 30 && slikGrade == "KOL-1" ]]> </inputEntry>\n    <outputEntry> "PRE_APPROVED_TIER_1" </outputEntry>\n  </rule>\n</decisionTable>'
        },
        {
          name: '4. Multi-Tier Approval Gateway & Signature',
          role: 'BPMN User Task & Exclusive Gateway',
          protocol: 'BPMN Dynamic Task Routing',
          desc: 'Routing dinamis: Jika plafon > 100 Juta, alur otomatis membuka User Task review Branch Manager, lalu men-trigger modul Tanda Tangan Digital (Privy/Teknologi ID).',
          payload: {
            applicationId: 'LOS-2026-9042',
            assignedApprover: 'Branch_Manager_Bandung_01',
            approvalStatus: 'APPROVED_BY_BRANCH_MANAGER',
            digitalSignatureStatus: 'SIGNED_VERIFIED_SHA256',
            timestamp: '2026-09-08T10:45:00Z'
          },
          techContract: '// Camunda Java Delegate Execution\npublic class ApprovalRoutingDelegate implements JavaDelegate {\n  @Override\n  public void execute(DelegateExecution execution) {\n    Long amount = (Long) execution.getVariable("loanAmount");\n    execution.setVariable("requiresBranchManagerReview", amount > 100000000L);\n  }\n}'
        },
        {
          name: '5. Core Banking Settlement & Disbursement',
          role: 'Transactional Outbox & Core Banking Client',
          protocol: 'Kafka Event / REST API Core Banking',
          desc: 'Pencairan dana kredit langsung ke rekening nasabah via Core Banking API dengan pola Transactional Outbox untuk menjamin konsistensi ACID 100%.',
          payload: {
            applicationId: 'LOS-2026-9042',
            disbursementStatus: 'SUCCESS_FUNDS_DISBURSED',
            transferReference: 'TRX-CORE-99482103',
            settledAmount: 150000000,
            accountDestination: '5350-0089-****-01'
          },
          techContract: '@Transactional\npublic void completeDisbursement(String applicationId) {\n  OutboxEvent event = new OutboxEvent("LOS_DISBURSED", applicationId, payload);\n  outboxRepository.save(event);\n  coreBankingClient.executeDisburse(applicationId);\n}'
        }
      ]
    },
    agentic: {
      title: 'Autonomous Multi-Agent AI Workflow Architecture',
      badge: 'NEXT-GEN AI ARCHITECTURE',
      scope: 'Multi-Agent Sandbox Execution & Linter Gates',
      description: 'Sistem orkestrasi agen otonom untuk dekomposisi task, tool-calling, inspeksi kode, dan validasi output deterministik.',
      metrics: {
        throughput: 'Parallel 10 Agents',
        latency: 'Sub-second tool calls',
        reliability: '100% Deterministic QA'
      },
      steps: [
        {
          name: '1. Strategic Task Decomposition',
          role: 'Chief Planner Agent (LLM Core)',
          protocol: 'Structured JSON Prompt Decomposition',
          desc: 'Menganalisis prompt kompleks, memetakan dependensi, dan memecah tujuan strategis menjadi subtask diskrit dengan target terukur.',
          payload: {
            taskId: 'TASK-AI-771',
            intent: 'REFACTOR_MICROSERVICE_SECURITY',
            subtasksCount: 4,
            isolationRequired: true
          },
          techContract: 'class PlanSchema(BaseModel):\n    objective: str\n    subtasks: List[SubtaskPlan]\n    qa_criteria: Dict[str, Any]'
        },
        {
          name: '2. Parallel Subagent Delegation',
          role: 'Subagent Dispatcher Runtime',
          protocol: 'Isolated Process Spawning',
          desc: 'Menjalankan subproses independen di environment terisolasi secara paralel (code analysis, DB query check, API unit testing).',
          payload: {
            activeSubagents: ['agent_code_analyzer', 'agent_sec_audit', 'agent_linter'],
            concurrencyLimit: 10,
            status: 'DISPATCHED'
          },
          techContract: 'def spawn_subagents(plan: PlanSchema):\n    results = parallel_exec([agent.run(task) for task in plan.subtasks])\n    return results'
        },
        {
          name: '3. Native Tool Execution & Sandboxing',
          role: 'Tooling Engine (Terminal/AST/API)',
          protocol: 'POSIX Bash / Node runtime',
          desc: 'Eksekusi real tooling: static code analysis, AST transformations, build verification, dan Docker sandboxed tests.',
          payload: {
            command: 'npm run build && npm run test',
            exitCode: 0,
            testResults: '34 passed, 0 failed'
          },
          techContract: 'const execResult = await terminal.run("npm test -- --coverage");\nassert(execResult.exitCode === 0);'
        },
        {
          name: '4. Deterministic QA Gate & Schema Validation',
          role: 'Evaluator / Linter Gate',
          protocol: 'Pydantic / Vision QA Guardrail',
          desc: 'Memvalidasi output agen terhadap skema strict, linter rules, dan verifikasi visual untuk mencegah halusinasi AI.',
          payload: {
            schemaValid: true,
            linterErrors: 0,
            qaVerdict: 'PASSED_QUALITY_GATE'
          },
          techContract: 'def enforce_qa_gate(artifact: Artifact) -> bool:\n    validate_pydantic_schema(artifact)\n    assert not artifact.contains_hallucinations()'
        },
        {
          name: '5. Synchronized Delivery & Persistent Memory',
          role: 'Memory Engine & Git Dispatcher',
          protocol: 'Git Commit / Holographic Memory Store',
          desc: 'Commit artefak tervalidasi ke repository GitHub dan sinkronisasi fakta baru ke memory persistent.',
          payload: {
            gitCommit: 'feat: updated microservice security filter',
            branch: 'main',
            memoryUpdated: true
          },
          techContract: 'await git.commitAndPush({ message: "feat: verified release" });\nawait holographicMemory.updateFacts(newLessons);'
        }
      ]
    },
    omnichannel: {
      title: 'Omnichannel Retail & Multi-Store ERP Integration',
      badge: 'COMMERCE INTEGRATION',
      scope: 'Multi-Store Catalog, Inventory & Logistics Hub',
      description: 'Sinkronisasi stok multi-gudang real-time, rekonsiliasi invoice logistik, dan webhook otomatisasi pesanan.',
      metrics: {
        throughput: '5,000 orders/hour',
        latency: '< 150ms sync',
        reliability: 'Zero overselling'
      },
      steps: [
        {
          name: '1. Webhook Ingestion & Order Normalization',
          role: 'Omnichannel Gateway',
          protocol: 'HTTPS Webhook Payload Ingestion',
          desc: 'Menerima order event dari berbagai marketplace, normalisasi format order menjadi schema kanonikal terpadu.',
          payload: { channel: 'SHOPEE_ID', orderId: 'ORD-99120', sku: 'SKU-BRUTALIST-01', qty: 2 },
          techContract: 'POST /api/webhooks/orders\nContent-Type: application/json\nHeaders: X-Signature-SHA256'
        },
        {
          name: '2. Multi-Warehouse Inventory Reservation',
          role: 'Distributed Stock Manager',
          protocol: 'Redis Atomic Distributed Lock',
          desc: 'Mengunci dan mereservasi kuota stok gudang terdekat secara atomic untuk mencegah overselling.',
          payload: { warehouseId: 'WH-BDG-01', reservedQty: 2, remainingStock: 48 },
          techContract: 'redis.set("lock:sku:01", orderId, "NX", "EX", 10);\nupdateInventoryStock(warehouseId, sku, -2);'
        },
        {
          name: '3. ERP & Accounting Ledger Reconciliation',
          role: 'Transactional Outbox Service',
          protocol: 'PostgreSQL Relational DB Ledger',
          desc: 'Pencatatan jurnal piutang, PPN, dan invoice logistik ke database ERP secara konsisten.',
          payload: { invoiceNo: 'INV-2026-8819', totalTax: 11000, status: 'RECONCILED' },
          techContract: 'INSERT INTO erp_ledger (invoice_no, tax, amount) VALUES (?, ?, ?);'
        },
        {
          name: '4. Logistics Dispatch & Airwaybill Generation',
          role: '3PL Logistics API Client',
          protocol: 'REST Client -> Logistics Partner API',
          desc: 'Men-generate nomor resi otomatis (AWB) dan mengirim data pick-up ke kurir ekspedisi.',
          payload: { courier: 'JNE_REG', awb: 'JNE-8840192841', pickupScheduled: '14:00 WIB' },
          techContract: 'await logisticsClient.createShipment({ orderId, courier: "JNE" });'
        },
        {
          name: '5. Real-Time Channel Status Broadcast',
          role: 'Event Dispatcher',
          protocol: 'Kafka Event Broadcast',
          desc: 'Mengabari marketplace bahwa pesanan siap di-pickup dan memperbarui stok agregat di seluruh channel.',
          payload: { orderStatus: 'READY_TO_SHIP', globalStockSync: 'COMPLETED_ALL_CHANNELS' },
          techContract: 'kafkaTemplate.send("order-dispatched-topic", orderEvent);'
        }
      ]
    }
  };

  const currentArch = architectures[activeTab];
  const activeStepDetail = currentArch.steps[selectedStep] || currentArch.steps[0];

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-12), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    setSelectedStep(0);
    setSimStep(0);
    setIsRunning(false);
    setLogs([`Initialized architecture: ${currentArch.title}`, `Ready to execute simulation runner.`]);
  }, [activeTab]);

  useEffect(() => {
    if (isInitialLogMount.current) {
      isInitialLogMount.current = false;
      return;
    }
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [logs]);

  const runSimulation = () => {
    setIsRunning(true);
    setSimStep(0);
    setSelectedStep(0);
    setLogs([`[SIMULATION START] Triggering ${currentArch.title}...`]);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= currentArch.steps.length) {
        clearInterval(interval);
        setIsRunning(false);
        setSimStep(currentArch.steps.length - 1);
        setSelectedStep(currentArch.steps.length - 1);
        setLogs(prev => [...prev, `[SUCCESS] All ${currentArch.steps.length} nodes verified. Process instance completed cleanly.`]);
      } else {
        setSimStep(current);
        setSelectedStep(current);
        const stepInfo = currentArch.steps[current];
        setLogs(prev => [...prev, `[STEP ${current + 1}/${currentArch.steps.length}] ${stepInfo.name} -> ${stepInfo.role} (200 OK)`]);
      }
    }, 1100);
  };

  return (
    <section id="architecture" className="py-24 bg-[#07070b] border-t-2 border-b-2 border-[#1c1c24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Workflow className="w-3.5 h-3.5" />
              <span>//04_SYSTEM_DESIGN_LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display">
              ARCHITECTURE & FLOW VISUALIZER
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400 max-w-2xl mt-2">
              Simulator alur kerja enterprise & arsitektur mikroservis interaktif. Klik node mana saja untuk menginspeksi payload JSON, kontrak Spring Boot, dan alur data nyata.
            </p>
          </div>

          {/* Architecture Switcher Tabs */}
          <div className="flex flex-wrap gap-2 font-mono-code text-xs">
            <button
              onClick={() => setActiveTab('los')}
              className={`px-4 py-2.5 border-2 font-bold transition-all ${
                activeTab === 'los'
                  ? 'bg-[#ccff00] text-black border-white shadow-[4px_4px_0px_#ffffff]'
                  : 'bg-[#121218] text-zinc-300 border-zinc-800 hover:border-zinc-500'
              }`}
            >
              1. CAMUNDA LOS (FINTECH)
            </button>
            <button
              onClick={() => setActiveTab('agentic')}
              className={`px-4 py-2.5 border-2 font-bold transition-all ${
                activeTab === 'agentic'
                  ? 'bg-[#ccff00] text-black border-white shadow-[4px_4px_0px_#ffffff]'
                  : 'bg-[#121218] text-zinc-300 border-zinc-800 hover:border-zinc-500'
              }`}
            >
              2. AGENTIC AI PIPELINE
            </button>
            <button
              onClick={() => setActiveTab('omnichannel')}
              className={`px-4 py-2.5 border-2 font-bold transition-all ${
                activeTab === 'omnichannel'
                  ? 'bg-[#ccff00] text-black border-white shadow-[4px_4px_0px_#ffffff]'
                  : 'bg-[#121218] text-zinc-300 border-zinc-800 hover:border-zinc-500'
              }`}
            >
              3. OMNICHANNEL ERP SYNC
            </button>
          </div>
        </div>

        {/* Main Interactive Board */}
        <div className="bg-[#0b0b14] border-2 border-white p-6 sm:p-8 shadow-[8px_8px_0px_#ccff00]">
          {/* Header Card Info */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code font-bold bg-[#ccff00] text-black px-2.5 py-0.5 border border-white">
                  {currentArch.badge}
                </span>
                <span className="text-xs font-mono-code text-zinc-400">
                  SCOPE: <strong className="text-zinc-200">{currentArch.scope}</strong>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {currentArch.title}
              </h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                {currentArch.description}
              </p>
            </div>

            {/* Simulation Trigger */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className={`flex items-center gap-2 font-mono-code font-extrabold text-xs px-6 py-3.5 border-2 border-white shadow-[4px_4px_0px_#000000] transition-all ${
                  isRunning
                    ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                    : 'bg-[#ccff00] text-black hover:shadow-[5px_5px_0px_#ffffff] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                }`}
              >
                {isRunning ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-black stroke-[2]" />
                )}
                <span>{isRunning ? 'FLOW RUNNING...' : 'TRIGGER FLOW SIMULATION'}</span>
              </button>
            </div>
          </div>

          {/* Metrics Pill Bar */}
          <div className="grid grid-cols-3 gap-3 mb-8 font-mono-code text-xs">
            <div className="bg-[#12121c] p-3 border border-zinc-800">
              <div className="text-zinc-500 text-[10px]">THROUGHPUT CAPACITY</div>
              <div className="text-white font-bold text-sm mt-0.5 text-[#ccff00]">{currentArch.metrics.throughput}</div>
            </div>
            <div className="bg-[#12121c] p-3 border border-zinc-800">
              <div className="text-zinc-500 text-[10px]">EXECUTION LATENCY</div>
              <div className="text-white font-bold text-sm mt-0.5">{currentArch.metrics.latency}</div>
            </div>
            <div className="bg-[#12121c] p-3 border border-zinc-800">
              <div className="text-zinc-500 text-[10px]">SERVICE RELIABILITY</div>
              <div className="text-white font-bold text-sm mt-0.5">{currentArch.metrics.reliability}</div>
            </div>
          </div>

          {/* Two-Column Area: Left Interactive Step Nodes, Right Inspector Drawer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Steps List */}
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>PIPELINE EXECUTION NODES (CLICK TO INSPECT):</span>
                <span className="text-[#ccff00]">STEP {selectedStep + 1} OF {currentArch.steps.length}</span>
              </div>

              {currentArch.steps.map((step, idx) => {
                const isPassed = simStep > idx;
                const isCurrent = simStep === idx && isRunning;
                const isSelected = selectedStep === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedStep(idx)}
                    className={`p-4 border-2 transition-all cursor-pointer font-mono-code relative group ${
                      isSelected
                        ? 'bg-[#161624] border-[#ccff00] shadow-[4px_4px_0px_#ccff00] translate-x-1'
                        : isCurrent
                        ? 'bg-[#181826] border-[#ccff00] animate-pulse'
                        : isPassed
                        ? 'bg-[#0f0f18] border-zinc-700 text-zinc-300'
                        : 'bg-[#09090e] border-zinc-800/80 text-zinc-500 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 flex items-center justify-center font-bold text-xs border ${
                            isCurrent
                              ? 'bg-[#ccff00] text-black border-white animate-bounce'
                              : isSelected
                              ? 'bg-[#ccff00] text-black border-white'
                              : isPassed
                              ? 'bg-zinc-800 text-[#ccff00] border-zinc-700'
                              : 'bg-black text-zinc-600 border-zinc-800'
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${isSelected ? 'text-[#ccff00]' : isPassed ? 'text-white' : 'text-zinc-300'}`}>
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
                            ACTIVE
                          </span>
                        )}
                        {isPassed && !isCurrent && (
                          <CheckCircle2 className="w-5 h-5 text-[#ccff00]" />
                        )}
                      </div>
                    </div>

                    <p className={`text-xs mt-2.5 pl-10 font-sans leading-relaxed ${isSelected || isPassed ? 'text-zinc-300' : 'text-zinc-500'}`}>
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Live Node & Payload Inspector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FileJson className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>INSPECTOR: NODE #{selectedStep + 1} PAYLOAD & CODE CONTRACT</span>
              </div>

              {/* Inspector Window */}
              <div className="bg-[#08080d] border-2 border-zinc-700 p-5 space-y-4 font-mono-code">
                {/* Node Top Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <div className="text-xs text-[#ccff00] font-bold">
                      {activeStepDetail.name}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      PROTOCOL: <span className="text-zinc-200">{activeStepDetail.protocol}</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#1a1a26] text-zinc-300 px-2 py-1 border border-zinc-700">
                    INSPECTED
                  </span>
                </div>

                {/* JSON Data Payload */}
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
                    <span>LIVE DATA PAYLOAD (DTO STATE):</span>
                  </div>
                  <pre className="bg-[#0f0f18] p-3 text-xs text-[#a3e635] border border-zinc-800 overflow-x-auto selection:bg-[#ccff00] selection:text-black">
                    {JSON.stringify(activeStepDetail.payload, null, 2)}
                  </pre>
                </div>

                {/* Code / Architecture Contract */}
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Code2 className="w-3 h-3 text-[#ccff00]" />
                    <span>TECHNICAL CONTRACT / CODE DELEGATE:</span>
                  </div>
                  <pre className="bg-[#0f0f18] p-3 text-[11px] text-zinc-200 border border-zinc-800 overflow-x-auto whitespace-pre-wrap selection:bg-[#ccff00] selection:text-black leading-relaxed">
                    {activeStepDetail.techContract}
                  </pre>
                </div>
              </div>

              {/* Real-Time Telemetry Log Box */}
              <div className="bg-[#08080d] border border-zinc-800 p-4 font-mono-code text-xs space-y-2">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                  <span>LIVE EXECUTION LOGS</span>
                  <span className="text-[#ccff00] animate-pulse">● LIVE STREAM</span>
                </div>
                <div ref={logBoxRef} className="h-28 overflow-y-auto space-y-1 text-zinc-300 text-[11px] bg-[#050508] p-2 border border-zinc-900">
                  {logs.map((log, i) => (
                    <div key={i} className="leading-snug">
                      <span className="text-[#ccff00]">{log.slice(0, 10)}</span>
                      <span>{log.slice(10)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
