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
    role: 'AI Systems Architect & Open Source Contributor',
    organization: 'Infraestructura, SaaS en la Nube & Ecosistema Open Source',
    location: 'Remoto (Colombia / Global)',
    badge: 'Fase Actual',
    accent: 'cyan',
    description: 'Diseño e implementación de herramientas de infraestructura para desarrolladores, soluciones SaaS multi-tenant y colaboración activa en proyectos de código abierto.',
    achievements: [
      'Desarrollo de Branchbase: Daemon y proxy TCP en Go 1.22+ para database branching local con aprovisionamiento JIT, SQLite CoW y PostgreSQL.',
      'Arquitectura de EduRag-Platform: SaaS educativo multi-tenant en Next.js/FastAPI con Azure Cosmos DB, Blob Storage, Gemini AI y JWT/RBAC.',
      'Contribución activa en OCA/l10n-spain (Odoo Community Association): Resolución de incidencias en módulos de facturación e integración fiscal (TicketBAI, AEAT SII, Facturae).',
      'Desarrollo de AudioBard & ThesisForge: Más de 230 pruebas automatizadas (Pytest, Jest, JUnit) con pipelines CI/CD en GitHub Actions y Quality Gates.'
    ],
    technologies: ['Go (Golang)', 'Python', 'Next.js 16', 'React 19', 'Azure (App Service / Cosmos DB)', 'PostgreSQL', 'FastAPI', 'Docker', 'CI/CD']
  },
  {
    period: 'Ene 2023 — Presente',
    role: 'Desarrollador de Software Full-Stack (Freelance / Independiente)',
    organization: 'Servicios Web Empresariales, Java Enterprise & Cloud (AWS / Azure)',
    location: 'Montería, Colombia (Remoto)',
    badge: 'Producción & Clientes',
    accent: 'blue',
    description: 'Análisis de requerimientos de negocio e implementación de módulos full-stack escalables basados en microservicios, persistencia relacional y cloud computing.',
    achievements: [
      'Desarrollo full-stack con Java (Spring Boot / Spring MVC / Spring Webflux, Project Reactor, JPA / Hibernate) y Angular (TypeScript, HTML5, CSS3, Bootstrap).',
      'Construcción y consumo de servicios web robustos (REST, SOAP, WebSockets) con persistencia relacional en Transact-SQL (SQL Server) y PostgreSQL.',
      'Aprovisionamiento de servicios en la nube en AWS (S3, SQS, SNS, EC2) y Azure aplicando principios SOLID, patrones de diseño y marcos ágiles (Scrum / Kanban).',
      'Ejecución de pruebas unitarias y de calidad (JUnit, Jest), resolución de incidencias técnicas y cumplimiento riguroso de Quality Gates.'
    ],
    technologies: ['Java (Spring Boot / Webflux)', 'Angular (TypeScript)', 'Transact-SQL (SQL Server)', 'JPA / Hibernate', 'AWS (S3, SQS, EC2)', 'Azure', 'REST / SOAP / WebSockets', 'JUnit / Jest', 'SOLID']
  },
  {
    period: '2023 — 2024',
    role: 'Investigador en Visión por Computador & Audio Neural',
    organization: 'Laboratorio de Software & Proyectos Multimedia',
    location: 'Montería, Colombia',
    badge: 'Investigación & Sistemas',
    accent: 'violet',
    description: 'Desarrollo de pipelines de procesamiento de señales de video, analítica de tráfico vehicular y síntesis de voz multi-personaje.',
    achievements: [
      'Construcción de Loop Computer Vision: Pipeline de tracking y analítica vehicular con homografía y reconexión de trayectorias post-oclusión (ByteTrack).',
      'Desarrollo de AudioBard: Generador de audiolibros con reparto automático de voces mediante LLMs y concatenación streaming con FFmpeg O(1) RAM.',
      'Creación de Darius-AI: Asistente nativo para Windows con control por voz y memoria persistente en Obsidian.'
    ],
    technologies: ['Python 3.11', 'OpenCV', 'YOLOv8/v11', 'ByteTrack', 'FFmpeg', 'Piper ONNX', 'CustomTkinter', 'Tauri v2 / Vue 3']
  },
  {
    period: '2020 — 2026',
    role: 'Licenciatura en Informática y Medios Audiovisuales (Graduado)',
    organization: 'Universidad de Córdoba',
    location: 'Montería, Colombia',
    badge: 'Educación Superior',
    accent: 'emerald',
    description: 'Formación universitaria integral en ciencias de la computación, ingeniería de software, arquitectura de sistemas, algoritmia y bases de datos.',
    achievements: [
      'Dominio riguroso en estructuras de datos avanzadas, diseño de algoritmos de alta eficiencia y optimización de consultas SQL.',
      'Liderazgo en proyectos de software académico, desarrollo web full-stack, redes y concurrencia.'
    ],
    technologies: ['Ciencias de la Computación', 'Arquitectura de Software', 'Bases de Datos Relacionales', 'Algoritmia Avanzada', 'Redes & Protocolos TCP/IP']
  },
  {
    period: '2016 — 2018',
    role: 'Técnico en Sistemas (Graduado)',
    organization: 'Servicio Nacional de Aprendizaje (SENA)',
    location: 'Montería, Colombia',
    badge: 'Formación Técnica',
    accent: 'emerald',
    description: 'Fundamentos técnicos en mantenimiento de infraestructura computacional, administración de redes LAN/WAN y soporte de software de sistemas.',
    achievements: [
      'Configuración e implementación de topologías de redes y soporte operativo multiplataforma.',
      'Bases sólidas de lógica computacional, programación estructurada y gestión de bases de datos.'
    ],
    technologies: ['Mantenimiento de Sistemas', 'Redes LAN / WAN', 'Sistemas Operativos', 'Lógica de Programación', 'Bases de Datos']
  }
];
