export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'systems' | 'ai_rag' | 'desktop_tools' | 'vision';
  categoryLabel: string;
  featured: boolean;
  status: 'Activo / Producción' | 'En Desarrollo Activo' | 'Completado';
  version?: string;
  languages: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  installCommand?: string;
  highlights: string[];
  description: string;
  architectureDiagram?: string;
  technicalDecisions: { title: string; explanation: string }[];
  metrics: { label: string; value: string }[];
  badgeColor: 'cyan' | 'blue' | 'violet' | 'emerald' | 'amber';
}

export const PROJECTS: Project[] = [
  {
    id: 'branchbase',
    title: 'Branchbase',
    slug: 'branchbase',
    tagline: 'Zero-config, Git-native local database branching CLI, TUI & TCP Proxy.',
    category: 'systems',
    categoryLabel: 'Sistemas & Infraestructura',
    featured: true,
    status: 'Activo / Producción',
    version: 'v0.3.0',
    languages: ['Go'],
    techStack: ['Golang 1.22+', 'Cobra CLI', 'Bubbletea TUI', 'PostgreSQL', 'MySQL', 'SQLite', 'Docker Compose'],
    githubUrl: 'https://github.com/oscarbol09/branchbase',
    installCommand: 'go install github.com/oscarbol09/branchbase/cmd/branchbase@latest',
    badgeColor: 'cyan',
    highlights: [
      'Elimina el schema drift y el conflicto de migraciones al cambiar de ramas en Git.',
      'Proxy TCP transparente que intercepta el puerto 5432 y conmuta dinámicamente según la rama activa de Git.',
      'Clonado ultra-rápido en PostgreSQL mediante CREATE DATABASE ... TEMPLATE.',
      'Snapshots Copy-on-Write (CoW) con checkpoint WAL en SQLite.'
    ],
    description: 'Branchbase es una herramienta de infraestructura local para desarrolladores que permite ramificar bases de datos locales vinculadas de forma automática y transparente a las ramas de Git. La aplicación cliente sigue conectándose a localhost:5432, mientras que el proxy en Go inspecciona el HEAD de Git y redirige el tráfico a la base de datos aislada de esa rama.',
    architectureDiagram: `[ Aplicación Cliente (localhost:5432) ]
                   │
                   ▼
        [ Branchbase TCP Proxy (Go) ]
                   │
     ┌──────────────┴──────────────┐
     ▼                             ▼
 [ db_main (Git: main) ]     [ db_feat_auth (Git: feat/auth) ]`,
    technicalDecisions: [
      {
        title: 'Proxy TCP con Conexiones de Control Aisladas',
        explanation: 'Se separaron las conexiones de control administrativo de las conexiones de datos de la app para evitar bloqueos durante la clonación de templates en PostgreSQL.'
      },
      {
        title: 'Doble Detección de Rama Git',
        explanation: 'Implementación híbrida que ejecuta git rev-parse pero cuenta con fallback directo de lectura de bajo nivel sobre .git/HEAD y worktrees commondir para entornos sin binario de git.'
      },
      {
        title: 'TUI Reactiva con Bubbletea',
        explanation: 'Interfaz de terminal interactiva con modelo Elm para visualizar ramas activas, tamaño de base de datos y logs de replicación en tiempo real.'
      }
    ],
    metrics: [
      { label: 'Tiempo de Clonado DB', value: '< 250ms' },
      { label: 'Sobrecarga de Proxy', value: '< 1.2ms' },
      { label: 'Motores Soportados', value: '3 (PG/MySQL/SQLite)' }
    ]
  },
  {
    id: 'jvm-mcp',
    title: 'JVM-MCP',
    slug: 'jvm-mcp',
    tagline: 'Servidor MCP nativo en Java 21 y GraalVM para diagnóstico y perfilado runtime de la JVM sin agentes previos.',
    category: 'systems',
    categoryLabel: 'Sistemas & Diagnóstico JVM',
    featured: true,
    status: 'Activo / Producción',
    version: 'v1.0.0',
    languages: ['Java'],
    techStack: ['Java 21', 'GraalVM Native Image', 'Model Context Protocol (MCP)', 'JDK Attach API', 'JVM TI / JMX', 'HikariCP', 'Picocli', 'JUnit 5'],
    githubUrl: 'https://github.com/oscarbol09/jvm-mcp',
    installCommand: 'jvm-mcp attach <pid> || brew install oscarbol09/tap/jvm-mcp',
    badgeColor: 'cyan',
    highlights: [
      'Conexión zero-intrusion a cualquier proceso JVM local mediante JDK Attach API sin agentes Java previos ni reinicios.',
      'Detección de ciclos de interbloqueo (Deadlocks), inspección de memoria por regiones (Heap/Non-Heap) y métricas de GC.',
      'Análisis profundo de connection pools en HikariCP, Tomcat JDBC y Apache DBCP con detección de fugas (leaks).',
      'Binario standalone compilado con GraalVM Native Image: arranque en < 15ms y consumo < 25MB RAM para Cursor y Claude Desktop.'
    ],
    description: 'JVM-MCP es un servidor nativo de Model Context Protocol (MCP) en Java 21 que dota a los asistentes de IA de superpoderes para inspeccionar, diagnosticar y perfilar procesos Java y Spring Boot en tiempo de ejecución. Permite a los agentes diagnosticar bloqueos de hilos, fugas de memoria, cuellos de botella de GC y agotamiento de pools de base de datos directamente desde el IDE.',
    architectureDiagram: `[ IDE / LLM: Claude Desktop / Cursor ]
                   │ (JSON-RPC stdio)
                   ▼
     [ jvm-mcp (GraalVM Native Binary) ]
                   │ (JDK Attach API / JMX)
                   ▼
[ Target JVM: Spring Boot / Java Service (PID) ]
 ├── ThreadMXBean ➔ Deadlock Cycle Graph
 ├── MemoryPoolMXBean ➔ Heap / Non-Heap Analysis
 └── HikariPoolMXBean ➔ Active / Idle / Leaked Conns`,
    technicalDecisions: [
      {
        title: 'Cero Intrusión con Dynamic Bytecode Attach',
        explanation: 'Utiliza VirtualMachine.attach(pid) del JDK en tiempo de ejecución, eliminando la necesidad de configurar flags -javaagent o reiniciar microservicios en producción.'
      },
      {
        title: 'GraalVM AOT Compilation con Reflection Configuration',
        explanation: 'Compilación Ahead-Of-Time con GraalVM Native Image para garantizar tiempos de arranque sub-15ms requeridos por la especificación de inicio stdio de MCP.'
      },
      {
        title: 'Inspección Heurística de Pools de Conexión',
        explanation: 'Escaners reflexivos para MBeans de HikariCP y Tomcat JDBC que alertan de conexiones bloqueadas antes de que colapsen el microservicio.'
      }
    ],
    metrics: [
      { label: 'Tiempo de Arranque', value: '< 15ms' },
      { label: 'Intrusión en Target', value: '0% (Zero-Restart)' },
      { label: 'Huella de Memoria', value: '< 25 MB' }
    ]
  },
  {
    id: 'a2a-hub',
    title: 'A2A-Hub',
    slug: 'a2a-hub',
    tagline: 'Registro descentralizado de agentes e intermediario de mensajería para el protocolo Agent2Agent (A2A).',
    category: 'ai_rag',
    categoryLabel: 'IA & Protocolos Multi-Agente',
    featured: true,
    status: 'Activo / Producción',
    version: 'v1.0.0',
    languages: ['Java', 'TypeScript', 'SQL'],
    techStack: ['Java 21 (Virtual Threads)', 'Spring Boot 3.4', 'LangChain4j', 'PostgreSQL 16 (pgvector)', 'HNSW Indexing', 'Vue 3.5 / Tailwind CSS', 'WebSockets', 'OpenAPI / REST'],
    githubUrl: 'https://github.com/oscarbol09/a2a-hub',
    installCommand: 'git clone https://github.com/oscarbol09/a2a-hub.git && ./mvnw spring-boot:run',
    badgeColor: 'violet',
    highlights: [
      'Implementación de referencia del protocolo Agent2Agent (A2A v1.0) para orquestación e interoperabilidad multi-agente.',
      'Búsqueda semántica de habilidades de agentes con LangChain4j y PostgreSQL pgvector mediante índices HNSW de alta velocidad.',
      'Canal de telemetría y mensajería en vivo mediante WebSockets y Project Loom (Virtual Threads) para concurrencia I/O masiva.',
      'Hardening de seguridad empresarial: validación estricta de esquemas de AgentCard y defensas activas contra SSRF y DNS Rebinding.'
    ],
    description: 'A2A-Hub es un registro y enrutador descentralizado para agentes de inteligencia artificial autónomos basado en el estándar Agent2Agent (A2A). Permite a los agentes registrar sus AgentCards, publicar sus capacidades y delegar tareas complejas a otros agentes especializados mediante descubrimiento semántico vectorial y mensajería reactiva en tiempo real.',
    architectureDiagram: `[ Agent Alice ] ➔ POST /api/v1/agents/register (AgentCard JSON)
                         │
                         ▼
        [ A2A-Hub: Spring Boot 3.4 + Virtual Threads ]
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
[ pgvector (HNSW) ]  [ WebSockets Telemetry ]  [ SSRF Safe Proxy ]
(Búsqueda Semántica)  (Streaming de Mensajes)   (Enrutamiento A2A)`,
    technicalDecisions: [
      {
        title: 'Descubrimiento Semántico con pgvector & HNSW',
        explanation: 'Transforma las descripciones de capacidades y habilidades de las AgentCards en embeddings densos con LangChain4j para indexación vectorial rápida con índices HNSW en PostgreSQL.'
      },
      {
        title: 'Alta Concurrencia con Virtual Threads (Project Loom)',
        explanation: 'Aprovecha Java 21 Virtual Threads para manejar miles de conexiones WebSockets y llamadas HTTP salientes a agentes externos sin agotar los hilos del sistema operativo.'
      },
      {
        title: 'Protección Anti-SSRF y Validación de AgentCards',
        explanation: 'Filtro de seguridad que valida esquemas de AgentCard e inspecciona direcciones IP resueltas para bloquear ataques de falsificación de peticiones del lado del servidor (SSRF).'
      }
    ],
    metrics: [
      { label: 'Búsqueda Semántica', value: '< 20ms HNSW' },
      { label: 'Concurrencia I/O', value: 'Virtual Threads' },
      { label: 'Seguridad', value: 'Anti-SSRF Hardened' }
    ]
  },
  {
    id: 'macrosentinel',
    title: 'MacroSentinel',
    slug: 'macrosentinel',
    tagline: 'Radar autónomo de inteligencia macroeconómica, series cuantitativas y NLP de bancos centrales con LLMs.',
    category: 'ai_rag',
    categoryLabel: 'IA & Inteligencia Cuantitativa',
    featured: true,
    status: 'Activo / Producción',
    version: 'v0.2.0',
    languages: ['Python'],
    techStack: ['Python 3.11+', 'LiteLLM / Gemini / OpenAI', 'FRED API', 'BLS API', 'U.S. Treasury API', 'CFTC SODA2', 'SQLite WAL (DLQ)', 'Matplotlib Agg', 'Resend API', 'Telegram Bot API', 'APScheduler'],
    githubUrl: 'https://github.com/oscarbol09/MacroSentinel',
    installCommand: 'pip install -e . || macro-sentinel scan --now',
    badgeColor: 'emerald',
    highlights: [
      'Pipeline asíncrono Scatter-Gather con disyuntores (Circuit Breakers) y Dead Letter Queue (DLQ) en SQLite WAL.',
      'Ingesta continua de indicadores cuantitativos (FRED, Tesoro de EE.UU., BLS, CFTC COT) y actas del FOMC/BCE.',
      'Razonamiento financiero estructurado: Financial Chain-of-Thought (FinCoT) con debate dialéctico obligatorio (Agente Halcón vs Paloma).',
      'Despacho multicanal automatizado: Terminal Rich, reportes Markdown MacroPulse, bot de Telegram y digest por correo vía Resend.'
    ],
    description: 'MacroSentinel es un radar autónomo de inteligencia macroeconómica que unifica datos dispersos del mercado monetario y laboral. Analiza el tono de los bancos centrales (Hawkish vs Dovish), grafica la curva de rendimientos (10Y-2Y Spread) y genera síntesis de cuadrantes económicos del Investment Clock con fallback determinista.',
    architectureDiagram: `[ APScheduler / CLI ] ➔ [ Scatter-Gather Ingestion (FRED, BLS, Treasury, COT, FOMC) ]
                                            │
                                            ▼
                           [ Circuit Breaker & Dead Letter Queue (DLQ) ]
                                            │
                                            ▼
                       [ FinCoT LLM Ingestion (Debate Halcón vs Paloma) ]
                                            │
                                            ▼
                 [ Despacho Multicanal: Telegram, Email Resend & Terminal Rich ]`,
    technicalDecisions: [
      {
        title: 'Cómputo en Puntos Básicos (bps) en Tasas',
        explanation: 'Las variaciones en tipos de interés se computan en Puntos Básicos (Δ × 100) para eliminar distorsiones matemáticas porcentuales en lecturas cercanas a cero.'
      },
      {
        title: 'Pipeline Resiliente con Dead Letter Queue (DLQ)',
        explanation: 'Si una API externa sufre caídas o límites de cuota, la llamada se aísla en la tabla de cuarentena y el pipeline continúa la síntesis con las fuentes supervivientes.'
      },
      {
        title: 'Debate Dialéctico Antagónico en LLMs',
        explanation: 'Para neutralizar sesgos complacientes de los modelos de lenguaje, el prompt obliga a enfrentar un Agente Halcón (inflación) contra un Agente Paloma (empleo) antes de formular la síntesis final.'
      }
    ],
    metrics: [
      { label: 'Fuentes Ingestadas', value: '5 APIs Oficiales' },
      { label: 'Manejo de Fallos', value: 'DLQ & Circuit Breaker' },
      { label: 'Formato de Tasas', value: 'Basis Points (bps)' }
    ]
  },
  {
    id: 'edurag',
    title: 'EduRag',
    slug: 'edurag',
    tagline: 'Plataforma SaaS multi-tenant con asistentes RAG personalizados para docentes e integración LMS.',
    category: 'ai_rag',
    categoryLabel: 'IA & RAG Pipelines',
    featured: true,
    status: 'En Desarrollo Activo',
    version: 'v1.0.0-beta',
    languages: ['TypeScript', 'Python'],
    techStack: ['Next.js 16 App Router', 'React 19', 'FastAPI', 'Azure Cosmos DB', 'Azure Blob Storage', 'Supabase PostgreSQL', 'Tailwind CSS v4', 'JWT / RBAC', 'SSE Streaming'],
    githubUrl: 'https://github.com/oscarbol09/EduRag',
    installCommand: 'git clone https://github.com/oscarbol09/EduRag.git',
    badgeColor: 'violet',
    highlights: [
      'Arquitectura SaaS multi-inquilino en la nube con API RESTful asegurada con JWT y control de acceso RBAC.',
      'Docentes cargan material de clase (PDF/DOCX/MD) y generan asistentes pedagógicos especializados con Google Gemini.',
      'Streaming de tokens SSE en tiempo real con renderizado de fórmulas STEM en vivo (\\(...\\), $$...$$).',
      'Despliegue modular en Azure App Service y Blob Storage con Quality Gates de seguridad.'
    ],
    description: 'EduRag es una plataforma SaaS multi-tenant diseñada para el sector educativo. Permite a docentes universitarios y escolares crear asistentes pedagógicos con base de conocimiento restringida exclusivamente a sus programas de estudio, evitando alucinaciones y facilitando integración mediante iframe seguro en Moodle y Canvas.',
    architectureDiagram: `[ Docente ] ➔ [ Ingesta de Curriculo ] ➔ [ Chunking Léxico + Embedding ]
                                               │
                                               ▼
[ Estudiante ] ➔ [ SSE Token Stream ] ➔ [ Context Builder & Gemini AI ]
                                               │
                                               ▼
                                 [ Respuesta STEM + Citas APA ]`,
    technicalDecisions: [
      {
        title: 'Arquitectura Multi-Tenant & RBAC',
        explanation: 'Aislamiento estricto de datos por institución educativa y roles mediante tokens JWT verificados y almacenamiento seguro de credenciales.'
      },
      {
        title: 'Renderizado STEM sin dangerouslySetInnerHTML',
        explanation: 'Parser seguro que procesa expresiones matemáticas y sintaxis Markdown directamente a través de árboles de componentes React 19.'
      },
      {
        title: 'Despliegue en la Nube con Azure',
        explanation: 'Aprovecha Azure App Services y Blob Storage para persistencia de documentos curriculares con pipelines CI/CD automatizados.'
      }
    ],
    metrics: [
      { label: 'Latencia Primer Token', value: '450ms' },
      { label: 'Control de Acceso', value: 'RBAC + JWT' },
      { label: 'Seguridad Multi-Tenant', value: '100% RLS / Isolated' }
    ]
  },
  {
    id: 'thesisforge',
    title: 'ThesisForge',
    slug: 'thesisforge',
    tagline: 'Asistente y forjador de investigación académica con IA, RAG Híbrido, CrossRef y exportación APA 7ª.',
    category: 'ai_rag',
    categoryLabel: 'IA & RAG Pipelines',
    featured: true,
    status: 'En Desarrollo Activo',
    version: 'v0.5.0',
    languages: ['Python', 'JavaScript'],
    techStack: ['Python 3.11+', 'FastAPI', 'PyWebView', 'LangChain', 'ChromaDB / BM25', 'CrossRef API', 'Semantic Scholar API', 'arXiv API'],
    githubUrl: 'https://github.com/oscarbol09/thesisforge',
    installCommand: 'git clone https://github.com/oscarbol09/thesisforge.git',
    badgeColor: 'emerald',
    highlights: [
      'Automatización de revisiones sistemáticas de literatura bajo estándares PRISMA 2020.',
      'Conectores en vivo con CrossRef, Semantic Scholar y arXiv con rate-limiting adaptativo.',
      'RAG Híbrido (Vectorial denso con Cross-Encoder + BM25 léxico) para precisión académica máxima.',
      'Exportación automática de referencias en BibTeX, Word (.docx) y LaTeX (.tex) con normas APA 7ª.'
    ],
    description: 'ThesisForge es un entorno de escritorio asistido por IA para investigadores y tesistas. Integra búsqueda en repositorios indexados, extracción rigurosa de citas verificables y estructuración metodológica de artículos científicos sin alucinaciones de IA.',
    architectureDiagram: `[ Búsqueda Académica: CrossRef / Semantic Scholar / arXiv ]
                               │
                               ▼
              [ Extractor de Citas & BibTeX ]
                               │
                               ▼
             [ RAG Híbrido: Vectorial + BM25 ]
                               │
                               ▼
        [ Asesor Metodológico + Exportador APA 7ª ]`,
    technicalDecisions: [
      {
        title: 'RAG Híbrido con Re-Ranking',
        explanation: 'Combina búsqueda densa semántica con búsqueda exacta BM25 para capturar terminología médica y científica exacta sin pérdida de contexto.'
      },
      {
        title: 'Verificación Criptográfica de DOI',
        explanation: 'Filtro anti-alucinación que valida cada referencia citada contra el registro central de CrossRef antes de incluirla en el manuscrito.'
      }
    ],
    metrics: [
      { label: 'Precisión de Citas', value: '99.8%' },
      { label: 'APIs Indexadas', value: '3 (CrossRef/ArXiv/S2)' },
      { label: 'Cumplimiento', value: 'APA 7ª / PRISMA' }
    ]
  },
  {
    id: 'audiobard',
    title: 'AudioBard',
    slug: 'audiobard',
    tagline: 'Generador avanzado de audiolibros multi-voz con atribución de personajes por LLM y TTS neural.',
    category: 'desktop_tools',
    categoryLabel: 'Desktop & Automatización',
    featured: true,
    status: 'Activo / Producción',
    version: 'v0.2.0',
    languages: ['Python', 'TypeScript', 'Rust'],
    techStack: ['Python 3.10+', 'FastAPI/CLI', 'FFmpeg Demuxer', 'Piper TTS (ONNX)', 'Edge-TTS', 'Kokoro TTS', 'Tauri v2', 'Vue 3', 'SQLite', 'Pytest (230+ Tests)', 'GitHub Actions CI/CD'],
    githubUrl: 'https://github.com/oscarbol09/audiobard',
    installCommand: 'pip install audiobard || git clone https://github.com/oscarbol09/audiobard',
    badgeColor: 'blue',
    highlights: [
      'Convierte libros EPUB, PDF y TXT en audiolibros multi-personaje con reparto de voces automáticas mediante LLMs.',
      'Arquitectura desacoplada y reactiva (CLI/GUI) con persistencia relacional en SQLite y caché determinista.',
      'Suite de testing exhaustiva con más de 230 pruebas automatizadas (unitarias y de integración) en Pytest.',
      'Concatenación streaming con FFmpeg y normalización de sonoridad EBU R128 sin saturar la memoria RAM.'
    ],
    description: 'AudioBard es un pipeline completo que transforma la experiencia de lectura de libros electrónicos. Asigna timbres vocales individuales a cada personaje de la trama y produce archivos MP3/M4B listos para reproductores con capítulos y metadatos Dublin Core intactos.',
    architectureDiagram: `[ Archivo EPUB / PDF ] ➔ [ Parser de Capítulos & Dublin Core ]
                                       │
                                       ▼
                     [ LLM: Atribución de Diálogos ]
                                       │
                                       ▼
                   [ Pipeline TTS Multi-Voz (Piper/Edge) ]
                                       │
                                       ▼
                [ FFmpeg Audio Concatenation (EBU R128) ]`,
    technicalDecisions: [
      {
        title: 'Concatenación Streaming en FFmpeg',
        explanation: 'En lugar de cargar horas de audio en memoria, se utiliza el demuxer concat de FFmpeg con normalización loudnorm de dos pasos.'
      },
      {
        title: 'Desacoplamiento de Motores TTS',
        explanation: 'Arquitectura de providers intercambiables que permite alternar entre síntesis local ONNX ultra-rápida y modelos en la nube sin cambiar la lógica del core.'
      }
    ],
    metrics: [
      { label: 'Uso de Memoria RAM', value: '< 180 MB' },
      { label: 'Velocidad de Síntesis', value: '12x Realtime' },
      { label: 'Formatos Exportados', value: 'MP3 / M4B' }
    ]
  },
  {
    id: 'darius-ai',
    title: 'Darius-AI',
    slug: 'darius-ai',
    tagline: 'Asistente virtual de escritorio nativo para Windows con control por voz y memoria en Obsidian.',
    category: 'desktop_tools',
    categoryLabel: 'Desktop & Automatización',
    featured: false,
    status: 'En Desarrollo Activo',
    languages: ['Python'],
    techStack: ['Python 3.11+', 'CustomTkinter', 'Google Gemini API', 'Whisper Speech', 'PyAutoGUI', 'PowerShell Automation', 'Obsidian Vault API'],
    githubUrl: 'https://github.com/oscarbol09/Darius-AI',
    badgeColor: 'cyan',
    highlights: [
      'Control total por voz y comandos de texto para automatización nativa de Windows.',
      'Memoria a largo plazo persistente sincronizada bidireccionalmente con la bóveda de Obsidian.',
      'Interfaz gráfica no bloqueante en CustomTkinter utilizando cola de eventos threading y queue.Queue.'
    ],
    description: 'Darius-AI combina la potencia del modelo Gemini de Google con la organización del segundo cerebro de Obsidian. Permite ejecutar flujos de trabajo de PowerShell, gestionar ventanas y documentar aprendizajes automáticamente.',
    technicalDecisions: [
      {
        title: 'Cola Asíncrona de GUI',
        explanation: 'Uso de un hilo en segundo plano para llamadas de red e I/O comunicadas con la UI de Tkinter mediante eventos thread-safe.'
      }
    ],
    metrics: [
      { label: 'Tiempo de Reacción', value: '< 600ms' },
      { label: 'Persistencia', value: 'Obsidian Markdown' }
    ]
  },
  {
    id: 'loop-cv',
    title: 'Loop Computer Vision',
    slug: 'loop-computer-vision',
    tagline: 'Sistema de inteligencia y análisis de tráfico vehicular con compensación de movimiento de cámara.',
    category: 'vision',
    categoryLabel: 'Visión Artificial',
    featured: false,
    status: 'En Desarrollo Activo',
    languages: ['Python'],
    techStack: ['Python 3.10+', 'OpenCV', 'YOLOv8 / YOLOv11', 'ByteTrack / BoT-SORT', 'Streamlit', 'NumPy', 'SciPy', 'Docker'],
    githubUrl: 'https://github.com/oscarbol09/loop-computer-vision',
    badgeColor: 'amber',
    highlights: [
      'Compensación en tiempo real de vibraciones y movimiento de cámara mediante matrices de homografía.',
      'Algoritmo de reconexión de trayectorias perdidas por oclusión temporal (track stitching).',
      'Cálculo real de velocidad en km/h mediante calibración de perspectiva y dashboard analítico en Streamlit.'
    ],
    description: 'Suite de visión artificial diseñada para monitoreo y analítica inteligente de flujos vehiculares y peatonales a partir de cámaras de vigilancia urbanas con analítica de congestión en tiempo real.',
    technicalDecisions: [
      {
        title: 'Track Stitching Post-Oclusión',
        explanation: 'Algoritmo que recalcula las matrices de covarianza de Kalman para reasociar identificadores cuando un vehículo pasa detrás de postes o árboles.'
      }
    ],
    metrics: [
      { label: 'FPS de Detección', value: '45+ FPS' },
      { label: 'Precisión de Tracking', value: '94.2% MOTA' }
    ]
  },
  {
    id: 'ai-job-search',
    title: 'AI Job Search',
    slug: 'ai-job-search',
    tagline: 'Automatización inteligente de búsqueda de empleo, scraping resiliente y tailoring de CVs.',
    category: 'desktop_tools',
    categoryLabel: 'Desktop & Automatización',
    featured: false,
    status: 'Activo / Producción',
    languages: ['Python', 'Markdown'],
    techStack: ['Python 3.11+', 'Playwright', 'BeautifulSoup4', 'LLM Prompt Engineering', 'Jinja2', 'GitHub Actions'],
    githubUrl: 'https://github.com/oscarbol09/ai-job-search',
    badgeColor: 'emerald',
    highlights: [
      'Scraping automatizado y normalización de ofertas en portales internacionales de empleo.',
      'Cálculo de compatibilidad con scoring de requisitos técnicos y generación de CVs optimizados para filtros ATS.'
    ],
    description: 'Framework automatizado de postulación y optimización de perfil profesional que evalúa vacantes en tiempo real y ajusta cover letters y resumes con máxima fidelidad técnica.',
    technicalDecisions: [
      {
        title: 'Templates Modulares Jinja2',
        explanation: 'Generación de documentos PDF y Markdown sin etiquetas inventadas, manteniendo estricta veracidad de experiencia.'
      }
    ],
    metrics: [
      { label: 'Score ATS Promedio', value: '96/100' },
      { label: 'Ofertas Procesadas', value: '100+ / día' }
    ]
  }
];
