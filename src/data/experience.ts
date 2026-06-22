export const experiences = [
    {
        id: 1,
        type: "work",
        period: "2025 — presente",
        title: "Desarrollador web Fullstack",
        company: "Onexo, Puebla, México",
        description:
            "Desarrollo y mantenimiento de la plataforma SaaS principal con más de 80 000 usuarios activos. Lideré la migración de la arquitectura legacy hacia micro-frontends.",
        highlights: [
            "Desarrollo del proyecto de Menú Digital para TOKS, integrando una subaplicación de punto de venta de alimentos complementaria a la app AcomerClub.",
            "Rediseño e implementación de nueva lógica de negocio en la aplicación Portal del Chef.",
            "Soporte y mantenimiento de sitios web corporativos de Shake Shack y El Farolito pertenecientes a GRG.",
            "Desarrollo e implementación del sitio web corporativo de Onexo.",
        ],
        stack: ["React", "TypeScript", "Tailwind", "NextJS", "Django/DRF", 'MySQL'],
    },
    {
        id: 2,
        type: "work",
        period: "2026-presente",
        title: "Desarrollador web Fullstack",
        company: "DevStack Studio",
        description:
            "Co-fundador de DevStack Studio en la creación de desarrollo de software de alto rendimiento. Transformamos ideas complejas en experiencias digitales escalables, rápidas y visualmente impactantes.",
        highlights: [
            "Integración con 3 APIs externas usando webhooks y OAuth 2.0",
            "Sistema de widgets drag-and-drop construido desde cero",
            "Despliegue automático con GitHub Actions + Vercel",
        ],
        stack: ["Next.js", "ExpressJS", "PostgreSQL", "NestJS", "Astro"],
        stats: [],
        links: [
            { label: "GitHub", href: "#" },
            { label: "Demo en vivo", href: "#" },
        ],
    },
    {
        id: 3,
        type: "freelance",
        period: "2025",
        title: "Plataforma web para comunidad de RadioBears",
        company: "Cliente: RadioBears",
        description:
            "Desarrollo de un sitio web dinámico para una comunidad de radio relacionada con el juego Habbo. El sitio incluye un chat en tiempo real (Socket.IO), secciones informativas sobre asociados, transmisiones en vivo, eventos y enlaces a redes sociales. El cliente aumentó sus vistas y visibilidad un 220 % en los primeros 3 meses.",
        highlights: [
            "Storefront 100 % personalizado usando Shopify Storefront API",
            "Optimización de imágenes y caché con ISR para < 1.5 s FCP",
            "Integración con pasarelas de pago mexicanas: OXXO y Clip",
        ],
        stack: ["React", "Express", "Tailwind", "PostgreSQL"],
        stats: [
            { value: "+220 %", label: "Visibilidad" },
        ],
        links: [],
    },
    {
        id: 4,
        type: "work",
        period: "2023-2024",
        title: "Desarrollador backend",
        company: "QuadCore consultores",
        description:
            "Creación de un panel administrativo para gestionar usuarios, backups y actualizaciones de registros en una base de datos y creación de dashboards en Power BI.",
        highlights: [
            "Creación de un panel administrativo para gestionar usuarios.",
            "Backups y actualizaciones de registros en una base de datos.",
            "Creación de dashboards en Power BI acerca de información de ventas del mes para la compañía Volkswagen.",
        ],
        stack: ["PHP", "PowerBI", "MySQL"],        
    },
];