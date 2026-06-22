import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "../../data/navigation";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 z-50 w-full border-b border-cyan-500/10 backdrop-blur-xl bg-[#050B0F]/80">
            <div className="mx-auto flex justify-between items-center h-20 px-10">

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
                    {navigation.map((link) => (
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
                        href="/CV_Ibrahim-Rodriguez-Olaya.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-black transition hover:scale-105"
                    >
                        Curriculum
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
                className={`overflow-hidden transition-all duration-300 lg:hidden ${open ? "max-h-125" : "max-h-0"
                    }`}
            >
                <div className="border-t border-cyan-500/10 bg-[#081118] p-6">
                    <nav className="flex flex-col gap-6">
                        {navigation.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="uppercase tracking-[0.25em] text-slate-300"
                            >
                                {link.name}
                            </a>
                        ))}

                        <a
                            href="/CV_Ibrahim-Rodriguez-Olaya.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 bg-cyan-400 py-4 text-center font-bold uppercase tracking-[0.25em] text-black"
                        >
                            Curriculum
                        </a>
                    </nav>
                </div>
            </div>
        </header >
    );
}