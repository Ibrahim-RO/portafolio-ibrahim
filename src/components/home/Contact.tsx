import { ArrowRight } from "lucide-react";
import type { Contact as ContactItem } from "../../types";

const contactInfo: ContactItem[] = [
  {
    name: "GitHub",
    description: "Explora mis proyectos",
    href: "https://github.com/Ibrahim-RO",
    image: "/github.svg",
  },
  {
    name: "LinkedIn",
    description: "Contáctame profesionalmente",
    href: "https://www.linkedin.com/in/ibrahim-ro/",
    image: "/linkedin.svg",
  },
  {
    name: "Email",
    description: "Envíame un correo",
    href: "mailto:ibra.rodriguez.olaya@gmail.com",
    image: "/email.svg",
  },
];

export default function Contact() {
  return (
    <section className="max-w-7xl mx-auto p-5 lg:p-0 space-y-8">
      <div id="contact" className="space-y-8 scroll-mt-24">
        <h3 className="text-2xl md:text-4xl font-bold text-center">Contacto</h3>

        <section aria-label="Redes sociales" className="mx-auto max-w-2xl space-y-3">
          <p className="font-title text-sm uppercase tracking-widest font-semibold mb-4">Mis redes</p>

          {contactInfo.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative overflow-hidden flex items-center justify-between bg-white/5 border border-cyan-500/20 p-4 rounded-md transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(0,255,255,0.08)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              <div className="relative flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-(--cyan) shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                <img src={contact.image} alt="" width={56} height={56} className="size-14" />
                <div>
                  <p className="font-title text-[15px] font-semibold text-(--text-primary) transition-colors duration-300 group-hover:text-cyan-300">{contact.name}</p>
                  <p className="text-[12px] text-(--text-muted)">{contact.description}</p>
                </div>
              </div>
              <ArrowRight aria-hidden="true" size={16} className="relative text-(--text-dim) group-hover:text-(--cyan) group-hover:translate-x-0.5 transition-all duration-200" />
              <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </section>
      </div>
    </section>
  );
}
