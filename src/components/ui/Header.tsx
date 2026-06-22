import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);

    const links = [
        { name: "Inicio", href: "#inicio" },
        { name: "Sobre mí", href: "#about" },
        { name: "Experiencia", href: "#experience" },
        { name: "Proyectos", href: "#projects" },
        { name: "Tecnologías", href: "#tech" },
        { name: "Contacto", href: "#contact" },
    ];

    return (
        <header className="fixed top-0 z-50 w-full border-b border-cyan-500/10 backdrop-blur-xl bg-[#050B0F]/80">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                <a
                    href="#"
                    className="group flex items-center gap-2"
                >
                    <span className="font-black text-3xl text-cyan-400">{"<"}</span>

                    <span className="font-black text-xl uppercase tracking-wider text-white">Ibrahim</span>

                    <span className="font-black text-3xl text-cyan-400">{"/>"}</span>

                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                </a>

                <nav className="hidden lg:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="group relative text-sm uppercase tracking-[0.25em] text-slate-300 transition"
                        >
                            {link.name}

                            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-4">                    
                    <a
                        href="#"
                        className="rounded-full border border-cyan-500/20 p-3 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition"
                    >
                        {/* <Github size={18} /> */}
                    </a>

                    <a
                        href="#"
                        className="rounded-full border border-cyan-500/20 p-3 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition"
                    >
                        {/* <Linkedin size={18} /> */}
                    </a>

                    <a
                        href="#contact"
                        className="bg-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-black transition hover:scale-105"
                    >
                        Contratar
                    </a>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden text-cyan-400"
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 lg:hidden ${
                    open ? "max-h-125" : "max-h-0"
                }`}
            >
                <div className="border-t border-cyan-500/10 bg-[#081118] p-6">
                    <nav className="flex flex-col gap-6">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="uppercase tracking-[0.25em] text-slate-300"
                            >
                                {link.name}
                            </a>
                        ))}

                        <a
                            href="#contact"
                            className="mt-4 bg-cyan-400 py-4 text-center font-bold uppercase tracking-[0.25em] text-black"
                        >
                            Contratar
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}