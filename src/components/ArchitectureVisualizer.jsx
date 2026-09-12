import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow, Play, Pause, SkipForward, SkipBack, RotateCcw, RefreshCw,
  CheckCircle2, Code2, FileJson, Check, Cpu
} from 'lucide-react';
import { AceOfHeartsCard, DicePairSticker } from './GamblerStickers';

/* ─────────────────────────────────────────────
   SHARED DATA
───────────────────────────────────────────── */
const architectures = {
  los: {
    title: 'Loan Origination System (LOS) Phase 2 — System Analysis & Static Code Mapping',
    company: 'PT. Padepokan Tujuh Sembilan',
    badge: 'ENTERPRISE SYSTEM ANALYSIS',
    period: 'Dec 2025 – Jun 2026',
    description: 'Menganalisis sistem eksisting LOS Phase 2, memetakan logika aplikasi & komunikasi Kafka via static code analysis ANTLR v4 (call graph), pemodelan 30+ BPMN Camunda, dan audit persistensi SQL Server.',
    metrics: { coverage: '30+ BPMN Diagrams', method: 'ANTLR v4 Call Graphs', events: 'Kafka Topics Mapping' },
    steps: [
      {
        name: '1. Financing Ingestion & Controller Structure Analysis',
        role: 'Spring Boot Application Layer',
        protocol: 'HTTP POST /api/v2/los/financing/applications',
        shortName: 'POST /api',
        desc: 'Menganalisis arsitektur sistem eksisting LOS Phase 2 untuk memahami end-to-end alur pengajuan pembiayaan, aturan bisnis, validasi DTO, dan dependensi teknis.',
        payload: { applicationId: 'LOS-P2-2026-084', financingType: 'PEMBIAYAAN_MODAL_KERJA', loanAmount: 250000000, tenorMonths: 24, status: 'INITIALIZED_ANALYSIS' },
        techContract: '@RestController\n@RequestMapping("/api/v2/los/financing")\npublic class LosFinancingController {\n  @PostMapping("/applications")\n  public ResponseEntity<ApiResponse> ingestApplication(@Valid @RequestBody FinancingDto dto) {\n    log.info("Ingesting LOS Phase 2 Application: {}", dto.getApplicationId());\n    return ResponseEntity.ok(losService.initiateFinancingWorkflow(dto));\n  }\n}'
      },
      {
        name: '2. ANTLR v4 Static Code Analysis & Function Call Graph',
        role: 'Grammar Parser & Call Graph Generator',
        protocol: 'ANTLR v4 AST Tree Traversal',
        shortName: 'AST PARSE',
        desc: 'Memetakan application logic dan dependensi internal method microservices secara statis menggunakan parser ANTLR v4 guna menghasilkan graph panggilan fungsi yang akurat.',
        payload: { parserGrammar: 'JavaLexer & JavaParser (ANTLR v4)', parsedClasses: 142, generatedCallGraph: 'AST_NODE_FUNCTION_DEPENDENCY_GRAPH', extractedMethods: ['evaluateRiskThreshold()', 'dispatchKafkaEvent()', 'persistApplicationState()'] },
        techContract: '// ANTLR v4 AST Listener for Call Graph Extraction\npublic class JavaCallGraphListener extends JavaParserBaseListener {\n  @Override\n  public void enterMethodInvocation(JavaParser.MethodInvocationContext ctx) {\n    String caller = currentMethod;\n    String callee = ctx.IDENTIFIER().getText();\n    callGraph.addEdge(caller, callee);\n  }\n}'
      },
      {
        name: '3. Kafka Inter-Service Topic Communication Mapping',
        role: 'Kafka Event-Driven Architecture',
        protocol: 'Kafka Topics Producer / Consumer Mapping',
        shortName: 'KAFKA EVENT',
        desc: 'Memetakan jalur komunikasi asinkron antarmikroservis melalui event Kafka topics untuk memahami pertukaran data terdistribusi dan audit alur transaksi antar-service.',
        payload: { kafkaTopic: 'los.financing.application.events', eventType: 'APPLICATION_SUBMITTED_EVENT', partitionKey: 'LOS-P2-2026-084', consumerServices: ['credit-evaluation-service', 'notification-service', 'audit-trail-service'] },
        techContract: '@KafkaListener(topics = "los.financing.application.events", groupId = "los-processor-group")\npublic void handleApplicationEvent(ConsumerRecord<String, FinancingEventPayload> record) {\n  log.info("Kafka Event Ingested from Partition: {}, Key: {}", record.partition(), record.key());\n  losEventProcessor.process(record.value());\n}'
      },
      {
        name: '4. Camunda Modeler BPMN 2.0 Workflow Orchestration',
        role: '30+ BPMN Diagrams (Camunda Modeler)',
        protocol: 'BPMN 2.0 Workflow Orchestration',
        shortName: 'BPMN 2.0',
        desc: 'Merancang dan mendokumentasikan 30+ model diagram alur kerja menggunakan Camunda Modeler untuk menerjemahkan proses bisnis eksisting ke dalam orkestrasi workflow yang terstandarisasi.',
        payload: { processDefinitionKey: 'Process_LOS_Phase2_Orchestration', bpmnDiagramCount: '30+ Modeled Workflows', gapAnalysisResult: '3 Critical Workflows Refactored', executionState: 'BPMN_ORCHESTRATION_VALIDATED' },
        techContract: '<!-- Camunda BPMN 2.0 Process Fragment -->\n<bpmn:process id="Process_LOS_Phase2_Orchestration" isExecutable="true">\n  <bpmn:serviceTask id="Task_KafkaScore" name="Stream Kafka Evaluation" camunda:delegateExpression="${kafkaScoreDelegate}" />\n  <bpmn:sequenceFlow id="Flow_1" sourceRef="Task_KafkaScore" targetRef="Gateway_Approval" />\n</bpmn:process>'
      },
      {
        name: '5. SQL Server Persistence & Query Access Pattern Audit',
        role: 'SQL Server Database Layer',
        protocol: 'JDBC / SQL Server Query Audit',
        shortName: 'SQL QUERY',
        desc: 'Mengaudit pola akses query SQL Server — indexing strategy, stored procedures, N+1 query detection — untuk pemetaan bottleneck persistensi data.',
        payload: { dbEngine: 'Microsoft SQL Server', auditedTables: 38, detectedIssues: ['N+1 Query on LoanApplications', 'Missing Index on StatusHistory'], optimizationTarget: 'QUERY_PERFORMANCE_BASELINE' },
        techContract: '-- Detected N+1 Pattern\nSELECT * FROM LoanApplications WHERE status = \'PENDING\';\n-- For each record:\nSELECT * FROM StatusHistory WHERE applicationId = ?;\n\n-- Recommended Fix: JOIN with pagination\nSELECT la.*, sh.latestStatus\nFROM LoanApplications la\nINNER JOIN StatusHistory sh ON la.id = sh.applicationId\nWHERE la.status = \'PENDING\'\nORDER BY la.createdAt DESC\nOFFSET 0 ROWS FETCH NEXT 50 ROWS ONLY;'
      }
    ]
  },
  omnichannel: {
    title: 'Omnichannel ERP & Logistics API Sync — PT. Foom Lab Global',
    company: 'PT. Foom Lab Global',
    badge: 'OMNICHANNEL INTEGRATION',
    period: 'Feb 2022 – Sep 2023',
    description: 'Membangun integrasi omnichannel e-commerce (Tokopedia, Shopee, Lazada) dengan sistem ERP internal dan API 3PL logistik menggunakan Laravel, mengeleminasi proses manual pemenuhan pesanan.',
    metrics: { coverage: 'Tokopedia / Shopee / Lazada', method: 'ERP Sync + 3PL API', events: 'Full Order Automation' },
    steps: [
      {
        name: '1. Marketplace Webhook Ingestion & Order Normalization',
        role: 'Laravel Webhook Handler',
        protocol: 'HTTP POST /webhook/{marketplace}',
        shortName: 'WEBHOOK',
        desc: 'Menerima webhook push event dari platform marketplace (Tokopedia, Shopee, Lazada), memvalidasi signature, dan menormalisasi struktur order ke schema internal.',
        payload: { marketplace: 'Tokopedia', orderId: 'TKP-ORD-20230891', status: 'payment_verified', normalizedSchema: 'INTERNAL_ORDER_DTO' },
        techContract: 'Route::post(\'/webhook/{marketplace}\', [WebhookController::class, \'handle\']);\n\npublic function handle(Request $request, string $marketplace): JsonResponse {\n  $this->verifySignature($request, $marketplace);\n  $normalized = $this->orderNormalizer->normalize($request->all(), $marketplace);\n  OrderProcessingJob::dispatch($normalized);\n  return response()->json([\'status\' => \'queued\']);\n}'
      },
      {
        name: '2. Inventory Check & Stock Reservation via ERP',
        role: 'ERP Inventory Module',
        protocol: 'Internal API — ERP Stock Reserve',
        shortName: 'STOCK RSRV',
        desc: 'Memeriksa ketersediaan stok real-time dan melakukan reservasi item di sistem ERP sebelum konfirmasi pesanan, mencegah overselling.',
        payload: { sku: 'FML-VAPE-POD-001', requestedQty: 2, availableStock: 147, reserved: true, warehouseId: 'WH-JKT-01' },
        techContract: '$stockCheck = $this->erpClient->checkAndReserve([\n  \'sku\'       => $order->sku,\n  \'quantity\'  => $order->qty,\n  \'warehouse\' => config(\'erp.primary_warehouse\'),\n]);\nif (!$stockCheck[\'reserved\']) throw new InsufficientStockException($order->sku);'
      },
      {
        name: '3. ERP Sales Order Sync & Invoice Generation',
        role: 'ERP Sales Module Integration',
        protocol: 'REST Client → ERP /orders/sync',
        shortName: 'ERP SYNC',
        desc: 'Sinkronisasi data pesanan, pencatatan invoice, dan jurnal persediaan langsung ke sistem ERP perusahaan.',
        payload: { erpSyncStatus: 'SYNCED_WITH_ERP', ledgerCode: 'SALES_OMNI_2022', invoiceGenerated: true },
        techContract: '$erpResponse = Http::withHeaders(["Authorization" => "Bearer " . $token])\n  ->post(config("erp.endpoint") . "/orders/sync", $orderData);'
      },
      {
        name: '4. 3PL Logistics API & Airwaybill Dispatch',
        role: 'Logistics Partner Integration',
        protocol: 'REST Client -> 3PL Couriers',
        shortName: '3PL API',
        desc: 'Mengirim data paket ke API ekspedisi logistik, men-generate nomor resi otomatis (Airwaybill), dan menjadwalkan penjemputan barang.',
        payload: { courierPartner: 'JNE / SiCepat', trackingNumber: 'AWB-8840192841', status: 'READY_FOR_PICKUP' },
        techContract: '$shipping = Http::post("https://api.logistics-partner.com/v1/shipments", [\n  "order_id"    => $orderId,\n  "destination" => $address\n]);\n$awb = $shipping["tracking_number"];'
      },
      {
        name: '5. Automated Operational State Broadcast',
        role: 'Cross-Platform Sync Broadcast',
        protocol: 'Automated Event Notification',
        shortName: 'BROADCAST',
        desc: 'Memperbarui status pesanan menjadi siap kirim di seluruh channel e-commerce dan memangkas proses rekapitulasi data manual.',
        payload: { broadcastStatus: 'COMPLETED_ALL_CHANNELS', manualEffortReduced: 'Significant', operationalFlow: 'OPTIMIZED' },
        techContract: 'event(new OrderProcessedEvent($order));\nLog::info("Omnichannel order processing completed for: " . $orderId);'
      }
    ]
  }
};

