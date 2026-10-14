export interface OpenSourceContribution {
  id: string;
  repo: string;
  org: string;
  title: string;
  type: 'Bugfix / Core' | 'Feature / Fiscal' | 'Security / Parser' | 'SDK / Protocols' | 'Automation';
  badgeColor: 'emerald' | 'cyan' | 'blue' | 'violet' | 'amber';
  description: string;
  impact: string;
  technologies: string[];
  repoUrl: string;
  pullRequestUrl?: string;
  metrics: { label: string; value: string }[];
}

export const OPEN_SOURCE_CONTRIBUTIONS: OpenSourceContribution[] = [
  {
    id: 'oca-server-tools',
    repo: 'server-tools',
    org: 'OCA (Odoo Community Association)',
    title: 'Fix: Auditlog Rule Traceability for Archived Records',
    type: 'Bugfix / Core',
    badgeColor: 'emerald',
    description: 'Resolvió una regresión crítica en el módulo auditlog de Odoo donde los registros archivados (active=False) evadían las reglas de auditoría y no dejaban rastro criptográfico en los logs.',
    impact: 'Garantiza la trazabilidad legal estricta y cumplimiento SOX en empresas europeas que gestionan ERPs bajo Odoo Enterprise/Community.',
    technologies: ['Python', 'Odoo ORM', 'PostgreSQL', 'Unit Testing'],
    repoUrl: 'https://github.com/OCA/server-tools',
    pullRequestUrl: 'https://github.com/OCA/server-tools/issues/2719',
    metrics: [
      { label: 'Ecosistema', value: 'Odoo ERP' },
      { label: 'Módulo', value: 'auditlog' },
      { label: 'Estado', value: 'Merged / Solved' },
    ],
  },
  {
    id: 'oca-l10n-spain',
    repo: 'l10n-spain',
    org: 'OCA (Odoo Community Association)',
    title: 'Feat: Compensación REAGP y Cálculo en CuotaDeducible',
    type: 'Feature / Fiscal',
    badgeColor: 'cyan',
    description: 'Implementación del cálculo de compensación agraria REAGP dentro del modelo CuotaDeducible para la facturación electrónica española, alineado con las especificaciones técnicas de la AEAT y TicketBAI.',
    impact: 'Automatización del tratamiento de regímenes especiales del IVA para el sector agroalimentario español.',
    technologies: ['Python', 'Odoo Framework', 'XML Fiscal', 'TicketBAI / SII'],
    repoUrl: 'https://github.com/OCA/l10n-spain',
    metrics: [
      { label: 'Fiscalidad', value: 'AEAT / SII' },
      { label: 'Cumplimiento', value: 'TicketBAI' },
      { label: 'Estado', value: 'Merged' },
    ],
  },
  {
    id: 'a2a-java-sdk',
    repo: 'a2a-java',
    org: 'a2aproject',
    title: 'Core: SDK Java para el Protocolo Agent-to-Agent',
    type: 'SDK / Protocols',
    badgeColor: 'violet',
    description: 'Contribuciones a la implementación oficial del protocolo abierto Agent-to-Agent (A2A) en Java: validación estricta de esquemas JSON-RPC, streaming reactivo SSE y tests herméticos con JUnit 5.',
    impact: 'Permite a aplicaciones empresariales en Spring Boot y Quarkus orquestar y descubrir agentes de IA autónomos de forma segura y descentralizada.',
    technologies: ['Java 21', 'Jackson JSON', 'Project Reactor', 'JUnit 5'],
    repoUrl: 'https://github.com/a2aproject/a2a-java',
    metrics: [
      { label: 'Lenguaje', value: 'Java 21' },
      { label: 'Transporte', value: 'SSE / Stdio' },
      { label: 'Protocolo', value: 'A2A Standard' },
    ],
  },
  {
    id: 'omarchy-linux',
    repo: 'omarchy',
    org: 'omacom',
    title: 'Security: Tokenizador Seguro y Parser de Especificación XDG',
    type: 'Security / Parser',
    badgeColor: 'blue',
    description: 'Refactorización del motor de parsing del entorno de escritorio Wayland para Arch Linux: reemplazo de invocaciones inseguras de eval por un tokenizador léxico determinista y parser de entradas .desktop XDG.',
    impact: 'Eliminó vectores de inyección de comandos arbitrarios en el lanzador del sistema operativo y aceleró el arranque de la sesión.',
    technologies: ['Bash Strict', 'POSIX Shell', 'Wayland', 'Hyprland Linux'],
    repoUrl: 'https://github.com/omacom/omarchy',
    metrics: [
      { label: 'Plataforma', value: 'Linux Wayland' },
      { label: 'Seguridad', value: 'Zero eval' },
      { label: 'Estándar', value: 'FreeDesktop XDG' },
    ],
  },
  {
    id: 'ai-job-search',
    repo: 'ai-job-search',
    org: 'MadsLorentzen',
    title: 'Automation: Pipeline de Ingesta y Validación ATS con Claude Code',
    type: 'Automation',
    badgeColor: 'amber',
    description: '5 Pull Requests aprobados que optimizan la ingesta de ofertas laborales, comandos de terminal de filtrado por stacks tecnológicos y algoritmos de validación de compatibilidad ATS sin alucinación.',
    impact: 'Optimización del flujo de postulación y scraping automatizado de empleos para ingenieros de software.',
    technologies: ['Python 3.11', 'Claude Code CLI', 'Pytest', 'Prompt Engineering'],
    repoUrl: 'https://github.com/MadsLorentzen/ai-job-search',
    metrics: [
      { label: 'PRs Aprobados', value: '5 PRs' },
      { label: 'Motor', value: 'Claude Code' },
      { label: 'Test Suite', value: 'Pytest' },
    ],
  },
];
