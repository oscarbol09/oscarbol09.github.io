export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  badgeAccent: 'cyan' | 'blue' | 'violet' | 'emerald' | 'amber';
  skills: {
    name: string;
    level: 'Avanzado' | 'Experto' | 'Dominio';
    context: string;
    primary?: boolean;
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Sistemas Backend & Concurrencia',
    description: 'Arquitecturas concurrentes de alto rendimiento, proxies de red, microservicios y servicios empresariales robustos.',
    icon: 'Terminal',
    badgeAccent: 'cyan',
    skills: [
      { name: 'Go (Golang 1.22+)', level: 'Experto', context: 'Goroutines, canales, TCP proxies, wire protocols, CLI Cobra, TUI Bubbletea (Branchbase)', primary: true },
      { name: 'Java Enterprise (Spring)', level: 'Experto', context: 'Spring Boot, Spring Webflux, Project Reactor, JPA / Hibernate, REST, SOAP y WebSockets', primary: true },
      { name: 'Python 3.10+', level: 'Experto', context: 'FastAPI, async I/O, Pydantic v2, pipelines de datos y audio (ThesisForge, AudioBard)', primary: true },
      { name: 'Ruby on Rails & Ruby', level: 'Avanzado', context: 'Arquitectura MVC, Active Record, APIs RESTful y background jobs' },
      { name: 'Node.js & TypeScript', level: 'Avanzado', context: 'APIs type-safe, SSR, streaming SSE y utilidades de backend' },
      { name: 'C / Rust', level: 'Avanzado', context: 'Integraciones nativas, bindings de audio ONNX y extensiones de bajo nivel' },
    ]
  },
  {
    title: 'Frontend & Interfaces de Usuario',
    description: 'UIs modernas, reactivas, accesibles y fluidas a 60 FPS con diseño espacial y micro-interacciones.',
    icon: 'Layout',
    badgeAccent: 'blue',
    skills: [
      { name: 'Angular (TypeScript)', level: 'Experto', context: 'Módulos SPA, servicios reactivos, Bootstrap, HTML5/CSS3 y responsive design', primary: true },
      { name: 'React 19 & Next.js 16', level: 'Experto', context: 'App Router, Server Actions, streaming SSR y componentes controlados', primary: true },
      { name: 'Tailwind CSS v3/v4', level: 'Experto', context: 'Diseño de tokens, glassmorphism, responsive cadence y dark theme' },
      { name: 'Motion.dev / Framer Motion', level: 'Experto', context: 'Física de resortes, transiciones compartidas layoutId y 60 FPS GPU' },
      { name: 'Tauri v2 & Vue 3', level: 'Avanzado', context: 'Aplicaciones de escritorio multiplataforma con backend desacoplado' },
      { name: 'CustomTkinter & PyWebView', level: 'Experto', context: 'GUIs de escritorio en Python con hilos asíncronos desacoplados' },
    ]
  },
  {
    title: 'Bases de Datos & Persistencia',
    description: 'Integridad transaccional ACID, replicación, branching, optimización de esquemas y consultas complejas.',
    icon: 'Database',
    badgeAccent: 'emerald',
    skills: [
      { name: 'PostgreSQL 15/16', level: 'Experto', context: 'Template database cloning, extensiones vectoriales pgvector, RLS y transacciones aisladas', primary: true },
      { name: 'Transact-SQL (SQL Server)', level: 'Experto', context: 'Consultas complejas, procedimientos almacenados, optimización de índices y vistas', primary: true },
      { name: 'SQLite (WAL & CoW)', level: 'Experto', context: 'Snapshots Copy-on-Write, checkpointing WAL y almacenamiento local-first' },
      { name: 'MySQL / MariaDB', level: 'Avanzado', context: 'Replicación estructural, volcado de datos y normalización' },
      { name: 'Azure Cosmos DB & ChromaDB', level: 'Avanzado', context: 'Bases NoSQL escalables en la nube e indexación vectorial densa' },
    ]
  },
  {
    title: 'Cloud, DevOps & Quality Gates',
    description: 'Infraestructura en la nube, pipelines de CI/CD automatizados, principios SOLID y testing riguroso.',
    icon: 'Cloud',
    badgeAccent: 'cyan',
    skills: [
      { name: 'AWS (S3, SQS, SNS, EC2)', level: 'Avanzado', context: 'Aprovisionamiento de cómputo, colas de mensajería asíncronas y almacenamiento de objetos', primary: true },
      { name: 'Azure (App Service, Blobs)', level: 'Avanzado', context: 'Despliegue de microservicios, APIs REST y almacenamiento en la nube', primary: true },
      { name: 'Testing Suites (JUnit, Jest, Pytest)', level: 'Experto', context: '230+ pruebas unitarias y de integración herméticas, TDD y Enzyme' },
      { name: 'CI/CD & Version Control', level: 'Experto', context: 'GitHub Actions, Jenkins, TFS / Azure DevOps y flujos Git estrictos' },
      { name: 'Principios SOLID & Arquitectura', level: 'Experto', context: 'Clean Architecture, Patrones de Diseño, Microservicios y Scrum/Kanban' },
      { name: 'Docker & Docker Compose', level: 'Avanzado', context: 'Contenedorización, entornos aislados y orquestación de servicios' },
    ]
  },
  {
    title: 'IA, RAG & LLM Engineering',
    description: 'Pipelines de recuperación aumentada, embeddings, orquestación y eliminación de alucinaciones.',
    icon: 'Cpu',
    badgeAccent: 'violet',
    skills: [
      { name: 'RAG Híbrido (Vectorial + BM25)', level: 'Experto', context: 'Dense embeddings + Cross-Encoder re-ranking + BM25 léxico', primary: true },
      { name: 'Supabase & pgvector', level: 'Avanzado', context: 'Indexación HNSW, RLS multi-tenant y consultas de similitud' },
      { name: 'LangChain & Vector DBs', level: 'Avanzado', context: 'ChromaDB, FAISS, chunking semántico y optimización de contexto' },
      { name: 'Sistemas Multi-Voz & TTS', level: 'Experto', context: 'Piper ONNX, Kokoro 82M, Edge-TTS y alineación fonética' },
      { name: 'Orquestación de LLMs (BYOK)', level: 'Experto', context: 'Google Gemini 2.5/3, Claude, OpenAI y control de cuotas' },
    ]
  },
  {
    title: 'Visión Artificial, Audio & Open Source',
    description: 'Procesamiento de señales, pipelines multimedia y contribución a proyectos de código abierto comunitarios.',
    icon: 'Activity',
    badgeAccent: 'amber',
    skills: [
      { name: 'OpenCV & YOLO (v8/v11)', level: 'Avanzado', context: 'Tracking multiobjeto (ByteTrack), homografía y estimación de velocidad' },
      { name: 'FFmpeg Streaming Demuxer', level: 'Experto', context: 'Concatenación streaming O(1) RAM, normalización EBU R128' },
      { name: 'Open Source (OCA & Linux)', level: 'Experto', context: 'Pull Requests aprobados en OCA/l10n-spain (TicketBAI, AEAT SII) y omacom/omarchy' },
      { name: 'Git Internals & Worktrees', level: 'Experto', context: 'Inspección de .git/HEAD, commondir y detección de branches' },
    ]
  }
];
