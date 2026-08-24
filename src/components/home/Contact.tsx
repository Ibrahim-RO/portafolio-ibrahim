import { FormEvent, useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const notyf = new Notyf({
      position: { x: "right", y: "top" },
      duration: 5000,
      ripple: false,
      dismissible: true,
    });

    if (name.length < 4 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 4) {
      notyf.error("Completa todos los campos con información válida.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "No se pudo enviar el mensaje.");
      }

      notyf.success("Correo enviado correctamente.");
      form.reset();
    } catch (error) {
      notyf.error(error instanceof Error ? error.message : "No se pudo enviar el mensaje.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto p-5 lg:p-0 space-y-8">
      <div id="contact" className="space-y-8 scroll-mt-24">
        <h3 className="text-2xl md:text-4xl font-bold text-center">Contacto</h3>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <section aria-label="Redes sociales" className="w-full space-y-3">
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

          <section aria-label="Formulario de contacto" className="w-full space-y-3">
            <p className="font-title text-sm uppercase tracking-widest font-semibold mb-4">Envíame un mensaje</p>
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/8 p-6 md:p-8 rounded-md space-y-5">
              <Field label="Nombre" name="name" type="text" placeholder="Tu nombre" autoComplete="name" />
              <Field label="Email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" />

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-[13px] font-semibold tracking-wide text-(--text-muted) uppercase">Mensaje</label>
                <textarea id="message" name="message" rows={4} required minLength={4} placeholder="¿En qué puedo ayudarte?" className="w-full bg-white/8 hover:bg-white/10 focus:bg-white/10 border border-white/8 focus:border-(--cyan-border) text-(--text-primary) text-[14px] px-3.5 py-2.5 rounded-md outline-none resize-none transition-colors duration-150" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full group/btn relative overflow-hidden border border-cyan-400 bg-cyan-400 px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] disabled:cursor-wait disabled:opacity-70 text-center flex items-center justify-center gap-2">
                <Send aria-hidden="true" size={15} strokeWidth={2.5} />
                <span>{isSubmitting ? "Enviando..." : "Enviar mensaje"}</span>
                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover/btn:translate-x-0" />
              </button>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: "text" | "email";
  placeholder: string;
  autoComplete: string;
};

function Field({ label, name, type, placeholder, autoComplete }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-[13px] font-semibold tracking-wide text-(--text-muted) uppercase">{label}</label>
      <input type={type} id={name} name={name} required minLength={type === "text" ? 4 : undefined} placeholder={placeholder} autoComplete={autoComplete} className="w-full bg-white/8 hover:bg-white/10 focus:bg-white/10 border border-white/8 focus:border-(--cyan-border) text-(--text-primary) text-[14px] px-3.5 py-2.5 rounded-md outline-none transition-colors duration-150" />
    </div>
  );
}
