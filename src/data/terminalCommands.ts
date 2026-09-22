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
    '  skills             - Vista compacta de tecnologías dominadas',
    '  standards          - Filosofía de desarrollo (Cero AI Slop, ACID)',
    '  contact            - Muestra canales de comunicación directos',
    '  socials            - Enlaces a GitHub, LinkedIn y repositorios',
    '  matrix             - Animación temática del sistema',
    '  clear              - Limpia la pantalla de la terminal'
  ],
  about: [
    '═══════════════════════════════════════════════════════════════════',
    ' OSCAR DARÍO MADERA — AI SYSTEMS & BACKEND CRAFTSMAN',
    '═══════════════════════════════════════════════════════════════════',
    'Desarrollador enfocado en sistemas concurrentes de alto rendimiento en Go,',
    'arquitecturas RAG híbridas (Dense + BM25), pipelines de visión por computador',
    'y herramientas de desarrollo de bajo nivel (CLI, TUI, Proxies TCP).',
    '',
    '• Foco principal: Cero sobre-ingeniería cosmética, 100% arquitectura medible.',
    '• Enfoque de código: Pruebas con casos límite reales, tipado estricto y cero data drift.',
    '• Estado: Activo y listo para desarrollo de sistemas distribuidos y productos de IA.'
  ],
  projects: [
    'PROYECTOS DESTACADOS:',
    '  [1] Branchbase (Go 1.22+ / Cobra / Bubbletea / Postgres / SQLite)',
    '      Proxy TCP y branching local de DB por rama de Git. (v0.3.0)',
    '  [2] EduRag (Next.js 16 / React 19 / Supabase / FastAPI / OpenRouter)',
    '      SaaS de RAG pedagógico multi-tenant con streaming STEM. (v1.0.0-beta)',
    '  [3] ThesisForge (Python / FastAPI / LangChain / CrossRef / APA 7)',
    '      Forjador de investigación académica con RAG híbrido. (v0.5.0)',
    '  [4] AudioBard (Python / FFmpeg / Piper ONNX / Edge-TTS / Tauri)',
    '      Generador inteligente de audiolibros multi-voz por personaje.',
    '  [5] Loop Computer Vision (Python / OpenCV / YOLO / ByteTrack / Streamlit)',
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
  'run edurag': [
    '🎓 Inicializando pipeline EduRag Context Builder...',
    '[✓] Ingesta de documento: "Metodos_Numericos_Avanzados.pdf" (42 páginas)',
    '[✓] Chunking léxico: 148 bloques de 1500 chars (overlap 200 chars)',
    '[✓] Validando políticas RLS de Supabase: owner_id = validated_tenant',
    '[✓] Conexión SSE abierta hacia OpenRouter BYOK (google/gemini-2.5-flash)',
    '[✓] Generando respuesta con fórmulas STEM inline y display KaTeX...'
  ],
  skills: [
    'CORE SKILLS & TECH STACK:',
    '  • Lenguajes:    Go (Golang 1.22+), Python 3.10+, Ruby, TypeScript, SQL, Rust/C',
    '  • Frameworks:   Ruby on Rails, FastAPI, Next.js 16, React 19, Tauri, Vue 3',
    '  • IA & RAG:     RAG Híbrido (Dense+BM25), LangChain, Supabase pgvector, Piper ONNX',
    '  • Bases Datos:  PostgreSQL (Template DBs), SQLite WAL/CoW, MySQL, ChromaDB',
    '  • Frontend/UI:  Tailwind CSS v4, Motion.dev, CustomTkinter, Micro-interacciones',
    '  • Infra/Tools:  Docker, Git Internals, FFmpeg Demuxer, OpenCV, YOLO, Cobra, Bubbletea'
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
