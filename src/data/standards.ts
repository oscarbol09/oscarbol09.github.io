export interface StandardPillar {
  title: string;
  tagline: string;
  description: string;
  badge: string;
  accent: 'cyan' | 'blue' | 'violet' | 'emerald';
}

export const ENGINEERING_PILLARS: StandardPillar[] = [
  {
    title: 'Autoría Intelectual & Cero Código Basura',
    tagline: 'Todo código tiene una razón de ser y un porqué documentado.',
    description: 'Rechazo absoluto a generar bloques de código cosméticos o mocks superficiales. Manejo estricto de límites de fallo en I/O, red y concurrencia. Comentarios enfocados únicamente en el POR QUÉ de las reglas de negocio.',
    badge: 'Code Integrity',
    accent: 'cyan'
  },
  {
    title: 'Integridad ACID & Cero Data Drift',
    tagline: 'Aislamiento de bases de datos por rama de Git y replicación segura.',
    description: 'Arquitectura de branching local para bases de datos (Branchbase). Cada feature branch en Git opera sobre su propia base de datos efímera clonada sin tocar producción ni contaminar el estado local.',
    badge: 'Data Architecture',
    accent: 'emerald'
  },
  {
    title: 'Memoria Simbiótica Persistente',
    tagline: 'Documentación continua y retroalimentación bidireccional en Obsidian.',
    description: 'Cada bug complejo, optimización de algoritmos o decisión de arquitectura se registra automáticamente en un segundo cerebro digital estructurado para consulta instantánea y evolución continua.',
    badge: 'Knowledge Engine',
    accent: 'violet'
  },
  {
    title: 'Rendimiento a 60 FPS & Aceleración GPU',
    tagline: 'Física táctil con resortes reales y micro-interacciones sin jank.',
    description: 'Animaciones estrictamente calculadas sobre transform y opacity para cero recalculo de layout (CLS = 0). Tipografía con tabular figures y contrastes calibrados para legibilidad quirúrgica.',
    badge: 'Hardware Polish',
    accent: 'blue'
  }
];
