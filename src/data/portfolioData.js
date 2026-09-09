export const personalInfo = {
  name: "Muhammad Reza Nur Fauzi",
  nickname: "amisiroo",
  handle: "amisiroo",
  title: "System Analyst & AI Automation Specialist",
  tagline: "Architecting intelligent enterprise systems: bridging formal business process modeling with AI Management Systems, autonomous agentic orchestration, and operational automation.",
  location: "Bandung, Indonesia",
  timezone: "UTC+07:00 (WIB)",
  email: "mrezanurfauzi@gmail.com",
  phone: "08988090008",
  displayPhone: "+62 898-8090-008",
  waLink: "https://wa.me/628988090008?text=Halo%20Reza,%20saya%20melihat%20portfolio%20anda.",
  education: {
    institution: "Institut Teknologi Bandung (ITB)",
    degree: "Bachelor's Degree in Information Systems and Technology (S1 STI)",
    period: "2019 – 2025"
  },
  languages: [
    { name: "Bahasa Indonesia", level: "Native" },
    { name: "English", level: "Professional Working Proficiency" }
  ]
};

export const heroStats = [
  {
    label: "Process Orchestration",
    value: "30+ BPMN",
    desc: "Camunda Modeler Workflows"
  },
  {
    label: "AI Management Systems",
    value: "AIMS",
    desc: "AI Governance & Architecture"
  },
  {
    label: "AI Automation",
    value: "Agentic",
    desc: "Multi-Agent LLM Orchestration"
  },
  {
    label: "System Modernization",
    value: "AS-IS / TO-BE",
    desc: "Gap Analysis & Integration"
  },
];

export const workExperience = [
  {
    id: "agansa",
    role: "IT Technical & System Integration",
    company: "PT. Agansa Primatama",
    division: "Divisi OSM (Office of Strategic Management)",
    period: "Aug 2026 – Present",
    badge: "CURRENT ACTIVE ROLE",
    type: "Full-time",
    description: "Memegang peranan manajemen dan administrasi pada implementasi Salesforce CRM perusahaan, mengelola kebutuhan teknis integrasi sistem, pemeliharaan arsitektur website, serta otomasi kebutuhan operasional IT di bawah Office of Strategic Management (OSM).",
    highlights: [
      "Mengelola administrasi & management sistem CRM Salesforce untuk menyelaraskan alur kerja divisi korporat.",
      "Bertanggung jawab atas pengelolaan kebutuhan IT Technical, maintenance, dan integrasi website perusahaan.",
      "Mengembangkan arsitektur teknis dan otomasi alur data strategis untuk efisiensi operasional manajemen (OSM)."
    ],
    tags: [
      "Salesforce CRM",
      "System Integration",
      "OSM Management",
      "Web Infrastructure",
      "IT Technical Support"
    ]
  },
  {
    id: "padepokan79",
    role: "System Analyst — Loan Origination System (LOS) Phase 2",
    company: "PT. Padepokan Tujuh Sembilan",
    division: "Enterprise Banking & Financing Systems",
    period: "Dec 2025 – Jun 2026",
    badge: "SYSTEM ANALYST DRILL",
    type: "Contract",
    description: "Menganalisis sistem eksisting LOS Phase 2 untuk memahami end-to-end financing workflows, business rules, dan technical dependencies. Memetakan application logic & komunikasi antarlayanan menggunakan static code analysis ANTLR v4 (membuat function call graph dan pemetaan komunikasi Kafka topics). Merancang 30+ diagram alur kerja BPMN pada Camunda Modeler, mendokumentasikan pola akses query SQL Server, serta mengembangkan backend Java 17 Spring Boot.",
    highlights: [
      "Menganalisis sistem eksisting LOS Phase 2 untuk memahami end-to-end alur pembiayaan, aturan bisnis, dan dependensi teknis.",
      "Memetakan application logic dan komunikasi antarmikroservis melalui static code analysis menggunakan ANTLR v4 dengan membuat graph fungsi dan komunikasi Kafka topics.",
      "Mendokumentasikan pola akses query database SQL Server untuk memahami perilaku persistensi dan integrasi data.",
      "Merancang 30+ model diagram alur kerja BPMN menggunakan Camunda Modeler untuk orkestrasi alur bisnis yang dinamis dan terstandarisasi.",
      "Melakukan gap analysis mendalam antara implementasi eksisting dan arsitektur berbasis BPMN untuk mitigasi risiko migrasi.",
      "Berkolaborasi aktif dengan developers, product stakeholders, dan tim bisnis untuk menyelaraskan sistem dengan kebutuhan operasional.",
      "Mengembangkan backend services dan REST API pendukung menggunakan Java 17 dan Spring Boot dalam lingkungan microservices."
    ],
    tags: [
      "ANTLR v4",
      "Function Call Graph",
      "Kafka Topics",
      "Camunda Modeler",
      "BPMN 2.0",
      "Java 17",
      "Spring Boot",
      "SQL Server",
      "Gap Analysis"
    ]
  },
  {
    id: "foom",
    role: "Software Engineer — Omnichannel Platform",
    company: "PT. Foom Lab Global",
    division: "Commerce & Digital Platforms",
    period: "Jul 2022 – Oct 2022",
    badge: "COMMERCE INTEGRATION",
    type: "Internship / Magang",
    description: "Mengembangkan aplikasi web menggunakan PHP Laravel & MySQL, serta membangun integrasi omnichannel terpadu dengan platform e-commerce, sistem ERP, dan API ekspedisi logistik untuk sinkronisasi otomatis pesanan, stok, dan pengiriman.",
    highlights: [
      "Mengembangkan fitur aplikasi web menggunakan PHP, Laravel, dan MySQL untuk platform omnichannel commerce.",
      "Mengintegrasikan platform e-commerce, sistem ERP, dan API ekspedisi logistik untuk sinkronisasi pesanan, inventaris, dan data pengiriman.",
      "Mengimplementasikan backend logic dan integrasi API untuk meningkatkan efisiensi operasional commerce dan memangkas pekerjaan manual."
    ],
    tags: [
      "PHP Laravel",
      "MySQL",
      "REST API Integration",
      "Omnichannel",
      "Logistics API",
      "ERP Sync"
    ]
  }
];

