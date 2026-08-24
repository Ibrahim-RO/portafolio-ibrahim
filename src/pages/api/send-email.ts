import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (message: string, status: number) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return json("La solicitud no contiene datos válidos.", 400);
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 4 || !emailPattern.test(email) || message.length < 4) {
    return json("Los datos del formulario no son válidos.", 400);
  }

  // Astro/Vite loads .env values through import.meta.env during development and
  // at build time. process.env keeps runtime variables working in production.
  const gmailUser = import.meta.env.GMAIL_USER || process.env.GMAIL_USER;
  const gmailPass = import.meta.env.GMAIL_PASS || process.env.GMAIL_PASS;

  if (!gmailUser || !gmailPass) {
    return json("El servicio de correo no está configurado.", 500);
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `Portafolio <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `Nueva solicitud de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return json("Correo enviado correctamente.", 200);
  } catch (error) {
    console.error("Error sending contact email:", error);
    return json("No se pudo enviar el correo. Inténtalo nuevamente.", 500);
  }
};

export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ message: "Método no permitido." }), {
    status: 405,
    headers: {
      Allow: "POST",
      "Content-Type": "application/json",
    },
  });
