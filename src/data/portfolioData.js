export const personalInfo = {
  name: "Muhammad Reza Nur Fauzi",
  title: "Junior System Analyst & IT Integration Specialist",
  location: "Bandung, Indonesia",
  timezone: "UTC+07:00 (WIB)",
  email: "mrezanurfauzi@gmail.com",
  phone: "+62 821-5767-5493",
  waLink: "https://wa.me/6282157675493?text=Halo%20Reza,%20saya%20melihat%20portfolio%20anda.",
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
    label: "BPMN Diagrams Modeled",
    value: "30+",
    desc: "Camunda Modeler LOS Workflows"
  },
  {
    label: "Microservices & Feign",
    value: "100%",
    desc: "Java Spring Boot & REST APIs"
  },
  {
    label: "Formal Education",
    value: "ITB",
    desc: "S1 Sistem & Teknologi Informasi"
  },
  {
    label: "Omnichannel Sync",
    value: "E-Commerce",
    desc: "PHP Laravel, ERP & Logistics"
  }
];

export const workExperience = [
  {
    id: "padepokan79",
    role: "System Analyst — Loan Origination System (LOS) Phase 2",
    company: "PT Padepokan Tujuh Sembilan",
    division: "Enterprise Banking & Financing Systems",
    period: "Dec 2025 – Jun 2026",
    badge: "CORE SYSTEM ANALYST",
    type: "Contract / Project",
    description: "Menganalisis sistem eksisting Loan Origination System (LOS) Phase 2 untuk memahami alur pembiayaan, aturan bisnis, dependensi teknis, serta area terdampak oleh peningkatan fitur baru. Merancang orkestrasi alur kerja proses bisnis ke dalam 30+ diagram BPMN dan mereview integrasi antarmikroservis Java Spring Boot.",
    highlights: [
      "Menganalisis arsitektur sistem eksisting LOS Phase 2 untuk pemetaan alur pembiayaan, aturan bisnis, dan dependensi teknis.",
      "Mereview multiple microservices Java Spring Boot, API flows, Feign client integrations, dan struktur controller untuk memetakan komunikasi antarlayanan.",
      "Mendokumentasikan pola akses basis data, penggunaan repository, dan perilaku query untuk analisis logika persistensi dan dependensi sistem.",
      "Merancang 30+ diagram alur kerja BPMN menggunakan Camunda Modeler untuk menerjemahkan proses bisnis eksisting ke dalam orkestrasi workflow yang presisi.",
      "Melakukan gap analysis antara implementasi eksisting dan rencana peningkatan LOS Phase 2 untuk mengidentifikasi perubahan workflow dan mitigasi risiko migrasi.",
      "Berkolaborasi aktif dengan developers, product stakeholders, dan tim bisnis untuk menyelaraskan alur sistem dengan kebutuhan bisnis.",
      "Mengembangkan backend service dan REST API pendukung menggunakan Java 17 dan Spring Boot dalam lingkungan microservices."
    ],
    tags: [
      "Camunda Modeler",
      "BPMN 2.0",
      "Java 17",
      "Spring Boot",
      "Spring Cloud OpenFeign",
      "Gap Analysis",
      "AS-IS / TO-BE",
      "SQL Server / PostgreSQL"
    ]
  },
  {
    id: "foom",
    role: "Software Engineer — Omnichannel Platform",
    company: "PT Foom Lab Global",
    division: "Commerce & Digital Platforms",
    period: "Jul 2022 – Oct 2022",
    badge: "COMMERCE INTEGRATION",
    type: "Internship / Full-time",
    description: "Mengembangkan fitur aplikasi web omnichannel commerce platform dan mengintegrasikan marketplace e-commerce, sistem ERP, serta API logistik pihak ketiga untuk sinkronisasi pesanan, inventaris, dan pengiriman secara otomatis.",
    highlights: [
      "Mengembangkan fitur aplikasi web menggunakan PHP, Laravel, dan MySQL untuk platform omnichannel commerce.",
      "Mengintegrasikan platform e-commerce, sistem ERP, dan API ekspedisi logistik untuk sinkronisasi pesanan, inventaris, dan data pengiriman.",
      "Mengimplementasikan logika backend dan integrasi API untuk meningkatkan efisiensi operasional commerce lintas platform dan memangkas penanganan data manual."
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
    title: "System Analysis & Mapping",
    icon: "Layers",
    color: "#ccff00",
    skills: [
      { name: "Requirements & Gap Analysis", level: "Expert", context: "AS-IS / TO-BE Workflows & SRS" },
      { name: "BPMN 2.0 & Camunda Modeler", level: "Expert", context: "30+ production workflows modeled" },
      { name: "Service Communication Mapping", level: "Advanced", context: "Feign Client & API Flow Review" },
      { name: "Database Behavior Analysis", level: "Advanced", context: "Repository & Query pattern audit" },
      { name: "Technical Documentation", level: "Advanced", context: "API Specs & Architecture Docs" },
      { name: "ANTLR v4 & Figma", level: "Proficient", context: "Grammar parsing & UI Wireframing" }
    ]
  },
  {
    title: "Backend & Microservices",
    icon: "Server",
    color: "#a3e635",
    skills: [
      { name: "Java 17 & Spring Boot", level: "Advanced", context: "Enterprise Microservice Services" },
      { name: "Spring Cloud OpenFeign", level: "Advanced", context: "Declarative Inter-service REST" },
      { name: "Node.js & Express.js", level: "Advanced", context: "REST API Development" },
      { name: "PHP & Laravel Framework", level: "Advanced", context: "Omnichannel & Backend Logic" },
      { name: "REST API & Webhooks", level: "Expert", context: "Integration & Sync Protocols" },
      { name: "Git & Linux Terminal", level: "Expert", context: "Git workflows & CLI debugging" }
    ]
  },
  {
    title: "Databases & Tools",
    icon: "Database",
    color: "#ccff00",
    skills: [
      { name: "SQL Server & PostgreSQL", level: "Advanced", context: "Enterprise RDBMS & Optimization" },
      { name: "MySQL & MariaDB", level: "Advanced", context: "Commerce DB Schema & Querying" },
      { name: "MongoDB", level: "Proficient", context: "Document Storage & NoSQL" },
      { name: "Postman & DBeaver", level: "Expert", context: "API Testing & DB Analysis" },
      { name: "VS Code & Camunda Modeler", level: "Expert", context: "Daily Dev & Modeling Environment" },
      { name: "Git Version Control", level: "Expert", context: "Branching, PRs & Repository Sync" }
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