/* ─────────────────────────────────────────────
   SHARED SIMULATION HOOK
   Each variation instance gets its own state via this hook.
───────────────────────────────────────────── */
function useSimulation(activeTab) {
  const currentArch = architectures[activeTab];
  const [simStep, setSimStep] = useState(0);
  const [selectedStep, setSelectedStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [logs, setLogs] = useState([`Initialized workflow: ${currentArch.title}`, `Ready to execute simulation.`]);
  const logBoxRef = useRef(null);
  const isInitialLogMount = useRef(true);
  const prevSimStepRef = useRef(-1);

  useEffect(() => {
    if (isInitialLogMount.current) { isInitialLogMount.current = false; return; }
    if (logBoxRef.current) logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
  }, [logs]);

  // Reset on tab switch
  useEffect(() => {
    prevSimStepRef.current = -1;
    setSelectedStep(0);
    setSimStep(0);
    setIsRunning(false);
    setIsCompleted(false);
    setLogs([`Initialized workflow: ${currentArch.title}`, `Ready to execute simulation.`]);
  }, [activeTab]);

  // Auto-advance interval — pure state update only, NO side-effects inside updater
  useEffect(() => {
    if (!isRunning || isCompleted) return;
    const interval = setInterval(() => {
      setSimStep(prev => {
        const next = prev + 1;
        if (next >= currentArch.steps.length) {
          setIsRunning(false);
          setIsCompleted(true);
          setSelectedStep(currentArch.steps.length - 1);
          return currentArch.steps.length - 1;
        }
        setSelectedStep(next);
        return next;
      });
    }, 1100);
    return () => clearInterval(interval);
  }, [isRunning, isCompleted, currentArch.steps]);

  // Log side-effect: fires exactly once per simStep change
  useEffect(() => {
    if (!isRunning && !isCompleted) return;
    if (simStep === prevSimStepRef.current) return;
    prevSimStepRef.current = simStep;

    const maxStep = currentArch.steps.length - 1;
    if (isCompleted && simStep === maxStep) {
      setLogs(l => [...l, `[SUCCESS] All ${currentArch.steps.length} nodes verified. Process completed.`]);
    } else if (isRunning && simStep > 0) {
      const stepInfo = currentArch.steps[simStep];
      setLogs(l => [...l, `[STEP ${simStep + 1}/${currentArch.steps.length}] ${stepInfo.name} -> ${stepInfo.role} (200 OK)`]);
    }
  }, [simStep, isRunning, isCompleted, currentArch.steps]);

  const togglePlayPause = () => {
    if (isCompleted) {
      prevSimStepRef.current = -1;
      setIsCompleted(false); setSimStep(0); setSelectedStep(0);
      setLogs([`[RESTART] Re-running ${currentArch.title}...`]);
    } else if (!isRunning && simStep === 0 && logs.length <= 2) {
      setLogs([`[SIMULATION START] Triggering ${currentArch.title}...`]);
    } else if (!isRunning) {
      setLogs(l => [...l, `[RESUME] Simulation resumed.`]);
    } else {
      setLogs(l => [...l, `[PAUSE] Simulation paused at node ${simStep + 1}.`]);
    }
    setIsRunning(r => !r);
  };

  const stepForward = () => {
    setIsRunning(false);
    if (simStep < currentArch.steps.length - 1) {
      const next = simStep + 1;
      setSimStep(next); setSelectedStep(next);
      setLogs(l => [...l, `[MANUAL STEP] Node ${next + 1}: ${currentArch.steps[next].name}`]);
    } else if (!isCompleted) {
      setIsCompleted(true);
      setLogs(l => [...l, `[SUCCESS] All nodes verified via manual step.`]);
    }
  };

  const stepBackward = () => {
    setIsRunning(false); setIsCompleted(false);
    if (simStep > 0) {
      const prev = simStep - 1;
      setSimStep(prev); setSelectedStep(prev);
      setLogs(l => [...l, `[MANUAL STEP] Reverted to Node ${prev + 1}`]);
    }
  };

  const resetSimulation = () => {
    prevSimStepRef.current = -1;
    setIsRunning(false); setIsCompleted(false); setSimStep(0); setSelectedStep(0);
    setLogs([`[RESET] Flow reverted to initial state.`]);
  };

  return {
    currentArch, simStep, selectedStep, setSelectedStep,
    isRunning, isCompleted, logs, logBoxRef,
    togglePlayPause, stepForward, stepBackward, resetSimulation
  };
}

/* ─────────────────────────────────────────────
   TYPEWRITER STREAM HOOK
   - Streams fullText char-by-char whenever keyTrigger changes.
   - chunkSize chars per tick, speedMs ms per tick.
   - Returns { displayed, isDone } — cursor visible while !isDone.
   NOTE: Used ONLY for Telemetry Logs (StreamingLogLine).
         Payload & Contract panels now display INSTANTLY.
───────────────────────────────────────────── */
function useTypewriterStream(fullText, keyTrigger, speedMs = 12, chunkSize = 5) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone]       = useState(false);
  const rafRef                    = useRef(null);
  const posRef                    = useRef(0);

  useEffect(() => {
    // Reset on trigger change
    setDisplayed('');
    setIsDone(false);
    posRef.current = 0;

    if (!fullText) { setIsDone(true); return; }

    const tick = () => {
      posRef.current += chunkSize;
      const next = fullText.slice(0, posRef.current);
      setDisplayed(next);

      if (posRef.current >= fullText.length) {
        setDisplayed(fullText);
        setIsDone(true);
      } else {
        rafRef.current = setTimeout(tick, speedMs);
      }
    };

    rafRef.current = setTimeout(tick, speedMs);
    return () => { if (rafRef.current) clearTimeout(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyTrigger]);

  return { displayed, isDone };
}

/* ─────────────────────────────────────────────
   useScanSweep — triggers a one-shot radar sweep
   overlay animation whenever stepKey changes.
   Returns { sweeping } boolean.
───────────────────────────────────────────── */
function useScanSweep(stepKey) {
  const [sweeping, setSweeping] = useState(false);
  const timerRef = useRef(null);
  // track previous key to avoid firing on mount
  const prevKeyRef = useRef(stepKey);

  useEffect(() => {
    if (prevKeyRef.current === stepKey) return;
    prevKeyRef.current = stepKey;

    if (timerRef.current) clearTimeout(timerRef.current);
    setSweeping(true);
    timerRef.current = setTimeout(() => setSweeping(false), 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepKey]);

  return sweeping;
}

/* ─────────────────────────────────────────────
   StreamingLogLine — typewriter per log baru
   Props:
     log       : string  — full log text
     isLatest  : bool    — apakah ini baris terbaru yang baru masuk
     isRunning : bool    — apakah simulasi sedang berjalan
     logBoxRef : ref     — untuk auto-scroll tiap karakter
───────────────────────────────────────────── */
function StreamingLogLine({ log, isLatest, isRunning, logBoxRef }) {
  const ACID = '#ccff00';

  // Parse tag sekali di luar hook
  const tagMatch = log.match(/^(\[[^\]]+\])\s*(.*)$/);
  const tag  = tagMatch ? tagMatch[1] : null;
  const body = tagMatch ? tagMatch[2] : log;

  // Stream hanya body teks; tag langsung tampil
  // Key trigger: gunakan log string itu sendiri — baris baru pasti beda string
  const shouldStream = isLatest && isRunning;
  const [displayed, setDisplayed] = React.useState(shouldStream ? '' : body);
  const [done, setDone]           = React.useState(!shouldStream);
  const timerRef                  = React.useRef(null);
  const posRef                    = React.useRef(0);

  React.useEffect(() => {
    if (!shouldStream) {
      setDisplayed(body);
      setDone(true);
      return;
    }

    // Reset
    setDisplayed('');
    setDone(false);
    posRef.current = 0;

    const CHUNK = 3;   // 2-3 chars per tick
    const SPEED = 8;   // ms per tick — sangat cepat

    const tick = () => {
      posRef.current += CHUNK;
      const next = body.slice(0, posRef.current);
      setDisplayed(next);

      // Auto-scroll tiap tick karakter
      if (logBoxRef && logBoxRef.current) {
        logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
      }

      if (posRef.current >= body.length) {
        setDisplayed(body);
        setDone(true);
      } else {
        timerRef.current = setTimeout(tick, SPEED);
      }
    };

    timerRef.current = setTimeout(tick, SPEED);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldStream, log]);

  if (tag) {
    return (
      <div className="text-[11px] leading-snug flex items-start gap-2">
        {/* Tag selalu tampil penuh & highlight neon dari awal */}
        <span
          className="shrink-0 font-bold"
          style={{ color: ACID, textShadow: `0 0 6px ${ACID}80` }}
        >
          {tag}
        </span>
        <span style={{ color: '#a1a1aa' }}>
          {displayed}
          {!done && (
            <span
              className="tw-cursor"
              style={{ backgroundColor: ACID, boxShadow: `0 0 6px ${ACID}, 0 0 12px ${ACID}66` }}
            />
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="text-[11px] leading-snug" style={{ color: '#71717a' }}>
      {displayed}
      {!done && (
        <span
          className="tw-cursor"
          style={{ backgroundColor: ACID, boxShadow: `0 0 6px ${ACID}, 0 0 12px ${ACID}66` }}
        />
      )}
    </div>
  );
}

/* Cursor block neon — berdenyut via CSS animation injected once */
const CURSOR_STYLE_ID = 'tw-cursor-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(CURSOR_STYLE_ID)) {
  const s = document.createElement('style');
  s.id = CURSOR_STYLE_ID;
  s.textContent = `
    @keyframes tw-cursor-blink {
      0%, 49%  { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .tw-cursor {
      display: inline-block;
      width: 0.55em;
      height: 1.1em;
      vertical-align: text-bottom;
      margin-left: 1px;
      animation: tw-cursor-blink 700ms steps(1) infinite;
    }
    @keyframes scan-sweep {
      0%   { top: 0%; opacity: 0.85; }
      90%  { top: 100%; opacity: 0.55; }
      100% { top: 100%; opacity: 0; }
    }
    .scan-sweep-line {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, #ccff0055 20%, #ccff00bb 50%, #ccff0055 80%, transparent 100%);
      box-shadow: 0 0 8px 2px #ccff0044, 0 0 2px 1px #ccff0099;
      pointer-events: none;
      animation: scan-sweep 0.35s cubic-bezier(0.4, 0, 0.6, 1) forwards;
      z-index: 10;
    }
  `;
  document.head.appendChild(s);
}

/* ─────────────────────────────────────────────
   SHARED INSPECTOR PANEL — FULL-WIDTH DUAL-PANE
───────────────────────────────────────────── */
function InspectorPanel({ activeStepDetail, logs, logBoxRef, isRunning }) {
  const ACID = '#ccff00';
  const GOLD = '#fbbf24';

  /* Derive stable key from step identity */
  const stepKey = activeStepDetail.name;

  /* Payload & Contract: instant display — no typewriter */
  const payloadText   = JSON.stringify(activeStepDetail.payload, null, 2);
  const contractText  = activeStepDetail.techContract;

  /* Scanline radar sweep — fires once per node change */
  const sweeping = useScanSweep(stepKey);

  return (
    <div className="space-y-0 font-mono-code">

      {/* ── Inspector Header ── */}
      <div
        className="min-h-[64px] flex items-center justify-between gap-3 px-4 py-2 border-b-2"
        style={{ background: '#09090e', borderColor: `${ACID}30` }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <FileJson className="w-4 h-4 shrink-0" style={{ color: ACID }} />
          <div className="min-w-0">
            <div
              className="text-[11px] font-extrabold uppercase tracking-widest truncate max-w-[260px] sm:max-w-md md:max-w-lg"
              style={{ color: ACID, textShadow: `0 0 8px ${ACID}80` }}
              title={activeStepDetail.name}
            >
              {activeStepDetail.name}
            </div>
            <div className="text-[9px] mt-0.5 truncate max-w-[260px] sm:max-w-md md:max-w-lg" style={{ color: '#71717a' }}>
              LAYER: <span style={{ color: '#a1a1aa' }}>{activeStepDetail.role}</span>
              <span style={{ color: `${ACID}40` }}> │ </span>
              PROTOCOL: <span style={{ color: '#a1a1aa' }}>{activeStepDetail.protocol}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-[9px] font-bold px-2.5 py-1 border uppercase tracking-widest"
            style={{ borderColor: `${ACID}60`, color: ACID, background: '#0e1800', boxShadow: `0 0 8px ${ACID}30` }}
          >
            ● INSPECTED
          </span>
          <span
            className="text-[9px] font-bold px-2.5 py-1 border uppercase tracking-widest"
            style={{ borderColor: `${GOLD}50`, color: GOLD, background: '#120f00' }}
          >
            ACTIVE NODE
          </span>
        </div>
      </div>

      {/* ── Dual Pane: Payload | Contract ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b-2 h-[320px] lg:h-[340px] flex-shrink-0" style={{ borderColor: `${ACID}20` }}>

          {/* Left Pane: LIVE DATA PAYLOAD */}
          <div
            className="border-r flex flex-col h-full"
            style={{ borderColor: `${ACID}15`, background: '#06060b' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 border-b text-[9px] font-bold uppercase tracking-widest shrink-0"
              style={{ borderColor: `${ACID}20`, background: '#08080f', color: `${ACID}90` }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ACID, boxShadow: `0 0 6px ${ACID}` }} />
              LIVE DATA PAYLOAD (STATE DTO)
            </div>
            <div className="relative flex-1 overflow-hidden">
              {sweeping && <div className="scan-sweep-line" />}
              <pre
                className="h-full p-4 text-xs overflow-x-auto overflow-y-auto leading-relaxed"
                style={{
                  color: '#a3e635',
                  background: '#06060b',
                  fontFamily: 'monospace'
                }}
              >
                {payloadText}
              </pre>
            </div>
          </div>

          {/* Right Pane: TECHNICAL CONTRACT */}
          <div
            className="flex flex-col h-full"
            style={{ background: '#060608' }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 border-b text-[9px] font-bold uppercase tracking-widest shrink-0"
              style={{ borderColor: `${ACID}20`, background: '#08080f', color: `${GOLD}90` }}
            >
              <Code2 className="w-3 h-3 shrink-0" style={{ color: GOLD }} />
              TECHNICAL CONTRACT &amp; CODE SPEC
            </div>
            <div className="relative flex-1 overflow-hidden">
              {sweeping && <div className="scan-sweep-line" />}
              <pre
                className="h-full p-4 text-[11px] overflow-x-auto overflow-y-auto whitespace-pre-wrap leading-relaxed"
                style={{
                  color: '#e4e4e7',
                  background: '#060608',
                  fontFamily: 'monospace'
                }}
              >
                {contractText}
              </pre>
            </div>
          </div>
        </div>

      {/* ── Full-Width Telemetry Log ── */}
      <div style={{ background: '#050508', borderTop: `1px solid ${ACID}15` }}>
        <div
          className="flex items-center justify-between gap-3 px-4 py-2 border-b text-[9px] font-bold uppercase tracking-widest"
          style={{ borderColor: `${ACID}20`, background: '#07070c', color: `${ACID}70` }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ backgroundColor: ACID, boxShadow: `0 0 5px ${ACID}` }}
            />
            LIVE EXECUTION TELEMETRY LOGS
          </div>
          <span style={{ color: ACID, textShadow: `0 0 6px ${ACID}` }}>● LIVE STREAM</span>
        </div>
        <div
          ref={logBoxRef}
          className="overflow-y-auto p-4 space-y-1.5"
          style={{ height: '160px', fontFamily: 'monospace' }}
        >
          {logs.map((log, i) => (
            <StreamingLogLine
              key={`${i}-${log}`}
              log={log}
              isLatest={i === logs.length - 1}
              isRunning={isRunning}
              logBoxRef={logBoxRef}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VARIASI 1C: NEON PCB CIRCUIT MATRIX (Microchip Architecture)
   — Komponen tunggal definitif untuk Topology Pipeline Graph —
   - Header: Unified PCB console telemetry Acid Green [#ccff00]
             (PCB.MATRIX v3, SYS.CLK, VCC: 3.3V) + tactile switch controls
   - Node: IC Chipsets dengan pin konduktor emas/perak kiri-kanan,
           IC Core berpendar berdenyut saat active,
           label chip 'IC-01: INGESTION', method layer tag, hover highlight taktil
   - Connector: Multi-lane gold + acid green PCB traces,
                pulsa cahaya data bus meluncur mulus
══════════════════════════════════════════════════════════════ */
function PCBCircuitMatrix({ activeTab }) {
  const {
    currentArch, simStep, selectedStep, setSelectedStep,
    isRunning, isCompleted, logs, logBoxRef,
    togglePlayPause, stepForward, stepBackward, resetSimulation
  } = useSimulation(activeTab);
  const activeStepDetail = currentArch.steps[selectedStep] || currentArch.steps[0];

  const ACID = '#ccff00';
  const GOLD = '#fbbf24';
  const SILVER = '#94a3b8';

  // IC short label extracted from shortName for the chip body
  const icLabel = (shortName) => {
    const parts = shortName.split(/[\s/]/);
    return parts[0].substring(0, 6).toUpperCase();
  };

  return (
    <div
      className="border-2 bg-[#06060a]"
      style={{ borderColor: `${ACID}30`, boxShadow: `6px 6px 0px ${ACID}` }}
    >
      {/* ══ Unified PCB Console Header ══ */}
      <div
        className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap"
        style={{ background: '#09090e', borderBottom: `2px solid ${ACID}40` }}
      >
        {/* Left: Telemetry block */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* PCB.MATRIX badge */}
          <div
            className="flex items-center gap-1.5 border px-2.5 py-1.5 shrink-0"
            style={{ borderColor: `${ACID}50`, backgroundColor: '#0b0b12' }}
          >
            <Cpu className="w-3.5 h-3.5" style={{ color: ACID }} />
            <span
              className="text-[10px] font-extrabold uppercase tracking-widest"
              style={{ color: ACID, fontFamily: 'monospace' }}
            >
              PCB.MATRIX v3
            </span>
          </div>

          {/* Telemetry readouts */}
          <div
            className="flex items-center gap-2.5 text-[9px] font-bold"
            style={{ fontFamily: 'monospace' }}
          >
            {/* SYS.CLK */}
            <div className="flex items-center gap-1" style={{ color: `${ACID}99` }}>
              <div
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${isRunning ? 'animate-pulse' : ''}`}
                style={{
                  backgroundColor: isRunning ? ACID : '#2a2a1a',
                  boxShadow: isRunning ? `0 0 6px ${ACID}` : 'none'
                }}
              />
              <span>SYS.CLK: {isRunning ? 'HIGH' : isCompleted ? 'HALT' : 'IDLE'}</span>
            </div>
            <span style={{ color: `${ACID}30` }}>│</span>
            {/* Layer counter */}
            <span style={{ color: `${ACID}80` }}>
              LAYER {simStep + 1}/{currentArch.steps.length}
            </span>
            <span style={{ color: `${ACID}30` }}>│</span>
            {/* VCC */}
            <span style={{ color: GOLD, textShadow: `0 0 8px ${GOLD}60` }}>VCC: 3.3V</span>
            <span style={{ color: `${ACID}30` }}>│</span>
            {/* Status */}
            <span style={{
              color: isCompleted ? '#4ade80' : isRunning ? ACID : '#52525b',
              textShadow: isRunning ? `0 0 8px ${ACID}80` : 'none'
            }}>
              {isCompleted ? 'HALT_OK' : isRunning ? 'CLK_RUN' : 'STANDBY'}
            </span>
          </div>
        </div>

        {/* Right: Tactile switch playback controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* RST */}
          <button
            onClick={resetSimulation}
            title="Reset / RST"
            className="h-8 px-2.5 flex items-center gap-1 text-[9px] font-bold border-2 transition-all duration-200"
            style={{
              borderColor: `${ACID}40`, color: `${ACID}80`,
              background: '#0a0a0f', fontFamily: 'monospace',
              boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.5)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = ACID;
              e.currentTarget.style.color = ACID;
              e.currentTarget.style.boxShadow = `0 0 8px ${ACID}40, inset 0 -2px 0 rgba(0,0,0,0.5)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${ACID}40`;
              e.currentTarget.style.color = `${ACID}80`;
              e.currentTarget.style.boxShadow = 'inset 0 -2px 0 rgba(0,0,0,0.5)';
            }}
          >
            <RotateCcw className="w-2.5 h-2.5" /><span>RST</span>
          </button>

          {/* PREV */}
          <button
            onClick={stepBackward}
            disabled={simStep === 0 && !isCompleted}
            title="Step Prev"
            className="h-8 px-2.5 flex items-center gap-1 text-[9px] font-bold border-2 transition-all duration-200 disabled:opacity-25"
            style={{
              borderColor: `${ACID}40`, color: `${ACID}80`,
              background: '#0a0a0f', fontFamily: 'monospace',
              boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.5)'
            }}
            onMouseEnter={e => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.borderColor = ACID;
                e.currentTarget.style.boxShadow = `0 0 8px ${ACID}40, inset 0 -2px 0 rgba(0,0,0,0.5)`;
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${ACID}40`;
              e.currentTarget.style.boxShadow = 'inset 0 -2px 0 rgba(0,0,0,0.5)';
            }}
          >
            <SkipBack className="w-2.5 h-2.5 fill-current" /><span>PREV</span>
          </button>

          {/* PLAY / PAUSE — Primary tactile switch */}
          <button
            onClick={togglePlayPause}
            title={isRunning ? 'Pause' : 'Play'}
            className="h-8 px-4 flex items-center gap-1.5 text-[9px] font-extrabold border-2 transition-all duration-200"
            style={{
              borderColor: ACID,
              fontFamily: 'monospace',
              backgroundColor: isRunning ? '#1a2200' : ACID,
              color: isRunning ? ACID : '#000',
              boxShadow: isRunning
                ? `0 0 12px ${ACID}50, inset 0 -2px 0 rgba(0,0,0,0.4)`
                : `0 0 16px ${ACID}60, inset 0 -2px 0 rgba(0,0,0,0.3)`,
              textShadow: isRunning ? `0 0 8px ${ACID}` : 'none'
            }}
          >
            {isRunning
              ? <><Pause className="w-2.5 h-2.5 fill-current" /><span>CLK_STOP</span></>
              : <><Play className="w-2.5 h-2.5 fill-current" /><span>{isCompleted ? 'POWER_ON' : simStep > 0 ? 'CLK_RESUME' : 'CLK_START'}</span></>
            }
          </button>

          {/* NEXT */}
          <button
            onClick={stepForward}
            disabled={isCompleted}
            title="Step Next"
            className="h-8 px-2.5 flex items-center gap-1 text-[9px] font-bold border-2 transition-all duration-200 disabled:opacity-25"
            style={{
              borderColor: `${ACID}40`, color: `${ACID}80`,
              background: '#0a0a0f', fontFamily: 'monospace',
              boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.5)'
            }}
            onMouseEnter={e => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.borderColor = ACID;
                e.currentTarget.style.boxShadow = `0 0 8px ${ACID}40, inset 0 -2px 0 rgba(0,0,0,0.5)`;
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${ACID}40`;
              e.currentTarget.style.boxShadow = 'inset 0 -2px 0 rgba(0,0,0,0.5)';
            }}
          >
            <SkipForward className="w-2.5 h-2.5 fill-current" /><span>NEXT</span>
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* ══ IC Chipset Circuit Matrix ══ */}
        <div
          className="border p-5 relative overflow-hidden"
          style={{ background: '#040408', borderColor: `${ACID}18` }}
        >
          {/* PCB substrate grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: [
                `linear-gradient(${ACID}08 1px, transparent 1px)`,
                `linear-gradient(90deg, ${ACID}08 1px, transparent 1px)`,
                `radial-gradient(circle, ${GOLD}06 1px, transparent 1px)`
              ].join(', '),
              backgroundSize: '24px 24px, 24px 24px, 48px 48px',
              opacity: 1
            }}
          />

          {/* PCB layer stack label */}
          <div
            className="text-[9px] uppercase tracking-widest mb-5 flex items-center gap-2 relative z-10"
            style={{ color: `${ACID}50`, fontFamily: 'monospace' }}
          >
            <Cpu className="w-3.5 h-3.5" style={{ color: ACID }} />
            <span>INTEGRATED CIRCUIT MATRIX — PCB LAYER STACK v3</span>
            <span style={{ color: `${ACID}30` }}>│</span>
            <span style={{ color: GOLD + '70' }}>Au/Ag CONDUCTOR TRACES</span>
          </div>

          {/* IC Chipset Row */}
          <div className="flex items-center gap-0 relative z-10 overflow-x-auto pb-1">
            {currentArch.steps.map((step, idx) => {
              const isActive = idx === simStep && isRunning;
              const isPassed = simStep > idx || isCompleted;
              const isInspected = idx === selectedStep;

              return (
                <React.Fragment key={idx}>
                  {/* ── IC Chipset with lateral pin conductors ── */}
                  <button
                    onClick={() => setSelectedStep(idx)}
                    className="relative flex items-stretch shrink-0 transition-all duration-300 group"
                    style={{ minWidth: '130px', flex: 1 }}
                    title={`IC-${String(idx + 1).padStart(2,'0')}: ${step.shortName}`}
                  >
                    {/* Left pin conductor column — gold/silver */}
                    <div className="flex flex-col justify-around w-2.5 shrink-0 py-3">
                      {[0, 1, 2].map(p => (
                        <div key={p} className="flex items-center">
                          {/* Pin trace line */}
                          <div
                            className="h-px flex-1 transition-colors duration-300"
                            style={{
                              backgroundColor: isActive
                                ? GOLD
                                : isPassed ? `${GOLD}55` : SILVER + '18'
                            }}
                          />
                          {/* Pin pad dot */}
                          <div
                            className="w-1.5 h-1.5 shrink-0 rounded-sm transition-all duration-300"
                            style={{
                              backgroundColor: isActive
                                ? GOLD
                                : isPassed ? `${GOLD}70` : SILVER + '25',
                              boxShadow: isActive ? `0 0 4px ${GOLD}, 0 0 8px ${GOLD}60` : 'none'
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* ── IC Chip Body ── FIXED HEIGHT: always 140px, no jump */}
                    <div
                      className="w-full flex-1 h-[140px] flex flex-col items-center justify-between py-3 px-2 border-2 transition-all duration-300"
                      style={{
                        borderColor: isActive
                          ? ACID
                          : isPassed ? `${GOLD}70`
                          : isInspected ? `${SILVER}60`
                          : '#1c1c1c',
                        backgroundColor: isActive
                          ? '#0e1800'
                          : isPassed ? '#0a0800'
                          : isInspected ? '#0c0c14'
                          : '#08080c',
                        boxShadow: isActive
                          ? `0 0 20px ${ACID}50, inset 0 0 16px ${ACID}08`
                          : isPassed
                          ? `0 0 8px ${GOLD}20`
                          : isInspected
                          ? `0 0 6px ${SILVER}15`
                          : 'none',
                      }}
                    >
                      {/* IC chip label */}
                      <div
                        className="text-[7px] font-extrabold uppercase tracking-wider w-full text-center"
                        style={{
                          color: isActive ? ACID : isPassed ? GOLD : isInspected ? SILVER : '#2a2a2a',
                          fontFamily: 'monospace',
                          textShadow: isActive ? `0 0 6px ${ACID}` : 'none'
                        }}
                      >
                        IC-{String(idx + 1).padStart(2, '0')}
                      </div>

                      {/* Glowing IC Core — berpendar berdenyut saat active */}
                      <div className="relative flex items-center justify-center w-10 h-10 my-1">
                        {/* Outer glow ring */}
                        <div
                          className="absolute inset-0 rounded-sm transition-all duration-300"
                          style={{
                            border: `1px solid ${isActive ? ACID : isPassed ? `${GOLD}50` : '#2a2a2a'}`,
                            boxShadow: isActive
                              ? `0 0 12px ${ACID}80, inset 0 0 8px ${ACID}30`
                              : isPassed ? `0 0 4px ${GOLD}30` : 'none',
                            animation: isActive && isRunning ? 'pulse 1s ease-in-out infinite' : 'none'
                          }}
                        />
                        {/* Inner core die */}
                        <div
                          className="absolute inset-1.5 rounded-sm"
                          style={{
                            backgroundColor: isActive ? `${ACID}12` : isPassed ? `${GOLD}08` : '#111',
                            border: `1px solid ${isActive ? `${ACID}40` : isPassed ? `${GOLD}25` : '#1a1a1a'}`
                          }}
                        />
                        {/* Core label text */}
                        <div
                          className="relative text-[6px] font-extrabold text-center leading-tight z-10"
                          style={{
                            color: isActive ? ACID : isPassed ? GOLD : '#2a2a2a',
                            fontFamily: 'monospace',
                            textShadow: isActive ? `0 0 4px ${ACID}` : 'none'
                          }}
                        >
                          {icLabel(step.shortName)}
                        </div>
                      </div>

                      {/* Method layer tag — step.shortName full */}
                      <div
                        className="h-[28px] flex items-start justify-center w-full px-0.5 overflow-hidden"
                        style={{
                          color: isActive ? `${ACID}cc` : isPassed ? `${GOLD}80` : isInspected ? `${SILVER}80` : '#1e1e1e',
                          fontFamily: 'monospace',
                        }}
                      >
                        <span
                          className="text-[7px] text-center leading-tight line-clamp-2 w-full"
                          style={{ wordBreak: 'break-word' }}
                          title={step.shortName}
                        >
                          {step.shortName}
                        </span>
                      </div>

                      {/* ── Fixed 18px status footer slot — NO height jump ever ── */}
                      <div className="h-[18px] flex items-center justify-center w-full mt-1 shrink-0">
                        {isActive ? (
                          /* Active: animated data pulse bar */
                          <div className="w-full h-px relative overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 h-full"
                              style={{
                                width: '40%',
                                backgroundColor: ACID,
                                boxShadow: `0 0 8px ${ACID}`
                              }}
                              initial={{ x: '-100%' }}
                              animate={{ x: '300%' }}
                              transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                            />
                          </div>
                        ) : isPassed ? (
                          /* Passed: checkmark icon, fixed size */
                          <Check className="w-3.5 h-3.5" style={{ color: GOLD }} />
                        ) : (
                          /* Idle: invisible placeholder keeps height stable */
                          <span className="block w-3.5 h-3.5" />
                        )}
                      </div>
                    </div>

                    {/* Right pin conductor column — gold/silver */}
                    <div className="flex flex-col justify-around w-2.5 shrink-0 py-3">
                      {[0, 1, 2].map(p => (
                        <div key={p} className="flex items-center flex-row-reverse">
                          <div
                            className="h-px flex-1 transition-colors duration-300"
                            style={{
                              backgroundColor: isActive
                                ? GOLD
                                : isPassed ? `${GOLD}55` : SILVER + '18'
                            }}
                          />
                          <div
                            className="w-1.5 h-1.5 shrink-0 rounded-sm transition-all duration-300"
                            style={{
                              backgroundColor: isActive
                                ? GOLD
                                : isPassed ? `${GOLD}70` : SILVER + '25',
                              boxShadow: isActive ? `0 0 4px ${GOLD}, 0 0 8px ${GOLD}60` : 'none'
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Hover highlight tactile overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{
                        background: `radial-gradient(circle at center, ${ACID}06 0%, transparent 70%)`,
                        border: `1px solid ${ACID}20`
                      }}
                    />
                  </button>

                  {/* ── Multi-lane Gold + Acid Green PCB Trace Connector ── */}
                  {idx < currentArch.steps.length - 1 && (
                    <div className="flex flex-col justify-center gap-0.5 min-w-[24px] flex-1 py-4 relative">
                      {/* Lane 1: Gold — primary data bus */}
                      <div
                        className="h-px w-full relative overflow-hidden"
                        style={{ backgroundColor: '#2a1800' }}
                      >
                        <div
                          className="absolute inset-0 transition-all duration-700"
                          style={{
                            width: isPassed ? '100%' : '0%',
                            backgroundColor: GOLD,
                            opacity: 0.85
                          }}
                        />
                        {isActive && isRunning && (
                          <motion.div
                            className="absolute top-0 left-0 h-full w-3"
                            style={{ backgroundColor: GOLD, boxShadow: `0 0 6px ${GOLD}` }}
                            initial={{ x: '-100%' }}
                            animate={{ x: '600%' }}
                            transition={{ duration: 0.45, repeat: Infinity, ease: 'linear' }}
                          />
                        )}
                      </div>

                      {/* Lane 2: Acid Green — secondary signal */}
                      <div
                        className="h-px w-full relative overflow-hidden"
                        style={{ backgroundColor: '#0a1200' }}
                      >
                        <div
                          className="absolute inset-0 transition-all duration-700"
                          style={{
                            width: isPassed ? '100%' : '0%',
                            backgroundColor: ACID,
                            opacity: 0.6,
                            transitionDelay: '100ms'
                          }}
                        />
                        {isActive && isRunning && (
                          <motion.div
                            className="absolute top-0 left-0 h-full w-2.5"
                            style={{ backgroundColor: ACID, boxShadow: `0 0 5px ${ACID}` }}
                            initial={{ x: '-100%' }}
                            animate={{ x: '600%' }}
                            transition={{ duration: 0.45, repeat: Infinity, ease: 'linear', delay: 0.08 }}
                          />
                        )}
                      </div>

                      {/* Lane 3: Acid Green dim — ground/return */}
                      <div
                        className="h-px w-full relative overflow-hidden"
                        style={{ backgroundColor: '#050800' }}
                      >
                        <div
                          className="absolute inset-0 transition-all duration-700"
                          style={{
                            width: isPassed ? '100%' : '0%',
                            backgroundColor: ACID,
                            opacity: 0.25,
                            transitionDelay: '200ms'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ══ Inspector Panel — Full Width ══ */}
        <div
          className="border-2"
          style={{ borderColor: `${ACID}25`, boxShadow: `inset 0 0 40px ${ACID}04` }}
        >
          <InspectorPanel
            activeStepDetail={activeStepDetail}
            logs={logs}
            logBoxRef={logBoxRef}
            isRunning={isRunning}
          />
        </div>

      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STAGGER ANIMATION VARIANTS
══════════════════════════════════════════════════════════════ */
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 15 } }
};

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT: ArchitectureVisualizer
   Renders VARIASI 1C: NEON PCB CIRCUIT MATRIX as the sole definitive design
══════════════════════════════════════════════════════════════ */
export default function ArchitectureVisualizer() {
  const [activeTab, setActiveTab] = useState('los');

  return (
    <section id="architecture" className="py-24 bg-transparent relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
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
            <AceOfHeartsCard size={62} rotation="8deg" />
          </div>
        </div>

        {/* Main Board */}
        <div className="bg-[#0b0b14] border-2 border-white p-6 sm:p-8 shadow-[8px_8px_0px_#ccff00]">

          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#12121c] border border-zinc-800 mb-6">
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

          {/* ── VARIASI 1C: NEON PCB CIRCUIT MATRIX — Komponen Definitif ── */}
          <PCBCircuitMatrix activeTab={activeTab} />

          {/* DicePair sticker footer */}
          <div className="hidden sm:flex justify-start pt-6 pl-1">
            <DicePairSticker size={48} rotation="8deg" />
          </div>

        </div>
      </div>
    </section>
  );
}
