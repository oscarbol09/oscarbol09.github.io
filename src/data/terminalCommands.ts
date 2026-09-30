export interface TerminalOutput {
  command: string;
  output: string | string[];
  isError?: boolean;
  type?: 'text' | 'table' | 'banner' | 'tree' | 'status';
}

export const INITIAL_TERMINAL_HISTORY: TerminalOutput[] = [
  {
    command: 'whoami',
    output: [
      'Oscar Darío Madera (@oscarbol09)',
      'Rol: AI Systems & Backend Craftsman | Concurrency & RAG Specialist',
      'Ubicación: Colombia (UTC-5) — Disponible para proyectos de alto impacto',
      'Escribe "help" para ver los comandos interactivos disponibles.'
    ],
    type: 'text'
  }
];

export const TERMINAL_COMMANDS: Record<string, string | string[] | ((args: string[]) => string | string[])> = {
  help: [
    'Comandos interactivos disponibles:',
    '  about              - Resumen del perfil profesional y filosofía',
    '  projects           - Lista rápida de repositorios y proyectos insignia',
    '  run branchbase     - Simula el inicio del proxy Branchbase en Go',
    '  run jvm-mcp        - Ejecuta el diagnóstico nativo de runtime con JVM-MCP',
    '  run a2a-hub        - Simula el registro y ruteo semántico de A2A-Hub',
    '  run macrosentinel  - Simula el escaneo macroeconómico de MacroSentinel',
    '  run edurag         - Inspecciona la topología de EduRag',
    '  skills             - Vista compacta de tecnologías dominadas',
    '  standards          - Filosofía de desarrollo (Cero AI Slop, ACID)',
    '  contact            - Muestra canales de comunicación directos',
    '  socials            - Enlaces a GitHub, LinkedIn y repositorios',
    '  matrix             - Animación temática del sistema',
    '  clear              - Limpia la pantalla de la terminal'
  ],
  about: [
    '═══════════════════════════════════════════════════════════════════',
    ' OSCAR DARÍO MADERA — FULL-STACK, SYSTEMS & AI CRAFTSMAN',
    '═══════════════════════════════════════════════════════════════════',
    'Desarrollador Full-Stack & Systems · Licenciado en Informática (Universidad de Córdoba).',
    'Especializado en arquitectura de servicios concurrentes en Go, Java Enterprise (Spring Boot 3.4 / Loom),',
    'frontend en Angular / React 19 / Vue 3, persistencia relacional (SQL Server, Postgres, pgvector) y Cloud (AWS/Azure).',
    '',
    '• Foco principal: Cero sobre-ingeniería cosmética, 100% arquitectura medible y SOLID.',
    '• Enfoque de código: 230+ tests automatizados herméticos, CI/CD y estricto Quality Gate.',
    '• Open Source: Contribuidor activo en OCA/l10n-spain (Odoo) y entornos Linux.'
  ],
  projects: [
    'PROYECTOS DESTACADOS:',
    '  [1] Branchbase (Go 1.22+ / Cobra / Bubbletea / Postgres / SQLite)',
    '      Proxy TCP y branching local de DB por rama de Git. (v0.3.0)',
    '  [2] JVM-MCP (Java 21 / GraalVM Native / Model Context Protocol / JDK Attach / HikariCP)',
    '      Servidor MCP nativo para diagnóstico runtime de JVM, deadlocks y leaks. (v1.0.0)',
    '  [3] A2A-Hub (Java 21 Loom / Spring Boot 3.4 / LangChain4j / pgvector HNSW / WebSockets)',
    '      Registro y enrutador descentralizado del protocolo Agent2Agent (A2A). (v1.0.0)',
    '  [4] MacroSentinel (Python 3.11+ / FRED / BLS / LiteLLM / Resend / Telegram)',
    '      Radar de inteligencia macroeconómica con FinCoT y debate dialéctico. (v0.2.0)',
    '  [5] EduRag (Next.js 16 / React 19 / Azure Cosmos DB / FastAPI / Gemini AI)',
    '      SaaS de RAG pedagógico multi-tenant con RBAC y streaming STEM. (v1.0.0-beta)',
    '  [6] AudioBard (Python / Tauri v2 / Vue 3 / FFmpeg / Piper ONNX / 230+ Tests)',
    '      Generador inteligente de audiolibros multi-voz por personaje.',
    '  [7] ThesisForge (Python / FastAPI / LangChain / CrossRef / APA 7)',
    '      Forjador de investigación académica con RAG híbrido y DOI verificado.',
    '  [8] Loop Computer Vision (Python / OpenCV / YOLO / ByteTrack / Streamlit)',
    '      Analítica de tráfico con compensación de cámara homográfica.',
    '',
    'Tip: Usa "run <proyecto>" para simular la ejecución de una herramienta.'
  ],
  'run branchbase': [
    '🌿 Iniciando daemon Branchbase v0.3.0...',
    '[✓] Leyendo configuración de .branchbase.yml',
    '[✓] Inspeccionando rama Git actual: refs/heads/feature/auth-pipeline',
    '[✓] Verificando base de datos template en PostgreSQL (localhost:5432)...',
    '[✓] Clonando template db_main ➔ db_feature_auth-pipeline en 184ms',
    '[✓] Proxy TCP escuchando en :5432 -> Enrutando tráfico a db_feature_auth-pipeline',
    '⚡ Estado: LISTO. Las conexiones de tu app están aisladas en esta rama.'
  ],
  'run jvm-mcp': [
    '☕ Iniciando JVM-MCP v1.0.0 (GraalVM Native Image standalone binary)...',
    '[✓] Tiempo de arranque nativo: 11.4ms (Consumo RAM: 22.1 MB)',
    '[✓] Escaneando procesos JVM locales con JDK Attach API...',
    '[✓] Target detectado: Spring Boot OrderService (PID: 84920, JDK 21.0.5)',
    '[✓] Analizando ThreadMXBean: 0 deadlocks detectados en 42 platform threads + 1,200 virtual threads',
    '[✓] Inspeccionando HikariPoolMXBean: 8/10 active connections (0 connection leaks)',
    '[✓] MemoryPoolMXBean: G1 Eden 34% | G1 Old Gen 18% | Metaspace 82MB',
    '⚡ Estado: HERRAMIENTAS MCP EXPUESTAS EXITOSAMENTE PARA CLAUDE DESKTOP & CURSOR.'
  ],
  'run a2a-hub': [
    '🤖 Conectando a A2A-Hub v1.0.0 (Spring Boot 3.4 + Project Loom Virtual Threads)...',
    '[✓] Cargando esquema Agent2Agent Protocol v1.0',
    '[✓] Conectando a PostgreSQL 16 con extensión pgvector (HNSW Indexing)',
    '[✓] Registrando AgentCard: "FinancialAuditor" (Capacidades: SEC 10-K Analysis, XBRL Parsing)',
    '[✓] Generando embedding denso con LangChain4j (Dimensiones: 1536)',
    '[✓] Búsqueda semántica de agente par: Consulta "analizar riesgo crediticio" ➔ 98.4% match con Agent "CreditRiskEvaluator"',
    '[✓] Canal WebSocket seguro de telemetría establecido con protección anti-SSRF',
    '⚡ Estado: AGENTE REGISTRADO Y ENRUTAMIENTO MULTI-AGENTE ACTIVO.'
  ],
  'run macrosentinel': [
    '📈 Inicializando MacroSentinel v0.2.0 Scatter-Gather Ingestion...',
    '[✓] Ingestando series FRED: T10Y2Y (Curva 10Y-2Y), FEDFUNDS, CPI, PCE, UNRATE, SAHM',
    '[✓] Consultando U.S. Treasury Fiscal Data y BLS API v2 (Core CPI & Nonfarm)',
    '[✓] Analizando actas FOMC: Detección de sesgo Hawkish vs Dovish',
    '[✓] Ejecutando FinCoT: Debate Dialéctico (Agente Halcón vs Agente Paloma)',
    '[✓] Clasificación Investment Clock: Régimen de Desinflación / Aterrizaje Suave',
    '[✓] Generando gráfico de curva con Matplotlib Agg ➔ Despachando a Telegram & Email Digest',
    '⚡ Estado: REPORTE MACROPULSE GENERADO CON ÉXITO.'
  ],
  'run edurag': [
    '🎓 Inicializando pipeline EduRag Context Builder...',
    '[✓] Ingesta de documento curricular en Azure Blob Storage',
    '[✓] Validando token JWT y control de acceso RBAC por institución',
    '[✓] Chunking léxico y embedding con Azure Cosmos DB / PostgreSQL',
    '[✓] Conexión SSE abierta hacia Gemini AI',
    '[✓] Generando respuesta con fórmulas STEM inline y display KaTeX...'
  ],
  skills: [
    'CORE SKILLS & TECH STACK:',
    '  • Lenguajes:    Java 21 (Spring Boot 3.4 / Loom), Go (Golang 1.22+), Python 3.10+, Ruby, TypeScript, C/Rust, SQL',
    '  • Frameworks:   Spring Boot, Spring Webflux, LangChain4j, Angular, React 19, Next.js 16, Ruby on Rails, FastAPI, Tauri, Vue 3',
    '  • Cloud & DBs:  AWS (S3/SQS/EC2), Azure (App Services/Blobs), SQL Server (T-SQL), PostgreSQL (pgvector HNSW), SQLite, Cosmos DB',
    '  • Protocols:    Model Context Protocol (MCP), Agent2Agent (A2A), REST, SOAP, WebSockets, SSE Streaming',
    '  • Testing & QA: JUnit 5, Jest, Pytest (230+ tests automatizados), CI/CD GitHub Actions, Jenkins, SOLID',
    '  • Open Source:  OCA/l10n-spain (TicketBAI, AEAT SII, Facturae), omacom/omarchy, Linux Wayland'
  ],
  standards: [
    'PRINCIPIOS DE INGENIERÍA:',
    '  1. Autoría Intelectual: Todo bloque de código tiene justificación técnica real.',
    '  2. Integridad ACID: Cero tolerancia a desincronización de esquemas o migraciones sucias.',
    '  3. Memoria Simbiótica: Documentación continua y aprendizaje persistente en Obsidian.',
    '  4. Rendimiento a 60 FPS: Aceleración GPU pura sobre transform/opacity sin layout jank.'
  ],
  contact: [
    'CANALES DE CONTACTO:',
    '  • GitHub:    https://github.com/oscarbol09',
    '  • Email:     omaderabolano@correo.unicordoba.edu.co',
    '  • Portafolio: https://oscarbol09.github.io/',
    '',
    '¡Siempre abierto a discutir arquitecturas de sistemas, RAG de alto rendimiento o proyectos desafiantes!'
  ],
  socials: [
    'ENLACES:',
    '  • GitHub Perfil:   https://github.com/oscarbol09',
    '  • Repositorio JVM-MCP:    https://github.com/oscarbol09/jvm-mcp',
    '  • Repositorio A2A-Hub:    https://github.com/oscarbol09/a2a-hub',
    '  • Repositorio Branchbase: https://github.com/oscarbol09/branchbase',
    '  • Repositorio MacroSentinel: https://github.com/oscarbol09/MacroSentinel',
    '  • Repositorio EduRag:     https://github.com/oscarbol09/EduRag',
    '  • Repositorio ThesisForge: https://github.com/oscarbol09/thesisforge'
  ],
  matrix: [
    'Wake up, Neo...',
    'The Matrix has you.',
    'Follow the white rabbit. 🐇',
    'Knock, knock, Neo.'
  ]
};
