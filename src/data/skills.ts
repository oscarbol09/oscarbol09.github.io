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
    description: 'Arquitecturas concurrentes de alto rendimiento, proxies de red y servicios robustos.',
    icon: 'Terminal',
    badgeAccent: 'cyan',
    skills: [
      { name: 'Go (Golang 1.22+)', level: 'Experto', context: 'Goroutines, canales, TCP proxies, CLI Cobra, TUI Bubbletea (Branchbase)', primary: true },
      { name: 'Python 3.10+', level: 'Experto', context: 'FastAPI, async I/O, Pydantic v2, pipelines de datos y audio (ThesisForge, AudioBard)', primary: true },
      { name: 'Node.js & TypeScript', level: 'Avanzado', context: 'APIs type-safe, SSR, streaming SSE y utilidades de backend' },
      { name: 'C / Rust', level: 'Avanzado', context: 'Integraciones nativas, bindings de audio ONNX y extensiones de bajo nivel' },
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
      { name: 'Orquestación de LLMs (BYOK)', level: 'Experto', context: 'OpenRouter, Google Gemini 2.5/3, Claude y control de cuotas' },
    ]
  },
  {
    title: 'Bases de Datos & Motores de Almacenamiento',
    description: 'Integridad transaccional ACID, replicación, branching y optimización de esquemas.',
    icon: 'Database',
    badgeAccent: 'emerald',
    skills: [
      { name: 'PostgreSQL 15/16', level: 'Experto', context: 'Template database cloning, extensiones vectoriales, RLS y transacciones aisladas', primary: true },
      { name: 'SQLite (WAL & CoW)', level: 'Experto', context: 'Snapshots Copy-on-Write, checkpointing WAL y almacenamiento local-first' },
      { name: 'MySQL / MariaDB', level: 'Avanzado', context: 'Replicación estructural, volcado de datos y normalización' },
      { name: 'ChromaDB & In-Memory Indices', level: 'Avanzado', context: 'Indexación vectorial densa para recuperación de texto' },
    ]
  },
  {
    title: 'Frontend & Interfaces de Alta Artesanía',
    description: 'UIs modernas, rápidas, accesibles y fluidas a 60 FPS con diseño espacial y micro-interacciones.',
    icon: 'Layout',
    badgeAccent: 'blue',
    skills: [
      { name: 'React 19 & Next.js 16', level: 'Experto', context: 'App Router, Server Actions, streaming SSR y componentes controlados', primary: true },
      { name: 'Tailwind CSS v3/v4', level: 'Experto', context: 'Diseño de tokens, glassmorphism, responsive cadence y dark theme' },
      { name: 'Motion.dev / Framer Motion', level: 'Experto', context: 'Física de resortes, transiciones compartidas layoutId y 60 FPS GPU' },
      { name: 'Tauri & Vue 3', level: 'Avanzado', context: 'Aplicaciones de escritorio livianas con backend nativo en Rust/C' },
      { name: 'CustomTkinter & PyWebView', level: 'Experto', context: 'GUIs de escritorio en Python con hilos asíncronos desacoplados' },
    ]
  },
  {
    title: 'Visión Artificial, Audio & Tooling',
    description: 'Procesamiento de señales, pipelines multimedia y tooling para desarrolladores.',
    icon: 'Activity',
    badgeAccent: 'amber',
    skills: [
      { name: 'OpenCV & YOLO (v8/v11)', level: 'Avanzado', context: 'Tracking multiobjeto (ByteTrack), homografía y estimación de velocidad' },
      { name: 'FFmpeg Streaming Demuxer', level: 'Experto', context: 'Concatenación streaming O(1) RAM, normalización EBU R128' },
      { name: 'Git Internals & Worktrees', level: 'Experto', context: 'Inspección de .git/HEAD, commondir y detección de branches' },
      { name: 'Docker & Docker Compose', level: 'Avanzado', context: 'Orquestación de microservicios e infraestructura de pruebas' },
    ]
  }
];
