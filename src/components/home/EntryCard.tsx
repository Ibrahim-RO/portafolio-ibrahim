import { useState } from "react";

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
    id: number;
    type: string;
    period: string;
    title: string;
    company: string;
    description?: string;
    highlights?: string[];
    stack?: string[];    
}

// Per-type visual config
const typeConfig: Record<
    string,
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
                bg-(--bg-card)
                border transition-colors duration-200
                ${open
                    ? "border-(--cyan-border)"
                    : "border-(--border-subtle) hover:border-(--cyan-border)"
                }
            `}
        >
            <div
                className="flex items-center justify-between px-5 py-4.5 cursor-pointer select-none"
                onClick={() => setOpen(!open)}
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className={`
                                text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-sm
                                ${cfg.labelClass}
                            `}
                        >
                            {cfg.label}
                        </span>
                        <span className="text-[11px] tracking-wide tabular-nums">
                            {entry.period}
                        </span>
                    </div>

                    <h3 className="font-semibold text-(--text-primary) mb-0.5">
                        {entry.title}
                    </h3>
                    <p className="text-sm">
                        {entry.company}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open);
                    }}
                    className="
                        w-7 h-7 shrink-0 rounded
                        bg-(--cyan-dim) border border-(--cyan-border)
                        text-(--cyan) text-lg font-light
                        flex items-center justify-center
                        hover:bg-[rgba(0,229,255,0.2)] transition-colors duration-150
                    "
                    aria-label={open ? "Colapsar" : "Expandir"}
                >
                    {open ? "−" : "+"}
                </button>
            </div>

            {open && (
                <div className="border-t border-(--border-subtle) px-5 py-4.5 bg-(--bg-card-open)">
                    {entry.description && (
                        <p className="text-sm leading-relaxed mb-5">
                            {entry.description}
                        </p>
                    )}

                    {entry.highlights && entry.highlights.length > 0 && (
                        <Section title="Puntos destacados">
                            <ul className="flex flex-col gap-1.5">
                                {entry.highlights.map((item, i) => (
                                    <li
                                        key={i}
                                        className="text-sm pl-4 relative"
                                    >
                                        <span className="absolute left-0 top-0.75 text-[10px] text-(--cyan)">
                                            ▸
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {entry.stack && entry.stack.length > 0 && (
                        <Section title="Tecnologías">
                            <div className="flex flex-wrap gap-1.5">
                                {entry.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className={`
                                            text-xs font-medium tracking-wide px-2.5 py-1 rounded-sm
                                            ${cfg.tagClass}
                                        `}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}                    
 
                </div>
            )}
        </div>
    );
}

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
        <div className={last ? "" : "mb-4.5"}>
            <div className="flex items-center gap-3 mb-2.5">
                <span className="font-bold tracking-[0.12em] uppercase whitespace-nowrap">
                    {title}
                </span>
                <span className="flex-1 h-px bg-(--border-subtle)" />
            </div>
            {children}
        </div>
    );
}