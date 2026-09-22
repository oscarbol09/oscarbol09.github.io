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
  },
  {
    id: 'pdf2bard',
    title: 'pdf2bard',
    slug: 'pdf2bard',
    tagline: 'Layout-aware PDF to EPUB converter diseñado para lectores neuronales TTS y AudioBard.',
    category: 'desktop_tools',
    categoryLabel: 'Desktop & Automatización',
    featured: false,
    status: 'Completado',
    languages: ['Python'],
    techStack: ['Python', 'PyMuPDF', 'EbookLib', 'Regex NLP', 'Layout Analysis'],
    githubUrl: 'https://github.com/oscarbol09/pdf2bard',
    badgeColor: 'blue',
    highlights: [
      'Limpia pies de página, encabezados repetitivos y números de página que arruinan la lectura por voz.',
      'Reconstruye el flujo tipográfico de párrafos rotos por saltos de línea de PDF.'
    ],
    description: 'Herramienta de pre-procesamiento que transforma PDFs técnicos y literarios en archivos EPUB impecables listos para ingesta en sintetizadores TTS neuronales.',
    technicalDecisions: [
      {
        title: 'Análisis Espacial de Cajas de Texto',
        explanation: 'Filtra coordenadas verticales recurrentes para eliminar encabezados y pies de página sin intervención manual.'
      }
    ],
    metrics: [
      { label: 'Reducción de Basura TTS', value: '99%' }
    ]
  }
];