export const skillCategories = [
  {
    title: "System Analysis & Architecture",
    icon: "Layers",
    color: "#ccff00",
    skills: [
      { name: "BPMN 2.0 & Camunda Modeler", score: "2.7/4.0", level: "Strong Mid", context: "30+ enterprise workflows, conditional gateway routing, async execution" },
      { name: "AS-IS / TO-BE Gap Analysis", score: "3.0/4.0", level: "Advanced", context: "Legacy-to-Cloud modernization & SRS architectural delta" },
      { name: "API Contracts & Anti-Corruption Layer (ACL)", score: "3.0/4.0", level: "Advanced", context: "OpenFeign specs, domain isolation, error boundaries" },
      { name: "Requirements Engineering & SRS", score: "3.0/4.0", level: "Advanced", context: "System specifications, functional rules, technical impact" },
      { name: "ANTLR v4 Parser Grammar", score: "2.5/4.0", level: "Competent", context: "Domain-specific parsing & static metadata mapping" }
    ]
  },
  {
    title: "Backend & Microservices",
    icon: "Server",
    color: "#a3e635",
    skills: [
      { name: "Java 17 & Spring Boot", score: "2.8/4.0", level: "Strong Mid", context: "Enterprise microservice controllers & RESTful services" },
      { name: "Spring Cloud OpenFeign", score: "2.8/4.0", level: "Strong Mid", context: "Idempotency key enforcement, inter-service resilience" },
      { name: "Apache Kafka & Event Streaming", score: "3.0/4.0", level: "Advanced", context: "Asynchronous topic pub/sub, decoupled middleware pipeline" },
      { name: "PHP Laravel & Node.js", score: "2.8/4.0", level: "Strong Mid", context: "Omnichannel ERP sync, webhook listeners, high-throughput APIs" },
      { name: "Autonomous Multi-Agent Orchestration", score: "3.0/4.0", level: "Advanced", context: "Hermes Agent delegation, subagent task routing, tool execution" },
      { name: "LLM Tool-Calling & Structured I/O", score: "3.0/4.0", level: "Advanced", context: "Pydantic validation, deterministic pipelines" },
      { name: "Git, Linux Terminal & CI/CD", score: "3.0/4.0", level: "Advanced", context: "Bash scripting, automated deployment pipelines" }
    ]
  },
  {
    title: "Database Concurrency & Persistence",
    icon: "Database",
    color: "#ccff00",
    skills: [
      { name: "Database Concurrency & Race Protection", score: "3.2/4.0", level: "Advanced / Senior", context: "Atomic update patterns, isolation level management, zero-deadlock throughput" },
      { name: "Microsoft SQL Server & PostgreSQL", score: "3.0/4.0", level: "Advanced", context: "Financial transactional locking, audit logging, query tuning" },
      { name: "MySQL & MongoDB", score: "2.8/4.0", level: "Strong Mid", context: "High-volume inventory indexing & document telemetry" }
    ]
  }
];

export const achievements = [
  {
    title: "2nd Runner Up — AIS Competition 2021",
    issuer: "Telkom University",
    year: "2021",
    category: "Mobile Application UI/UX Design",
    desc: "Meraih Juara 3 (2nd Runner Up) tingkat nasional dalam kompetisi perancangan solusi digital UI/UX aplikasi mobile interaktif berbasis riset kebutuhan pengguna.",
    badge: "NATIONAL PODIUM"
  },
  {
    title: "Certified UI/UX Designer — Batch 28",
    issuer: "Sanbercode Bootcamp",
    year: "2021",
    category: "Design System & Prototyping",
    desc: "Sertifikasi resmi kompetensi UI/UX Design (No. Sertifikat: 27904/164/BDG/P-SNBR/CODE/2021), mencakup User Research, Wireframing, Figma Prototyping, dan Usability Testing.",
    badge: "CERTIFIED"
  },
  {
    title: "Bachelor's Degree in Information Systems & Tech",
    issuer: "Institut Teknologi Bandung (ITB)",
    year: "2019 – 2025",
    category: "Formal Academic Degree (S1 STI)",
    desc: "Lulusan Sarjana STI ITB dengan penguasaan mendalam pada arsitektur sistem informasi enterprise, pemodelan proses bisnis, rekayasa perangkat lunak, dan integrasi sistem.",
    badge: "DEGREE"
  }
];
