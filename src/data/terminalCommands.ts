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
    '  run edurag         - Inspecciona la topología de EduRag',
    '  run macrosentinel  - Simula el escaneo macroeconómico de MacroSentinel',
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
    'Especializado en arquitectura de servicios concurrentes en Go, Java Enterprise (Spring),',
    'frontend en Angular / React 19, persistencia relacional (SQL Server, Postgres) y Cloud (AWS/Azure).',
    '',
    '• Foco principal: Cero sobre-ingeniería cosmética, 100% arquitectura medible y SOLID.',
    '• Enfoque de código: 230+ tests automatizados herméticos, CI/CD y estricto Quality Gate.',
    '• Open Source: Contribuidor activo en OCA/l10n-spain (Odoo) y entornos Linux.'
  ],
  projects: [
    'PROYECTOS DESTACADOS:',
    '  [1] Branchbase (Go 1.22+ / Cobra / Bubbletea / Postgres / SQLite)',
    '      Proxy TCP y branching local de DB por rama de Git. (v0.3.0)',
    '  [2] MacroSentinel (Python 3.11+ / FRED / BLS / LiteLLM / Resend / Telegram)',
    '      Radar de inteligencia macroeconómica con FinCoT y debate dialéctico. (v0.2.0)',
    '  [3] EduRag (Next.js 16 / React 19 / Azure Cosmos DB / FastAPI / Gemini AI)',
    '      SaaS de RAG pedagógico multi-tenant con RBAC y streaming STEM. (v1.0.0-beta)',
    '  [4] AudioBard (Python / Tauri v2 / Vue 3 / FFmpeg / Piper ONNX / 230+ Tests)',
    '      Generador inteligente de audiolibros multi-voz por personaje.',
    '  [5] ThesisForge (Python / FastAPI / LangChain / CrossRef / APA 7)',
    '      Forjador de investigación académica con RAG híbrido y DOI verificado.',
    '  [6] Loop Computer Vision (Python / OpenCV / YOLO / ByteTrack / Streamlit)',
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
    '  • Lenguajes:    Java (Spring Boot/Webflux), Go (Golang 1.22+), Python 3.10+, Ruby, TypeScript, C/Rust, SQL',
    '  • Frameworks:   Spring Boot, Spring Webflux, Angular, React 19, Next.js 16, Ruby on Rails, FastAPI, Tauri, Vue 3',
    '  • Cloud & DBs:  AWS (S3/SQS/EC2), Azure (App Services/Blobs), SQL Server (T-SQL), PostgreSQL, SQLite, Cosmos DB',
    '  • Testing & QA: JUnit, Jest, Pytest, Enzyme (230+ tests automatizados), CI/CD GitHub Actions, Jenkins, SOLID',
    '  • IA & RAG:     RAG Híbrido (Dense+BM25), LangChain, Supabase pgvector, Piper ONNX, Gemini AI',
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
    '  • Repositorio:     https://github.com/oscarbol09/branchbase',
    '  • Repositorio:     https://github.com/oscarbol09/MacroSentinel',
    '  • Repositorio:     https://github.com/oscarbol09/EduRag',
    '  • Repositorio:     https://github.com/oscarbol09/thesisforge'
  ],
  matrix: [
    'Wake up, Neo...',
    'The Matrix has you.',
    'Follow the white rabbit. 🐇',
    'Knock, knock, Neo.'
  ]
};
