export interface TimelineMilestone {
  period: string;
  role: string;
  organization: string;
  location: string;
  badge: string;
  accent: 'cyan' | 'violet' | 'emerald' | 'blue';
  description: string;
  achievements: string[];
  technologies: string[];
}

export const CAREER_TIMELINE: TimelineMilestone[] = [
  {
    period: '2024 — Presente',
    role: 'AI Systems Architect & Full-Stack Engineer',
    organization: 'Desarrollo Independiente & Proyectos de Infraestructura',
    location: 'Remoto (Colombia / Global)',
    badge: 'Fase Actual',
    accent: 'cyan',
    description: 'Diseño e implementación de herramientas de infraestructura para desarrolladores y plataformas SaaS con IA aplicada.',
    achievements: [
      'Creación de Branchbase: Daemon y proxy TCP en Go 1.22+ para database branching local con cero schema drift.',
      'Arquitectura de EduRag: SaaS educativo multi-tenant en Next.js 16 y Supabase con streaming SSE y fórmulas STEM.',
      'Desarrollo de ThesisForge: Sistema de RAG híbrido (vectorial denso + BM25) para investigación académica bajo normas APA 7ª.'
    ],
    technologies: ['Go (Golang)', 'Python', 'React 19', 'Next.js 16', 'PostgreSQL', 'FastAPI', 'Supabase', 'Tailwind CSS']
  },
  {
    period: '2023 — 2024',
    role: 'Investigador en Visión por Computador & Audio Neural',
    organization: 'Laboratorio de Software & Proyectos Multimedia',
    location: 'Colombia',
    badge: 'Investigación & Sistemas',
    accent: 'violet',
    description: 'Desarrollo de pipelines de procesamiento de señales de video, analítica de tráfico y síntesis de voz multi-personaje.',
    achievements: [
      'Construcción de Loop Computer Vision: Pipeline de tracking y analítica vehicular con homografía y reconexión de trayectorias post-oclusión (ByteTrack).',
      'Desarrollo de AudioBard: Generador de audiolibros con reparto automático de voces mediante LLMs y concatenación streaming con FFmpeg O(1) RAM.',
      'Creación de Darius-AI: Asistente nativo para Windows con memoria persistente en Obsidian.'
    ],
    technologies: ['Python 3.11', 'OpenCV', 'YOLOv8/v11', 'ByteTrack', 'FFmpeg', 'Piper ONNX', 'CustomTkinter', 'Tauri']
  },
  {
    period: '2021 — 2024',
    role: 'Ingeniería de Sistemas & Ciencias de la Computación',
    organization: 'Universidad de Córdoba',
    location: 'Montería, Colombia',
    badge: 'Formación Académica',
    accent: 'emerald',
    description: 'Bases rigurosas en teoría de la computación, concurrencia, bases de datos relacionales, sistemas operativos y redes.',
    achievements: [
      'Enfoque en diseño de algoritmos de alta eficiencia, estructuras de datos avanzadas y optimización de consultas SQL.',
      'Liderazgo en proyectos de software académico, arquitecturas desacopladas y aplicaciones web full-stack.'
    ],
    technologies: ['Algoritmia Avanzada', 'Sistemas Distribuidos', 'Bases de Datos Relacionales', 'Redes & Protocolos TCP/IP', 'Linux']
  }
];
