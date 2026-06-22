import { useState } from "react";

// ─── Palette tokens (match your portfolio's dark+cyan aesthetic) ──────────────
// These CSS variables should live in your global stylesheet or layout root.
// If you're using Tailwind, you can also define them in tailwind.config.ts as
// custom colors and reference them with arbitrary values like bg-[var(--cyan)].
//
// :root {
//   --cyan:          #00e5ff;
//   --cyan-dim:      rgba(0, 229, 255, 0.12);
//   --cyan-border:   rgba(0, 229, 255, 0.25);
//   --bg-card:       rgba(255, 255, 255, 0.04);
//   --bg-card-open:  rgba(255, 255, 255, 0.03);
//   --border-subtle: rgba(255, 255, 255, 0.08);
//   --text-primary:  #f0f4f8;
//   --text-muted:    #7a8a9a;
//   --text-dim:      #4a5a6a;
// }
// ─────────────────────────────────────────────────────────────────────────────

type EntryType = "work" | "project" | "freelance";

interface Stat {
    label: string;
    value: string | number;
}

interface Link {
    label: string;
    href: string;
}

interface Entry {
    type: EntryType;
    period: string;
    title: string;
    company: string;
    description?: string;
    highlights?: string[];
    stack?: string[];
    stats?: Stat[];
    links?: Link[];
}

// Per-type visual config
const typeConfig: Record<
    EntryType,
    {
        label: string;
        labelClass: string;
        tagClass: string;
        statValueClass: string;
    }
> = {
    work: {
        label: "Trabajo",
        // Cyan — matches your portfolio accent
        labelClass:
            "bg-[rgba(0,229,255,0.12)] text-[#00e5ff] border border-[rgba(0,229,255,0.3)]",
        tagClass:
            "bg-[rgba(0,229,255,0.08)] text-[#67e8f9] border border-[rgba(0,229,255,0.2)]",
        statValueClass: "text-[#00e5ff]",
    },
    project: {
        label: "Proyecto",
        // Violet — complementary accent
        labelClass:
            "bg-[rgba(139,92,246,0.15)] text-[#a78bfa] border border-[rgba(139,92,246,0.3)]",
        tagClass:
            "bg-[rgba(139,92,246,0.10)] text-[#c4b5fd] border border-[rgba(139,92,246,0.2)]",
        statValueClass: "text-[#a78bfa]",
    },
    freelance: {
        label: "Freelance",
        // Amber — warm contrast against the dark bg
        labelClass:
            "bg-[rgba(251,191,36,0.12)] text-[#fbbf24] border border-[rgba(251,191,36,0.25)]",
        tagClass:
            "bg-[rgba(251,191,36,0.08)] text-[#fde68a] border border-[rgba(251,191,36,0.18)]",
        statValueClass: "text-[#fbbf24]",
    },
};

export default function EntryCard({ entry }: { entry: Entry }) {
    const [open, setOpen] = useState(false);
    const cfg = typeConfig[entry.type];

    return (
        <div
            className={`
                mb-3 rounded-md overflow-hidden
                bg-[var(--bg-card)]
                border transition-colors duration-200
                ${open
                    ? "border-[var(--cyan-border)]"
                    : "border-[var(--border-subtle)] hover:border-[var(--cyan-border)]"
                }
            `}
        >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div
                className="flex items-center justify-between px-5 py-[18px] cursor-pointer select-none"
                onClick={() => setOpen(!open)}
            >
                <div>
                    {/* Label + period */}
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className={`
                                text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm
                                ${cfg.labelClass}
                            `}
                        >
                            {cfg.label}
                        </span>
                        <span className="text-[11px] tracking-wide text-[var(--text-dim)] tabular-nums">
                            {entry.period}
                        </span>
                    </div>

                    <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-0.5">
                        {entry.title}
                    </h3>
                    <p className="text-[12px] text-[var(--text-muted)]">
                        {entry.company}
                    </p>
                </div>

                {/* Toggle button */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open);
                    }}
                    className="
                        w-7 h-7 flex-shrink-0 rounded
                        bg-[var(--cyan-dim)] border border-[var(--cyan-border)]
                        text-[var(--cyan)] text-lg font-light
                        flex items-center justify-center
                        hover:bg-[rgba(0,229,255,0.2)] transition-colors duration-150
                    "
                    aria-label={open ? "Colapsar" : "Expandir"}
                >
                    {open ? "−" : "+"}
                </button>
            </div>

            {/* ── Body ───────────────────────────────────────────────────── */}
            {open && (
                <div className="border-t border-[var(--border-subtle)] px-5 py-[18px] bg-[var(--bg-card-open)]">

                    {/* Description */}
                    {entry.description && (
                        <p className="text-[13px] leading-relaxed text-[var(--text-muted)] mb-5">
                            {entry.description}
                        </p>
                    )}

                    {/* Highlights */}
                    {entry.highlights && entry.highlights.length > 0 && (
                        <Section title="Puntos destacados">
                            <ul className="flex flex-col gap-1.5">
                                {entry.highlights.map((item, i) => (
                                    <li
                                        key={i}
                                        className="text-[13px] text-[var(--text-muted)] pl-4 relative"
                                    >
                                        <span className="absolute left-0 top-[3px] text-[10px] text-[var(--cyan)]">
                                            ▸
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {/* Stack */}
                    {entry.stack && entry.stack.length > 0 && (
                        <Section title="Tecnologías">
                            <div className="flex flex-wrap gap-1.5">
                                {entry.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className={`
                                            text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-sm
                                            ${cfg.tagClass}
                                        `}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Stats */}
                    {entry.stats && entry.stats.length > 0 && (
                        <Section title="Estadísticas">
                            <div className="flex flex-wrap gap-2">
                                {entry.stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="
                                            border border-[var(--border-subtle)] rounded
                                            bg-black/20 px-3.5 py-2.5 min-w-[90px]
                                        "
                                    >
                                        <p className={`text-lg font-bold mb-0.5 ${cfg.statValueClass}`}>
                                            {stat.value}
                                        </p>
                                        <p className="text-[11px] text-[var(--text-muted)]">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Links */}
                    {entry.links && entry.links.length > 0 && (
                        <Section title="Enlaces" last>
                            <div className="flex flex-wrap gap-2">
                                {entry.links.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            text-[12px] inline-flex items-center gap-1.5
                                            px-3 py-1.5 rounded-sm
                                            bg-[var(--cyan-dim)] border border-[var(--cyan-border)]
                                            text-[var(--cyan)]
                                            hover:bg-[rgba(0,229,255,0.2)] transition-colors duration-150
                                        "
                                    >
                                        ↗ {link.label}
                                    </a>
                                ))}
                            </div>
                        </Section>
                    )}
                </div>
            )}
        </div>
    );
}

// ── Small helper: section with divider title ──────────────────────────────────
function Section({
    title,
    last = false,
    children,
}: {
    title: string;
    last?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className={last ? "" : "mb-[18px]"}>
            <div className="flex items-center gap-3 mb-2.5">
                <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--text-dim)] whitespace-nowrap">
                    {title}
                </span>
                <span className="flex-1 h-px bg-[var(--border-subtle)]" />
            </div>
            {children}
        </div>
    );
}