import React, { useState, useEffect, useRef } from 'react';
import { Workflow, Play, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Database, Layers, GitFork, Terminal, Code2, Server, Cpu, Box, FileJson, Check } from 'lucide-react';
import { KingSpadeCardSticker, DicePairSticker } from './GamblerStickers';

export default function ArchitectureVisualizer() {
  const [activeTab, setActiveTab] = useState('los');
  const [simStep, setSimStep] = useState(0);
  const [selectedStep, setSelectedStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [logs, setLogs] = useState([]);
  const logBoxRef = useRef(null);
  const isInitialLogMount = useRef(true);

  const architectures = {
    los: {
      title: 'Loan Origination System (LOS) Phase 2 — System Analysis & Static Code Mapping',
      company: 'PT. Padepokan Tujuh Sembilan',
      badge: 'ENTERPRISE SYSTEM ANALYSIS',
      period: 'Dec 2025 – Jun 2026',
      description: 'Menganalisis sistem eksisting LOS Phase 2, memetakan logika aplikasi & komunikasi Kafka via static code analysis ANTLR v4 (call graph), pemodelan 30+ BPMN Camunda, dan audit persistensi SQL Server.',
      metrics: {
        coverage: '30+ BPMN Diagrams',
        method: 'ANTLR v4 Call Graphs',
        events: 'Kafka Topics Mapping'
      },
      steps: [
        {
          name: '1. Financing Ingestion & Controller Structure Analysis',
          role: 'Spring Boot Application Layer',
          protocol: 'HTTP POST /api/v2/los/financing/applications',
          desc: 'Menganalisis arsitektur sistem eksisting LOS Phase 2 untuk memahami end-to-end alur pengajuan pembiayaan, aturan bisnis, validasi DTO, dan dependensi teknis.',
          payload: {
            applicationId: 'LOS-P2-2026-084',
            financingType: 'PEMBIAYAAN_MODAL_KERJA',
            loanAmount: 250000000,
            tenorMonths: 24,
            status: 'INITIALIZED_ANALYSIS'
          },
          techContract: '@RestController\n@RequestMapping("/api/v2/los/financing")\npublic class LosFinancingController {\n  @PostMapping("/applications")\n  public ResponseEntity<ApiResponse> ingestApplication(@Valid @RequestBody FinancingDto dto) {\n    log.info("Ingesting LOS Phase 2 Application: {}", dto.getApplicationId());\n    return ResponseEntity.ok(losService.initiateFinancingWorkflow(dto));\n  }\n}'
        },
        {
          name: '2. ANTLR v4 Static Code Analysis & Function Call Graph',
          role: 'Grammar Parser & Call Graph Generator',
          protocol: 'ANTLR v4 AST Tree Traversal',
          desc: 'Memetakan application logic dan dependensi internal method microservices secara statis menggunakan parser ANTLR v4 guna menghasilkan graph panggilan fungsi yang akurat.',
          payload: {
            parserGrammar: 'JavaLexer & JavaParser (ANTLR v4)',
            parsedClasses: 142,
            generatedCallGraph: 'AST_NODE_FUNCTION_DEPENDENCY_GRAPH',
            extractedMethods: ['evaluateRiskThreshold()', 'dispatchKafkaEvent()', 'persistApplicationState()']
          },
          techContract: '// ANTLR v4 AST Listener for Call Graph Extraction\npublic class JavaCallGraphListener extends JavaParserBaseListener {\n  @Override\n  public void enterMethodInvocation(JavaParser.MethodInvocationContext ctx) {\n    String caller = currentMethod;\n    String callee = ctx.IDENTIFIER().getText();\n    callGraph.addEdge(caller, callee);\n  }\n}'
        },
        {
          name: '3. Kafka Inter-Service Topic Communication Mapping',
          role: 'Kafka Event-Driven Architecture',
          protocol: 'Kafka Topics Producer / Consumer Mapping',
          desc: 'Memetakan jalur komunikasi asinkron antarmikroservis melalui event Kafka topics untuk memahami pertukaran data terdistribusi dan audit alur transaksi antar-service.',
          payload: {
            kafkaTopic: 'los.financing.application.events',
            eventType: 'APPLICATION_SUBMITTED_EVENT',
            partitionKey: 'LOS-P2-2026-084',
            consumerServices: ['credit-evaluation-service', 'notification-service', 'audit-trail-service']
          },
          techContract: '@KafkaListener(topics = "los.financing.application.events", groupId = "los-processor-group")\npublic void handleApplicationEvent(ConsumerRecord<String, FinancingEventPayload> record) {\n  log.info("Kafka Event Ingested from Partition: {}, Key: {}", record.partition(), record.key());\n  losEventProcessor.process(record.value());\n}'
        },
        {
          name: '4. Camunda Modeler BPMN 2.0 Workflow Orchestration',
          role: '30+ BPMN Diagrams (Camunda Modeler)',
          protocol: 'BPMN 2.0 Workflow Orchestration',
          desc: 'Merancang dan mendokumentasikan 30+ model diagram alur kerja menggunakan Camunda Modeler untuk menerjemahkan proses bisnis eksisting ke dalam orkestrasi workflow yang terstandarisasi.',
          payload: {
            processDefinitionKey: 'Process_LOS_Phase2_Orchestration',
            bpmnDiagramCount: '30+ Modeled Workflows',
            gapAnalysisResult: '3 Critical Workflows Refactored',
            executionState: 'BPMN_ORCHESTRATION_VALIDATED'
          },
          techContract: '<!-- Camunda BPMN 2.0 Process Fragment -->\n<bpmn:process id="Process_LOS_Phase2_Orchestration" isExecutable="true">\n  <bpmn:serviceTask id="Task_KafkaScore" name="Stream Kafka Evaluation" camunda:delegateExpression="${kafkaScoreDelegate}" />\n  <bpmn:sequenceFlow id="Flow_1" sourceRef="Task_KafkaScore" targetRef="Gateway_Approval" />\n</bpmn:process>'
        },
        {
          name: '5. SQL Server Persistence & Query Access Pattern Audit',
          role: 'Database Behavior Analysis (SQL Server)',
          protocol: 'SQL Server Schema & JPA Repository Audit',
          desc: 'Mendokumentasikan pola akses basis data, penggunaan repository layer, dan analisis query SQL Server untuk memahami perilaku persistensi dan konsistensi integrasi data.',
          payload: {
            databaseEngine: 'SQL Server (Enterprise RDBMS)',
            auditedRepositories: ['LosApplicationRepository', 'FinancingDisbursementRepository'],
            queryLatency: '< 12ms',
            persistenceStatus: 'AUDITED_AND_DOCUMENTED'
          },
          techContract: '@Repository\npublic interface LosApplicationRepository extends JpaRepository<LosApplication, String> {\n  @Query("SELECT a FROM LosApplication a WHERE a.status = :status AND a.createdAt >= :date")\n  List<LosApplication> findPendingApplications(@Param("status") String status, @Param("date") LocalDateTime date);\n}'
        }
      ]
    },
    omnichannel: {
      title: 'Omnichannel Commerce & Logistics Integration Pipeline',
      company: 'PT. Foom Lab Global',
      badge: 'COMMERCE INTEGRATION',
      period: 'Jul 2022 – Oct 2022',
      description: 'Pengembangan fitur aplikasi web PHP Laravel, integrasi marketplace e-commerce, sistem ERP, dan API ekspedisi logistik untuk otomatisasi order & inventaris.',
      metrics: {
        coverage: 'Multi-Channel Sync',
        stack: 'PHP Laravel / MySQL',
        focus: 'ERP & Logistics API'
      },
      steps: [
        {
          name: '1. Multi-Platform Webhook Ingestion',
          role: 'PHP Laravel Webhook Gateway',
          protocol: 'HTTPS POST /api/webhooks/marketplace',
          desc: 'Menerima order webhook event dari channel e-commerce, verifikasi signature, dan parsing payload pesanan ke format seragam.',
          payload: { channel: 'SHOPEE / TOKOPEDIA / WEB', orderId: 'ORD-OMNI-4491', totalItems: 3, status: 'ORDER_CAPTURED' },
          techContract: 'Route::post("/webhooks/marketplace", [OmnichannelOrderController::class, "handleWebhook"]);\npublic function handleWebhook(Request $request) {\n  $order = $this->orderService->normalizePayload($request->all());\n  return response()->json(["status" => "CAPTURED"]);\n}'
        },
        {
          name: '2. Multi-Store Inventory Synchronization',
          role: 'Inventory Management Logic',
          protocol: 'MySQL Transactional Lock',
          desc: 'Mengalokasikan dan mengupdate kuota stok inventaris multi-store secara otomatis untuk mencegah inkonsistensi dan kesalahan manual.',
          payload: { sku: 'PROD-SKU-99', reservedQty: 3, stockReconciled: true, manualHandlingSaved: '100%' },
          techContract: 'DB::transaction(function () use ($sku, $qty) {\n  $stock = Inventory::where("sku", $sku)->lockForUpdate()->first();\n  $stock->decrement("available_stock", $qty);\n});'
        },
        {
          name: '3. Corporate ERP System Integration',
          role: 'ERP Data Sync Service',
          protocol: 'REST API Client -> Corporate ERP',
          desc: 'Sinkronisasi data pesanan, pencatatan invoice, dan jurnal persediaan langsung ke sistem ERP perusahaan.',
          payload: { erpSyncStatus: 'SYNCED_WITH_ERP', ledgerCode: 'SALES_OMNI_2022', invoiceGenerated: true },
          techContract: '$erpResponse = Http::withHeaders(["Authorization" => "Bearer " . $token])\n  ->post(config("erp.endpoint") . "/orders/sync", $orderData);'
        },
        {
          name: '4. 3PL Logistics API & Airwaybill Dispatch',
          role: 'Logistics Partner Integration',
          protocol: 'REST Client -> 3PL Couriers',
          desc: 'Mengirim data paket ke API ekspedisi logistik, men-generate nomor resi otomatis (Airwaybill), dan menjadwalkan penjemputan barang.',
          payload: { courierPartner: 'JNE / SiCepat', trackingNumber: 'AWB-8840192841', status: 'READY_FOR_PICKUP' },
          techContract: '$shipping = Http::post("https://api.logistics-partner.com/v1/shipments", [\n  "order_id" => $orderId,\n  "destination" => $address\n]);\n$awb = $shipping["tracking_number"];'
        },
        {
          name: '5. Automated Operational State Broadcast',
          role: 'Cross-Platform Sync Broadcast',
          protocol: 'Automated Event Notification',
          desc: 'Memperbarui status pesanan menjadi siap kirim di seluruh channel e-commerce dan memangkas proses rekapitulasi data manual.',
          payload: { broadcastStatus: 'COMPLETED_ALL_CHANNELS', manualEffortReduced: 'Significant', operationalFlow: 'OPTIMIZED' },
          techContract: 'event(new OrderProcessedEvent($order));\nLog::info("Omnichannel order processing completed for: " . $orderId);'
        }
      ]
    }
  };

  const currentArch = architectures[activeTab];
  const activeStepDetail = currentArch.steps[selectedStep] || currentArch.steps[0];

  useEffect(() => {
    if (isInitialLogMount.current) {
      isInitialLogMount.current = false;
      return;
    }
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    setSelectedStep(0);
    setSimStep(0);
    setIsRunning(false);
    setIsCompleted(false);
    setLogs([`Initialized workflow: ${currentArch.title}`, `Ready to execute simulation.`]);
  }, [activeTab]);

  const runSimulation = () => {
    setIsRunning(true);
    setIsCompleted(false);
    setSimStep(0);
    setSelectedStep(0);
    setLogs([`[SIMULATION START] Triggering ${currentArch.title}...`]);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= currentArch.steps.length) {
        clearInterval(interval);
        setIsRunning(false);
        setIsCompleted(true);
        setSimStep(currentArch.steps.length - 1);
        setSelectedStep(currentArch.steps.length - 1);
        setLogs(prev => [...prev, `[SUCCESS] All ${currentArch.steps.length} nodes verified. Process instance completed with 100% test passing.`]);
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
        {/* Section Header with balanced right card sticker in clear open space */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code text-[#ccff00] uppercase tracking-widest mb-2 bg-[#121218] px-3 py-1 border border-zinc-800">
              <Workflow className="w-3.5 h-3.5" />
              <span>//04_WORKFLOW_SIMULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase font-display">
              ARCHITECTURE & WORKFLOW SIMULATOR
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400 mt-2">
              Simulasi alur kerja sistem enterprise berbasis pengalaman kerja nyata. Pilih flow di bawah dan jalankan simulasi interaktif untuk menginspeksi alur data dan kontrak kode.
            </p>
          </div>

          <div className="hidden lg:block shrink-0 pb-1">
            <KingSpadeCardSticker size={64} rotation="8deg" />
          </div>
        </div>

        {/* Main Board Container with Embedded Integrated Switcher */}
        <div className="bg-[#0b0b14] border-2 border-white p-6 sm:p-8 shadow-[8px_8px_0px_#ccff00]">
          {/* Integrated Segmented Control Header */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#12121c] border border-zinc-800 mb-8">
            <button
              onClick={() => setActiveTab('los')}
              className={`flex-1 min-w-[240px] flex items-center justify-center gap-2 py-3 px-4 font-mono-code text-xs font-bold transition-all ${
                activeTab === 'los'
                  ? 'bg-[#ccff00] text-black border border-white shadow-[2px_2px_0px_#000000]'
                  : 'bg-transparent text-zinc-400 hover:text-white hover:bg-[#181826]'
              }`}
            >
              <span>1. CAMUNDA BPMN & ANTLR v4 KAFKA MAPPING (PT. PADEPOKAN 79)</span>
            </button>
            <button
              onClick={() => setActiveTab('omnichannel')}
              className={`flex-1 min-w-[240px] flex items-center justify-center gap-2 py-3 px-4 font-mono-code text-xs font-bold transition-all ${
                activeTab === 'omnichannel'
                  ? 'bg-[#ccff00] text-black border border-white shadow-[2px_2px_0px_#000000]'
                  : 'bg-transparent text-zinc-400 hover:text-white hover:bg-[#181826]'
              }`}
            >
              <span>2. OMNICHANNEL ERP & LOGISTICS API SYNC (PT. FOOM LAB)</span>
            </button>
          </div>

          {/* Workflow Header Card */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-zinc-800 pb-6 mb-8">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono-code font-bold bg-[#ccff00] text-black px-2.5 py-0.5 border border-white">
                  {currentArch.badge}
                </span>
                <span className="text-xs font-mono-code text-zinc-400">
                  COMPANY: <strong className="text-zinc-200">{currentArch.company}</strong> ({currentArch.period})
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {currentArch.title}
              </h3>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                {currentArch.description}
              </p>
            </div>

            {/* Run Button */}
            <div>
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
                <span>{isRunning ? 'SIMULATION RUNNING...' : 'TRIGGER FLOW SIMULATION'}</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 mb-8 font-mono-code text-xs">
            <div className="bg-[#12121c] p-3 border border-zinc-800">
              <div className="text-zinc-500 text-[10px]">WORKFLOW SCOPE</div>
              <div className="text-white font-bold text-sm mt-0.5 text-[#ccff00]">{currentArch.metrics.coverage}</div>
            </div>
            <div className="bg-[#12121c] p-3 border border-zinc-800">
              <div className="text-zinc-500 text-[10px]">ANALYSIS METHOD</div>
              <div className="text-white font-bold text-sm mt-0.5">{currentArch.metrics.method || currentArch.metrics.stack}</div>
            </div>
            <div className="bg-[#12121c] p-3 border border-zinc-800">
              <div className="text-zinc-500 text-[10px]">EVENT MAPPING</div>
              <div className="text-white font-bold text-sm mt-0.5">{currentArch.metrics.events || currentArch.metrics.focus}</div>
            </div>
          </div>

          {/* Steps & Inspector Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Steps List */}
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>PIPELINE NODES (CLICK TO INSPECT):</span>
                <span className="text-[#ccff00]">STEP {selectedStep + 1} OF {currentArch.steps.length}</span>
              </div>

              {currentArch.steps.map((step, idx) => {
                const isPassed = simStep > idx || (isCompleted && idx === currentArch.steps.length - 1);
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

              {/* Left Side open gutter sticker */}
              <div className="hidden sm:flex justify-start pt-3 pl-1">
                <DicePairSticker size={48} rotation="8deg" />
              </div>
            </div>

            {/* Right Live Payload & Contract Inspector */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FileJson className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>INSPECTOR: NODE #{selectedStep + 1} PAYLOAD & CODE CONTRACT</span>
              </div>

              {/* Inspector Box */}
              <div className="bg-[#08080d] border-2 border-zinc-700 p-5 space-y-4 font-mono-code">
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
                    <span>LIVE DATA PAYLOAD (STATE DTO):</span>
                  </div>
                  <pre className="bg-[#0f0f18] p-3 text-xs text-[#a3e635] border border-zinc-800 overflow-x-auto selection:bg-[#ccff00] selection:text-black">
                    {JSON.stringify(activeStepDetail.payload, null, 2)}
                  </pre>
                </div>

                {/* Code / Architecture Contract */}
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Code2 className="w-3 h-3 text-[#ccff00]" />
                    <span>TECHNICAL CONTRACT / PARSER FRAGMENT:</span>
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
